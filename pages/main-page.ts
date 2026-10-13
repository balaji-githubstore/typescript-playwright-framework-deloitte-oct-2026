import type { Page } from "@playwright/test";
import { BasePage } from "./base/base-page.js";

export class MainPage extends BasePage {
    
    constructor(page: Page) {
       super(page);
    }
}