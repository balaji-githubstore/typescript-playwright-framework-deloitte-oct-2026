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

     test("verify acknowledgement Licensing link", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");
        
        await expect(page.locator("//a[contains(text(),'Licensing')]")).toHaveText("Acknowledgments, Licensing and Certification");
        await expect(page.locator("//a[contains(text(),'Licensing')]")).toHaveAttribute("href",/acknowledge_license_cert.html/);
    });
})