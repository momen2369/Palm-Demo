import type { ProductRequest } from '../../api-tests/models/api-responses';

export const productFixture: Pick<
  ProductRequest,
  'description' | 'price' | 'is_location_offer' | 'is_rental' | 'co2_rating'
> = {
  description: 'Temporary product created by the product listing E2E test.',
  price: 1.23,
  is_location_offer: false,
  is_rental: false,
  co2_rating: 'A',
};
