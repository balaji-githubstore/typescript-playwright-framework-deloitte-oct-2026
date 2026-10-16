import { test, expect } from "@playwright/test";
import { Loginpage } from "../pages/login-page.js";
import { CalendarPage } from "../pages/calendar-page.js";

test.describe("login functionality check", () => {

    test("verify valid login", async ({ browser }) => {

        //admin login
        const context1=await browser.newContext();
        const page1=await context1.newPage();
        //accountant login 
        const context2=await browser.newContext();
        const page2=await context2.newPage();
        //admin login 
        await page1.goto("");
        const loginPage = new Loginpage(page1);
        await loginPage.enterUsername("admin");
        await loginPage.enterPassword("pass");
        await loginPage.selectLanguageByLabel("English (Indian)");
        await loginPage.clickOnLogin();

        //accountant login 
        await page2.goto("");
        const loginPage1 = new Loginpage(page2);
        await loginPage1.enterUsername("accountant");
        await loginPage1.enterPassword("accountant");
        await loginPage1.selectLanguageByLabel("English (Indian)");
        await loginPage1.clickOnLogin();


    });

})