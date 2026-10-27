export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category?: ProductReference;
  brand?: ProductReference;
  product_image?: ProductReference;
}

export interface ProductReference {
  id: string;
  name: string;
}

export interface ProductRequest {
  name: string;
  description: string;
  price: number;
  category_id: string;
  brand_id: string;
  product_image_id: string;
  is_location_offer: boolean;
  is_rental: boolean;
  co2_rating?: string;
}

export interface ProductsResponse {
  current_page: number;
  data: Product[];
  last_page: number;
  per_page: number;
  total: number;
}
