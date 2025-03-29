import command from '../shared/command';

// NOTE: Hardcoded data is used here due to the limitations of the application
// data from Google Analytics is not available. Normally, these values
// would be fetched dynamically via an API, but since we cannot access actual user data or order history
// through the backend, hardcoded values are used for the purpose of testing functionality.

describe('Order Checking Functionality for User with Order History', () => {
  const devices = ['desktop', 'mobile'];

  devices.forEach((device) => {
    describe(`Order Checking on ${device}`, () => {
      it('should perform all order checking actions', () => {
        // First, log in the user
        cy.login('test@example.com', 'P@ss1234', device, null);
        cy.get('#welcome-message').should('contain.text', 'Hello Test');

        // Check if the "My Orders" heading is displayed
        cy.get('main h4').should('contain.text', 'My Orders');

        // Check if the info alert for order deletion is displayed
        cy.get('.alert.alert-info').should('be.visible');
        cy.get('div')
          .contains('strong', 'Note:')
          .should('exist')
          .parent()
          .contains(
            'Deleting all orders is for testing purposes only and should not be used in production.'
          )
          .should('exist');

        // Check if the delete all orders button is displayed
        cy.get('#deleteOrdersBtn')
          .should('be.visible')
          .should('contain.text', 'Delete All Orders');

        // Check if the order ID is present in the card header
        cy.get('div.card-header')
          .contains('Order ID: 67e557fa38f0070286de22d1')
          .should('exist');

        // Check if the book image and title are correctly displayed
        cy.get('li.list-group-item')
          .should('exist')
          .find('img')
          .should('have.attr', 'src', '/img/bs_js_book.png')
          .get('span')
          .contains('JavaScript for Web Developers');

        // Check if the correct price is displayed
        cy.get('span.badge.bg-dark.text-light').contains('40€').should('exist');

        // Check if the total price is displayed correctly
        cy.get('div.card-footer')
          .find('strong')
          .should('contain.text', 'Total Price:');
        cy.get('div.card-footer').find('span').should('have.text', '40.00€');
      });
    });
  });
});

describe('Order Checking Functionality for User with No Order History', () => {
  const devices = ['desktop', 'mobile'];

  devices.forEach((device) => {
    describe(`Order Checking on ${device}`, () => {
      it('should show no orders message', () => {
        // First, log in the user
        cy.login('donttouch@example.com', 'P@ss1234', device, null);

        // Verifying that the welcome message is displayed correctly for the logged-in user
        cy.get('#welcome-message').should('contain.text', 'Dont Touch');

        // Verifying that the "No Orders...." message is displayed when the user has no orders
        cy.get('.col-md-4.col-md-offset-4').should(
          'contain.text',
          'No Orders....'
        );
      });
    });
  });
});
