import { crawlerJobPositionOffers } from './service';

export async function handler() {
  await crawlerJobPositionOffers();
}