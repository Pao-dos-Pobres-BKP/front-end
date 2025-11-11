describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page successfully', () => {
    cy.url().should('include', '/');
    cy.contains('Pão dos Pobres').should('be.visible');
  });

  it('should display navigation menu', () => {
    // Verifica se o menu de navegação está visível
    cy.get('nav').should('be.visible');
  });

  it('should navigate to campanhas page', () => {
    cy.contains('Campanhas').click();
    cy.url().should('include', '/campanhas');
  });

  it('should be responsive', () => {
    // Testa em diferentes viewports
    cy.viewport('iphone-x');
    cy.get('nav').should('be.visible');
    
    cy.viewport('ipad-2');
    cy.get('nav').should('be.visible');
    
    cy.viewport(1920, 1080);
    cy.get('nav').should('be.visible');
  });
});

