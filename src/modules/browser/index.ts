import chromium from 'chrome-aws-lambda';
import * as puppeteer from 'puppeteer';

export async function initBrowser() {
  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });
  }
  return puppeteer.launch({
    headless: false,
  });
}
