describe('Layout', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/');
  });

  it('should navigate to home page when home link is clicked', () => {
      cy.contains('Home').click();
      cy.url().should('eq', 'http://localhost:3000/');

  });
    it('should navigate to home page when logo link is clicked', () => {
      cy.get('[alt="logo"]').click({ multiple: true, force: true });
      cy.url().should('eq', 'http://localhost:3000/');

  });

  it('should navigate to photos page when photos link is clicked', () => {
      cy.contains('Photos').click();
      cy.url().should('eq', 'http://localhost:3000/photos');
  });

  it('should toggle color mode when color mode button is clicked', () => {
    cy.get('.chakra-stack > .chakra-button').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    cy.get('.chakra-stack > .chakra-button').click();
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });
});
