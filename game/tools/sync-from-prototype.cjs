/**
 * Regenerates game/src/game.js and game/index.html from the prototype, which is
 * the single source of truth for the engine. Run after every prototype change:
 *
 *   node tools/sync-from-prototype.cjs && npm run build
 */
const fs = require('fs'), path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.resolve(ROOT, '..', 'prototype', 'trashy', 'index.html');

const src = fs.readFileSync(SRC, 'utf8');
const style = src.match(/<style>([\s\S]*?)<\/style>/)[1];
const script = src.match(/<script>([\s\S]*?)<\/script>/)[1];
const between = src.slice(src.indexOf('</style>') + 8, src.indexOf('<script>')).trim();

fs.writeFileSync(
  path.join(ROOT, 'src', 'game.js'),
  '/* COREBREAKER engine — generated from prototype/trashy/index.html (single source of truth).\n' +
    '   Do not edit by hand: run tools/sync-from-prototype.cjs instead. */\n' +
    script + '\n',
);

const html = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
<title>COREBREAKER</title>
<meta name="description" content="Bohr dich durch runde Planeten bis zum glühenden Kern — Neon-Mining-Arcade im Hochformat."/>
<meta name="theme-color" content="#0a0713"/>
<link rel="manifest" href="./manifest.webmanifest"/>
<link rel="icon" href="./icons/icon-192.png"/>
<!-- iOS home-screen install: fullscreen, dark status bar, app icon -->
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-title" content="COREBREAKER"/>
<link rel="apple-touch-icon" href="./icons/apple-touch-icon.png"/>
<meta name="mobile-web-app-capable" content="yes"/>
<style>
${style}
</style>
</head>
<body>
${between}
<script type="module" src="/src/main.ts"></script>
</body>
</html>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), html);

console.log(`synced: engine ${script.length} chars, shell ${html.length} chars`);
