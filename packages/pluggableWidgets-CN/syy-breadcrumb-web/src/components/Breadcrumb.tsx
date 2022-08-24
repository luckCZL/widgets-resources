import { ReactElement, createElement } from "react";
import { Breadcrumb } from "antd";
import { ContentInterface } from "../BreadcrumbWeb";

export interface BreadcrumbProps {
    className: string;
    separator: string;
    style?: React.CSSProperties | undefined;
    data: ContentInterface[];
    handClick: (item: ContentInterface) => void;
    handleIcon: (icon: string) => void;
}

export function BreadcrumbCom(props: BreadcrumbProps): ReactElement {
    const { className, separator, style, data, handClick, handleIcon } = props;

    return (
        <Breadcrumb style={style} className={className} separator={separator}>
            {data.map(item => {
                return (
                    <Breadcrumb.Item key={item.id} onClick={() => handClick(item)}>
                        {item.icon && handleIcon(item.icon)}
                        <a href="javascript:;">{item.title}</a>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}
