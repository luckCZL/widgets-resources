import { ReactNode, createElement, PureComponent } from "react";
import { Image, Empty } from "antd";
import { ImageWebContainerProps } from "../typings/ImageWebProps";
import "./ui/ImageWeb.scss";
import { DynamicValue, WebIcon, ListValue } from "mendix";
import { Icon } from "./components/Icon";
import "@jeltemx/mendix-react-widget-utils";

interface State {
    AlbumImageList: PicturnInterface[]; // 图片数组
}

export interface PicturnInterface {
    width?: number;
    height?: number;
    url: string;
    name?: string;
}
const failImage =
    "data:image/png;base64,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";
export default class ImageWeb extends PureComponent<ImageWebContainerProps, State> {
    constructor(props: ImageWebContainerProps) {
        super(props);
        this.state = {
            AlbumImageList: []
        };
    }
    /**
     * 过滤list数据
     * @param nextProps
     */
    UNSAFE_componentWillReceiveProps(nextProps: ImageWebContainerProps): void {
        if (nextProps.listData && nextProps.listData.status === "available") {
            this.initData(nextProps.listData);
        }
    }

    /**
     * 初始化数据
     * @param listData list
     */
    initData = (listData: ListValue): void => {
        const { text } = this.props;
        const AlbumImageList: PicturnInterface[] = [];

        // 根据guid获取路径
        if (listData.items) {
            listData.items.forEach((item: any) => {
                const key = Object.getOwnPropertySymbols(item)[0];
                const mxObject = item[key];
                const url = mx.data.getDocumentUrl(item.id, mxObject.get("changedDate"), false);
                const objUrl = url;
                // if (objUrl && uid && url.indexOf("local") === -1) {
                AlbumImageList.push({ url: objUrl, name: text ? this.handleValue(text, item) || "" : "" });
                // }
            });
        }

        this.setState({ AlbumImageList });
    };

    /**
     * 处理动态数据
     * @param val
     * @param item
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleValue = (val: any, item: any): any => {
        if (val.get) {
            return val.get(item).value;
        }
        return val(item).value;
    };

    render(): ReactNode {
        return this.judeType();
    }

    // 判断类型
    judeType = (): ReactNode => {
        const { singUrl } = this.props;

        if (singUrl) {
            return this.handleSingImage(singUrl.value + "");
        } else {
            return this.handleListImage();
        }
    };

    // 处理显示单张url图片
    handleSingImage = (singUrl: string): ReactNode => {
        const { width, preview } = this.props;

        return <Image width={width || 200} preview={preview} src={singUrl} fallback={failImage} />;
    };

    // 处理显示图片数组
    handleListImage = (): ReactNode => {
        const { AlbumImageList } = this.state;
        const { width, height, colNumber, margin, preview, showEmpty, description } = this.props;

        const padding = margin / 2;
        let itemStyle = {};

        const options = {
            ...(height && { height })
        };

        return (
            <Image.PreviewGroup>
                <div className="syy-image-box">
                    {AlbumImageList.map((item, index) => {
                        // 动态赋值样式
                        if (colNumber) {
                            itemStyle = {
                                width: colNumber ? 100 / colNumber + "%" : width || 200,
                                marginBottom: index < AlbumImageList.length - colNumber ? margin : 0,
                                paddingLeft: index % colNumber ? padding : 0,
                                paddingRight: index % colNumber === colNumber - 1 ? 0 : padding
                            };
                        } else {
                            itemStyle = {
                                width: width || 200,
                                marginBottom: index < AlbumImageList.length - colNumber ? margin : 0,
                                marginRight: margin
                            };
                        }
                        return (
                            <div key={item.url + index} style={itemStyle}>
                                <Image
                                    width="100%"
                                    src={item.url}
                                    fallback={failImage}
                                    preview={preview}
                                    alt={item.name}
                                    {...options}
                                />
                            </div>
                        );
                    })}
                    {showEmpty && !AlbumImageList.length && (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />
                    )}
                </div>
            </Image.PreviewGroup>
        );
    };

    /**
     * 处理左侧返回图标
     * @returns ReactNode | boolean
     */
    handleIcon = (images: DynamicValue<WebIcon>): ReactNode | boolean => {
        if (images) {
            return Icon(images);
        }

        return false;
    };
}
