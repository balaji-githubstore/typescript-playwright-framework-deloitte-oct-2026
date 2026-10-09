import { test,expect } from "@playwright/test";


test.describe("OpenEMR Login UI", () => {

    test("verify title", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");
        await expect(page).toHaveTitle("OpenEMR Login");
    });

     test("verify header", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");
        //assert the header - The most popular open-source Electronic Health Record and Medical Practice Management solution.
        await expect(page.locator("xpath=//p[contains(text(),'most popular')]"))
        .toHaveText("The most popular open-source Electronic Health Record and Medical Practice Management solution.")
    })

    test("verify placeholder of username and password", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");
        await expect(page.locator("xpath=//input[@id='authUser']")).toHaveAttribute("placeholder","Username");
        await expect(page.locator("xpath=//input[@id='clearPass']")).toHaveAttribute("placeholder","Password");
    });
})