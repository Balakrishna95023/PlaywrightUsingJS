const {test, expect} = require('@playwright/test');

test.use({
  headless: false,
});

test("Valid Login by mouse hover", async function({page}) {
    await page.goto("https://freelance-learn-automation.vercel.app/login");
    await page.getByPlaceholder("Enter Email").type("admin@email.com")
    await page.getByPlaceholder("Enter Password").type("admin@123")
    await page.getByRole("button", {name:"Sign in"}).click()
    await page.locator("//span[text()='Manage']").hover()
    await page.waitForTimeout(3000)
    await page.locator("//a[normalize-space()='Manage Courses']").click()
    await page.waitForTimeout(3000)
})
