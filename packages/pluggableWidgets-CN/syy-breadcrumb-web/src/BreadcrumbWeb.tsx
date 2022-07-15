import { ReactNode, createElement, useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import { BreadcrumbWebContainerProps } from "../typings/BreadcrumbWebProps";
import * as icons from "@ant-design/icons";
import { executeAction } from "@mendix/piw-utils-internal";
import { ActionValue } from "mendix";
import { openPage } from "@jeltemx/mendix-react-widget-utils";
import "./ui/BreadcrumbWeb.scss";

export interface ContentInterface {
    id: string;
    title: string;
    pid?: string;
    path?: string;
    icon?: string;
    onClick?: ActionValue;
}

export function BreadcrumbWeb(props: BreadcrumbWebContainerProps): ReactNode {
    const { staticData, style, separator, isJump } = props;
    const [data, setStata] = useState<ContentInterface[]>([]);

    /**
     * 处理数据
     */
    useEffect(() => {
        let data: ContentInterface[] = [];
        if (staticData.length) {
            // 静态传进来的数据
            staticData.forEach((item, index) => {
                data.push({
                    id: index + "",
                    title: item.staticLabel || "",
                    icon: item.staticIcon || "",
                    path: item.staticPath || "",
                    onClick: item.onClick
                });
            });
        } else {
            // 获取sessionStorage本地数据 与menu联动
            const localData = window.sessionStorage.getItem("Upms_Breadcrumb");
            if (localData) {
                data = JSON.parse(localData);
            }
        }
        setStata(data);
    }, []);

    /**
     * 获取antd对应的图标
     * @param key 图标名称
     * @param object 所有antd图标
     * @returns antd图标
     */
    const isValidKey = (key: string | number | symbol, object: object): key is keyof typeof object => {
        return key in object;
    };

    /**
     * 处理图标显示
     * @param path 图标名称
     */
    const handleIcon = (icon: string): ReactNode => {
        if (isValidKey(icon, icons)) {
            const DynamicIcon: any = icons[icon];
            return <DynamicIcon />;
        }
        return null;
    };

    /**
     * 处理点击事件
     * @param item
     */
    const handClick = (item: ContentInterface): void | null => {
        // 点击事件
        if (item.onClick) {
            executeAction(item.onClick);
            // eslint-disable-next-line no-useless-return
            return;
        }

        // 跳转页面
        if (isJump && item.path) {
            const context = new mendix.lib.MxContext();
            openPage(
                {
                    pageName: item.path + ".page.xml",
                    openAs: "content"
                },
                context
            );
        }
    };

    return data.length ? (
        <Breadcrumb style={style} className={props.class} separator={separator}>
            {data.map(item => {
                return (
                    <Breadcrumb.Item key={item.id} onClick={() => handClick(item)}>
                        {item.icon && handleIcon(item.icon)}
                        <a href="javascript:;">{item.title}</a>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    ) : null;
}
