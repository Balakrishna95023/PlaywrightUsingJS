const {test,expect} = require('@playwright/test')
import {Module1TestData} from '../google.json'
test.use({headless:false})

for (const [key, value] of Object.entries(Module1TestData)) {
    test(`Data Driven Testing with JSON - ${value}`, async({page}) => {
        await page.goto("https://www.google.com/")
        await page.locator("#APjFqb").click();
        await page.locator("#APjFqb").fill(value);
        await page.waitForTimeout(8000)
        await page.locator("#APjFqb").press("Enter");
    })
}