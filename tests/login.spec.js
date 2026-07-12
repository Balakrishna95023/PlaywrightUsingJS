const {test,expect} = require('@playwright/test')
test.use({viewport:{width:1536,height:880}})

test("Valid Login",async function({page}){
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    console.log(await page.viewportSize().width)
    console.log(await page.viewportSize().height)
    // we can set the viewport size in the playwright.config.js file or we can set it in the test file as well
    await page.getByPlaceholder("Username").fill("Admin")
    await page.locator('input[placeholder="Password"]').fill("admin123")
    await page.locator('//button[@type="submit"]').click()
    // await page.waitForTimeout(5000)
    await expect(page).toHaveURL(/dashboard/);
    await page.getByAltText("profile picture").first().click()
    await page.getByText("Logout").click()
    // await page.waitForTimeout(3000)
    await expect(page).toHaveURL(/login/);
})