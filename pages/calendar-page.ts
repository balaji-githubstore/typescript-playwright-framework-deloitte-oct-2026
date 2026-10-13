import { expect, type Page } from "@playwright/test";
import { BasePage } from "./base/base-page.js";

const CALENDAR_HEADER_LOCATOR = "xpath=//span[text()='Calendar']"

export class CalendarPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    public async verifyCalendarHeader(expectedValue: string): Promise<void> {
        // await expect(this.page.locator(CALENDAR_HEADER_LOCATOR)).toHaveText(expectedValue);
        super.verifyText(CALENDAR_HEADER_LOCATOR, expectedValue);
    }

}