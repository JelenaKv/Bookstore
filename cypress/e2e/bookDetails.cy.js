import command from './shared/command';
describe('Book Details Functionality', () => {
  const devices = ['desktop', 'mobile'];

  devices.forEach((device) => {
    describe(`Book Details on ${device}`, () => {
      it('should open the book details page if a book in the list is clicked', () => {
        // Dynamically selects the first book to make the test resilient to changes in book order
        cy.getFirstBookFromList(device).then(({ bookId }) => {
          // Click on the first book
          cy.get('[data-testid^="image-"]').first().click();
          // Verify that the correct book details page is opened
          cy.url().should(
            'eq',
            `https://practice.expandtesting.com/bookstore/books/${bookId}`
          );
        });
      });
      it("should display the book's title, price, and description on the detailed page", () => {
        cy.getFirstBookFromList(device).then(
          ({ bookId, imageSrc, bookTitle, price }) => {
            // Click on the first book
            cy.get('[data-testid^="image-"]').first().click();
            cy.get('h1.mt-3').should('contain.text', 'Book Details');
            cy.get(
              'body > main > div.page-layout > div > div > div > div.col-xl-6.col-md-6.col-sm-6.text-center > img'
            ).should('have.attr', 'src', imageSrc);
            cy.get(
              'body > main > div.page-layout > div > div > div > div.col-xl-6.col-md-6.col-sm-6.pl-4 > h3'
            ).should('contain.text', bookTitle);
            // I didn't want to hardcode the text here
            // because it's not available from the initial page where I scraped the data for the first element.
            // If I had intercepted the API, I would have had all the data.
            cy.get(
              'body > main > div.page-layout > div > div > div > div.col-xl-6.col-md-6.col-sm-6.pl-4 > p:nth-child(5)'
            )

              .should('not.be.empty');
            cy.get(
              'body > main > div.page-layout > div > div > div > div.col-xl-6.col-md-6.col-sm-6.pl-4 > p:nth-child(3) > span'
            ).should('contain.text', price);
          }
        );
      });
      it('should add item to the cart if the "Add to Cart" button is clicked', () => {
        cy.getFirstBookFromList(device).then(({ bookId , imageSrc, bookTitle, price}) => {
         cy.get('[data-testid^="image-"]').first().click();
         cy.visit('https://practice.expandtesting.com/bookstore');
            const viewports = {
              mobile: [430, 932], // iPhone 14 Pro Max
              desktop: [1920, 1080],
            };

            cy.viewport(...(viewports[device] || viewports.desktop));
            cy.get(`[data-testid="cart-${bookId}"]`).click();
            cy.visit('https://practice.expandtesting.com/bookstore/cart');

            cy.viewport(...(viewports[device] || viewports.desktop));
            cy.get(
              'body > main > div.page-layout > div > div > div.col-xl-9.col-lg-9.col-md-12.col-sm-12 > table > tbody > tr > td:nth-child(1) > img'
            ).should('have.attr', 'src', imageSrc);
            cy.get(
              'body > main > div.page-layout > div > div > div.col-xl-9.col-lg-9.col-md-12.col-sm-12 > table > tbody > tr > td:nth-child(2)'
            ).should('contain.text', bookTitle);
          
        });
      });
    });
  });
});
