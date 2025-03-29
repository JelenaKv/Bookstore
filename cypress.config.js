const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  env: {
    CARD_HOLDER_NAME: process.env.CARD_HOLDER_NAME,
    CARD_HOLDER_ADDRESS: process.env.CARD_HOLDER_ADDRESS,
    CREDIT_CARD_NUMBER: process.env.CREDIT_CARD_NUMBER,
    CREDIT_CARD_EXPIRY_MONTH: process.env.CREDIT_CARD_EXPIRY_MONTH,
    CREDIT_CARD_EXPIRY_YEAR: process.env.CREDIT_CARD_EXPIRY_YEAR,
    CREDIT_CARD_CVC: process.env.CREDIT_CARD_CVC,
  },
  e2e: {
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
