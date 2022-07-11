import { Component, ReactNode, createElement } from "react";
import { DropdownWebPreviewProps } from "../typings/DropdownWebProps";
// import { Icon } from "./components/Icon";

declare function require(name: string): string;

export class preview extends Component<DropdownWebPreviewProps> {
    render(): ReactNode {
        const { className } = this.props;

        return <div className={className}>SYY Dropdown</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/DropdownWeb.scss");
}
