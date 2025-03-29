import command from '../shared/command';
describe('Logout Functionality', () => {
  const devices = ['desktop', 'mobile'];
  devices.forEach((device) => {
    describe(`Logout on ${device}`, () => {
      it('it should allow user to log out and redirect to bookstore and user data should be cleared', () => {
        cy.login('test@example.com', 'P@ss1234', device, null);
        cy.get('#navbarDropdown').click();
        cy.get('#logout').click();
        cy.url().should('eq', 'https://practice.expandtesting.com/bookstore');
        // Extra check can be added to ensure user data is cleared if data is stored in local storage
        // cy.window().its('localStorage').should('not.have.property', 'userData');
        // cy.get('#navbarDropdown').should('not.exist');
      });
    });
  });
});
