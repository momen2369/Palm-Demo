# Palm Demo Playwright Tests

A Playwright test framework for the Practice Software Testing storefront and API. It includes:

- UI end-to-end tests for login, cart checkout, and API-created product visibility.
- API tests for login and retrieving products.
- Page objects, shared API steps, and typed request/response models.
- GitHub Actions workflows for automatic and manually selected test runs.

## Setup

Requirements: Node.js 22 or later and npm.

```bash
npm ci
npx playwright install
```

Create a root `.env` file:

```dotenv
PST_BASE_URL=https://practicesoftwaretesting.com/
PST_API_BASE_URL=https://api.practicesoftwaretesting.com
PST_ADMIN_EMAIL=your-test-account-email
PST_ADMIN_PASSWORD=your-test-account-password
```


## Run tests locally

```bash
# Run all UI and API tests
npx playwright test

# Run UI tests in one browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run API tests
npx playwright test --project=api

# Run one test file
npx playwright test tests/e2e-tests/api-created-product.spec.ts --project=chromium

# Open the latest HTML report
npx playwright show-report
```

The checkout test completes a demo order. The API-created-product test creates a temporary product and deletes it after validation.

## GitHub Actions

### Automatic workflow

[Playwright Tests](.github/workflows/playwright.yml) runs the full suite on every push and pull request. It installs dependencies and browsers, runs all four Playwright projects, and uploads the HTML report and test results as workflow artifacts.

Browser binaries are cached between workflow runs. The first automatic run installs Chromium, Firefox, and WebKit; subsequent runs can reuse the cached browsers.
The workflow log uses Playwright's list reporter to show each test name and status, alongside the HTML report.
Failed CI tests retain Playwright traces, which can be opened from the failed test entry in the HTML report. Successful tests discard their traces to keep report artifacts small.
If CI receives a security-verification page instead of the storefront, the site owner must allow the runner or provide an approved test environment; increasing the locator timeout will not resolve that block.
The checkout E2E test may currently fail in the Chromium project on GitHub Actions because the storefront's security service presents a verification challenge to the CI browser. This is an environment-side block, not a Chromium locator issue; Firefox and WebKit may still pass.

### Manual workflow

[Playwright Tests (Manual)](.github/workflows/playwright-manual.yml) runs from **GitHub → Actions → Playwright Tests (Manual) → Run workflow**. Choose `all`, `chromium`, `firefox`, `webkit`, or `api`.

Manual runs install only the selected browser; selecting `api` skips browser installation entirely.

### View workflow reports

Each workflow run provides a run-specific link to the directly viewable report in its summary. The `playwright-report` artifact is also available from the run’s **Artifacts** section; each Pages deployment replaces the previous report, so use the artifact to access older reports.
