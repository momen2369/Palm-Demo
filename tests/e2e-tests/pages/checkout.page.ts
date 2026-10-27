import { expect, type Page } from '@playwright/test';

interface AddressLookup {
  countryCode: string;
  postalCode: string;
  houseNumber: string;
}

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async continueToBillingAddress(): Promise<void> {
    await expect(this.page.getByText(/you are already logged in/i)).toBeVisible();
    await this.page.getByRole('button', { name: 'Proceed to checkout' }).click();
    await expect(this.page.getByRole('heading', { name: 'Billing Address' })).toBeVisible();
  }

  async enterBillingAddress(address: AddressLookup): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Country' }).selectOption(address.countryCode);
    await this.page.getByRole('textbox', { name: 'Postal code' }).fill(address.postalCode);
    await this.page.getByTestId('house_number').fill(address.houseNumber);

    await expect(this.page.getByRole('textbox', { name: 'Street' })).toHaveValue(/.+/);
    await expect(this.page.getByRole('textbox', { name: 'City' })).toHaveValue(/.+/);
    await expect(this.page.getByRole('textbox', { name: 'State' })).toHaveValue(/.+/);
  }

  async proceedToPayment(): Promise<void> {
    await this.page.getByRole('button', { name: 'Proceed to checkout' }).click();
    await expect(this.page.getByRole('heading', { name: 'Payment' })).toBeVisible();
  }

  async payByCashOnDelivery(): Promise<void> {
    await this.page.getByRole('combobox', { name: 'Payment Method' }).selectOption({
      label: 'Cash on Delivery',
    });
    await this.page.getByRole('button', { name: 'Check payment' }).click();
    await expect(this.page.getByText('Payment was successful')).toBeVisible();
  }

  async confirmOrder(): Promise<void> {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await expect(
      this.page.getByText(/Thanks for your order! Your invoice number is INV-\d+/),
    ).toBeVisible();
  }
}
