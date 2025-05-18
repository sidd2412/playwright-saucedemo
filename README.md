
# 🧪 Playwright E2E Automation - SauceDemo

This project uses **Playwright (JavaScript)** for end-to-end testing of the [SauceDemo](https://www.saucedemo.com) application. It features multi-browser support, environment-based reporting with Allure, and API/UI data validation.

---

## 📁 Project Structure

```
.
├── data/
│   └── productData.json          # Mock API data for validation
├── pageobjects/
│   └── cartPageElements.js       # Page Object Model elements
│   └── checkoutPageElements.js
│   └── inventoryPageElements.js
│   └── loginPageElements.js       
├── pages/
│   └── BasePage.js               # Page Object Model classes
│   └── CartPage.js                      
│   └── CheckoutPage.js                  
│   └── InventoryPage.js                 
│   └── LoginPage.js                      
├── tests/
│   └── TC_01_e2e.test.js         # End-to-end test case
├── utils/
│   ├── config.js                 # Config settings (envName, baseURL, etc.)
│   └── testFixture.js            # Custom Playwright fixtures
├── playwright.config.js          # Playwright configuration file
```

---

## 🛠️ Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/playwright-saucedemo.git
   cd playwright-saucedemo
   ```

2. **Install dependencies**
   ```bash
   npm install
   (Optional) if its a fresh setup then run
   npx playwright install
   ```

3. **Install Allure CLI (globally)**
   ```bash
   npm install -g allure-commandline
   ```

---

## 🚀 Running Tests

### ✅ Run All Tests in QA Environment

```bash
$env:REPORTER="qa"
npx playwright test
```

### 🧪 Run All Tests in Stage Environment

```bash
$env:REPORTER="stage"
npx playwright test
```

> 💡 On Mac/Linux, use `export REPORTER="qa"` instead of `$env:`

### ▶ Run a Specific Test File

```bash
npx playwright test tests/TC_01_checkoutWorkflow.test.js
```

---

## 🧱 Headless vs Headed Mode

To control whether Playwright runs in headless or headed mode using the `HEADLESS` environment variable or via configuration.

### 🧩 Set via Command Line

- **Headless mode (default):**
  ```bash
  npx playwright test
  ```

- **Headed mode (see browser actions):**
  ```bash
  HEADLESS=false npx playwright test
  OR
  $env:HEADLESS="false"
  npx playwright test
  ```

> 💡 Ensure configuration (`config.js` or `playwright.config.js`) reads this `HEADLESS` value to toggle modes dynamically.

---

## 📊 Allure Reporting

### Generate and Open Allure Report (QA)

```bash
allure generate allure-results-qa --clean -o allure-report-qa
allure open allure-report-qa
```

### Generate and Open Allure Report (Stage)

```bash
allure generate allure-results-stage --clean -o allure-report-stage
allure open allure-report-stage
```

---

## 🔄 API & UI Data Validation

- The cart data shown on UI is compared with backend data from `data/productData.json`.
- Ensures consistency and price accuracy between frontend and backend.

Validation logic is implemented in `CartPage.js`:

```js
await cartPage.validateCartDataAgainstBackend();
```

---

## 📌 Useful Commands

| Task                         | Command |
|------------------------------|---------|
| Install dependencies         | `npm install` |
| Run QA tests                 | `$env:REPORTER="qa"; npx playwright test` |
| Run Stage tests              | `$env:REPORTER="stage"; npx playwright test` |
| Run specific test            | `npx playwright test tests/<testFile>.test.js` |
| Run in headed mode           | `HEADLESS=false npx playwright test` |
| Generate Allure report       | `allure generate allure-results-qa --clean -o allure-report-qa` |
| Open Allure report           | `allure open allure-report-qa` |

---

## ✅ Features

- ✅ Environment-based config (`qa` / `stage`)
- ✅ API and UI data validation
- ✅ Multi-browser testing (Chrome, Firefox, Safari, Edge)
- ✅ Allure reporting integration
- ✅ Headless/headed mode support
