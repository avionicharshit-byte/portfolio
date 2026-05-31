import puppeteer from 'puppeteer';
import { mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { html as fiJupiterHtml } from './prd-fi-jupiter.html.mjs';
import { html as duolingoHtml } from './prd-duolingo.html.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/prd');
mkdirSync(outDir, { recursive: true });

const docs = [
  { name: 'fi-jupiter', html: fiJupiterHtml },
  { name: 'duolingo',   html: duolingoHtml   },
];

const browser = await puppeteer.launch({ headless: true });

for (const doc of docs) {
  const page = await browser.newPage();
  await page.setContent(doc.html, { waitUntil: 'networkidle0' });
  const outPath = join(outDir, `${doc.name}.pdf`);
  await page.pdf({
    path: outPath,
    format: 'A4',
    margin: { top: '48px', bottom: '48px', left: '56px', right: '56px' },
    printBackground: true,
  });
  await page.close();
  console.log(`✓ Generated public/prd/${doc.name}.pdf`);
}

await browser.close();
console.log('\nDone — both PDFs saved to public/prd/');
