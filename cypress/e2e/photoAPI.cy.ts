describe('Photo upload/delete', () => {


  it('should load a photo and delete it', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('Add Picture').first().click();
    cy.get('input[type="file"]').first().selectFile("cypress/fixtures/image.jpg",{force: true})
    cy.contains('File uploaded successfully.').should('be.visible');

    cy.visit('http://localhost:3000/photos');
    cy.get('[aria-label="Delete"]').first().click();
  });
});
