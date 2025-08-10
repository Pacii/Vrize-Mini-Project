# Vrize-Mini-Project
SauceDemo – Playwright + TypeScript (Medior QA Task)
Validate that a logged-in user can open the Product Detail Page (PDP) for “Sauce Labs Backpack” and see an enabled “Add to cart” button.

This project uses Playwright + TypeScript with a clean Page Object Model (POM), cross-browser execution (Chromium/Firefox/WebKit), mobile emulation, and ENV/secret handling via .env or JSON.

**🚀 Features**

Core flow: login → inventory → open PDP → assert title → Add to cart visible & enabled

Cross-browser: Chromium, Firefox, WebKit

Mobile emulation: iPhone 12

Stable selectors: role-based & data-test disambiguation

ENV-aware baseURL and creds via .env (fallback to JSON)

Artifacts on failure (trace/video/screenshot), HTML report

**🧱 Project Structure**
.
├─ package.json
├─ tsconfig.json
├─ playwright.config.ts
├─ .env.example         
├─ data/
│  └─ creds.json          # fallback creds (non-secret)
├─ pages/
│  ├─ BasePage.ts
│  ├─ LoginPage.ts
│  ├─ InventoryPage.ts
│  └─ ProductPage.ts
├─ utils/
│  └─ credentials.ts
└─ tests/
   └─ saucedemo.pdp.spec.ts
✅ Requirements
Node.js 18+

(First run) Playwright browsers: npx playwright install

**⚙️ Setup**

npm i
npx playwright install
cp .env.example .env  # optional: edit SAUCE_USERNAME/SAUCE_PASSWORD or ENV
.env (recommended):

ENV=qa
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
If .env is not provided, the test falls back to data/creds.json.

**🧪 Run Tests**

Desktop browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit

All desktop + mobile
npm run test:all
Mobile emulation
Windows (cmd.exe/PowerShell) note: the project name has a space. The script already uses double quotes to work on Windows.

npm run test:mobile
If you still prefer no quotes, rename the project in playwright.config.ts to mobile-safari and run:

playwright test --project=mobile-safari

**📊 Reports & Debug**
HTML report:

npm run report
Headed mode:

npx playwright test --project=chromium --headed
UI mode:

npx playwright test --ui
Run a single spec:

npx playwright test tests/saucedemo.pdp.spec.ts
Filter by title:

npx playwright test -g "PDP"
🔐 Configuration
Base URL per environment in playwright.config.ts
(ENV=qa|stage|prod), defaults to qa.

**Credentials priority:**

.env → SAUCE_USERNAME / SAUCE_PASSWORD

data/creds.json fallback

Artifacts on failure: traces, videos, screenshots are captured to help triage.

**🧭 Locator Strategy (Why it’s stable)**
Login selectors: IDs for fast, reliable fills/clicks.

Inventory click uses a disambiguated title link (not the product image link) to avoid strict-mode multiple matches.
Example:

ts
// Narrow to the title link (not the image link) using data-test
item.locator('a[data-test$="title-link"]')
PDP assertions use role-based locators where possible:

ts
page.getByRole('button', { name: 'Add to cart' })

**🧩 Common Issues & Fixes**
Two links found for the same product name (strict mode)
Inventory items have both an image link and a title link named “Sauce Labs Backpack”.
Fix: target the title link only:

ts
this.page.locator('.inventory_item', { hasText: name })
         .locator('a[data-test$="title-link"]')
“toBeVisible can be only used with Locator object”
Ensure your Page Object exposes a Locator, not a function/primitive.

ts
// ProductPage.ts
readonly addToCartButton = page.getByRole('button', { name: 'Add to cart' });
Windows quoting for project names with spaces
Use double quotes in package.json scripts:

json
"test:mobile": "playwright test --project=\"Mobile Safari\""
Or rename the project to avoid spaces.

TypeScript can’t see Node globals (fs, path, process, __dirname)
Install Node types and ensure CommonJS:
npm i -D @types/node
tsconfig.json:
json
{ "compilerOptions": { "module": "CommonJS", "types": ["node", "@playwright/test"] } }
test.step not recognized
Update Playwright:
npm i -D @playwright/test@latest

**🌟 Optional Enhancements**

Storage state for “fast path” tests that don’t verify login UI

GitHub Actions CI workflow (Chromium/Firefox/WebKit on push)

Dockerfile for consistent local/CI runs

Want these added? I can provide ready-to-commit files on request.

Happy testing! If you want me to append CI or storage-state login, say the word and I’ll drop the exact files.
