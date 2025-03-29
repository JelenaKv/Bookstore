import 'cypress-performance';

describe('Performance Tests for Bookstore', () => {
  describe('Using preset SLOW_3G network conditions', () => {
    it('should have a slow load time with SLOW_3G', () => {
      // Set network conditions before visiting the page
      cy.setNetworkConditions('SLOW_3G');
      cy.visit('https://practice.expandtesting.com/bookstore');

      cy.performance().then((metrics) => {
        expect(metrics.pageloadTiming).to.be.greaterThan(12000); // Page load time greater than 12 seconds
        expect(metrics.domCompleteTiming).to.be.greaterThan(12000); // DOM complete time greater than 12 seconds
      });

      cy.resetNetworkConditions(); // Reset network conditions to default
    });
  });

  describe('Page Load Time under normal conditions', () => {
    it('should load within 3 seconds', () => {
      cy.visit('https://practice.expandtesting.com/bookstore');

      cy.window().then((win) => {
        const perfData = win.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        expect(pageLoadTime).to.be.lessThan(3000); // Ensure page load is under 3 seconds
      });
    });
  });

  describe('DOM Ready Time', () => {
    it('should have DOM ready in under 2 seconds', () => {
      cy.visit('https://practice.expandtesting.com/bookstore');

      cy.window().then((win) => {
        const domCompleteTime =
          win.performance.timing.domComplete -
          win.performance.timing.navigationStart;
        expect(domCompleteTime).to.be.lessThan(2000); // Ensure DOM is ready under 2 seconds
      });
    });
  });
});
