// https://on.cypress.io/api

describe("Test submitting feedbacks through the feedback view", () => {
    it("Can navigate to feedback page from home page", () => {
        cy.visit("/");
        cy.get("a[href='/feedback']").click();
        cy.url().should("include", "/feedback");

        cy.get("form").should("exist");
    });

    it("Can submit feedback", (done) => {
        cy.visit("/feedback");

        const MOCK_ID = "abc123";

        cy.intercept(Cypress.env("VITE_API_BASE_URL") + "/feedback", {
            id: MOCK_ID,
            name: "John Doe",
            feedback:
                "This is a test feedback which is at least 20 characters long.",
        });

        cy.on("window:alert", (str) => {
            expect(str).to.contain(MOCK_ID);
            done();
        });

        cy.get("input[cy-name-input]").type("John Doe");
        cy.get("textarea[cy-feedback-input]").type(
            "This is a test feedback which is at least 20 characters long."
        );
        cy.get("button[cy-submit-button]").click();
    });

    it("Submit button is disabled when form is invalid", () => {
        cy.visit("/feedback");

        cy.get("button[cy-submit-button]").should("be.disabled");

        cy.get("input[cy-name-input]").type("John Doe");
        cy.get("button[cy-submit-button]").should("be.disabled");

        cy.get("textarea[cy-feedback-input]").type("short feedback");
        cy.get("button[cy-submit-button]").should("be.disabled");

        cy.get("textarea[cy-feedback-input]").type(
            "This is a test feedback which is at least 20 characters long."
        );
        cy.get("button[cy-submit-button]").should("not.be.disabled");
    });

    it("Should show required error message when blurred out of name input", () => {
        cy.visit("/feedback");

        cy.get("input[cy-name-input]").focus();
        cy.get("input[cy-name-input]").blur();
        cy.get("p[cy-name-error]").should("exist");
        cy.get("p[cy-name-error]").should("contain.text", "Name is required.");
    });

    it("Should show error message when feedback is less than 20 characters", () => {
        cy.visit("/feedback");

        cy.get("textarea[cy-feedback-input]").type("1234567890123456789");
        cy.get("textarea[cy-feedback-input]").blur();
        cy.get("p[cy-feedback-error]").should("exist");
        cy.get("p[cy-feedback-error]").should(
            "contain.text",
            "Feedback must be at least 20 characters long."
        );
    });
});
