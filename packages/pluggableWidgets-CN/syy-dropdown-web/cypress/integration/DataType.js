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

    it("Enumeration type", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb2");
        dropdown.should("be.visible");
        dropdown.click();
        cy.wait(100);
        cy.get(".ant-dropdown").should("be.visible");
        cy.get(".ant-dropdown li").first().click();
        cy.wait(100);
        cy.get(".mx-name-text4").contains("选项1");
    });

    it("dynamic type", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb3");
        dropdown.should("be.visible");
        dropdown.click();
        cy.wait(100);
        cy.get(".ant-dropdown").should("be.visible");
        cy.get(".ant-dropdown li").first().click();
        cy.wait(100);
        cy.get(".mx-name-text6").contains("苹果1");
    });

    it("static type", () => {
        cy.wait(100);
        const dropdown = cy.get(".mx-name-sYYDropdownWeb5");
        dropdown.should("be.visible");
        dropdown.click();
        cy.wait(100);
        cy.get(".ant-dropdown").should("be.visible");
        cy.get(".ant-dropdown li").first().click();
        cy.wait(100);
        cy.get(".mx-name-text8").contains("选项1");
    });
});
