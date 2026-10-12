import { test, expect } from "@playwright/test";
import { validLoginData, invalidLoginData } from "./../utils/data-source.js"
import { CalendarPage } from "../pages/calendar-page.js";
import { Loginpage } from "../pages/login-page.js";

//data driven using typescript file
test.describe("login functionality check", () => {

    for (let { username, password, language, expectedValue } of validLoginData) {
        test(`verify valid login ${username} and ${password}`, async ({ page }) => {
            await page.goto("https://demo.openemr.io/b/openemr/");

            const loginPage = new Loginpage(page);
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.selectLanguageByLabel(language);
            await loginPage.clickOnLogin();
            const calendarPage = new CalendarPage(page);
            calendarPage.verifyCalendarHeader(expectedValue);
        });
    };

    for (let { username, password, language, expectedError } of invalidLoginData) {
        test(`verify invalid login ${username} and ${password}`, async ({ page }) => {
            await page.goto("https://demo.openemr.io/b/openemr/");

            const loginPage = new Loginpage(page);
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.selectLanguageByLabel(language);
            await loginPage.clickOnLogin();
            await loginPage.verifyInvalidLoginError(expectedError);
        });
    };
});