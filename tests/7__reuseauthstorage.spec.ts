import { test, expect } from '@playwright/test';

test.use({ storageState: 'auth.json' });

test('Access application without logging in again', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/inventory.html');

    await expect(page.getByText('Products')).toBeVisible();
});


test('verify pet find ', async ({ request }) => {
   
   const response =  await request.get("https://petstore.swagger.io/v2/pet/2");
   await expect(response).toBeOK();
   const responseJson=await response.json();
   await expect(responseJson["id"]).toEqual(2);
});

// What happens here?
// - test.use({ storageState: 'auth.json' }) tells Playwright to load the saved authentication state for tests in this file.
// - Playwright creates a new browser context using that state.
// - The test opens the inventory page directly.
// - If the saved session is valid, the application recognizes the user as logged in.