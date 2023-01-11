import chromium from 'chrome-aws-lambda';
import * as puppeteer from 'puppeteer';
import { Browser } from 'puppeteer';

export async function initBrowser(params: LauncherParams): Promise<Browser> {
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  }
  return puppeteer.launch({
    headless: params.headless,
  });
}

interface LauncherParams {
  headless: boolean;
}
