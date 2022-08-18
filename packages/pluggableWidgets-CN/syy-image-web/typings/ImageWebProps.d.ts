/**
 * This file was generated from ImageWeb.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { DynamicValue, ListValue, ListAttributeValue, WebImage } from "mendix";

export type DataTypeEnum = "typeStatic" | "typeUrl" | "typeList";

export interface ImageWebContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    dataType: DataTypeEnum;
    staticImage?: DynamicValue<WebImage>;
    singUrl?: DynamicValue<string>;
    listData?: ListValue;
    text?: ListAttributeValue<string>;
    showEmpty: boolean;
    description: string;
    preview: boolean;
    colNumber: number;
    width: number;
    height: number;
    margin: number;
}

export interface ImageWebPreviewProps {
    readOnly: boolean;
    dataType: DataTypeEnum;
    staticImage: { type: "static"; imageUrl: string } | { type: "dynamic"; entity: string } | null;
    singUrl: string;
    listData: {} | { type: string } | null;
    text: string;
    showEmpty: boolean;
    description: string;
    preview: boolean;
    colNumber: number | null;
    width: number | null;
    height: number | null;
    margin: number | null;
}
