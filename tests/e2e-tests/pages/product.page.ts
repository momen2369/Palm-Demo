import { expect, type Page } from '@playwright/test';

export class ProductPage {
  constructor(private readonly page: Page) {}

  async addToCart(productName: string): Promise<void> {
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
    await this.page.getByTestId('add-to-cart').click();
    await expect(this.page.getByRole('alert')).toHaveText('Product added to shopping cart.');
  }
}
