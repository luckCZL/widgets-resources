describe("Breadcrunmb", () => {
    beforeEach(() => {
        cy.visit("/"); // resets page
    });

    it("should call action on click breadcrunmb", () => {
        // 模拟点击二级菜单（里面绑定了show page跳转页面）
        cy.get(".mx-name-sYYBreadcrumbWeb1 ol>li").eq(1).should("be.visible").click();

        // 判断是否跳转成功（跳转的页面有.mx-name-badge1）
        cy.get(".mx-name-badge1").should("be.visible");
    });

    it("should jump page on click breadcrunmb", () => {
        // 模拟点击二级菜单（里面传递了path，并开启了is jump page）
        cy.get(".mx-name-sYYBreadcrumbWeb4 ol>li").eq(1).should("be.visible").click();

        // 判断是否跳转成功（跳转的页面有.mx-name-badge1）
        cy.get(".mx-name-badge1").should("be.visible");
    });
});
