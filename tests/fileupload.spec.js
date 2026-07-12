const {test, expect} = require('@playwright/test');
test.use({
  headless: false,
});
test("Verify File Upload", async function({page})
{
    await page.goto("https://the-internet.herokuapp.com/upload")
    await page.locator("#file-upload").setInputFiles('./upload/dummy.txt')
    // await page.locator("#file-upload").setInputFiles([]) is used for removing all the files from the file upload input field
    // await page.locator("#file-upload").setInputFiles(['./upload/dummy.txt','./upload/dummy2.txt']) is used for uploading multiple files at same time
    await page.locator("#file-submit").click()
    expect(await page.locator("//h3")).toHaveText("File Uploaded!")
})