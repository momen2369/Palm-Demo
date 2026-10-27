import { expect, type Page } from '@playwright/test';

export class ProductListPage {
  constructor(private readonly page: Page) {}

  async openSortedByNameAscending(): Promise<void> {
    await this.page.goto('/');
    await this.page.getByTestId('sort').selectOption('name,asc');
    await expect(this.page.getByTestId('sort')).toHaveValue('name,asc');
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(
      this.page.getByRole('heading', { name: productName, exact: true }),
    ).toBeVisible();
  }
}
