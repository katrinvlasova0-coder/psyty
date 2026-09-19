import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const template = path.join(__dirname, 'og-template.html');
const out = path.join(__dirname, '..', 'public', 'og-image.png');

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 675 },
  deviceScaleFactor: 1,
});

await page.goto(`file://${template}`, { waitUntil: 'networkidle' });
await page.evaluate(async () => {
  await document.fonts.ready;
  const img = document.querySelector('.bg');
  if (img && !img.complete) {
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
  }
});
await page.waitForTimeout(400);

await page.screenshot({
  path: out,
  type: 'png',
  clip: { x: 0, y: 0, width: 1200, height: 675 },
});

await browser.close();
console.log(`Wrote ${out}`);
