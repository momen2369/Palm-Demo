import { test } from '@playwright/test';
import { CartPage } from './pages/cart.page';
import { CheckoutPage } from './pages/checkout.page';
import { HomePage } from './pages/home.page';
import { LoginPage } from './pages/login.page';
import { ProductPage } from './pages/product.page';

const email = process.env.PST_ADMIN_EMAIL;
const password = process.env.PST_ADMIN_PASSWORD;
const productName = 'Combination Pliers';

if (!email || !password) {
  throw new Error('Missing PST_ADMIN_EMAIL or PST_ADMIN_PASSWORD in the root .env file.');
}

test('sign in, add a product to the cart, and complete checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.login(email, password);
  await homePage.openProduct(productName);
  await productPage.addToCart(productName);
  await cartPage.open();
  await cartPage.proceedToCheckout(productName);
  await checkoutPage.continueToBillingAddress();
  await checkoutPage.enterBillingAddress({
    countryCode: 'US',
    postalCode: '12345',
    houseNumber: '12',
  });
  await checkoutPage.proceedToPayment();
  await checkoutPage.payByCashOnDelivery();
  await checkoutPage.confirmOrder();
});
