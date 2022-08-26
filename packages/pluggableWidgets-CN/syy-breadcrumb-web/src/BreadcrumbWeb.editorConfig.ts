import { BreadcrumbWebPreviewProps } from "../typings/BreadcrumbWebProps";
import { StructurePreviewProps } from "@mendix/piw-utils-internal";
import { Properties, transformGroupsIntoTabs } from "@mendix/pluggable-widgets-tools";

export function getProperties(
    _values: BreadcrumbWebPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}

export function getPreview(values: BreadcrumbWebPreviewProps): StructurePreviewProps | null {
    const dataString = values.staticData.map((item, index) => {
        return (index === 0 ? "" : values.separator) + item.staticLabel;
    });

    if (!dataString.length) {
        return null;
    }

    return {
        type: "RowLayout",
        columnSize: "fixed",
        children: [
            {
                type: "Container",
                children: [
                    {
                        type: "Container",
                        children: [
                            {
                                type: "Text",
                                content: dataString.join(""),
                                fontColor: "#000",
                                bold: true,
                                fontSize: 10
                            }
                        ]
                    }
                ],
                padding: 2,
                borders: false
            }
        ]
    };
}
