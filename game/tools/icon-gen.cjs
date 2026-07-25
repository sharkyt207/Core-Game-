const fs=require('fs');const path=require('path');
const OUT=path.join(__dirname,'icons');fs.mkdirSync(OUT,{recursive:true});

// palette (matches the game — theme A)
const C={bg1:'#1a1030',bg2:'#05040a',steel:'#c9cdd4',steelDk:'#5c6069',blob:'#ffe14d',
  accent:'#ffd23f',cyan:'#2de2e6',mag:'#ff2266',core:'#ff8a3d',coreHot:'#ffd9a0'};

function stars(n,seed){let s=seed,out='';const rng=()=>{s=(s*1103515245+12345)>>>0;return s/4294967296;};
  for(let i=0;i<n;i++){const x=(rng()*1024)|0,y=(rng()*640)|0,r=rng()<0.85?2:4,o=(0.35+rng()*0.5).toFixed(2);
    out+=`<rect x="${x}" y="${y}" width="${r}" height="${r}" fill="${rng()<0.25?C.cyan:'#fff'}" opacity="${o}"/>`;}
  return out;}

// shared defs
function defs(){return `<defs>
  <radialGradient id="bg" cx="50%" cy="38%" r="80%">
    <stop offset="0%" stop-color="${C.bg1}"/><stop offset="60%" stop-color="#0c0819"/><stop offset="100%" stop-color="${C.bg2}"/>
  </radialGradient>
  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${C.coreHot}"/><stop offset="35%" stop-color="${C.core}"/><stop offset="100%" stop-color="rgba(255,138,61,0)"/>
  </radialGradient>
  <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#e9edf3"/><stop offset="55%" stop-color="${C.steel}"/><stop offset="100%" stop-color="${C.steelDk}"/>
  </linearGradient>
</defs>`;}

function wrap(inner){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" shape-rendering="geometricPrecision">${defs()}<rect width="1024" height="1024" fill="url(#bg)"/>${inner}</svg>`;}

/* ---------- A: Core Drill — square pod biting the molten core ---------- */
function iconA(){
  let s=stars(48,7);
  // molten core at the bottom
  s+=`<g>
    <circle cx="512" cy="880" r="360" fill="url(#glow)" opacity="0.95"/>
    <circle cx="512" cy="880" r="150" fill="${C.core}"/>
    <circle cx="512" cy="880" r="70" fill="${C.coreHot}" opacity="0.9"/>
  </g>`;
  // chromatic ghosts of the pod
  const pod=(dx,dy,fill,op)=>`<g transform="translate(${512+dx} ${470+dy}) rotate(45)" opacity="${op}">
    <rect x="-150" y="-150" width="300" height="300" fill="${fill}"/></g>`;
  s+=pod(-10,0,C.mag,0.55)+pod(10,0,C.cyan,0.55);
  // main pod (rotated 45 = diamond) with core + teeth
  s+=`<g transform="translate(512 470) rotate(45)">
    <rect x="-150" y="-150" width="300" height="300" fill="url(#steel)" stroke="#fff" stroke-width="14"/>
    <rect x="-150" y="-150" width="300" height="300" fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="6" transform="translate(6 6)"/>
    <rect x="-66" y="-66" width="132" height="132" fill="${C.blob}"/>
    <rect x="-30" y="-30" width="60" height="60" fill="#fffbe0"/>
  </g>`;
  // drill teeth pointing down into the core (screen-space, below the pod)
  s+=`<g fill="${C.cyan}">
    <polygon points="452,600 512,720 512,600"/>
    <polygon points="512,600 512,720 572,600"/>
    <polygon points="420,585 460,690 470,585"/>
    <polygon points="554,585 564,690 604,585"/>
  </g>`;
  return wrap(s);
}

/* ---------- B: Cross-section — round planet, shaft to a glowing core ---------- */
function iconB(){
  let s=stars(40,21);
  const cx=512,cy=520;
  // planet strata rings
  const rings=[[430,'#3a3550'],[360,'#4a4460'],[300,'#5c6069'],[240,'#6b6f7a'],[185,'#8b909b']];
  s+=`<circle cx="${cx}" cy="${cy}" r="470" fill="none" stroke="${C.cyan}" stroke-width="10" opacity="0.5"/>`;
  s+=`<circle cx="${cx}" cy="${cy}" r="450" fill="#2b2740"/>`;
  for(const[r,col]of rings)s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}"/>`;
  // molten core
  s+=`<circle cx="${cx}" cy="${cy}" r="150" fill="url(#glow)"/><circle cx="${cx}" cy="${cy}" r="90" fill="${C.core}"/><circle cx="${cx}" cy="${cy}" r="42" fill="${C.coreHot}"/>`;
  // drilled shaft from top down to core
  s+=`<rect x="${cx-46}" y="${cy-470}" width="92" height="420" fill="#07040d"/>`;
  s+=`<rect x="${cx-46}" y="${cy-470}" width="10" height="420" fill="${C.cyan}" opacity="0.35"/><rect x="${cx+36}" y="${cy-470}" width="10" height="420" fill="${C.mag}" opacity="0.35"/>`;
  // pod in the shaft
  s+=`<g transform="translate(${cx} ${cy-150})">
    <rect x="-70" y="-70" width="140" height="140" fill="url(#steel)" stroke="#fff" stroke-width="10"/>
    <rect x="-30" y="-30" width="60" height="60" fill="${C.blob}"/>
    <polygon points="-40,70 0,150 40,70" fill="${C.cyan}"/>
  </g>`;
  // rim light
  s+=`<circle cx="${cx}" cy="${cy}" r="450" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="6"/>`;
  return wrap(s);
}

/* ---------- C: Neon drill glyph — stacked chevrons + core spark ---------- */
function iconC(){
  let s=stars(52,3);
  // big soft core glow behind
  s+=`<circle cx="512" cy="560" r="330" fill="url(#glow)" opacity="0.45"/>`;
  // chromatic split chevron stack (a drill bit pointing down)
  const chevs=(dx,fill,op)=>{let g=`<g transform="translate(${dx} 0)" opacity="${op}" fill="${fill}">`;
    const ys=[210,330,450,570];const ws=[210,175,140,105];
    for(let i=0;i<ys.length;i++){const y=ys[i],w=ws[i];
      g+=`<polygon points="${512-w},${y} 512,${y+120} ${512+w},${y} 512,${y+70}"/>`;}
    return g+'</g>';};
  s+=chevs(-14,C.mag,0.7)+chevs(14,C.cyan,0.7)+chevs(0,C.accent,1);
  // hot core spark at the tip
  s+=`<circle cx="512" cy="720" r="60" fill="${C.core}"/><circle cx="512" cy="720" r="26" fill="#fff3d0"/>`;
  // top nubs (drill mount)
  s+=`<rect x="452" y="150" width="120" height="46" fill="${C.steel}" stroke="#fff" stroke-width="8"/>`;
  return wrap(s);
}

const icons={A:iconA(),B:iconB(),C:iconC()};
for(const k of Object.keys(icons))fs.writeFileSync(path.join(OUT,'icon_'+k+'.svg'),icons[k]);
console.log('wrote', Object.keys(icons).map(k=>'icon_'+k+'.svg').join(', '),'to',OUT);
