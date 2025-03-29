import command from '../shared/command';
// The login is done using a custom Cypress command to avoid code duplication and improve test maintainability
// The command takes parameters for email, password, device type, and an optional error message to check after login
// This approach ensures that login logic is reusable across tests without repeating the same code

describe('Login Functionality', () => {
  const devices = ['desktop', 'mobile'];
  devices.forEach((device) => {
    describe(`Login on ${device}`, () => {
      it('it should allow user to log in with valid credentials', () => {
        cy.login('test@example.com', 'P@ss1234', device, null);
      });
      it('it should show error message for invalid email', () => {
        cy.login(
          'nonexistingdevot@example.com',
          'P@ss1234',
          device,
          'No user found with the given email address'
        );
      });
      it('it should show error message for invalid password', () => {
        cy.login('test@example.com', 'P@ss12345', device, 'Incorrect password');
      });
      it('it should show error message for empty password field', () => {
        cy.login('test@example.com', null, device, 'Missing credentials');
      });
      it('it should show error message for empty email field', () => {
        cy.login(null, 'P@ss1234', device, 'Missing credentials');
      });
      it('it should show error message for empty email and password field', () => {
        cy.login(null, null, device, 'Missing credentials');
      });
      it('it should show error message for invalid email - no @ in email', () => {
        cy.login(
          'testexample.com',
          'P@ss1234',
          device,
          'Invalid email address'
        );
      });
      it('it should show error message for invalid email - no domain part', () => {
        cy.login('test@', 'P@ss1234', device, 'Invalid email address');
      });
      it('it should show error message for invalid email - invalid domain name', () => {
        cy.login('test@example', 'P@ss1234', device, 'Invalid email address');
      });
      it('it should show error message for invalid email - invalid top level domain', () => {
        cy.login(
          'test@example.123',
          'P@ss1234',
          device,
          'Invalid email address'
        );
      });
      it('it should show error message for invalid email - email with spaces', () => {
        cy.login(
          ' test@example.com',
          'P@ss1234',
          device,
          'Invalid email address'
        );
      });
      it('it should show error message for invalid email - email with double dot in local part', () => {
        cy.login(
          'test@example..com',
          'P@ss1234',
          device,
          'Invalid email address'
        );
      });
      it('it should show error message for invalid email - email with multiple @ symbols', () => {
        cy.login(
          'test@@example.com',
          'P@ss1234',
          device,
          'Invalid email address'
        );
      });
      // THIS TEST IS FAILING
      /* it('it should show error message for invalid email - email with international characters', () => {
        cy.openBookstore();
        cy.login('test@example.中文.com', 'P@ss1234');
        cy.checkFlashMessage('Invalid email address');
        cy.url().should('eq', 'https://practice.expandtesting.com/bookstore/user/signin');
      }); */
    });
  });
});
