import { test, expect } from "@playwright/test";

test.describe("login functionality check", () => {

    test("verify valid login", async ({ page }) => {
        await page.goto("https://demo.openemr.io/b/openemr/");
        //enter username as admin
        //password as pass
        //select language --> English (Indian)
        //click on login 

        //Assert the Calendar header text
    })

})