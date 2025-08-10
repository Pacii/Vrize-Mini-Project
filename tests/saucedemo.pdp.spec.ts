import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { ProductPage } from "../pages/ProductPage";
import { loadCredentials } from "../utils/credentials";

const PRODUCT_NAME = "Sauce Labs Backpack";

// Tag: @smoke @pdp
test.describe("User Journey → PDP validation", () => {
  test('Logged-in user can open PDP and sees enabled "Add to cart"', async ({
    page,
  }) => {
    const creds = loadCredentials();

    await test.step("Login and land on inventory page", async () => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(creds.username, creds.password);

      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(login.productList).toBeVisible();
    });

    await test.step(`Open product PDP → ${PRODUCT_NAME}`, async () => {
      const inventory = new InventoryPage(page);
      await inventory.openProductByName(PRODUCT_NAME);

      const product = new ProductPage(page);
      await expect(product.title).toHaveText(PRODUCT_NAME);
    });

    await test.step('Validate "Add to cart" button', async () => {
      const product = new ProductPage(page);
      await expect(product.addToCart).toBeVisible();
      await expect(product.addToCart).toBeEnabled();
    });
  });
});
