import { ReactElement, createElement, ReactNode } from "react";
import Dropdown from "antd/lib/dropdown";
import { TriggerEnum, PlacementEnum } from "../../typings/DropdownWebProps";

export interface DropdownProps {
    trigger: TriggerEnum;
    placement: PlacementEnum;
    arrow: boolean;
    overlay: () => JSX.Element;
    children: ReactNode;
}

export default function DropdownCom(props: DropdownProps): ReactElement {
    const { trigger, placement, arrow, children, overlay } = props;

    return (
        <Dropdown overlay={overlay} trigger={[trigger]} placement={placement} arrow={arrow}>
            {children}
        </Dropdown>
    );
}
