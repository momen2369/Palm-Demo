import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: /cart/i }).click();
  }

  async proceedToCheckout(productName: string): Promise<void> {
    await expect(this.page.getByRole('row').filter({ hasText: productName })).toBeVisible();
    await this.page.getByRole('button', { name: 'Proceed to checkout' }).click();
  }
}
