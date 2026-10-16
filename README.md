# Playwright + TypeScript Automation Framework

Training session project (Deloitte, Oct 2026). It builds a Playwright test framework step by step, using the OpenEMR demo app (`https://demo.openemr.io/b/openemr/`) as the application under test.

## Tech stack

- [Playwright Test](https://playwright.dev/) `@playwright/test`
- TypeScript (ES modules, `"type": "module"`)
- Node.js

## Setup

```bash
npm install
npx playwright install
```

## Running tests

```bash
npx playwright test                              # all tests
npx playwright test tests/2__login.spec.ts       # one file
npx playwright test -g "valid login"             # by test title
npx playwright test --ui                         # UI mode
npx playwright show-report                       # open HTML report
```

## Project structure

```
pages/
  base/base-page.ts     Reusable Playwright actions/assertions (parent of all pages)
  login-page.ts         Login page object (class Loginpage)
  calendar-page.ts      Calendar page object (post-login verification)
  main-page.ts          Main page object (placeholder)
tests/
  1__login-ui.spec.ts                  Basic UI checks (placeholders etc.)
  2__login.spec.ts                     Valid/invalid login, no data-driven
  3__login-data-driven-ts.spec.ts      Data-driven using TypeScript arrays
  4__login-data-driven-json.spec.ts    Data-driven using a JSON file
test-data/data.json     Test data for the JSON data-driven tests
utils/
  data-source.ts        Test data as exported TS arrays
  json-utils.ts         JsonUtils.getJSONValue(key) - reads test-data/data.json
playwright.config.ts    Framework configuration
```

## What was covered in the session

1. **Writing first tests** – `test.describe`, `test`, `page.goto`, locators (XPath), `fill`, `selectOption`, `click`, and assertions with `expect` (`toHaveText`, `toHaveAttribute`).
2. **Valid and invalid login scenarios** – verifying the Calendar page after a good login and the "Invalid username or password" error after a bad one.
3. **Data-driven testing**
   - From a TypeScript file (`utils/data-source.ts`) by looping over arrays and generating a test per row.
   - From a JSON file (`test-data/data.json`) using the `JsonUtils` helper (`fs` + `JSON.parse`).
4. **Page Object Model (POM)**
   - Locators kept as constants in each page file.
   - Page methods (`enterUsername`, `enterPassword`, `selectLanguageByLabel`, `clickOnLogin`, `verifyInvalidLoginError`, ...) so tests read as business steps.
5. **Base page / inheritance** – `BasePage` wraps Playwright keywords (`clickElement`, `sendTextToElement`, `selectOptionByLabel`, `verifyText`, `verifyPlaceholder`); page classes extend it and call `super.<method>`.
6. **Configuration (`playwright.config.ts`)**
   - `baseURL`, so `page.goto("")` opens the app.
   - Timeouts: default test timeout 30s, `expect` timeout set to 30s.
   - `fullyParallel`, `workers`, `retries` (3 locally, 2 on CI), `forbidOnly` on CI.
   - Artifacts: `screenshot: only-on-failure`, `video: on-first-retry`, `trace: on-first-retry`.
   - HTML reporter, headed mode (`headless: false`), Chromium project (other browsers/devices are commented examples).

## Sample test (POM style)

```ts
test("verify valid login", async ({ page }) => {
    await page.goto("");
    const loginPage = new Loginpage(page);
    await loginPage.enterUsername("admin");
    await loginPage.enterPassword("pass");
    await loginPage.selectLanguageByLabel("English (Indian)");
    await loginPage.clickOnLogin();
    await new CalendarPage(page).verifyCalendarHeader("Calendar");
});
```


## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd playwright-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Configuration
The framework is configured via `playwright.config.ts`:
- **Base URL**: Currently set to OrangeHRM demo site
- **Browsers**: Chrome (Firefox and Safari available)
- **Timeouts**: 50 seconds per test
- **Reporting**: HTML reports with trace on retry
- **Screenshots**: On failure only
- **Parallel Execution**: Enabled

## 📝 Writing Tests

### Basic Test Structure
```typescript
import { test, expect } from '../fixtures/base.js';
import { LoginPage } from '../pages/LoginPage.js';

test.describe("Login Tests", () => {
    test('valid login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.fillUsername('Admin');
        await loginPage.fillPassword('admin123');
        await loginPage.clickLogin();
    });
});
```

### Data-Driven Testing
```typescript
// Using JSON data
import { JsonUtils } from '../utils/json-utlis.js';

for (const { username, password, expected_error } of JsonUtils.getJson('invalidLoginData')) {
    test(`invalid login: ${username}`, async ({ page }) => {
        // Test implementation
    });
}

// Using Excel data
import { ExcelUtils } from '../utils/excel-utils.js';

for (const data of ExcelUtils.getSheetToJson('testData')) {
    test(`test with ${data.scenario}`, async ({ page }) => {
        // Test implementation
    });
}
```

### Using Keywords Library
```typescript
import { PlaywrightKeywords } from '../pages/basepage/PlaywrightKeywords.js';

const keywords = new PlaywrightKeywords(page);

// Text operations
await keywords.sendTextToElement('#username', 'testuser');
await keywords.clearInputField('#password');

// Assertions
await keywords.assertElementVisible('#loginButton');
await keywords.assertElementContainsText('#message', 'Welcome');

// Wait operations  
await keywords.waitForElement('#dashboard', 10000);
await keywords.waitForNavigation('/dashboard');

// Table operations
const tableData = await keywords.getTableData('#dataTable');
await keywords.clickTableCell('#dataTable', 0, 2);
```

## 🔧 Utilities

### JSON Utils (`utils/json-utlis.ts`)
```typescript
import { JsonUtils } from '../utils/json-utlis.js';

// Get all data
const data = JsonUtils.getJson();

// Get specific key
const loginData = JsonUtils.getJson('validLoginData');
```

### Excel Utils (`utils/excel-utils.ts`)
```typescript
import { ExcelUtils } from '../utils/excel-utils.js';

// Read sheet as JSON
const data = ExcelUtils.getSheetToJson('SheetName');
```

### Data Sources (`utils/data-source.ts`)
Direct data arrays for simple test scenarios:
```typescript
export const invalidLoginData = [
    { "username": "user1", "password": "pass1", "expected_error": "Invalid credentials" }
];
```

## 🧪 Test Data Management

### JSON Structure (`test-data/data.json`)
```json
{
    "invalidLoginData": [
        {
            "username": "testuser",
            "password": "wrongpass",
            "expected_error": "Invalid credentials"
        }
    ],
    "validLoginData": [
        {
            "username": "Admin", 
            "password": "admin123",
            "expected_value": "Dashboard"
        }
    ]
}
```

### Excel Support
- Place Excel files in `test-data/` directory
- Use `.xlsx` format
- Organize data by sheets for different test scenarios
- First row should contain column headers

## 📊 Reporting and Execution

### Running Tests
```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test login.spec.ts

# Run with specific browser
npx playwright test --project=chromium

# Run tests with tags
npx playwright test --grep @smoke

# Debug mode
npx playwright test --debug

# UI mode
npx playwright test --ui
```

### Test Reports
- **HTML Report**: Generated in `playwright-report/` 
- **Screenshots**: Captured on test failures
- **Traces**: Available for failed tests with retry
- **Video**: Can be enabled in configuration

### Viewing Reports
```bash
# Open HTML report
npx playwright show-report
```

## 🏷️ Test Organization

### Tagging Strategy
Tests support tagging for organized execution:
```typescript
test('login test', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    // Test implementation
});
```

### Test Plans
Documentation and test plans stored in `specs/` directory:
- Markdown format for test scenarios
- Organized by feature areas
- Include test data requirements

## 🔧 Advanced Features

### Custom Assertions
The framework extends Playwright's built-in assertions:
```typescript
await keywords.assertElementHasAttribute('input', 'placeholder', 'Enter username');
await keywords.assertPageTitle('Login Page');
await keywords.assertPageURL(/\/dashboard/);
```

### Error Handling
Comprehensive error handling with descriptive messages:
```typescript
// Automatic retries on element interactions
// Detailed error messages with context
// Screenshot capture on failures
```

### Parallel Execution
- Fully parallel test execution enabled
- Worker configuration based on CI/local environment
- Test isolation maintained

## 🛠️ Dependencies

### Core Dependencies
- `@playwright/test`: ^1.59.1 - Core testing framework
- `typescript`: ^6.0.3 - TypeScript support
- `xlsx`: ^0.18.5 - Excel file operations

### DevDependencies
- `@types/node`: ^25.6.0 - Node.js type definitions

## 📚 Best Practices

### Page Objects
- Keep page objects focused on specific page functionality
- Use descriptive method names
- Implement proper error handling
- Utilize the base keywords library

### Test Data
- Separate test data from test logic
- Use meaningful test data names
- Consider data cleanup requirements
- Implement data validation

### Locators
- Use reliable locator strategies (xpath, css, role-based)
- Store locators as constants
- Implement locator validation
- Consider maintenance and updates

### Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Implement proper test tags
- Consider test dependencies

## 🤝 Contributing

1. Follow TypeScript coding standards
2. Maintain Page Object Model architecture
3. Add comprehensive documentation
4. Include test coverage for new features
5. Update README for significant changes

## Notes / ideas for practice

- `package.json` has no scripts yet; add e.g. `"test": "playwright test"`.
- Some page methods call `super.verifyText(...)` without `await`; add `await` so assertion failures are reliably caught.
- Try enabling Firefox/WebKit projects in the config.
- Extend `MainPage` and add more page objects and tests.
