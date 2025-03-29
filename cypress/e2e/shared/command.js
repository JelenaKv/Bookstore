Cypress.Commands.add(
  'login',
  (email = null, password = null, device = 'desktop', message = null) => {
    const viewports = {
      mobile: [430, 932], // iPhone 14 Pro Max
      desktop: [1920, 1080],
    };

    cy.visit('https://practice.expandtesting.com/bookstore/user/signin');
    cy.viewport(...(viewports[device] || viewports.desktop));

    if (email) cy.get('#email').click().type(email);
    if (password) cy.get('#password').click().type(password);

    cy.get('#submit').click();

    if (message) {
      cy.checkFlashMessage(message);
      cy.url().should(
        'eq',
        'https://practice.expandtesting.com/bookstore/user/signin'
      );
    } else {
      cy.url().should(
        'eq',
        'https://practice.expandtesting.com/bookstore/user/profile'
      );
    }

    // Handle uncaught exceptions for null reference errors
    Cypress.on('uncaught:exception', (err) =>
      err.message.includes('Cannot read properties of null') ? false : true
    );
  }
);

Cypress.Commands.add('checkFlashMessage', (expectedMessage) => {
  cy.get('#flash').should('be.visible').and('contain', expectedMessage);
});

Cypress.Commands.add(
  'register',
  (
    username = null,
    email = null,
    password = null,
    confirmPassword = null,
    device = 'desktop',
    message = null
  ) => {
    const randomEmail = `test${Date.now()}@example.com`;

    cy.visit('https://practice.expandtesting.com/bookstore/user/signup');

    const viewports = {
      mobile: [430, 932], // iPhone 14 Pro Max
      desktop: [1920, 1080],
    };

    cy.viewport(...(viewports[device] || viewports.desktop));

    if (username) cy.get('#username').click().type(username);
    cy.get('#email')
      .click()
      .type(email || randomEmail);
    if (password) cy.get('#password').click().type(password);
    if (confirmPassword) cy.get('#password2').click().type(confirmPassword);

    cy.get('#submit').click();
    if (message) {
      cy.checkFlashMessage(message);
      cy.url().should(
        'eq',
        'https://practice.expandtesting.com/bookstore/user/signup'
      );
    } else {
      cy.url().should(
        'eq',
        'https://practice.expandtesting.com/bookstore/user/signin'
      );
    }
  }
);
Cypress.Commands.add('checkFlashMessage', (expectedMessage) => {
  cy.get('#flash').should('be.visible').and('contain', expectedMessage);
});

Cypress.Commands.add('searchBook', (searchTerm, device = 'desktop') => {
  // FOR EXAMPLE
  // Books are hardcoded but if there was API we could use it
  // cy.intercept('GET', '/bookstore/books*').as('getBooks');

  cy.visit('https://practice.expandtesting.com/bookstore');

  const viewports = {
    mobile: [430, 932], //  Iphone 14 Pro Max
    desktop: [1920, 1080],
  };

  cy.viewport(...(viewports[device] || viewports.desktop));
  cy.get('#search-input').click().type(searchTerm);
  cy.get('#search-btn').click();
  cy.url().should('include', `search=${searchTerm}`);

  // If we had API
  // Number of displayed books should be the same as API returned
  // cy.wait('@getBooks').then((interception) => {
  //     const expectedResultCount = interception.response.body.books.length;
  //     if (expectedResultCount > 0) {
  //         cy.get('#books .card-product-user').should('have.length', expectedResultCount);
  //         cy.get(".card-title").each(($el) => {
  //             cy.wrap($el)
  //                 .invoke("text")
  //                 .then((text) => {
  //                     expect(text.toLowerCase()).to.include(searchTerm.toLowerCase());
  //                 });
  //         });
  //     } else {
  //         cy.get('#books').should('contain.text', 'Can not find any products');
  //     }
  // });

  cy.get('#books').then(($booksContainer) => {
    const $cardProductUser = $booksContainer.find('.card-product-user');

    if ($cardProductUser.length > 0) {
      cy.get('.card-title').each(($el) => {
        cy.wrap($el)
          .invoke('text')
          .then((text) => {
            expect(text.toLowerCase()).to.include(searchTerm.toLowerCase());
          });
      });
    } else {
      cy.get('#books').should('contain.text', 'Can not find any products');
    }
  });
});
Cypress.Commands.add('sortBook', (sortType, device = 'desktop') => {
  cy.visit('https://practice.expandtesting.com/bookstore');
  const viewports = {
    mobile: [430, 932], // Iphone 14 Pro Max
    desktop: [1920, 1080],
  };

  cy.viewport(...(viewports[device] || viewports.desktop));

  const sortIndex = sortType === 'asc' ? 1 : 2;
  cy.get(`div.filter_sort li:nth-of-type(${sortIndex}) > a`).click({
    force: true,
  });
  cy.url().should('include', `sort=${sortType}`);

  cy.get('#books > div')
    .find('p')
    .then(($pElements) => {
      const texts = $pElements.toArray().map((p) => p.innerText);
      const sortedTexts = [...texts].sort((a, b) =>
        sortType === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
      );
      expect(texts).to.deep.equal(sortedTexts);
    });
});
import mockBooksResponse from '../mockBookResponse';

Cypress.Commands.add('listing', (device = 'desktop') => {
  cy.visit('https://practice.expandtesting.com/bookstore');

  const viewports = {
    mobile: [430, 932], // iPhone 14 Pro Max
    desktop: [1920, 1080],
  };

  cy.viewport(...(viewports[device] || viewports.desktop));

  // Ensure the book list container is loaded before proceeding
  cy.get('#books').should('be.visible');

  // If the API was available (cy.intercept), the test would verify the response directly from the server
  // Verify the number of displayed books matches the mock response
  cy.get('.card-product-user').should(
    'have.length',
    mockBooksResponse.books.length
  );

  // Iterate over each mock book and verify UI elements
  mockBooksResponse.books.forEach((book) => {
    cy.wrap(book).then(() => {
      // Verify book image
      cy.get(`[data-testid="image-${book.id}"]`).should(
        'have.attr',
        'src',
        book.image
      );

      // Verify book title
      cy.get(`[data-testid="title-${book.id}"]`)
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal(book.title);
        });

      // Verify book price (removing € sign)
      cy.get(`[data-testid="price-${book.id}"]`)
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          const priceFromUI = parseFloat(text.replace('€', '').trim());
          expect(priceFromUI).to.equal(book.price);
        });

      // Verify "Add To Cart" button properties and text
      cy.get(`[data-testid="cart-${book.id}"]`)
        .should('exist')
        .and('be.visible')
        .invoke('text')
        .should('not.be.empty')
        .then((text) => {
          const normalizedText = text.replace(/\s+/g, ' ').trim();
          expect(normalizedText).to.equal('Add To Cart');
        });
    });
  });
});

Cypress.Commands.add("getFirstBookFromList", (device) => {
  cy.visit("https://practice.expandtesting.com/bookstore");

  const viewports = {
    mobile: [430, 932], // iPhone 14 Pro Max
    desktop: [1920, 1080],
  };

  cy.viewport(...(viewports[device] || viewports.desktop));

  return cy.get("#books .card-product-user").first().find("p")
    .invoke("attr", "data-testid")
    .then((priceTestId) => {
      const bookId = priceTestId.match(/price-(.+)/)[1]; 

      let imageSrc, bookTitle, price; 

     
      return cy.get(`[data-testid="image-${bookId}"]`).invoke("attr", "src")
        .then((src) => {
          imageSrc = src;

          return cy.get(`[data-testid="title-${bookId}"]`).invoke("text");
        })
        .then((title) => {
          bookTitle = title;

          return cy.get(`[data-testid="price-${bookId}"]`).invoke("text");
        })
        .then((bookPrice) => {
          price = bookPrice.trim(); 

          return { bookId, imageSrc, bookTitle, price }; 
        });
    });
});

