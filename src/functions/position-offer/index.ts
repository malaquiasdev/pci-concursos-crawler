import { positions } from '../../configs';
import { crawlerJobPositionOffers } from './service';

export async function handler() {
  await crawlerJobPositionOffers(positions);
}
