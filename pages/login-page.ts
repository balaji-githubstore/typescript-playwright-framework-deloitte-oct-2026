import { expect, type Page } from "@playwright/test"

export class Loginpage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async enterUsername(username: string): Promise<void> {
        await this.page.locator("xpath=//input[@id='authUser']").fill(username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.page.locator("xpath=//input[@id='clearPass']").fill(password);
    }

    public async selectLanguageByLabel(languageLabel: string): Promise<void> {
        await this.page.locator("xpath=//select[@name='languageChoice']").selectOption({ label: languageLabel });
    }

    public async clickOnLogin(): Promise<void> {
        await this.page.locator("xpath=//button[@id='login-button']").click();
    }

    public async verifyInvalidLoginError(expectedError: string): Promise<void> {
        await expect(this.page.locator("xpath=//p[contains(text(),'Invalid')]")).toHaveText(expectedError);
    }


}