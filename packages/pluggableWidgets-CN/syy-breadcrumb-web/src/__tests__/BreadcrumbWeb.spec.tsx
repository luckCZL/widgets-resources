import { createElement } from "react";
import { render } from "@testing-library/react-native";
// import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import { BreadcrumbCom, BreadcrumbProps } from "../components/Breadcrumb";
// import { BreadcrumbWebContainerProps } from "../../typings/BreadcrumbWebProps";

// const defaultProps: BreadcrumbWebContainerProps = {
//     name: "BreadcrumbWebTest",
//     class: "",
//     staticData: [],
//     isJump: false,
//     separator: "-"
// };

describe("BreadcrumbWeb", () => {
    let defaultProps: BreadcrumbProps;
    beforeEach(() => {
        defaultProps = {
            className: "BreadcrumbWebTest",
            data: [
                {
                    id: "1",
                    title: "一级菜单"
                },
                {
                    id: "2",
                    title: "二级菜单"
                }
            ],
            separator: "-",
            handClick: jest.fn(),
            handleIcon: jest.fn()
        };
    });

    it("renders as a breadcrumb", () => {
        const breadcrumb = render(<BreadcrumbCom {...defaultProps} />);
        expect(breadcrumb).toMatchSnapshot();
    });

    it("renders a default separator", () => {
        const breadcrumb = render(<BreadcrumbCom {...defaultProps} separator=":" />);
        expect(breadcrumb).toMatchSnapshot();
    });

    it("renders a default data", () => {
        const breadcrumb = render(<BreadcrumbCom {...defaultProps} data={[]} />);
        expect(breadcrumb).toMatchSnapshot();
    });
});
