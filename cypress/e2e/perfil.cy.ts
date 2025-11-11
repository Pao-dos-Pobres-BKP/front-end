describe('Perfil Page', () => {
  beforeEach(() => {
    cy.visit('/perfil');
  });

  it('should load the perfil page', () => {
    cy.url().should('include', '/perfil');
  });

  it('should display page content', () => {
    cy.get('body').should('be.visible');
  });

  it('should display navigation', () => {
    cy.get('nav').should('exist');
  });

  it('should wait for content to load', () => {
    cy.get('body', { timeout: 10000 }).should('exist');
  });

  it('should load perfil with id', () => {
    cy.visit('/perfil/123');
    cy.url().should('include', '/perfil/123');
  });
});

