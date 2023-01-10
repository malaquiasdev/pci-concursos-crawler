import { URL, positions } from '../../configs/index';

export async function crawlerJobPositionOffers() {
  const URLs = positions.map(p => getURL(URL.jobPosition, p));
  console.log(URLs);
}

function getURL(baseUrl: string, category: string): string {
  return `${baseUrl}/${category}`;
}
