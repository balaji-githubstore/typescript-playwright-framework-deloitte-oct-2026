import { test, expect } from "@playwright/test";
import { validLoginData, invalidLoginData } from "./../utils/data-source.js"

test.describe("login functionality check", () => {

    for (let { username, password, language, expectedValue } of validLoginData) {
        test(`verify valid login ${username} and ${password}`, async ({ page }) => {
            await page.goto("https://demo.openemr.io/b/openemr/");

            await page.locator("xpath=//input[@id='authUser']").fill(username);
            await page.locator("xpath=//input[@id='clearPass']").fill(password);
            await page.locator("xpath=//select[@name='languageChoice']").selectOption({ label: language });
            await page.locator("xpath=//button[@id='login-button']").click();

            await expect(page.locator("xpath=//span[text()='Calendar']")).toHaveText(expectedValue);
        });
    }

    for (let { username, password, language, expectedError } of invalidLoginData) {
        test(`verify invalid login ${username} and ${password}`, async ({ page }) => {
            await page.goto("https://demo.openemr.io/b/openemr/");

            await page.locator("xpath=//input[@id='authUser']").fill(username);
            await page.locator("xpath=//input[@id='clearPass']").fill(password);
            await page.locator("xpath=//select[@name='languageChoice']").selectOption({ label: language });
            await page.locator("xpath=//button[@id='login-button']").click();

            await expect(page.locator("xpath=//p[contains(text(),'Invalid')]")).toHaveText(expectedError);
        });
    }


});