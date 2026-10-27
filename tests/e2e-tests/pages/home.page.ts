import { type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async openProduct(productName: string): Promise<void> {
    await this.page.getByRole('link', { name: 'Home', exact: true }).click();

    const productLink = this.page.getByRole('link', { name: productName, exact: false }).first();
    const securityChallenge = this.page.getByRole('heading', {
      name: 'Performing security verification',
    });

    await productLink.or(securityChallenge).first().waitFor({ state: 'visible' });

    if (await securityChallenge.isVisible()) {
      throw new Error(
        'The storefront returned a Cloudflare security verification page. Ask the site owner to allow the CI runner or provide an approved test environment.',
      );
    }

    await productLink.click();
  }
}
