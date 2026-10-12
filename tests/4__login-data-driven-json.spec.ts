import { test, expect } from "@playwright/test";
import { JsonUtils } from "../utils/json-utils.js"
import { Loginpage } from "../pages/login-page.js";
import { CalendarPage } from "../pages/calendar-page.js";

//data driven using json file
test.describe("login functionality check", () => {

    const validLoginData = JsonUtils.getJSONValue("validLoginData");
    for (let { username, password, language, expectedValue } of validLoginData) {
        test(`verify valid login ${username} and ${password}`, async ({ page }) => {
            await page.goto("");

            const loginPage = new Loginpage(page);
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.selectLanguageByLabel(language);
            await loginPage.clickOnLogin();
            const calendarPage = new CalendarPage(page);
            calendarPage.verifyCalendarHeader(expectedValue);
        });
    };

    const invalidLoginData = JsonUtils.getJSONValue("invalidLoginData");
    for (let { username, password, language, expectedError } of invalidLoginData) {
        test(`verify invalid login ${username} and ${password}`, async ({ page }) => {
            await page.goto("");

            const loginPage = new Loginpage(page);
            await loginPage.enterUsername(username);
            await loginPage.enterPassword(password);
            await loginPage.selectLanguageByLabel(language);
            await loginPage.clickOnLogin();
            await loginPage.verifyInvalidLoginError(expectedError);
        });
    };
});