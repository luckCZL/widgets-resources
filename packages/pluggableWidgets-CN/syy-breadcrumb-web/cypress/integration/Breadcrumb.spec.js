describe("Breadcrunmb", () => {
    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    it("default style with false", () => {
        cy.wait(2000);
        const breadcrumb = cy.get(".mx-name-sYYBreadcrumbWeb2");
        breadcrumb.should("be.visible");
        cy.get(".mx-name-sYYBreadcrumbWeb2 .ant-breadcrumb-separator").contains("-");
    });

    it("Data normal rendering", () => {
        const breadcrumb = cy.get(".mx-name-sYYBreadcrumbWeb3");
        breadcrumb.should("be.visible");
        cy.get(".mx-name-sYYBreadcrumbWeb3 li").should("have.length", 3);
    });
});
