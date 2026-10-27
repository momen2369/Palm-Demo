export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface ProductsResponse {
  current_page: number;
  data: Product[];
  last_page: number;
  per_page: number;
  total: number;
}
