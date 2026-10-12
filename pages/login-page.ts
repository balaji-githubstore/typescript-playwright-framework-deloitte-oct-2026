import { expect, type Page } from "@playwright/test"

const USERNAME_LOCATOR = "xpath=//input[@id='authUser']"
const PASSWORD_LOCATOR = "xpath=//input[@id='clearPass']"
const LANGUAGE_LOCATOR = "xpath=//select[@name='languageChoice']"
const LOGIN_LOCATOR = "xpath=//button[@id='login-button']"
const INVALID_LOCATOR = "xpath=//p[contains(text(),'Invalid')]"

export class Loginpage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async enterUsername(username: string): Promise<void> {
        await this.page.locator(USERNAME_LOCATOR).fill(username);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.page.locator(PASSWORD_LOCATOR).fill(password);
    }

    public async selectLanguageByLabel(languageLabel: string): Promise<void> {
        await this.page.locator(LANGUAGE_LOCATOR).selectOption({ label: languageLabel });
    }

    public async clickOnLogin(): Promise<void> {
        await this.page.locator(LOGIN_LOCATOR).click();
    }

    public async verifyInvalidLoginError(expectedError: string): Promise<void> {
        await expect(this.page.locator(INVALID_LOCATOR)).toHaveText(expectedError);
    }

    public async verifyUsernamePlaceholder(expectedValue: string) {
        await expect(this.page.locator(USERNAME_LOCATOR)).toHaveAttribute("placeholder", expectedValue);
    }

    public async verifyPasswordPlaceholder(expectedValue: string) {
        await expect(this.page.locator(PASSWORD_LOCATOR)).toHaveAttribute("placeholder", expectedValue);
    }
}

