import { test, expect } from '@playwright/test';

test.describe('OpenEMR Login UI - Show Password Icon', () => {
  test('verify show password icon toggles password visibility', async ({ page }) => {
    // Navigate to OpenEMR login page
    await page.goto('');
    
    // Get the password input field and icon
    const passwordInput = page.locator('#clearPass');
    const passwordIcon = page.locator('#password-icon');
    
    // Enter a password in the password field
    await passwordInput.fill('TestPassword123');
    
    // Verify password is initially hidden (type="password")
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Verify eye icon is visible
    await expect(passwordIcon).toBeVisible();
    
    // Click the show password icon to reveal password
    await passwordIcon.click();
    
    // Verify password is now visible (type="text")
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    // Verify the password value is still correct
    await expect(passwordInput).toHaveValue('TestPassword123');
    
    // Verify icon changed to eye-slash (indicating hide option)
    const iconElement = page.locator('#password-icon');
    await expect(iconElement).toHaveClass(/fa-eye-slash/);
    
    // Click the hide password icon to hide password again
    await passwordIcon.click();
    
    // Verify password is hidden again (type="password")
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Verify the password value is still correct
    await expect(passwordInput).toHaveValue('TestPassword123');
    
    // Verify icon changed back to eye (indicating show option)
    await expect(iconElement).toHaveClass(/fa-eye/);
    await expect(iconElement).not.toHaveClass(/fa-eye-slash/);
  });

  test('verify show password icon works with multiple toggle clicks', async ({ page }) => {
    // Navigate to OpenEMR login page
    await page.goto('');
    
    // Get the password input field and icon
    const passwordInput = page.locator('#clearPass');
    const passwordIcon = page.locator('#password-icon');
    const testPassword = 'SecurePassword456!';
    
    // Enter a password
    await passwordInput.fill(testPassword);
    
    // Toggle show/hide password 3 times and verify each state
    for (let i = 0; i < 3; i++) {
      // Click to show password
      await passwordIcon.click();
      await expect(passwordInput).toHaveAttribute('type', 'text');
      await expect(passwordInput).toHaveValue(testPassword);
      
      // Click to hide password
      await passwordIcon.click();
      await expect(passwordInput).toHaveAttribute('type', 'password');
      await expect(passwordInput).toHaveValue(testPassword);
    }
  });

  test('verify password icon is clickable', async ({ page }) => {
    // Navigate to OpenEMR login page
    await page.goto('');
    
    // Get the icon element
    const passwordIcon = page.locator('#password-icon');
    
    // Verify icon has cursor pointer style
    const cursorStyle = await passwordIcon.evaluate(
      (el) => window.getComputedStyle(el).cursor
    );
    expect(cursorStyle).toBe('pointer');
    
    // Verify icon is visible for interaction
    await expect(passwordIcon).toBeVisible();
  });
});
