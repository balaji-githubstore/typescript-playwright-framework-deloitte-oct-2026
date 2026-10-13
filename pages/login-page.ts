import { expect, type Page } from "@playwright/test"
import { BasePage } from "./base/base-page.js"

const USERNAME_LOCATOR = "xpath=//input[@id='authUser']"
const PASSWORD_LOCATOR = "xpath=//input[@id='clearPass']"
const LANGUAGE_LOCATOR = "xpath=//select[@name='languageChoice']"
const LOGIN_LOCATOR = "xpath=//button[@id='login-button']"
const INVALID_LOCATOR = "xpath=//p[contains(text(),'Invalid')]"

export class Loginpage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    public async enterUsername(username: string): Promise<void> {
        // await this.page.locator(USERNAME_LOCATOR).fill(username);
        await super.sendTextToElement(USERNAME_LOCATOR, username);
    }

    public async enterPassword(password: string): Promise<void> {
        // await this.page.locator(PASSWORD_LOCATOR).fill(password);
        await super.sendTextToElement(PASSWORD_LOCATOR, password);
    }

    public async selectLanguageByLabel(languageLabel: string): Promise<void> {
        // await this.page.locator(LANGUAGE_LOCATOR).selectOption({ label: languageLabel });
        await super.selectOptionByLabel(LANGUAGE_LOCATOR, languageLabel);
    }

    public async clickOnLogin(): Promise<void> {
        // await this.page.locator(LOGIN_LOCATOR).click();
        await super.clickElement(LOGIN_LOCATOR);
    }

    public async verifyInvalidLoginError(expectedError: string): Promise<void> {
        // await expect(this.page.locator(INVALID_LOCATOR)).toHaveText(expectedError);
        super.verifyText(INVALID_LOCATOR, expectedError);
    }

    public async verifyUsernamePlaceholder(expectedValue: string) {
        // await expect(this.page.locator(USERNAME_LOCATOR)).toHaveAttribute("placeholder", expectedValue);
        super.verifyPlaceholder(USERNAME_LOCATOR, expectedValue);
    }

    public async verifyPasswordPlaceholder(expectedValue: string) {
        // await expect(this.page.locator(PASSWORD_LOCATOR)).toHaveAttribute("placeholder", expectedValue);
        super.verifyPlaceholder(PASSWORD_LOCATOR, expectedValue);
    }
}

