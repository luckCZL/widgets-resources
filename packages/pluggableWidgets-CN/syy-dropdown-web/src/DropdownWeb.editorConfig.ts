import { DropdownWebPreviewProps } from "../typings/DropdownWebProps";

import { hidePropertiesIn, Properties, transformGroupsIntoTabs } from "@mendix/pluggable-widgets-tools";

export function getProperties(
    values: DropdownWebPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    switch (values.dataType) {
        case "enum":
            hidePropertiesIn(defaultProperties, values, ["manualData", "dropdownData"]);
            break;

        case "dynamic":
            hidePropertiesIn(defaultProperties, values, ["manualData", "enumData"]);
            break;

        case "static":
            hidePropertiesIn(defaultProperties, values, ["dropdownData", "enumData"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
