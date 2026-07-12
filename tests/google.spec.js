const {test,expect} = require('@playwright/test')
test("Verify Application Title",async function({page}){
    await page.goto("https://www.google.com/")
    const url = await page.url()
    console.log("My url is: " + url)
    const title = await page.title()
    console.log("My title is: " + title)
    await expect(page).toHaveTitle("Google")
})