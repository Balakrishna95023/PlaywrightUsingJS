const {test,expect} = require('@playwright/test')
import fs from 'fs';
test.use(
    {
        headless: false
    }
)
test.skip('Basic Form Elements', async function({page})
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator("//input[@id='text-input']").type('Balakrishna')
    await page.locator("//input[@id='password-input']").fill('Bakd@335')
    await page.getByPlaceholder('Enter email').fill('Bala123@gmail.com')
    await page.getByPlaceholder('Enter phone').type('9502345654')
    await page.getByTestId("textarea-input").fill('kumar is automation tester')
    await page.locator('//*[@id="form-submit"]').click()
    const textContent = await page.locator("//*[@data-testid='form-result']").textContent()
    expect(textContent).toEqual('Form submitted successfully')
    await page.waitForTimeout(3000)
})
test('Button Interactions', async ({page})=>
 {
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    // const local_storage = await page.localStorage
    // console.log(local_storage)
    await page.getByLabel('Single click button').click()
    const singleclicktext = await page.getByTestId("single-click-result").innerText()
    expect(singleclicktext==="Single clicked!").toBeTruthy
    await page.getByLabel('Double click button').dblclick()
    const doubleclicktext = await page.getByTestId("double-click-result").textContent()
    expect(doubleclicktext).toEqual("Double clicked!")
    await page.getByLabel('Right click button').click({button: 'right'})
    const rightclicktext = await page.getByTestId('right-click-result').textContent()
    expect.soft(rightclicktext).toContain('Right click captured gg')
    await page.getByText('Start 3s Timer').click()
    expect(await page.getByText("Now Enabled").isVisible({timeout:3000})).toBeTruthy
 }   
)
test('Checkboxes & Radio Buttons', async ({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator('//*[@id="select-all"]').check()
    await page.locator('//*[@id="select-all"]').uncheck()
    await page.locator('//*[@id="check-a"]').check()
    await page.locator('//*[@id="check-b"]').check()
    await page.locator('//*[@id="check-c"]').click()
    expect(await page.locator('//*[@id="check-c"]')).toBeChecked()
    await page.locator('//*[@id="radio-1"]').check()
    const radiobuttonclickedtext = await page.getByTestId("radio-result").textContent()
    expect(radiobuttonclickedtext).toContain("one")
    await page.getByLabel('Reveal checkbox').check()
    const text = await page.getByTestId('revealed-text').innerText()
    expect(text).toEqual('Hidden text is now visible!')
    await page.getByLabel('Reveal checkbox').uncheck()
    expect(await page.getByTestId('revealed-text').isHidden()).toBeTruthy()
    await page.setDefaultTimeout(3000)
})
test('Dropdowns', async ({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator('//*[@id="standard-select"]').click()
    await page.locator('//*[@id="standard-select"]').selectOption('Red')
    expect (await page.locator('//*[@data-testid="standard-select-result"]').textContent()).toContain('red')
    await page.locator('//*[@id="multi-select"]').selectOption(['Java','Python','JavaScript'])
    expect (await page.locator('//*[@data-testid="multi-select-result"]').textContent()).toContain('java, python, javascript')
    await page.locator('//*[@id="custom-dropdown-toggle"]').click()
    await page.locator('//*[@data-testid="custom-option-beta"]').click()
    expect (await page.locator('//*[@data-testid="custom-dropdown-result"]').textContent()).toContain('Beta')
    await page.setDefaultTimeout(3000)
}
)
test('Alerts', async ({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    page.once("dialog", async function(dialog)
    {   expect(dialog.type()).toContain("alert")
        expect(dialog.message()).toContain("This is a practice alert")
        await dialog.accept()
    })
    await page.getByLabel('Show alert').click()
    await page.waitForTimeout(3000)
    expect(await page.getByTestId('alert-result').textContent()).toEqual('Alert was shown and dismissed')
    page.once("dialog", async function(dialog)
    {   expect(dialog.type()).toContain("confirm")
        expect(dialog.message()).toContain("Do you confirm this action?")
        await dialog.dismiss()
    })
    await page.getByLabel('Show confirm').click()
    await page.waitForTimeout(3000)
    expect(await page.getByTestId('alert-result').textContent()).toEqual('Confirm result: Cancel')
    page.once("dialog", async function(dialog)
    {   expect(dialog.type()).toContain("prompt")
        expect(dialog.message()).toContain("Enter a value:")
        await dialog.accept("Bala")
    })
    await page.getByLabel('Show prompt').click()
    await page.waitForTimeout(3000)
    expect(await page.getByTestId('alert-result').textContent()).toEqual('Prompt value: Bala')
})
test('Modals, Iframes', async ({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator('//*[@id="open-modal-btn"]').click()
    await page.waitForTimeout(1000)
    await page.locator('//*[@id="modal-x"]').click()
    await page.waitForTimeout(1000)
    const frame_loc = await page.frameLocator('//*[@data-testid="practice-iframe"]')
    await frame_loc.locator('//*[@id="iframe-input"]').type('test')
    await page.waitForTimeout(1000)
})
test('Drag & Drop', async ({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator('//*[@id="drag-source"]').dragTo(await page.locator('//*[@id="drop-zone"]'))
    expect(await page.getByTestId('drop-result').innerText()=="Item dropped successfully").toBeTruthy()
    await page.locator('//*[text()="Section 15 — Tooltip"]').scrollIntoViewIfNeeded()
    await page.waitForTimeout(5000)
})
test('Hover and access tool tip', async ({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator('#tooltip-trigger').hover();
    const tooltip = page.locator('[role="tooltip"]');
    await expect(tooltip).toBeVisible();
    expect(await tooltip.textContent()).toEqual('This is the tooltip text');
    await page.waitForTimeout(3000)
})
test('Choose file and download txt', async function({page}) {
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator("#file-upload").scrollIntoViewIfNeeded()
    await page.locator("#file-upload").setInputFiles('./package.json')
    expect(await page.getByTestId('file-upload-result').innerText()).toEqual('package.json')
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('download-btn').click()
    const download = await downloadPromise;
    await download.saveAs('D:/Downloads/practice.txt');
    expect(fs.existsSync('D:/Downloads/practice.txt')).toBeTruthy()
    expect(await page.getByTestId('download-result').innerText()).toEqual('Download triggered: practice.txt')
    await page.waitForTimeout(3000)
})
test('Multiple Windows and stale element simulation', async({browser})=>
{
    const context = await browser.newContext()
    const page = await context.newPage();
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    const [newPage] = await Promise.all
    (
        [
            context.waitForEvent("page"),
            await page.locator('#open-window-btn').click()
        ]
    )
    // use the below code when we have more child windows

    // const [child1, child2] = await Promise.all([
    //     context.waitForEvent("page"),
    //     context.waitForEvent("page"),
    //     page.locator('#open-window-btn').click()
    // ]);
    await newPage.waitForTimeout(1000)
    expect(await newPage.locator('//head').textContent()).toEqual('')
    await newPage.waitForTimeout(2000)
    await newPage.close()
    await page.locator('#tooltip-trigger').hover();
    await page.locator('//*[text()="Section 15 — Tooltip"]').scrollIntoViewIfNeeded()
    await page.waitForTimeout(3000)
    expect(await page.locator('#stale-target').innerText()).toContain('0')
    await page.locator('#stale-refresh-btn').click()
    await page.reload()
    expect(await page.locator('#stale-target').innerText()).toContain('0')
}
)
test('Keyboard Actions and slider', async({page})=>{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator('#keyboard-input').click()
    await page.locator('#keyboard-input').press('Alt')
    expect(await page.locator('//*[@data-testid="keyboard-result"]').innerText()).toContain('Alt')
    await page.locator('#keyboard-input').press('ArrowUp')
    expect(await page.locator('//*[@data-testid="keyboard-result"]').innerText()).toContain('ArrowUp')
    expect(await page.locator('//*[@data-testid="arrow-counter"]').innerText()).toContain('1')
    await page.waitForTimeout(1000)
    const value_a = 10;
    await page.locator('#slider-input').evaluate((element, value_a) => {
    element.value = value_a;
    element.dispatchEvent(new Event('input', { bubbles: true }))
    });

    await page.waitForTimeout(3000)
})

test('Date Picker', async({page})=>
{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice")
    await page.locator('#date-input').fill('2003-09-15')
    expect(await page.getByTestId('date-result').textContent()).toEqual('Chosen date: 2003-09-15')
    await page.waitForTimeout(3000)
})