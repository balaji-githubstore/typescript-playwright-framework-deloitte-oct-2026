import { expect, type Page } from "@playwright/test";

const CALENDAR_HEADER_LOCATOR = "xpath=//span[text()='Calendar']"

export class CalendarPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async verifyCalendarHeader(expectedValue: string): Promise<void> {
        await expect(this.page.locator(CALENDAR_HEADER_LOCATOR)).toHaveText(expectedValue);
    }

}