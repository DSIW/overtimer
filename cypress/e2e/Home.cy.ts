describe("Home", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");

    indexedDB.deleteDatabase("OvertimerDatabase");
  });

  it("shows 8 hours as default", () => {
    cy.contains("08:00:00");
  });

  it("contains start button", () => {
    cy.get("button").first().should("have.text", "Start");
  });

  it("reduces work time after running timer", () => {
    cy.get("button").first().should("have.text", "Start").click();
    cy.wait(1000);
    cy.get("button").first().should("have.text", "Stop").click();
    cy.contains("07:59:59");
  });
});
