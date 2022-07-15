/**
 * This file was generated from BreadcrumbWeb.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { ActionValue } from "mendix";

export interface StaticDataType {
    staticLabel: string;
    staticIcon: string;
    staticPath: string;
    onClick?: ActionValue;
}

export interface StaticDataPreviewType {
    staticLabel: string;
    staticIcon: string;
    staticPath: string;
    onClick: {} | null;
}

export interface BreadcrumbWebContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    staticData: StaticDataType[];
    isJump: boolean;
    separator: string;
}

export interface BreadcrumbWebPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    staticData: StaticDataPreviewType[];
    isJump: boolean;
    separator: string;
}
