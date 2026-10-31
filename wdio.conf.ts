import fs from 'fs'
import path from 'path'
import { mkdirSync } from 'fs';

const HEADLESS = process.env.HEADLESS === 'false'

export const config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  specs: ['./features/**/*.feature'],
  exclude: [],
  maxInstances: 1,

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--window-size=1920,1080',
          ...(HEADLESS ? ['--headless=new', '--disable-gpu'] : []),
        ],
      },
    },
  ],

  logLevel: 'info',
  bail: 0,
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'cucumber',
  cucumberOpts: {
    require: ['./step-definitions/*.ts'],
    timeout: 60000,
    tags: 'not @wip',
    strict: false,
  },

  reporters: [
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      addConsoleLogs: true,
      reportedEnvironmentVars: {
        NODE_VERSION: process.version,
        BROWSER: 'chrome',
      },
    }],
  ],

  automationProtocol: 'webdriver',
  screenshotPath: './error-screenshots',

  onComplete: () => { },
  onPrepare: () => { },

  afterScenario: async function (scenario) {
    const scenarioName = scenario?.pickle?.name ?? scenario?.name ?? 'scenario';

    const tmpDir = path.resolve(process.cwd(), 'tmp');
    mkdirSync(tmpDir, { recursive: true });

    const safeName = scenarioName.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_');
    const pngPath = path.join(tmpDir, `${safeName}.png`);
    const status = scenario?.result?.status ?? scenario?.pickle?.result?.status;

    try {
      const ok = await browser.saveScreenshot(pngPath);

      const exists = fs.existsSync(pngPath);
      console.log(`PNG exists? ${exists}`);

      if (status === 'passed') {
        console.log(`SCENARIO PASSED: ${scenarioName}`);
      } else if (status === 'failed') {
        const err = scenario?.result?.error ?? scenario?.pickle?.result?.error;
        console.log(`SCENARIO FAILED: ${scenarioName}`);
        console.log(`Error: ${err?.message ?? '(no message)'}`);
      } else if (status === 'skipped') {
        console.log(`SCENARIO SKIPPED: ${scenarioName}`);
      } else {
        // covers: crashed/unknown/undefined
        const err = scenario?.result?.error ?? scenario?.pickle?.result?.error;
        console.log(`SCENARIO FAILED / CRASHED: ${scenarioName}`);
        if (err?.message) console.log(`Error: ${err.message}`);
      }
    } catch (e) {
      console.error(`Error saving screenshot at ${pngPath}:`, e);
    }

    try {
      const allureAny: any = (globalThis as any).allure;

      if (typeof allureAny?.addAttachment === 'function') {
        const data = fs.readFileSync(pngPath);
        allureAny.addAttachment('Screenshot', data, 'image/png');
        return;
      }

      if (typeof (require('allure-js-commons') as any).attachmentPath === 'function') {
      }
    } catch (e) {
      console.error('Error attaching screenshot to Allure report:', e);
    }
  },
}