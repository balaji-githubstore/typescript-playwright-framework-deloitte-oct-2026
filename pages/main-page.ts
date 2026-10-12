import type { Page } from "@playwright/test";

export class MainPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}