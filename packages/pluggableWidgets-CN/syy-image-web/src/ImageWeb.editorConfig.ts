// import { ImageWebPreviewProps } from "../typings/ImageWebProps";

// import {
//     // changePropertyIn,
//     // ContainerProps,
//     // DropZoneProps,
//     // hideNestedPropertiesIn,
//     hidePropertiesIn,
//     hidePropertyIn,
//     // Problem,
//     Properties,
//     // RowLayoutProps,
//     StructurePreviewProps,
//     transformGroupsIntoTabs
// } from "@mendix/piw-utils-internal";

// export function getProperties(
//     values: ImageWebPreviewProps,
//     defaultProperties: Properties,
//     platform: "web" | "desktop"
// ): Properties {
//     if (values.type !== "link") {
//         hidePropertyIn(defaultProperties, values, "href");
//     }
//     if (!values.openconfirm) {
//         hidePropertiesIn(defaultProperties, values, [
//             "confirmType",
//             "confirmtitle",
//             "confirmokText",
//             "confirmcancelText",
//             "confirmokType",
//             "onConfirm",
//             "onCancel"
//         ]);
//     }
//     if (!values.advanced) {
//         hidePropertiesIn(defaultProperties, values, [
//             "confirmokText",
//             "confirmcancelText",
//             "confirmokType",
//             "authPath",
//             "block",
//             "danger",
//             "ghost",
//             "shape"
//         ]);
//     }
//     if (platform === "web") {
//         transformGroupsIntoTabs(defaultProperties);
//     }
//     return defaultProperties;
// }

// export function getPreview(values: ImageWebPreviewProps): StructurePreviewProps {
//     return {
//         type: "RowLayout",
//         columnSize: "fixed",
//         children: [
//             {
//                 type: "Container",
//                 children: [
//                     {
//                         type: "Container",
//                         children: [
//                             {
//                                 type: "Text",
//                                 content: "Image-" + values.text + "+" + values.type,
//                                 fontColor: "#000",
//                                 bold: true,
//                                 fontSize: 10
//                             }
//                         ]
//                     }
//                 ],
//                 padding: 2,
//                 borders: true
//             }
//         ]
//     };
// }
