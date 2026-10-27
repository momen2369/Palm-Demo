import type { ProductRequest } from '../../api-tests/models/api-responses';

export const productFixture: Omit<ProductRequest, 'name'> = {
  description: 'Temporary product created by the product listing E2E test.',
  price: 1.23,
  category_id: '01M5YKQMFDB90R2XWRASQV6CDX',
  brand_id: '01M5YKQM0YRR4JY6FGWRJTV2X3',
  product_image_id: '01M5YKQMG4ZSBQ87GWPXF745Y2',
  is_location_offer: false,
  is_rental: false,
  co2_rating: 'A',
};
