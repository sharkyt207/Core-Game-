/* COREBREAKER game engine (generated from the confirmed prototype).
   Single source of the running game; core/ holds shared TS utilities for
   future extraction. */

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
    ca:1.4, scan:0.05, noise:0.05, tint:null, jitter:0},
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
 {id:'terra',  name:'TERRA',   unlock:0,    rings:26, hardMul:1.0, heatMul:1.0, valueMul:1.0,
   ground:['#8b909b','#c9cdd4','#5c6069'], core:'#ff8a3d', space:'#150f22', space2:'#0a0713'},
 {id:'magmar', name:'MAGMAR',  unlock:600,  rings:30, hardMul:1.5, heatMul:1.9, valueMul:1.7,
   ground:['#5a2f26','#c4632f','#361410'], core:'#ffd000', space:'#1c0a08', space2:'#0e0404'},
 {id:'cryonis',name:'CRYONIS', unlock:2200, rings:34, hardMul:2.1, heatMul:0.6, valueMul:2.5,
   ground:['#7d94b0','#e6f4ff','#4c6076'], core:'#6fdcff', space:'#0a1420', space2:'#050a12'},
];
let P=PLANETS[0];

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
let RINGS=P.rings, R_SURF=0, SECTORS=0, DSEC=0, CAP_RAD=0;
function applyGeometry(){R_SURF=R_CORE+RINGS*TILE;SECTORS=Math.round(TAU*R_SURF/TILE);DSEC=TAU/SECTORS;CAP_RAD=R_SURF+900;}
applyGeometry();
function setPlanet(id){P=PLANETS.find(p=>p.id===id)||PLANETS[0];RINGS=P.rings;applyGeometry();world.clear();}
// ring index from radius: <0 = core wall, >=RINGS = space
function ringOf(r){if(r>=R_SURF)return RINGS;if(r<R_CORE)return -1;return Math.floor((r-R_CORE)/TILE);}
function sectorOf(a){let s=Math.floor(a/DSEC);return ((s%SECTORS)+SECTORS)%SECTORS;}

/* ===================== SAVE / UPGRADES ===================== */
const SAVE_KEY='corebreaker_round_v1';
const meta=loadMeta();
function loadMeta(){try{const j=JSON.parse(localStorage.getItem(SAVE_KEY));if(j&&j.v===1){
  if(!j.unlockedPlanets)j.unlockedPlanets=['terra'];if(!j.planet)j.planet='terra';return j;}}catch(e){}
  return{v:1,credits:0,up:{power:0,speed:0,energy:0,cool:0,magnet:0},unlockedPlanets:['terra'],planet:'terra'};}
function saveMeta(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(meta));}catch(e){}}
const UPGRADES=[
  {id:'power', ic:'⛏️', name:'Bohrkraft', desc:'Härteres Gestein schneller', base:120,mult:1.7},
  {id:'speed', ic:'💨', name:'Speed',     desc:'Schneller bewegen & bohren',  base:100,mult:1.6},
  {id:'energy',ic:'🛢️', name:'Fuel-Tank', desc:'Mehr Sprit & Regen',          base:110,mult:1.65},
  {id:'cool',  ic:'❄️', name:'Kühlung',    desc:'Weniger Hitze',              base:100,mult:1.6},
  {id:'magnet',ic:'🧲', name:'Magnet',     desc:'Loot aus mehr Distanz',      base:90, mult:1.7},
];
function upCost(u){return Math.round(u.base*Math.pow(u.mult,meta.up[u.id]));}
function stats(){const u=meta.up;return{
  power:34+u.power*20, speed:240+u.speed*40, energyMax:100+u.energy*45, energyRegen:9+u.energy*3.2,
  coolRate:16+u.cool*7, heatGen:Math.max(3,11-u.cool*1.4), magnet:70+u.magnet*46,
  tier:Math.min(6,1+Math.floor((u.power+u.speed+u.energy+u.cool+u.magnet)/3))};}

/* ===================== RESOURCES / BLOCKS ===================== */
const RES={
  ferrite:{name:'Scrap', color:'#c9d4e0',glow:'#eef4ff',value:6,  rar:'common'},
  cuprite:{name:'Copper',color:'#ff9d5c',glow:'#ffd9b0',value:16, rar:'common'},
  crystal:{name:'Shard', color:'#5cf0d8',glow:'#b6fff2',value:44, rar:'uncommon'},
  core:   {name:'Core',  color:'#2de2e6',glow:'#c8ffff',value:130,rar:'rare'},
  artifact:{name:'Relic',color:'#8a5cff',glow:'#e6d8ff',value:520,rar:'legendary'},
};
const HARD={dirt:16,stone:34,hard:64,dark:96};
function genTile(depthM){let rock='dirt';
  if(depthM>18)rock='dark';else if(depthM>11)rock='hard';else if(depthM>4)rock='stone';
  let res=null;const roll=rnd();
  if(roll<0.15){
    if(depthM>20&&rnd()<0.05)res='artifact';
    else if(depthM>13&&rnd()<0.16)res='core';
    else if(depthM>7&&rnd()<0.30)res='crystal';
    else if(depthM>3&&rnd()<0.5)res='cuprite'; else res='ferrite';}
  const hp=HARD[rock]*P.hardMul;return{rock,res,hp,maxhp:hp};}
const world=new Map();const key=(ring,sec)=>ring+','+sec;
function tilePolar(ring,sec){
  if(ring<0)return{wall:true};           // core
  if(ring>=RINGS)return null;             // space
  const k=key(ring,sec);if(world.has(k))return world.get(k);
  const depthM=(RINGS-1-ring);
  const t=depthM===0?{rock:'dirt',res:null,hp:HARD.dirt*0.4*P.hardMul,maxhp:HARD.dirt*0.4*P.hardMul}:genTile(depthM);
  world.set(k,t);return t;}

/* ===================== STATE ===================== */
let S=stats();
let POW=S.power;                                 // effective drill power (boost-modulated)
const run={active:false,depthMax:0,haul:0,energy:S.energyMax,heat:0,shockCd:0,boostT:0,boostCd:0};
const drill={rad:R_SURF+300,ang:0,face:Math.PI/2};
const drops=[],parts=[],dmgnums=[];
let shake=0,flash=0,hitstop=0,drilling=false,glitch=0;

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
const input={active:false,ax:0,ay:0,dx:0,dy:0,mag:0};
const MAXR=92,DEAD=11;
function setInput(px,py){let dx=px-input.ax,dy=py-input.ay;const d=Math.hypot(dx,dy);
  if(d>MAXR){dx*=MAXR/d;dy*=MAXR/d;}input.dx=dx;input.dy=dy;
  input.mag=Math.min(1,Math.max(0,(Math.hypot(dx,dy)-DEAD)/(MAXR-DEAD)));}
const cv=document.getElementById('game');
function ptc(e){const t=e.touches?e.touches[0]:e;return{x:t.clientX,y:t.clientY};}
function onDown(e){if(!run.active)return;const t=ptc(e);input.active=true;input.ax=t.x;input.ay=t.y;setInput(t.x,t.y);hideHint();}
function onMove(e){if(input.active){const t=ptc(e);setInput(t.x,t.y);e.preventDefault();}}
function onUp(){input.active=false;input.mag=0;input.dx=input.dy=0;}
cv.addEventListener('touchstart',onDown,{passive:false});
cv.addEventListener('touchmove',onMove,{passive:false});
cv.addEventListener('touchend',onUp);cv.addEventListener('touchcancel',onUp);
cv.addEventListener('mousedown',onDown);
window.addEventListener('mousemove',e=>{if(input.active)onMove(e);});
window.addEventListener('mouseup',onUp);
const kb={};
window.addEventListener('keydown',e=>{kb[e.key.toLowerCase()]=true;if(e.key===' ')shockwave();if(e.key.toLowerCase()==='b')boost();});
window.addEventListener('keyup',e=>{kb[e.key.toLowerCase()]=false;});
function kbVec(){let x=0,y=0;if(kb['arrowleft']||kb['a'])x-=1;if(kb['arrowright']||kb['d'])x+=1;
  if(kb['arrowup']||kb['w'])y-=1;if(kb['arrowdown']||kb['s'])y+=1;
  if(x||y){const m=Math.hypot(x,y);return{dx:x/m,dy:y/m};}return null;}

/* ===================== AUDIO / HAPTICS ===================== */
let AC=null,muted=false;
function audio(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}}return AC;}
function blip(f,dur,type,vol,slide){if(muted)return;const a=audio();if(!a)return;
  const o=a.createOscillator(),g=a.createGain();o.type=type||'square';o.frequency.setValueAtTime(f,a.currentTime);
  if(slide)o.frequency.exponentialRampToValueAtTime(slide,a.currentTime+dur);
  g.gain.setValueAtTime(vol||0.15,a.currentTime);g.gain.exponentialRampToValueAtTime(0.0001,a.currentTime+dur);
  o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+dur);}
function noise(dur,vol){if(muted)return;const a=audio();if(!a)return;
  const n=a.createBuffer(1,a.sampleRate*dur,a.sampleRate),d=n.getChannelData(0);
  for(let i=0;i<d.length;i++)d[i]=(Math.random()*2-1)*(1-i/d.length);
  const s=a.createBufferSource(),g=a.createGain();s.buffer=n;g.gain.value=vol||0.08;
  s.connect(g);g.connect(a.destination);s.start();}
const sfx={tick:()=>noise(0.03,0.05),brk:()=>blip(170+rnd()*70,0.11,'square',0.11,85),
  rare:()=>{blip(520,0.1,'triangle',0.18);setTimeout(()=>blip(760,0.12,'triangle',0.2),90);},
  leg:()=>{[440,660,880,1320].forEach((f,i)=>setTimeout(()=>blip(f,0.2,'sawtooth',0.16),i*100));},
  shock:()=>{blip(90,0.4,'sawtooth',0.22,1200);noise(0.3,0.12);},
  ui:()=>blip(640,0.06,'square',0.12),buy:()=>{blip(520,0.08,'square',0.14);setTimeout(()=>blip(780,0.1,'square',0.14),70);}};
function vibe(p){if(!muted&&navigator.vibrate)try{navigator.vibrate(p);}catch(e){}}

/* ===================== FX ===================== */
function burst(x,y,color,n,spd){for(let i=0;i<n;i++){const a=rnd()*TAU,s=(spd||1)*(40+rnd()*160);
  parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,life:0.5+rnd()*0.5,age:0,color,size:1+(rnd()<0.5?1:2)});}}
function dmgNum(x,y,v,color){dmgnums.push({x:x+(rnd()-0.5)*10,y,v:Math.round(v*10)/10,age:0,life:0.7,color});}

/* ===================== MINING ===================== */
function collectRes(id,rad,ang){const r=RES[id];drops.push({rad,ang,id,got:false,t:0});
  if(r.rar==='rare'){sfx.rare();vibe([12,30,12,30,40]);flash=Math.max(flash,0.5);shake=Math.max(shake,10);glitch=0.25;}
  else if(r.rar==='legendary'){sfx.leg();vibe([20,40,20,40,20,60,120]);flash=Math.max(flash,0.9);shake=Math.max(shake,18);glitch=0.5;}
  else if(r.rar==='uncommon'){sfx.rare();vibe([8,20,25]);}else vibe(6);}
let tickAcc=0;
function mineTile(ring,sec,dmg){const t=tilePolar(ring,sec);if(!t||t.wall)return false;t.hp-=dmg;
  const rad_c=R_CORE+(ring+0.5)*TILE,ang_c=(sec+0.5)*DSEC,ps=w2s(rad_c,ang_c);
  tickAcc+=dmg;if(tickAcc>7){dmgNum(ps[0],ps[1]-6,tickAcc,T.dmg);tickAcc=0;}
  if(rnd()<0.3)burst(ps[0],ps[1],P.ground[2],1,0.5);
  if(t.hp<=0){world.set(key(ring,sec),null);burst(ps[0],ps[1],T.accent,10,1);shake=Math.max(shake,3.5);hitstop=0.02;
    sfx.brk();vibe(4);if(t.res)collectRes(t.res,rad_c,ang_c);return true;}
  return false;}

function shockwave(){if(!run.active||run.shockCd>0)return;if(run.energy<22){sfx.ui();return;}
  run.energy-=22;run.shockCd=5;const cr=clamp(ringOf(drill.rad),0,RINGS-1),cs=sectorOf(drill.ang),R=2;
  for(let dr=-R;dr<=R;dr++)for(let ds=-R;ds<=R;ds++)if(dr*dr+ds*ds<=R*R+1){
    const rg=cr+dr,se=((cs+ds)%SECTORS+SECTORS)%SECTORS;if(rg>=0&&rg<RINGS)mineTile(rg,se,9999);}
  shake=Math.max(shake,16);flash=Math.max(flash,0.55);hitstop=0.05;glitch=0.3;
  sfx.shock();vibe([18,25,60]);burst(W/2,DRILL_SY,T.blob,26,1.6);}
function boost(){if(!run.active||run.boostCd>0||run.boostT>0)return;if(run.energy<28){sfx.ui();return;}
  run.energy-=28;run.boostT=4;run.boostCd=12;flash=Math.max(flash,0.3);shake=Math.max(shake,6);
  sfx.rare();vibe([10,20,10]);burst(W/2,DRILL_SY,T.accent,18,1.3);}

/* ===================== RUN ===================== */
function startRun(){S=stats();setPlanet(meta.planet);rnd=rngSeed(Date.now()>>>0);
  run.active=true;run.depthMax=0;run.haul=0;run.energy=S.energyMax;run.heat=0;run.shockCd=0;run.boostT=0;run.boostCd=0;
  drill.rad=R_SURF+300;drill.ang=0;drill.face=Math.PI/2;snapCamera();
  drops.length=0;parts.length=0;dmgnums.length=0;shake=flash=hitstop=0;
  hide('titleOver');hide('shopOver');showHint();if(audio()&&AC.state==='suspended')AC.resume();}
function extract(){if(!run.active)return;run.active=false;meta.credits+=Math.round(run.haul);saveMeta();
  document.getElementById('rDepth').textContent=run.depthMax;
  document.getElementById('rHaul').textContent=Math.round(run.haul);
  document.getElementById('rCredits').textContent=meta.credits;
  buildShop();show('shopOver');sfx.ui();vibe([10,20,40]);}
function buildShop(){const g=document.getElementById('shopGrid');g.innerHTML='';
  // planet selector
  const ph=document.createElement('div');ph.style.cssText='display:flex;gap:6px;width:100%;margin-bottom:6px;';
  PLANETS.forEach(p=>{const owned=meta.unlockedPlanets.includes(p.id),sel=meta.planet===p.id;
    const b=document.createElement('button');b.className='up';
    b.style.cssText='flex:1;justify-content:center;text-align:center;padding:9px 3px;'+(sel?'border-color:'+T.accent+';':'');
    b.innerHTML='<span class="t" style="text-align:center"><b>'+p.name+'</b><span>'+(owned?(sel?'★ aktiv':'wählen'):p.unlock+'$ 🔒')+'</span></span>';
    b.disabled=!owned&&meta.credits<p.unlock;
    b.onclick=()=>{if(meta.unlockedPlanets.includes(p.id)){meta.planet=p.id;}
      else if(meta.credits>=p.unlock){meta.credits-=p.unlock;meta.unlockedPlanets.push(p.id);meta.planet=p.id;
        document.getElementById('rCredits').textContent=meta.credits;}else return;
      saveMeta();sfx.buy();vibe(12);buildShop();};
    ph.appendChild(b);});
  g.appendChild(ph);
  UPGRADES.forEach(u=>{const lvl=meta.up[u.id],cost=upCost(u),can=meta.credits>=cost;
    const b=document.createElement('button');b.className='up';b.disabled=!can;
    b.innerHTML='<span class="ic">'+u.ic+'</span><span class="t"><b>'+u.name+' · Lv '+lvl+'</b><span>'+u.desc+'</span></span><span class="c">'+cost+'$</span>';
    b.onclick=()=>{if(meta.credits>=upCost(u)){meta.credits-=upCost(u);meta.up[u.id]++;saveMeta();sfx.buy();vibe(12);buildShop();
      document.getElementById('rCredits').textContent=meta.credits;}};g.appendChild(b);});}

/* ===================== UPDATE ===================== */
let curDt=0.016;
function update(dt){curDt=dt;updateCamera(dt);if(!run.active)return;
  let vx=0,vy=0,mag=0;const kv=kbVec();
  if(input.active&&input.mag>0){vx=input.dx;vy=input.dy;mag=input.mag;const d=Math.hypot(vx,vy)||1;vx/=d;vy/=d;}
  else if(kv){vx=kv.dx;vy=kv.dy;mag=1;}
  run.boostT=Math.max(0,run.boostT-dt);
  const boosting=run.boostT>0;POW=S.power*(boosting?2.6:1);
  const throttled=run.heat>=95,spd=S.speed*(throttled?0.35:1)*(boosting?1.4:1);
  drilling=false;
  // radial: screen-down (vy>0) digs inward (rad decreases); up flies out
  moveRadial(-vy*mag*spd*dt);
  // angular: fast free orbit in space, tangential dig on surface
  const inSpace=drill.rad>=R_SURF-1;
  const dAng=inSpace? (vx*mag*1.5*dt) : (vx*mag*spd*dt/Math.max(R_CORE,drill.rad));
  moveAngular(dAng);
  if(mag>0.05){drill.face=Math.atan2(vy,vx);}
  if(drilling){run.energy-=(9+S.power/12)*dt;run.heat=Math.min(100,run.heat+S.heatGen*P.heatMul*dt);if(rnd()<0.5)sfx.tick();}
  else{run.energy=Math.min(S.energyMax,run.energy+S.energyRegen*dt);run.heat=Math.max(0,run.heat-S.coolRate*dt);}
  if(run.energy<0)run.energy=0;
  const dm=Math.max(0,Math.round((R_SURF-drill.rad)/TILE));if(dm>run.depthMax)run.depthMax=dm;
  if(run.shockCd>0)run.shockCd=Math.max(0,run.shockCd-dt);
  if(run.boostCd>0)run.boostCd=Math.max(0,run.boostCd-dt);
  // drops: magnet + collect (polar)
  const drwx=drill.rad*Math.cos(drill.ang),drwy=drill.rad*Math.sin(drill.ang);
  for(let i=drops.length-1;i>=0;i--){const dp=drops[i];dp.t+=dt;
    const dwx=dp.rad*Math.cos(dp.ang),dwy=dp.rad*Math.sin(dp.ang),dist=Math.hypot(drwx-dwx,drwy-dwy);
    if(dist<S.magnet||dp.got){dp.got=true;dp.rad+=(drill.rad-dp.rad)*Math.min(1,dt*14);dp.ang+=angDiff(drill.ang,dp.ang)*Math.min(1,dt*14);}
    if(dist<22){run.haul+=RES[dp.id].value*(1+meta.up.magnet*0.05)*P.valueMul;burst(W/2,DRILL_SY,RES[dp.id].glow,7,1.1);drops.splice(i,1);}}
  // particles / dmg numbers (screen space)
  for(let i=parts.length-1;i>=0;i--){const p=parts[i];p.age+=dt;if(p.age>=p.life){parts.splice(i,1);continue;}
    p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=380*dt;p.vx*=0.96;}
  for(let i=dmgnums.length-1;i>=0;i--){const d=dmgnums[i];d.age+=dt;d.y-=26*dt;if(d.age>=d.life)dmgnums.splice(i,1);}
  if(shake>0)shake=Math.max(0,shake-dt*26);
  if(flash>0)flash=Math.max(0,flash-dt*1.6);
  if(glitch>0)glitch=Math.max(0,glitch-dt*1.2);}
function moveRadial(dRad){if(dRad===0)return;const dir=Math.sign(dRad);
  const target=drill.rad+dRad,probe=target+dir*(TILE*0.4),ring=ringOf(probe),sec=sectorOf(drill.ang);
  const t=tilePolar(ring,sec);
  if(t&&t.wall){drill.rad=Math.max(R_CORE+TILE*0.4,drill.rad);return;}   // core: block
  if(t){drilling=true;mineTile(ring,sec,POW*(run.energy>0?1:0.3)*curDt);return;} // rock: mine+block
  drill.rad=clamp(target,R_CORE+TILE*0.4,CAP_RAD);}                       // empty/space: move
function moveAngular(dAng){if(dAng===0)return;const dir=Math.sign(dAng);
  const curRing=ringOf(drill.rad);
  if(curRing>=RINGS||curRing<0){drill.ang+=dAng;return;}                  // space/core edge: free
  const sec=sectorOf(drill.ang+dir*(DSEC*0.6)+dAng),t=tilePolar(curRing,sec);
  if(t&&!t.wall){drilling=true;mineTile(curRing,sec,POW*(run.energy>0?1:0.3)*curDt);return;}
  drill.ang+=dAng;}

/* ===================== RENDER ===================== */
const ctx=cv.getContext('2d');
let oc,octx,cr_,crc,cb,cbc;
function resize(){W=window.innerWidth;H=window.innerHeight;DRILL_SY=H*0.42;
  cv.width=W;cv.height=H;cv.style.width=W+'px';cv.style.height=H+'px';
  PIX=W<520?3:4;LW=Math.ceil(W/PIX);LH=Math.ceil(H/PIX);
  oc=mk(LW,LH);octx=oc.getContext('2d');cr_=mk(LW,LH);crc=cr_.getContext('2d');cb=mk(LW,LH);cbc=cb.getContext('2d');
  ctx.imageSmoothingEnabled=false;octx.imageSmoothingEnabled=false;snapCamera();}
function mk(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
window.addEventListener('resize',resize);resize();

function shadeFor(ring,sec){const v=hash(ring,sec)%100;return v<60?P.ground[0]:v<82?P.ground[1]:P.ground[2];}
function scene(){
  const o=octx,S1=1/PIX;o.imageSmoothingEnabled=false;
  const jx=(Math.random()-0.5)*shake*S1,jy=(Math.random()-0.5)*shake*S1;
  o.save();o.translate(jx,jy);
  // space background
  const depthT=Math.min(1,run.depthMax/RINGS);
  const g=o.createLinearGradient(0,0,0,LH);
  g.addColorStop(0,mix(P.space,P.space2,depthT));g.addColorStop(1,mix(P.space2,'#000',depthT*0.6));
  o.fillStyle=g;o.fillRect(-4,-4,LW+8,LH+8);
  // stars (parallax by planet rotation)
  o.globalAlpha=0.7;for(let i=0;i<70;i++){const px=((i*137.5 - drill.ang*40*R_SURF*0)%LW+LW)%LW;
    const py=((i*89.3)%LH);o.fillStyle=i%3?'#fff':T.accent;o.fillRect(px|0,py|0,1,1);}o.globalAlpha=1;
  // molten core
  const cs=w2s(0,drill.ang),ccx=cs[0]*S1,ccy=cs[1]*S1,cr0=R_CORE*SCALEcur*S1;
  if(ccx>-cr0&&ccx<LW+cr0&&ccy>-cr0&&ccy<LH+cr0){const pl=0.6+Math.sin(performance.now()/300)*0.4;
    o.fillStyle=P.core;
    o.globalAlpha=0.18*pl;o.beginPath();o.arc(ccx,ccy,cr0*2.3,0,TAU);o.fill();
    o.globalAlpha=0.9;o.beginPath();o.arc(ccx,ccy,cr0,0,TAU);o.fill();
    o.globalAlpha=0.35*pl;o.beginPath();o.arc(ccx,ccy,cr0*1.5,0,TAU);o.fill();o.globalAlpha=1;}
  // planet surface — always the same 2D tile view; only mild zoom when flying up.
  // Angular range is computed to reach the screen edges (+margin) so the planet always
  // continues at the sides (no pop-in) and you always see the individual tiles.
  const curRing=clamp(ringOf(drill.rad),0,RINGS-1),curSec=sectorOf(drill.ang);
  const ringLo=Math.max(0,curRing-18),ringHi=Math.min(RINGS-1,curRing+3);
  const rRef=Math.min(drill.rad,R_SURF)*SCALEcur;
  const halfA=Math.asin(clamp((W*0.5+40)/Math.max(1,rRef),0,1))+0.20;
  const range=Math.min(SECTORS>>1,Math.ceil(halfA/DSEC));
  for(let ring=ringLo;ring<=ringHi;ring++){const rin=R_CORE+ring*TILE,rout=rin+TILE;
    for(let off=-range;off<=range;off++){const sec=((curSec+off)%SECTORS+SECTORS)%SECTORS;
      const t=tilePolar(ring,sec);if(!t||t.wall)continue;
      const a0=sec*DSEC,a1=a0+DSEC;
      const p1=w2s(rout,a0),p2=w2s(rout,a1),p3=w2s(rin,a1),p4=w2s(rin,a0);
      const minx=Math.min(p1[0],p2[0],p3[0],p4[0]),maxx=Math.max(p1[0],p2[0],p3[0],p4[0]);
      const miny=Math.min(p1[1],p2[1],p3[1],p4[1]),maxy=Math.max(p1[1],p2[1],p3[1],p4[1]);
      if(maxx<0||minx>W||maxy<0||miny>H)continue;
      o.fillStyle=shadeFor(ring,sec);
      o.beginPath();o.moveTo(p1[0]*S1,p1[1]*S1);o.lineTo(p2[0]*S1,p2[1]*S1);o.lineTo(p3[0]*S1,p3[1]*S1);o.lineTo(p4[0]*S1,p4[1]*S1);o.closePath();o.fill();
      // subtle tile outline so single squares stay readable
      o.strokeStyle='rgba(0,0,0,0.25)';o.lineWidth=1;o.stroke();
      // granular grain (stable per tile -> rotates with the planet, no shimmer)
      const hh=hash(ring*7+3,sec*13+5),gx=(p1[0]+p2[0]+p3[0]+p4[0])/4*S1,gy=(p1[1]+p2[1]+p3[1]+p4[1])/4*S1;
      o.fillStyle=(hh&1)?P.ground[1]:P.ground[2];
      o.fillRect((gx+((hh>>2)%5-2))|0,(gy+((hh>>5)%5-2))|0,1,1);
      o.fillRect((gx+((hh>>8)%5-2))|0,(gy+((hh>>11)%5-2))|0,1,1);
      const dmgT=1-t.hp/t.maxhp;if(dmgT>0.05){o.fillStyle='rgba(0,0,0,'+(dmgT*0.5)+')';o.fill();}
      if(t.res){const R=RES[t.res],cx=(p1[0]+p3[0])/2*S1,cy=(p1[1]+p3[1])/2*S1,s=Math.max(2,TILE*0.2*SCALEcur*S1);
        o.fillStyle=R.color;o.fillRect((cx-s)|0,(cy-s)|0,(s*2)|0,(s*2)|0);
        o.fillStyle=R.glow;o.fillRect((cx-s*0.5)|0,(cy-s*0.5)|0,Math.max(1,s)|0,Math.max(1,s)|0);}}}
  // drops
  for(const dp of drops){const R=RES[dp.id],ps=w2s(dp.rad,dp.ang),x=ps[0]*S1,y=ps[1]*S1,s=Math.max(2,(3+Math.sin(dp.t*8))|0);
    o.fillStyle=R.glow;o.fillRect(x-s,y-s,s*2,s*2);o.fillStyle=R.color;o.fillRect(x-s+1,y-s+1,s,s);}
  // particles
  for(const p of parts){const a=1-p.age/p.life;o.globalAlpha=a;o.fillStyle=p.color;
    o.fillRect((p.x*S1)|0,(p.y*S1)|0,p.size,p.size);}o.globalAlpha=1;
  // drill pod
  drawPod(W/2*S1,DRILL_SY*S1,S1);
  // dmg numbers
  o.textAlign='center';o.textBaseline='middle';o.font='bold 9px monospace';
  for(const d of dmgnums){const a=1-d.age/d.life;o.globalAlpha=a;o.fillStyle=d.color;o.fillText(''+d.v,(d.x*S1)|0,(d.y*S1)|0);}o.globalAlpha=1;
  o.restore();
}
function drawPod(cx,cy,S1){const o=octx,tier=S.tier;
  // small pod that scales with the world zoom (much smaller than before)
  const rad=Math.max(3,TILE*SCALEcur*S1*0.42);
  o.strokeStyle=T.ring;o.lineWidth=Math.max(1,rad*0.16);o.beginPath();o.arc(cx,cy,rad,0,TAU);o.stroke();
  o.fillStyle=T.space2;o.beginPath();o.arc(cx,cy,rad-1,0,TAU);o.fill();
  const pulse=0.5+Math.sin(performance.now()/220)*0.5,br=Math.max(1,rad*0.34);
  for(let i=0;i<3;i++){const a=performance.now()/900+i*2.094,bx=cx+Math.cos(a)*rad*0.3,by=cy+Math.sin(a)*rad*0.3;
    o.fillStyle=tier>=5?T.accent:T.blob;o.globalAlpha=0.85+pulse*0.15;o.beginPath();o.arc(bx,by,br,0,TAU);o.fill();}o.globalAlpha=1;
  // drill teeth in facing direction while digging
  if(drilling){o.fillStyle=T.fuel;const dx=Math.cos(drill.face),dy=Math.sin(drill.face);
    for(let i=0;i<3;i++){const tt=rad+1+i;o.fillRect((cx+dx*tt)|0,(cy+dy*tt)|0,2,2);}}
  // overdrive aura while boosting
  if(run.boostT>0){o.strokeStyle=T.accent;o.lineWidth=1;o.beginPath();o.arc(cx,cy,rad*1.7,0,TAU);o.stroke();}
  // orbiting drones appear at higher machine tiers (visible power growth)
  if(tier>=4){const n=tier-3;for(let i=0;i<n;i++){const a=performance.now()/500+i*(TAU/n),
      ox=cx+Math.cos(a)*rad*2.2,oy=cy+Math.sin(a)*rad*2.2;
    o.fillStyle=T.core;o.beginPath();o.arc(ox,oy,Math.max(1,rad*0.24),0,TAU);o.fill();}}}

function draw(){scene();
  const ca=T.ca*(1+glitch*4);
  crc.clearRect(0,0,LW,LH);crc.drawImage(oc,0,0);crc.globalCompositeOperation='multiply';
  crc.fillStyle='#ff0000';crc.fillRect(0,0,LW,LH);crc.globalCompositeOperation='source-over';
  cbc.clearRect(0,0,LW,LH);cbc.drawImage(oc,0,0);cbc.globalCompositeOperation='multiply';
  cbc.fillStyle='#00ffff';cbc.fillRect(0,0,LW,LH);cbc.globalCompositeOperation='source-over';
  const jx=T.jitter?(Math.random()-0.5)*2:0,jy=T.jitter?(Math.random()-0.5)*2:0;
  ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);ctx.imageSmoothingEnabled=false;ctx.globalCompositeOperation='lighter';
  ctx.drawImage(cr_,0,0,LW,LH,(-ca+jx),jy,LW*PIX,LH*PIX);
  ctx.drawImage(cb,0,0,LW,LH,(ca+jx),jy,LW*PIX,LH*PIX);
  ctx.globalCompositeOperation='source-over';
  if(T.scan>0){ctx.fillStyle='rgba(0,0,0,'+T.scan+')';for(let y=0;y<H;y+=PIX*2)ctx.fillRect(0,y,W,PIX);}
  if(T.noise>0){ctx.globalAlpha=T.noise;for(let i=0;i<90;i++){ctx.fillStyle=Math.random()<0.5?'#fff':'#000';
    ctx.fillRect((Math.random()*W)|0,(Math.random()*H)|0,PIX,PIX);}ctx.globalAlpha=1;}
  if(T.tint){ctx.globalCompositeOperation='overlay';ctx.fillStyle=T.tint;ctx.globalAlpha=0.08;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
  if(flash>0){ctx.fillStyle='rgba(255,255,255,'+(flash*0.5)+')';ctx.fillRect(0,0,W,H);}
  if(run.heat>70){const v=ctx.createRadialGradient(W/2,H/2,H*0.25,W/2,H/2,H*0.65);
    const a=(run.heat-70)/30*0.5;v.addColorStop(0,'rgba(255,50,30,0)');v.addColorStop(1,'rgba(255,40,20,'+a+')');
    ctx.fillStyle=v;ctx.fillRect(0,0,W,H);}
  drawHUD();}

/* ===================== HUD (crisp full-res) ===================== */
function txt(c,s,x,y,align,fill,size){c.textAlign=align;c.textBaseline='top';
  c.font='900 '+size+'px ui-monospace,Menlo,Consolas,monospace';
  if(c.letterSpacing!==undefined)c.letterSpacing='0.5px';
  c.lineJoin='round';c.miterLimit=2;c.lineWidth=Math.max(3,size*0.3);c.strokeStyle='rgba(0,0,0,0.9)';c.strokeText(s,x,y);
  c.fillStyle=fill;c.fillText(s,x,y);if(c.letterSpacing!==undefined)c.letterSpacing='0px';}
function drawHUD(){const c=ctx,M=12,top=Math.max(14,H*0.05);c.imageSmoothingEnabled=true;
  txt(c,money(meta.credits+(run.active?run.haul:0)),W-M,top,'right',T.accent,Math.round(W*0.048));
  if(run.active){const inSpace=drill.rad>=R_SURF-1;
    txt(c,P.name+' · '+(inSpace?'ORBIT':run.depthMax+'m'),M,top,'left','#ffffff',Math.round(W*0.04));}
  if(run.active&&run.depthMax>2)txt(c,'HOME [↑ '+run.depthMax+']',W/2,H*0.24,'center','#ffffff',Math.round(W*0.05));
  const bw=Math.min(W*0.54,230),bx=M,by=H-108;
  txt(c,'FUEL '+run.energy.toFixed(1)+'/'+S.energyMax.toFixed(0),bx,by-Math.round(W*0.05),'left','#ffffff',Math.round(W*0.038));
  c.fillStyle='#000';c.fillRect(bx,by,bw,14);c.strokeStyle='#fff';c.lineWidth=2;c.strokeRect(bx+1,by+1,bw-2,12);
  c.fillStyle=T.fuel;c.fillRect(bx+2,by+2,(bw-4)*Math.max(0,run.energy/S.energyMax),10);
  txt(c,'HEAT '+run.heat.toFixed(0)+'%',bx,by+18,'left',run.heat>70?T.dmg:'#c9cdd4',Math.round(W*0.034));
  c.imageSmoothingEnabled=false;}
function money(n){n=Math.round(n);if(n>=1e6)return'$'+(n/1e6).toFixed(3)+'M';if(n>=1e3)return'$'+(n/1e3).toFixed(2)+'K';return'$'+n;}
function mix(a,b,t){const pa=hx(a),pb=hx(b);return'rgb('+Math.round(pa[0]+(pb[0]-pa[0])*t)+','+Math.round(pa[1]+(pb[1]-pa[1])*t)+','+Math.round(pa[2]+(pb[2]-pa[2])*t)+')';}
function hx(h){h=h.replace('#','');if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];return[parseInt(h.substr(0,2),16),parseInt(h.substr(2,2),16),parseInt(h.substr(4,2),16)];}

/* ===================== LOOP ===================== */
const shockCdEl=document.getElementById('shockCd'),boostCdEl=document.getElementById('boostCd');
let last=performance.now();
function frame(now){let dt=(now-last)/1000;last=now;if(dt>0.05)dt=0.05;
  if(hitstop>0)hitstop-=dt;else update(dt);draw();
  shockCdEl.style.transform='scaleY('+(run.shockCd/5)+')';
  boostCdEl.style.transform='scaleY('+(run.boostCd/12)+')';requestAnimationFrame(frame);}
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
document.getElementById('btnSound').onclick=function(){muted=!muted;this.textContent=muted?'🔇':'🔊';if(!muted){audio();if(AC&&AC.state==='suspended')AC.resume();}};
document.querySelectorAll('.skin').forEach(b=>b.onclick=function(){TK=this.dataset.s;T=THEMES[TK];
  document.querySelectorAll('.skin').forEach(x=>x.classList.remove('on'));this.classList.add('on');sfx.ui();});
})();

