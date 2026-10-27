import type { ProductRequest } from '../../api-tests/models/api-responses';

export const productFixture: Omit<ProductRequest, 'name'> = {
  description: 'Temporary product created by the product listing E2E test.',
  price: 1.23,
  category_id: '01M5YG9S43JCA3KGY82VZ889FQ',
  brand_id: '01M5YG9RQ4W9DQE11VQZ2DSA4N',
  product_image_id: '01M5YG9S5SEPP71E60J42WTEYK',
  is_location_offer: false,
  is_rental: false,
  co2_rating: 'A',
};
