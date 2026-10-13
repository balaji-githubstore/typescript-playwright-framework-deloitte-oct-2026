import { test,expect } from "@playwright/test";


test.describe("OpenEMR Login UI", () => {

    test("verify title", async ({ page }) => {
        await page.goto("");
        await expect(page).toHaveTitle("OpenEMR Login1");
    });

     test("verify header", async ({ page }) => {
        await page.goto("");
        //assert the header - The most popular open-source Electronic Health Record and Medical Practice Management solution.
        await expect(page.locator("xpath=//p[contains(text(),'most popular')]"))
        .toHaveText("The most popular open-source Electronic Health Record and Medical Practice Management solution.")
    });

    test("verify placeholder of username and password", async ({ page }) => {
        await page.goto("");
        await expect(page.locator("xpath=//input[@id='authUser']")).toHaveAttribute("placeholder","Username");
        await expect(page.locator("xpath=//input[@id='clearPass']")).toHaveAttribute("placeholder","Password");
    });

     test("verify acknowledgement Licensing link", async ({ page }) => {
        await page.goto("");
        
        await expect(page.locator("//a[contains(text(),'Licensing')]")).toHaveText("Acknowledgments, Licensing and Certification");
        //contains regex check 
        //https://www.convex.dev/typescript/core-concepts/functions-methods/typescript-regex
        await expect(page.locator("//a[contains(text(),'Licensing')]")).toHaveAttribute("href",/acknowledge_license_cert.html/);
    });
})