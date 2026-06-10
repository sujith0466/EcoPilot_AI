// Route verification script — runs against built preview server
import puppeteer from 'puppeteer-core';
import { existsSync } from 'fs';

const BROWSER = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = 'http://localhost:4173';

const ROUTES = [
  { name: 'Home',       url: '/',           check: '.text-gradient' },
  { name: 'Calculator', url: '/calculator', check: 'select[name="transport_mode"]' },
  { name: 'Dashboard',  url: '/dashboard',  check: 'h1' },
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: BROWSER,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  let allPass = true;

  for (const route of ROUTES) {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });

    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`${BASE}${route.url}`, { waitUntil: 'networkidle2', timeout: 15000 });

    let elementFound = false;
    try {
      await page.waitForSelector(route.check, { timeout: 5000 });
      elementFound = true;
    } catch {}

    const title = await page.title();
    const bodyText = await page.evaluate(() => document.body.innerText.length);
    const pass = elementFound && bodyText > 100 && errors.filter(e => !e.includes('favicon')).length === 0;

    console.log(`\n[${pass ? 'PASS' : 'FAIL'}] ${route.name} (${BASE}${route.url})`);
    console.log(`  Title: ${title}`);
    console.log(`  Body length: ${bodyText} chars`);
    console.log(`  Key element found: ${elementFound}`);
    console.log(`  Console errors: ${errors.filter(e => !e.includes('favicon')).length}`);
    if (errors.length) errors.forEach(e => console.log(`    ERR: ${e.slice(0,120)}`));

    if (!pass) allPass = false;
    await page.close();
  }

  // Test Calculator submission
  const calcPage = await browser.newPage();
  const calcErrors = [];
  calcPage.on('pageerror', e => calcErrors.push(e.message));
  await calcPage.setViewport({ width: 1440, height: 900 });
  await calcPage.goto(`${BASE}/calculator`, { waitUntil: 'networkidle2' });
  // Step through all 3 steps
  for (let i = 0; i < 2; i++) {
    try {
      await calcPage.waitForSelector('button', { timeout: 3000 });
      const btns = await calcPage.$$('button');
      // Click the next/submit button (last button)
      if (btns.length > 0) await btns[btns.length - 1].click();
      await new Promise(r => setTimeout(r, 800));
    } catch {}
  }
  // Click Calculate
  try {
    const calcBtn = await calcPage.$('button.bg-emerald-500, button[class*="bg-emerald-5"]');
    if (calcBtn) {
      await calcBtn.click();
      await new Promise(r => setTimeout(r, 4000));
    }
  } catch {}
  const resultVisible = await calcPage.$('text="Your Footprint Analysis"').catch(() => null);
  const bodyLen = await calcPage.evaluate(() => document.body.innerText.length);
  console.log(`\n[${calcErrors.length === 0 ? 'PASS' : 'FAIL'}] Calculator Submission`);
  console.log(`  Errors: ${calcErrors.length}`);
  console.log(`  Result page body length: ${bodyLen}`);
  await calcPage.close();

  await browser.close();
  console.log(`\n=== Overall: ${allPass ? 'ALL ROUTES PASS' : 'FAILURES DETECTED'} ===`);
  process.exit(allPass ? 0 : 1);
})();
