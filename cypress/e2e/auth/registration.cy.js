import command from '../shared/command';
// The registration is done using a custom Cypress command to avoid code repetition and improve test maintainability
// The command takes parameters for username, email, password, confirmation password, device type, and an optional message to verify after submission
// This ensures the registration process is reusable across different tests without duplicating logic
// In this case, if no email is provided, a random one is generated for testing
describe('Registration Functionality', () => {
  const devices = ['desktop', 'mobile'];
  devices.forEach((device) => {
    describe(`Registration on ${device}`, () => {
      it('should successfully submit registration form with valid credentials', () => {
        cy.register('Test', null, 'P@ss1234', 'P@ss1234', device, null);
      });
      it('should show error for invalid email format', () => {
        cy.register(
          'Test',
          'test@example',
          'P@ss1234',
          'P@ss1234',
          device,
          'Invalid email'
        );
      });
      it('should show error for too short password', () => {
        cy.register('Test', null, 'Pass', 'Pass', device, 'Invalid password');
      });
      it('should show error when passwords do not match', () => {
        cy.register(
          'Test',
          null,
          'P@ss1234',
          'P@ss12345',
          device,
          'Password and Confirm Password must match'
        );
      });
    });
  });
});
