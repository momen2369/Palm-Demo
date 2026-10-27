# Palm Demo Playwright Tests

A Playwright framework for testing the Practice Software Testing storefront and API.

## What’s included

- UI end-to-end tests for checkout and API-created product visibility.
- API tests for login and product retrieval.
- Page objects, shared API steps, and typed request/response models.
- GitHub Actions workflows for automatic and manually selected test runs.

## Local setup

**Requirements:** Node.js 22 or later and npm.

Install dependencies and browsers:

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

# Run UI tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run API tests
npx playwright test --project=api

# Run a single test file
npx playwright test tests/e2e-tests/api-created-product.spec.ts --project=chromium

# Open the latest HTML report
npx playwright show-report
```

The checkout test completes a demo order. The API-created-product test creates a temporary product and deletes it after validation.

## GitHub Actions

### Automatic runs

[Playwright Tests](.github/workflows/playwright.yml) runs all four projects on every push and pull request. It installs dependencies and browsers, then uploads the HTML report and test results as workflow artifacts.

Browser binaries are cached between runs. The first run installs Chromium, Firefox, and WebKit; later runs can reuse the cache. The console uses Playwright’s list reporter to show each test name and status. Failed tests retain traces, which are available from the failed test entry in the HTML report; successful-test traces are discarded to reduce artifact size.

> [!WARNING]
> The checkout E2E test may currently fail in the Chromium project on GitHub Actions because the storefront’s security service presents a verification challenge to the CI browser. This is an environment-side block, not a Chromium locator issue; Firefox and WebKit may still pass.
>
> Increasing the locator timeout will not resolve this block. The site owner must allow the runner or provide an approved test environment.
> 
> However all tests are passing locally.
> 
>  <img width="440" height="117" alt="image" src="https://github.com/user-attachments/assets/a56b26ae-97b5-4311-bf8c-82e22a60035a" />


### Manual runs

Run [Playwright Tests (Manual)](.github/workflows/playwright-manual.yml) from **GitHub → Actions → Playwright Tests (Manual) → Run workflow**. Select `all`, `chromium`, `firefox`, `webkit`, or `api`. The workflow installs only the selected browser; an API-only run skips browser installation.

### Reports

Each workflow run provides a run-specific link to the directly viewable report in its summary. The `playwright-report` artifact is also available from the run’s **Artifacts** section. Each Pages deployment replaces the previous report, so use that run’s artifact to access older reports.
