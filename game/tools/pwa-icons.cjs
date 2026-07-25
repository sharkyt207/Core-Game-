// Renders the icons a PWA needs so the game installs to the home screen with a
// proper app icon on both iOS and Android.
//   icon-192 / icon-512   standard PWA icons
//   icon-maskable-512     Android adaptive: art inset into the 80% safe zone
//   apple-touch-icon      iOS home screen (180, opaque — iOS ignores alpha)
// Usage: ICON=A node pwa-icons.cjs      (CHROMIUM=/path/to/chrome to override)
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');

const SC = __dirname;
const OUT = path.resolve(SC, '..', 'public', 'icons');
fs.mkdirSync(OUT, { recursive: true });

const PICK = process.env.ICON || 'A';
const svg = fs.readFileSync(path.join(SC, 'icons', `icon_${PICK}.svg`), 'utf8');
const BG = '#05040a';

// `inset` shrinks the art so Android's circular/squircle mask never crops it.
const page = (n, inset) => `
<style>
  *{margin:0;padding:0}
  html,body{width:${n}px;height:${n}px;overflow:hidden;background:${BG};}
  .box{width:${n}px;height:${n}px;display:flex;align-items:center;justify-content:center;background:${BG};}
  svg{display:block;width:${Math.round(n * (1 - inset * 2))}px;height:${Math.round(n * (1 - inset * 2))}px;}
</style>
<div class="box">${svg}</div>`;

const TARGETS = [
  { file: 'icon-192.png', size: 192, inset: 0 },
  { file: 'icon-512.png', size: 512, inset: 0 },
  { file: 'icon-maskable-512.png', size: 512, inset: 0.1 }, // 80% safe zone
  { file: 'apple-touch-icon.png', size: 180, inset: 0 },
];

(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM || undefined,
    args: ['--no-sandbox', '--disable-gpu', '--force-color-profile=srgb'],
  });
  for (const t of TARGETS) {
    const pg = await b.newPage({ viewport: { width: t.size, height: t.size }, deviceScaleFactor: 1 });
    await pg.setContent(page(t.size, t.inset), { waitUntil: 'networkidle' });
    await pg.screenshot({ path: path.join(OUT, t.file), omitBackground: false });
    await pg.close();
    const kb = (fs.statSync(path.join(OUT, t.file)).size / 1024) | 0;
    console.log(`${t.file.padEnd(24)} ${t.size}x${t.size}  ${kb} KB`);
  }
  await b.close();
  console.log(`\nconcept ${PICK} -> ${OUT}`);
})().catch((e) => { console.log('ERR', e.stack || e.message); process.exit(1); });
