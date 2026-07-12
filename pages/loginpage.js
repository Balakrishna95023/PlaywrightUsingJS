const {expect}=require("@playwright/test")
class LoginPage{
    constructor(page){
        this.page=page
        this.header="//h2[normalize-space()='Sign In']"
        this.username="#email1"
        this.password="//input[@placeholder='Enter Password']"
        this.loginbutton="//button[text()='Sign in']"
    }
    async loginToApplication(user,pass)
    {
        await this.page.fill(this.username,user)
        await this.page.fill(this.password,pass)
        await this.page.click(this.loginbutton)
    }
    async verifySignIn()
    {
        await expect.soft(this.page.locator(this.header)).toHaveText("gfj")     // used for assertion execution and continue on failure
        // below 3 lines are used for assertion execution and ignore on failure in the report generated
        // await this.ignoreError(async () => {
        //     await expect(this.page.locator(this.header)).toHaveText("gfj")
        // });
    }
    async ignoreError(action) {
    try {
        await action();
    } catch (e) {
        console.log("Ignored:", e.message);
    }
}
}
module.exports = LoginPage;