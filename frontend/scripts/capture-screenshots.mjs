// EcoPilot Screenshot Capture Script
// Uses puppeteer-core with locally available Chrome / headless-shell
import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Try to find an available browser executable
const BROWSER_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Users\\asus\\.cache\\puppeteer\\chrome-headless-shell\\win64-149.0.7827.22\\chrome-headless-shell-win64\\chrome-headless-shell.exe',
];

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../screenshots');
const BASE_URL = 'http://localhost:5174';

const CAPTURES = [
  { name: '01-homepage.png',           url: '/',           waitFor: '.text-gradient', width: 1440, height: 900 },
  { name: '02-calculator.png',         url: '/calculator', waitFor: 'select[name="transport_mode"]', width: 1440, height: 900 },
  { name: '03-calculator-results.png', url: '/calculator', waitFor: 'select[name="transport_mode"]', width: 1440, height: 900, action: 'submitCalculator' },
  { name: '04-dashboard.png',          url: '/dashboard',  waitFor: '.recharts-area', width: 1440, height: 900 },
  { name: '05-ai-coach.png',           url: '/dashboard',  waitFor: '.recharts-area', width: 1440, height: 900, action: 'scrollToAI' },
  { name: '06-mobile-view.png',        url: '/',           waitFor: '.text-gradient', width: 390,  height: 844 },
];

async function findBrowser() {
  for (const p of BROWSER_PATHS) {
    try {
      const { existsSync } = await import('fs');
      if (existsSync(p)) return p;
    } catch {}
  }
  throw new Error('No Chrome executable found. Please install Google Chrome.');
}

async function capture() {
  const executablePath = await findBrowser();
  console.log(`Using browser: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  try {
    for (const cap of CAPTURES) {
      const page = await browser.newPage();
      await page.setViewport({ width: cap.width, height: cap.height, deviceScaleFactor: 2 });

      console.log(`Navigating to ${BASE_URL}${cap.url}...`);
      await page.goto(`${BASE_URL}${cap.url}`, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for key element to be visible
      try {
        await page.waitForSelector(cap.waitFor, { timeout: 10000 });
      } catch {
        console.warn(`  Selector ${cap.waitFor} not found, taking screenshot anyway`);
      }

      // Wait for animations to settle
      await new Promise(r => setTimeout(r, 2000));

      // Perform special actions if needed
      if (cap.action === 'submitCalculator') {
        // Navigate to last step and submit
        for (let i = 0; i < 2; i++) {
          const nextBtn = await page.$('button[class*="bg-slate-900"]');
          if (nextBtn) await nextBtn.click();
          await new Promise(r => setTimeout(r, 600));
        }
        const calcBtn = await page.$('button[class*="bg-emerald-500"]');
        if (calcBtn) {
          await calcBtn.click();
          await new Promise(r => setTimeout(r, 4000));
        }
      }

      if (cap.action === 'scrollToAI') {
        // Scroll to AI coach section (right sidebar)
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.5));
        await new Promise(r => setTimeout(r, 1000));
      }

      const outPath = path.join(SCREENSHOTS_DIR, cap.name);
      await page.screenshot({ path: outPath, type: 'png' });
      console.log(`  Saved: ${outPath}`);

      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log('\nAll screenshots captured successfully.');
}

capture().catch(err => {
  console.error('Screenshot capture failed:', err.message);
  process.exit(1);
});
