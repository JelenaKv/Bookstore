require('dotenv').config();
import command from './shared/command';

describe('Shopping Cart Functionality', () => {
  const devices = ['desktop', 'mobile'];
  devices.forEach((device) => {
    describe(`Adding Items to Cart on ${device}`, () => {
      beforeEach(() => {
        cy.login('addingItems@example.com', 'P@ss1234', device);
        // Dynamically selects the first book to make the test resilient to changes in book order
        cy.getFirstBookFromList(device).then(
          ({ bookId, imageSrc, bookTitle, price }) => {
            cy.visit('https://practice.expandtesting.com/bookstore');
            const viewports = {
              mobile: [430, 932], // iPhone 14 Pro Max
              desktop: [1920, 1080],
            };

            cy.viewport(...(viewports[device] || viewports.desktop));

            // Storing all relevant data in one object and wrapping it as a single alias
            const bookDetails = { bookId, imageSrc, bookTitle, price };
            cy.wrap(bookDetails).as('bookDetails'); // Store it as alias for later use
          }
        );
      });

      it('should add an item to the cart', () => {
        const viewports = {
          mobile: [430, 932], // iPhone 14 Pro Max
          desktop: [1920, 1080],
        };

        cy.viewport(...(viewports[device] || viewports.desktop));
        cy.get('@bookDetails').then((bookDetails) => {
          cy.get(`[data-testid="cart-${bookDetails.bookId}"]`).click();
        });
      });

      it('should display the correct items in the cart', function () {
        const viewports = {
          mobile: [430, 932], // iPhone 14 Pro Max
          desktop: [1920, 1080],
        };
        cy.get('@bookDetails').then((bookDetails) => {
          cy.get(`[data-testid="cart-${bookDetails.bookId}"]`).click();
          // Visit the cart page
          cy.visit('https://practice.expandtesting.com/bookstore/cart');

          // Ensure the image source is correct
          cy.viewport(...(viewports[device] || viewports.desktop));
          cy.get(
            'body > main > div.page-layout > div > div > div.col-xl-9.col-lg-9.col-md-12.col-sm-12 > table > tbody > tr > td:nth-child(1) > img'
          ).should('have.attr', 'src', bookDetails.imageSrc);

          // Ensure the book title is correct
          cy.get(
            'body > main > div.page-layout > div > div > div.col-xl-9.col-lg-9.col-md-12.col-sm-12 > table > tbody > tr > td:nth-child(2)'
          ).should('contain.text', bookDetails.bookTitle);
        });
      });

      it('should complete checkout with fake credit card data', () => {
        const viewports = {
          mobile: [430, 932], // iPhone 14 Pro Max
          desktop: [1920, 1080],
        };
        cy.get('@bookDetails').then((bookDetails) => {
          cy.get(`[data-testid="cart-${bookDetails.bookId}"]`).click();
          // Visit the cart page
          cy.visit('https://practice.expandtesting.com/bookstore/cart');
          cy.viewport(...(viewports[device] || viewports.desktop));
          cy.get('[data-testid="checkout"]').click();
          cy.get('#name').type(Cypress.env('CARD_HOLDER_NAME'));
          cy.get('#address').type(Cypress.env('CARD_HOLDER_ADDRESS'));
          cy.get('#card-name').type(Cypress.env('CARD_HOLDER_NAME'));
          cy.get('#card-number').type(Cypress.env('CREDIT_CARD_NUMBER'));
          cy.get('#card-expiry-month').type(
            Cypress.env('CREDIT_CARD_EXPIRY_MONTH')
          );
          cy.get('#card-expiry-year').type(
            Cypress.env('CREDIT_CARD_EXPIRY_YEAR')
          );
          cy.get('#card-cvc').type(Cypress.env('CREDIT_CARD_CVC'));
          cy.get('[data-testid="purchase"]').click();
          cy.get('div.alert')
            .should('be.visible')
            .and('contain.text', 'Your purchase was successful!');
        });
      });
    });
  });
});
