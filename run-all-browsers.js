const { execSync } = require('child_process');

const browsers = ['chrome', 'edge'];

let failedTests = false;

for (let i = 0; i < browsers.length; i++) {
    const browser = browsers[i];
    console.log(`Running Cypress tests on ${browser}...`);
    try {
        execSync(`cypress run --reporter cypress-mochawesome-reporter --headless --browser ${browser}`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error running tests on ${browser}: Exit code ${error.status}`);
        failedTests = true;
    }
}

if (failedTests) {
    process.exit(1);
}

