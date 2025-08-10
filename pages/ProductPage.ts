// pages/ProductPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly title: Locator;
  readonly addToCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator(".inventory_details_name");
    this.addToCart = page.getByRole("button", { name: "Add to cart" });
  }

  async assertOnProduct(name: string) {
    await expect(this.title).toHaveText(name);
    await expect(this.addToCart).toBeVisible();
    await expect(this.addToCart).toBeEnabled();
  }
}
