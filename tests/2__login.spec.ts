import { test, expect } from "@playwright/test";
import { Loginpage } from "../pages/login-page.js";

test.describe("login functionality check", () => {

    test("verify valid login", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");


        const loginPage=new Loginpage(page);
        loginPage.enterUsername("admin");
        loginPage.enterPassword("pass");
        loginPage.selectLanguageByLabel("English (Indian)");


        await page.locator("xpath=//button[@id='login-button']").click();
        await expect(page.locator("xpath=//span[text()='Calendar']")).toHaveText("Calendar");
    });

    test("verify invalid login", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");

        const loginPage=new Loginpage(page);
        loginPage.enterUsername("john");
        loginPage.enterPassword("john123");
        loginPage.selectLanguageByLabel("English (Indian)");
        
        await page.locator("xpath=//button[@id='login-button']").click();

       //assert the error - Invalid username or password
       await expect(page.locator("xpath=//p[contains(text(),'Invalid')]")).toHaveText("Invalid username or password");
    });

})