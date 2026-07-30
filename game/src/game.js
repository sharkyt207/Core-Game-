/* COREBREAKER engine — generated from prototype/trashy/index.html (single source of truth).
   Do not edit by hand: run tools/sync-from-prototype.cjs instead. */

(function(){
"use strict";
(function(){var m=document.querySelector('meta[name=viewport]');
 if(!m){m=document.createElement('meta');m.name='viewport';document.head.appendChild(m);}
 m.content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover';
 if(!document.title)document.title='COREBREAKER · round planet';})();

/* ===================== THEMES ===================== */
const THEMES={
 A:{name:'DIRT JAM', space:'#150f22', space2:'#0a0713',
    ground:['#8b909b','#c9cdd4','#5c6069'], accent:'#ffd23f', ore:'#ffe28a',
    dmg:'#ff3b6b', fuel:'#ff8a3d', blob:'#ffe14d', ring:'#c9cdd4', core:'#ff8a3d',
    ca:0.6, scan:0.016, noise:0.012, tint:null, jitter:0},
 B:{name:'VHS MELTDOWN', space:'#080810', space2:'#04040a',
    ground:['#83838c','#dcdce2','#4e4e57'], accent:'#39ff14', ore:'#eaff00',
    dmg:'#ff2266', fuel:'#ff6a00', blob:'#eaff00', ring:'#dcdce2', core:'#ff3300',
    ca:3.6, scan:0.16, noise:0.14, tint:'#12ff7a', jitter:1},
 C:{name:'ACID CAVE', space:'#0b0e1a', space2:'#05060d',
    ground:['#2b3550','#4de0ff','#7a4dff'], accent:'#2de2e6', ore:'#b6fff2',
    dmg:'#ff4de0', fuel:'#12d9b0', blob:'#b6fff2', ring:'#4de0ff', core:'#ff5ce0',
    ca:1.9, scan:0.07, noise:0.05, tint:null, jitter:0},
};
let TK='A', T=THEMES.A;

/* ===================== PLANETS (data-driven world) ===================== */
// Skin (A/B/C) = trashy look/effects. Planet = own colour world, hardness, size, loot value.
const PLANETS=[
 {id:'terra',  name:'TERRA',   unlock:0,    rings:60, hardMul:1.0, heatMul:1.0, valueMul:1.0,
   ground:['#8b909b','#c9cdd4','#5c6069'], core:'#ff8a3d', space:'#150f22', space2:'#0a0713'},
 {id:'magmar', name:'MAGMAR',  unlock:900,  rings:68, hardMul:1.5, heatMul:1.6, valueMul:1.7, gasChance:0.06, bossType:'inferno', lava:0.06,
   ground:['#5a2f26','#c4632f','#361410'], core:'#ffd000', space:'#1c0a08', space2:'#0e0404'},
 {id:'cryonis',name:'CRYONIS', unlock:4200, rings:76, hardMul:2.1, heatMul:0.6, valueMul:2.5, brittle:1, bossType:'frost', regrow:9,
   ground:['#7d94b0','#e6f4ff','#4c6076'], core:'#6fdcff', space:'#0a1420', space2:'#050a12'},
 {id:'ferro',  name:'FERRO',   unlock:7500, rings:74, hardMul:1.9, heatMul:1.1, valueMul:2.3, caveChance:0.05, veins:1,
   ground:['#4a3f33','#b8895a','#2a231b'], core:'#ffae42', space:'#140f0a', space2:'#0a0705'},
 {id:'mechon', name:'MECHON',  unlock:13000, rings:72, hardMul:1.8, heatMul:1.2, valueMul:2.0, gasChance:0.04, caveChance:0.03, bossType:'tech', sentry:0.022,
   ground:['#3a4048','#8792a0','#23272e'], core:'#2de2e6', space:'#0d1016', space2:'#05070b'},
 {id:'abyss',  name:'ABYSS',   unlock:38000, rings:88, hardMul:2.6, heatMul:1.3, valueMul:3.6, gasChance:0.05, caveChance:0.05, bossRings:3, bossType:'void', dark:1,
   ground:['#1c2030','#41537a','#0e1018'], core:'#8a5cff', space:'#05060d', space2:'#020308'},
 {id:'neon',   name:'NEON',    unlock:21000, rings:76, hardMul:2.2, heatMul:0.9, valueMul:2.8, brittle:1, resonance:1,
   ground:['#241b3a','#4de0ff','#ff4de0'], core:'#ff4de0', space:'#0a0716', space2:'#04020c'},
 {id:'verdant',name:'VERDANT', unlock:70000,rings:96, hardMul:2.9, heatMul:1.4, valueMul:4.4, gasChance:0.07, caveChance:0.04, bossRings:3, bossType:'hive', regrow:6,
   ground:['#16301f','#3fd977','#0a1a11'], core:'#8dff5c', space:'#06120b', space2:'#020806'},
 {id:'obscura',name:'OBSCURA', unlock:130000,rings:102, hardMul:3.4, heatMul:1.5, valueMul:5.5, gasChance:0.06, caveChance:0.06, bossRings:4, bossType:'void', dark:1, lava:0.04,
   ground:['#1a1626','#6b4de0','#0c0a14'], core:'#c86bff', space:'#060410', space2:'#020108'},
];
let P=PLANETS[0];
// short flavour lines shown in the planet-unlock cutscene [de,en]
/* Each world's own rule, stated plainly on the planet card. A mechanic the
   player only discovers by dying to it is not depth, it is a trap. */
const PLANET_RULE={
 magmar: ['🌋 Lavaadern heizen dich auf','🌋 Lava veins cook the drill'],
 cryonis:['🧊 Dein Schacht friert wieder zu','🧊 Your shaft freezes shut again'],
 verdant:['🌿 Ranken wachsen schnell nach','🌿 Vines regrow fast'],
 ferro:  ['🧲 Dichte Erzadern, aber Einstürze','🧲 Dense ore veins, but cave-ins'],
 mechon: ['📡 Wachtürme saugen deinen Sprit ab','📡 Sentries drain your fuel'],
 neon:   ['🔷 Resonanz: gleiches Gestein zerspringt in Ketten','🔷 Resonance: matching rock shatters in chains'],
 abyss:  ['🌑 Dunkelheit — kurze Sicht','🌑 Darkness — short sight'],
 obscura:['🌑 Dunkelheit + Lavaadern','🌑 Darkness + lava veins'],
};
const PLANET_TAG={
 terra:['Wo alles beginnt.','Where it all begins.'],
 magmar:['Ein Planet aus Feuer und Zorn.','A world of fire and fury.'],
 cryonis:['Ewiges Eis — brüchig und wertvoll.','Eternal ice — brittle and precious.'],
 ferro:['Metalladern bis zum Kern.','Metal veins down to the core.'],
 mechon:['Eine tote Maschinenwelt.','A dead machine world.'],
 abyss:['Die Dunkelheit hat einen Wächter.','The dark has a guardian.'],
 neon:['Grelles Licht, tödliche Tiefe.','Blinding light, deadly depths.'],
 verdant:['Lebendig — und hungrig.','Alive — and hungry.'],
 obscura:['Die Leere selbst.','The void itself.'],
};

/* ===================== WEATHER / ENVIRONMENT EVENTS ===================== */
// Timed hazards (and one boon) that flavour each planet. One primary per planet,
// with a universal 'quake' fallback. Applied as modifiers inside update().
const EVENTINFO={
 quake: {de:'BEBEN',        en:'QUAKE',       col:'#c9a24d', dur:6},
 magma: {de:'MAGMA-AUSBRUCH',en:'MAGMA SURGE', col:'#ff6a00', dur:6},
 frost: {de:'FROST-STURM',  en:'FROST STORM', col:'#8be9ff', dur:7},
 vein:  {de:'ERZADER',      en:'RICH VEIN',   col:'#ffd23f', dur:7},
 surge: {de:'EMP-STÖRUNG',  en:'EMP SURGE',   col:'#2de2e6', dur:6},
 spore: {de:'SPOREN-WOLKE', en:'SPORE CLOUD', col:'#3fd977', dur:7},
 void:  {de:'SOG DER LEERE',en:'VOID PULL',   col:'#8a5cff', dur:6},
};
const PLANET_EVENT={terra:'quake',magmar:'magma',cryonis:'frost',ferro:'vein',mechon:'surge',abyss:'void',neon:'surge',verdant:'spore',obscura:'void'};
function startEvent(){const primary=PLANET_EVENT[P.id]||'quake';
  const type=rnd()<0.72?primary:'quake';run.event={type,t:EVENTINFO[type].dur};
  const inf=EVENTINFO[type];flash=Math.max(flash,0.35);shake=Math.max(shake,8);sfx.rare();vibe([18,30,18]);
  achQueue.push({ic:'⚠',de:[type==='vein'?'Boon':'Umwelt-Event',(settings.lang==='en'?inf.en:inf.de)],
    en:[type==='vein'?'Boon':'Hazard',inf.en]});if(!achTimer)nextAch();}

/* ===================== CORE / MATH ===================== */
function rngSeed(s){return function(){s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
let rnd=rngSeed(Date.now()>>>0);
function hash(a,b){let h=(a*374761393+b*668265263)>>>0;h=((h^(h>>13))*1274126177)>>>0;return h>>>0;}
function clamp(v,a,b){return v<a?a:v>b?b:v;}
function ease(t){return t*t*(3-2*t);}
const TAU=Math.PI*2;
function angDiff(a,b){let d=a-b;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;return d;}

/* ===================== PLANET GEOMETRY (polar) ===================== */
const R_CORE=120, TILE=40;
let RINGS=P.rings, R_SURF=0, CAP_RAD=0;
function applyGeometry(){R_SURF=R_CORE+RINGS*TILE;CAP_RAD=R_SURF+900;}
applyGeometry();
function setPlanet(id){P=PLANETS.find(p=>p.id===id)||PLANETS[0];RINGS=P.rings;applyGeometry();world.clear();}
// ring index from radius: <0 = core wall, >=RINGS = space
function ringOf(r){if(r>=R_SURF)return RINGS;if(r<R_CORE)return -1;return Math.floor((r-R_CORE)/TILE);}
// per-ring sector count so cells stay ~TILE-sized (square) at EVERY depth
function secCount(ring){const rad=R_CORE+(ring+0.5)*TILE;return Math.max(8,Math.round(TAU*rad/TILE));}
function dsecOf(ring){return TAU/secCount(ring);}
function sectorOf(a,ring){const n=secCount(ring),s=Math.floor(a/(TAU/n));return ((s%n)+n)%n;}
function neighborsOf(ring,sec){const n=secCount(ring),a=(sec+0.5)*(TAU/n);
  return [[ring+1,ring+1<RINGS?sectorOf(a,ring+1):sec],[ring-1,ring-1>=0?sectorOf(a,ring-1):sec],
          [ring,(sec+1)%n],[ring,(sec-1+n)%n]];}

/* ===================== SAVE / SKILL TREE ===================== */
const SAVE_KEY='corebreaker_tree_v1';
const meta=loadMeta();
function loadMeta(){try{const j=JSON.parse(localStorage.getItem(SAVE_KEY));if(j&&j.v===2){
  if(!j.skills)j.skills=[];if(!j.unlockedPlanets)j.unlockedPlanets=['terra'];if(!j.planet)j.planet='terra';
  if(j.lifetime==null)j.lifetime=0;if(!j.prestige)j.prestige={cores:0};if(!j.ascend)j.ascend={shards:0};if(!j.seenMenu)j.seenMenu={};if(!j.ascend.perks)j.ascend.perks={};if(j.ascend.spent==null)j.ascend.spent=0;if(!j.contracts)j.contracts=[];
  if(!j.mats)j.mats={ferrite:0,cuprite:0,crystal:0,core:0,artifact:0};if(!j.refine)j.refine={};
  if(!j.modules)j.modules=[];if(!j.slots)j.slots=[null,null,null];if(!j.challenge)j.challenge={best:0,bestDate:''};if(!j.scores)j.scores=[];
  if(!j.settings)j.settings={music:true,sfx:true,vibe:true,shake:true,lang:'de',quality:'auto'};if(!j.settings.lang)j.settings.lang='de';if(!j.settings.quality)j.settings.quality='auto';
  if(!j.stats)j.stats={runs:0,bestDepth:0,totalEarned:0};if(!j.achievements)j.achievements=[];
  if(!j.daily)j.daily=null;if(!j.cosmetics)j.cosmetics={owned:['default'],equipped:'default'};if(j.tutorialSeen==null)j.tutorialSeen=false;
  if(!j.records)j.records={};return j;}}catch(e){}
  return{v:2,credits:0,skills:[],unlockedPlanets:['terra'],planet:'terra',lifetime:0,prestige:{cores:0},ascend:{shards:0,perks:{},spent:0},contracts:[],mats:{ferrite:0,cuprite:0,crystal:0,core:0,artifact:0},refine:{},modules:[],slots:[null,null,null],challenge:{best:0,bestDate:''},scores:[],
    settings:{music:true,sfx:true,vibe:true,shake:true,lang:'de',quality:'auto'},stats:{runs:0,bestDepth:0,totalEarned:0},achievements:[],daily:null,
    cosmetics:{owned:['default'],equipped:'default'},tutorialSeen:false,records:{}};}
const SKINS=[
 {id:'default',name:'Standard',cost:0,    ring:'#c9cdd4', blob:'#ffe14d', core:'#ff8a3d'},
 {id:'gold',   name:'Gold',    cost:1500, ring:'#ffe08a', blob:'#fff2b0', core:'#ffbf3d'},
 {id:'plasma', name:'Plasma',  cost:3000, ring:'#2de2e6', blob:'#b6fff2', core:'#12d9b0'},
 {id:'toxic',  name:'Toxic',   cost:4500, ring:'#39ff14', blob:'#eaff00', core:'#12ff7a'},
 {id:'void',   name:'Void',    cost:6000, ring:'#8a5cff', blob:'#e6d8ff', core:'#ff4de0'},
];
const SKINMAP={};SKINS.forEach(s=>SKINMAP[s.id]=s);
function curSkin(){return SKINMAP[meta.cosmetics.equipped]||SKINS[0];}
const settings=meta.settings;

/* ===================== i18n ===================== */
const L={de:{
  dropIn:'Abtauchen', tree:'🌳 Skill Tree', planets:'🪐 Planeten', ach:'🏆 Erfolge', settings:'⚙ Einstellungen',
  done:'Fertig', retry:'Nochmal', menu:'Menü', on:'AN', off:'AUS',
  titleSub:'Bohr in den runden Planeten. Runter = rein, hoch = raus ins All, seitlich = herumfliegen. Fahr rechtzeitig HOME.',
  hint:'runter = rein · hoch = raus ins All<br>seitlich = um den Planeten',
  sMusic:'Musik', sSfx:'Sounds', sVibe:'Vibration', sShake:'Screen Shake',
  goSub:'Die Bergungsdrohne rettet 40 % deiner Beute. Extrahierst du selbst, behältst du alles.',
  shopSub:'Upgrade die Rostlaube. Dann tiefer.', langBtn:'🌐 Sprache: DE',
  achUnlocked:'Erfolg freigeschaltet', dailyTitle:'Tagesziel', dailyDone:'Tagesziel geschafft!',
  reasonFuel:'SPRIT LEER', reasonHeat:'ÜBERHITZT', lootLost:'Loot verloren', lootSaved:'geborgen',
  tutTitle:'So geht\'s', tut1:'Finger unten aufsetzen & ziehen: RUNTER bohrt rein, HOCH fliegt raus, SEITLICH um den Planeten.',
  tut2:'SPRIT & HITZE regenerieren nicht! Bei leer oder 100% = Game Over. Fahr rechtzeitig HOME (⏏).',
  tut3:'Verkaufe Loot, kauf Skills im Baum, tauch tiefer. Ziel: der glühende Kern.', tutGo:'Los geht\'s', help:'❓ Tutorial'
 },en:{
  dropIn:'Drop In', tree:'🌳 Skill Tree', planets:'🪐 Planets', ach:'🏆 Achievements', settings:'⚙ Settings',
  done:'Done', retry:'Retry', menu:'Menu', on:'ON', off:'OFF',
  titleSub:'Drill into the round planet. Down = in, up = out to space, sideways = fly around. Head HOME in time.',
  hint:'down = dig in · up = out to space<br>sideways = around the planet',
  sMusic:'Music', sSfx:'Sounds', sVibe:'Vibration', sShake:'Screen Shake',
  goSub:'The salvage drone recovers 40% of your haul. Extract yourself and you keep all of it.',
  shopSub:'Upgrade the rustbucket. Then deeper.', langBtn:'🌐 Language: EN',
  achUnlocked:'Achievement unlocked', dailyTitle:'Daily Goal', dailyDone:'Daily goal complete!',
  reasonFuel:'OUT OF FUEL', reasonHeat:'OVERHEATED', lootLost:'Loot lost', lootSaved:'salvaged',
  tutTitle:'How to play', tut1:'Touch the lower screen & drag: DOWN drills in, UP flies out, SIDEWAYS around the planet.',
  tut2:'FUEL & HEAT do not regen! Empty or 100% = Game Over. Head HOME (⏏) in time.',
  tut3:'Sell loot, buy skills in the tree, dig deeper. Goal: the glowing core.', tutGo:'Let\'s go', help:'❓ Tutorial'
 }};
function t(k){const d=L[settings.lang]||L.de;return d[k]!=null?d[k]:(L.de[k]!=null?L.de[k]:k);}

/* ===================== ACHIEVEMENTS ===================== */
const ACH=[
 {id:'first',  ic:'🚀', de:['Erster Abstieg','Starte deinen ersten Run'],      en:['First Descent','Start your first run'],       cond:()=>meta.stats.runs>=1},
 {id:'d50',    ic:'⛏️', de:['Tiefgänger','Erreiche 50m Tiefe'],                en:['Digger','Reach 50m depth'],                 cond:()=>meta.stats.bestDepth>=50},
 {id:'d100',   ic:'🔥', de:['Kernnähe','Erreiche 100m Tiefe'],                 en:['Near the Core','Reach 100m depth'],         cond:()=>meta.stats.bestDepth>=100},
 // --- synergies: reward building rather than hoarding ---
 {id:'syn1',   ic:'✨', de:['Kombination','Baue eine Relikt-Synergie'],        en:['Combination','Build one relic synergy'],    cond:()=>(meta.stats.synBuilt||0)>=1},
 {id:'syn2',   ic:'🔮', de:['Doppelbau','Zwei Synergien gleichzeitig'],        en:['Double Build','Two synergies at once'],     cond:()=>(meta.stats.synMax||0)>=2},
 {id:'synAll', ic:'🌟', de:['Kombinator','Baue alle 8 Synergien (nach und nach)'],en:['Combinator','Build all 8 synergies'],    cond:()=>Object.keys(meta.stats.synSeen||{}).length>=8},
 // --- bestiary: a reason to visit every world's own fauna ---
 {id:'bio4',   ic:'🔬', de:['Feldbiologe','Erlege 4 verschiedene Arten'],      en:['Field Biologist','Kill 4 different species'],  cond:()=>Object.keys(meta.stats.species||{}).length>=4},
 {id:'bio8',   ic:'🧬', de:['Xenologe','Erlege 8 verschiedene Arten'],         en:['Xenologist','Kill 8 different species'],       cond:()=>Object.keys(meta.stats.species||{}).length>=8},
 {id:'bioAll', ic:'📚', de:['Bestiarium','Erlege alle 11 Arten'],              en:['Bestiary','Kill all 11 species'],              cond:()=>Object.keys(meta.stats.species||{}).length>=11},
 {id:'kill100',ic:'⚔️', de:['Schädlingsbekämpfung','Erlege 100 Kreaturen'],    en:['Pest Control','Kill 100 creatures'],           cond:()=>(meta.stats.kills||0)>=100},
 // --- expedition: long-horizon goals for the roguelike mode ---
 {id:'exp1',   ic:'🧭', de:['Expedition','Erreiche einen sicheren Sektor'],   en:['Expedition','Reach a safe sector'],         cond:()=>(meta.stats.expSectors||0)>=1},
 {id:'exp10',  ic:'🗺️', de:['Kartograf','Erreiche 10 Sektoren insgesamt'],    en:['Cartographer','Reach 10 sectors total'],    cond:()=>(meta.stats.expSectors||0)>=10},
 {id:'exp50',  ic:'🧳', de:['Veteran','Erreiche 50 Sektoren insgesamt'],      en:['Veteran','Reach 50 sectors total'],         cond:()=>(meta.stats.expSectors||0)>=50},
 {id:'deep2',  ic:'⬇️', de:['Tiefe Schicht','Erreiche Schicht 2'],            en:['Deep Layer','Reach layer 2'],               cond:()=>(meta.stats.expBest||0)>=2},
 {id:'deep5',  ic:'🕳️', de:['Abgrundtief','Erreiche Schicht 5'],             en:['Bottomless','Reach layer 5'],               cond:()=>(meta.stats.expBest||0)>=5},
 {id:'relic5', ic:'💠', de:['Sammler','Kaufe 5 Relikte'],                    en:['Collector','Buy 5 relics'],                 cond:()=>(meta.stats.relicsBought||0)>=5},
 {id:'relic25',ic:'🏺', de:['Reliktjäger','Kaufe 25 Relikte'],               en:['Relic Hunter','Buy 25 relics'],             cond:()=>(meta.stats.relicsBought||0)>=25},
 {id:'rich',   ic:'💰', de:['Reich','Verdiene 10.000 $ gesamt'],              en:['Rich','Earn 10,000 $ total'],               cond:()=>meta.stats.totalEarned>=10000},
 {id:'tycoon', ic:'🏦', de:['Tycoon','Verdiene 100.000 $ gesamt'],           en:['Tycoon','Earn 100,000 $ total'],            cond:()=>meta.stats.totalEarned>=100000},
 {id:'tech5',  ic:'🌳', de:['Techniker','Schalte 5 Skills frei'],            en:['Engineer','Unlock 5 skills'],               cond:()=>meta.skills.length>=5},
 {id:'apex',   ic:'☢️', de:['APEX','Baue den APEX-Reaktor'],                 en:['APEX','Build the APEX reactor'],            cond:()=>meta.skills.includes('apex')},
 {id:'expl',   ic:'🪐', de:['Entdecker','Schalte 3 Planeten frei'],          en:['Explorer','Unlock 3 planets'],              cond:()=>meta.unlockedPlanets.length>=3},
 {id:'starmap',ic:'🌌', de:['Sternenkarte','Schalte alle Planeten frei'],    en:['Star Map','Unlock all planets'],            cond:()=>meta.unlockedPlanets.length>=PLANETS.length},
 {id:'core1',  ic:'⚛️', de:['Core Overload','Prestige zum ersten Mal'],      en:['Core Overload','Prestige for the first time'],cond:()=>meta.prestige.cores>=1},
 {id:'veteran',ic:'🎖️', de:['Veteran','Spiele 25 Runs'],                     en:['Veteran','Play 25 runs'],                   cond:()=>meta.stats.runs>=25},
 {id:'guardian',ic:'💠',de:['Kern-Wächter','Durchbrich eine Boss-Schicht'],   en:['Core Guardian','Break through a boss layer'],cond:()=>!!meta.stats.guardian},
 {id:'singular',ic:'✦', de:['Singularität','Steige zum ersten Mal auf'],       en:['Singularity','Ascend for the first time'],  cond:()=>(meta.ascend&&meta.ascend.shards>=1)},
 {id:'contractor',ic:'📋',de:['Auftragsjäger','Erfülle 5 Kontrakte'],           en:['Contractor','Complete 5 contracts'],        cond:()=>(meta.stats.contractsDone||0)>=5},
 {id:'chainmaster',ic:'🔗',de:['Kettenmeister','Erreiche Combo ×30'],           en:['Chain Master','Reach Combo x30'],           cond:()=>(meta.stats.maxCombo||0)>=30},
 {id:'brute',   ic:'👹', de:['Brocken-Brecher','Besiege einen Brocken'],        en:['Brute Breaker','Defeat a Brute'],           cond:()=>!!meta.stats.bruteKill},
 {id:'deepvoid',ic:'🌑', de:['Leere','Schalte OBSCURA frei'],                   en:['The Void','Unlock OBSCURA'],                cond:()=>meta.unlockedPlanets.includes('obscura')},
 {id:'refiner', ic:'⚗️', de:['Veredler','Verbaue Erz in der Refinerie'],        en:['Refiner','Craft an upgrade in the refinery'],cond:()=>Object.keys(meta.refine||{}).length>=1},
 {id:'geared',  ic:'🔩', de:['Voll bestückt','Belege alle 3 Modul-Slots'],       en:['Fully Geared','Fill all 3 module slots'],   cond:()=>(meta.slots||[]).filter(x=>x).length>=3},
 {id:'challenger',ic:'🏁',de:['Herausforderer','Spiele eine Tages-Challenge'],    en:['Challenger','Play a daily challenge'],      cond:()=>(meta.scores||[]).length>=1},
];
function achTxt(a){return (settings.lang==='en'?a.en:a.de);}
let achQueue=[],achTimer=null;
function checkAchievements(){let any=false;
  for(const a of ACH)if(!meta.achievements.includes(a.id)&&a.cond()){meta.achievements.push(a.id);achQueue.push(a);any=true;}
  if(any)saveMeta();if(!achTimer&&achQueue.length)nextAch();}
function nextAch(){const a=achQueue.shift();if(!a){achTimer=null;return;}
  const el=document.getElementById('achPop');
  el.innerHTML='<span class="ai">'+a.ic+'</span><span class="at"><b>'+t('achUnlocked')+'</b><span>'+achTxt(a)[0]+'</span></span>';
  el.classList.add('show');sfx.rare();vibe([12,30,12]);
  achTimer=setTimeout(()=>{el.classList.remove('show');achTimer=setTimeout(nextAch,420);},2600);}
// Prestige ("Core Overload"): cores grow with the sqrt of lifetime earnings.
function totalCores(){return Math.floor(Math.sqrt(meta.lifetime/300));}
function prestigeGain(){return Math.max(0,totalCores()-meta.prestige.cores);}
function doPrestige(){const g=prestigeGain();if(g<=0)return false;
  meta.prestige.cores=totalCores();meta.skills=[];
  meta.credits=perkLvl('a_seed')?2500:0;      // Startkapital: the rebuild is not from zero
  saveMeta();S=stats();return true;}
// Ascension ("Singularity") — second prestige layer. Spends accumulated cores for
// permanent Singularity Shards: +8 Bohrkraft & +25% Loot each. Needs >=50 cores.
const ASCEND_COST=25;
function ascendGain(){return Math.floor((meta.prestige?meta.prestige.cores:0)/ASCEND_COST);}
function canAscend(){return ascendGain()>=2;}
function doAscend(){if(!canAscend())return false;
  meta.ascend.shards+=ascendGain();
  meta.prestige.cores=0;meta.lifetime=0;meta.skills=[];
  meta.credits=perkLvl('a_seed')?2500:0;
  saveMeta();S=stats();return true;}
/* ---------- ASCENSION PERKS ----------
 * Shards used to be nothing but two numbers: +8 power each and a term in the
 * loot multiplier. After building real decisions into the relics (capacity),
 * the tree (doctrines) and the run itself (Overdrive), the deepest meta layer
 * in the game was still the one with no choice in it at all.
 * Shards are now a currency you SPEND. Three tiered perks scale your numbers;
 * five one-off perks change how the game is played and cannot all be afforded,
 * so the board is a build of its own that outlives every prestige.
 * `lvl` = how many times it can be taken; `cost(n)` = shards for the n-th level. */
const ASCPERKS=[
 {id:'a_res',  ic:'💎', lvl:4, cost:n=>n+1,
  de:['Kernresonanz','+12 % Erzwert je Stufe'],       en:['Core Resonance','+12% ore value per level']},
 {id:'a_titan',ic:'⛏️', lvl:4, cost:n=>n+1,
  de:['Titanwerk','+14 Bohrkraft je Stufe'],          en:['Titanworks','+14 drill power per level']},
 {id:'a_store',ic:'🛢️', lvl:4, cost:n=>n+1,
  de:['Tiefenspeicher','+45 Sprit je Stufe'],         en:['Deep Reserve','+45 fuel per level']},
 {id:'a_cargo',ic:'📦', lvl:2, cost:n=>3+n*2,
  de:['Frachtraum-Ausbau','+1 Reliktplatz je Stufe'], en:['Cargo Refit','+1 relic slot per level']},
 {id:'a_broker',ic:'🔍',lvl:1, cost:()=>3,
  de:['Marktkontakte','Der Händler zeigt 4 statt 3 Relikte'],
  en:['Broker Contacts','The trader shows 4 relics instead of 3']},
 {id:'a_salv', ic:'🛟', lvl:1, cost:()=>4,
  de:['Notreserve','Die Bergungsdrohne rettet 65 % statt 40 %'],
  en:['Emergency Reserve','The salvage drone recovers 65% instead of 40%']},
 {id:'a_seed', ic:'💰', lvl:1, cost:()=>3,
  de:['Startkapital','Jedes Prestige beginnt mit 2 500 $'],
  en:['Seed Capital','Every prestige starts with $2,500']},
 {id:'a_wind', ic:'🌬️', lvl:1, cost:()=>5,
  de:['Zweiter Wind','Einmal je Expedition überlebst du den Tod'],
  en:['Second Wind','Survive death once per expedition']},
];
function perkMap(){return (meta.ascend&&meta.ascend.perks)||{};}
function perkLvl(id){return perkMap()[id]||0;}
function perkDef(id){return ASCPERKS.find(x=>x.id===id);}
function perkNext(id){const d=perkDef(id);if(!d)return null;
  const l=perkLvl(id);if(l>=d.lvl)return null;return d.cost(l);}
// Shards not yet committed to the board.
function shardsFree(){const total=(meta.ascend&&meta.ascend.shards)||0;
  return total-((meta.ascend&&meta.ascend.spent)||0);}
function buyPerk(id){const c=perkNext(id);if(c===null||shardsFree()<c)return false;
  meta.ascend.perks=meta.ascend.perks||{};
  meta.ascend.perks[id]=perkLvl(id)+1;
  meta.ascend.spent=((meta.ascend&&meta.ascend.spent)||0)+c;
  saveMeta();S=stats();checkAchievements();return true;}
function perkName(d){return (settings.lang==='en'?d.en:d.de)[0];}
function perkDesc(d){return (settings.lang==='en'?d.en:d.de)[1];}
// Perks that change rules rather than numbers, read where the rule lives.
function relicSlots(){return RELIC_SLOTS+perkLvl('a_cargo');}
function relicPicks(){return RELIC_PICKS+(perkLvl('a_broker')?1:0);}
function salvageRate(){return perkLvl('a_salv')?0.65:SALVAGE;}
/* ---------- PROGRESSIVE DISCLOSURE ----------
 * Measured on a fresh save: the title screen offered THIRTEEN buttons to a
 * player with $0, one visible skill and one planet. Nine of them led to screens
 * that were empty, unaffordable, or about systems the player had not met — and
 * Expedition, the mode built on top of the basic loop, was open before the
 * first dive. That is not depth, it is a wall.
 * Each entry now appears the moment it can do something, and announces itself
 * once. The gates are deliberately generous: nothing is hidden for long, and
 * everything a player has actually earned is always reachable. */
const MENU_GATES={
  btnExpedition:()=>meta.stats.runs>=2,                 // learn the dive first
  btnChallenge: ()=>meta.stats.runs>=3,
  btnPlanets:   ()=>meta.stats.runs>=2,
  btnModules:   ()=>meta.stats.runs>=4||meta.modules.length>0,
  btnRefine:    ()=>Object.keys(meta.mats||{}).some(k=>meta.mats[k]>0),
  btnContracts: ()=>meta.stats.runs>=3,
  btnSkins:     ()=>meta.stats.runs>=5||meta.cosmetics.owned.length>1,
  btnCodex:     ()=>meta.stats.runs>=2,
  btnAch:       ()=>meta.stats.runs>=2||meta.achievements.length>0,
};
function menuOpen(id){const g=MENU_GATES[id];return !g||!!g();}
/* A freshly unlocked entry gets a one-time "NEU" badge, so the menu growing is
   something the player notices rather than something that happens behind them. */
function refreshMenu(){
  meta.seenMenu=meta.seenMenu||{};
  if(meta.stats.runs>4&&!meta.seenMenu.expedTut){meta.seenMenu.expedTut=1;saveMeta();}
  /* The one unlock that deserves more than a badge: Expedition is a whole second
     mode, so it gets its tutorial card the moment it opens — once. */
  /* Only for players who are actually crossing the threshold. Without the upper
     bound, everyone who already had Expedition open before this build — every
     existing save — would get an unsolicited tutorial card thrown over the title
     screen on their next launch, explaining a mode they have been playing. */
  if(menuOpen('btnExpedition')&&!meta.seenMenu.expedTut&&meta.tutorialSeen&&meta.stats.runs<=4){
    meta.seenMenu.expedTut=1;saveMeta();
    setTimeout(()=>openTut('titleOver','exped'),420);}
  let fresh=false;
  for(const id in MENU_GATES){
    const el=document.getElementById(id);if(!el)continue;
    const open=menuOpen(id);
    el.style.display=open?'':'none';
    const isNew=open&&!meta.seenMenu[id];
    el.classList.toggle('fresh',isNew);
    if(isNew&&!el._newMark){el._newMark=true;
      el.addEventListener('click',()=>{meta.seenMenu[id]=1;saveMeta();el.classList.remove('fresh');},{once:true});}
    if(isNew)fresh=true;}
  return fresh;}
function saveMeta(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(meta));}catch(e){}}

// Skill tree — starts with ONE unlockable skill; buying a node reveals its children.
// A node is only VISIBLE once all its prerequisites are owned (hidden otherwise),
// so the tree grows and gets more complex as you progress. pos=[x,y] grid coords.
const SKILLS=[
 {id:'drill1',  name:'Bohrkraft I',    ic:'⛏️', cost:80,   req:[],         pos:[0,0],    eff:{dp:14}},
 {id:'drill2',  name:'Bohrkraft II',   ic:'⛏️', cost:180,  req:['drill1'], pos:[0,1],    eff:{dp:20}},
 {id:'speed1',  name:'Speed I',        ic:'💨', cost:140,  req:['drill1'], pos:[-1.4,1], eff:{ds:36}},
 {id:'fuel1',   name:'Tank I',         ic:'🛢️', cost:140,  req:['drill1'], pos:[1.4,1],  eff:{de:40,dr:3}},
 {id:'blast',   name:'Blast',          ic:'⚡', cost:320,  req:['drill2'], pos:[0,2],    eff:{ability:'blast'}},
 {id:'speed2',  name:'Speed II',       ic:'💨', cost:320,  req:['speed1'], pos:[-1.4,2], eff:{ds:48}},
 {id:'magnet1', name:'Magnet I',       ic:'🧲', cost:260,  req:['speed1'], pos:[-2.7,2], eff:{dm:60}},
 {id:'fuel2',   name:'Tank II',        ic:'🛢️', cost:320,  req:['fuel1'],  pos:[1.4,2],  eff:{de:55,dr:4}},
 {id:'cool1',   name:'Kühlung I',      ic:'❄️', cost:260,  req:['fuel1'],  pos:[2.7,2],  eff:{dh:3,dc:6}},
 {id:'drill3',  name:'Bohrkraft III',  ic:'⛏️', cost:520,  req:['blast'],  pos:[-0.6,3], eff:{dp:30}},
 {id:'crit1',   name:'Kritisch',       ic:'🎯', cost:560,  req:['blast'],  pos:[0.6,3],  eff:{crit:0.5}},
 {id:'auto',    name:'Auto-Sammler',   ic:'🧲', cost:640,  req:['magnet1'],pos:[-2.7,3], eff:{auto:1,dm:40}},
 {id:'reactor', name:'Reaktor',        ic:'🔋', cost:720,  req:['fuel2'],  pos:[1.4,3],  eff:{de:80,dr:6}},
 {id:'cool2',   name:'Kühlung II',     ic:'❄️', cost:560,  req:['cool1'],  pos:[2.7,3],  eff:{dh:4,dc:8}},
 {id:'magpulse',name:'Magnet-Puls',    ic:'🧲', cost:700,  req:['auto'],   pos:[-3.9,3], eff:{ability:'magpulse',dm:40}},
 {id:'teleport',name:'Teleport',       ic:'🌀', cost:800,  req:['reactor'],pos:[1.9,4],  eff:{ability:'teleport',de:40}},
 {id:'boost',   name:'Boost',          ic:'🚀', cost:900,  req:['drill3'], pos:[-0.6,4], eff:{ability:'boost'}},
 {id:'overload',name:'Overload',       ic:'💥', cost:1100, req:['crit1'],  pos:[0.6,4],  eff:{dp:44,crit:0.4}},
 {id:'drone1',  name:'Drohne',         ic:'🛸', cost:1200, req:['auto'],   pos:[-2.7,4], eff:{drone:1,dv:0.3}},
 {id:'laser',   name:'Laser',          ic:'☄️', cost:1800, req:['boost'],  pos:[-0.6,5], eff:{ability:'laser',dp:20}},
 {id:'droneswarm',name:'Drohnen-Schwarm',ic:'🛸',cost:2000,req:['drone1'], pos:[-2.7,5], eff:{drone:1,dv:0.4,dm:60}},
 // --- endgame tiers (visible power) ---
 {id:'chain1',  name:'Kettenreaktion',  ic:'💢', cost:1800, req:['overload'],pos:[0.9,5],  eff:{chain:1}},
 {id:'wide',    name:'Breitbohrer',     ic:'↔️', cost:1500, req:['overload'],pos:[1.9,5],  eff:{wide:1,dp:20}},
 {id:'plasma',  name:'Plasma-Kern',     ic:'🔥', cost:3000, req:['laser'],  pos:[-0.6,6], eff:{dp:60,wide:1,crit:0.6}},
 {id:'chain2',  name:'Kettenreaktion II',ic:'💥',cost:3200, req:['chain1'], pos:[0.9,6],  eff:{chain:1}},
 {id:'dronemine',name:'Kampfdrohnen',   ic:'🛸', cost:2600, req:['droneswarm'],pos:[-2.7,6],eff:{drone:1,dronemine:1,dv:0.4}},
 {id:'apex',    name:'APEX-Reaktor',    ic:'☢️', cost:6000, req:['plasma','chain2','dronemine'], pos:[-0.9,7.3],
   eff:{dp:120,ds:80,de:150,dr:8,dv:1.0,crit:0.8,drone:2}},
 // --- endgame branch: boss-tech ---
 {id:'crit2',    name:'Kritisch II',    ic:'🎯', cost:1400, req:['overload'], pos:[1.7,5], eff:{crit:0.6,dp:20}},
 {id:'reactor2', name:'Reaktor II',     ic:'🔋', cost:1600, req:['reactor'],  pos:[2.6,4], eff:{de:120,dr:10}},
 {id:'heatshield',name:'Hitzeschild',   ic:'🛡️', cost:1800, req:['cool2'],    pos:[3.4,4], eff:{heatShield:5,dh:3}},
 {id:'coredrill', name:'Kern-Bohrer',   ic:'💥', cost:3200, req:['plasma'],   pos:[-0.6,7], eff:{bossPow:2,dp:30}},
 {id:'drilllord', name:'Bohr-Meister',  ic:'⛏️', cost:3600, req:['coredrill'],pos:[0.4,7], eff:{dp:60,wide:1}},
 {id:'singularity',name:'Singularität', ic:'🌀', cost:12000,req:['apex','coredrill'], pos:[-0.9,8.4],
   eff:{dp:220,ds:100,de:200,dv:1.5,crit:1,drone:2,chain:1,bossPow:2}},
 /* --- DOCTRINES: pick exactly one, ever ---
    44 skills with no exclusivity meant the tree was a checklist: given enough
    runs every player ended up with the identical maxed drill, and there was no
    such thing as "my build". The relics got combinations; the tree needs a
    commitment. Three doctrines branch off the mid-tree, each cheap enough to
    reach early and each locking the other two out until you prestige. Every one
    of them GIVES something and COSTS something, so none is simply best. */
 {id:'doc_drive', name:'Vortrieb',  ic:'⚔️', cost:1500, req:['drill3'], pos:[-1.6,4.2], excl:'doctrine',
   eff:{dp:70,dh:-2}},
 {id:'doc_hunt',  name:'Beutezug',  ic:'🏹', cost:1500, req:['drill3'], pos:[0,4.6],    excl:'doctrine',
   eff:{dv:0.7,dp:-14,luck:0.06}},
 {id:'doc_pion',  name:'Pionier',   ic:'🧱', cost:1500, req:['drill3'], pos:[1.6,4.2],  excl:'doctrine',
   eff:{de:130,dh:4,dc:8,dv:-0.15}},
 // --- expansion: mobility & magnet ---
 {id:'speed3',    name:'Speed III',      ic:'💨', cost:1000, req:['speed2'],   pos:[-1.9,3],  eff:{ds:70}},
 {id:'magnet2',   name:'Magnet II',      ic:'🧲', cost:1400, req:['magpulse'], pos:[-3.9,4],  eff:{dm:130}},
 // --- expansion: survival / fuel & cooling ---
 {id:'reactor3',  name:'Reaktor III',    ic:'🔋', cost:2600, req:['reactor2'], pos:[2.6,5],   eff:{de:160,dr:12}},
 {id:'fuelcell',  name:'Brennzelle',     ic:'⚗️', cost:3400, req:['reactor3'], pos:[2.6,6],   eff:{fuelOre:1,de:80}},
 {id:'cool3',     name:'Kühlung III',    ic:'❄️', cost:2200, req:['heatshield'],pos:[3.9,5],  eff:{dh:5,dc:10}},
 {id:'freeze',    name:'Cryo-Vent',      ic:'🧊', cost:3000, req:['cool3'],    pos:[3.9,6],   eff:{ability:'freeze',dc:6}},
 // --- expansion: greed (loot) branch ---
 {id:'luck1',     name:'Glückstreffer',  ic:'🍀', cost:1600, req:['crit2'],    pos:[2.6,6],   eff:{luck:0.09,dv:0.2}},
 {id:'combo',     name:'Kombo-Meister',  ic:'🔗', cost:2000, req:['crit2'],    pos:[1.6,6],   eff:{combo:1,dv:0.3}},
 {id:'greed',     name:'Gier',           ic:'💎', cost:4200, req:['combo'],    pos:[1.6,7],   eff:{dv:1.4}},
 // --- expansion: heavy ordnance & elite drones ---
 {id:'nuke',      name:'Kern-Sprengung', ic:'☢️', cost:4000, req:['plasma'],   pos:[-1.9,6.4],eff:{ability:'nuke',dp:40}},
 {id:'drone3',    name:'Drohnen-Elite',  ic:'🛰️', cost:4400, req:['dronemine'],pos:[-3.5,6.6],eff:{drone:2,dronemine:1,dv:0.5}},
];
const SKILLMAP={};SKILLS.forEach(s=>SKILLMAP[s.id]=s);
function owned(id){return meta.skills.includes(id);}
function visibleSkill(s){return owned(s.id)||s.req.every(owned);}          // hidden until reachable
/* An exclusive group allows exactly one member for the whole prestige cycle.
   `exclBlocker` returns the skill that is standing in the way, so the tree and
   the info panel can name it instead of just greying the node out — "you cannot
   buy this" without a reason reads as a bug. */
function exclBlocker(s){if(!s.excl)return null;
  return SKILLS.find(x=>x.excl===s.excl&&x.id!==s.id&&owned(x.id))||null;}
function canBuy(s){return !owned(s.id)&&s.req.every(owned)&&!exclBlocker(s)&&meta.credits>=s.cost;}
function buySkill(id){const s=SKILLMAP[id];if(!s||!canBuy(s))return false;
  meta.credits-=s.cost;meta.skills.push(id);saveMeta();return true;}

// Refinery recipes: repeatable, tiered permanent bonuses crafted from raw ore.
// Declared here (above stats) so the stat fold can reference RMAP without a TDZ error.
const RECIPES=[
 {id:'edge',   ic:'⛏️', de:['Verstärkte Spitze','+6 Bohrkraft / Stufe'], en:['Reinforced Bit','+6 power / level'],   mat:{crystal:6,core:2}, eff:{power:6}},
 {id:'coolant',ic:'❄️', de:['Kühlmittel','−1 Hitze / Stufe'],           en:['Coolant','−1 heat / level'],           mat:{cuprite:10},       eff:{heatGen:1}},
 {id:'plating',ic:'🛢️', de:['Tank-Panzerung','+22 Sprit / Stufe'],      en:['Tank Plating','+22 fuel / level'],     mat:{ferrite:14},       eff:{energyMax:22}},
 {id:'coil',   ic:'🧲', de:['Magnetspule','+20 Magnet / Stufe'],        en:['Magnet Coil','+20 magnet / level'],    mat:{cuprite:8,crystal:3},eff:{magnet:20}},
 {id:'polish', ic:'💎', de:['Wert-Politur','+8% Loot / Stufe'],         en:['Value Polish','+8% loot / level'],     mat:{core:6},           eff:{valueMul:0.08}},
 {id:'alloy',  ic:'🍀', de:['Glückslegierung','+2% Fund / Stufe'],      en:['Lucky Alloy','+2% find / level'],      mat:{crystal:8,artifact:1},eff:{luck:0.02}},
];
const RMAP={};RECIPES.forEach(r=>RMAP[r.id]=r);
// Drill modules: buyable gear equipped into 3 slots for build variety.
const MODULES=[
 {id:'m_titan', ic:'⛏️', de:'Titan-Spitze',  en:'Titan Bit',    cost:6000, col:'#c9cdd4', eff:{dp:35}},
 {id:'m_turbo', ic:'🚀', de:'Turbolader',    en:'Turbocharger', cost:6000, col:'#2de2e6', eff:{ds:90}},
 {id:'m_tank',  ic:'🛢️', de:'Großtank',      en:'Mega Tank',    cost:7000, col:'#ff8a3d', eff:{de:120,dr:6}},
 {id:'m_cryo',  ic:'❄️', de:'Kühlfinne',     en:'Cooling Fin',  cost:8000, col:'#8be9ff', eff:{dh:3,dc:8}},
 {id:'m_mag',   ic:'🧲', de:'Magnetkern',    en:'Magnet Core',  cost:7500, col:'#12d9b0', eff:{dm:110}},
 {id:'m_luck',  ic:'🍀', de:'Glückschip',    en:'Lucky Chip',   cost:12000, col:'#3fd977', eff:{luck:0.06,dv:0.2}},
 {id:'m_crit',  ic:'🎯', de:'Krit-Modul',    en:'Crit Module',  cost:13000, col:'#ff4de0', eff:{crit:0.7}},
 {id:'m_drone', ic:'🛸', de:'Drohnen-Bay',   en:'Drone Bay',    cost:16000, col:'#8a5cff', eff:{drone:1,dv:0.3}},
 {id:'m_prism', ic:'💎', de:'Wert-Prisma',   en:'Value Prism',  cost:21000, col:'#ffd23f', eff:{dv:0.5}},
];
const MMAP={};MODULES.forEach(m=>MMAP[m.id]=m);
function stats(){
  let power=30,speed=230,energyMax=260,energyRegen=0,coolRate=0,heatGen=6,magnet=68,valueMul=1,crit=0,drones=0;
  let chain=0,wide=0,dronemine=0,bossPow=0,heatShield=0,luck=0,fuelOre=0,combo=0;const abilities={};
  for(const id of meta.skills){const e=SKILLMAP[id]&&SKILLMAP[id].eff;if(!e)continue;
    power+=e.dp||0;speed+=e.ds||0;energyMax+=e.de||0;energyRegen+=e.dr||0;
    heatGen-=e.dh||0;coolRate+=e.dc||0;magnet+=e.dm||0;valueMul+=e.dv||0;crit+=e.crit||0;chain+=e.chain||0;
    bossPow+=e.bossPow||0;heatShield+=e.heatShield||0;luck+=e.luck||0;fuelOre+=e.fuelOre||0;
    if(e.combo)combo=1;
    if(e.auto)magnet+=120;if(e.drone)drones++;if(e.wide)wide=1;if(e.dronemine)dronemine=1;if(e.ability)abilities[e.ability]=1;}
  // refinery: permanent bonuses crafted from raw ore
  const rf=meta.refine||{};
  for(const id in rf){const r=RMAP&&RMAP[id],L=rf[id]||0;if(!r||!L)continue;const e=r.eff;
    power+=(e.power||0)*L;energyMax+=(e.energyMax||0)*L;heatGen-=(e.heatGen||0)*L;
    magnet+=(e.magnet||0)*L;valueMul+=(e.valueMul||0)*L;luck+=(e.luck||0)*L;}
  // equipped drill modules (uses the same eff keys as skills)
  for(const id of(meta.slots||[])){const md=id&&MMAP[id];if(!md)continue;const e=md.eff;
    power+=e.dp||0;speed+=e.ds||0;energyMax+=e.de||0;energyRegen+=e.dr||0;heatGen-=e.dh||0;coolRate+=e.dc||0;
    magnet+=e.dm||0;valueMul+=e.dv||0;crit+=e.crit||0;luck+=e.luck||0;if(e.drone)drones++;}
  const cores=meta.prestige?meta.prestige.cores:0;power+=cores*4;
  const shards=meta.ascend?meta.ascend.shards:0;power+=shards*3;
  // Ascension board: the part of a shard's value the player chose themselves.
  power+=perkLvl('a_titan')*14;energyMax+=perkLvl('a_store')*45;valueMul+=perkLvl('a_res')*0.12;
  /* Prestige used to be (1 + 0.12·cores)·(1 + 0.25·shards) — linear, unbounded,
   * and multiplied on top of every other loot source. Measured at 300 cores /
   * 30 shards that reached x314, so one relic on Obscura in Overdrive paid
   * $2.9M — six times the price of ALL content in the game ($481k), in a single
   * pickup. That is where the millions came from.
   * Square root keeps the early rewards almost identical (10 cores: x2.2 -> x2.7)
   * while flattening the tail hard (300 cores: x37 -> x10.5), so prestige stays
   * worth doing forever without ending the economy. */
  const pMul=(1+0.55*Math.sqrt(cores))*(1+1.2*Math.sqrt(shards));
  return{power,speed,energyMax,energyRegen,coolRate,heatGen:Math.max(3,heatGen),magnet,valueMul,crit,drones,chain,wide,dronemine,bossPow,heatShield,luck,fuelOre,combo,abilities,
    prestigeMult:pMul, tier:Math.min(8,1+Math.floor(meta.skills.length/3)+drones+(shards>0?1:0))};}

/* ===================== RESOURCES / BLOCKS ===================== */
const RES={
  ferrite:{name:'Scrap', color:'#c9d4e0',glow:'#eef4ff',value:6,  rar:'common'},
  cuprite:{name:'Copper',color:'#ff9d5c',glow:'#ffd9b0',value:16, rar:'common'},
  crystal:{name:'Shard', color:'#5cf0d8',glow:'#b6fff2',value:44, rar:'uncommon'},
  core:   {name:'Core',  color:'#2de2e6',glow:'#c8ffff',value:130,rar:'rare'},
  artifact:{name:'Relic',color:'#8a5cff',glow:'#e6d8ff',value:520,rar:'legendary'},
};
const HARD={dirt:16,stone:34,hard:64,dark:96,boss:260};
/* Scrap dust: every block you break pays a little, scaled by how hard it was.
 * Only ~1 tile in 10 carries real ore, so without this nine out of ten swings
 * gave the player nothing at all — the single emptiest thing about the loop.
 * The dust is small on its own but makes the cash counter tick on every break,
 * and it lifts a careful first run from "can't afford anything" to "one upgrade". */
const DUST={dirt:2,stone:4,hard:7,dark:11};
// Field recycler ceiling: regen tops the tank up to this share, never past it.
const REGEN_CAP=0.7;
// Base cooling once you stop cutting. Kühlung skills add to this via coolRate.
const HEAT_VENT=9;
function genTile(depthM,ring,sec){
  // core guardian: the innermost rings are a super-hard boss layer with guaranteed loot
  if(ring<(P.bossRings||2)){const bhp=HARD.boss*P.hardMul*cmul('hard')*expHard();return{rock:'boss',res:ring===0?'artifact':'core',boss:true,hp:bhp,maxhp:bhp};}
  /* Everything below scales with f = how far down THIS planet's shaft you are,
   * not with absolute metres. The thresholds used to be hard-coded (dark rock
   * past 18 m, relics past 20 m), which was tuned for a 26-ring world; once a
   * shaft is 60-100 rings deep those constants would turn the whole mid-game
   * into one uniform slab of the hardest rock with relics in every other tile.
   * As a fraction, one curve fits every planet and the descent keeps escalating
   * all the way down: softer and poorer up top, brutal and rich near the core. */
  const f=depthM/Math.max(1,RINGS-1);
  let rock='dirt';
  if(f>0.62)rock='dark';else if(f>0.38)rock='hard';else if(f>0.15)rock='stone';
  const lk=Math.min(0.4,(typeof S!=='undefined'&&S&&S.luck)||0);   // Glückstreffer: more & rarer finds (capped)
  let res=null;const roll=rnd();
  if(roll<0.15+lk){
    if(f>0.78&&rnd()<0.05+lk)res='artifact';
    else if(f>0.55&&rnd()<0.16+lk)res='core';
    else if(f>0.32&&rnd()<0.30+lk)res='crystal';
    else if(f>0.13&&rnd()<0.5)res='cuprite'; else res='ferrite';}
  // rich veins: coarse hashed clusters of better ore -> juicy pockets
  if(!res&&f>0.18&&hash((ring/2)|0,(sec/3)|0)%1000<(P.veins?130:55)){
    res=f>0.66&&rnd()<0.25?'core':f>0.40&&rnd()<0.6?'crystal':'cuprite';}
  /* Lava veins (Magmar, Obscura): not an obstacle you can shoot, a pressure you
     have to route around. Cutting one dumps heat straight into the drill, and
     merely being next to one keeps cooking you — which on a heat-driven world
     turns the Overdrive band from a choice into a place you get pushed. */
  /* Sentries (Mechon): dead machines that wake when you get close and siphon
     fuel until you cut them out. They turn a straight dive into a route
     problem — the fastest line down is rarely the cheapest one. */
  const sentry=P.sentry&&f>0.16&&rnd()<P.sentry;
  const lava=P.lava&&f>0.20&&rnd()<P.lava;
  const gas=f>0.13&&rnd()<(P.gasChance||0.018);
  const cave=!gas&&f>0.30&&rnd()<(P.caveChance||0);
  let hp=HARD[rock]*P.hardMul*cmul('hard')*expHard();
  if(sentry)hp*=1.8;                     // armoured: cutting one out is a real decision
  return{rock,res,gas,cave,lava,sentry,hp,maxhp:hp};}
const world=new Map();const key=(ring,sec)=>ring+','+sec;
const regrow=[];   // tiles waiting to close back up (Cryonis / Verdant)
function tilePolar(ring,sec){
  if(ring<0)return{wall:true};           // core
  if(ring>=RINGS)return null;             // space
  const k=key(ring,sec);if(world.has(k))return world.get(k);
  const depthM=(RINGS-1-ring);
  // station rings are hollow: the cavern is already there, you just drop into it
  if(isStationDepth(depthM)){world.set(k,null);return null;}
  const t=depthM===0?{rock:'dirt',res:null,hp:HARD.dirt*0.4*P.hardMul,maxhp:HARD.dirt*0.4*P.hardMul}:genTile(depthM,ring,sec);
  world.set(k,t);return t;}

/* ===================== STATE ===================== */
let S=stats();
let pendingExp=false;      // set by the EXPEDITION button, consumed by startRun
let POW=S.power;                                 // effective drill power (boost-modulated)
const run={active:false,paused:false,exp:null,ovr:0,ventT:0,ovrOn:false,critT:0,critMul:1,critFx:0,depthMax:0,haul:0,energy:S.energyMax,heat:0,shockCd:0,boostT:0,boostCd:0,laserCd:0,magCd:0,tpCd:0,freezeT:0,freezeCd:0,nukeCd:0,combo:0,comboT:0,maxCombo:0,relicsRun:0,guardsRun:0,frostT:0,event:null,eventCd:0,matsRun:{},challenge:false,bossPulseT:0,bossWave:0,bossKills:0,inBoss:false};
const drill={rad:R_SURF+300,ang:0,face:Math.PI/2};
const drops=[],parts=[],dmgnums=[],enemies=[];
let bossBeam=0;

/* ===================== PERFORMANCE / QUALITY ===================== */
// Three tiers. 'auto' watches the real frame time and steps down on a weak
// device (and back up once it recovers), so older phones stay at 60 FPS.
const QUAL_TIERS={
  high:{parts:260,stars:80,noise:1,scan:1,ca:1,nebula:1,tileDetail:1},
  low: {parts:90, stars:34,noise:0,scan:0,ca:0,nebula:0,tileDetail:0},
};
let QUAL=QUAL_TIERS.high,qualAuto=true,fpsAvg=60,qualHold=0;
function applyQuality(){const q=(settings.quality||'auto');
  qualAuto=(q==='auto');
  if(!qualAuto)QUAL=QUAL_TIERS[q]||QUAL_TIERS.high;}
// called once per frame with the frame delta
function tickQuality(dt){
  const fps=1/Math.max(0.0005,dt);
  fpsAvg+=(Math.min(120,fps)-fpsAvg)*0.05;      // smoothed, spike-resistant
  if(!qualAuto)return;
  qualHold-=dt;if(qualHold>0)return;
  if(QUAL===QUAL_TIERS.high&&fpsAvg<44){QUAL=QUAL_TIERS.low;qualHold=4;}        // struggling -> lighten
  else if(QUAL===QUAL_TIERS.low&&fpsAvg>56){QUAL=QUAL_TIERS.high;qualHold=6;}   // recovered -> restore
}
let shake=0,flash=0,hitstop=0,drilling=false,glitch=0,laserFx=0,moveMag=0;

/* ===================== CAMERA ===================== */
let W=0,H=0,PIX=3,LW=0,LH=0,DRILL_SY=0;
let SCALEcur=0.62,pcx=0,pcy=0;
// Same 2D perspective the whole time: drill stays centred, core always straight down.
// Flying up only zooms out a little, so the planet is seen a bit further away — it never
// vanishes and never changes viewing angle (like a side-on To-the-Core view).
function camScaleTarget(){
  const alt=Math.max(0,drill.rad-R_SURF);
  const t=ease(clamp(alt/520,0,1));
  return 1+(0.62-1)*t;                        // 1.0 digging -> 0.62 up high (mild)
}
function updateCamera(dt){
  SCALEcur+=(camScaleTarget()-SCALEcur)*Math.min(1,dt*6);
  pcx=W/2;pcy=DRILL_SY+drill.rad*SCALEcur;    // drill always centred at DRILL_SY
}
function snapCamera(){SCALEcur=camScaleTarget();pcx=W/2;pcy=DRILL_SY+drill.rad*SCALEcur;}
function w2s(rad,ang){const d=angDiff(ang,drill.ang),f=-Math.PI/2+d;
  return[pcx+rad*SCALEcur*Math.cos(f),pcy+rad*SCALEcur*Math.sin(f)];}

/* ===================== INPUT (anchor stick) ===================== */
// Floating anchor stick. Three things make it feel good: the anchor follows
// your thumb once you pull past the edge (so it never saturates and you can
// drag as far as you like), the magnitude runs through a smoothstep curve
// (precise near the centre, full power at the rim), and update() reads a
// smoothed vector so the machine has weight instead of snapping.
const input={active:false,ax:0,ay:0,dx:0,dy:0,mag:0,sdx:0,sdy:0,smag:0,tapT:0};
const MAXR=92,DEAD=9;
function setInput(px,py){let dx=px-input.ax,dy=py-input.ay;const d=Math.hypot(dx,dy);
  if(d>MAXR){const k=(d-MAXR)/d;input.ax+=dx*k;input.ay+=dy*k;dx*=MAXR/d;dy*=MAXR/d;}
  input.dx=dx;input.dy=dy;
  const raw=Math.min(1,Math.max(0,(Math.hypot(dx,dy)-DEAD)/(MAXR-DEAD)));
  input.mag=raw*raw*(3-2*raw);}
const cv=document.getElementById('game');
function ptc(e){const t=e.touches?e.touches[0]:e;return{x:t.clientX,y:t.clientY};}
function onDown(e){if(!run.active)return;
  if(e.touches&&e.touches.length>1)return;            // two fingers is never steering
  const t=ptc(e);input.active=true;input.ax=t.x;input.ay=t.y;setInput(t.x,t.y);
  input.tapT=0.14;haptic('sel');hideHint();}
function onMove(e){if(input.active){const t=ptc(e);setInput(t.x,t.y);e.preventDefault();}}
function onUp(){input.active=false;input.mag=0;input.dx=input.dy=0;}
cv.addEventListener('touchstart',onDown,{passive:false});
cv.addEventListener('touchmove',onMove,{passive:false});
cv.addEventListener('touchend',onUp);cv.addEventListener('touchcancel',onUp);
cv.addEventListener('mousedown',onDown);
window.addEventListener('mousemove',e=>{if(input.active)onMove(e);});
window.addEventListener('mouseup',onUp);
const kb={};
window.addEventListener('keydown',e=>{kb[e.key.toLowerCase()]=true;const k=e.key.toLowerCase();if(e.key===' ')shockwave();if(k==='b')boost();if(k==='l')laser();if(k==='m')magpulse();if(k==='t')teleport();if(k==='f')freeze();if(k==='n')nuke();});
window.addEventListener('keyup',e=>{kb[e.key.toLowerCase()]=false;});
function kbVec(){let x=0,y=0;if(kb['arrowleft']||kb['a'])x-=1;if(kb['arrowright']||kb['d'])x+=1;
  if(kb['arrowup']||kb['w'])y-=1;if(kb['arrowdown']||kb['s'])y+=1;
  if(x||y){const m=Math.hypot(x,y);return{dx:x/m,dy:y/m};}return null;}

/* ===================== AUDIO / HAPTICS ===================== */
// Premium audio: a shared master bus (compressor for glue + a generated reverb
// send) makes the procedural voices sound full and cohesive instead of thin beeps.
let AC=null,muted=false;
function makeReverb(a){const len=(a.sampleRate*1.1)|0,buf=a.createBuffer(2,len,a.sampleRate);
  for(let ch=0;ch<2;ch++){const d=buf.getChannelData(ch);
    for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.6);}
  const c=a.createConvolver();c.buffer=buf;return c;}
function audio(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();
    const master=AC.createGain();master.gain.value=0.85;
    const comp=AC.createDynamicsCompressor();comp.threshold.value=-15;comp.knee.value=20;comp.ratio.value=3;comp.attack.value=0.004;comp.release.value=0.2;
    master.connect(comp);comp.connect(AC.destination);
    const rev=makeReverb(AC),revGain=AC.createGain();revGain.gain.value=0.3;rev.connect(revGain);revGain.connect(master);
    const revIn=AC.createGain();revIn.gain.value=1;revIn.connect(rev);
    AC._master=master;AC._revIn=revIn;
  }catch(e){}}return AC;}
function blip(f,dur,type,vol,slide,atk,send){if(!settings.sfx)return;const a=audio();if(!a||!a._master)return;
  const o=a.createOscillator(),g=a.createGain(),t0=a.currentTime;o.type=type||'square';o.frequency.setValueAtTime(f,t0);
  if(slide)o.frequency.exponentialRampToValueAtTime(slide,t0+dur);
  const v=vol||0.15,at=Math.min(dur*0.5,atk||0.006);
  g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(v,t0+at);g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  o.connect(g);g.connect(a._master);
  if(send!==0){const sg=a.createGain();sg.gain.value=send||0.5;g.connect(sg);sg.connect(a._revIn);}
  o.start(t0);o.stop(t0+dur+0.03);}
/* Noise with a filter and a reverb send. Unfiltered white noise is the single
 * cheapest-sounding thing in a game — it made a dirt clod and a shattering slab
 * of dark rock the exact same hiss. `cut` picks the filter corner: low values
 * give a body-thud, high values a bright shatter. */
function noise(dur,vol,cut,send){if(!settings.sfx)return;const a=audio();if(!a||!a._master)return;
  const n=a.createBuffer(1,Math.max(1,(a.sampleRate*dur)|0),a.sampleRate),d=n.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
  const s=a.createBufferSource(),g=a.createGain();s.buffer=n;g.gain.value=vol||0.08;
  if(cut){const f=a.createBiquadFilter();f.type=cut<0?'highpass':'lowpass';f.frequency.value=Math.abs(cut);f.Q.value=0.8;
    s.connect(f);f.connect(g);}else s.connect(g);
  g.connect(a._master);
  if(send){const sg=a.createGain();sg.gain.value=send;g.connect(sg);sg.connect(a._revIn);}
  s.start();}
/* The drill engine: one continuous voice that lives for the whole run instead of
 * a machine-gun of one-shots. It tracks Overdrive, so pushing into the red band
 * is something you HEAR straining before you read it on the HUD. */
let _eng=null,_engDead=false;
function engine(){if(_engDead)return null;const a=audio();if(!a||!a._master)return null;
  // Audio must never be able to take the run down with it: any missing node type
  // on an old WebView degrades to "no engine hum", not a crash mid-descent.
  if(!_eng)try{const o=a.createOscillator(),o2=a.createOscillator(),f=a.createBiquadFilter(),g=a.createGain();
    o.type='sawtooth';o.frequency.value=54;o2.type='square';o2.frequency.value=27;
    f.type='lowpass';f.frequency.value=380;f.Q.value=6;
    g.gain.value=0;o.connect(f);o2.connect(f);f.connect(g);g.connect(a._master);
    o.start();o2.start();
    _eng={o,o2,f,g};}catch(e){_engDead=true;return null;}
  return _eng;}
function engineSet(level,ovr){const a=audio();if(!a)return;const e=engine();if(!e)return;
  const t=a.currentTime,on=settings.sfx?level:0;
  e.g.gain.setTargetAtTime(on*(0.05+0.075*ovr),t,0.08);
  e.o.frequency.setTargetAtTime(54+46*ovr,t,0.12);          // pitch climbs as it strains
  e.o2.frequency.setTargetAtTime(27+23*ovr,t,0.12);
  e.f.frequency.setTargetAtTime(380+1500*ovr,t,0.1);}       // and opens up into a snarl
// Small random detune on repeated sounds: identical playback is the single
// biggest giveaway of a cheap-sounding game.
const vary=(f,amt)=>f*(1+(Math.random()-0.5)*(amt||0.06));
// Each rock type gets its own break: [pitch, filter corner, body gain].
// Dirt crumbles dull and low, dark rock shatters bright and ringing.
const ROCKSND={dirt:[150,900,0.10],stone:[190,1800,0.11],hard:[240,3200,0.12],dark:[300,5200,0.13],boss:[110,6000,0.16]};
const sfx={tick:()=>noise(0.03,0.04,1400),
  brk:(rock)=>{const r=ROCKSND[rock]||ROCKSND.stone;
    blip(vary(r[0],0.3),0.11,'square',r[2],r[0]*0.45,0.004,0.35);
    blip(vary(r[0]*0.34,0.3),0.14,'sine',0.09,r[0]*0.2,0.002,0.2);
    noise(0.05,0.05,r[1],0.15);},
  /* Crit: a bright metallic strike layered over the break. Scales with how many
     crit multiples landed, so a triple crit sounds unmistakably bigger. */
  crit:(hits)=>{const n=Math.min(3,hits||1);
    blip(vary(880+180*n,0.04),0.09,'square',0.10+0.02*n,vary(1900+400*n),0.001,0.5);
    blip(vary(1760+360*n,0.04),0.06,'triangle',0.06,null,0.001,0.6);
    noise(0.05,0.05+0.02*n,-2600,0.3);},
  /* Extraction: the most rewarding moment in the game used to play the same
     click as a menu button. Now it is a rising major arpeggio with a bass drop
     under it — the sound the player is actually working toward. */
  extract:()=>{[523.25,659.25,783.99,1046.5].forEach((f,i)=>setTimeout(()=>{
      blip(f,0.5,'triangle',0.13,null,0.008,0.75);
      blip(f*2,0.34,'sine',0.05,null,0.004,0.8);},i*85));
    blip(130.81,0.8,'sine',0.13,65,0.01,0.4);
    setTimeout(()=>noise(0.5,0.05,-1800,0.6),340);},
  // Entering the Overdrive band: one warning snarl, so the state has an onset.
  ovr:()=>{blip(vary(150,0.03),0.30,'sawtooth',0.11,330,0.006,0.45);
           noise(0.22,0.06,700,0.3);},
  rare:()=>{blip(vary(520),0.11,'triangle',0.16,null,0.01);setTimeout(()=>blip(vary(780),0.13,'triangle',0.18,null,0.01),90);},
  leg:()=>{[440,660,880,1320].forEach((f,i)=>setTimeout(()=>{blip(f,0.24,'sawtooth',0.14,null,0.01,0.7);blip(f*1.5,0.24,'sine',0.05,null,0.02);},i*100));},
  shock:()=>{blip(90,0.4,'sawtooth',0.2,1200,0.002,0.6);noise(0.3,0.12,900,0.45);},
  // UI: a short two-layer click — body + a bright tick on top, slightly detuned
  ui:()=>{blip(vary(660,0.05),0.045,'square',0.075,null,0.002,0.2);
          blip(vary(1750,0.05),0.028,'sine',0.045,null,0.001,0.15);},
  back:()=>{blip(vary(420,0.04),0.06,'square',0.075,null,0.003,0.2);
            blip(vary(300,0.04),0.05,'sine',0.04,null,0.002,0.15);},
  buy:()=>{blip(vary(520),0.08,'square',0.13,null,0.004);setTimeout(()=>blip(vary(790),0.1,'square',0.13,null,0.004),70);},
  deny:()=>{blip(vary(190,0.03),0.1,'square',0.1,150,0.003,0.15);}};
function vibe(p){if(!settings.vibe)return;
  const cap=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Haptics;
  if(cap){try{const d=Array.isArray(p)?p.reduce((a,b)=>a+b,0):p;cap.vibrate({duration:Math.min(320,d)});return;}catch(e){}}
  if(navigator.vibrate){try{navigator.vibrate(p);}catch(e){}}}
/* A named haptic vocabulary instead of raw millisecond patterns.
 * On device this maps to the OS taptic engine (crisp impacts and notification
 * patterns, which is what makes a game feel expensive in the hand); on the web
 * it falls back to the closest vibration pattern. */
const HAPTICS={
  sel:    {style:'LIGHT',  web:8},
  light:  {style:'LIGHT',  web:12},
  medium: {style:'MEDIUM', web:20},
  heavy:  {style:'HEAVY',  web:34},
  success:{notify:'SUCCESS', web:[12,40,18]},
  warning:{notify:'WARNING', web:[26,44,26]},
  error:  {notify:'ERROR',   web:[40,60,40]},
  epic:   {notify:'SUCCESS', web:[24,44,24,60,110]},
};
let _hapT=0;
function haptic(kind){if(!settings.vibe)return;
  const h=HAPTICS[kind];if(!h)return;
  const now=performance.now();
  if(kind==='sel'||kind==='light'){if(now-_hapT<45)return;_hapT=now;}   // don't buzz continuously
  const cap=window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Haptics;
  if(cap){try{
    if(h.notify&&cap.notification){cap.notification({type:h.notify});return;}
    if(h.style&&cap.impact){cap.impact({style:h.style});return;}
  }catch(e){}}
  vibe(h.web);}
// Procedural background music — layered (bass + pad + arp), state-aware:
// calm ambience on the menus, driving as you dig, tense in the boss layer.
let musicTimer=null,beat=0,musicRate=430;
/* Each planet gets its own key AND its own colour: nine worlds used to share
 * five root notes and one identical arrangement, so "area music" was really one
 * track transposed. [root, pad wave, lead wave, minor-third?] gives each world a
 * recognisable mood — Cryonis glassy and bright, Abyss low and detuned. */
const PLANET_SND={
  terra:  [110,   'sine',    'triangle', 1],
  magmar: [ 98,   'sawtooth','square',   1],
  cryonis:[146.83,'sine',    'sine',     0],
  ferro:  [ 87.31,'triangle','sawtooth', 1],
  mechon: [130.81,'square',  'square',   0],
  neon:   [123.47,'sawtooth','triangle', 0],
  abyss:  [ 73.42,'sine',    'sawtooth', 1],
  verdant:[103.83,'triangle','sine',     0],
  obscura:[ 82.41,'sawtooth','sawtooth', 1],
};
function planetSnd(){return PLANET_SND[P.id]||PLANET_SND.terra;}
function musicRoot(){return planetSnd()[0];}
function musicTick(){if(!settings.music)return;const a=audio();if(!a||!a._master)return;
  const rt=musicRoot(),inRun=run.active,boss=inRun&&run.inBoss;
  const snd=planetSnd(),padW=snd[1],leadW=snd[2],third=snd[3]?1.189:1.26;  // minor vs major colour
  if(!inRun){                                   // menu ambience — sparse, warm pad
    if((beat&3)===0){blip(rt,1.7,padW,0.05,null,0.4);blip(rt*1.5,1.7,'sine',0.032,null,0.5);}
    if((beat&7)===4)blip(rt*3,1.0,'triangle',0.02,null,0.35);
    beat++;return;
  }
  /* Intensity scales with progress through THIS shaft. It used to be
     depthMax/40 — tuned for a 26-ring world, so on a 102-ring planet the score
     hit full intensity a third of the way down and then flatlined for the rest
     of the descent, exactly where it should be building. */
  const dT=Math.min(1,run.depthMax/Math.max(8,RINGS*0.8));
  const root=[rt,rt,rt*1.335,rt*third][beat&3];
  blip(root/2,0.55,'triangle',0.06,null,0.02,0.3);          // bass pulse
  if((beat&1)===0){blip(root,0.6,padW,0.035,null,0.1,0.5);blip(root*third,0.6,'sine',0.024,null,0.12,0.5);}  // pad chord
  if((beat&1)===0)noise(0.03,0.045,-3000,0.25);             // soft hat
  if(dT>0.3&&(beat&3)===2)blip(root*3,0.22,leadW,0.02+dT*0.03,null,0.01,0.5);      // arp
  if(dT>0.6&&(beat&1))blip(root*4,0.12,leadW,0.015+dT*0.02,null,0.005);            // lead sparkle
  // Overdrive drops a hard off-beat kick under everything — the score joins in
  if(run.ovr>0.25){blip(rt*0.5,0.16,'square',0.05+0.05*run.ovr,rt*0.25,0.002,0.15);
    if(beat&1)noise(0.04,0.03+0.03*run.ovr,-2200,0.2);}
  if(boss){blip(rt*1.5,0.15,'sawtooth',0.06,null,0.005,0.4);if((beat&1)===0)blip(rt*0.5,0.45,'square',0.05,null,0.01);noise(0.05,0.04,600,0.4);}
  beat++;
  // tempo rides depth and Overdrive: the deeper and hotter you are, the harder it drives
  const want=Math.round(430-150*dT-70*run.ovr);
  if(musicTimer&&want!==musicRate){musicRate=want;clearInterval(musicTimer);musicTimer=setInterval(musicTick,want);}}
function ensureMusic(){if(musicTimer)return;const a=audio();if(!a)return;if(a.state==='suspended')a.resume();
  musicRate=430;musicTimer=setInterval(musicTick,musicRate);}
function startMusic(){ensureMusic();}
function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null;}}

/* ===================== FX ===================== */
// Particles are pooled and removed via swap-and-pop (O(1), no array shifting,
// no per-burst allocation) — this is the hottest path on older phones.
const partPool=[];
function burst(x,y,color,n,spd){const cap=QUAL.parts;
  if(parts.length>=cap)return;
  if(parts.length+n>cap)n=cap-parts.length;
  for(let i=0;i<n;i++){const a=rnd()*TAU,s=(spd||1)*(40+rnd()*160);
    const p=partPool.pop()||{x:0,y:0,vx:0,vy:0,life:0,age:0,color:'#fff',size:1};
    p.x=x;p.y=y;p.vx=Math.cos(a)*s;p.vy=Math.sin(a)*s-30;
    p.life=0.5+rnd()*0.5;p.age=0;p.color=color;p.size=1+(rnd()<0.5?1:2);
    parts.push(p);}}
function killPart(i){const p=parts[i];parts[i]=parts[parts.length-1];parts.pop();
  if(partPool.length<400)partPool.push(p);}
function dmgNum(x,y,v,color,crit){if(dmgnums.length>40)dmgnums.shift();
  dmgnums.push({x:x+(rnd()-0.5)*10,y,v:Math.round(v*10)/10,age:0,life:crit?0.95:0.7,color,crit:!!crit});}
// Loot payout text. `big` 0/1/2 = common / rare / legendary: rarer ore rises
// slower, lives longer and is set bigger, so value reads at a glance.
function lootNum(x,y,txt,color,big){if(dmgnums.length>40)dmgnums.shift();
  dmgnums.push({x,y,v:txt,age:0,life:0.85+0.35*big,color,loot:true,big:big||0,vy:26+8*big});}

/* ===================== MINING ===================== */
function collectRes(id,rad,ang){const r=RES[id];drops.push({rad,ang,id,got:false,t:0});
  if(id==='artifact'){run.relicsRun++;meta.stats.relics=(meta.stats.relics||0)+1;}   // contract/achievement tracking
  if(r.rar==='rare'){sfx.rare();haptic('success');flash=Math.max(flash,0.5);shake=Math.max(shake,10);glitch=0.25;}
  else if(r.rar==='legendary'){sfx.leg();haptic('epic');flash=Math.max(flash,0.9);shake=Math.max(shake,18);glitch=0.5;}
  else if(r.rar==='uncommon'){sfx.rare();haptic('medium');}else haptic('light');}
let tickAcc=0,chainGuard=0;
function mineTile(ring,sec,dmg){const t=tilePolar(ring,sec);if(!t||t.wall)return false;t.hp-=dmg;
  const rad_c=R_CORE+(ring+0.5)*TILE,ang_c=(sec+0.5)*dsecOf(ring),ps=w2s(rad_c,ang_c);
  const critNow=(run.critMul||1)>1;
  tickAcc+=dmg;if(tickAcc>7){dmgNum(ps[0],ps[1]-6,tickAcc,critNow?'#ffe14d':T.dmg,critNow);tickAcc=0;}
  if(rnd()<0.3)burst(ps[0],ps[1],P.ground[2],1,0.5);
  if(t.hp<=0){world.set(key(ring,sec),null);burst(ps[0],ps[1],T.accent,10,1);shake=Math.max(shake,3.5);hitstop=0.02;
    run.combo=Math.min(99,run.combo+1);run.comboT=1.5;if(run.combo>run.maxCombo)run.maxCombo=run.combo;  // streak (loot bonus only with Kombo-Meister)
    sfx.brk(t.rock);vibe(4);if(t.res)collectRes(t.res,rad_c,ang_c);
    const dust=DUST[t.rock];if(dust){run.haul+=dust*(S.dustMul||1)*lootMul();
      if(rnd()<0.55)burst(ps[0],ps[1],RES.ferrite.glow,2,0.7);}   // a glint, so the payout is visible
    // core guardian broken: big payoff
    if(t.boss){flash=Math.max(flash,1);shake=Math.max(shake,22);glitch=0.5;sfx.leg();vibe([30,50,30,80]);
      run.haul+=140*lootMul();run.bossKills++;run.guardsRun++;meta.stats.guardian=true;meta.stats.guardianKills=(meta.stats.guardianKills||0)+1;checkAchievements();}
    // lava vein: cutting it vents molten rock straight into the cabin
    if(t.lava){run.heat=Math.min(99,run.heat+22-S.heatShield);burst(ps[0],ps[1],'#ffb03d',26,2.0);
      shake=Math.max(shake,14);flash=Math.max(flash,0.35);sfx.shock();haptic('heavy');}
    /* Regrowth (Cryonis ice, Verdant vines): the shaft you carved closes behind
       you. Every other world lets you treat your own tunnel as a free road home;
       here the road expires, so "how deep dare I go" stops being a fuel sum and
       becomes a bet on time. */
    if(P.regrow&&!t.boss)regrow.push({ring,sec,t:P.regrow,rock:t.rock});
    // gas pocket: detonates, spikes heat and blows out neighbours
    if(t.gas){run.heat=Math.min(99,run.heat+16);burst(ps[0],ps[1],T.fuel,22,1.8);
      shake=Math.max(shake,12);flash=Math.max(flash,0.4);sfx.shock();vibe([15,30]);
      if(chainGuard<2){chainGuard++;for(const nn of neighborsOf(ring,sec))mineTile(nn[0],nn[1],9999);chainGuard--;}}
    // cave-in: ceiling collapses -> rubble falls, heat spike, heavy shake
    if(t.cave){run.heat=Math.min(99,run.heat+10);shake=Math.max(shake,16);flash=Math.max(flash,0.5);glitch=0.3;
      sfx.shock();vibe([25,50,25]);
      for(let k=1;k<=3;k++){const rr=ring+k;if(rr>=RINGS)break;const ss=sectorOf(ang_c,rr);
        const pp=w2s(R_CORE+(rr+0.5)*TILE,(ss+0.5)*dsecOf(rr));burst(pp[0],pp[1],P.ground[2],8,1.6);
        if(chainGuard<1){chainGuard++;mineTile(rr,ss,9999);chainGuard--;}}}
    // brittle ice (Cryonis): shattering block cracks a random neighbour for free
    if(P.brittle&&chainGuard<1&&rnd()<0.35){chainGuard++;const bn=neighborsOf(ring,sec),pk=bn[Math.floor(rnd()*4)];
      mineTile(pk[0],pk[1],9999);chainGuard--;}
    /* NEON resonance: the shattered block rings, and every neighbour of the SAME
       rock type rings with it. Cutting along a stratum cascades; cutting across
       one does not. It rewards reading the strata instead of holding down and
       going straight, which is the only world where the line you pick matters
       more than the drill you brought. */
    if(P.resonance&&chainGuard<2){chainGuard++;
      for(const nn of neighborsOf(ring,sec)){
        const nt=world.get(key(nn[0],nn[1]));
        if(nt&&!nt.wall&&nt.rock===t.rock&&rnd()<0.62){
          const np=w2s(R_CORE+(nn[0]+0.5)*TILE,(nn[1]+0.5)*dsecOf(nn[0]));
          burst(np[0],np[1],P.core,4,1.1);
          mineTile(nn[0],nn[1],9999);}}
      chainGuard--;}
    /* Shatterstrike: a crit that breaks a block sets off a chain of its own, so
       the crit build and the chain build stop being alternatives and become one. */
    if(S.critChain&&(run.critMul||1)>1&&chainGuard<2){chainGuard++;
      for(const nn of neighborsOf(ring,sec))if(rnd()<0.55){
        const cp=w2s(R_CORE+(nn[0]+0.5)*TILE,(nn[1]+0.5)*dsecOf(nn[0]));
        burst(cp[0],cp[1],'#ffe14d',4,1.2);
        mineTile(nn[0],nn[1],9999);}
      chainGuard--;}
    // chain reaction: destroyed blocks detonate neighbours (depth = chain level)
    if(S.chain>0&&chainGuard<S.chain){chainGuard++;
      for(const nn of neighborsOf(ring,sec))if(rnd()<0.6)mineTile(nn[0],nn[1],9999);chainGuard--;}
    return true;}
  return false;}
// drilling into a tile; Breitbohrer (wide) also carves the two side tiles
function drillTile(ring,sec,dmg){mineTile(ring,sec,dmg);
  if(S.wide){const n=secCount(ring),side=S.wideFull?dmg:dmg*0.7;
    mineTile(ring,(sec+1)%n,side);mineTile(ring,(sec-1+n)%n,side);}}

/* Single source of truth for what an ability costs and how long it locks out.
   The ability functions, the HUD cooldown bars and the skill-tree explanation
   all read these numbers, so the displayed cost can never drift from the real one. */
const ABILITY={
  blast:   {fuel:22, cd:5},
  boost:   {fuel:28, cd:12},
  laser:   {fuel:30, cd:8},
  magpulse:{fuel:18, cd:10},
  teleport:{fuel:20, cd:14},
  freeze:  {fuel:24, cd:18},
  nuke:    {fuel:42, cd:22},
};

function shockwave(){if(!run.active||!S.abilities.blast||run.shockCd>0)return;if(run.energy<ABILITY.blast.fuel){sfx.deny();return;}
  run.energy-=ABILITY.blast.fuel;run.shockCd=ABILITY.blast.cd;const cr=clamp(ringOf(drill.rad),0,RINGS-1),R=2;
  for(let dr=-R;dr<=R;dr++){const rg=cr+dr;if(rg<0||rg>=RINGS)continue;const n=secCount(rg),sc=sectorOf(drill.ang,rg);
    for(let ds=-R;ds<=R;ds++)if(dr*dr+ds*ds<=R*R+1)mineTile(rg,((sc+ds)%n+n)%n,9999);}
  shake=Math.max(shake,16);flash=Math.max(flash,0.55);hitstop=0.05;glitch=0.3;
  sfx.shock();haptic('heavy');burst(W/2,DRILL_SY,T.blob,26,1.6);}
function boost(){if(!run.active||!S.abilities.boost||run.boostCd>0||run.boostT>0)return;if(run.energy<ABILITY.boost.fuel){sfx.deny();return;}
  run.energy-=ABILITY.boost.fuel;run.boostT=4;run.boostCd=ABILITY.boost.cd;flash=Math.max(flash,0.3);shake=Math.max(shake,6);
  sfx.rare();haptic('medium');burst(W/2,DRILL_SY,T.accent,18,1.3);}
function laser(){if(!run.active||!S.abilities.laser||run.laserCd>0)return;if(run.energy<ABILITY.laser.fuel){sfx.deny();return;}
  run.energy-=ABILITY.laser.fuel;run.laserCd=ABILITY.laser.cd;const cr=clamp(ringOf(drill.rad),0,RINGS-1);
  for(let r=cr;r>=Math.max(0,cr-7);r--)mineTile(r,sectorOf(drill.ang,r),9999); // burns a shaft toward the core
  shake=Math.max(shake,14);flash=Math.max(flash,0.5);glitch=0.3;sfx.shock();vibe([15,30,15]);
  laserFx=0.18;}
function magpulse(){if(!run.active||!S.abilities.magpulse||run.magCd>0)return;if(run.energy<ABILITY.magpulse.fuel){sfx.deny();return;}
  run.energy-=ABILITY.magpulse.fuel;run.magCd=ABILITY.magpulse.cd;for(const dp of drops)dp.got=true;    // yank all loot to the drill
  shake=Math.max(shake,6);sfx.rare();vibe([10,20]);burst(W/2,DRILL_SY,'#12d9b0',20,1.4);}
function teleport(){if(!run.active||!S.abilities.teleport||run.tpCd>0)return;if(run.energy<ABILITY.teleport.fuel){sfx.deny();return;}
  run.energy-=ABILITY.teleport.fuel;run.tpCd=ABILITY.teleport.cd;drill.rad=R_SURF+320;snapCamera();       // warp back to orbit (escape heat/danger)
  flash=Math.max(flash,0.6);shake=Math.max(shake,10);glitch=0.4;sfx.shock();vibe([20,30,20]);}
function freeze(){if(!run.active||!S.abilities.freeze||run.freezeCd>0)return;if(run.energy<ABILITY.freeze.fuel){sfx.deny();return;}
  run.energy-=ABILITY.freeze.fuel;run.freezeCd=ABILITY.freeze.cd;run.freezeT=5;run.heat=0;          // flush heat + suppress it for a few seconds
  flash=Math.max(flash,0.5);glitch=0.2;sfx.rare();vibe([12,24,12]);
  for(let i=0;i<24;i++)burst(W/2+(rnd()-0.5)*60,DRILL_SY+(rnd()-0.5)*60,'#8be9ff',1,1.4);}
function nuke(){if(!run.active||!S.abilities.nuke||run.nukeCd>0)return;if(run.energy<ABILITY.nuke.fuel){sfx.deny();return;}
  run.energy-=ABILITY.nuke.fuel;run.nukeCd=ABILITY.nuke.cd;const cr=clamp(ringOf(drill.rad),0,RINGS-1),R=4;
  for(let dr=-R;dr<=R;dr++){const rg=cr+dr;if(rg<0||rg>=RINGS)continue;const n=secCount(rg),sc=sectorOf(drill.ang,rg);
    for(let ds=-R;ds<=R;ds++)if(dr*dr+ds*ds<=R*R+2)mineTile(rg,((sc+ds)%n+n)%n,9999);}
  run.haul+=120*lootMul();                                          // detonation bonus
  shake=Math.max(shake,26);flash=Math.max(flash,1);hitstop=0.08;glitch=0.6;
  sfx.shock();sfx.leg();vibe([30,50,30,80,120]);burst(W/2,DRILL_SY,P.core,40,2.2);}
// loot multiplier folds in planet, prestige and the live mining combo
// Overdrive band: hot drill = faster bite and richer ore, up to the red line.
const OVR_FROM=70,OVR_SPD=0.38,OVR_LOOT=0.75;
function lootMul(){return S.valueMul*P.valueMul*S.prestigeMult*expLoot()*(1+(S.ovrLoot||OVR_LOOT)*(run.ovr||0))*(S.combo?(1+Math.min(run.combo,30)*0.015):1)*(run.event&&run.event.type==='vein'?1.6:1)*cmul('loot');}

/* ===================== RUN ===================== */
/* ===================== EXPEDITION (roguelike run mode) =====================
 * A normal run is one dive: go down, come back, spend. Good, but it ends in
 * under a minute and every dive is the same dive. An Expedition is a *seed*:
 * you descend through Sectors, and every SECTOR_M metres you break into a Safe
 * Zone — a carved-out cavern with a station that refuels you, cools you, and
 * puts a trader in front of you.
 *
 * The trader sells RELICS: run-only upgrades that never appear in the skill
 * tree, paid for out of the very haul you are trying to bring home. That is the
 * whole decision the mode is built around — every relic you buy is cash you do
 * NOT bank, so you are always choosing between going home rich and going deeper
 * dangerous. Relics stack into builds; the pool is drawn from so no two
 * expeditions play the same.
 *
 * Reaching the core finishes a Tier. Then you may take the Deep Layer: the world
 * regenerates harder AND richer, you keep every relic, and it never stops. That
 * is the endless mode. */
const SECTOR_M=12;                 // metres between Safe Zones
/* The first station sits deeper than the rest. Measured, 12 m of topsoil pays
   about $30 — you would arrive at the trader unable to afford anything, which
   teaches the wrong lesson in the one sector that has to teach the mode. At
   18 m you arrive with roughly $110 and can buy exactly one cheap relic. */
const SECTOR_FIRST=18;
const RELIC_PICKS=3;               // offers per station
/* Relic capacity. Measured without it, a greedy expedition owned ALL 20 relics
 * by layer 3 sector 3 — 64 seconds in — and the haul went $2,799 -> $9,288 ->
 * $24,962 in three sectors, because every multiplier in the game was stacked at
 * once. Worse than the numbers: with nothing left to want, the trader stopped
 * being a decision at all.
 * Six slots means you can never hold more than a third of the pool, every run
 * is a different build, and once you are full each purchase costs you something
 * you already rely on. That is the whole mode in one constraint. */
const RELIC_SLOTS=6;
const RELICS=[
 {id:'r_bit',   ic:'⛏️', c:200, de:['Diamantspitze','+45 % Bohrkraft'],            en:['Diamond Bit','+45% drill power'],        mod:S=>S.power*=1.45},
 {id:'r_servo', ic:'💨', c:180, de:['Servo-Antrieb','+30 % Tempo'],                en:['Servo Drive','+30% speed'],              mod:S=>S.speed*=1.3},
 {id:'r_tank',  ic:'🛢️', c:170, de:['Zusatztank','+45 % Sprit'],                   en:['Aux Tank','+45% fuel'],                  mod:S=>S.energyMax*=1.45},
 {id:'r_vent',  ic:'❄️', c:190, de:['Zyklon-Vent','Doppelte Kühlleistung'],        en:['Cyclone Vent','Double cooling'],         mod:S=>S.coolRate=S.coolRate*2+14},
 {id:'r_crit',  ic:'🎯', c:240, de:['Schlagbolzen','+100 % Krit-Chance'],          en:['Striker Pin','+100% crit chance'],       mod:S=>S.crit+=1},
 {id:'r_mag',   ic:'🧲', c:150, de:['Feldspule','+150 Magnet'],                    en:['Field Coil','+150 magnet'],              mod:S=>S.magnet+=150},
 {id:'r_wide',  ic:'↔️', c:260, de:['Breitschneider','Bohrt die Nachbarfelder mit'],en:['Wide Cutter','Also cuts side tiles'],    mod:S=>S.wide=1},
 {id:'r_chain', ic:'💢', c:300, de:['Kettenzünder','+1 Kettenreaktion'],           en:['Chain Primer','+1 chain reaction'],      mod:S=>S.chain+=1},
 {id:'r_greed', ic:'💎', c:280, de:['Gierstein','+60 % Erzwert'],                  en:['Greed Stone','+60% ore value'],          mod:S=>S.valueMul+=0.6},
 {id:'r_luck',  ic:'🍀', c:220, de:['Wünschelrute','+15 % Fundchance'],            en:['Divining Rod','+15% find chance'],       mod:S=>S.luck+=0.15},
 {id:'r_drone', ic:'🛸', c:250, de:['Begleitdrohne','+1 Drohne, die mitbohrt'],    en:['Escort Drone','+1 mining drone'],        mod:S=>{S.drones++;S.dronemine=1;}},
 {id:'r_recyc', ic:'🔋', c:210, de:['Recycler','+14 Sprit/Sek. beim Lüften'],      en:['Recycler','+14 fuel/s while venting'],   mod:S=>S.energyRegen+=14},
 {id:'r_ore',   ic:'⚗️', c:230, de:['Brennkammer','Erz tankt dich auf'],           en:['Burn Chamber','Ore refuels you'],        mod:S=>S.fuelOre=(S.fuelOre||0)+1},
 {id:'r_shield',ic:'🛡️', c:200, de:['Hitzeschild','−7 Schaden durch Hitzequellen'],en:['Heat Shield','-7 damage from heat'],     mod:S=>S.heatShield+=7},
 // --- risk/reward: these cost you something real ---
 {id:'r_reck',  ic:'🔥', c:170, de:['Waghalsig','+80 % Erzwert, +40 % Hitze'],     en:['Reckless','+80% ore value, +40% heat'],  mod:S=>{S.valueMul+=0.8;S.heatGen*=1.4;}},
 {id:'r_glass', ic:'🩸', c:190, de:['Glaskanone','+90 % Bohrkraft, −30 % Sprit'],  en:['Glass Cannon','+90% power, -30% fuel'],  mod:S=>{S.power*=1.9;S.energyMax*=0.7;}},
 {id:'r_furn',  ic:'♨️', c:240, de:['Schmelzofen','Overdrive beginnt bei 45 %'],   en:['Furnace','Overdrive starts at 45%'],     mod:S=>S.ovrFrom=45},
 {id:'r_temper',ic:'🧊', c:200, de:['Vergütet','−35 % Hitze, −15 % Bohrkraft'],    en:['Tempered','-35% heat, -15% power'],      mod:S=>{S.heatGen*=0.65;S.power*=0.85;}},
 {id:'r_prosp', ic:'🔍', c:260, de:['Prospektor','Relikte & Kerne doppelt wert'],  en:['Prospector','Relics & cores worth 2x'],  mod:S=>S.rareMul=(S.rareMul||1)*2},
 {id:'r_dust',  ic:'🪨', c:160, de:['Schürfrecht','Dreifacher Schrottstaub'],      en:['Claim Rights','Triple scrap dust'],      mod:S=>S.dustMul=(S.dustMul||1)*3},
];
/* A station used to be an invisible depth trigger: you were drilling ordinary
 * rock and a menu appeared. Now the station depths are real geography — those
 * rings are carved open and lit, so you SEE the green band coming through the
 * stone and can decide whether you have the fuel to reach it. */
function isStationDepth(depthM){
  if(!run.exp||depthM<SECTOR_FIRST)return false;
  return (depthM-SECTOR_FIRST)%SECTOR_M===0;}
function isStationRing(ring){return isStationDepth(RINGS-1-ring);}
/* ---------- SYNERGIES ----------
 * Six relics used to simply add up, so the cargo decision was always "which is
 * the biggest number". A pair that does something neither half can do turns it
 * into "what fits together", and that is the difference between a shopping list
 * and a build. The station marks an offer that would complete a pair, so the
 * combination is something you can plan toward rather than stumble into. */
const SYNERGIES=[
 {id:'s_pyre', need:['r_furn','r_reck'],  ic:'🔥',
  de:['Brandopfer','Overdrive zahlt doppelt so viel Bonus'],
  en:['Pyre','Overdrive pays double its loot bonus'],           mod:S=>S.ovrLoot=(S.ovrLoot||OVR_LOOT)*2},
 {id:'s_after',need:['r_glass','r_recyc'],ic:'💨',
  de:['Nachbrenner','Der Recycler läuft auch beim Bohren (halb)'],
  en:['Afterburner','The recycler runs while drilling too (half)'], mod:S=>S.regenWhileCut=0.5},
 {id:'s_quarry',need:['r_bit','r_wide'],  ic:'⛏️',
  de:['Steinbruch','Die Seitenschnitte treffen mit voller Kraft'],
  en:['Quarry','Side cuts land at full power'],                 mod:S=>S.wideFull=1},
 {id:'s_cold', need:['r_vent','r_temper'],ic:'🧊',
  de:['Kaltlauf','Halbe Hitzeentwicklung'],
  en:['Cold Run','Half the heat build-up'],                     mod:S=>S.heatGen*=0.5},
 {id:'s_shatter',need:['r_crit','r_chain'],ic:'💢',
  de:['Splitterschlag','Krits lösen zusätzlich eine Kette aus'],
  en:['Shatterstrike','Crits also set off a chain'],            mod:S=>S.critChain=1},
 {id:'s_cycle',need:['r_mag','r_ore'],    ic:'♻️',
  de:['Sammler-Kreislauf','Erz tankt doppelt so stark auf'],
  en:['Collector Loop','Ore refuels twice as much'],            mod:S=>S.fuelOre=(S.fuelOre||0)*2},
 {id:'s_hoard',need:['r_greed','r_prosp'],ic:'💎',
  de:['Schatzjäger','Seltenes Erz nochmal +60 % wert'],
  en:['Treasure Hunter','Rare ore worth another +60%'],         mod:S=>S.rareMul=(S.rareMul||1)*1.6},
 {id:'s_colony',need:['r_drone','r_dust'],ic:'🛸',
  de:['Bergbaukolonie','Drohnen bohren doppelt so oft'],
  en:['Mining Colony','Drones mine twice as often'],            mod:S=>S.droneFast=1},
];
function activeSyn(){if(!run.exp)return [];
  const own=run.exp.relics;
  return SYNERGIES.filter(y=>y.need.every(n=>own.indexOf(n)>=0));}
// Would taking this relic complete a pair? Used to mark offers in the station.
function synFor(id){if(!run.exp)return null;
  const own=run.exp.relics;
  return SYNERGIES.find(y=>y.need.indexOf(id)>=0&&y.need.every(n=>n===id||own.indexOf(n)>=0))||null;}
function synName(y){return (settings.lang==='en'?y.en:y.de)[0];}
function synDesc(y){return (settings.lang==='en'?y.en:y.de)[1];}
function relicById(id){return RELICS.find(r=>r.id===id);}
function relicName(r){return (settings.lang==='en'?r.en:r.de)[0];}
function relicDesc(r){return (settings.lang==='en'?r.en:r.de)[1];}
/* Price climbs with how deep the station is and which layer you are on, so the
   trader never becomes pocket change once your haul starts compounding. */
/* Haul compounds fast down a shaft (measured per sector: $30, $161, $639,
   $521 — roughly tripling early), so a linear price would be crushing at the
   first station and pocket change by the fourth. The exponent tracks that
   curve, keeping the answer to "one strong relic or two cheap ones?" alive
   at every depth instead of only at the start. */
function relicPrice(r,zone,tier){
  return Math.round(r.c*0.18*Math.pow(1+zone,1.35)*(1+(tier-1)*0.9));}
/* Offers are drawn without replacement from what you do not already own, so a
   station never wastes a slot on a relic you are already carrying. */
function rollOffers(){const own=run.exp.relics,pool=RELICS.filter(r=>own.indexOf(r.id)<0);
  const picks=relicPicks();
  const out=[];for(let i=0;i<picks&&pool.length;i++)out.push(pool.splice(Math.floor(rnd()*pool.length),1)[0].id);
  return out;}
/* Relic effects are applied on top of the freshly computed stats, never baked
   into the save — an expedition's build exists only for as long as the run does. */
function applyRelics(){if(!run.exp)return;
  for(const id of run.exp.relics){const r=relicById(id);if(r&&r.mod)try{r.mod(S);}catch(e){}}
  // synergies land on top of the relics they need, so their maths sees the boosted stats
  for(const y of activeSyn()){if(y.mod)try{y.mod(S);}catch(e){}}}
function restat(){S=stats();applyRelics();
  /* Track what the player has actually assembled. Done here rather than in
     buyRelic because a SWAP can complete a pair just as well as a purchase, and
     it can also break one — the achievements should only ever count what really
     came together. */
  if(run.exp){const sy=activeSyn();
    if(sy.length){
      meta.stats.synBuilt=(meta.stats.synBuilt||0)+0;      // touched below only on new pairs
      meta.stats.synMax=Math.max(meta.stats.synMax||0,sy.length);
      meta.stats.synSeen=meta.stats.synSeen||{};
      let fresh=false;
      for(const y of sy)if(!meta.stats.synSeen[y.id]){meta.stats.synSeen[y.id]=1;fresh=true;}
      if(fresh){meta.stats.synBuilt=(meta.stats.synBuilt||0)+1;
        achQueue.push({ic:sy[sy.length-1].ic,de:['Synergie',synName(sy[sy.length-1])],
                       en:['Synergy',synName(sy[sy.length-1])]});if(!achTimer)nextAch();
        sfx.rare();haptic('epic');}
      saveMeta();checkAchievements();}}}
// Deep Layers: each tier past the first makes the rock harder and the ore richer.
/* Threat has to grow FASTER than reward, otherwise every extra layer is a pay
   rise: at 0.55 hardness against 0.85 value, layer 20 was 1.5x more lucrative
   per unit of rock than layer 1. Now hardness leads and value follows, so
   going deeper is a gamble you take, not free money. */
function expHard(){return run.exp?1+(run.exp.tier-1)*0.85:1;}
function expLoot(){return run.exp?1+(run.exp.tier-1)*0.62:1;}
// Everything that hits you scales with the layer as well — see below.
function expThreat(){return run.exp?1+(run.exp.tier-1)*0.40:1;}
function startRun(){S=stats();
  run.challenge=!!pendingChal;
  if(pendingChal){setPlanet(chalPlanet);rnd=chalRng();}   // fixed daily seed + planet
  else{setPlanet(meta.planet);rnd=rngSeed(Date.now()>>>0);chalMod=null;}
  pendingChal=false;
  run.active=true;run.depthMax=0;run.haul=0;run.energy=S.energyMax*cmul('fuel');run.heat=0;run.shockCd=0;run.boostT=0;run.boostCd=0;run.laserCd=0;run.magCd=0;run.tpCd=0;run.freezeT=0;run.freezeCd=0;run.nukeCd=0;run.combo=0;run.comboT=0;run.maxCombo=0;run.relicsRun=0;run.guardsRun=0;run.frostT=0;run.event=null;run.eventCd=16;run.matsRun={};run.ovr=0;run.ventT=0;run.ovrOn=false;run.critT=0;run.critMul=1;run.critFx=0;
  run.warnHeat=false;run.warnFuel=false;run.buzzT=0;run.bossPulseT=0;run.bossWave=0;run.bossKills=0;run.inBoss=false;run.bossTel=false;
  // an expedition carries its own progress: sectors cleared, relics bought, tier reached
  run.exp=pendingExp?{tier:1,zone:0,nextZone:SECTOR_FIRST,relics:[],spent:0,offers:null,tierDone:false}:null;run.paused=false;
  pendingExp=false;applyRelics();
  run.energy=S.energyMax*cmul('fuel');   // recompute: relics can change the tank
  updateAbilityButtons();
  drill.rad=R_SURF+300;drill.ang=0;drill.face=Math.PI/2;snapCamera();
  drops.length=0;parts.length=0;dmgnums.length=0;enemies.length=0;regrow.length=0;bossBeam=0;shake=flash=hitstop=0;
  hide('titleOver');hide('shopOver');hide('gameoverOver');showHint();
  document.body.classList.add('playing');   // reveal the in-run HUD/ability bar
  if(audio()&&AC.state==='suspended')AC.resume();startMusic();}
/* ---------- Safe Zone ---------- */
function enterZone(){const e=run.exp;e.zone++;e.nextZone=run.depthMax+SECTOR_M;run.paused=true;
  // the station itself is the reward for getting here: full tank, cold drill
  run.energy=S.energyMax;run.heat=0;run.ventT=0;
  e.offers=rollOffers();
  flash=Math.max(flash,0.5);sfx.extract();haptic('success');
  document.body.classList.remove('playing');
  renderZone();show('zoneOver');}
function renderZone(){const e=run.exp,de=settings.lang!=='en';
  document.getElementById('zoneTitle').textContent=(de?'Sektor ':'Sector ')+e.zone;
  document.getElementById('zoneDepth').textContent=run.depthMax;
  document.getElementById('zoneScrip').textContent='$'+Math.round(run.haul);
  document.getElementById('zoneTier').textContent=e.tier;
  const box=document.getElementById('zoneOffers');box.innerHTML='';
  // --- swap mode: pick what to give up ---
  if(e.swap){const inc=relicById(e.swap),price=relicPrice(inc,e.zone,e.tier);
    const head=document.createElement('div');
    head.style.cssText='font-size:11px;letter-spacing:.06em;color:#ffd23f;text-transform:uppercase;font-weight:900;text-align:center;margin-bottom:2px;';
    head.textContent=(de?'Platz voll — was geht dafür? ':'Full — what goes for ')+inc.ic+' '+relicName(inc)+(de?'':'?');
    box.appendChild(head);
    e.relics.forEach(oid=>{const o=relicById(oid);if(!o)return;
      const bt=document.createElement('button');
      bt.className='mbtn';bt.style.cssText='justify-content:space-between;text-align:left;padding:11px 13px;border-color:#ff6a3d;color:#ff6a3d;box-shadow:4px 4px 0 rgba(255,106,61,.22);';
      bt.innerHTML='<span style="display:flex;flex-direction:column;gap:3px;">'+
        '<span style="font-size:12px;">'+o.ic+' '+relicName(o)+'</span>'+
        '<span style="font-size:10px;letter-spacing:.04em;color:#9a90ad;text-transform:none;">'+relicDesc(o)+'</span></span>'+
        '<span style="font-size:12px;">'+(de?'ablegen':'drop')+'</span>';
      bt.onclick=()=>swapRelic(oid);
      box.appendChild(bt);});
    const cancel=document.createElement('button');
    cancel.className='mbtn';cancel.style.cssText='justify-content:center;padding:10px;';
    cancel.textContent=de?'Abbrechen':'Cancel';
    cancel.onclick=()=>{e.swap=null;sfx.back();renderZone();};
    box.appendChild(cancel);
    document.getElementById('zoneOwned').textContent=
      (de?'Kosten: $':'Cost: $')+price;
    return;}
  (e.offers||[]).forEach(id=>{
    const r=relicById(id);if(!r)return;
    const price=relicPrice(r,e.zone,e.tier),owned=e.relics.indexOf(id)>=0,afford=run.haul>=price;
    const full=e.relics.length>=relicSlots();
    const syn=owned?null:synFor(id);   // would taking this complete a pair?
    const b=document.createElement('button');
    b.className='mbtn';b.style.cssText='justify-content:space-between;text-align:left;padding:11px 13px;'+
      (owned?'opacity:.4;'
            :afford?(syn?'border-color:#ff4de0;color:#ff4de0;box-shadow:4px 4px 0 rgba(255,77,224,.28);'
                        :'border-color:#39ff14;color:#39ff14;box-shadow:4px 4px 0 rgba(57,255,20,.22);')
                   :'opacity:.55;');
    b.innerHTML='<span style="display:flex;flex-direction:column;gap:3px;">'+
      '<span style="font-size:12px;">'+r.ic+' '+relicName(r)+'</span>'+
      '<span style="font-size:10px;letter-spacing:.04em;color:#9a90ad;text-transform:none;">'+relicDesc(r)+'</span>'+
      (syn?'<span style="font-size:10px;letter-spacing:.04em;color:#ff4de0;text-transform:none;">'+
           syn.ic+' '+(de?'ergibt ':'completes ')+synName(syn)+': '+synDesc(syn)+'</span>':'')+'</span>'+
      '<span style="font-size:13px;color:'+(owned?'#9a90ad':afford?(full?'#ffd23f':'#39ff14'):'#ff6a3d')+';">'+
        (owned?'✓':'$'+price+(afford&&full?'<br><span style="font-size:9px;">'+(de?'tauschen':'swap')+'</span>':''))+'</span>';
    b.disabled=owned;
    b.onclick=()=>buyRelic(id);
    box.appendChild(b);});
  const own=document.getElementById('zoneOwned');
  const cap=(de?'Frachtraum ':'Cargo ')+e.relics.length+'/'+relicSlots();
  const syns=activeSyn();
  own.innerHTML='<span style="color:'+(e.relics.length>=relicSlots()?'#ffd23f':'#12d9b0')+';font-weight:900;">'+cap+'</span>'+
    (e.relics.length?' — '+e.relics.map(i=>{const r=relicById(i);return r?r.ic+' '+relicName(r):'';}).join(' · ')
                    :' — '+(de?'noch leer':'still empty'))+
    (syns.length?'<br><span style="color:#ff4de0;font-weight:900;">'+
       syns.map(y=>y.ic+' '+synName(y)).join(' · ')+'</span>':'');}
function buyRelic(id){const e=run.exp,r=relicById(id);if(!r||e.relics.indexOf(id)>=0)return;
  const price=relicPrice(r,e.zone,e.tier);
  if(run.haul<price){sfx.deny();haptic('warning');return;}
  /* At capacity a purchase becomes a trade. Rather than silently refusing (which
     reads as a bug) or auto-dropping something (which throws away a build the
     player chose), the panel switches into swap mode and asks what goes. */
  if(e.relics.length>=relicSlots()){e.swap=id;sfx.ui();haptic('medium');renderZone();return;}
  run.haul-=price;e.spent+=price;e.relics.push(id);
  restat();
  run.energy=Math.min(run.energy,S.energyMax);   // a tank-shrinking relic must not leave you over-full
  sfx.buy();haptic('success');
  meta.stats.relicsBought=(meta.stats.relicsBought||0)+1;checkAchievements();
  renderZone();}
function swapRelic(dropId){const e=run.exp,id=e.swap;if(!id)return;
  const r=relicById(id),price=relicPrice(r,e.zone,e.tier);
  const i=e.relics.indexOf(dropId);
  if(i<0||run.haul<price){e.swap=null;sfx.deny();renderZone();return;}
  run.haul-=price;e.spent+=price;
  e.relics.splice(i,1);e.relics.push(id);e.swap=null;
  restat();
  run.energy=Math.min(run.energy,S.energyMax);
  sfx.buy();haptic('success');
  meta.stats.relicsBought=(meta.stats.relicsBought||0)+1;checkAchievements();
  renderZone();}
function leaveZone(){hide('zoneOver');run.paused=false;document.body.classList.add('playing');sfx.ui();}
/* ---------- Deep Layer (endless) ---------- */
function openDeep(){run.paused=true;document.body.classList.remove('playing');
  const de=settings.lang!=='en',e=run.exp;
  document.getElementById('deepTitle').textContent=(de?'Schicht ':'Layer ')+e.tier+(de?' geschafft':' cleared');
  document.getElementById('deepHard').textContent='+'+Math.round(((1+e.tier*0.85)/expHard()-1)*100)+'%';
  document.getElementById('deepVal').textContent='+'+Math.round(((1+e.tier*0.62)/expLoot()-1)*100)+'%';
  document.getElementById('deepThreat').textContent='+'+Math.round(((1+e.tier*0.40)/expThreat()-1)*100)+'%';
  flash=Math.max(flash,0.8);sfx.leg();haptic('epic');
  show('deepOver');}
function goDeeper(){const e=run.exp;e.tier++;e.tierDone=false;e.zone=0;e.nextZone=SECTOR_FIRST;
  world.clear();regrow.length=0;                   // a fresh, harder, richer layer
  drill.rad=R_SURF+120;drill.ang=0;drill.face=Math.PI/2;snapCamera();
  run.depthMax=0;run.energy=S.energyMax;run.heat=0;run.ventT=0;
  drops.length=0;enemies.length=0;
  hide('deepOver');run.paused=false;document.body.classList.add('playing');
  sfx.ovr();haptic('epic');flash=Math.max(flash,0.7);}
/* Losing a run used to cost 100 % of the haul. Measured, that meant a greedy
 * player died 23 seconds in holding $175 and walked away with nothing — the
 * fastest way to make someone delete a paid game. The salvage drone keeps
 * SALVAGE of the haul (and the matching share of refinery ore), so a bad run
 * still moves you forward while extracting yourself stays clearly better. */
const SALVAGE=0.4;
function gameOver(reason){if(!run.active)return;
  /* Second Wind: on an expedition, the first death is survivable. It fires
     BEFORE anything is written, so the run genuinely continues — a revive that
     banks your haul first would just be a slower game over. Once per
     expedition, and the HUD stops advertising it afterwards. */
  if(run.exp&&perkLvl('a_wind')&&!run.exp.windUsed){
    run.exp.windUsed=true;
    run.heat=0;run.ventT=0;run.energy=Math.max(run.energy,S.energyMax*0.5);
    enemies.length=0;
    flash=Math.max(flash,1);shake=Math.max(shake,24);glitch=0.6;
    sfx.leg();haptic('epic');
    lootNum(W/2,DRILL_SY-40,settings.lang==='en'?'SECOND WIND':'ZWEITER WIND','#8be9ff',2);
    return;}
  run.active=false;run.paused=false;engineSet(0,0);document.body.classList.remove('playing');/* music continues as menu ambience */
  const saved=Math.round(run.haul*salvageRate()),lost=Math.round(run.haul)-saved;
  meta.credits+=saved;meta.lifetime=(meta.lifetime||0)+saved;meta.stats.totalEarned+=saved;
  /* Expedition progress is credited on death too. It used to be written only in
     extract(), so a player who fought down to layer 6 and died there got no
     credit for any of it — and "Erreiche Schicht 5" could literally never fire
     for the players most likely to earn it. Dying deep is the normal end of an
     endless mode; it has to count. */
  if(run.exp){meta.stats.expBest=Math.max(meta.stats.expBest||0,run.exp.tier);
    meta.stats.expSectors=(meta.stats.expSectors||0)+run.exp.zone;}
  for(const k in run.matsRun){const keep=Math.floor(run.matsRun[k]*SALVAGE);if(keep>0)meta.mats[k]=(meta.mats[k]||0)+keep;}
  meta.stats.runs++;if(run.depthMax>meta.stats.bestDepth)meta.stats.bestDepth=run.depthMax;if(run.depthMax>(meta.records[meta.planet]||0))meta.records[meta.planet]=run.depthMax;saveMeta();checkAchievements();
  updateDaily('depth',run.depthMax);updateDaily('runs',1);updateDaily('loot',saved);
  updateContracts('runDepth',run.depthMax);updateContracts('relics',run.relicsRun);updateContracts('guardians',run.guardsRun);updateContracts('bestCombo',run.maxCombo);
  if(run.challenge)recordScore();
  shake=Math.max(shake,20);flash=Math.max(flash,0.85);glitch=0.6;sfx.leg();haptic('error');
  document.getElementById('goReason').textContent=reason;
  document.getElementById('goDepth').textContent=run.depthMax;
  document.getElementById('goSaved').textContent=saved;
  document.getElementById('goLost').textContent=lost;
  setTimeout(()=>show('gameoverOver'),480);}
function extract(){if(!run.active)return;run.active=false;run.paused=false;engineSet(0,0);document.body.classList.remove('playing');/* music continues as menu ambience */const g=Math.round(run.haul);
  meta.credits+=g;meta.lifetime=(meta.lifetime||0)+g;
  for(const k in run.matsRun)meta.mats[k]=(meta.mats[k]||0)+run.matsRun[k];   // bank refinery ore on success
  meta.stats.runs++;meta.stats.totalEarned+=g;if(run.depthMax>meta.stats.bestDepth)meta.stats.bestDepth=run.depthMax;if(run.depthMax>(meta.records[meta.planet]||0))meta.records[meta.planet]=run.depthMax;saveMeta();checkAchievements();
  updateDaily('depth',run.depthMax);updateDaily('loot',g);updateDaily('runs',1);
  updateContracts('runDepth',run.depthMax);updateContracts('runLoot',g);updateContracts('relics',run.relicsRun);updateContracts('guardians',run.guardsRun);updateContracts('bestCombo',run.maxCombo);
  if(run.challenge)recordScore();
  document.getElementById('rDepth').textContent=run.depthMax;
  document.getElementById('rHaul').textContent=Math.round(run.haul);
  document.getElementById('rCredits').textContent=meta.credits;
  /* An expedition's real story is not its depth — it is how many layers you
     survived and what you spent to get there. Show that, or the mode looks
     exactly like a normal run on the results screen. */
  const rx=document.getElementById('rExp'),de=settings.lang!=='en';
  if(run.exp){const e=run.exp;
    rx.style.display='block';
    rx.innerHTML='🧭 '+(de?'Schicht ':'Layer ')+e.tier+' · '+e.zone+(de?' Sektoren':' sectors')+
      (e.relics.length?' · '+e.relics.map(i=>{const r=relicById(i);return r?r.ic:'';}).join(''):'')+
      (e.spent?'<br><span style="color:#9a90ad">'+(de?'beim Händler gelassen: $':'spent at the trader: $')+e.spent+'</span>':'');
    meta.stats.expBest=Math.max(meta.stats.expBest||0,e.tier);
    meta.stats.expSectors=(meta.stats.expSectors||0)+e.zone;
  }else rx.style.display='none';
  show('shopOver');sfx.extract();haptic('epic');}

/* ability buttons appear only once the matching skill is unlocked */
function updateAbilityButtons(){const a=stats().abilities;
  document.getElementById('btnShock').style.display=a.blast?'flex':'none';
  document.getElementById('btnBoost').style.display=a.boost?'flex':'none';
  document.getElementById('btnLaser').style.display=a.laser?'flex':'none';
  document.getElementById('btnMag').style.display=a.magpulse?'flex':'none';
  document.getElementById('btnTp').style.display=a.teleport?'flex':'none';
  document.getElementById('btnFreeze').style.display=a.freeze?'flex':'none';
  document.getElementById('btnNuke').style.display=a.nuke?'flex':'none';}

/* ---------- SKILL TREE (graphical, pannable, hidden until reachable) ---------- */
/* ---------- radial layout ----------
 * The tree grows outward from the root as concentric rings instead of downward
 * rows, so it expands in every direction and never runs off the side.
 * Positions are computed from the prerequisite graph (the hand-placed grid
 * coordinates are ignored), which makes overlap impossible by construction:
 * each ring's radius is derived from how many nodes have to fit on it.
 */
const NODE_W=76, NODE_GAP=34, RING_MIN=132;   // node box + breathing room
let TREEPOS=null;                              // id -> {x,y} in px, centre = 0,0
function layoutTree(){
  if(TREEPOS)return TREEPOS;
  // depth = longest path from a root, so a node always sits outside every prereq
  const dep={};for(const s of SKILLS)dep[s.id]=s.req.length?-1:0;
  for(let pass=0;pass<SKILLS.length;pass++){let moved=false;
    for(const s of SKILLS){if(!s.req.length)continue;
      let d=-1,ready=true;
      for(const r of s.req){if(dep[r]==null||dep[r]<0){ready=false;break;}d=Math.max(d,dep[r]);}
      if(ready&&dep[s.id]!==d+1){dep[s.id]=d+1;moved=true;}}
    if(!moved)break;}
  for(const s of SKILLS)if(dep[s.id]<0)dep[s.id]=1;   // safety for odd graphs

  // angular slices: each node inherits a slice of its first prerequisite's
  // slice, sized by how much of the subtree hangs off it — keeps branches together
  const kids={};for(const s of SKILLS)kids[s.id]=[];
  const roots=[];
  for(const s of SKILLS){const p=s.req[0];if(p&&kids[p])kids[p].push(s.id);else roots.push(s.id);}
  const weight={};
  const weigh=(id)=>{const c=kids[id];if(!c.length)return weight[id]=1;
    let w=0;for(const k of c)w+=weigh(k);return weight[id]=w;};
  roots.forEach(weigh);
  const ang={};
  const slice=(id,a0,a1)=>{ang[id]=(a0+a1)/2;const c=kids[id];if(!c.length)return;
    let a=a0;for(const k of c){const span=(a1-a0)*(weight[k]/weight[id]);slice(k,a,a+span);a+=span;}};
  const rootTotal=roots.reduce((t,r)=>t+weight[r],0);
  let a0=-Math.PI/2;   // start the first branch pointing up
  for(const r of roots){const span=TAU*(weight[r]/rootTotal);slice(r,a0,a0+span);a0+=span;}

  // ring radius: big enough that every node on that ring fits side by side
  const perRing={};for(const s of SKILLS)(perRing[dep[s.id]]=perRing[dep[s.id]]||[]).push(s.id);
  const radius={};let prev=0;
  for(const d of Object.keys(perRing).map(Number).sort((x,y)=>x-y)){
    if(d===0){radius[0]=0;prev=0;continue;}
    const need=(perRing[d].length*(NODE_W+NODE_GAP))/TAU;   // circumference -> radius
    radius[d]=Math.max(prev+RING_MIN,d*RING_MIN,need);prev=radius[d];}

  TREEPOS={};
  for(const s of SKILLS){const r=radius[dep[s.id]],t=ang[s.id]||0;
    TREEPOS[s.id]={x:Math.cos(t)*r,y:Math.sin(t)*r,depth:dep[s.id]};}
  return TREEPOS;
}
/* Progression curve.
 * The authored cost of each skill is its *base*; how deep it sits in the tree
 * decides what it really costs. Early nodes stay cheap so the first runs feel
 * rewarding, while the outer rings become a long-term goal instead of something
 * finished in a handful of runs. */
const COST_CURVE=[1,1,1.8,2.8,4.2,6,8.5,12,16];
(function scaleSkillCosts(){const L=layoutTree();
  for(const s of SKILLS){const m=COST_CURVE[Math.min(L[s.id].depth,COST_CURVE.length-1)];
    s.cost=Math.round(s.cost*m/10)*10;}})();

/* ---------- skill info on long-press ---------- */
// Effect text is derived from the skill data itself, so it can never drift
// out of sync with what the skill actually does.
function skillEffLines(s){const de=settings.lang!=='en',e=s.eff||{},L=[];
  const add=(v,dl,el)=>{if(v)L.push((v>0?'+':'')+v+' '+(de?dl:el));};
  add(e.dp,'Bohrkraft','drill power');
  add(e.ds,'Speed','speed');
  add(e.de,'Sprit-Tank','fuel tank');
  add(e.dr,'Sprit/Sek.','fuel/sec');
  /* Signs have to be right in both directions. These two lines only ever handled
     the upside, so the moment a skill carried a real downside they printed
     "−-2 Hitzeaufbau" and "+-15% Loot-Wert" — which makes a deliberate trade-off
     look like a broken string. */
  if(e.dh)L.push((e.dh>0?'−':'+')+Math.abs(e.dh)+' '+(de?'Hitzeaufbau':'heat buildup'));
  if(e.dc)L.push('+'+e.dc+' '+(de?'Kühlung':'cooling'));
  add(e.dm,'Magnet-Reichweite','magnet range');
  if(e.dv)L.push((e.dv>0?'+':'−')+Math.round(Math.abs(e.dv)*100)+'% '+(de?'Loot-Wert':'loot value'));
  if(e.crit)L.push('+'+Math.round(e.crit*100)+'% '+(de?'Krit-Chance (×2 Schaden)':'crit chance (x2 damage)'));
  if(e.luck)L.push('+'+Math.round(e.luck*100)+'% '+(de?'Fundchance':'find chance'));
  if(e.chain)L.push(de?'Kettenreaktion +1 Stufe':'chain reaction +1 level');
  if(e.drone)L.push('+'+e.drone+' '+(de?'Drohne(n)':'drone(s)'));
  if(e.bossPow)L.push('+'+e.bossPow+' '+(de?'Schaden an Wächtern':'guardian damage'));
  if(e.heatShield)L.push('+'+e.heatShield+' '+(de?'Hitzeschild':'heat shield'));
  if(e.auto)L.push(de?'sammelt Loot automatisch ein':'auto-collects loot');
  if(e.wide)L.push(de?'bohrt zusätzlich seitlich':'also drills sideways');
  if(e.dronemine)L.push(de?'Drohnen bauen selbst ab':'drones mine on their own');
  if(e.fuelOre)L.push(de?'Erz füllt Sprit nach':'ore refuels the tank');
  if(e.combo)L.push(de?'Kombo-Streak erhöht den Loot':'combo streak boosts loot');
  const ab={blast:[ 'Fähigkeit: Schockwelle räumt alles im Umkreis','Ability: shockwave clears the area'],
    boost:['Fähigkeit: Overdrive — kurzzeitig viel schneller','Ability: overdrive — briefly much faster'],
    laser:['Fähigkeit: brennt einen Schacht Richtung Kern','Ability: burns a shaft toward the core'],
    magpulse:['Fähigkeit: zieht alles Loot sofort an','Ability: yanks all loot to you'],
    teleport:['Fähigkeit: Sprung zurück in den Orbit','Ability: warp back to orbit'],
    freeze:['Fähigkeit: Hitze sofort auf 0 für 5 Sek.','Ability: heat to zero for 5s'],
    nuke:['Fähigkeit: gewaltige Detonation + Loot-Bonus','Ability: huge detonation + loot bonus']};
  if(e.ability&&ab[e.ability])L.push(de?ab[e.ability][0]:ab[e.ability][1]);
  // what using it actually costs — straight from the ABILITY table
  if(e.ability&&ABILITY[e.ability]){const A=ABILITY[e.ability];
    L.push('⛽ '+(de?'Kostet ':'Costs ')+A.fuel+' '+(de?'Sprit':'fuel')+
           ' · ⏱ '+A.cd+(de?' Sek. Abklingzeit':'s cooldown'));
    if(e.ability==='freeze')L.push('❄ '+(de?'Setzt die Hitze auf 0':'Resets heat to 0'));}
  return L;}
function showSkillInfo(s){const de=settings.lang!=='en',own=owned(s.id);
  const box=document.getElementById('skillInfo');
  const block=own?null:exclBlocker(s);
  const state=own?(de?'✓ Gekauft':'✓ Owned')
    :block?(de?'🚫 Gesperrt durch '+block.name:'🚫 Locked by '+block.name)
    :(canBuy(s)?(de?'Kaufbar für ':'Buy for ')+s.cost+'$'
    :(de?'Kostet ':'Costs ')+s.cost+'$'+(meta.credits<s.cost?(de?' — zu wenig Cash':' — not enough cash'):''));
  /* A doctrine has to say out loud that it is a one-way choice, before the tap.
     A player who spends 1500 $ and only then discovers two branches closed has
     been tricked by the interface, not by the design. */
  const docNote=s.excl&&!own&&!block
    ?'<div style="font-size:11px;line-height:1.45;color:#ff4de0;margin-top:6px;font-weight:900;">'+
      (de?'Doktrin: Du wählst genau EINE. Die anderen bleiben bis zum nächsten Prestige gesperrt.'
         :'Doctrine: you pick exactly ONE. The others stay locked until your next prestige.')+'</div>'
    :block?'<div style="font-size:11px;line-height:1.45;color:#9a90ad;margin-top:6px;">'+
      (de?'Ein Prestige öffnet die Wahl wieder.':'A prestige reopens the choice.')+'</div>':'';
  box.innerHTML='<div class="siHead"><span class="siIc">'+(block?'🚫':s.ic)+'</span><b>'+s.name+'</b></div>'+
    '<ul class="siList">'+skillEffLines(s).map(x=>'<li>'+x+'</li>').join('')+'</ul>'+docNote+
    '<div class="siFoot" style="color:'+(own?'#2de2e6':block?'#ff6a3d':canBuy(s)?'#ffd23f':'#9a90ad')+'">'+state+'</div>';
  box.classList.add('show');vibe(8);
  clearTimeout(showSkillInfo._t);
  showSkillInfo._t=setTimeout(()=>box.classList.remove('show'),3200);}
// Press and hold a node to read what it does; a normal tap still buys it.
function attachSkillPress(n,s){let t=null,sx=0,sy=0,held=false;
  const cancel=()=>{if(t){clearTimeout(t);t=null;}};
  n.addEventListener('pointerdown',e=>{held=false;sx=e.clientX;sy=e.clientY;
    cancel();t=setTimeout(()=>{held=true;t=null;showSkillInfo(s);},380);});
  n.addEventListener('pointermove',e=>{
    if(t&&Math.hypot(e.clientX-sx,e.clientY-sy)>12)cancel();});   // scrolling must not trigger it
  n.addEventListener('pointerup',cancel);
  n.addEventListener('pointercancel',()=>{cancel();held=false;});
  n.addEventListener('pointerleave',cancel);
  n.onclick=()=>{
    if(held){held=false;return;}                                  // the hold already showed info
    if(buySkill(s.id)){sfx.buy();haptic('success');S=stats();updateAbilityButtons();buildTree(false);checkAchievements();
      /* Re-flag the freshly bought node after the rebuild, so the flare plays on
         the new element rather than on the one we just threw away. */
      const fresh=document.getElementById('n_'+s.id);
      if(fresh){fresh.classList.add('bought');setTimeout(()=>fresh.classList.remove('bought'),600);}}
    else{sfx.deny();showSkillInfo(s);}                               // can't afford -> explain why
  };}
/* ---------- pinch-to-zoom ----------
 * The canvas is scaled visually while a sizer element carries the scaled
 * dimensions, so the scroll range always matches what you see. The point
 * between your fingers stays put while you pinch. */
const ZOOM_MIN=0.45,ZOOM_MAX=1.8;
let treeZoom=1;const treeBase={w:0,h:0};
function applyTreeZoom(){
  const cvs=document.getElementById('treeCanvas'),sz=document.getElementById('treeSizer');
  if(!cvs||!sz)return;
  cvs.style.transform='scale('+treeZoom+')';
  sz.style.width=(treeBase.w*treeZoom)+'px';
  sz.style.height=(treeBase.h*treeZoom)+'px';}
// zoom around a point given in viewport coords, keeping that point stationary
function zoomTreeAt(next,px,py){
  const sc=document.getElementById('treeScroll'),r=sc.getBoundingClientRect();
  const z0=treeZoom,z1=clamp(next,ZOOM_MIN,ZOOM_MAX);
  if(z1===z0)return;
  const cx=(sc.scrollLeft+px-r.left)/z0, cy=(sc.scrollTop+py-r.top)/z0;   // content point under the fingers
  treeZoom=z1;applyTreeZoom();
  sc.scrollLeft=cx*z1-(px-r.left);
  sc.scrollTop=cy*z1-(py-r.top);}
(function initTreeZoom(){
  const sc=document.getElementById('treeScroll');if(!sc)return;
  let start=null;
  const dist=(t)=>Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);
  const mid=(t)=>[(t[0].clientX+t[1].clientX)/2,(t[0].clientY+t[1].clientY)/2];
  sc.addEventListener('touchstart',e=>{
    if(e.touches.length===2){const t=[e.touches[0],e.touches[1]];
      start={d:dist(t)||1,z:treeZoom};e.preventDefault();}},{passive:false});
  sc.addEventListener('touchmove',e=>{
    if(start&&e.touches.length===2){const t=[e.touches[0],e.touches[1]],m=mid(t);
      zoomTreeAt(start.z*(dist(t)/start.d),m[0],m[1]);e.preventDefault();}},{passive:false});
  const end=e=>{if(!e.touches||e.touches.length<2)start=null;};
  sc.addEventListener('touchend',end);sc.addEventListener('touchcancel',end);
  // desktop convenience: ctrl/⌘ + wheel, and trackpad pinch (which arrives as ctrl+wheel)
  sc.addEventListener('wheel',e=>{
    if(!e.ctrlKey&&!e.metaKey)return;
    zoomTreeAt(treeZoom*(e.deltaY<0?1.1:1/1.1),e.clientX,e.clientY);e.preventDefault();},{passive:false});
})();
function treeExtent(){const L=layoutTree();let minx=0,maxx=0,miny=0,maxy=0;
  for(const s of SKILLS){const p=L[s.id];
    minx=Math.min(minx,p.x);maxx=Math.max(maxx,p.x);
    miny=Math.min(miny,p.y);maxy=Math.max(maxy,p.y);}
  return{minx,maxx,miny,maxy};}
/**
 * recenter=true  -> opening the tree: scroll so the frontier node sits centred
 * recenter=false -> a rebuild after buying: keep the view exactly where it was
 * The canvas is sized from ALL skills (not just visible ones) plus half a
 * viewport of padding on every side, so the coordinate system never shifts and
 * any node — including the root — can sit dead centre.
 */
function buildTree(recenter){
  document.getElementById('treeCash').textContent='$'+meta.credits;
  const pg=prestigeGain(),pb=document.getElementById('btnPrestige');
  pb.style.display=pg>0?'inline-flex':'none';pb.textContent='⚛ +'+pg;
  const ag=ascendGain(),ab=document.getElementById('btnAscend');
  ab.style.display=canAscend()?'inline-flex':'none';ab.textContent='✦ +'+ag;
  /* The board button only appears once shards exist — before that it would be a
     locked door with nothing behind it. Free shards get called out, because an
     unspent shard is the one thing on this screen doing nothing for you. */
  const perkBtn=document.getElementById('btnPerks'),shTotal=(meta.ascend&&meta.ascend.shards)||0;
  perkBtn.style.display=shTotal>0?'inline-flex':'none';
  perkBtn.textContent=shardsFree()>0?'✦ '+shardsFree()+(settings.lang==='en'?' free':' frei'):'✦ '+(settings.lang==='en'?'Shards':'Splitter');
  const sc=document.getElementById('treeScroll');
  const keepL=sc.scrollLeft,keepT=sc.scrollTop;          // remember the view
  const vw=sc.clientWidth||window.innerWidth,vh=sc.clientHeight||window.innerHeight;
  // Half a viewport lets any node sit dead centre; the extra margin leaves
  // breathing room beyond that, so the tree can grow in every direction —
  // including above and left of the root — without the view hitting a hard edge.
  const EXTRA=140;
  const padX=Math.max(180,vw/2+EXTRA),padY=Math.max(180,vh/2+EXTRA);
  const ex=treeExtent(),L=layoutTree();
  const cw=(ex.maxx-ex.minx)+padX*2,ch=(ex.maxy-ex.miny)+padY*2;
  const cvs=document.getElementById('treeCanvas');cvs.style.width=cw+'px';cvs.style.height=ch+'px';
  treeBase.w=cw;treeBase.h=ch;
  const ox=(id)=>padX+(L[id].x-ex.minx), oy=(id)=>padY+(L[id].y-ex.miny);
  // nodes first — the connectors need their real measured size to stop at the edge
  [...cvs.querySelectorAll('.node')].forEach(n=>n.remove());
  const boxes={};
  for(const s of SKILLS){if(!visibleSkill(s))continue;const own=owned(s.id),buy=canBuy(s);
    const blocked=!own&&exclBlocker(s);
    const n=document.createElement('button');
    n.className='node'+(own?' owned':' avail'+(buy?'':' no')+(blocked?' locked':''))+(s.excl&&!own&&!blocked?' doctrine':'');
    n.id='n_'+s.id;   // lets the purchase flare find the rebuilt node
    n.style.left=ox(s.id)+'px';n.style.top=oy(s.id)+'px';
    n.innerHTML='<span class="ni">'+(blocked?'🚫':s.ic)+'</span><span class="nn">'+s.name+'</span>'+
      (own?'':blocked?'<span class="nc" style="color:#ff6a3d">'+(settings.lang==='en'?'locked':'gesperrt')+'</span>'
                     :'<span class="nc">'+s.cost+'$</span>');
    attachSkillPress(n,s);
    cvs.appendChild(n);boxes[s.id]=n;}
  // connectors: trimmed to each box's border so no line ever crosses a node
  const svg=document.getElementById('treeSvg');
  svg.setAttribute('width',cw);svg.setAttribute('height',ch);
  const GAP=4;                       // small visible gap between line and border
  // distance from a node's centre to its border along direction (dx,dy)
  const edge=(id,dx,dy)=>{const el=boxes[id];
    const hw=(el?el.offsetWidth:NODE_W)/2+GAP, hh=(el?el.offsetHeight:56)/2+GAP;
    const ax=Math.abs(dx),ay=Math.abs(dy);
    if(ax<1e-6)return hh;
    if(ay<1e-6)return hw;
    return Math.min(hw/ax,hh/ay);};
  let lines='';
  for(const s of SKILLS){if(!visibleSkill(s))continue;
    for(const r of s.req){const p=SKILLMAP[r];if(!p||!visibleSkill(p))continue;
      const x1=ox(r),y1=oy(r),x2=ox(s.id),y2=oy(s.id);
      const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len;
      const t1=edge(r,ux,uy),t2=edge(s.id,ux,uy);
      if(t1+t2>=len)continue;        // boxes nearly touch: no room for a line
      const col=owned(s.id)?'#2de2e6':(owned(r)?'#ffd23f':'#444');
      lines+='<line x1="'+(x1+ux*t1).toFixed(1)+'" y1="'+(y1+uy*t1).toFixed(1)+
             '" x2="'+(x2-ux*t2).toFixed(1)+'" y2="'+(y2-uy*t2).toFixed(1)+
             '" stroke="'+col+'" stroke-width="3" stroke-linecap="round"/>';}}
  svg.innerHTML=lines;
  applyTreeZoom();
  requestAnimationFrame(()=>{
    if(recenter){   // only when opening: put the next buyable node in the middle
      const target=SKILLS.find(s=>canBuy(s))||SKILLS.find(s=>visibleSkill(s)&&!owned(s.id))||SKILLS[0];
      sc.scrollLeft=ox(target.id)*treeZoom-vw/2;
      sc.scrollTop=oy(target.id)*treeZoom-vh/2;
    }else{          // rebuild: restore the exact scroll position
      sc.scrollLeft=keepL;sc.scrollTop=keepT;
    }});
}
let backTo='titleOver';
function openTree(from){backTo=from;hide(from);show('treeOver');buildTree(true);}
function openPlanets(from){backTo=from;hide(from);show('planetOver');buildPlanets();}
function buildSettings(){const lbl={music:'sMusic',sfx:'sSfx',vibe:'sVibe',shake:'sShake'};
  document.querySelectorAll('.mbtn.set').forEach(b=>{const k=b.dataset.k,on=!!settings[k];
    b.classList.toggle('off',!on);b.innerHTML=t(lbl[k])+' <span>'+(on?t('on'):t('off'))+'</span>';
    b.onclick=()=>{settings[k]=!settings[k];saveMeta();sfx.ui();
      if(k==='music'){if(settings.music)startMusic();else stopMusic();}
      buildSettings();};});
  const lb=document.getElementById('btnLang');if(lb){lb.textContent=t('langBtn');
    lb.onclick=()=>{settings.lang=settings.lang==='de'?'en':'de';saveMeta();sfx.ui();applyLang();};}
  const qb=document.getElementById('btnQuality');if(qb){const de=settings.lang!=='en';
    const qn={auto:de?'Auto':'Auto',high:de?'Hoch':'High',low:de?'Niedrig':'Low'};
    qb.textContent='⚡ '+(de?'Grafik':'Graphics')+': '+qn[settings.quality||'auto'];
    qb.onclick=()=>{const order=['auto','high','low'],i=order.indexOf(settings.quality||'auto');
      settings.quality=order[(i+1)%order.length];saveMeta();sfx.ui();applyQuality();buildSettings();};}
  document.getElementById('stBest').textContent=meta.stats.bestDepth+'m';
  document.getElementById('stRuns').textContent=meta.stats.runs;
  document.getElementById('stCash').textContent=money(meta.stats.totalEarned);}
function applyLang(){
  const set=(id,key,html)=>{const e=document.getElementById(id);if(!e)return;html?e.innerHTML=t(key):e.textContent=t(key);};
  set('btnStart','dropIn');set('btnDescend','dropIn');
  set('btnTree','tree');set('btnTree2','tree');set('btnPlanets','planets');set('btnPlanets2','planets');
  set('btnAch','ach');set('btnSettings','settings');set('btnSettings2','settings');
  set('btnTreeDone','done');set('btnPlanetsDone','done');set('btnSettingsDone','done');set('btnAchDone','done');
  set('btnRetry','retry');set('btnGoMenu','menu');set('btnSkinDone','done');
  set('btnHelp','help');if(document.getElementById('tutOver').classList.contains('show'))renderTut();
  set('titleSub','titleSub');set('hint','hint',true);set('goSub','goSub',true);set('goLostLbl','lootLost');set('goSavedLbl','lootSaved');
  buildSettings();updateDailyUI();}

/* ===================== DAILY GOAL ===================== */
function dayRng(){let s=5;for(const c of new Date().toDateString())s=((s*31+c.charCodeAt(0))>>>0);
  return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function ensureDaily(){const ds=new Date().toDateString();if(meta.daily&&meta.daily.date===ds)return;
  /* Scale the goal to what the player has actually shown they can do. The fixed
     ranges asked a brand-new account — $0, best depth 0 — to reach 66 m and haul
     2 000 $, which is the very first thing the title screen says to someone who
     has never played. A daily goal you cannot reach on day one is not a goal,
     it is a verdict. The floors keep it meaningful for veterans. */
  const best=Math.max(12,meta.stats.bestDepth||0);
  const rich=Math.max(200,Math.round((meta.stats.totalEarned||0)/Math.max(1,meta.stats.runs||1)));
  const r=dayRng(),kinds=[
    {type:'depth',target:Math.round(best*(0.75+r()*0.55)),reward:250},
    {type:'loot', target:Math.round(rich*(1.1+r()*1.6)),  reward:350},
    {type:'runs', target:2+Math.floor(r()*4),             reward:300}];
  const pick=kinds[Math.floor(r()*kinds.length)];
  meta.daily={date:ds,type:pick.type,target:pick.target,reward:pick.reward,progress:0,claimed:false};saveMeta();}
function dailyDesc(){const d=meta.daily,de=settings.lang!=='en';if(!d)return'';
  return d.type==='depth'?(de?'Erreiche Tiefe ':'Reach depth ')+d.target+'m':
    d.type==='loot'?(de?'Verdiene ':'Earn ')+d.target+' $':
    (de?'Spiele ':'Play ')+d.target+(de?' Runs':' runs');}
function updateDailyUI(){ensureDaily();const el=document.getElementById('dailyCard');if(!el)return;const d=meta.daily;
  el.innerHTML='◆ '+t('dailyTitle')+': '+dailyDesc()+'  ['+Math.min(d.target,d.progress)+'/'+d.target+']'+(d.claimed?' ✓ +'+d.reward+'$':'');}
function updateDaily(kind,val){ensureDaily();const d=meta.daily;if(d.claimed)return;
  if(d.type===kind){if(kind==='depth')d.progress=Math.max(d.progress,val);else d.progress+=val;
    if(d.progress>=d.target){d.claimed=true;meta.credits+=d.reward;
      achQueue.push({ic:'◆',de:[t('dailyDone'),'+'+d.reward+' $'],en:[t('dailyDone'),'+'+d.reward+' $']});if(!achTimer)nextAch();}
    saveMeta();}updateDailyUI();}
/* ===================== CONTRACTS (rolling goals w/ rewards) ===================== */
const CONTRACTS=[
 {id:'depth', ic:'⛏️', metric:'runDepth', de:'Erreiche %T m in einem Run', en:'Reach %T m in one run',    tiers:[[30,300],[55,700],[85,1500],[120,3200]]},
 {id:'loot',  ic:'💰', metric:'runLoot',  de:'Verdiene %T $ in einem Run', en:'Earn %T $ in one run',      tiers:[[1500,400],[5000,900],[12000,2000],[30000,4500]]},
 {id:'relic', ic:'🟣', metric:'relics',   de:'Finde %T Relikte',           en:'Find %T relics',            tiers:[[3,500],[8,1200],[18,2600]]},
 {id:'guard', ic:'💠', metric:'guardians',de:'Besiege %T Kern-Wächter',    en:'Defeat %T Core Guardians',  tiers:[[3,600],[8,1500],[16,3200]]},
 {id:'combo', ic:'🔗', metric:'bestCombo',de:'Erreiche Combo ×%T',         en:'Reach Combo x%T',           tiers:[[15,400],[30,900],[50,1800]]},
];
const CMAP={};CONTRACTS.forEach(c=>CMAP[c.id]=c);
const CMAX_METRIC={runDepth:1,runLoot:1,bestCombo:1};   // these track the run's best, others accumulate
function rollContract(exclude){const pool=CONTRACTS.filter(c=>!exclude.includes(c.metric));
  const c=pool[Math.floor(Math.random()*pool.length)],ti=c.tiers[Math.floor(Math.random()*c.tiers.length)];
  return{cid:c.id,metric:c.metric,target:ti[0],reward:ti[1],progress:0,claimed:false};}
function ensureContracts(){if(!meta.contracts)meta.contracts=[];
  while(meta.contracts.length<3)meta.contracts.push(rollContract(meta.contracts.map(x=>x.metric)));
  saveMeta();}
function updateContracts(metric,val){ensureContracts();let changed=false;
  for(const c of meta.contracts){if(c.claimed||c.metric!==metric)continue;
    if(CMAX_METRIC[metric])c.progress=Math.max(c.progress,val);else c.progress+=val;
    if(metric==='bestCombo'&&val>(meta.stats.maxCombo||0))meta.stats.maxCombo=val;
    if(c.progress>=c.target){c.claimed=true;meta.credits+=c.reward;meta.stats.contractsDone=(meta.stats.contractsDone||0)+1;
      achQueue.push({ic:'📋',de:['Kontrakt erfüllt','+'+c.reward+' $'],en:['Contract done','+'+c.reward+' $']});if(!achTimer)nextAch();}
    changed=true;}
  // roll a fresh contract in place of any completed one (keeps 3 distinct, always live)
  for(let i=0;i<meta.contracts.length;i++)if(meta.contracts[i].claimed){
    meta.contracts[i]=rollContract(meta.contracts.filter((_,j)=>j!==i).map(x=>x.metric));changed=true;}
  if(changed)saveMeta();}
function contractDesc(c){const p=CMAP[c.cid];return(settings.lang==='en'?p.en:p.de).replace('%T',c.target);}
function buildContracts(){ensureContracts();const g=document.getElementById('contractList');g.innerHTML='';
  meta.contracts.forEach(c=>{const p=CMAP[c.cid],pr=Math.min(c.progress,c.target);
    const row=document.createElement('div');row.className='pcard';
    row.innerHTML='<span style="font-size:22px;width:34px;text-align:center">'+p.ic+'</span>'+
      '<span class="pt"><b>'+contractDesc(c)+'</b><span>'+pr+' / '+c.target+'</span></span>'+
      '<span class="ps" style="color:#ffd23f">+'+c.reward+'$</span>';
    g.appendChild(row);});}
function openContracts(from){backTo=from;hide(from);show('contractOver');buildContracts();}

/* ===================== REFINERY (spend raw ore for permanent upgrades) ===================== */
// (RECIPES/RMAP are declared above stats() so the stat fold can read them.)
function refineLevel(id){return(meta.refine&&meta.refine[id])||0;}
function refineCost(r){const L=refineLevel(r.id),c={};for(const m in r.mat)c[m]=r.mat[m]*(L+1);return c;}
function canCraft(r){const c=refineCost(r);for(const m in c)if((meta.mats[m]||0)<c[m])return false;return true;}
function craft(id){const r=RMAP[id];if(!r||!canCraft(r))return false;const c=refineCost(r);
  for(const m in c)meta.mats[m]-=c[m];meta.refine[id]=refineLevel(id)+1;saveMeta();S=stats();checkAchievements();return true;}
function matName(m){const de=settings.lang!=='en';const n={ferrite:de?'Schrott':'Scrap',cuprite:de?'Kupfer':'Copper',crystal:de?'Kristall':'Shard',core:de?'Kern':'Core',artifact:de?'Relikt':'Relic'};return n[m];}
function buildRefinery(){const de=settings.lang!=='en';
  const mh=document.getElementById('refMats');
  mh.innerHTML=['ferrite','cuprite','crystal','core','artifact'].map(m=>
    '<span style="color:'+RES[m].glow+'">'+matName(m)+' '+(meta.mats[m]||0)+'</span>').join('  ·  ');
  const g=document.getElementById('refList');g.innerHTML='';
  RECIPES.forEach(r=>{const L=refineLevel(r.id),cost=refineCost(r),ok=canCraft(r);
    const costStr=Object.keys(cost).map(m=>{const have=meta.mats[m]||0;
      return '<span style="color:'+(have>=cost[m]?'#12d9b0':'#ff4d4d')+'">'+matName(m)+' '+have+'/'+cost[m]+'</span>';}).join(' · ');
    const card=document.createElement('button');card.className='pcard'+(L>0?' sel':'');
    card.innerHTML='<span style="font-size:22px;width:34px;text-align:center">'+r.ic+'</span>'+
      '<span class="pt"><b>'+(de?r.de[0]:r.en[0])+' · Lv '+L+'</b><span>'+(de?r.de[1]:r.en[1])+'<br>'+costStr+'</span></span>'+
      '<span class="ps" style="color:'+(ok?'#ffd23f':'#555')+'">'+(ok?(de?'BAUEN':'CRAFT'):'🔒')+'</span>';
    card.disabled=!ok;
    card.onclick=()=>{if(craft(r.id)){sfx.buy();vibe(14);buildRefinery();updateAbilityButtons();}else sfx.ui();};
    g.appendChild(card);});}
function openRefinery(from){backTo=from;hide(from);show('refineOver');buildRefinery();}

/* ===================== DRILL MODULES (buy + equip into 3 slots) ===================== */
function modOwned(id){return meta.modules.includes(id);}
function modSlotIdx(id){return meta.slots.indexOf(id);}
function freeSlot(){return meta.slots.indexOf(null);}
function buyModule(id){const m=MMAP[id];if(!m||modOwned(id)||meta.credits<m.cost)return false;
  meta.credits-=m.cost;meta.modules.push(id);saveMeta();return true;}
function toggleModule(id){const s=modSlotIdx(id);
  if(s>=0)meta.slots[s]=null;else{const f=freeSlot();if(f<0)return false;meta.slots[f]=id;}
  saveMeta();S=stats();checkAchievements();return true;}
function effStr(e){const de=settings.lang!=='en';const p=[];
  if(e.dp)p.push('+'+e.dp+' '+(de?'Bohr':'Pow'));if(e.ds)p.push('+'+e.ds+' '+(de?'Speed':'Spd'));
  if(e.de)p.push('+'+e.de+' '+(de?'Sprit':'Fuel'));if(e.dh)p.push('−'+e.dh+' '+(de?'Hitze':'Heat'));
  if(e.dm)p.push('+'+e.dm+' '+(de?'Magnet':'Mag'));if(e.crit)p.push('+'+Math.round(e.crit*100)+'% '+(de?'Krit':'crit'));
  if(e.dv)p.push('+'+Math.round(e.dv*100)+'% Loot');if(e.luck)p.push('+'+Math.round(e.luck*100)+'% '+(de?'Glück':'Luck'));
  if(e.drone)p.push('+1 '+(de?'Drohne':'Drone'));return p.join(' · ');}
function buildModules(){const de=settings.lang!=='en',used=meta.slots.filter(x=>x).length;
  document.getElementById('modSlots').textContent=(de?'Slots belegt: ':'Slots used: ')+used+'/'+meta.slots.length;
  const g=document.getElementById('modList');g.innerHTML='';
  MODULES.forEach(m=>{const own=modOwned(m.id),eq=modSlotIdx(m.id)>=0;
    let action,acol;
    if(!own){action=m.cost+'$';acol='#ffd23f';}
    else if(eq){action=de?'★ ablegen':'★ remove';acol='#2de2e6';}
    else if(freeSlot()>=0){action=de?'anlegen':'equip';acol='#12d9b0';}
    else{action=de?'voll':'full';acol='#555';}
    const card=document.createElement('button');card.className='pcard'+(eq?' sel':'');
    card.innerHTML='<span style="font-size:22px;width:34px;text-align:center;color:'+m.col+'">'+m.ic+'</span>'+
      '<span class="pt"><b>'+(de?m.de:m.en)+'</b><span>'+effStr(m.eff)+'</span></span>'+
      '<span class="ps" style="color:'+acol+'">'+action+'</span>';
    card.disabled=!own&&meta.credits<m.cost;
    card.onclick=()=>{if(!own){if(buyModule(m.id)){sfx.buy();vibe(12);buildModules();}else sfx.ui();}
      else{if(toggleModule(m.id)){sfx.ui();vibe(8);buildModules();updateAbilityButtons();}else sfx.ui();}};
    g.appendChild(card);});}
function openModules(from){backTo=from;hide(from);show('moduleOver');buildModules();}

/* ===================== DAILY CHALLENGE (fixed seed + modifier + local board) ===================== */
let chalMod=null,pendingChal=false,chalPlanet='terra';
const CHAL_MODS=[
 {id:'hot',    de:'Doppelte Hitze', en:'Double heat',  mul:{heat:2}},
 {id:'lean',   de:'Halber Tank',    en:'Half fuel',    mul:{fuel:0.5}},
 {id:'rich',   de:'Doppelter Loot', en:'Double loot',  mul:{loot:2}},
 {id:'swift',  de:'Turbo-Bohrer',   en:'Turbo drill',  mul:{speed:1.4}},
 {id:'fragile',de:'Sprödes Gestein',en:'Brittle rock', mul:{hard:0.6}},
];
const CMODMAP={};CHAL_MODS.forEach(c=>CMODMAP[c.id]=c);
function chalRng(){let s=99;for(const c of new Date().toDateString())s=((s*33+c.charCodeAt(0))>>>0);
  return ()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
function chalSetup(){const r=chalRng();return{planet:PLANETS[Math.floor(r()*PLANETS.length)],mod:CHAL_MODS[Math.floor(r()*CHAL_MODS.length)]};}
function cmul(key){return(run.challenge&&chalMod&&chalMod.mul[key])||1;}
function startChallenge(){const s=chalSetup();chalMod=s.mod;pendingChal=true;chalPlanet=s.planet.id;
  hide('challengeOver');startRun();}
function recordScore(){const score=Math.round(run.depthMax*10+run.haul),today=new Date().toDateString();
  meta.scores.push({score,depth:run.depthMax,planet:P.id,mod:chalMod?chalMod.id:'',date:today});
  meta.scores.sort((a,b)=>b.score-a.score);meta.scores=meta.scores.slice(0,10);
  if(meta.challenge.bestDate!==today||score>meta.challenge.best){meta.challenge.best=Math.max(meta.challenge.bestDate===today?meta.challenge.best:0,score);meta.challenge.bestDate=today;}
  saveMeta();achQueue.push({ic:'🏁',de:['Challenge-Score',''+score],en:['Challenge score',''+score]});if(!achTimer)nextAch();}
function buildChallenge(){const de=settings.lang!=='en',s=chalSetup(),today=new Date().toDateString();
  document.getElementById('chalDesc').innerHTML=(de?'Fester Seed für alle heute · ':'Same seed for everyone today · ')+
    '<b style="color:'+s.planet.core+'">'+s.planet.name+'</b> · <b style="color:#ff4de0">'+(de?s.mod.de:s.mod.en)+'</b>';
  const bt=(meta.challenge.bestDate===today)?meta.challenge.best:0;
  document.getElementById('chalBest').textContent=(de?'Dein Bestwert heute: ':'Your best today: ')+bt;
  const g=document.getElementById('chalBoard');g.innerHTML='';
  if(!meta.scores.length){g.innerHTML='<div class="sub" style="opacity:.6">'+(de?'Noch keine Läufe':'No runs yet')+'</div>';}
  meta.scores.forEach((sc,i)=>{const row=document.createElement('div');row.className='pcard';
    row.innerHTML='<span style="font-size:16px;width:30px;text-align:center;color:#ffd23f">#'+(i+1)+'</span>'+
      '<span class="pt"><b>'+sc.score+'</b><span>'+sc.depth+'m · '+(CMODMAP[sc.mod]?(de?CMODMAP[sc.mod].de:CMODMAP[sc.mod].en):'—')+'</span></span>'+
      '<span class="ps" style="color:#2de2e6">'+(sc.date===today?(de?'heute':'today'):'')+'</span>';
    g.appendChild(row);});}
function openChallenge(from){backTo=from;hide(from);show('challengeOver');buildChallenge();}
function openSettings(from){backTo=from;hide(from);show('settingsOver');buildSettings();}
function buildAch(){const g=document.getElementById('achList');g.innerHTML='';
  document.getElementById('achCount').textContent=meta.achievements.length+'/'+ACH.length;
  ACH.forEach(a=>{const has=meta.achievements.includes(a.id);
    const row=document.createElement('div');row.className='pcard'+(has?' sel':'');
    row.innerHTML='<span style="font-size:24px;width:34px;text-align:center;'+(has?'':'filter:grayscale(1);opacity:.45;')+'">'+a.ic+'</span>'+
      '<span class="pt"><b>'+achTxt(a)[0]+'</b><span>'+achTxt(a)[1]+'</span></span>'+
      '<span class="ps" style="color:'+(has?'#2de2e6':'#555')+'">'+(has?'✓':'🔒')+'</span>';
    g.appendChild(row);});}
function openAch(from){backTo=from;hide(from);show('achOver');buildAch();}
function buildSkins(){const g=document.getElementById('skinList');g.innerHTML='';const de=settings.lang!=='en';
  SKINS.forEach(s=>{const owned=meta.cosmetics.owned.includes(s.id),eq=meta.cosmetics.equipped===s.id;
    const card=document.createElement('button');card.className='pcard'+(eq?' sel':'');
    const globe='radial-gradient(circle at 34% 30%, '+s.blob+', '+s.ring+' 60%, #0a0713 100%)';
    card.innerHTML='<span class="globe" style="border-radius:8px;background:'+globe+';border:2px solid '+s.core+';box-shadow:inset -6px -6px 10px rgba(0,0,0,.6),0 0 12px '+s.core+'66;"></span>'+
      '<span class="pt"><b>'+s.name+'</b><span>'+(s.cost?(de?'Bohrer-Skin':'Drill skin'):(de?'Standard':'Default'))+'</span></span>'+
      '<span class="ps" style="color:'+(eq?'#2de2e6':owned?'#12d9b0':'#ffd23f')+'">'+(eq?'★':owned?(de?'nutzen':'equip'):s.cost+'$ 🔒')+'</span>';
    card.disabled=!owned&&meta.credits<s.cost;
    card.onclick=()=>{if(meta.cosmetics.owned.includes(s.id)){meta.cosmetics.equipped=s.id;}
      else if(meta.credits>=s.cost){meta.credits-=s.cost;meta.cosmetics.owned.push(s.id);meta.cosmetics.equipped=s.id;}else{sfx.ui();return;}
      saveMeta();sfx.buy();vibe(12);buildSkins();};
    g.appendChild(card);});}
function openSkins(from){backTo=from;hide(from);show('skinOver');buildSkins();}

/* ---------- PLANET MENU (graphical select/unlock) ---------- */
function buildPlanets(){const g=document.getElementById('planetCards');g.innerHTML='';
  PLANETS.forEach(p=>{const own=meta.unlockedPlanets.includes(p.id),sel=meta.planet===p.id;
    const card=document.createElement('button');card.className='pcard'+(sel?' sel':'')+(own?'':' lock');
    const globe='radial-gradient(circle at 68% 72%, '+p.ground[2]+' 0 7%, transparent 8%),'+
      'radial-gradient(circle at 44% 62%, '+p.ground[2]+' 0 4%, transparent 5%),'+
      'radial-gradient(circle at 28% 24%, '+p.ground[1]+' 0 9%, transparent 11%),'+
      'radial-gradient(circle at 34% 30%, '+p.ground[1]+', '+p.ground[0]+' 52%, '+p.ground[2]+' 100%)';
    const gstyle='background:'+globe+';border:2px solid '+p.core+';box-shadow:inset -7px -7px 12px rgba(0,0,0,.65),0 0 14px '+p.core+'66;';
    const rec=meta.records[p.id]||0,de=settings.lang!=='en';
    card.innerHTML='<span class="globe" style="'+gstyle+'"></span>'+
      '<span class="pt"><b>'+p.name+'</b><span>'+(de?'Härte':'Hard')+' ×'+p.hardMul.toFixed(1)+' · Loot ×'+p.valueMul.toFixed(1)+
        (PLANET_RULE[p.id]?'<br><i style="color:'+p.core+';font-style:normal;">'+(de?PLANET_RULE[p.id][0]:PLANET_RULE[p.id][1])+'</i>':'')+
        (rec?'<br>'+(de?'Rekord':'Record')+': '+rec+'m':'')+'</span></span>'+
      '<span class="ps" style="color:'+(sel?'#2de2e6':own?'#12d9b0':'#ffd23f')+'">'+(sel?'★ '+(de?'AKTIV':'ACTIVE'):own?(de?'WÄHLEN':'SELECT'):p.unlock+'$ 🔒')+'</span>';
    card.disabled=!own&&meta.credits<p.unlock;
    /* Long-press opens the dossier — the same gesture the skill tree already
       uses for "tell me what this actually does", so it needs no teaching. A
       locked planet can still be inspected: knowing what you are saving up for
       is the whole reason to save up. */
    (function(el,pl){let t=null,held=false;
      const start=()=>{held=false;clearTimeout(t);t=setTimeout(()=>{held=true;haptic('medium');openDossier(pl);},480);};
      const stop=()=>{clearTimeout(t);};
      el.addEventListener('pointerdown',start,{passive:true});
      el.addEventListener('pointerup',stop,{passive:true});
      el.addEventListener('pointercancel',()=>{stop();held=false;},{passive:true});
      el.addEventListener('pointerleave',stop,{passive:true});
      el.addEventListener('pointermove',stop,{passive:true});
      el._wasHeld=()=>held;})(card,p);
    card.onclick=()=>{if(card._wasHeld())return;          // the hold opened the dossier
      const wasNew=!own&&meta.credits>=p.unlock;
      if(own){meta.planet=p.id;}
      else if(meta.credits>=p.unlock){meta.credits-=p.unlock;meta.unlockedPlanets.push(p.id);meta.planet=p.id;}else{sfx.ui();return;}
      saveMeta();sfx.buy();vibe(12);checkAchievements();
      if(wasNew){hide('planetOver');showCutscene(p);}else buildPlanets();};
    g.appendChild(card);});}
/* ---------- PLANET DOSSIER ----------
 * Everything here is DERIVED from the planet's own data rather than written out
 * by hand: the rock table comes from the same f-thresholds genTile uses, the ore
 * list from the same depth gates, the hazards from the actual flags. A hand
 * written description would be a second source of truth and would start lying
 * the first time a number is tuned — which is exactly how the old economy doc
 * ended up quoting planet prices that had not been real for weeks. */
const ROCKNAME={dirt:['Erdreich','Topsoil'],stone:['Gestein','Stone'],hard:['Hartgestein','Hard rock'],dark:['Dunkelfels','Darkrock']};
/* ---------- CREATURES ----------
 * One table instead of `e.type==='brute'?11:e.type==='swift'?4:6` scattered
 * through the update loop, the renderer and the dossier. Three universal
 * species live everywhere; every world also fields one of its own, and that
 * local species is the reason its creatures feel different rather than
 * re-skinned. `trait` is what it does to you beyond biting.
 *   hp    hits to kill        spd   chase multiplier
 *   dmg   heat per bite       pay   cash on kill
 *   life  seconds before it loses interest                                   */
const SPECIES={
 crawler:{ic:'🐛',col:'#ff3b6b',eye:'#ff3b6b',sz:0.26,hp:1,spd:1.5,dmg:6, pay:22, life:9,  from:16},
 swift:  {ic:'🦗',col:'#ff3b6b',eye:'#ffef5c',sz:0.20,hp:1,spd:2.8,dmg:4, pay:22, life:9,  from:31},
 brute:  {ic:'🦂',col:'#ff6a00',eye:'#ff6a00',sz:0.38,hp:2,spd:0.9,dmg:11,pay:44, life:13, from:61},
 // --- one native species per world ---
 ember:  {ic:'🔥',col:'#ffb03d',eye:'#fff2b0',sz:0.28,hp:1,spd:1.8,dmg:8, pay:38, life:10, from:20,trait:'burst'},
 frostli:{ic:'❄️',col:'#8be9ff',eye:'#e6feff',sz:0.24,hp:1,spd:2.0,dmg:5, pay:36, life:10, from:20,trait:'freeze'},
 magnet: {ic:'🧲',col:'#b8895a',eye:'#ffae42',sz:0.30,hp:2,spd:1.2,dmg:6, pay:52, life:11, from:20,trait:'thief'},
 sentinel:{ic:'📡',col:'#2de2e6',eye:'#c8ffff',sz:0.28,hp:2,spd:2.2,dmg:3, pay:56, life:11, from:20,trait:'siphon'},
 prism:  {ic:'🔷',col:'#4de0ff',eye:'#ff4de0',sz:0.26,hp:1,spd:1.6,dmg:5, pay:30, life:9,  from:20,trait:'split'},
 stalker:{ic:'👁️',col:'#41537a',eye:'#8a5cff',sz:0.30,hp:2,spd:2.4,dmg:9, pay:70, life:12, from:20,trait:'hidden'},
 spore:  {ic:'🌿',col:'#3fd977',eye:'#8dff5c',sz:0.22,hp:1,spd:1.2,dmg:4, pay:26, life:14, from:20,trait:'bloom'},
 wraith: {ic:'🌀',col:'#6b4de0',eye:'#c86bff',sz:0.32,hp:3,spd:1.0,dmg:12,pay:96, life:13, from:20,trait:'blink'},
};
const TRAIT_TXT={
 burst: ['Explodiert beim Sterben und heizt dich auf.','Detonates on death and cooks you.'],
 freeze:['Der Biss lässt den Bohrer einfrieren.','Its bite freezes the drill.'],
 thief: ['Reisst dir loses Erz wieder weg.','Rips loose ore back out of your magnet.'],
 siphon:['Saugt Sprit statt Hitze zu machen.','Siphons fuel instead of adding heat.'],
 split: ['Zerbricht beim Sterben in zwei kleinere.','Shatters into two smaller ones on death.'],
 hidden:['Bleibt unsichtbar, bis es fast heran ist.','Stays invisible until it is nearly on you.'],
 bloom: ['Vermehrt sich, wenn du es leben lässt.','Multiplies if you leave it alive.'],
 blink: ['Springt in Sprüngen auf dich zu.','Teleports toward you in jumps.'],
};
const SPECNAME={
 crawler:['Krabbler','Crawler'], swift:['Flitzer','Swift'], brute:['Brocken','Brute'],
 ember:['Glutbalg','Ember'], frostli:['Frostbeisser','Frostling'], magnet:['Magnetit','Magnetite'],
 sentinel:['Wachdrohne','Sentinel'], prism:['Prismling','Prismling'], stalker:['Schleicher','Stalker'],
 spore:['Sporenwolke','Spore Cloud'], wraith:['Leerling','Wraith'],
};
// Which native species each world fields on top of the universal three.
const PLANET_FAUNA={magmar:'ember',cryonis:'frostli',ferro:'magnet',mechon:'sentinel',
  neon:'prism',abyss:'stalker',verdant:'spore',obscura:'wraith'};
function faunaOf(){return PLANET_FAUNA[P.id]||null;}
/* One spawn path for every creature, so Deep-Layer scaling and the species
   table can never drift apart. `near` seeds it next to an existing creature
   (used by spore blooms and prism shards) instead of out in the rock. */
function spawnCreature(type,tier,near){
  const sp=SPECIES[type];if(!sp)return null;
  const c={type,age:0,hp:sp.hp+Math.floor(((tier||1)-1)/2),
    rad:clamp((near?near.rad:drill.rad)+(rnd()<0.5?-1:1)*TILE*(near?0.8:2+rnd()*2),R_CORE,R_SURF),
    ang:(near?near.ang:drill.ang)+(rnd()-0.5)*(near?0.25:0.5)};
  enemies.push(c);return c;}
function specName(id,de){const n=SPECNAME[id];return n?(de?n[0]:n[1]):id;}
function specLine(id,de){const s=SPECIES[id];if(!s)return '';
  const bits=[s.dmg+(de?' Hitze':' heat'),s.hp+(de?(s.hp>1?' Treffer':' Treffer'):' hit'+(s.hp>1?'s':'')),'$'+s.pay];
  return s.ic+' '+specName(id,de)+' — '+bits.join(' · ')+
    (s.trait?'. '+(de?TRAIT_TXT[s.trait][0]:TRAIT_TXT[s.trait][1]):'.');}
/* ---------- GUARDIANS ----------
 * The five types used to share one attack — a periodic heat pulse plus the same
 * rotating laser — and differed only in a heat multiplier and how fast the beam
 * span. That made the deepest, most dramatic moment on every world the same
 * fight in a different palette.
 *
 * Each guardian now has a signature that changes what you DO, not just how much
 * it hurts: Inferno paves your escape route with lava, Frost seals the shaft
 * behind you, the Construct deploys drones and drains the tank, the Void Maw
 * throws you around, the Hive floods the room. `pulse` is the telegraphed beat,
 * `tick` is continuous pressure. */
function tileAt(ring,sec){if(ring<0||ring>=RINGS)return null;return world.get(key(ring,sec));}
function bossRingSec(){const r=clamp(ringOf(drill.rad),0,RINGS-1);return [r,sectorOf(drill.ang,r)];}
// paint a tile molten (Inferno) — it exists as real, dangerous terrain afterwards
function igniteTile(ring,sec){if(ring<0||ring>=RINGS)return;
  const t=tilePolar(ring,sec);if(!t||t.wall||t.boss)return;t.lava=true;
  const ps=w2s(R_CORE+(ring+0.5)*TILE,(sec+0.5)*dsecOf(ring));burst(ps[0],ps[1],'#ffb03d',6,1.5);}
// slam an ice plug into an already-carved tile (Frost) — never the one you occupy
function sealTile(ring,sec){if(ring<0||ring>=RINGS)return;
  const [dr,ds]=bossRingSec();if(ring===dr&&sec===ds)return;
  if(world.get(key(ring,sec))!==null)return;                  // only refill what was cut
  const hp=HARD.hard*P.hardMul*cmul('hard')*expHard()*0.6;
  world.set(key(ring,sec),{rock:'hard',res:null,hp,maxhp:hp,regrown:true});
  const ps=w2s(R_CORE+(ring+0.5)*TILE,(sec+0.5)*dsecOf(ring));burst(ps[0],ps[1],'#8be9ff',6,1.4);}
const BOSSES={
 core:{cd:2.2,heat:1,beam:true,beamFrom:2,beamSpd:1.3,
   pulse(ph){if(ph>=1)drill.rad=Math.max(R_CORE+TILE*0.4,drill.rad-14);}},
 inferno:{cd:2.0,heat:1.5,beam:false,beamFrom:9,beamSpd:0,
   /* Eruption: molten rock blooms around you and STAYS. The longer the fight
      runs the less floor is safe, so Inferno is a fight against the clock in a
      way none of the others are. */
   pulse(ph){const [r,s]=bossRingSec();
     const n=3+ph*2;
     for(let k=0;k<n;k++){const rr=r+Math.floor(rnd()*5)-2,ss=sectorOf(drill.ang+(rnd()-0.5)*0.5,clamp(rr,0,RINGS-1));
       igniteTile(clamp(rr,0,RINGS-1),ss);}
     flash=Math.max(flash,0.45);}},
 frost:{cd:2.4,heat:0.4,beam:false,beamFrom:9,beamSpd:0,
   /* Containment: the guardian freezes your own shaft shut. The threat is not
      damage, it is being walled in — you have to keep cutting a way out while
      it keeps sealing it. */
   pulse(ph){run.frostT=Math.max(run.frostT,1.6+ph*0.4);
     const [r,s]=bossRingSec(),n=4+ph*3;
     for(let k=0;k<n;k++){const rr=clamp(r+Math.floor(rnd()*7)-3,0,RINGS-1);
       sealTile(rr,sectorOf(drill.ang+(rnd()-0.5)*0.7,rr));}
     sfx.rare();}},
 tech:{cd:2.1,heat:1,beam:true,beamFrom:1,beamSpd:2.1,
   // Deploys its own drones and browns out your tank on every beat.
   pulse(ph){run.energy=Math.max(0,run.energy-(18+ph*10));
     for(let k=0;k<1+ph;k++)spawnCreature('sentinel',1);
     sfx.deny();lootNum(W/2,DRILL_SY-30,'-'+(18+ph*10)+' Sprit','#2de2e6',0);}},
 void:{cd:2.3,heat:1,beam:true,beamFrom:2,beamSpd:1.1,
   // Never stops pulling; at full rage it throws you sideways as well.
   pulse(ph){drill.rad=Math.max(R_CORE+TILE*0.4,drill.rad-26);
     if(ph>=2){drill.ang+=(rnd()-0.5)*1.1;snapCamera();
       for(let i=0;i<10;i++)burst(W/2,DRILL_SY,'#8a5cff',2,2);glitch=Math.max(glitch,0.5);}},
   tick(ph,dt){drill.rad=Math.max(R_CORE+TILE*0.4,drill.rad-(6+ph*4)*dt);}},
 hive:{cd:2.0,heat:1,beam:false,beamFrom:9,beamSpd:0,
   // Floods the chamber with this world's own fauna instead of hitting you.
   pulse(ph){const nat=faunaOf();
     for(let k=0;k<2+ph;k++)spawnCreature(nat&&rnd()<0.6?nat:(rnd()<0.5?'swift':'crawler'),1);}},
};
function bossDef(){return BOSSES[P.bossType||'core']||BOSSES.core;}
const BOSSINFO={
 inferno:['🔥 Infernus','Lässt bei jedem Puls Lava um dich aufblühen — sie bleibt liegen.',
          '🔥 Infernus','Blooms lava around you on every pulse — and it stays.'],
 frost:  ['❄️ Frostwächter','Friert deinen eigenen Schacht zu. Die Gefahr ist das Eingemauertwerden.',
          '❄️ Frost Warden','Freezes your own shaft shut. The danger is being walled in.'],
 tech:   ['📡 Konstrukt','Laser ab Phase 1, setzt Wachdrohnen ab und zapft den Tank an.',
          '📡 Construct','Laser from phase 1, deploys sentinels and taps your tank.'],
 void:   ['🌀 Leerenschlund','Zieht dich ununterbrochen in den Kern und wirft dich zuletzt herum.',
          '🌀 Void Maw','Drags you into the core without pause, then throws you around.'],
 hive:   ['🐝 Brutstock','Flutet die Kammer mit der Fauna dieser Welt.',
          '🐝 Hive Mind','Floods the chamber with this world\'s own fauna.'],
 core:   ['💠 Kernwächter','Puls und Sog, ab Phase 2 ein rotierender Laser.',
          '💠 Core Guardian','Pulse and pull, plus a rotating laser from phase 2.'],
};
function dossierRows(p,de){
  const rows=[];const L=(a,b)=>de?a:b;
  // --- rock, using the very thresholds genTile applies ---
  const depth=(f)=>Math.round(f*(p.rings-1));
  rows.push({h:L('Aufbau','Structure'),lines:[
    L('Schachttiefe: ','Shaft depth: ')+p.rings+' m',
    L('Erdreich bis ','Topsoil to ')+depth(0.15)+' m · '+L('Gestein bis ','Stone to ')+depth(0.38)+' m',
    L('Hartgestein bis ','Hard rock to ')+depth(0.62)+' m · '+L('Dunkelfels ab ','Darkrock from ')+depth(0.62)+' m',
    L('Wächter-Schicht: die innersten ','Guardian layer: the innermost ')+(p.bossRings||2)+' '+L('Ringe','rings'),
  ]});
  rows.push({h:L('Werte','Numbers'),lines:[
    L('Härte ×','Hardness x')+p.hardMul.toFixed(1)+'  ·  '+L('Hitze ×','Heat x')+p.heatMul.toFixed(1)+'  ·  '+L('Erzwert ×','Ore value x')+p.valueMul.toFixed(1),
  ]});
  // --- ore, from the same depth gates genTile uses ---
  rows.push({h:L('Erz','Ore'),lines:[
    'Scrap $'+RES.ferrite.value+' · Copper $'+RES.cuprite.value+' '+L('ab ','from ')+depth(0.13)+' m',
    'Shard $'+RES.crystal.value+' '+L('ab ','from ')+depth(0.32)+' m · Core $'+RES.core.value+' '+L('ab ','from ')+depth(0.55)+' m',
    'Relic $'+RES.artifact.value+' '+L('ab ','from ')+depth(0.78)+' m',
    p.veins?L('Adern: doppelt so dicht wie sonst.','Veins: twice as dense as elsewhere.'):'',
  ].filter(Boolean)});
  // --- hazards, straight off the flags ---
  const hz=[];
  if(p.lava)hz.push(L('🌋 Lavaadern (~'+Math.round(p.lava*100)+' % der Felder): +22 Hitze beim Durchbohren, danebenstehen kocht weiter.',
                      '🌋 Lava veins (~'+Math.round(p.lava*100)+'% of tiles): +22 heat when cut, standing next to one keeps cooking.'));
  if(p.regrow)hz.push(L('🧊 Der Schacht wächst nach '+p.regrow+' s wieder zu (weicher, 55 % HP).',
                        '🧊 The shaft closes again after '+p.regrow+'s (softer, 55% hp).'));
  if(p.dark)hz.push(L('🌑 Dunkelheit: die Lampe schrumpft mit der Tiefe.','🌑 Darkness: your lamp shrinks as you descend.'));
  if(p.sentry)hz.push(L('📡 Wachtürme (~'+(p.sentry*100).toFixed(1)+' %): saugen 7 Sprit/Sek. ab, 1,8× gepanzert.',
                        '📡 Sentries (~'+(p.sentry*100).toFixed(1)+'%): drain 7 fuel/s, 1.8x armoured.'));
  if(p.resonance)hz.push(L('🔷 Resonanz: gleiches Gestein zerspringt in Ketten mit.','🔷 Resonance: matching rock shatters along with it.'));
  if(p.brittle)hz.push(L('💎 Sprödes Gestein: 35 % Chance, einen Nachbarn gratis mitzunehmen.','💎 Brittle rock: 35% chance to take a neighbour for free.'));
  if(p.gasChance)hz.push(L('💨 Gastaschen (~'+Math.round(p.gasChance*100)+' %): +16 Hitze und eine Kettendetonation.',
                           '💨 Gas pockets (~'+Math.round(p.gasChance*100)+'%): +16 heat and a chain detonation.'));
  if(p.caveChance)hz.push(L('🪨 Einstürze (~'+Math.round(p.caveChance*100)+' %): +10 Hitze, die Decke fällt nach.',
                            '🪨 Cave-ins (~'+Math.round(p.caveChance*100)+'%): +10 heat, the ceiling comes down.'));
  rows.push({h:L('Gefahren','Hazards'),lines:hz.length?hz:[L('Keine besonderen Gefahren — die Lernwelt.','No special hazards — the world you learn on.')]});
  /* Creatures: the three universal species plus whatever this world fields of
     its own. Read straight off SPECIES and PLANET_FAUNA, so adding a species
     cannot leave the dossier describing a bestiary that no longer exists. */
  const roster=['crawler','swift','brute'];
  const native=PLANET_FAUNA[p.id];if(native)roster.push(native);
  rows.push({h:L('Kreaturen','Creatures'),lines:roster.map(id=>{
    const sp=SPECIES[id],mark=id===native?' ★':'';
    return specLine(id,de)+' '+L('(ab ','(from ')+sp.from+' m)'+mark;
  }).concat(native?[L('★ nur auf dieser Welt','★ only on this world')]:[])});
  const bi=BOSSINFO[p.bossType||'core'];
  rows.push({h:L('Wächter','Guardian'),lines:[de?(bi[0]+' — '+bi[1]):(bi[2]+' — '+bi[3])]});
  return rows;}
function openDossier(p){const de=settings.lang!=='en';
  const globe='radial-gradient(circle at 68% 72%, '+p.ground[2]+' 0 7%, transparent 8%),'+
    'radial-gradient(circle at 44% 62%, '+p.ground[2]+' 0 4%, transparent 5%),'+
    'radial-gradient(circle at 28% 24%, '+p.ground[1]+' 0 9%, transparent 11%),'+
    'radial-gradient(circle at 34% 30%, '+p.ground[1]+', '+p.ground[0]+' 52%, '+p.ground[2]+' 100%)';
  document.getElementById('dosGlobe').style.cssText=
    'width:64px;height:64px;border-radius:50%;flex:0 0 auto;background:'+globe+
    ';border:2px solid '+p.core+';box-shadow:inset -7px -7px 12px rgba(0,0,0,.65),0 0 16px '+p.core+'88;';
  document.getElementById('dosTag').textContent='// '+(de?'dossier':'dossier')+' //';
  document.getElementById('dosTag').style.color=p.core;
  document.getElementById('dosName').textContent=p.name;
  document.getElementById('dosName').style.color=p.core;
  const tag=PLANET_TAG[p.id];
  document.getElementById('dosFlavour').textContent=tag?(de?tag[0]:tag[1]):'';
  const body=document.getElementById('dosBody');body.innerHTML='';
  for(const r of dossierRows(p,de)){
    const sec=document.createElement('div');
    sec.innerHTML='<div style="font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;color:'+p.core+';margin-bottom:4px;">'+r.h+'</div>'+
      r.lines.map(l=>'<div style="font-size:11.5px;line-height:1.5;color:#d7d0e4;">'+l+'</div>').join('');
    body.appendChild(sec);}
  hide('planetOver');show('dossierOver');sfx.ui();}
// animated reveal when a new planet is unlocked
function showCutscene(p){const de=settings.lang!=='en';
  const globe='radial-gradient(circle at 68% 72%, '+p.ground[2]+' 0 7%, transparent 8%),'+
    'radial-gradient(circle at 44% 60%, '+p.ground[2]+' 0 4%, transparent 5%),'+
    'radial-gradient(circle at 30% 26%, '+p.ground[1]+' 0 10%, transparent 12%),'+
    'radial-gradient(circle at 34% 30%, '+p.ground[1]+', '+p.ground[0]+' 52%, '+p.ground[2]+' 100%)';
  const gl=document.getElementById('cutGlobe');gl.style.background=globe;
  gl.style.border='3px solid '+p.core;gl.style.boxShadow='inset -14px -14px 26px rgba(0,0,0,.6),0 0 46px '+p.core+'cc';
  const nm=document.getElementById('cutName');nm.textContent=p.name;nm.style.textShadow='4px 4px 0 '+p.core+',-3px -3px 0 #2de2e6';
  document.getElementById('cutTag').textContent=(PLANET_TAG[p.id]?(de?PLANET_TAG[p.id][0]:PLANET_TAG[p.id][1]):'')+
    (PLANET_RULE[p.id]?'  ·  '+(de?PLANET_RULE[p.id][0]:PLANET_RULE[p.id][1]):'');
  sfx.leg();vibe([20,40,20,60,120]);flash=Math.max(flash,0.4);show('cutOver');}

/* ===================== TUTORIAL (multi-step onboarding) ===================== */
const TUTSTEPS=[
 {ic:'🕹️', de:['Steuerung','Finger unten aufsetzen und ziehen: RUNTER bohrt in den Planeten, HOCH fliegt raus ins All, SEITLICH fliegt um den Planeten.'],
           en:['Controls','Touch the lower screen and drag: DOWN drills in, UP flies out to space, SIDEWAYS orbits the planet.']},
 {ic:'🔥', de:['Sprit & Hitze','Beides verbraucht sich NUR beim Bohren. Lässt du los, kühlt der Bohrer ab. Leerer Tank oder 100 % Hitze = Run vorbei.'],
           en:['Fuel & Heat','Both are spent ONLY while cutting rock. Ease off and the drill cools down. Empty tank or 100% heat ends the run.']},
 {ic:'⚡', de:['Overdrive','Ab 70 % Hitze bohrst du schneller und Erz wird deutlich mehr wert — je heißer, desto besser. Bei 100 % ist der Run vorbei. Das ist die Gier-Entscheidung des Spiels.'],
           en:['Overdrive','Past 70% heat you cut faster and ore is worth far more — the hotter the better. At 100% the run is over. That trade is the heart of the game.']},
 {ic:'⏏', de:['Der Rückweg ist gratis','Hochfahren durch deinen eigenen Schacht kostet nichts. Extrahiere mit ⏏ und du behältst alles. Stirbst du, rettet die Bergungsdrohne nur 40 %.'],
           en:['Going back up is free','Climbing your own shaft costs nothing. Extract with ⏏ and you keep everything. Die, and the salvage drone recovers just 40%.']},
 {ic:'🌳', de:['Aufrüsten','Beim Extrahieren wird Loot zu Cash. Kauf Skills im Baum, bau Module & Refinerie-Boni. Jedes Upgrade verändert, wie du gräbst.'],
           en:['Upgrade','Extracting turns loot into cash. Buy skills in the tree, craft modules & refinery bonuses. Every upgrade changes how you dig.']},
 {ic:'🧭', gate:'exped', de:['Expedition','Der zweite Modus: Du tauchst durch Sektoren. Alle paar Meter wartet eine Station — Tank voll, Bohrer kalt, und ein Händler mit Relikten, die es im Baum nicht gibt. Bezahlt wird mit deiner Beute, also: mitnehmen oder tiefer gehen?'],
           en:['Expedition','The second mode: you dive through sectors. Every few metres a station waits — full tank, cold drill, and a trader selling relics the tree never offers. You pay with your haul, so: bank it or go deeper?']},
 {ic:'🪐', de:['Dein Ziel','Bohr tiefer durch 9 Welten bis zum glühenden Kern — überlebe Bosse, Wetter und Kreaturen und werde übermächtig. Am Kern wartet die nächste Schicht: härter, reicher, endlos.'],
           en:['Your Goal','Drill deeper through 9 worlds to the molten core — survive bosses, weather and creatures. At the core the next layer waits: harder, richer, endless.']},
];
let tutIndex=0,tutDeck=TUTSTEPS;
/* The deck is filtered, not fixed. Teaching Expedition in minute one describes a
   mode the player cannot open yet and has no frame for — it is noise in the exact
   moment attention is scarcest. That card is dealt later, on its own, the first
   time the mode actually unlocks. */
function tutFor(gate){return TUTSTEPS.filter(s=>!s.gate||s.gate===gate);}
function renderTut(){const de=settings.lang!=='en',s=tutDeck[tutIndex];
  document.getElementById('tutIcon').textContent=s.ic;
  document.getElementById('tutTitle').textContent=de?s.de[0]:s.en[0];
  document.getElementById('tutBody').textContent=de?s.de[1]:s.en[1];
  document.getElementById('tutDots').innerHTML=tutDeck.map((_,i)=>
    '<span style="width:9px;height:9px;border-radius:50%;background:'+(i===tutIndex?'#ffd23f':'#4a4458')+'"></span>').join('');
  document.getElementById('btnTutNext').textContent=(tutIndex>=tutDeck.length-1)?(de?'Los geht\'s':'Let\'s go'):(de?'Weiter':'Next');
  document.getElementById('btnTutSkip').textContent=de?'Überspringen':'Skip';}
function openTut(from,gate){backTo=from||'titleOver';hide(backTo);
  tutDeck=gate?TUTSTEPS.filter(s=>s.gate===gate):tutFor(null);
  if(!tutDeck.length)tutDeck=TUTSTEPS;
  tutIndex=0;renderTut();show('tutOver');}
function finishTut(){hide('tutOver');show(backTo);meta.tutorialSeen=true;saveMeta();
  if(backTo==='titleOver')refreshMenu();}

/* ===================== COMPENDIUM (records + codex) ===================== */
function codexHead(txt,col){return '<div style="width:100%;margin:12px 0 2px;font-family:ui-monospace,Menlo,monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:'+(col||'#ffd23f')+'">'+txt+'</div>';}
function codexRow(ic,iccol,title,sub,right,rcol){return '<div class="pcard">'+
  '<span style="font-size:19px;width:30px;text-align:center;color:'+(iccol||'#fff')+'">'+ic+'</span>'+
  '<span class="pt"><b>'+title+'</b>'+(sub?'<span>'+sub+'</span>':'')+'</span>'+
  (right!==''?'<span class="ps" style="color:'+(rcol||'#2de2e6')+'">'+right+'</span>':'')+'</div>';}
function buildCompendium(){const de=settings.lang!=='en',st=meta.stats;let h='';
  h+=codexHead(de?'Rekorde':'Records','#ffd23f');
  h+=codexRow('🏆','#ffd23f',de?'Beste Tiefe':'Best depth','',st.bestDepth+'m');
  h+=codexRow('💰','#12d9b0',de?'Gesamt verdient':'Total earned','',money(st.totalEarned));
  h+=codexRow('🚀','#2de2e6',de?'Runs gespielt':'Runs played','',st.runs);
  h+=codexRow('📋','#ff4de0',de?'Kontrakte erfüllt':'Contracts done','',st.contractsDone||0);
  h+=codexRow('🟣','#8a5cff',de?'Relikte gefunden':'Relics found','',st.relics||0);
  h+=codexRow('💠','#2de2e6',de?'Wächter besiegt':'Guardians beaten','',st.guardianKills||0);
  h+=codexRow('🔗','#8be9ff',de?'Beste Combo':'Best combo','','×'+(st.maxCombo||0));
  h+=codexRow('🏁','#ff4de0',de?'Challenge-Bestwert':'Challenge best','',meta.challenge.best||0);
  h+=codexRow('🧭','#39ff14',de?'Tiefste Schicht':'Deepest layer','',(st.expBest||0));
  h+=codexRow('🗺️','#39ff14',de?'Sektoren erreicht':'Sectors reached','',(st.expSectors||0));
  h+=codexRow('💠','#8a5cff',de?'Relikte gekauft':'Relics bought','',(st.relicsBought||0));
  h+=codexRow('⚔️','#ff3b6b',de?'Kreaturen erlegt':'Creatures killed','',(st.kills||0));
  h+=codexHead(de?'Planeten-Rekorde':'Planet records','#12d9b0');
  PLANETS.forEach(p=>{const own=meta.unlockedPlanets.includes(p.id);
    h+=codexRow('🪐',p.core,p.name,own?'':(de?'gesperrt':'locked'),(meta.records[p.id]||0)+'m');});
  h+=codexHead(de?'Erze':'Ores','#ffd23f');
  const rn={common:de?'Gewöhnlich':'Common',uncommon:de?'Ungewöhnlich':'Uncommon',rare:de?'Selten':'Rare',legendary:de?'Legendär':'Legendary'};
  for(const k in RES){const r=RES[k];h+=codexRow('◆',r.color,r.name,rn[r.rar],r.value+'$','#ffd23f');}
  /* Bestiary. Derived from SPECIES, and gated on what you have actually killed:
     an unmet species shows as a silhouette with only its home world named. That
     turns the creature list from a wiki page into something you fill in, and it
     is why the four bestiary achievements have anything to chase.
     The old version was three hand-written lines that had been wrong since the
     fauna rework — eleven species described as three, with damage figures that
     no longer scaled. */
  const seen=meta.stats.species||{};
  const known=Object.keys(seen).length;
  h+=codexHead((de?'Bestiarium':'Bestiary')+' '+known+'/'+Object.keys(SPECIES).length,'#ff3b6b');
  const homeOf={};for(const k in PLANET_FAUNA)homeOf[PLANET_FAUNA[k]]=k;
  for(const id in SPECIES){const sp=SPECIES[id],got=seen[id]||0;
    const home=homeOf[id],pl=home?PLANETS.find(x=>x.id===home):null;
    if(got){
      h+=codexRow(sp.ic,sp.col,specName(id,de),
        sp.dmg+(de?' Hitze · ':' heat · ')+sp.hp+(de?' Treffer · $':' hp · $')+sp.pay+
        (sp.trait?' · '+(de?TRAIT_TXT[sp.trait][0]:TRAIT_TXT[sp.trait][1]):'')+
        (pl?' · '+pl.name:''),
        '×'+got,'#12d9b0');
    }else{
      h+=codexRow('❔','#4a4459',de?'Unbekannt':'Unknown',
        pl?(de?'Nur auf ':'Only on ')+pl.name:(de?'Überall anzutreffen':'Found everywhere'),
        '—');}}
  h+=codexHead(de?'Kern-Wächter':'Core Guardians','#ff8a3d');
  const guardHome={};PLANETS.forEach(p2=>{const bt=p2.bossType||'core';(guardHome[bt]=guardHome[bt]||[]).push(p2.name);});
  for(const bt in BOSSES){const bi=BOSSINFO[bt];if(!bi)continue;
    const col=bt==='inferno'?'#ff6a00':bt==='frost'?'#8be9ff':bt==='tech'?'#2de2e6':bt==='void'?'#8a5cff':bt==='hive'?'#3fd977':'#ff8a3d';
    h+=codexRow('💠',col,(de?bi[0]:bi[2])+(guardHome[bt]?' · '+guardHome[bt].join(', '):''),
      de?bi[1]:bi[3],'');}
  /* Relics never appeared here at all, so the only way to learn the pool was to
     meet each one at a trader mid-run and decide on the spot. */
  h+=codexHead((de?'Relikte':'Relics')+' · '+RELIC_SLOTS+(de?' Plätze':' slots'),'#8a5cff');
  RELICS.forEach(r=>h+=codexRow(r.ic,'#8a5cff',relicName(r),relicDesc(r),''));
  h+=codexHead(de?'Synergien':'Synergies','#ff4de0');
  SYNERGIES.forEach(y=>{const parts=y.need.map(n=>{const r=relicById(n);return r?r.ic+' '+relicName(r):n;});
    h+=codexRow(y.ic,'#ff4de0',synName(y),parts.join(' + ')+' → '+synDesc(y),'');});
  h+=codexHead(de?'Welt-Regeln':'World rules','#39ff14');
  PLANETS.forEach(p2=>{const rl=PLANET_RULE[p2.id];
    h+=codexRow('🪐',p2.core,p2.name,rl?(de?rl[0]:rl[1]):(de?'Keine Sonderregel':'No special rule'),'');});
  h+=codexHead(de?'Wetter-Events':'Weather events','#c9a24d');
  for(const k in EVENTINFO){const e=EVENTINFO[k];h+=codexRow('⚠',e.col,de?e.de:e.en,'',e.dur+'s',e.col);}
  document.getElementById('codexList').innerHTML=h;}
function openCompendium(from){backTo=from;hide(from);show('codexOver');buildCompendium();}

/* ---------- ASCENSION BOARD ---------- */
function buildPerks(){const de=settings.lang!=='en';
  document.getElementById('perkFree').textContent=shardsFree();
  document.getElementById('perkSpent').textContent=(meta.ascend&&meta.ascend.spent)||0;
  const box=document.getElementById('perkList');box.innerHTML='';
  for(const d of ASCPERKS){
    const lv=perkLvl(d.id),next=perkNext(d.id),maxed=next===null,afford=!maxed&&shardsFree()>=next;
    const b=document.createElement('button');
    b.className='mbtn';
    b.style.cssText='justify-content:space-between;text-align:left;padding:11px 13px;'+
      (maxed?'border-color:#12d9b0;color:#12d9b0;opacity:.75;'
            :afford?'border-color:#ff4de0;color:#ff4de0;box-shadow:4px 4px 0 rgba(255,77,224,.28);'
                   :'opacity:.5;');
    b.innerHTML='<span style="display:flex;flex-direction:column;gap:3px;">'+
      '<span style="font-size:12px;">'+d.ic+' '+perkName(d)+(d.lvl>1?' '+lv+'/'+d.lvl:'')+'</span>'+
      '<span style="font-size:10px;letter-spacing:.04em;color:#9a90ad;text-transform:none;">'+perkDesc(d)+'</span></span>'+
      '<span style="font-size:13px;">'+(maxed?'✓':'✦'+next)+'</span>';
    b.disabled=maxed||!afford;
    b.onclick=()=>{if(buyPerk(d.id)){sfx.buy();haptic('success');buildPerks();updateAbilityButtons();}else sfx.deny();};
    box.appendChild(b);}
  const sub=document.getElementById('perkSub');
  sub.textContent=shardsFree()>0
    ?(de?'Splitter überleben jedes Prestige. Gib sie aus — die Wahl bleibt für immer.'
        :'Shards survive every prestige. Spend them — the choice is permanent.')
    :(de?'Keine freien Splitter. Steige erneut auf, um weiter auszubauen.'
        :'No free shards. Ascend again to keep building.');}
function openPerks(from){backTo=from;hide(from);show('perkOver');buildPerks();}

/* ===================== UPDATE ===================== */
let curDt=0.016;
function update(dt){curDt=dt;updateCamera(dt);if(!run.active||run.paused)return;
  let vx=0,vy=0,mag=0;const kv=kbVec();
  // smooth the stick: the drill eases into motion and coasts out of it
  const sm=Math.min(1,dt*17);
  input.sdx+=(input.dx-input.sdx)*sm;input.sdy+=(input.dy-input.sdy)*sm;
  input.smag+=((input.active?input.mag:0)-input.smag)*sm;
  if(input.tapT>0)input.tapT=Math.max(0,input.tapT-dt);
  if(input.smag>0.004){vx=input.sdx;vy=input.sdy;mag=input.smag;const d=Math.hypot(vx,vy)||1;vx/=d;vy/=d;}
  else if(kv){vx=kv.dx;vy=kv.dy;mag=1;}
  run.boostT=Math.max(0,run.boostT-dt);
  /* REAL CRITS. `crit` used to be a flat, permanent, invisible damage multiplier
   * (POW = power × (1 + crit)) while every label in the game promised the player
   * "+50 % Kritisch" — a mechanic that was advertised and never actually happened.
   * Now it is rolled on a 0.26 s cadence: each whole point of crit is one extra
   * damage multiple, the fraction is the chance of one more. Expected damage over
   * time is identical to the old constant (E[1+hits] = 1+crit), so nothing in the
   * balance moves — but crits now land as events you see, hear and feel.
   * The cadence matters: rolling per frame at 60 fps would be a strobe, not a hit. */
  run.critT=(run.critT||0)-dt;
  if(run.critT<=0){run.critT=0.26;
    const c=S.crit,g=Math.floor(c),hits=g+(rnd()<c-g?1:0);
    run.critMul=1+hits;
    if(hits>0&&drilling){run.critFx=0.26;sfx.crit(hits);haptic(hits>1?'heavy':'medium');
      shake=Math.max(shake,3.5+hits*2.2);}
  }
  if(run.critFx>0)run.critFx=Math.max(0,run.critFx-dt);
  const boosting=run.boostT>0;POW=S.power*(boosting?2.6:1)*(run.critMul||1);
  // impact factor: faster movement (incl. Speed-Skills & Boost) = harder hit on the planet
  moveMag=Math.min(1,mag*(boosting?1.5:1)*(0.7+S.speed/700));
  // weather-event modifiers
  let evSpeed=1,evHeat=1,evMag=1,evSpawn=1;
  if(run.event){const et=run.event.type;
    if(et==='frost'){evSpeed=0.55;evHeat=0;}else if(et==='magma')evHeat=2.2;
    else if(et==='surge')evMag=0;else if(et==='spore')evSpawn=3;}
  if(run.frostT>0)evSpeed=Math.min(evSpeed,0.5);
  /* OVERDRIVE: past 70 % the drill bites harder and ore is worth more, scaling
   * all the way to the red line. Heat used to be nothing but a clock counting
   * down to your death — a mechanic whose only job was to stop you playing.
   * Now running hot is the greedy line you choose to walk, and the vent is the
   * brake you decide when to pull. Same numbers, opposite feeling. */
  const ovrFrom=S.ovrFrom||OVR_FROM;
  run.ovr=run.heat>ovrFrom?Math.min(1,(run.heat-ovrFrom)/(95-ovrFrom)):0;
  const throttled=run.heat>=95,spd=S.speed*(throttled?0.35:1+OVR_SPD*run.ovr)*(boosting?1.4:1)*evSpeed*cmul('speed');
  drilling=false;
  // radial: screen-down (vy>0) digs inward (rad decreases); up flies out
  moveRadial(-vy*mag*spd*dt);
  // angular: fast free orbit in space, tangential dig on surface
  const inSpace=drill.rad>=R_SURF-1;
  const dAng=inSpace? (vx*mag*1.5*dt) : (vx*mag*spd*dt/Math.max(R_CORE,drill.rad));
  moveAngular(dAng);
  if(mag>0.05){drill.face=Math.atan2(vy,vx);}
  // FUEL & HEAT are a one-way budget per run — no regen, no cooling.
  /* Regrowth tick. A tile only closes if the drill is not standing in it —
     otherwise the world would seal around you and you would be mining your way
     out of a block you never left. Regrown rock comes back soft (55 % hp) so
     re-cutting a path home is a cost, not a wall. */
  if(P.regrow&&regrow.length){
    const dr=clamp(ringOf(drill.rad),0,RINGS-1),dsec=sectorOf(drill.ang,dr);
    for(let i=regrow.length-1;i>=0;i--){const g=regrow[i];g.t-=dt;
      if(g.t>0)continue;
      regrow.splice(i,1);
      if(g.ring===dr&&g.sec===dsec)continue;                  // never seal the player in
      if(isStationRing(g.ring))continue;                      // stations stay open
      if(world.get(key(g.ring,g.sec))!==null)continue;         // already refilled
      const hp=HARD[g.rock]*P.hardMul*cmul('hard')*expHard()*0.55;
      world.set(key(g.ring,g.sec),{rock:g.rock,res:null,hp,maxhp:hp,regrown:true});
      const pr=w2s(R_CORE+(g.ring+0.5)*TILE,(g.sec+0.5)*dsecOf(g.ring));
      if(rnd()<0.5)burst(pr[0],pr[1],P.ground[1],3,0.8);}}
  /* MECHON sentries: a live sentry next to you siphons fuel every second until
     you cut it out. Its tile is armoured, so the decision is real — spend the
     fuel to kill it, or spend the fuel running past it. */
  if(P.sentry){const sr=clamp(ringOf(drill.rad),0,RINGS-1),ss=sectorOf(drill.ang,sr);
    let drain=0;
    for(const nn of neighborsOf(sr,ss)){const nt=world.get(key(nn[0],nn[1]));if(nt&&nt.sentry)drain++;}
    const here=world.get(key(sr,ss));if(here&&here.sentry)drain++;
    if(drain){run.energy=Math.max(0,run.energy-drain*7*dt);
      run.sentryT=(run.sentryT||0)-dt;
      if(run.sentryT<=0){run.sentryT=0.5;sfx.deny();haptic('warning');
        burst(W/2+(rnd()-0.5)*26,DRILL_SY+(rnd()-0.5)*20,'#2de2e6',4,1.2);}}}
  /* Lava you are standing next to keeps cooking you even if you never cut it. */
  if(P.lava){const lr=clamp(ringOf(drill.rad),0,RINGS-1),ls=sectorOf(drill.ang,lr);
    let near=0;for(const nn of neighborsOf(lr,ls)){const nt=world.get(key(nn[0],nn[1]));if(nt&&nt.lava)near++;}
    if(near){run.heat=Math.min(99,run.heat+near*5.5*dt);
      if(rnd()<near*0.9*dt*8)burst(W/2+(rnd()-0.5)*30,DRILL_SY+(rnd()-0.5)*24,'#ffb03d',2,1.1);}}
  /* The engine voice follows the drill instead of the drill spraying one-shots.
     It fades in while cutting, fades out the instant you ease off, and its pitch
     and filter ride Overdrive — so the machine audibly strains before the HUD
     has to tell you anything. */
  engineSet(drilling?Math.min(1,0.45+moveMag*0.55):0,run.ovr);
  // one snarl on crossing INTO the Overdrive band, so the state has an onset
  if(run.ovr>0.02&&!run.ovrOn){run.ovrOn=true;sfx.ovr();haptic('heavy');}
  else if(run.ovr<=0.001&&run.ovrOn)run.ovrOn=false;
  if(drilling){run.energy-=(3.4+S.power/22)*(1+0.5*run.ovr)*dt;
    if(S.regenWhileCut&&S.energyRegen>0){const lim=S.energyMax*REGEN_CAP;
      if(run.energy<lim)run.energy=Math.min(lim,run.energy+S.energyRegen*S.regenWhileCut*dt);}run.heat+=S.heatGen*P.heatMul*evHeat*cmul('heat')*dt*(run.freezeT>0?0:1);if(rnd()<0.35)sfx.tick();
    // continuous drilling rumble — stronger the faster you go
    run.buzzT=(run.buzzT||0)-dt;if(run.buzzT<=0){run.buzzT=0.09;vibe(Math.round(4+moveMag*11));}
    if(moveMag>0.45){shake=Math.max(shake,moveMag*3.2);
      if(rnd()<moveMag*0.7)burst(W/2+(rnd()-0.5)*14,DRILL_SY+8+(rnd()-0.5)*10,P.ground[1],2,moveMag*1.3);}}
  /* Recovery while the drill is NOT cutting.
   * Heat and fuel stay a one-way budget the moment you are drilling — that
   * tension is the whole game — but easing off lets the machine breathe. This
   * is what turns a 17-second countdown into a rhythm you can play around, and
   * it finally makes the Kühlung and Reaktor upgrades do what the tree already
   * promises: their coolRate/energyRegen were being computed and never applied. */
  if(!drilling){
    /* The vent ramps: the longer you stay off the trigger the harder it blows.
     * Flat cooling made a hot drill cost eight seconds of standing still, which
     * is dead air on a phone. Ramped, the same recovery takes ~3.5 s and the
     * bar visibly accelerates, so easing off reads as an action, not a penalty. */
    run.ventT=(run.ventT||0)+dt;
    const ramp=1+Math.min(1.6,run.ventT*1.3);
    if(run.heat>0)run.heat=Math.max(0,run.heat-(HEAT_VENT+S.coolRate*0.55)*ramp*dt);
    /* The recycler tops you up to REGEN_CAP of the tank and no further. Left
       uncapped it refilled a full tank in the field in under a minute, which
       quietly deleted the only reason to ever go home: fuel stopped being a
       budget and became scenery. Capped, it buys you one more push and still
       makes the surface the only place to fill right up. */
    if(S.energyRegen>0){const lim=S.energyMax*REGEN_CAP;
      if(run.energy<lim)run.energy=Math.min(lim,run.energy+S.energyRegen*dt);}
  }else run.ventT=0;
  // warning haptics when a budget gets critical (fires once per crossing)
  if(run.heat>=90&&!run.warnHeat){run.warnHeat=true;haptic('warning');}else if(run.heat<84)run.warnHeat=false;
  if(run.energy/S.energyMax<=0.15&&!run.warnFuel){run.warnFuel=true;haptic('warning');}else if(run.energy/S.energyMax>0.2)run.warnFuel=false;
  if(run.energy<=0){run.energy=0;gameOver(t('reasonFuel'));return;}
  if(run.heat>=100){run.heat=100;gameOver(t('reasonHeat'));return;}
  // active core guardian: pulses heat + shockwaves while you fight near the core
  const curR=ringOf(drill.rad),bz=(P.bossRings||2)+4;
  run.inBoss=(drill.rad<R_SURF&&curR>=0&&curR<bz);
  if(run.inBoss){const ph=run.bossKills>=8?2:run.bossKills>=3?1:0,B=bossDef();
    run.bossPulseT-=dt;
    /* Telegraph. Every guardian announces its pulse ~0.55 s early with a ring
       and a rising tone, so being hit is a reaction you lost rather than a die
       roll you never saw. Without this the fights are just periodic damage. */
    if(run.bossPulseT<=0.55&&!run.bossTel){run.bossTel=true;
      run.bossWave=Math.min(run.bossWave,0.35);
      blip(vary(180,0.04),0.34,'sawtooth',0.08,520,0.01,0.4);haptic('light');}
    if(run.bossPulseT<=0){run.bossPulseT=B.cd-ph*0.6;run.bossTel=false;
      run.heat=Math.min(99,run.heat+Math.max(1,(8+ph*3)*B.heat*expThreat()-S.heatShield));
      shake=Math.max(shake,14+ph*6);run.bossWave=1;sfx.shock();haptic('heavy');
      if(B.pulse)B.pulse(ph);
      if(ph>=2){for(let i=0;i<14;i++)burst(W/2+(rnd()-0.5)*40,DRILL_SY+(rnd()-0.5)*40,P.core,1,2);flash=Math.max(flash,0.4);vibe([25,50,25,80]);}}
    if(B.tick)B.tick(ph,dt);
    // rotating laser sweep — only the guardians that actually field one
    if(B.beam&&ph>=B.beamFrom){bossBeam+=dt*B.beamSpd;
      if(Math.abs(angDiff(bossBeam,drill.ang))<0.13){run.heat=Math.min(99,run.heat+14*dt);if(rnd()<0.3)burst(W/2,DRILL_SY,P.core,2,1);}}}
  if(run.bossWave>0)run.bossWave=Math.max(0,run.bossWave-dt*0.8);
  const dm=Math.max(0,Math.round((R_SURF-drill.rad)/TILE));if(dm>run.depthMax){run.depthMax=dm;if(dm>meta.stats.bestDepth)meta.stats.bestDepth=dm;checkAchievements();
    // core first: reaching it outranks a station that would land on the same metre
    if(run.exp&&!run.exp.tierDone&&dm>=RINGS-(P.bossRings||2)-1){run.exp.tierDone=true;openDeep();}
    else if(run.exp&&dm>=run.exp.nextZone)enterZone();}
  if(run.shockCd>0)run.shockCd=Math.max(0,run.shockCd-dt);
  if(run.boostCd>0)run.boostCd=Math.max(0,run.boostCd-dt);
  if(run.laserCd>0)run.laserCd=Math.max(0,run.laserCd-dt);
  if(run.magCd>0)run.magCd=Math.max(0,run.magCd-dt);
  if(run.tpCd>0)run.tpCd=Math.max(0,run.tpCd-dt);
  if(run.freezeCd>0)run.freezeCd=Math.max(0,run.freezeCd-dt);
  if(run.nukeCd>0)run.nukeCd=Math.max(0,run.nukeCd-dt);
  if(run.freezeT>0){run.freezeT=Math.max(0,run.freezeT-dt);run.heat=Math.max(0,run.heat-dt*30);}  // Cryo-Vent window: fast cooling
  if(run.comboT>0){run.comboT-=dt;if(run.comboT<=0)run.combo=0;}                                    // streak lapses if you stop
  if(run.frostT>0)run.frostT=Math.max(0,run.frostT-dt);
  // weather events: schedule, run, resolve
  run.eventCd-=dt;
  if(!run.event&&run.eventCd<=0&&run.depthMax>10&&drill.rad<R_SURF)startEvent();
  if(run.event){run.event.t-=dt;
    if(run.event.type==='void')drill.rad=Math.max(R_CORE,drill.rad-10*dt);                          // void pull drags you inward
    if(run.event.type==='quake'){if(rnd()<dt*2.2)shake=Math.max(shake,9);
      if(rnd()<dt*0.6){const cr=clamp(ringOf(drill.rad),0,RINGS-1),rr=clamp(cr-1-((rnd()*2)|0),0,RINGS-1);
        mineTile(rr,sectorOf(drill.ang,rr),9999);run.heat=Math.min(99,run.heat+2);}}                 // falling debris
    if(run.event.t<=0){run.event=null;run.eventCd=13+rnd()*10;}}
  if(laserFx>0)laserFx=Math.max(0,laserFx-dt);
  // combat drones: periodically auto-mine a nearby tile
  if(S.dronemine){run.droneTimer=(run.droneTimer||0)-dt;if(run.droneTimer<=0){run.droneTimer=S.droneFast?0.16:0.32;
    const cr=clamp(ringOf(drill.rad),0,RINGS-1),dr=clamp(cr+(Math.floor(rnd()*5)-2),0,RINGS-1);
    const n=secCount(dr),ds=((sectorOf(drill.ang,dr)+Math.floor(rnd()*5)-2)%n+n)%n;
    mineTile(dr,ds,S.power*0.9);}}
  // drops: magnet + collect (polar)
  const drwx=drill.rad*Math.cos(drill.ang),drwy=drill.rad*Math.sin(drill.ang);
  for(let i=drops.length-1;i>=0;i--){const dp=drops[i];dp.t+=dt;
    const dwx=dp.rad*Math.cos(dp.ang),dwy=dp.rad*Math.sin(dp.ang),dist=Math.hypot(drwx-dwx,drwy-dwy);
    if(dist<S.magnet*evMag||dp.got){dp.got=true;dp.rad+=(drill.rad-dp.rad)*Math.min(1,dt*14);dp.ang+=angDiff(drill.ang,dp.ang)*Math.min(1,dt*14);}
    if(dist<22){const rare=RES[dp.id].rar==='rare'||RES[dp.id].rar==='legendary';
      const gain=RES[dp.id].value*lootMul()*(rare?(S.rareMul||1):1);run.haul+=gain;
      run.matsRun[dp.id]=(run.matsRun[dp.id]||0)+1;                                                 // banked on extract, lost on game over
      if(S.fuelOre)run.energy=Math.min(S.energyMax,run.energy+(2+RES[dp.id].value*0.03)*S.fuelOre);  // Brennzelle: ore refuels
      /* Say what the ore was worth. Picking up a relic and a scrap looked and
         sounded near identical, so the whole value curve — rarity, Overdrive,
         combo, planet multiplier — was invisible at the exact moment it paid out.
         Rarer ore floats higher and lives longer. */
      const rr=RES[dp.id].rar,big=rr==='legendary'?2:rr==='rare'?1:0;
      // spawn clear of the pod and of the damage numbers, which sit on the tile
      lootNum(W/2+(rnd()<0.5?-1:1)*(26+rnd()*14),DRILL_SY-30-rnd()*12,
              '+$'+Math.round(gain),RES[dp.id].glow,big);
      burst(W/2,DRILL_SY,RES[dp.id].glow,7,1.1);drops.splice(i,1);}}
  // particles / dmg numbers (screen space)
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.age+=dt;if(p.age>=p.life){killPart(i);continue;}
    p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=380*dt;p.vx*=0.96;}
  for(let i=dmgnums.length-1;i>=0;i--){const d=dmgnums[i];d.age+=dt;
    d.y-=(d.vy||26)*dt;if(d.vy)d.vy*=1-Math.min(0.9,dt*1.6);   // loot text eases to a stop as it fades
    if(d.age>=d.life)dmgnums.splice(i,1);}
  // deep-layer creatures: spawn, home toward the drill, bite if you're not drilling
  /* Deep Layers have to bite back, or "harder and richer" is only richer. Each
     tier raises the cap, the spawn rate and the odds of the nastier species, and
     gives brutes an extra hit point — so an endless expedition eventually kills
     you no matter how good your build is. That ending is the point of the mode. */
  const eT=run.exp?run.exp.tier:1;
  const eCap=Math.min(12,6+(eT-1)*2),eRate=0.6*(1+(eT-1)*0.35);
  if(drill.rad<R_SURF&&run.depthMax>15&&enemies.length<eCap&&rnd()<eRate*dt*evSpawn){
    const roll=rnd(),hard=Math.min(0.55,0.32+(eT-1)*0.07),native=faunaOf();
    // roughly a third of what a world sends at you is its own species
    let ty;
    if(native&&rnd()<0.34)ty=native;
    else ty=(run.depthMax>60&&roll<hard)?'brute':(run.depthMax>30&&roll<0.6)?'swift':'crawler';
    spawnCreature(ty,eT);}
  const drwx2=drill.rad*Math.cos(drill.ang),drwy2=drill.rad*Math.sin(drill.ang);
  for(let i=enemies.length-1;i>=0;i--){const e=enemies[i];e.age+=dt;
    const sp=SPECIES[e.type]||SPECIES.crawler;
    /* Wraiths do not chase, they jump: a blink every ~1.4 s closes most of the
       gap at once, so you cannot simply out-run one — you have to turn and cut. */
    if(sp.trait==='blink'){e.blinkT=(e.blinkT||1.4)-dt;
      if(e.blinkT<=0){e.blinkT=1.4;
        e.rad+=(drill.rad-e.rad)*0.55;e.ang+=angDiff(drill.ang,e.ang)*0.55;
        const bp=w2s(e.rad,e.ang);burst(bp[0],bp[1],sp.col,8,1.3);}}
    else{e.rad+=(drill.rad-e.rad)*Math.min(1,dt*sp.spd);e.ang+=angDiff(drill.ang,e.ang)*Math.min(1,dt*sp.spd);}
    // spore clouds bud off copies if you ignore them — the cost of running past
    if(sp.trait==='bloom'){e.budT=(e.budT||3.2)-dt;
      if(e.budT<=0){e.budT=3.2;if(enemies.length<eCap+2)spawnCreature(e.type,eT,e);}}
    const ewx=e.rad*Math.cos(e.ang),ewy=e.rad*Math.sin(e.ang),ed=Math.hypot(drwx2-ewx,drwy2-ewy);
    e.near=ed;                                      // the renderer needs this for stalkers
    if(ed<26){
      if(drilling||run.boostT>0){                         // hit it back
        e.hp--;burst(W/2,DRILL_SY,sp.col,10,1.4);sfx.brk('hard');vibe(8);
        if(e.hp<=0){
          run.haul+=sp.pay*lootMul();
          if(e.type==='brute')meta.stats.bruteKill=true;
          meta.stats.kills=(meta.stats.kills||0)+1;
          meta.stats.species=meta.stats.species||{};
          if(!meta.stats.species[e.type]){meta.stats.species[e.type]=1;checkAchievements();}
          else meta.stats.species[e.type]++;
          // an ember goes off in your face if you kill it at point blank
          if(sp.trait==='burst'){run.heat=Math.min(99,run.heat+Math.max(0,14-S.heatShield));
            burst(W/2,DRILL_SY,'#ffb03d',24,1.9);shake=Math.max(shake,15);flash=Math.max(flash,0.4);sfx.shock();haptic('heavy');}
          // a prism breaks into two weaker shards
          if(sp.trait==='split'&&!e.shard&&enemies.length<eCap+2){for(let k=0;k<2;k++){const c=spawnCreature(e.type,1,e);if(c){c.shard=true;c.hp=1;}}}
          enemies.splice(i,1);continue;}
        e.rad+=(e.rad<drill.rad?-1:1)*TILE*1.4;           // survivors get knocked back
      }else{                                               // it bites you
        if(sp.trait==='siphon'){                           // sentinels drink fuel, not heat
          run.energy=Math.max(0,run.energy-16*expThreat());
          burst(W/2,DRILL_SY,sp.col,10,1.3);sfx.deny();
        }else{
          run.heat=Math.min(99,run.heat+Math.max(0,sp.dmg*expThreat()-(sp.trait==='freeze'?0:S.heatShield*0.5)));
          burst(W/2,DRILL_SY,sp.col,8,1.2);
        }
        if(sp.trait==='freeze')run.frostT=Math.max(run.frostT,1.8);     // frostlings ice the drive
        if(sp.trait==='thief'){                                          // magnetites rob your magnet
          let taken=0;
          for(let k=drops.length-1;k>=0&&taken<3;k--){if(drops[k].got){drops.splice(k,1);taken++;}}
          if(taken){lootNum(W/2,DRILL_SY-30,'-'+taken+' Erz','#ff6a3d',0);haptic('warning');}}
        shake=Math.max(shake,sp.hp>1?16:10);
        sfx.shock();vibe([15,30]);
        if(sp.hp>1){e.rad+=(e.rad<drill.rad?-1:1)*TILE*1.6;}else{enemies.splice(i,1);continue;}
      }}
    if(e.age>sp.life)enemies.splice(i,1);}
  if(shake>0)shake=Math.max(0,shake-dt*26);
  if(flash>0)flash=Math.max(0,flash-dt*1.6);
  if(glitch>0)glitch=Math.max(0,glitch-dt*1.2);}
function moveRadial(dRad){if(dRad===0)return;const dir=Math.sign(dRad);
  const target=drill.rad+dRad,probe=target+dir*(TILE*0.4),ring=ringOf(probe),sec=sectorOf(drill.ang,clamp(ring,0,RINGS-1));
  const t=tilePolar(ring,sec);
  if(t&&t.wall){drill.rad=Math.max(R_CORE+TILE*0.4,drill.rad);return;}   // core: block
  if(t){drilling=true;drillTile(ring,sec,POW*(run.energy>0?1:0.3)*(t.boss?(1+S.bossPow):1)*curDt);return;} // rock: mine+block
  drill.rad=clamp(target,R_CORE+TILE*0.4,CAP_RAD);}                       // empty/space: move
function moveAngular(dAng){if(dAng===0)return;const dir=Math.sign(dAng);
  const curRing=ringOf(drill.rad);
  if(curRing>=RINGS||curRing<0){drill.ang+=dAng;return;}                  // space/core edge: free
  const sec=sectorOf(drill.ang+dir*(dsecOf(curRing)*0.6)+dAng,curRing),t=tilePolar(curRing,sec);
  if(t&&!t.wall){drilling=true;drillTile(curRing,sec,POW*(run.energy>0?1:0.3)*(t.boss?(1+S.bossPow):1)*curDt);return;}
  drill.ang+=dAng;}

/* ===================== RENDER ===================== */
const ctx=cv.getContext('2d');
let oc,octx,cr_,crc,cb,cbc,vignette=null;
function resize(){const dpr=Math.max(1,Math.min(window.devicePixelRatio||1,3));
  W=window.innerWidth;H=window.innerHeight;DRILL_SY=H*0.42;
  // Backing store at full device resolution -> HUD text, drill, drops, boss laser
  // and overlays render razor-sharp on retina screens instead of being upscaled.
  cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);cv.style.width=W+'px';cv.style.height=H+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);
  PIX=2;LW=Math.ceil(W/PIX);LH=Math.ceil(H/PIX);   // finer -> sharper (still pixel-art)
  oc=mk(LW,LH);octx=oc.getContext('2d');cr_=mk(LW,LH);crc=cr_.getContext('2d');cb=mk(LW,LH);cbc=cb.getContext('2d');
  ctx.imageSmoothingEnabled=false;octx.imageSmoothingEnabled=false;
  vignette=ctx.createRadialGradient(W/2,H*0.46,H*0.28,W/2,H*0.5,H*0.75);
  vignette.addColorStop(0,'rgba(0,0,0,0)');vignette.addColorStop(1,'rgba(0,0,0,0.42)');
  snapCamera();}
function mk(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
window.addEventListener('resize',resize);resize();

const ROCKMUL={dirt:1.0,stone:0.82,hard:0.66,dark:0.5};
function tintc(hex,m){const p=hx(hex);return 'rgb('+Math.min(255,p[0]*m|0)+','+Math.min(255,p[1]*m|0)+','+Math.min(255,p[2]*m|0)+')';}
function shadeFor(ring,sec,rock){const v=hash(ring,sec)%100,base=v<58?P.ground[0]:v<80?P.ground[1]:P.ground[2];
  const dep=1-(RINGS-1-ring)/RINGS*0.33;                 // strata darken toward the core
  return tintc(base,(ROCKMUL[rock]||0.8)*dep);}
function scene(){
  const o=octx,S1=1/PIX;o.imageSmoothingEnabled=false;
  const sh=settings.shake?shake:0,jx=(Math.random()-0.5)*sh*S1,jy=(Math.random()-0.5)*sh*S1;
  o.save();o.translate(jx,jy);
  // space background
  const depthT=Math.min(1,run.depthMax/RINGS);
  const g=o.createLinearGradient(0,0,0,LH);
  g.addColorStop(0,mix(P.space,P.space2,depthT));g.addColorStop(1,mix(P.space2,'#000',depthT*0.6));
  o.fillStyle=g;o.fillRect(-4,-4,LW+8,LH+8);
  // faint nebula bloom behind the world for depth (cheap, one radial)
  if(QUAL.nebula){const neb=o.createRadialGradient(LW*0.5,LH*0.32,0,LW*0.5,LH*0.32,LH*0.7);
    neb.addColorStop(0,tintc(T.accent,0.5));neb.addColorStop(0.35,mix(P.space,'#000',0.2));neb.addColorStop(1,'rgba(0,0,0,0)');
    o.globalAlpha=0.10;o.fillStyle=neb;o.fillRect(0,0,LW,LH);o.globalAlpha=1;}
  // stars — varied size + brightness twinkle for a crafted starfield
  const nowS=performance.now()/1000;
  for(let i=0;i<QUAL.stars;i++){const px=(i*137.5)%LW|0,py=(i*89.3)%LH|0;
    const tw=0.55+0.45*Math.sin(nowS*1.3+i*1.7),big=(i%9===0);
    o.globalAlpha=(big?0.9:0.55)*tw;o.fillStyle=i%4?'#fff':T.accent;
    o.fillRect(px,py,big?2:1,big?2:1);}
  o.globalAlpha=1;
  // molten core
  const cs=w2s(0,drill.ang),ccx=cs[0]*S1,ccy=cs[1]*S1,cr0=R_CORE*SCALEcur*S1;
  if(ccx>-cr0*3&&ccx<LW+cr0*3&&ccy>-cr0*3&&ccy<LH+cr0*3){const pl=0.6+Math.sin(performance.now()/300)*0.4;
    // soft radial bloom
    const cg=o.createRadialGradient(ccx,ccy,0,ccx,ccy,cr0*2.6);
    cg.addColorStop(0,tintc(P.core,1.25));cg.addColorStop(0.4,P.core);cg.addColorStop(1,'rgba(0,0,0,0)');
    o.globalAlpha=0.55*pl+0.25;o.fillStyle=cg;o.beginPath();o.arc(ccx,ccy,cr0*2.6,0,TAU);o.fill();
    o.globalAlpha=0.95;o.fillStyle=P.core;o.beginPath();o.arc(ccx,ccy,cr0,0,TAU);o.fill();
    // white-hot inner spark
    o.globalAlpha=0.5+0.4*pl;o.fillStyle=tintc(P.core,1.6);o.beginPath();o.arc(ccx,ccy,cr0*0.5,0,TAU);o.fill();o.globalAlpha=1;}
  // planet surface — always the same 2D tile view; only mild zoom when flying up.
  // Angular range is computed to reach the screen edges (+margin) so the planet always
  // continues at the sides (no pop-in) and you always see the individual tiles.
  const curRing=clamp(ringOf(drill.rad),0,RINGS-1);
  const ringLo=Math.max(0,curRing-18),ringHi=Math.min(RINGS-1,curRing+3);
  const rRef=Math.min(drill.rad,R_SURF)*SCALEcur;
  const halfA=Math.asin(clamp((W*0.5+40)/Math.max(1,rRef),0,1))+0.20;
  for(let ring=ringLo;ring<=ringHi;ring++){const rin=R_CORE+ring*TILE,rout=rin+TILE;
    const n=secCount(ring),ds=TAU/n,curSec=sectorOf(drill.ang,ring),range=Math.min(n>>1,Math.ceil(halfA/ds)+1);
    /* Station band: an empty ring painted as a lit corridor. It has to be
       unmistakable from a long way off — it is the difference between "I can
       make it" and "I am about to die two metres short of a full tank". */
    if(isStationRing(ring)){
      const pulse=0.5+0.5*Math.sin(performance.now()/380+ring);
      const reached=run.exp&&(RINGS-1-ring)<=run.depthMax;
      for(let off=-range;off<=range;off++){const sec=((curSec+off)%n+n)%n;
        const a0=sec*ds,a1=a0+ds;
        const q1=w2s(rout,a0),q2=w2s(rout,a1),q3=w2s(rin,a1),q4=w2s(rin,a0);
        if(Math.max(q1[0],q2[0],q3[0],q4[0])<0||Math.min(q1[0],q2[0],q3[0],q4[0])>W)continue;
        if(Math.max(q1[1],q2[1],q3[1],q4[1])<0||Math.min(q1[1],q2[1],q3[1],q4[1])>H)continue;
        o.beginPath();o.moveTo(q1[0]*S1,q1[1]*S1);o.lineTo(q2[0]*S1,q2[1]*S1);
        o.lineTo(q3[0]*S1,q3[1]*S1);o.lineTo(q4[0]*S1,q4[1]*S1);o.closePath();
        o.globalAlpha=reached?0.10:0.16+0.10*pulse;
        o.fillStyle=reached?'#2f6b45':'#39ff14';o.fill();o.globalAlpha=1;
        // floor and ceiling strip lights, brighter every few sectors
        o.strokeStyle=reached?'rgba(90,150,110,0.5)':'rgba(57,255,20,'+(0.55+0.35*pulse)+')';
        o.lineWidth=Math.max(1,TILE*0.09*SCALEcur*S1);
        o.beginPath();o.moveTo(q1[0]*S1,q1[1]*S1);o.lineTo(q2[0]*S1,q2[1]*S1);o.stroke();
        o.beginPath();o.moveTo(q4[0]*S1,q4[1]*S1);o.lineTo(q3[0]*S1,q3[1]*S1);o.stroke();
        if(!reached&&(sec&1)===0){const mx=(q1[0]+q3[0])/2*S1,my=(q1[1]+q3[1])/2*S1,ms=Math.max(1,TILE*0.14*SCALEcur*S1);
          o.globalAlpha=0.55+0.45*pulse;o.fillStyle='#b6ffb0';o.fillRect((mx-ms/2)|0,(my-ms/2)|0,ms|0,ms|0);o.globalAlpha=1;}}
      continue;}
    for(let off=-range;off<=range;off++){const sec=((curSec+off)%n+n)%n;
      const t=tilePolar(ring,sec);if(!t||t.wall)continue;
      const a0=sec*ds,a1=a0+ds;
      const p1=w2s(rout,a0),p2=w2s(rout,a1),p3=w2s(rin,a1),p4=w2s(rin,a0);
      const minx=Math.min(p1[0],p2[0],p3[0],p4[0]),maxx=Math.max(p1[0],p2[0],p3[0],p4[0]);
      const miny=Math.min(p1[1],p2[1],p3[1],p4[1]),maxy=Math.max(p1[1],p2[1],p3[1],p4[1]);
      if(maxx<0||minx>W||maxy<0||miny>H)continue;
      o.fillStyle=shadeFor(ring,sec,t.rock);
      o.beginPath();o.moveTo(p1[0]*S1,p1[1]*S1);o.lineTo(p2[0]*S1,p2[1]*S1);o.lineTo(p3[0]*S1,p3[1]*S1);o.lineTo(p4[0]*S1,p4[1]*S1);o.closePath();o.fill();
      o.strokeStyle='rgba(0,0,0,0.32)';o.lineWidth=1;o.stroke();
      /* Anything below that wants to fill the tile must lay the quad down again
         first. The rim-light calls beginPath() to draw its single edge, which
         replaces the current path with a two-point line — so every later fill()
         was silently filling that line instead of the tile. That had been
         quietly eating the boss-tile pulse AND the damage darkening on the high
         quality tier for as long as the rim-light has existed (on the low tier,
         where tileDetail is off, both worked — which is why it never showed up
         in a side-by-side). */
      const lay=()=>{o.beginPath();o.moveTo(p1[0]*S1,p1[1]*S1);o.lineTo(p2[0]*S1,p2[1]*S1);
        o.lineTo(p3[0]*S1,p3[1]*S1);o.lineTo(p4[0]*S1,p4[1]*S1);o.closePath();};
      // rim-light on the outer (surface-facing) edge -> tiles read as lit 3D strata
      if(QUAL.tileDetail){o.strokeStyle='rgba(255,255,255,0.12)';o.beginPath();o.moveTo(p1[0]*S1,p1[1]*S1);o.lineTo(p2[0]*S1,p2[1]*S1);o.stroke();}
      if(t.boss){lay();o.strokeStyle=P.core;o.lineWidth=2;o.stroke();o.globalAlpha=0.3+0.3*Math.sin(performance.now()/200);o.fillStyle=P.core;o.fill();o.globalAlpha=1;}
      // lava veins glow and breathe — you must be able to plan a route around them
      if(t.lava){const lp=0.45+0.35*Math.sin(performance.now()/240+ring*0.7+sec);
        lay();o.globalAlpha=0.55+0.35*lp;o.fillStyle='#ff5a1e';o.fill();
        o.globalAlpha=0.7*lp;o.fillStyle='#ffd23f';
        const lx=(p1[0]+p3[0])/2*S1,ly=(p1[1]+p3[1])/2*S1,lsz=Math.max(1,TILE*0.2*SCALEcur*S1);
        o.fillRect((lx-lsz/2)|0,(ly-lsz/2)|0,lsz|0,lsz|0);o.globalAlpha=1;}
      // sentries: a scanning eye, so you can see the fuel drain coming
      if(t.sentry){const sp=performance.now()/300+ring+sec;
        lay();o.globalAlpha=0.30+0.18*Math.sin(sp);o.fillStyle='#2de2e6';o.fill();o.globalAlpha=1;
        const sx=(p1[0]+p3[0])/2*S1,sy=(p1[1]+p3[1])/2*S1,sz=Math.max(2,TILE*0.26*SCALEcur*S1);
        o.strokeStyle='#2de2e6';o.lineWidth=Math.max(1,sz*0.16);
        o.strokeRect((sx-sz/2)|0,(sy-sz/2)|0,sz|0,sz|0);
        o.fillStyle='#c8ffff';const ez=Math.max(1,sz*0.34);
        o.fillRect((sx-ez/2+Math.cos(sp)*sz*0.2)|0,(sy-ez/2)|0,ez|0,ez|0);}
      // regrown rock reads as newer, paler crust so you can see the shaft closing
      if(t.regrown){lay();o.globalAlpha=0.30;o.fillStyle=P.ground[1];o.fill();o.globalAlpha=1;}
      // granular texture (stable per tile -> rotates with the planet, no shimmer)
      if(QUAL.tileDetail){
        const hh=hash(ring*7+3,sec*13+5),gx=(p1[0]+p2[0]+p3[0]+p4[0])/4*S1,gy=(p1[1]+p2[1]+p3[1]+p4[1])/4*S1,gs=Math.max(1,TILE*0.3*SCALEcur*S1);
        o.fillStyle=tintc(P.ground[1],1.25);o.fillRect((gx+((hh>>2)%7-3)*gs*0.22)|0,(gy+((hh>>5)%7-3)*gs*0.22)|0,1,1);
        o.fillStyle=tintc(P.ground[2],0.65);o.fillRect((gx+((hh>>8)%7-3)*gs*0.22)|0,(gy+((hh>>11)%7-3)*gs*0.22)|0,1,1);
        o.fillStyle=tintc(P.ground[0],0.9);o.fillRect((gx+((hh>>14)%7-3)*gs*0.22)|0,(gy+((hh>>17)%7-3)*gs*0.22)|0,1,1);}
      const dmgT=1-t.hp/t.maxhp;if(dmgT>0.05){lay();o.fillStyle='rgba(0,0,0,'+(dmgT*0.5)+')';o.fill();}
      if(t.res){const R=RES[t.res],cx=(p1[0]+p3[0])/2*S1,cy=(p1[1]+p3[1])/2*S1,s=Math.max(2,TILE*0.24*SCALEcur*S1);
        o.fillStyle=R.color;o.beginPath();o.moveTo(cx,cy-s);o.lineTo(cx+s,cy);o.lineTo(cx,cy+s);o.lineTo(cx-s,cy);o.closePath();o.fill();
        o.fillStyle=R.glow;o.beginPath();o.moveTo(cx,cy-s*0.55);o.lineTo(cx+s*0.4,cy-s*0.05);o.lineTo(cx-s*0.15,cy+s*0.2);o.closePath();o.fill();
        // rare ore catches the light — a glint that sweeps through, offset per tile
        if(QUAL.tileDetail&&(R.rar==='rare'||R.rar==='legendary'||R.rar==='uncommon')){
          const ph=(performance.now()/900+hash(ring,sec)%100/100)%1;
          if(ph<0.18){const g=Math.sin(ph/0.18*Math.PI);
            o.save();o.globalCompositeOperation='lighter';o.globalAlpha=g*0.85;
            o.fillStyle='#ffffff';o.fillRect((cx-s*0.18)|0,(cy-s*1.05)|0,Math.max(1,s*0.36),Math.max(2,s*2.1));
            o.fillRect((cx-s*1.05)|0,(cy-s*0.18)|0,Math.max(2,s*2.1),Math.max(1,s*0.36));
            o.restore();}}}
      if(t.gas){const gx=(p1[0]+p3[0])/2*S1,gy=(p1[1]+p3[1])/2*S1,gp=0.5+Math.sin(performance.now()/160+ring)*0.5;
        o.globalAlpha=0.55+gp*0.45;o.fillStyle=T.fuel;o.fillRect((gx-1)|0,(gy-1)|0,3,3);o.globalAlpha=1;}
      if(t.cave){const cx2=(p1[0]+p3[0])/2*S1|0,cy2=(p1[1]+p3[1])/2*S1|0;o.fillStyle='rgba(0,0,0,0.6)';
        o.fillRect(cx2-2,cy2,4,1);o.fillRect(cx2,cy2-2,1,4);}}}
  // drops
  for(const dp of drops){const R=RES[dp.id],ps=w2s(dp.rad,dp.ang),x=ps[0]*S1,y=ps[1]*S1,s=Math.max(2,(3+Math.sin(dp.t*8))|0);
    o.fillStyle=R.glow;o.fillRect(x-s,y-s,s*2,s*2);o.fillStyle=R.color;o.fillRect(x-s+1,y-s+1,s,s);}
  // creatures — angular blob + glowing eyes; size/colour by type
  /* Creatures are drawn from the species table, so a world's own fauna is
     immediately readable as *not* one of the usual three. Stalkers are the
     exception that proves the rule: on the dark worlds they are genuinely
     invisible until they are almost on you, which is what makes Abyss frightening
     rather than merely dim. */
  for(const e of enemies){const sp=SPECIES[e.type]||SPECIES.crawler;
    let vis=1;
    if(sp.trait==='hidden'){const d0=e.near===undefined?999:e.near;
      vis=d0>150?0:d0>70?(150-d0)/80*0.5:0.5+(70-d0)/70*0.5;
      if(vis<=0.02)continue;}
    const ps=w2s(e.rad,e.ang),x=ps[0]*S1|0,y=ps[1]*S1|0,
      s=Math.max(3,TILE*sp.sz*SCALEcur*S1*(e.shard?0.7:1));
    o.globalAlpha=vis;
    o.fillStyle=T.space2;o.fillRect(x-s,y-s,s*2,s*2);
    o.strokeStyle=sp.col;o.lineWidth=sp.hp>1?2:1;o.strokeRect(x-s,y-s,s*2,s*2);
    const ed=sp.hp>1?2:1;
    o.fillStyle=sp.eye;o.fillRect((x-s*0.5)|0,(y-s*0.3)|0,ed,ed);o.fillRect((x+s*0.3)|0,(y-s*0.3)|0,ed,ed);
    // a small tell per trait, so you can react before it reaches you
    if(sp.trait==='burst'){const bp=0.5+0.5*Math.sin(performance.now()/140+e.age*9);
      o.globalAlpha=vis*(0.35+0.4*bp);o.fillStyle='#ffb03d';o.fillRect(x-s,y-s,s*2,s*2);o.globalAlpha=vis;}
    if(sp.trait==='siphon'){o.strokeStyle=sp.eye;o.globalAlpha=vis*0.7;o.lineWidth=1;
      o.beginPath();o.moveTo(x,y-s);o.lineTo(x,y-s*2.1);o.stroke();o.globalAlpha=vis;}
    if(sp.trait==='freeze'){o.strokeStyle=sp.eye;o.globalAlpha=vis*0.8;o.lineWidth=1;
      o.beginPath();o.moveTo(x-s*1.5,y);o.lineTo(x+s*1.5,y);o.moveTo(x,y-s*1.5);o.lineTo(x,y+s*1.5);o.stroke();o.globalAlpha=vis;}
    if(sp.trait==='thief'){o.strokeStyle=sp.eye;o.globalAlpha=vis*0.6;o.lineWidth=1;
      o.beginPath();o.arc(x,y,s*1.7,0,TAU);o.stroke();o.globalAlpha=vis;}
    o.globalAlpha=1;}
  // particles
  // Additive blending makes sparks read as light rather than as coloured dots,
  // and a fresh particle flares brighter before settling.
  o.globalCompositeOperation='lighter';
  for(const p of parts){const t=p.age/p.life,a=1-t;
    o.globalAlpha=a*(t<0.18?1:0.82);
    o.fillStyle=p.color;const px=(p.x*S1)|0,py=(p.y*S1)|0;
    o.fillRect(px,py,p.size,p.size);
    if(t<0.3&&p.size>1){o.globalAlpha=a*0.4;o.fillRect(px-1,py-1,p.size+2,p.size+2);}}
  o.globalAlpha=1;o.globalCompositeOperation='source-over';
  // laser beam (toward core = straight down from the centred drill)
  if(laserFx>0){const bx=W/2*S1,by=DRILL_SY*S1;o.globalAlpha=Math.min(1,laserFx/0.12);
    o.strokeStyle=T.accent;o.lineWidth=3;o.beginPath();o.moveTo(bx,by);o.lineTo(bx,by+TILE*8*SCALEcur*S1);o.stroke();
    o.strokeStyle='#ffffff';o.lineWidth=1;o.beginPath();o.moveTo(bx,by);o.lineTo(bx,by+TILE*8*SCALEcur*S1);o.stroke();o.globalAlpha=1;}
  // drill pod
  drawPod(W/2*S1,DRILL_SY*S1,S1);
  // dmg numbers
  o.textAlign='center';o.textBaseline='middle';
  /* Crit numbers are bigger, punch outward on impact, and carry a dark outline
     so they stay legible over bright rock. A crit you cannot read is not a crit. */
  for(const d of dmgnums){const a=1-d.age/d.life;o.globalAlpha=a;
    if(d.crit){const pop=1+0.55*Math.max(0,1-d.age/0.13);
      o.font='bold '+Math.round(14*pop)+'px monospace';
      o.lineWidth=3;o.strokeStyle='rgba(0,0,0,0.75)';
      o.strokeText(''+d.v,(d.x*S1)|0,(d.y*S1)|0);}
    else if(d.loot){const pop=1+0.4*Math.max(0,1-d.age/0.12);
      o.font='bold '+Math.round((11+d.big*4)*pop)+'px monospace';
      o.lineWidth=3;o.strokeStyle='rgba(0,0,0,0.7)';
      o.strokeText(''+d.v,(d.x*S1)|0,(d.y*S1)|0);}
    else o.font='bold 9px monospace';
    o.fillStyle=d.color;o.fillText(''+d.v,(d.x*S1)|0,(d.y*S1)|0);}
  o.globalAlpha=1;
  o.restore();
}
function drawPod(cx,cy,S1){const o=octx,sk=curSkin();
  const rad=Math.max(2,TILE*SCALEcur*S1*0.34),imp=0.3+moveMag*1.5;   // teeth length grows with speed
  o.save();o.translate(cx,cy);o.rotate(drill.face+Math.PI/2);         // point the drill toward movement
  // engine glow bloom behind the chassis
  const eg=o.createRadialGradient(0,0,0,0,0,rad*2.2);
  eg.addColorStop(0,sk.core);eg.addColorStop(1,'rgba(0,0,0,0)');
  o.globalAlpha=drilling?0.45:0.28;o.fillStyle=eg;o.fillRect(-rad*2.2,-rad*2.2,rad*4.4,rad*4.4);o.globalAlpha=1;
  // angular chassis (square body)
  o.fillStyle=T.space2;o.fillRect(-rad,-rad,rad*2,rad*2);
  o.strokeStyle=sk.ring;o.lineWidth=Math.max(1,rad*0.2);o.strokeRect(-rad,-rad,rad*2,rad*2);
  // metallic bevel: bright top/left edges, dark bottom/right
  o.lineWidth=Math.max(1,rad*0.09);
  o.strokeStyle='rgba(255,255,255,0.4)';o.beginPath();o.moveTo(-rad,rad);o.lineTo(-rad,-rad);o.lineTo(rad,-rad);o.stroke();
  o.strokeStyle='rgba(0,0,0,0.4)';o.beginPath();o.moveTo(rad,-rad);o.lineTo(rad,rad);o.lineTo(-rad,rad);o.stroke();
  /* ---- upgrade-driven hardware: every part below is earned ----
     Each unlock bolts a visible piece onto the machine, so the drill you are
     looking at always shows what you have actually built. */
  // armour plates on the flanks, one pair per tier
  const plates=Math.min(4,Math.max(0,S.tier-1));
  if(plates>0){o.fillStyle=tintc(sk.ring,0.75);
    for(let i=0;i<plates;i++){const py=-rad*0.72+i*(rad*0.46),ph=Math.max(1,rad*0.3);
      o.fillRect(-rad-rad*0.26,py,rad*0.26,ph);o.fillRect(rad,py,rad*0.26,ph);}}
  // side thrusters once you have real speed
  if(S.speed>=320){const th=Math.max(1,rad*0.34),tl=rad*(0.5+moveMag*0.6);
    o.fillStyle=tintc(sk.ring,0.6);o.fillRect(-rad-rad*0.16,-rad*0.2,rad*0.16,th);o.fillRect(rad,-rad*0.2,rad*0.16,th);
    o.fillStyle=moveMag>0.15?T.accent:tintc(T.accent,0.4);o.globalAlpha=0.35+moveMag*0.65;
    o.fillRect(-rad-rad*0.16,-rad*0.2+th,rad*0.16,tl);o.fillRect(rad,-rad*0.2+th,rad*0.16,tl);o.globalAlpha=1;}
  // cooling fins once cooling is unlocked — they glow with heat
  if(S.coolRate>=10){const hot=Math.min(1,run.heat/100);
    o.strokeStyle=mix('#8be9ff','#ff4d4d',hot);o.lineWidth=Math.max(1,rad*0.09);
    for(let i=-1;i<=1;i++){const fy=-rad*0.55+i*(rad*0.5);
      o.beginPath();o.moveTo(-rad*0.9,fy);o.lineTo(-rad*1.28,fy);o.stroke();
      o.beginPath();o.moveTo(rad*0.9,fy);o.lineTo(rad*1.28,fy);o.stroke();}}
  // magnet coils
  if(S.magnet>=180){o.strokeStyle='#12d9b0';o.lineWidth=Math.max(1,rad*0.1);o.globalAlpha=0.8;
    o.beginPath();o.arc(-rad*0.98,rad*0.55,rad*0.26,0,TAU);o.stroke();
    o.beginPath();o.arc(rad*0.98,rad*0.55,rad*0.26,0,TAU);o.stroke();o.globalAlpha=1;}
  // heat-shield collar
  if(S.heatShield>0){o.strokeStyle='#8be9ff';o.globalAlpha=0.55;o.lineWidth=Math.max(1,rad*0.12);
    o.strokeRect(-rad*1.16,-rad*1.16,rad*2.32,rad*2.32);o.globalAlpha=1;}
  // sensor antenna once you have find-luck
  if(S.luck>0){o.strokeStyle='#3fd977';o.lineWidth=Math.max(1,rad*0.08);
    o.beginPath();o.moveTo(0,-rad);o.lineTo(0,-rad*1.6);o.stroke();
    o.fillStyle='#3fd977';o.fillRect(-Math.max(1,rad*0.11),-rad*1.75,Math.max(2,rad*0.22),Math.max(2,rad*0.22));}
  // pulsing core square (skin colour)
  const pulse=0.5+Math.sin(performance.now()/220)*0.5,cs=rad*0.5;
  o.fillStyle=sk.blob;o.globalAlpha=0.85+pulse*0.15;o.fillRect(-cs,-cs,cs*2,cs*2);o.globalAlpha=1;
  o.fillStyle=tintc(sk.blob,1.5);o.globalAlpha=0.5+pulse*0.4;o.fillRect((-cs*0.4)|0,(-cs*0.4)|0,Math.max(1,cs*0.8),Math.max(1,cs*0.8));o.globalAlpha=1;
  // crit spikes ring the core once crit is meaningful
  if(S.crit>=0.5){o.fillStyle=T.dmg;const sp=Math.max(1,rad*0.13);
    o.fillRect(-sp/2,-cs-sp*1.4,sp,sp);o.fillRect(-sp/2,cs+sp*0.4,sp,sp);
    o.fillRect(-cs-sp*1.4,-sp/2,sp,sp);o.fillRect(cs+sp*0.4,-sp/2,sp,sp);}
  /* Drill teeth glow with Overdrive. The machine used to look identical at 5 %
     and at 94 % heat, so the state you are supposed to be reading off the drill
     was only ever on the HUD. Cold steel -> orange -> white-hot. */
  const teeth=S.power>=260?3:S.power>=120?2:1;   // pairs beyond the centre tooth
  const ov=run.ovr||0;
  o.fillStyle=ov>0.02?mix(drilling?T.fuel:'#c8f6ff',ov>0.7?'#fff6d0':'#ff5a1e',Math.min(1,ov*1.25))
                     :(drilling?T.fuel:'#c8f6ff');
  if(ov>0.15){o.shadowColor='#ff6a1e';o.shadowBlur=rad*ov*1.2;}
  const tw=rad*0.6;
  for(let i=-teeth;i<=teeth;i++){const t2=tw*(teeth>2?0.62:teeth>1?0.78:1);
    o.beginPath();o.moveTo(i*t2,rad);o.lineTo((i+0.5)*t2,rad+rad*imp);o.lineTo((i-0.5)*t2,rad+rad*imp);o.closePath();o.fill();}
  o.shadowBlur=0;
  // wide-drill outriggers carve the side tiles — show the cutters doing it
  if(S.wide){o.fillStyle=drilling?T.fuel:tintc(sk.ring,0.9);
    const ow=Math.max(1,rad*0.2),oh=rad*(0.45+imp*0.25);
    o.fillRect(-rad*1.32,rad*0.5,ow,oh);o.fillRect(rad*1.12,rad*0.5,ow,oh);}
  // crit strike: the whole chassis flares white for the length of the window
  if(run.critFx>0){const cf=Math.min(1,run.critFx/0.26);
    o.globalAlpha=cf*0.55;o.fillStyle='#ffe14d';o.fillRect(-rad*1.1,-rad*1.1,rad*2.2,rad*2.2);
    o.globalAlpha=cf;o.strokeStyle='#fff6d0';o.lineWidth=Math.max(1,rad*0.16);
    o.strokeRect(-rad*1.25,-rad*1.25,rad*2.5,rad*2.5);o.globalAlpha=1;}
  o.restore();
  // impact shock square when drilling fast
  if(drilling&&moveMag>0.4){o.strokeStyle=T.fuel;o.globalAlpha=(moveMag-0.4)*0.9;o.lineWidth=1;
    const ir=rad*(1.5+moveMag*1.2);o.strokeRect((cx-ir)|0,(cy-ir)|0,(ir*2)|0,(ir*2)|0);o.globalAlpha=1;}
  // overdrive aura
  if(run.boostT>0){o.strokeStyle=T.accent;o.lineWidth=1;o.strokeRect((cx-rad*1.9)|0,(cy-rad*1.9)|0,(rad*3.8)|0,(rad*3.8)|0);}
  // orbiting drones (square, count scales with unlocked drone skills)
  const nd=Math.min(6,S.drones);
  if(nd>0){for(let i=0;i<nd;i++){const a=performance.now()/500+i*(TAU/nd),ox=cx+Math.cos(a)*rad*2.6,oy=cy+Math.sin(a)*rad*2.6,ds=Math.max(2,rad*0.5);
    o.fillStyle=sk.core;o.fillRect((ox-ds/2)|0,(oy-ds/2)|0,ds|0,ds|0);
    if(S.dronemine){o.strokeStyle=T.dmg;o.globalAlpha=0.5;o.lineWidth=1;o.beginPath();o.moveTo(cx,cy);o.lineTo(ox,oy);o.stroke();o.globalAlpha=1;}}}}

function draw(){scene();
  const ca=T.ca*(1+glitch*4);
  const jx=T.jitter?(Math.random()-0.5)*2:0,jy=T.jitter?(Math.random()-0.5)*2:0;
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);ctx.imageSmoothingEnabled=false;
  if(QUAL.ca){
    // chromatic split: two tinted copies blended — the most expensive pass, so
    // the low tier drops it for a single straight blit instead.
    crc.clearRect(0,0,LW,LH);crc.drawImage(oc,0,0);crc.globalCompositeOperation='multiply';
    crc.fillStyle='#ff0000';crc.fillRect(0,0,LW,LH);crc.globalCompositeOperation='source-over';
    cbc.clearRect(0,0,LW,LH);cbc.drawImage(oc,0,0);cbc.globalCompositeOperation='multiply';
    cbc.fillStyle='#00ffff';cbc.fillRect(0,0,LW,LH);cbc.globalCompositeOperation='source-over';
    ctx.globalCompositeOperation='lighter';
    ctx.drawImage(cr_,0,0,LW,LH,(-ca+jx),jy,LW*PIX,LH*PIX);
    ctx.drawImage(cb,0,0,LW,LH,(ca+jx),jy,LW*PIX,LH*PIX);
    ctx.globalCompositeOperation='source-over';
  }else{
    ctx.drawImage(oc,0,0,LW,LH,jx,jy,LW*PIX,LH*PIX);
  }
  if(QUAL.scan&&T.scan>0){ctx.fillStyle='rgba(0,0,0,'+T.scan+')';for(let y=0;y<H;y+=PIX*2)ctx.fillRect(0,y,W,PIX);}
  if(QUAL.noise&&T.noise>0){ctx.globalAlpha=T.noise;for(let i=0;i<55;i++){ctx.fillStyle=Math.random()<0.5?'#fff':'#000';
    ctx.fillRect((Math.random()*W)|0,(Math.random()*H)|0,PIX,PIX);}ctx.globalAlpha=1;}
  if(T.tint){ctx.globalCompositeOperation='overlay';ctx.fillStyle=T.tint;ctx.globalAlpha=0.08;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
  /* ABYSS / OBSCURA: the dark. Your lamp only reaches so far, and it reaches
     less the deeper you go. It changes how the world is played rather than how
     it looks — ore you cannot see is ore you drive past, so these worlds reward
     the magnet and the sensor skills that are merely nice everywhere else. */
  if(P.dark&&run.active){
    const deep=Math.min(1,run.depthMax/Math.max(8,RINGS*0.75));
    const lamp=Math.max(H*0.14,H*(0.42-0.20*deep))*(1+0.03*Math.sin(performance.now()/520));
    const v=ctx.createRadialGradient(W/2,DRILL_SY,lamp*0.35,W/2,DRILL_SY,lamp);
    v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(0.72,'rgba(0,0,0,0.55)');v.addColorStop(1,'rgba(0,0,0,0.93)');
    ctx.fillStyle=v;ctx.fillRect(0,0,W,H);}
  // cinematic corner vignette — gradient cached, only rebuilt on resize
  if(vignette){ctx.fillStyle=vignette;ctx.fillRect(0,0,W,H);}
  if(flash>0){ctx.fillStyle='rgba(255,255,255,'+(flash*0.5)+')';ctx.fillRect(0,0,W,H);}
  /* Overdrive glow. The old version was flat red from 70 % up, which told the
     player one thing: you are dying. It now opens amber and only turns red as
     you close on the red line, with a heartbeat that quickens — so the screen
     reads "this is the good part, and it is about to stop being the good part". */
  if(run.ovr>0){const o1=run.ovr,hb=0.86+0.14*Math.sin(performance.now()/(150-70*o1));
    /* The glow keeps its centre clear. At full Overdrive the old version laid a
       flat wash over the whole screen including the play area, and ore colours —
       the thing you are actually hunting — went red along with everything else.
       Now the tint starts further out and the bloom is capped, so the edges
       scream while the tiles under your drill stay readable. */
    const v=ctx.createRadialGradient(W/2,H/2,H*(0.40-0.06*o1),W/2,H/2,H*0.72);
    const r=255,g=Math.round(150-140*o1),bl=Math.round(60-45*o1),a=(0.12+0.34*o1)*hb;
    v.addColorStop(0,'rgba('+r+','+g+','+bl+',0)');
    v.addColorStop(0.55,'rgba('+r+','+g+','+bl+','+(a*0.35).toFixed(3)+')');
    v.addColorStop(1,'rgba('+r+','+g+','+bl+','+a+')');
    ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
    if(o1>0.35&&QUAL.ca){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(o1-0.35)*0.16*hb;
      ctx.fillStyle='#ff8a3d';ctx.fillRect(0,0,W,H);ctx.restore();}}
  // boss shockwave ring emanating from the core
  if(run.bossWave>0){const wr=(1-run.bossWave)*Math.max(W,H)*0.6;ctx.strokeStyle=P.core;ctx.globalAlpha=run.bossWave*0.8;
    ctx.lineWidth=3;ctx.beginPath();ctx.arc(pcx,pcy,wr,0,TAU);ctx.stroke();ctx.globalAlpha=1;}
  if(run.inBoss){const bp=0.1+0.09*Math.sin(performance.now()/220),v=ctx.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.7);
    v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,P.core);ctx.globalAlpha=bp;ctx.fillStyle=v;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;
    // rotating laser sweep from the core (tech boss shows it earlier)
    if(run.bossKills>=8||(P.bossType==='tech'&&run.bossKills>=3)){const f=-Math.PI/2+angDiff(bossBeam,drill.ang),L=Math.max(W,H)*1.4,
      ex=pcx+Math.cos(f)*L,ey=pcy+Math.sin(f)*L,al=angDiff(bossBeam,drill.ang),
      hot=Math.abs(al)<0.13;ctx.save();ctx.globalCompositeOperation='lighter';
      ctx.strokeStyle=hot?'#fff':P.core;ctx.globalAlpha=hot?0.9:0.55;ctx.lineWidth=hot?7:4;
      ctx.beginPath();ctx.moveTo(pcx,pcy);ctx.lineTo(ex,ey);ctx.stroke();
      ctx.globalAlpha=0.25;ctx.lineWidth=hot?18:12;ctx.strokeStyle=P.core;ctx.stroke();ctx.restore();}}
  // weather-event colour wash (subtle, pulsing)
  if(run.event){const inf=EVENTINFO[run.event.type],a=0.06+0.05*Math.sin(performance.now()/180);
    const v=ctx.createRadialGradient(W/2,H/2,H*0.2,W/2,H/2,H*0.75);
    v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,inf.col);ctx.globalAlpha=a;ctx.fillStyle=v;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;}
  drawHUD();}

/* ===================== HUD (crisp full-res) ===================== */
function txt(c,s,x,y,align,fill,size){c.textAlign=align;c.textBaseline='top';
  c.font='900 '+size+'px ui-monospace,Menlo,Consolas,monospace';
  if(c.letterSpacing!==undefined)c.letterSpacing='0.5px';
  c.lineJoin='round';c.miterLimit=2;c.lineWidth=Math.max(3,size*0.3);c.strokeStyle='rgba(0,0,0,0.9)';c.strokeText(s,x,y);
  c.fillStyle=fill;c.fillText(s,x,y);if(c.letterSpacing!==undefined)c.letterSpacing='0px';}
function bar(c,x,y,w,h,frac,col){c.fillStyle='#000';c.fillRect(x,y,w,h);
  c.strokeStyle='#fff';c.lineWidth=2;c.strokeRect(x+1,y+1,w-2,h-2);
  c.fillStyle=col;c.fillRect(x+2,y+2,(w-4)*Math.max(0,Math.min(1,frac)),h-4);}
function drawHUD(){const c=ctx,M=12,top=Math.max(14,H*0.05);c.imageSmoothingEnabled=true;
  txt(c,money(meta.credits+(run.active?run.haul:0)),W-M,top,'right',T.accent,Math.round(W*0.048));
  if(run.active){const inSpace=drill.rad>=R_SURF-1,fs=Math.round(W*0.032),lx=Math.round(W*0.115),
    bw=Math.min(W*0.42,175),bh=Math.max(9,Math.round(H*0.016)),ef=run.energy/S.energyMax,hf=run.heat/100;
    // planet + depth
    txt(c,P.name+' · '+(inSpace?'ORBIT':run.depthMax+'m'),M,top,'left','#ffffff',Math.round(W*0.04));
    // FUEL + HEAT bars stacked, top-left
    const y1=top+Math.round(W*0.055);
    txt(c,'FUEL',M,y1,'left',ef<0.2?'#ff4d4d':'#ffffff',fs);
    bar(c,M+lx,y1-1,bw,bh,ef,ef<0.2?'#ff4d4d':T.fuel);
    const y2=y1+bh+6;
    // Teaching the rhythm: the readout says outright that easing off cools you.
    const venting=!drilling&&run.heat>0.5;
    txt(c,'HEAT '+Math.round(run.heat)+'%'+(venting?' ▼':''),M,y2,'left',
      venting?'#8be9ff':hf>0.9?'#ff4d4d':hf>0.7?'#ff6a3d':'#ff8a3d',Math.round(W*0.04));
    /* Overdrive has to read as a prize, not a siren, and it must not be pushed
       off the HUD by the cooling label. Sharing the line meant that easing off at
       94 % heat replaced "OVERDRIVE x1.73" with "KÜHLT AB" — the multiplier
       vanished at the exact moment it was worth the most. They stack now:
       the multiplier owns its slot, cooling reports underneath it. */
    if(run.ovr>0.02){const op=0.7+0.3*Math.sin(performance.now()/120);
      c.globalAlpha=op;
      txt(c,'⚡ OVERDRIVE ×'+(1+(S.ovrLoot||OVR_LOOT)*run.ovr).toFixed(2),M+Math.round(W*0.30),y2,'left',
        run.ovr>0.7?'#ffe14d':'#ff8a3d',Math.round(W*0.034));
      c.globalAlpha=1;
      if(venting)txt(c,settings.lang==='en'?'cooling':'kühlt ab',
        M+Math.round(W*0.30),y2+Math.round(W*0.040),'left','#8be9ff',Math.round(W*0.028));}
    else if(venting&&hf>0.35)txt(c,settings.lang==='en'?'COOLING':'KÜHLT AB',M+Math.round(W*0.30),y2,'left','#8be9ff',Math.round(W*0.031));
    if(run.depthMax>2)txt(c,'HOME [↑ '+run.depthMax+']',W/2,H*0.28,'center','#ffffff',Math.round(W*0.05));
    /* Expedition readout: which layer you are on, and how far to the next
       station. Without the countdown the Safe Zone is a surprise; with it,
       every metre is a decision about whether you can make it. */
    if(run.exp){const left=Math.max(0,run.exp.nextZone-run.depthMax);
      txt(c,(settings.lang==='en'?'LAYER ':'SCHICHT ')+run.exp.tier+' · '+
            (settings.lang==='en'?'SECTOR ':'SEKTOR ')+run.exp.zone,
          M,y2+Math.round(W*0.055),'left','#8a5cff',Math.round(W*0.031));
      const near=left<=3;
      txt(c,(settings.lang==='en'?'station in ':'Station in ')+left+' m',
          M,y2+Math.round(W*0.095),'left',near?'#39ff14':'#9a90ad',Math.round(W*0.031));
      if(run.exp.relics.length)
        txt(c,run.exp.relics.map(i=>{const r=relicById(i);return r?r.ic:'';}).join(''),
            W-M,y2+Math.round(W*0.055),'right','#ffffff',Math.round(W*0.036));
      const sy=activeSyn();
      if(sy.length)txt(c,sy.map(y=>y.ic).join('')+' '+(settings.lang==='en'?'SYNERGY':'SYNERGIE'),
        W-M,y2+Math.round(W*0.095),'right','#ff4de0',Math.round(W*0.031));}
    /* The point of no return used to be invisible: fuel only pays for cutting
       rock, so climbing back up the shaft you already carved is free. New
       players never discovered that and simply died on top of their loot.
       Now the game says it out loud the moment a budget gets tight. */
    if(run.depthMax>4){
      /* The heat warning starts at the red line, not at the top of the Overdrive
         band. At 0.72 it fired while the HUD was still celebrating "OVERDRIVE
         x1.28" two lines above — the game shouting "flee" and "push harder" at
         the same instant. Overdrive owns 70-88 %; above that it is real panic. */
      const lowFuel=ef<0.3, hotNow=hf>0.88;
      if(lowFuel||hotNow){
        /* The warning has to survive the worst frame in the game: full Overdrive
           paints the whole screen red, and a red-on-red warning is the one piece
           of text you cannot afford to lose. It gets its own dark plate, sits
           clear of the drill (where crit numbers live), and only its glow pulses
           — the text itself stays at full opacity so it is never mid-fade when
           you glance at it. */
        const pulse=0.62+0.38*Math.sin(performance.now()/190);
        const col=lowFuel?'#ff8a3d':'#ff4d4d';
        const head=lowFuel?(settings.lang==='en'?'FUEL LOW':'SPRIT KNAPP')
                          :(settings.lang==='en'?'OVERHEATING':'ÜBERHITZT GLEICH');
        const sub=settings.lang==='en'?'go UP — the way back is free'
                                      :'HOCH fahren — der Rückweg ist gratis';
        const y0=H*0.185,h1=Math.round(W*0.052),h2=Math.round(W*0.034);
        const boxH=h1+h2+Math.round(W*0.055);
        c.save();
        c.fillStyle='rgba(6,4,12,0.82)';
        c.fillRect(0,y0-Math.round(W*0.03),W,boxH);
        c.globalAlpha=0.35+0.4*pulse;c.fillStyle=col;
        c.fillRect(0,y0-Math.round(W*0.03),W,Math.max(2,Math.round(W*0.008)));
        c.fillRect(0,y0-Math.round(W*0.03)+boxH-Math.max(2,Math.round(W*0.008)),W,Math.max(2,Math.round(W*0.008)));
        c.globalAlpha=1;c.restore();
        txt(c,'⚠ '+head,W/2,y0,'center',col,h1);
        txt(c,sub,W/2,y0+Math.round(W*0.058),'center','#ffffff',h2);
      }
    }
    if(S.combo&&run.combo>1){const cc=run.combo>=25?'#ff4de0':run.combo>=10?T.accent:'#8be9ff';
      txt(c,'COMBO ×'+run.combo,W/2,H*0.35,'center',cc,Math.round(W*0.05*(1+Math.min(run.combo,40)*0.006)));}
    if(run.freezeT>0)txt(c,'❄ CRYO',W/2,H*0.22,'center','#8be9ff',Math.round(W*0.038));
    if(run.event){const inf=EVENTINFO[run.event.type];
      txt(c,'⚠ '+(settings.lang==='en'?inf.en:inf.de)+' '+Math.ceil(run.event.t)+'s',W/2,H*0.19,'center',inf.col,Math.round(W*0.04));}
    drawStick(c);
  }
  c.imageSmoothingEnabled=false;}
/* The thumb stick, drawn where you actually put your finger. Seeing the anchor
   and how far the knob is pushed is most of what makes touch steering feel
   responsive rather than vague. */
function drawStick(c){
  if(!input.active&&input.smag<0.02)return;
  const a=input.active?1:Math.min(1,input.smag*6);      // fades out after release
  const kx=input.ax+input.sdx,ky=input.ay+input.sdy;
  const pop=input.tapT>0?1+input.tapT*1.4:1;            // little pulse on touch-down
  c.save();c.lineCap='round';
  // outer ring
  c.globalAlpha=0.16*a;c.strokeStyle='#ffffff';c.lineWidth=2;
  c.beginPath();c.arc(input.ax,input.ay,MAXR*pop,0,TAU);c.stroke();
  // travelled distance as an arc of accent colour
  c.globalAlpha=0.5*a;c.strokeStyle=T.accent;c.lineWidth=3;
  c.beginPath();c.arc(input.ax,input.ay,MAXR*pop,-Math.PI/2,-Math.PI/2+TAU*Math.min(1,input.smag),false);c.stroke();
  // stem from anchor to knob
  c.globalAlpha=0.28*a;c.strokeStyle='#ffffff';c.lineWidth=2;
  c.beginPath();c.moveTo(input.ax,input.ay);c.lineTo(kx,ky);c.stroke();
  // knob
  const kr=17+input.smag*7;
  c.globalAlpha=0.20*a;c.fillStyle=T.accent;c.beginPath();c.arc(kx,ky,kr*1.7,0,TAU);c.fill();
  c.globalAlpha=0.85*a;c.fillStyle='#0a0713';c.beginPath();c.arc(kx,ky,kr,0,TAU);c.fill();
  c.globalAlpha=0.95*a;c.strokeStyle=T.accent;c.lineWidth=3;
  c.beginPath();c.arc(kx,ky,kr,0,TAU);c.stroke();
  c.globalAlpha=1;c.restore();}
function money(n){n=Math.round(n);if(n>=1e6)return'$'+(n/1e6).toFixed(3)+'M';if(n>=1e3)return'$'+(n/1e3).toFixed(2)+'K';return'$'+n;}
function mix(a,b,t){const pa=hx(a),pb=hx(b);return'rgb('+Math.round(pa[0]+(pb[0]-pa[0])*t)+','+Math.round(pa[1]+(pb[1]-pa[1])*t)+','+Math.round(pa[2]+(pb[2]-pa[2])*t)+')';}
function hx(h){h=h.replace('#','');if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];return[parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)];}

/* ===================== LOOP ===================== */
const gid=(x)=>document.getElementById(x);
const shockCdEl=gid('shockCd'),boostCdEl=gid('boostCd'),laserCdEl=gid('laserCd'),magCdEl=gid('magCd'),tpCdEl=gid('tpCd'),freezeCdEl=gid('freezeCd'),nukeCdEl=gid('nukeCd');
let last=performance.now();
function frame(now){let dt=(now-last)/1000;last=now;if(dt>0.05)dt=0.05;
  tickQuality(dt);
  if(hitstop>0)hitstop-=dt;else update(dt);draw();
  shockCdEl.style.transform='scaleY('+(run.shockCd/ABILITY.blast.cd)+')';
  boostCdEl.style.transform='scaleY('+(run.boostCd/ABILITY.boost.cd)+')';
  laserCdEl.style.transform='scaleY('+(run.laserCd/ABILITY.laser.cd)+')';
  magCdEl.style.transform='scaleY('+(run.magCd/ABILITY.magpulse.cd)+')';
  tpCdEl.style.transform='scaleY('+(run.tpCd/ABILITY.teleport.cd)+')';
  freezeCdEl.style.transform='scaleY('+(run.freezeCd/ABILITY.freeze.cd)+')';
  nukeCdEl.style.transform='scaleY('+(run.nukeCd/ABILITY.nuke.cd)+')';requestAnimationFrame(frame);}
requestAnimationFrame(frame);

/* ===================== UI ===================== */
function show(id){document.getElementById(id).classList.add('show');}
function hide(id){document.getElementById(id).classList.remove('show');}
let hintTimer;function showHint(){const h=document.getElementById('hint');h.style.opacity='1';clearTimeout(hintTimer);hintTimer=setTimeout(hideHint,5000);}
function hideHint(){document.getElementById('hint').style.opacity='0';}
document.getElementById('btnStart').onclick=()=>{sfx.ui();startRun();};
document.getElementById('btnDescend').onclick=()=>{sfx.ui();startRun();};
document.getElementById('btnExtract').onclick=extract;
document.getElementById('btnShock').onclick=shockwave;
document.getElementById('btnBoost').onclick=boost;
document.getElementById('btnLaser').onclick=laser;
document.getElementById('btnMag').onclick=magpulse;
document.getElementById('btnTp').onclick=teleport;
document.getElementById('btnFreeze').onclick=freeze;
document.getElementById('btnNuke').onclick=nuke;
document.getElementById('btnSound').onclick=function(){const on=!(settings.sfx&&settings.music);settings.sfx=on;settings.music=on;saveMeta();
  this.textContent=on?'🔊':'🔇';if(on){audio();if(AC&&AC.state==='suspended')AC.resume();startMusic();}else stopMusic();};
document.getElementById('btnSound').textContent=(settings.sfx&&settings.music)?'🔊':'🔇';
document.getElementById('btnSettings').onclick=()=>{sfx.ui();openSettings('titleOver');};
document.getElementById('btnSettings2').onclick=()=>{sfx.ui();openSettings('shopOver');};
document.getElementById('btnSettingsDone').onclick=()=>{sfx.ui();hide('settingsOver');show(backTo);};
document.getElementById('btnAch').onclick=()=>{sfx.ui();openAch('titleOver');};
document.getElementById('btnAchDone').onclick=()=>{sfx.ui();hide('achOver');show(backTo);};
document.getElementById('btnContracts').onclick=()=>{sfx.ui();openContracts('titleOver');};
document.getElementById('btnContractDone').onclick=()=>{sfx.ui();hide('contractOver');show(backTo);};
document.getElementById('btnRefine').onclick=()=>{sfx.ui();openRefinery('titleOver');};
document.getElementById('btnRefineDone').onclick=()=>{sfx.ui();hide('refineOver');show(backTo);};
document.getElementById('btnModules').onclick=()=>{sfx.ui();openModules('titleOver');};
document.getElementById('btnModuleDone').onclick=()=>{sfx.ui();hide('moduleOver');show(backTo);};
document.getElementById('btnChallenge').onclick=()=>{sfx.ui();openChallenge('titleOver');};
document.getElementById('btnChalDone').onclick=()=>{sfx.ui();hide('challengeOver');show(backTo);};
document.getElementById('btnChalStart').onclick=()=>{sfx.ui();startChallenge();};
document.getElementById('btnCutGo').onclick=()=>{sfx.ui();hide('cutOver');show('planetOver');buildPlanets();};
document.getElementById('btnCodex').onclick=()=>{sfx.ui();openCompendium('titleOver');};
document.getElementById('btnCodexDone').onclick=()=>{sfx.ui();hide('codexOver');show(backTo);};
document.getElementById('btnSkins').onclick=()=>{sfx.ui();openSkins('titleOver');};
document.getElementById('btnSkinDone').onclick=()=>{sfx.ui();hide('skinOver');show(backTo);};
// cloud-save prep: portable save code (export/import)
document.getElementById('btnExport').onclick=()=>{sfx.ui();
  try{const code=btoa(unescape(encodeURIComponent(JSON.stringify(meta))));
    if(navigator.clipboard)navigator.clipboard.writeText(code).catch(()=>{});
    window.prompt(settings.lang==='en'?'Save code (copy it):':'Save-Code (kopieren):',code);}catch(e){}};
document.getElementById('btnImport').onclick=()=>{sfx.ui();let code;
  try{code=window.prompt(settings.lang==='en'?'Paste save code:':'Save-Code einfügen:','');}catch(e){}
  if(!code)return;try{const j=JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if(j&&j.v===2){localStorage.setItem(SAVE_KEY,JSON.stringify(j));location.reload();}else sfx.ui();}catch(e){sfx.ui();}};
/* Wiping the save is irreversible, so the confirmation spells out exactly what
   is about to be lost and offers the backup code first. */
function exportSaveCode(){try{const code=btoa(unescape(encodeURIComponent(JSON.stringify(meta))));
  if(navigator.clipboard)navigator.clipboard.writeText(code).catch(()=>{});
  window.prompt(settings.lang==='en'?'Save code (copy it):':'Save-Code (kopieren):',code);}catch(e){}}
function buildWipe(){const de=settings.lang!=='en',st=meta.stats;
  document.getElementById('wipeWarn').textContent=de
    ?'Dein gesamter Fortschritt wird gelöscht. Das lässt sich nicht rückgängig machen.'
    :'All of your progress will be deleted. This cannot be undone.';
  document.getElementById('wipeTip').textContent=de
    ?'Tipp: Sichere vorher deinen Save-Code — damit kannst du jederzeit zurück.'
    :'Tip: back up your save code first — you can always restore from it.';
  document.getElementById('btnWipeBackup').textContent=de?'⬆ Erst Save-Code sichern':'⬆ Back up save code first';
  document.getElementById('btnWipeCancel').textContent=de?'Abbrechen':'Cancel';
  document.getElementById('btnWipeGo').textContent=de?'Endgültig löschen':'Delete for good';
  const row=(ic,lbl,val)=>'<div class="pcard"><span style="font-size:19px;width:30px;text-align:center">'+ic+
    '</span><span class="pt"><b>'+lbl+'</b></span><span class="ps" style="color:#ff4d4d">'+val+'</span></div>';
  let h='';
  h+=row('🏆',de?'Beste Tiefe':'Best depth',(st.bestDepth||0)+'m');
  h+=row('💰',de?'Cash':'Cash',money(meta.credits));
  h+=row('🌳',de?'Skills':'Skills',meta.skills.length+'/'+SKILLS.length);
  h+=row('🪐',de?'Planeten':'Planets',meta.unlockedPlanets.length+'/'+PLANETS.length);
  h+=row('🔩',de?'Module':'Modules',(meta.modules||[]).length+'/'+MODULES.length);
  h+=row('⚛️',de?'Kerne':'Cores',meta.prestige.cores);
  h+=row('✦',de?'Splitter':'Shards',(meta.ascend&&meta.ascend.shards)||0);
  h+=row('🏅',de?'Erfolge':'Achievements',meta.achievements.length+'/'+ACH.length);
  h+=row('🚀',de?'Runs':'Runs',st.runs||0);
  document.getElementById('wipeList').innerHTML=h;}
async function wipeSaveData(){
  // Clear the mirrored copy first — a restore prefers the further-along save,
  // so leaving it would bring the old progress straight back on next launch.
  try{if(window.__cbWipeCloud)await window.__cbWipeCloud();}catch(e){}
  try{localStorage.removeItem(SAVE_KEY);}catch(e){}
  try{sessionStorage.clear();}catch(e){}
  location.reload();}
document.getElementById('btnWipe').onclick=()=>{sfx.ui();buildWipe();hide('settingsOver');show('wipeOver');};
document.getElementById('btnWipeBackup').onclick=()=>{sfx.ui();exportSaveCode();};
document.getElementById('btnWipeCancel').onclick=()=>{sfx.back();hide('wipeOver');show('settingsOver');buildSettings();};
document.getElementById('btnWipeGo').onclick=()=>{sfx.shock();haptic('error');
  document.getElementById('btnWipeGo').disabled=true;wipeSaveData();};
// menu navigation
document.getElementById('btnTree').onclick=()=>{sfx.ui();openTree('titleOver');};
document.getElementById('btnPlanets').onclick=()=>{sfx.ui();openPlanets('titleOver');};
document.getElementById('btnTree2').onclick=()=>{sfx.ui();openTree('shopOver');};
document.getElementById('btnPlanets2').onclick=()=>{sfx.ui();openPlanets('shopOver');};
document.getElementById('btnModules2').onclick=()=>{sfx.ui();openModules('shopOver');};
document.getElementById('btnRefine2').onclick=()=>{sfx.ui();openRefinery('shopOver');};
document.getElementById('btnShopMenu').onclick=()=>{sfx.ui();hide('shopOver');show('titleOver');updateDailyUI();refreshMenu();};
document.getElementById('btnTreeDone').onclick=()=>{sfx.ui();hide('treeOver');show(backTo);};
document.getElementById('btnPlanetsDone').onclick=()=>{sfx.ui();hide('planetOver');show(backTo);};
document.getElementById('btnPrestige').onclick=()=>{sfx.ui();const g=prestigeGain(),nc=meta.prestige.cores+g;
  document.getElementById('prestigeTxt').innerHTML='Setzt Skill-Baum &amp; Credits zurück.<br>Kerne: <b>'+meta.prestige.cores+'</b> → <b style="color:#8a5cff">'+nc+'</b> (+'+g+')<br>Permanent: +'+Math.round(nc*12)+'% Loot · +'+(nc*4)+' Bohrkraft.';
  hide('treeOver');show('prestigeOver');};
document.getElementById('btnRetry').onclick=()=>{sfx.ui();startRun();};
document.getElementById('btnGoMenu').onclick=()=>{sfx.ui();hide('gameoverOver');show('titleOver');refreshMenu();};
// --- expedition ---
document.getElementById('btnExpedition').onclick=()=>{sfx.ui();pendingExp=true;startRun();};
document.getElementById('btnDosDone').onclick=()=>{sfx.back();hide('dossierOver');show('planetOver');};
document.getElementById('btnZoneGo').onclick=leaveZone;
document.getElementById('btnZoneOut').onclick=()=>{hide('zoneOver');extract();};
document.getElementById('btnDeepGo').onclick=goDeeper;
document.getElementById('btnDeepOut').onclick=()=>{hide('deepOver');extract();};
document.getElementById('btnPrestigeCancel').onclick=()=>{sfx.ui();hide('prestigeOver');show('treeOver');buildTree(false);};
/* Prestige and ascension wipe the whole tree — the one moment that has earned a
   proper flourish. Shockwave rings, a colour wash and what you gained, then the
   tree reappears already reset behind it. */
function burstFx(color,big,sub){
  const el=document.getElementById('burstFx');
  el.style.color=color;
  el.innerHTML='<div class="bf-wash" style="background:radial-gradient(circle at 50% 50%,'+color+' 0%,rgba(0,0,0,0) 62%)"></div>'+
    '<div class="bf-ring"></div><div class="bf-ring"></div><div class="bf-ring"></div>'+
    '<div class="bf-txt"><div class="bf-big">'+big+'</div><div class="bf-sub">'+sub+'</div></div>';
  el.classList.remove('go');void el.offsetWidth;   // restart the animations
  el.classList.add('go');
  clearTimeout(burstFx._t);
  burstFx._t=setTimeout(()=>{el.classList.remove('go');el.innerHTML='';},1300);
}
document.getElementById('btnPrestigeGo').onclick=()=>{
  const de=settings.lang!=='en',before=meta.prestige.cores;
  if(doPrestige()){const gained=meta.prestige.cores-before;
    sfx.leg();haptic('epic');
    burstFx('#8a5cff','+'+gained+' ⚛',de?'Core Overload':'Core Overload');
    updateAbilityButtons();checkAchievements();}
  hide('prestigeOver');show('treeOver');buildTree(true);};
document.getElementById('btnAscend').onclick=()=>{sfx.ui();const g=ascendGain(),ns=meta.ascend.shards+g;
  document.getElementById('ascendTxt').innerHTML='Wandelt <b>'+meta.prestige.cores+'</b> Kerne in <b style="color:#ff4de0">'+g+'</b> Splitter.<br>Setzt Kerne, Skill-Baum &amp; Credits zurück.<br>Splitter: <b>'+meta.ascend.shards+'</b> → <b style="color:#ff4de0">'+ns+'</b><br>Permanent: +'+(ns*25)+'% Loot · +'+(ns*8)+' Bohrkraft.';
  hide('treeOver');show('ascendOver');};
document.getElementById('btnAscendCancel').onclick=()=>{sfx.ui();hide('ascendOver');show('treeOver');buildTree(false);};
document.getElementById('btnPerks').onclick=()=>{sfx.ui();openPerks('treeOver');};
document.getElementById('btnPerkDone').onclick=()=>{sfx.back();hide('perkOver');show(backTo||'treeOver');buildTree(false);};
document.getElementById('btnAscendGo').onclick=()=>{
  const de=settings.lang!=='en',before=(meta.ascend&&meta.ascend.shards)||0;
  if(doAscend()){const gained=meta.ascend.shards-before;
    sfx.leg();haptic('epic');
    burstFx('#ff4de0','+'+gained+' ✦',de?'Singularität':'Singularity');
    updateAbilityButtons();checkAchievements();}
  hide('ascendOver');show('treeOver');buildTree(true);};
document.getElementById('btnHelp').onclick=()=>{sfx.ui();openTut('titleOver');};
document.getElementById('btnTutNext').onclick=()=>{sfx.ui();if(tutIndex>=TUTSTEPS.length-1)finishTut();else{tutIndex++;renderTut();}};
document.getElementById('btnTutSkip').onclick=()=>{sfx.ui();finishTut();};
updateAbilityButtons();
applyQuality();
applyLang();
/* Every button in the game gets the same tactile confirmation, so nothing is
   ever silently "dead" under a thumb. Capture phase means it fires even where a
   handler stops propagation, and it never double-fires with a screen's own sfx
   because the individual handlers no longer play one. */
document.addEventListener('pointerdown',e=>{
  const b=e.target&&e.target.closest&&e.target.closest('button');
  if(!b||b.disabled)return;
  haptic(b.classList.contains('node')?'light':'sel');
},{capture:true,passive:true});
// unlock the audio context on the first interaction and start ambient music
function unlockAudio(){const a=audio();if(a&&a.state==='suspended')a.resume();if(settings.music)ensureMusic();}
window.addEventListener('pointerdown',unlockAudio);
window.addEventListener('keydown',unlockAudio);
// studio splash -> title (first-launch onboarding waits until after the splash)
setTimeout(()=>{hide('splashOver');show('titleOver');refreshMenu();
  if(!meta.tutorialSeen)setTimeout(()=>openTut('titleOver'),380);},2400);
})();

