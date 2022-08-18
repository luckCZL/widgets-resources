import { Component, ReactNode, createElement } from "react";
// import { Image } from "antd";
import { ImageWebPreviewProps } from "../typings/ImageWebProps";
// import { Icon } from "./components/Icon";

declare function require(name: string): string;

export class preview extends Component<ImageWebPreviewProps> {
    render(): ReactNode {
        const { props } = this;
        // const shapeData = shape === "circle" ? "circle" : shape === "round" ? "round" : undefined;
        // const textData = text.trim() === "" ? undefined : text;
        return <div>SYY Image Web</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/ImageWeb.scss");
}
