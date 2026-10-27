import type { APIRequestContext, APIResponse } from '@playwright/test';

export class CommonApiSteps {
  private readonly baseUrl: string;

  constructor(private readonly request: APIRequestContext) {
    this.baseUrl = (
      process.env.PST_API_BASE_URL ?? 'https://api.practicesoftwaretesting.com'
    ).replace(/\/+$/, '');
  }

  async login(email: string, password: string): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}/users/login`, {
      data: { email, password },
    });
  }

  async getProducts(tokenType: string, accessToken: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}/products`, {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });
  }
}
