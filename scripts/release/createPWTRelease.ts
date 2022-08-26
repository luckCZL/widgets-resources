import { join } from "path";
import {
    addRemoteWithAuthentication,
    execShellCommand,
    getPackageInfo,
    gh,
    PackageInfo,
    WidgetChangelogFileWrapper
} from "../../packages/tools/release-utils-internal";

main().catch(e => {
    console.error(e);
    process.exit(-1);
});

async function main(): Promise<void> {
    const pwtPath = join(process.cwd(), "packages/tools/pluggable-widgets-tools");

    // 1. Get widget info
    console.log(`Getting the widget release information for pluggable-widget-tools...`);
    console.log(`directory:`, pwtPath);

    const packageInfo = await getPackageInfo(pwtPath);
    packageInfo.packageName = "pluggable-widgets-tools";
    packageInfo.packageFullName = "Pluggable Widgets Tools";
    const releaseTag = `pluggable-widgets-tools-v${packageInfo.version.format()}`;
    const changelog = WidgetChangelogFileWrapper.fromFile(`${pwtPath}/CHANGELOG.md`);

    // 2. Check prerequisites
    // 2.1. Check if current version is already in CHANGELOG
    if (changelog.hasVersion(packageInfo.version)) {
        throw new Error(`Version ${packageInfo.version.format()} already exists in CHANGELOG.md file.`);
    }

    // 2.2. Check if there is something to release (entries under "Unreleased" section)
    if (!changelog.hasUnreleasedLogs()) {
        throw new Error(
            `No unreleased changes found in the CHANGELOG.md for ${
                packageInfo.packageName
            } ${packageInfo.version.format()}.`
        );
    }

    // 2.3. Check there is no release of that version on GitHub
    const releaseId = await gh.getReleaseIdByReleaseTag(releaseTag);
    if (releaseId) {
        throw new Error(`There is already a release for tag '${releaseTag}'.`);
    }

    // 4. Do release
    console.log("Preparing pluggable-widget-tools release...");

    const remoteName = `origin-${packageInfo.packageName}-v${packageInfo.version.format()}-${Date.now()}`;

    // 4.1 Set remote repo as origin
    await addRemoteWithAuthentication(packageInfo.repositoryUrl, remoteName);

    // 4.2 Update CHANGELOG.md and create PR
    console.log("Creating PR with updated CHANGELOG.md file...");
    await updateChangelogsAndCreatePR(packageInfo, changelog, releaseTag, remoteName);

    // 4.3 Create release
    console.log("Creating Github release...");
    await gh.createGithubReleaseFrom({
        title: `${packageInfo.packageFullName} v${packageInfo.version.format()}`,
        notes: changelog.changelog.content[0].sections
            .map(s => `## ${s.type}\n\n${s.logs.map(l => `- ${l}`).join("\n\n")}`)
            .join("\n\n"),
        tag: releaseTag,
        target: "HEAD",
        isDraft: true,
        repo: packageInfo.repositoryUrl
    });

    console.log("Done.");
}

async function updateChangelogsAndCreatePR(
    packageInfo: PackageInfo,
    changelog: WidgetChangelogFileWrapper,
    releaseTag: string,
    remoteName: string
): Promise<void> {
    const releaseBranchName = `${releaseTag}-update-changelog`;

    console.log(`Creating branch '${releaseBranchName}'...`);
    await execShellCommand(`git checkout -b ${releaseBranchName}`);

    console.log("Updating CHANGELOG.md...");
    const updatedChangelog = changelog.moveUnreleasedToVersion(packageInfo.version);
    updatedChangelog.save();

    console.log(`Committing CHANGELOG.md to '${releaseBranchName}' and pushing to remote...`);
    await execShellCommand([
        `git add ${changelog.changelogPath}`,
        `git commit -m "chore(${packageInfo.packageName}): update changelog"`,
        `git push ${remoteName} ${releaseBranchName}`
    ]);

    console.log(`Creating pull request for '${releaseBranchName}'`);
    await gh.createGithubPRFrom({
        title: `${packageInfo.packageFullName} v${packageInfo.version.format()}: Update changelog`,
        body: "This is an automated PR that merges changelog update to master.",
        base: "master",
        head: releaseBranchName,
        repo: packageInfo.repositoryUrl
    });

    console.log("Created PR for changelog updates.");
}
