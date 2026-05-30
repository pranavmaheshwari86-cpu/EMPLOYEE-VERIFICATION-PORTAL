describe('Authentication Flow', () => {
  it('Should display login page', () => {
    cy.visit('/login')
    cy.get('h2').should('contain', 'Welcome Back')
    cy.get('form').should('exist')
  })

  it('Should display register page', () => {
    cy.visit('/register')
    cy.get('h2').should('contain', 'Join AETHERIS')
    cy.get('form').should('exist')
  })
})
