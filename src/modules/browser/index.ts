import chromium from 'chrome-aws-lambda';

export async function initBrowser(params: LauncherParams) {
  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

interface LauncherParams {
  headless: boolean;
}
