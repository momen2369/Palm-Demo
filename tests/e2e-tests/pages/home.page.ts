import { type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async openProduct(productName: string): Promise<void> {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: productName, exact: false }).first().click();
  }
}
