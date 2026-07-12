// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  // retries: 2,
  // for the flaky tests we can use the retries option to rerun the test in case of failure. This will help us to avoid the false negatives in our test results. (flaky tests means the tests which are failing randomly due to some reasons like network issues, server issues, etc. and not because of the actual test failure)
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] ,
        viewport: { width: 1536, height: 864 },
        screenshot: 'on',
        video: 'on',
        trace: 'on'
      }
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});




/*
  Major run commands used in playwright CLI are:
  1. npx playwright test
  2. npx playwright test --headed
  3. npx playwright test --debug
  4. npx playwright test --project=Google Chrome
  5. npx playwright test --project=chromium --headed
  6. npx playwright --version
  7. npx playwright --help
  8. npx playwright test sample.spec.js
  9. npx playwright test sample.spec.js --headed
  10. npx playwright test sample.spec.js login.spec.js --headed
  11. npx playwright show-report
  12. npx playwright codegen
  13. npx playwright codegen https://opensource-demo.orangehrmlive.com/web/index.php/auth/login -o ./tests/codegenBranded.spec.js --channel=chrome
  14. npx allure generate ./allure-results
  15. npx allure open ./allure-report
*/