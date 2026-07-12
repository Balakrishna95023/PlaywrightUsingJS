const {test,expect} = require('@playwright/test')

test.use({headless:false})

test("Verify Application title using keyboard", async function({page})
{
    await page.goto("https://www.google.com/")
    await page.locator("//textarea[@name='q']").type("Learn playwright using")
    await page.waitForSelector("//*[@id='Alh6id']/div[1]/div/ul/li")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("ArrowDown")
    await page.keyboard.press("Enter")
    await page.waitForTimeout(3000)
})

test("Verify Application title using for loop", async function({page})
{
    await page.goto("https://www.google.com/")
    await page.locator("//textarea[@name='q']").type("Learn playwright using")
    await page.waitForSelector("//*[@id='Alh6id']/div[1]/div/ul/li")
    const elements = await page.$$("//*[@id='Alh6id']/div[1]/div/ul/li")
    await page.waitForTimeout(3000)
    for(let i=0;i<elements.length;i++)
    {
        const text = await elements[i].textContent()
        if(text.includes("python"))
        {
            await elements[i].click()
            break
        }
    }
    await page.waitForTimeout(3000)
})