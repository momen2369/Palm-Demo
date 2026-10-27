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

### Manual workflow

[Playwright Tests (Manual)](.github/workflows/playwright-manual.yml) runs from **GitHub → Actions → Playwright Tests (Manual) → Run workflow**. Choose `all`, `chromium`, `firefox`, `webkit`, or `api`.

Manual runs install only the selected browser; selecting `api` skips browser installation entirely.

### Configure repository secrets

Add these under **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|---|---|
| `PST_BASE_URL` | Storefront base URL, e.g. `https://practicesoftwaretesting.com/` |
| `PST_ADMIN_EMAIL` | Test account email |
| `PST_ADMIN_PASSWORD` | Test account password |
| `PST_API_BASE_URL` | API base URL;



### View workflow reports

Both workflows upload a downloadable `playwright-report` artifact, available from the workflow run’s **Artifacts** section. For a directly viewable report link, enable GitHub Pages under **Settings → Pages** and select **GitHub Actions** as the build and deployment source. When Pages is enabled, the workflow deploys the report and adds its link to the run summary. Without Pages, the summary explains how to enable it and points to the downloadable artifact.
