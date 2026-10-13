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

    public async switchToPageByTitle(title: string): Promise<Page> {
        const pages = this.page.context().pages();
        for (const p of pages) {
            if ((await p.title()) === title) {
                await p.bringToFront();
                this.page = p;
                return p;
            }
        }
        throw new Error(`No page found with title: ${title}`);
    }

        public async handleAlert(accept: boolean = true, promptText?: string): Promise<string> {
        let message = "";
        this.page.once("dialog", async (dialog) => {
            message = dialog.message();
            if (accept) {
                await dialog.accept(promptText);
            } else {
                await dialog.dismiss();
            }
        });
        return message;
    }
}