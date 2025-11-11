describe('Dashboard Page', () => {
  beforeEach(() => {
    cy.visit('/dashboard');
  });

  it('should load the dashboard page', () => {
    cy.url().should('include', '/dashboard');
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
});

