import Breadcrumb from "antd/lib/breadcrumb";
import { ReactNode, createElement, useEffect, useState } from "react";
import * as icons from "@ant-design/icons";
import { BreadcrumbWebPreviewProps } from "../typings/BreadcrumbWebProps";
import { ContentInterface } from "./BreadcrumbWeb";

declare function require(name: string): string;

export function preview(props: BreadcrumbWebPreviewProps): ReactNode {
    const { staticData, separator } = props;

    const [data, setStata] = useState<ContentInterface[]>([]);

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
                    path: item.staticPath || ""
                });
            });
        } else {
            // 获取sessionStorage本地数据 与menu联动
            const localData = window.sessionStorage.getItem("Upms_Breadcrumb");
            if (localData) {
                data = JSON.parse(localData);
            }
        }
        console.info("data", data);
        setStata(data);
    }, []);

    return (
        <div className={props.className}>
            {data.length ? (
                <Breadcrumb separator={separator}>
                    {data.map(item => {
                        return (
                            <Breadcrumb.Item key={item.id}>
                                {item.icon && handleIcon(item.icon)}
                                <a href="javascript:;">{item.title}</a>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>
            ) : (
                "SYY Breadcrumb Web"
            )}
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/BreadcrumbWeb.scss");
}
