import { expect, test } from '@playwright/test';
import type { LoginResponse, Product, ProductsResponse } from './models/api-responses';
import { CommonApiSteps } from './steps/common.steps';

const email = process.env.PST_ADMIN_EMAIL;
const password = process.env.PST_ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error('Missing PST_ADMIN_EMAIL or PST_ADMIN_PASSWORD in the root .env file.');
}

test('logs in and retrieves the products list with the access token', async ({ request }) => {
  const apiSteps = new CommonApiSteps(request);
  const loginResponse = await apiSteps.login(email, password);
  expect(loginResponse.status()).toBe(200);
  expect(loginResponse.headers()['content-type']).toContain('application/json');

  const loginBody = (await loginResponse.json()) as LoginResponse;
  expect(loginBody.access_token).toEqual(expect.any(String));
  expect(loginBody.access_token.length).toBeGreaterThan(0);
  expect(loginBody.token_type).toMatch(/^Bearer$/i);
  expect(loginBody.expires_in).toBeGreaterThan(0);

  const productsResponse = await apiSteps.getProducts(
    loginBody.token_type,
    loginBody.access_token,
  );
  expect(productsResponse.status()).toBe(200);
  expect(productsResponse.headers()['content-type']).toContain('application/json');

  const productsBody = (await productsResponse.json()) as ProductsResponse;
  expect(productsBody.current_page).toBeGreaterThan(0);
  expect(productsBody.last_page).toBeGreaterThan(0);
  expect(productsBody.per_page).toBeGreaterThan(0);
  expect(productsBody.total).toBeGreaterThan(0);
  expect(productsBody.data.length).toBeGreaterThan(0);

  for (const product of productsBody.data) {
    expect(product.id).toEqual(expect.any(String));
    expect(product.name).toEqual(expect.any(String));
    expect(product.price).toEqual(expect.any(Number));
  }
});
