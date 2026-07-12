const {test,expect} = require("@playwright/test")
test.use({headless:false})
test('Wait for Loadstate', async ({page})=>
{
    await page.goto("https://freelance-learn-automation.vercel.app/login")
    await page.getByText("New user? Signup").click()
    // we will use the waitForLoadState() method to wait for the page to load completely before proceeding with the next steps
    await page.waitForLoadState("networkidle")
    // here we are using the networkidle state to wait for the page to load completely, which means that there are no more than 2 network connections for at least 500 ms
    const count = await page.locator("//input[@type='checkbox']").count()
    await page.waitForTimeout(3000)
    expect(count).toBe(4)
})