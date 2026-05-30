// Cypress commands
Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', 'http://localhost:5000/api/auth/login', {
    email,
    password,
  }).then((response) => {
    window.localStorage.setItem('auth_token', response.body.token);
  });
});
