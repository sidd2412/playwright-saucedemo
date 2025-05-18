const { defineConfig } = require('@playwright/test');
const { config } = require('./utils/config');

// Determine environment: 'qa' or 'stage'
const envName = process.env.REPORTER || config.envName || 'qa';

// Dynamically configure Allure output folder
const allureOutputFolder = envName === 'stage' ? 'allure-results-stage' : 'allure-results-qa';

// Dynamically set reporters
const selectedReporter = [
  ['html'],
  ['junit', { outputFile: `${envName}-results.xml` }],
  ['allure-playwright', { outputFolder: allureOutputFolder }]
];

const allProjects = {
  Chrome: {
    name: 'Chrome',
    use: {
      browserName: 'chromium',
      channel: 'chrome',
      headless: config.headless,
      viewport: { width: 1280, height: 820 },
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      trace: 'retain-on-failure',
    },
  },
  Firefox: {
    name: 'Firefox',
    use: {
      browserName: 'firefox',
      headless: config.headless,
      viewport: { width: 1720, height: 850 },
      ignoreHTTPSErrors: true,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      trace: 'retain-on-failure',
      launchOptions: { slowMo: 200 },
    },
  },
  Safari: {
    name: 'Safari',
    use: {
      browserName: 'webkit',
      headless: config.headless,
      viewport: { width: 1720, height: 850 },
      ignoreHTTPSErrors: true,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      trace: 'retain-on-failure',
    },
  },
  Edge: {
    name: 'Edge',
    use: {
      browserName: 'chromium',
      channel: 'msedge',
      headless: config.headless,
      viewport: { width: 1720, height: 850 },
      ignoreHTTPSErrors: true,
      screenshot: 'only-on-failure',
      video: 'retain-on-failure',
      trace: 'retain-on-failure',
      launchOptions: { slowMo: 100 },
    },
  },
};

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 0,
  workers: 1,
  reporter: selectedReporter,
  use: {
    baseURL: config.baseUrl,
  },
  projects: config.selectedBrowsers
    .map(browserName => allProjects[browserName.trim()])
    .filter(Boolean),
});
