import { createElement } from "react";
// import { render } from "@testing-library/react-native";
import { shallow } from "enzyme";
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
        const breadcrumb = shallow(<BreadcrumbCom {...defaultProps} />);
        expect(breadcrumb).toMatchSnapshot();
    });

    it("renders a default separator", () => {
        const breadcrumb = shallow(<BreadcrumbCom {...defaultProps} separator=":" />);
        expect(breadcrumb).toMatchSnapshot();
    });

    it("renders a default data", () => {
        const breadcrumb = shallow(<BreadcrumbCom {...defaultProps} data={[]} />);
        expect(breadcrumb).toMatchSnapshot();
    });

    // it("triggers handClick function with a click event", () => {
    //     defaultProps.handClick = jest.fn();
    //     // const onClick = jest.fn();
    //     const breadcrumb = mount(<BreadcrumbCom {...defaultProps} handClick={defaultProps.handClick} />);

    //     breadcrumb.find("BreadcrumbItem").simulate("click");

    //     expect(defaultProps.handClick).toHaveBeenCalledTimes(1);
    // });
});
