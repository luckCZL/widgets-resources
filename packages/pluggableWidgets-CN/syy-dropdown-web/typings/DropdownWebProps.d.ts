/**
 * This file was generated from DropdownWeb.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, EditableValue, ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export type DataTypeEnum = "enum" | "dynamic" | "static";

export interface ManualDataType {
    manuaValue: string;
    manuaTitle: string;
    manuaAction?: ActionValue;
}

export type TriggerEnum = "hover" | "click" | "contextMenu";

export type PlacementEnum = "bottomLeft" | "bottomCenter" | "bottomRight" | "topLeft" | "topCenter" | "topRight";

export interface ManualDataPreviewType {
    manuaValue: string;
    manuaTitle: string;
    manuaAction: {} | null;
}

export interface DropdownWebContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    dataType: DataTypeEnum;
    enumData?: EditableValue<string>;
    manualData: ManualDataType[];
    dropdownData?: ListValue;
    id?: ListAttributeValue<string | Big>;
    text?: ListAttributeValue<string>;
    disabled?: ListAttributeValue<boolean>;
    content: ReactNode;
    selectedId?: EditableValue<string | Big>;
    returnLabel?: EditableValue<string>;
    arrow: boolean;
    trigger: TriggerEnum;
    placement: PlacementEnum;
    divider: boolean;
    isFollow: boolean;
    onChange?: ActionValue;
}

export interface DropdownWebPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    dataType: DataTypeEnum;
    enumData: string;
    manualData: ManualDataPreviewType[];
    dropdownData: {} | { type: string } | null;
    id: string;
    text: string;
    disabled: string;
    content: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    selectedId: string;
    returnLabel: string;
    arrow: boolean;
    trigger: TriggerEnum;
    placement: PlacementEnum;
    divider: boolean;
    isFollow: boolean;
    onChange: {} | null;
}
