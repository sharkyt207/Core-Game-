// Google Play requires a 1024x500 "feature graphic" for the store listing.
// Apple has no equivalent, but the same image works well for press/social.
// Usage: ICON=A node feature-graphic.cjs      (CHROMIUM=/path/to/chrome to override)
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');

const SC = __dirname;
const OUT = path.resolve(SC, '..', 'store');
fs.mkdirSync(OUT, { recursive: true });

const PICK = process.env.ICON || 'A';
const svg = fs.readFileSync(path.join(SC, 'icons', `icon_${PICK}.svg`), 'utf8');

const W = 1024, H = 500;

function stars(n) {
  let s = 7, out = '';
  const rng = () => { s = (s * 1103515245 + 12345) >>> 0; return s / 4294967296; };
  for (let i = 0; i < n; i++) {
    const x = (rng() * W) | 0, y = (rng() * H) | 0, big = rng() < 0.12;
    out += `<i style="left:${x}px;top:${y}px;width:${big ? 3 : 2}px;height:${big ? 3 : 2}px;
             opacity:${(0.25 + rng() * 0.55).toFixed(2)};background:${rng() < 0.25 ? '#2de2e6' : '#fff'}"></i>`;
  }
  return out;
}

const html = `
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0a0713}
  .wrap{position:relative;width:${W}px;height:${H}px;
    background:radial-gradient(70% 120% at 22% 50%, #1e1238 0%, rgba(30,18,56,0) 62%),
               radial-gradient(60% 130% at 88% 60%, #2a0f18 0%, rgba(42,15,24,0) 60%), #0a0713;}
  i{position:absolute;display:block;border-radius:50%}
  .glowline{position:absolute;left:0;right:0;bottom:-190px;height:340px;border-radius:50%;
    background:radial-gradient(closest-side, rgba(255,138,61,.5), rgba(255,138,61,0));}
  .content{position:absolute;inset:0;display:flex;align-items:center;gap:44px;padding:0 62px}
  .mark{width:212px;height:212px;flex:0 0 auto;border-radius:24%;overflow:hidden;
    box-shadow:0 24px 60px -18px rgba(0,0,0,.9), 0 0 60px rgba(255,138,61,.28)}
  .mark svg{display:block;width:100%;height:100%}
  .txt{flex:1}
  .logo{font-family:ui-monospace,"SF Mono",Menlo,Consolas,monospace;font-weight:800;
    font-size:86px;line-height:.88;letter-spacing:-.015em;color:#fff;text-transform:uppercase;
    text-shadow:6px 6px 0 #ff2266,-4px -4px 0 #2de2e6;}
  .tag{margin-top:20px;font-family:ui-monospace,Menlo,monospace;font-size:17px;letter-spacing:.28em;
    text-transform:uppercase;color:#ffd23f;}
  .sub{margin-top:14px;font-family:system-ui,-apple-system,sans-serif;font-size:19px;color:#c9c2d6;
    max-width:520px;line-height:1.45}
</style>
<div class="wrap">
  ${stars(90)}
  <div class="glowline"></div>
  <div class="content">
    <div class="mark">${svg}</div>
    <div class="txt">
      <div class="logo">Core<br>Breaker</div>
      <div class="tag">Bohr dich zum Kern</div>
      <div class="sub">Neun Welten. Ein Bohrer, der alles zerlegt.</div>
    </div>
  </div>
</div>`;

(async () => {
  const b = await chromium.launch({
    executablePath: process.env.CHROMIUM || undefined,
    args: ['--no-sandbox', '--disable-gpu', '--force-color-profile=srgb'],
  });
  const pg = await b.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await pg.setContent(html, { waitUntil: 'networkidle' });
  const file = path.join(OUT, 'feature-graphic-1024x500.png');
  await pg.screenshot({ path: file });
  await b.close();
  console.log(`feature-graphic-1024x500.png  ${(fs.statSync(file).size / 1024) | 0} KB  (concept ${PICK})`);
})().catch((e) => { console.log('ERR', e.stack || e.message); process.exit(1); });
