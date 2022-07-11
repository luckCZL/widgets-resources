import { ReactNode, createElement, useEffect, useState, useRef } from "react";
import { Dropdown, Menu } from "antd";
import { DropdownWebContainerProps } from "../typings/DropdownWebProps";
import "./ui/DropdownWeb.scss";
import { ListValue, ActionValue } from "mendix";
import { executeAction } from "@mendix/piw-utils-internal";
import { updateAttributeValue } from "@mendix/syy-utils-internal";

// 定义下拉菜单数据类型
interface DropdownInterface {
    id: string;
    text: string;
    icon?: string;
    disabled: boolean;
    action?: ActionValue;
}

export function DropdownWeb(props: DropdownWebContainerProps): ReactNode {
    const {
        dropdownData,
        manualData,
        id,
        text,
        disabled,
        style,
        tabIndex,
        content,
        trigger,
        placement,
        arrow,
        divider,
        selectedId,
        onChange,
        returnLabel,
        dataType
    } = props;
    const [data, setData] = useState<DropdownInterface[]>([]);
    const isManual = useRef(false); // 是否手动添加的数据

    /**
     * 初始化静态数据
     */
    useEffect(() => {
        const manualDataArr: DropdownInterface[] = [];
        // 1.选择了静态类型
        // 2.选了动态类型，但是动态数据未定义且静态数据有值 - 兼容旧配置项
        if (dataType === "static" || (dataType === "dynamic" && !dropdownData && manualData.length)) {
            // if (dataType === "static") {
            isManual.current = true;
            manualData.forEach(item => {
                manualDataArr.push({
                    id: item.manuaValue,
                    text: item.manuaTitle,
                    disabled: false,
                    action: item.manuaAction
                });
            });
        }
        setData(manualDataArr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 初始化动态数据
    useEffect(() => {
        if (dataType === "dynamic" && dropdownData && dropdownData.status === "available") {
            handleDropdawnData(dropdownData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropdownData]);

    /**
     * 处理数据
     * @param data 原始下拉框类型
     */
    const handleDropdawnData = (data: ListValue): void => {
        const dropdownData: DropdownInterface[] = [];

        if (data.items) {
            data.items.forEach((item: any) => {
                dropdownData.push({
                    id: id ? handleValue(id, item) + "" : "",
                    text: text ? handleValue(text, item) + "" : "",
                    disabled: disabled ? handleValue(disabled, item) || false : false
                });
            });
        }

        setData(dropdownData);
    };

    /**
     * 处理动态数据
     * @param val
     * @param item
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    const handleValue = (val: any, item: any): any => {
        if (val.get) {
            return val.get(item).value;
        }
        return val(item).value;
    };

    /**
     * 处理下拉菜单dom元素
     * @returns 下拉菜单dom
     */
    const handleDom = (): JSX.Element => {
        const dropdownData = data;

        const dom: JSX.Element[] = [];

        if (dropdownData.length) {
            // 有数据时遍历生成菜单元素
            dropdownData.forEach((item, index) => {
                dom.push(
                    <Menu.Item
                        key={item.id + item.text + index}
                        onClick={() => onChangeFun(item)}
                        disabled={item.disabled}
                    >
                        <a rel="noopener noreferrer" href="javascript:;">
                            {item.text}
                        </a>
                    </Menu.Item>
                );

                // 分割线渲染
                if (divider && index !== dropdownData.length - 1) {
                    dom.push(<Menu.Divider key={"分割线" + index} />);
                }
            });
        } else {
            // 无数据
            dom.push(
                <Menu.Item key="notData" disabled>
                    <a rel="noopener noreferrer" href="javascript:;">
                        暂无数据
                    </a>
                </Menu.Item>
            );
        }
        const menu = <Menu>{dom}</Menu>;

        return menu;
    };

    /**
     * 选中回调
     * @param id 菜单id
     */
    const onChangeFun = (item: DropdownInterface): void => {
        updateAttributeValue(selectedId, item.id);
        updateAttributeValue(returnLabel, item.text);

        executeAction(item.action);
        executeAction(onChange);
    };

    return (
        <span className={props.class} style={{ display: "inline-block", ...style }} tabIndex={tabIndex}>
            <Dropdown overlay={handleDom} trigger={[trigger]} placement={placement} arrow={arrow}>
                <a className="ant-dropdown-link display-block text-inherit" onClick={e => e.preventDefault()}>
                    {content}
                </a>
            </Dropdown>
        </span>
    );
}
