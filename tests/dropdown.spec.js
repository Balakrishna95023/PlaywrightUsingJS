const {test,expect} = require('@playwright/test')
test("Select Values From Dropdown", async function({page})
{
    await page.goto("https://freelance-learn-automation.vercel.app/signup")
    /*
     label
     value
     index
        */
    await page.locator("#state").selectOption({label:"Goa"})
    await page.waitForTimeout(1000)
    await page.locator("#state").selectOption({value:"Himachal Pradesh"})
    await page.waitForTimeout(1000)
    await page.locator("#state").selectOption({index:4})
    await page.waitForTimeout(3000)
    const value = await page.locator("#state").textContent()
    console.log("All dropdown values are: "+value);
    await expect(value.includes("Himachal Pradesh")).toBeTruthy()
    let state = await page.$("#state")
    let allOptions = await state.$$("option")
    let ddStatus = false
    for(let i=0;i<allOptions.length;i++)
    {
        let element = allOptions[i]
        let vaule = await element.textContent()
        if(vaule.includes("Rajasthan"))
        {
            ddStatus = true
            break
        }
    }
    await expect(ddStatus).toBeTruthy()
    await page.locator("#hobbies").selectOption(['Playing','Swimming'])
    await page.waitForTimeout(3000)
})
