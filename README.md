# Playwright TS Automation Framework 🚀

A modern, scalable end-to-end testing framework built with [Playwright](https://playwright.dev/) and TypeScript. This framework leverages the Page Object Model (POM) design pattern and features advanced capabilities like **AI Self-Healing Locators** and **Qase Test Management Integration**.

## ✨ Reporting and Self-Healing

<table>
  <tr>
    <td><img width="1226" height="606" alt="image" src="https://github.com/user-attachments/assets/136e8585-0850-4e8f-a022-d088b9169d6d" /></td>
    <td><img width="1418" height="791" alt="image" src="https://github.com/user-attachments/assets/a70a17f8-6956-4a52-97ca-e4bc48e696fd" /></td>
  </tr>
  <tr>
    <td><img width="1418" height="791" alt="image" src="https://github.com/user-attachments/assets/fe3f0146-1e2b-4b54-906f-7ecd2e0bbb81" /></td>
    <td><img width="1418" height="791" alt="image" src="https://github.com/user-attachments/assets/6f92933c-5be2-438b-8464-3c141641b350" /></td>
  </tr>
</table>

---

## ✨ Key Features

- **TypeScript + Playwright**: Fast, reliable, and strictly typed E2E tests.
- **Page Object Model (POM)**: Highly maintainable and reusable page abstractions.
- **🤖 AI Self-Healing Locators**: Automatically detects broken locators on failure, analyzes the DOM using Google Gemini 2.5 Flash, and suggests robust replacements via a generated Markdown report (`ai-locator-suggestions.md`).
- **📊 Qase Integration**: Seamlessly syncs test runs and results directly to Qase TestOps using the V2 reporter.
- **CI/CD Ready**: Fully configured GitHub Actions workflows for matrix testing, automatic artifact uploads, and secret injection.

---

## 🛠️ Prerequisites

- **Node.js**: v18 or higher recommended.
- **Playwright**: Installed via dependencies.
- **API Keys**: 
  - Gemini API Key (for self-healing)
  - Qase API Token (for test reporting)

---

## 🚀 Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   QASE_API_TOKEN=your_qase_api_token_here
   QASE_PROJECT_CODE=your_qase_project_code
   ```

3. **Install Playwright Browsers** (If not already installed)
   ```bash
   npx playwright install
   ```

---

## 💻 Running Tests

The framework includes several pre-configured npm scripts for easy test execution:

**Run all tests (Headless):**
```bash
npm run test:all:headless
```

**Run all tests (Headed with Trace Viewer):**
```bash
npm run test:all:headed
```

**Run a specific test file (Headed):**
```bash
npm run test:file:headed
```

**Run tests via native Playwright CLI:**
```bash
npx playwright test                 # Run all tests
npx playwright test --ui            # Open Playwright UI mode
npx playwright test tests/auth/     # Run a specific directory
```

---

## 🧠 AI Self-Healing Mechanism

This framework includes an innovative custom fixture (`utils/testFixtures.ts`) that intercepts test failures. 

If a test fails due to a broken locator:
1. The framework captures the raw HTML DOM and strips unnecessary noise (like `<svg>`, `<style>`, and `<script>` tags).
2. It sends the clean DOM and the Playwright error to **Google Gemini 2.5 Flash**.
3. Gemini analyzes the DOM and returns a highly resilient, semantic replacement locator.
4. The framework generates an `ai-locator-suggestions.md` file containing a Markdown-formatted, color-coded `diff` of the old vs. new locator, complete with reasoning and exact file paths.

*Note: In CI (GitHub Actions), this file is automatically uploaded as a build artifact for developers to review.*

---

## 📈 Qase Reporting

Test executions automatically report their status to Qase via the `playwright-qase-reporter` (v2). 
Ensure your `.env` file contains valid credentials, and the Playwright config will seamlessly push results, attachments, and logs to your Qase TestOps dashboard.

---

## 📂 Project Structure

```text
├── .github/workflows/      # CI/CD Pipelines (run-tests.yml, reusable-playwright.yml)
├── pages/                  # Page Object Model classes
├── tests/                  # Playwright Spec files
├── utils/                  # Test data, custom fixtures, and helpers
├── playwright.config.ts    # Global Playwright configuration
├── .env                    # Environment variables (ignored in Git)
└── package.json            # Project dependencies and scripts
```
