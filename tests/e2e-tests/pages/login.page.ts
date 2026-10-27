import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(email: string, password: string): Promise<void> {
    await this.page.goto('/auth/login');
    await this.page.getByRole('textbox', { name: 'Email address *' }).fill(email);
    await this.page.getByRole('textbox', { name: 'Password *' }).fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();

    await expect(this.page).not.toHaveURL(/\/auth\/login$/);
  }
}
