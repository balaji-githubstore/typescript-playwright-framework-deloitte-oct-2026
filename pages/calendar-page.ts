import type { Page } from "@playwright/test";

export class CalendarPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}