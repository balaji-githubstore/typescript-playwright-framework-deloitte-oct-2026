import { test, expect } from "@playwright/test";

test.describe("login functionality check", () => {

    test("verify valid login", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");

        await page.locator("xpath=//input[@id='authUser']").fill("physician");
        await page.locator("xpath=//input[@id='clearPass']").fill("physician");
        await page.locator("xpath=//select[@name='languageChoice']").selectOption({label:"English (Indian)"});
        await page.locator("xpath=//button[@id='login-button']").click();

        await expect(page.locator("xpath=//span[text()='Calendar']")).toHaveText("Calendar");
    });

    test("verify invalid login", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");

        await page.locator("xpath=//input[@id='authUser']").fill("john");
        await page.locator("xpath=//input[@id='clearPass']").fill("john123");
        await page.locator("xpath=//select[@name='languageChoice']").selectOption({label:"English (Indian)"});
        await page.locator("xpath=//button[@id='login-button']").click();

       //assert the error - Invalid username or password
       await expect(page.locator("xpath=//p[contains(text(),'Invalid')]")).toHaveText("Invalid username or password");
    });

})