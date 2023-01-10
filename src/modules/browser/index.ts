import { Browser } from 'puppeteer';
import puppeteerExtra from 'puppeteer-extra';
import pluginStealth from 'puppeteer-extra-plugin-stealth';

export async function initBrowser(headless: boolean): Promise<Browser> {
  puppeteerExtra.use(pluginStealth());
  const browser = await puppeteerExtra.launch({
    userDataDir: 'puppeteer_data',
    defaultViewport: null,
    args: ['--start-fullscreen'],
    headless,
  });
  return browser;
}
