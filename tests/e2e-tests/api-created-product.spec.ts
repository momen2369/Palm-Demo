import { expect, test } from '@playwright/test';
import type {
  LoginResponse,
  Product,
  ProductRequest,
  ProductsResponse,
} from '../api-tests/models/api-responses';
import { CommonApiSteps } from '../api-tests/steps/common.steps';
import { productFixture } from './fixtures/product.fixture';
import { ProductListPage } from './pages/product-list.page';

const email = process.env.PST_ADMIN_EMAIL;
const password = process.env.PST_ADMIN_PASSWORD;

if (!email || !password) {
  throw new Error('Missing PST_ADMIN_EMAIL or PST_ADMIN_PASSWORD in the root .env file.');
}

test('creates a product with the API and finds it in the A-Z product list', async (
  { page, request },
  testInfo,
) => {
  const apiSteps = new CommonApiSteps(request);
  const loginResponse = await apiSteps.login(email, password);
  expect(loginResponse.status()).toBe(200);
  const login = (await loginResponse.json()) as LoginResponse;

  const productsResponse = await apiSteps.getProducts(login.token_type, login.access_token);
  expect(productsResponse.status()).toBe(200);
  const products = (await productsResponse.json()) as ProductsResponse;
  const referenceProduct = products.data.find(
    (product) =>
      product.category?.id && product.brand?.id && product.product_image?.id,
  );
  if (!referenceProduct) {
    throw new Error('The product catalog has no item with category, brand, and image references.');
  }
  const { category, brand, product_image: productImage } = referenceProduct;
  if (!category?.id || !brand?.id || !productImage?.id) {
    throw new Error('The selected catalog item is missing a category, brand, or image reference.');
  }

  const timestamp = Date.now();
  const productName = `A E2E Product ${testInfo.project.name} ${timestamp}`;
  const productRequest: ProductRequest = {
    ...productFixture,
    name: productName,
    category_id: category.id,
    brand_id: brand.id,
    product_image_id: productImage.id,
  };

  let createdProductId: string | undefined;

  try {
    const createResponse = await apiSteps.createProduct(
      productRequest,
      login.token_type,
      login.access_token,
    );
    const createResponseBody = await createResponse.text();
    expect(
      createResponse.status(),
      `Product creation response: ${createResponseBody}`,
    ).toBe(201);
    const createdProduct = JSON.parse(createResponseBody) as Product;
    if (typeof createdProduct.id === 'string') {
      createdProductId = createdProduct.id;
    }

    expect(createdProduct.name).toBe(productName);
    expect(createdProduct.id).toEqual(expect.any(String));

    const productListPage = new ProductListPage(page);
    await productListPage.openSortedByNameAscending();
    await productListPage.expectProductVisible(productName);
  } finally {
    if (createdProductId) {
      const deleteResponse = await apiSteps.deleteProduct(
        createdProductId,
        login.token_type,
        login.access_token,
      );
      expect(deleteResponse.status()).toBe(204);
    }
  }
});
