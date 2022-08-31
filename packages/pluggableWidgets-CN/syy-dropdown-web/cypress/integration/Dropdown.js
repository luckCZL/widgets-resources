// button.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Dropdown", () => {
    // const browserName = Cypress.browser.name;

    beforeEach(() => {
        cy.visit("/p/TestE2E/Dropdown"); // resets page
    });
    it("render chidren content", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb1");
        dropdown.should("be.visible");
        dropdown.find("button").should("be.visible");
    });

    // General
    it("shows modal is clicked", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb1");
        dropdown.should("be.visible");
        dropdown.click();
        cy.wait(100);
        cy.get(".ant-dropdown").should("be.visible");
    });

    it("update return value", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb1");
        dropdown.should("be.visible");
        dropdown.click();
        cy.wait(100);
        cy.get(".ant-dropdown").should("be.visible");
        cy.get(".ant-dropdown li").first().click();
        cy.wait(100);
        cy.get(".mx-name-text3").contains("选项1");
    });

    // UI
    it("shows arrow", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb1");
        dropdown.should("be.visible");
        dropdown.click();
        cy.wait(100);
        cy.get(".ant-dropdown-arrow").should("be.visible");
    });

    it("placement is bottomRight", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb1");
        dropdown.click();
        cy.wait(100);
        cy.get(".ant-dropdown-placement-bottomRight").should("be.visible");
    });

    it("isfollow is true", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb1");
        dropdown.click();
        cy.wait(100);
        cy.get(".mx-name-sYYDropdownWeb1 .ant-dropdown").should("be.visible");
    });

    // it("isfollow is false", () => {
    //     cy.wait(100);
    //     const dropdown = cy.get(".mx-name-sYYDropdownWeb2");
    //     dropdown.click();
    //     cy.wait(100);
    //     cy.get(".mx-name-sYYDropdownWeb2 .ant-dropdown").should("be.empty");
    // });

    // Event
    it("shows modal is clicked call event", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb1");
        dropdown.should("be.visible");
        dropdown.click();
        cy.wait(100);
        cy.get(".ant-dropdown").should("be.visible");
        cy.get(".ant-dropdown li").first().click();
        cy.wait(100);
        cy.get(".mx-dialog").should("be.visible");
    });
});
