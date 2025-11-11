describe('Navigation', () => {
  it('should navigate through all main pages', () => {
    cy.visit('/');
    
    // Home
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    // Campanhas
    cy.contains('Campanhas').click();
    cy.url().should('include', '/campanhas');
    
    // Doação
    cy.contains('Doação').click();
    cy.url().should('include', '/doacao');
    
    // Empresas Parceiras
    cy.contains('Empresas Parceiras').click();
    cy.url().should('include', '/empresas-parceiras');
    
    // Login
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('should handle 404 page', () => {
    cy.visit('/pagina-inexistente', { failOnStatusCode: false });
    cy.contains('404', { matchCase: false }).should('be.visible');
    cy.contains('não encontrada', { matchCase: false }).should('be.visible');
  });

  it('should navigate back and forward', () => {
    cy.visit('/');
    cy.contains('Campanhas').click();
    cy.url().should('include', '/campanhas');
    
    cy.go('back');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    
    cy.go('forward');
    cy.url().should('include', '/campanhas');
  });

  it('should maintain scroll position on navigation', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    
    cy.contains('Campanhas').click();
    cy.url().should('include', '/campanhas');
    
    cy.go('back');
  });
});

