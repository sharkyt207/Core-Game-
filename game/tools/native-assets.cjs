// Renders the two source images @capacitor/assets needs:
//   resources/icon.png          1024x1024, opaque (iOS rejects alpha)
//   resources/splash.png        2732x2732, logo centred on brand background
//   resources/splash-dark.png   same (the art is already dark)
// Switch icon concept with: ICON=B node native-assets.js
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const SC = __dirname;
const RES = path.resolve(SC, '..', 'resources');
fs.mkdirSync(RES, { recursive: true });

const PICK = process.env.ICON || 'A';
const svg = fs.readFileSync(path.join(SC, 'icons', `icon_${PICK}.svg`), 'utf8');

const splashHTML = (w, h) => `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${w}px;height:${h}px;overflow:hidden;background:#0a0713;}
  .wrap{width:${w}px;height:${h}px;display:flex;flex-direction:column;
    align-items:center;justify-content:center;gap:${Math.round(h*0.035)}px;
    background:radial-gradient(60% 45% at 50% 42%, #1a1030 0%, rgba(26,16,48,0) 70%), #0a0713;}
  .mark{width:${Math.round(w*0.30)}px;height:${Math.round(w*0.30)}px;}
  .mark svg{width:100%;height:100%;display:block;border-radius:22%;}
  .logo{font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;font-weight:800;
    font-size:${Math.round(w*0.085)}px;line-height:.92;letter-spacing:-.01em;color:#fff;
    text-transform:uppercase;text-align:center;
    text-shadow:${Math.round(w*0.005)}px ${Math.round(w*0.005)}px 0 #ff2266,
                -${Math.round(w*0.003)}px -${Math.round(w*0.003)}px 0 #2de2e6;}
  .tag{font-family:ui-monospace,Menlo,monospace;font-size:${Math.round(w*0.016)}px;
    letter-spacing:.34em;text-transform:uppercase;color:#ffd23f;}
</style>
<div class="wrap">
  <div class="mark">${svg}</div>
  <div class="logo">Core<br>Breaker</div>
  <div class="tag">round planet</div>
</div>`;

(async () => {
  const b = await chromium.launch({
    // Uses a system/Playwright Chromium. Override with CHROMIUM=/path/to/chrome
    executablePath: process.env.CHROMIUM || undefined,
    args: ['--no-sandbox', '--disable-gpu', '--force-color-profile=srgb'],
  });

  // --- icon: 1024x1024, fully opaque, no rounded corners (the OS masks it) ---
  {
    const N = 1024;
    const pg = await b.newPage({ viewport: { width: N, height: N }, deviceScaleFactor: 1 });
    await pg.setContent(
      `<style>*{margin:0;padding:0}html,body{width:${N}px;height:${N}px;overflow:hidden;background:#05040a}
       svg{display:block;width:${N}px;height:${N}px}</style>${svg}`,
      { waitUntil: 'networkidle' });
    await pg.screenshot({ path: path.join(RES, 'icon.png'), omitBackground: false });
    await pg.close();
    console.log(`icon.png        1024x1024  (concept ${PICK})`);
  }

  // --- splash: 2732x2732 square, safe for every device aspect ratio ---
  {
    const N = 2732;
    const pg = await b.newPage({ viewport: { width: N, height: N }, deviceScaleFactor: 1 });
    await pg.setContent(splashHTML(N, N), { waitUntil: 'networkidle' });
    await pg.screenshot({ path: path.join(RES, 'splash.png') });
    fs.copyFileSync(path.join(RES, 'splash.png'), path.join(RES, 'splash-dark.png'));
    await pg.close();
    console.log('splash.png      2732x2732');
    console.log('splash-dark.png 2732x2732');
  }

  await b.close();

  for (const f of ['icon.png', 'splash.png', 'splash-dark.png']) {
    const kb = (fs.statSync(path.join(RES, f)).size / 1024) | 0;
    console.log(`  ${f.padEnd(16)} ${kb} KB`);
  }
})().catch((e) => { console.log('ERR', e.stack || e.message); process.exit(1); });
