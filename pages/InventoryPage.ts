// pages/InventoryPage.ts
import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = page.locator(".inventory_list");
  }

  async assertLoaded() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  // Target the TITLE link, not the image link:
  // Each item has two <a>; the title link carries a data-test ending with "-title-link".
  private titleLinkFor(name: string): Locator {
    const item = this.page.locator(".inventory_item").filter({ hasText: name });
    return item.locator('a[data-test$="title-link"]');
  }

  async openProductByName(name: string) {
    await this.assertLoaded(); // ensure inventory is rendered
    const link = this.titleLinkFor(name);
    await expect(link, `Title link for "${name}" should exist`).toHaveCount(1);
    await link.click();
    await expect(this.page).toHaveURL(/inventory-item\.html/);
  }
}
