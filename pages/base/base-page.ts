import { expect, type Page } from "@playwright/test";


export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async clickElement(locator: string): Promise<void> {
        await this.page.locator(locator).click();
    }

    public async sendTextToElement(locator: string, text: string): Promise<void> {
        await this.page.locator(locator).fill(text);
    }

    public async selectOptionByLabel(locator: string, label: string): Promise<void> {
        await this.page.locator(locator).selectOption({ label: label });
    }

    public async verifyText(locator: string, expectedText: string): Promise<void> {
        await expect(this.page.locator(locator)).toHaveText(expectedText);
    }

    public async verifyPlaceholder(locator: string, expectedValue: string) {
        await expect(this.page.locator(locator)).toHaveAttribute("placeholder", expectedValue);
    }
}