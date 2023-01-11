import ObjectsToCsv from 'objects-to-csv';
import { URL, positions } from '../../configs/index';
import { initBrowser } from '../../modules/browser';

export async function crawlerJobPositionOffers() {
  console.log('crawlerJobPositionOffers STARTED');
  const browser = await initBrowser({ headless: true });
  const page = await browser.newPage();
  const jobs = await getJobsByPostions(['engenheiro-sanitarista'], page);
  console.log('jobs to convert into CSV', jobs.length);
  if (jobs.length > 0) {
    const csv = await convertJobsToCSV(jobs);
    console.log(csv);
  }
  await browser.close();
  console.log('crawlerJobPositionOffers SUCCEED');
}

async function getJobsByPostions(positions, page): Promise<Jobs[]> {
  const jobs: Jobs[] = [];
  const today = new Date();
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
  return jobs;
}

async function convertJobsToCSV(jobs: Jobs[]): Promise<string> {
  const csv = new ObjectsToCsv(jobs);
  return csv.toString();
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

interface Jobs {
  title: string;
  link: string;
  date: string;
  uf: string;
  category?: string;
}
