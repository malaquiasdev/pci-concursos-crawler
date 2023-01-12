import { URL, AWS } from '../../configs/index';
import { initBrowser } from '../../modules/browser';
import { saveFileCSV } from '../../modules/file';

export async function crawlerJobPositionOffers(positions: string[]) {
  console.log('crawlerJobPositionOffers STARTED');
  const browser = await initBrowser({ headless: true });
  const page = await browser.newPage();
  const jobs = await getJobsByPostions(positions, page);
  console.log('jobs to convert into CSV', jobs.length);
  if (jobs.length > 0) {
    await saveFileCSV(jobs, AWS.bucketPath);
  }
  await browser.close();
  console.log('crawlerJobPositionOffers SUCCEED');
}

async function getJobsByPostions(positions: string[], page): Promise<Jobs[]> {
  console.log('getJobsByPostions STARTED', positions.length);
  const jobs: Jobs[] = [];
  const today = new Date();
  try {
    for (const position of positions) {
      const url = getURL(URL.jobPosition, position);
      console.log('url', url);
      await page.goto(url, { waitUntil: 'networkidle0' });
      const list = await crawlerJobPageElements(page);
      for (const element of list) {
        if (new Date(element.date) > today) {
          jobs.push({
            ...element,
            category: position,
          });
        }
      }
    }
  } catch (error) {
    console.error('getJobsByPostions FAILED', error);
    return [];
  }
  console.log('getJobsByPostions SUCCEED');
  return jobs;
}

function getURL(baseUrl: string, category: string): string {
  return `${baseUrl}/${category}`;
}

async function crawlerJobPageElements(page): Promise<Jobs[]> {
  return page.$$eval('.ca', elements =>
    elements.map(e => {
      const title = e.querySelector('a').textContent;
      const link = e.querySelector('a').href;
      const date = e.querySelector('div.ce').textContent;
      const uf = e.querySelector('div.cc').textContent;
      return {
        title,
        link,
        date,
        uf,
      };
    }),
  );
}

export interface Jobs {
  title: string;
  link: string;
  date: string;
  uf: string;
  category?: string;
}
