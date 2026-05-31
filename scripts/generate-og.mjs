import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public');

const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face { font-family: 'sans'; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#FAF8F4"/>

  <!-- Grain texture overlay -->
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="0.03"/>

  <!-- Left accent bar -->
  <rect x="64" y="64" width="3" height="120" fill="#1B3BFF"/>

  <!-- Name -->
  <text x="88" y="122" font-family="Georgia, serif" font-size="18" fill="#6B6B6B" letter-spacing="3" font-weight="400">HARSHIT DEV YADAV</text>

  <!-- Headline line 1 -->
  <text x="88" y="240" font-family="Georgia, serif" font-size="68" fill="#0D0D0D" font-weight="600" letter-spacing="-2">Product judgment.</text>

  <!-- Headline line 2 -->
  <text x="88" y="322" font-family="Georgia, serif" font-size="68" fill="#0D0D0D" font-weight="600" letter-spacing="-2">Engineering execution.</text>

  <!-- Divider rule -->
  <line x1="88" y1="370" x2="400" y2="370" stroke="#E2DED8" stroke-width="1"/>

  <!-- Sub-line -->
  <text x="88" y="408" font-family="'Courier New', monospace" font-size="20" fill="#6B6B6B" letter-spacing="0.5">0 → 6,000+ devices shipped · AI products end-to-end</text>

  <!-- Metric chips -->
  <rect x="88" y="460" width="180" height="52" rx="4" fill="#F0EDE8"/>
  <text x="108" y="481" font-family="'Courier New', monospace" font-size="11" fill="#6B6B6B" letter-spacing="2">DEVICES SHIPPED</text>
  <text x="108" y="502" font-family="'Courier New', monospace" font-size="20" fill="#1B3BFF" font-weight="600">6,000+</text>

  <rect x="280" y="460" width="160" height="52" rx="4" fill="#F0EDE8"/>
  <text x="300" y="481" font-family="'Courier New', monospace" font-size="11" fill="#6B6B6B" letter-spacing="2">FIRST-PASS YIELD</text>
  <text x="300" y="502" font-family="'Courier New', monospace" font-size="20" fill="#1B3BFF" font-weight="600">90%</text>

  <rect x="452" y="460" width="180" height="52" rx="4" fill="#F0EDE8"/>
  <text x="472" y="481" font-family="'Courier New', monospace" font-size="11" fill="#6B6B6B" letter-spacing="2">OFFICER THROUGHPUT</text>
  <text x="472" y="502" font-family="'Courier New', monospace" font-size="20" fill="#1B3BFF" font-weight="600">~2×</text>

  <!-- Right side accent -->
  <rect x="${W - 3}" y="0" width="3" height="${H}" fill="#1B3BFF" opacity="0.15"/>

  <!-- Bottom rule -->
  <line x1="64" y1="${H - 48}" x2="${W - 64}" y2="${H - 48}" stroke="#E2DED8" stroke-width="1"/>
  <text x="88" y="${H - 26}" font-family="'Courier New', monospace" font-size="14" fill="#6B6B6B" letter-spacing="1">harshityadav.dev</text>
</svg>
`;

mkdirSync(outDir, { recursive: true });

await sharp(Buffer.from(svg))
  .resize(W, H)
  .png()
  .toFile(join(outDir, 'og-image.png'));

console.log('✓ Generated public/og-image.png');
