import type { APIRequestContext, APIResponse } from '@playwright/test';
import type { ProductRequest } from '../models/api-responses';

export class CommonApiSteps {
  private readonly baseUrl: string;

  constructor(private readonly request: APIRequestContext) {
    const baseUrl = process.env.PST_API_BASE_URL;

    if (!baseUrl) {
      throw new Error('PST_API_BASE_URL is not configured.');
    }

    this.baseUrl = baseUrl.replace(/\/+$/, '');
  }

  async login(email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/users/login`, {
      data: { email, password },
    });
  }

  async getProducts(tokenType: string, accessToken: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/products`, {
      headers: this.authorizationHeaders(tokenType, accessToken),
    });
  }

  async createProduct(
    product: ProductRequest,
    tokenType: string,
    accessToken: string,
  ): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/products`, {
      data: product,
      headers: this.authorizationHeaders(tokenType, accessToken),
    });
  }

  async deleteProduct(
    productId: string,
    tokenType: string,
    accessToken: string,
  ): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}/products/${encodeURIComponent(productId)}`, {
      headers: this.authorizationHeaders(tokenType, accessToken),
    });
  }

  private authorizationHeaders(tokenType: string, accessToken: string): Record<string, string> {
    return {
      Authorization: `${tokenType} ${accessToken}`,
    };
  }
}
