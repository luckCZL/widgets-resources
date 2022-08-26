import { createElement } from "react";
// import { render } from "@testing-library/react-native";
import { shallow } from "enzyme";
// import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";
import DropdownCom, { DropdownProps } from "../Dropdown";
// import { BreadcrumbWebContainerProps } from "../../typings/BreadcrumbWebProps";

// const defaultProps: BreadcrumbWebContainerProps = {
//     name: "BreadcrumbWebTest",
//     class: "",
//     staticData: [],
//     isJump: false,
//     separator: "-"
// };

describe("BreadcrumbWeb", () => {
    let defaultProps: DropdownProps;
    beforeEach(() => {
        defaultProps = {
            trigger: "hover",
            placement: "bottomCenter",
            arrow: false,
            overlay: jest.fn(),
            children: null
        };
    });

    it("renders default dropdown", () => {
        const dropdown = shallow(<DropdownCom {...defaultProps} />);
        expect(dropdown).toMatchSnapshot();
    });

    it("see the arrow of dropdown", () => {
        const dropdown = shallow(<DropdownCom {...defaultProps} arrow />);
        expect(dropdown).toMatchSnapshot();
    });

    it("trigger click of dropdown", () => {
        const dropdown = shallow(<DropdownCom {...defaultProps} trigger="click" />);
        expect(dropdown).toMatchSnapshot();
    });

    it("placement topRight of dropdown", () => {
        const dropdown = shallow(<DropdownCom {...defaultProps} placement="topRight" />);
        expect(dropdown).toMatchSnapshot();
    });

    it("render custom children of dropdown", () => {
        const dropdown = shallow(
            <DropdownCom {...defaultProps}>
                <div>children</div>
            </DropdownCom>
        );
        expect(dropdown).toMatchSnapshot();
    });
});
