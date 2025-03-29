import command from './shared/command';

describe('Search Functionality', () => {
  const devices = ['desktop', 'mobile'];

  devices.forEach((device) => {
    describe(`Search on ${device}`, () => {
      it('should display filtered books based on search query', () => {
        cy.searchBook('Agile', device);
      });

      it('should show correct results for partial matches', () => {
        cy.searchBook('a', device);
      });

      it('should show a message for no results found', () => {
        cy.searchBook('nonexistentbook', device);
      });
    });
  });
});
describe('Sort Functionality', () => {
  const devices = ['desktop', 'mobile'];
  devices.forEach((device) => {
    describe(`Sort by price on ${device}`, () => {
      it('should display books sorted ascending by price', () => {
        cy.sortBook('asc', device);
      });
      it('should display books sorted descending by price', () => {
        cy.sortBook('desc', device);
      });
    });
  });
});

describe('Search and Sort at the same time', () => {
  const devices = ['desktop', 'mobile'];
  devices.forEach((device) => {
    describe(`Search and Sort on ${device}`, () => {
      it('should display searched books sorted ascending by price', () => {
        cy.searchBook('de', device);
        cy.sortBook('asc', device);
      });
      it('should display searched books sorted descending by price', () => {
        cy.searchBook('de', device);
        cy.sortBook('desc', device);
      });
    });
  });
});
describe('Listing Functionality', () => {
  const devices = ['desktop', 'mobile'];

  devices.forEach((device) => {
    describe(`Listing on ${device}`, () => {
      it('should display list of books with correct titles and prices', () => {
        cy.listing(device);
      });

      it("should add a book to the cart if the 'Add to Cart' button is clicked and when we open the cart page the book should be there", () => {
        // Dynamically selects the first book to make the test resilient to changes in book order
        cy.getFirstBookFromList(device).then(
          ({ bookId, imageSrc, bookTitle }) => {
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
          }
        );
      });
    });
  });
});
