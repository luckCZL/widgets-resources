import { DropdownWebPreviewProps } from "../typings/DropdownWebProps";

import { hidePropertiesIn, hidePropertyIn, Properties, transformGroupsIntoTabs } from "@mendix/piw-utils-internal";

export function getProperties(
    values: DropdownWebPreviewProps,
    defaultProperties: Properties,
    platform: "web" | "desktop"
): Properties {
    if (values.dataType === "dynamic") {
        hidePropertyIn(defaultProperties, values, "manualData");
    } else if (values.dataType === "static") {
        hidePropertiesIn(defaultProperties, values, ["dropdownData"]);
    }
    if (platform === "web") {
        transformGroupsIntoTabs(defaultProperties);
    }
    return defaultProperties;
}
