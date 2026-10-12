import { test, expect } from "@playwright/test";
import { Loginpage } from "../pages/login-page.js";
import { CalendarPage } from "../pages/calendar-page.js";

test.describe("login functionality check", () => {

    test("verify valid login", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");

        const loginPage = new Loginpage(page);
        await loginPage.enterUsername("admin");
        await loginPage.enterPassword("pass");
        await loginPage.selectLanguageByLabel("English (Indian)");
        await loginPage.clickOnLogin();
        const calendarPage = new CalendarPage(page);
        calendarPage.verifyCalendarHeader("Calendar");

    });

    test("verify invalid login", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");

        const loginPage = new Loginpage(page);
        await loginPage.enterUsername("john");
        await loginPage.enterPassword("john123");
        await loginPage.selectLanguageByLabel("English (Indian)");
        await loginPage.clickOnLogin();
        //assert the error - Invalid username or password
        await loginPage.verifyInvalidLoginError("Invalid username or password");
    });

})