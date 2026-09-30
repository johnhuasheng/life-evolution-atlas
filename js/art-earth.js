// 精细插图 · 地球事件（星球、地层、火山、冰川、海平面）
(function(){
const {r1,rnd,tube,circ}=K;
const R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join('');
const u=id=>`url(#{U}${id})`;
const st=a=>a.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('');
const lg=(id,a,x2,y2)=>`<linearGradient id="{U}${id}" x1="0" y1="0" x2="${x2==null?0:x2}" y2="${y2==null?1:y2}">${st(a)}</linearGradient>`;
const rg=(id,a,cx,cy,r,fx,fy)=>`<radialGradient id="{U}${id}" cx="${cx==null?.5:cx}" cy="${cy==null?.5:cy}" r="${r==null?.5:r}"${fx!=null?` fx="${fx}" fy="${fy}"`:''}>${st(a)}</radialGradient>`;
const D=s=>`<defs>${s}</defs>`;
const frame=(fill)=>`<rect x="6" y="6" width="188" height="104" rx="7" fill="${fill}"/>`;
const clip=(id,shape)=>`<clipPath id="{U}${id}">${shape}</clipPath>`;
const stars=(n,seed,x0,y0,w,h)=>{const r=rnd(seed);return R(n,()=>{const s=r();return `<circle cx="${r1(x0+r()*w)}" cy="${r1(y0+r()*h)}" r="${r1(.25+s*.7)}" fill="#fff" opacity="${r1(.35+s*.6)}"/>`;});};
// 行星：底色渐变 + 陆地（裁切在球内）+ 晨昏线阴影 + 大气光环 + 高光
function globe(cx,cy,r,o){
  const sea=o.sea||['#7FB7DC','#2F6E9E','#173F63'];
  return D(rg('gs',[[0,sea[0]],[.55,sea[1]],[1,sea[2]]],.36,.32,.75)+rg('gsh',[[.55,'#000',0],[1,'#06121c',.62]],.36,.34,.72)+clip('gc',`<circle cx="${cx}" cy="${cy}" r="${r}"/>`))+
  (o.halo?`<circle cx="${cx}" cy="${cy}" r="${r+4}" fill="none" stroke="${o.halo}" stroke-width="5" opacity=".22"/><circle cx="${cx}" cy="${cy}" r="${r+1.5}" fill="none" stroke="${o.halo}" stroke-width="2" opacity=".5"/>`:'')+
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${u('gs')}"/><g clip-path="${u('gc')}">${o.land||''}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${u('gsh')}"/></g>`+
  `<ellipse cx="${r1(cx-r*.38)}" cy="${r1(cy-r*.42)}" rx="${r1(r*.26)}" ry="${r1(r*.14)}" transform="rotate(-35 ${r1(cx-r*.38)} ${r1(cy-r*.42)})" fill="#fff" opacity=".22"/>`+
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#0d2436" stroke-opacity=".5" stroke-width=".8"/>`;
}
const landG=(id,a,b)=>lg(id,[[0,a],[1,b]],.3,1);
const land=(d,fill,edge)=>`<path d="${d}" fill="${fill}" stroke="${edge||'#3E5A2E'}" stroke-width=".7" stroke-linejoin="round"/>`;
const wave=(y,amp,seg,x0,x1)=>{let d=`M${x0} ${y}`;for(let x=x0;x<x1;x+=seg)d+=`q${seg/4} ${-amp} ${seg/2} 0t${seg/2} 0`;return d;};
const strata=(y0,cols,h,x0,x1,ws)=>cols.map((c,i)=>{const y=y0+i*h,w=ws||1.5;return `<path d="M${x0} ${y}${R(8,k=>`Q${r1(x0+(k+.5)*(x1-x0)/8)} ${r1(y+(k%2?w:-w))} ${r1(x0+(k+1)*(x1-x0)/8)} ${y}`)}V${y+h+2}H${x0}z" fill="${c}"/>`;}).join('');
const cloud=(x,y,s,c,op)=>`<g transform="translate(${x} ${y}) scale(${s})" opacity="${op||1}"><path d="M-18 6c-6 0-8-8-2-10 0-8 10-11 15-6 3-7 15-7 17 1 7-2 12 5 8 10z" fill="${c||'#fff'}"/><path d="M-18 6h38" stroke="#000" stroke-opacity=".08" stroke-width="2"/></g>`;
const bubbles=(pts,col)=>pts.map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${col||'#fff'}" fill-opacity=".35" stroke="${col||'#fff'}" stroke-width=".6"/><circle cx="${r1(x-r*.35)}" cy="${r1(y-r*.35)}" r="${r1(r*.3)}" fill="#fff" opacity=".8"/>`).join('');
const lum=c=>{const n=parseInt(c.slice(1),16);return ((n>>16)*.3+((n>>8)&255)*.59+(n&255)*.11)/255;};
const TX=(x,y,t,c,sz,anchor)=>{c=c||'#2A3A30';const lt=lum(c)>.6;return `<text x="${x}" y="${y}" fill="${c}" font-size="${sz||7.5}" font-weight="700" text-anchor="${anchor||'middle'}" style="font-family:inherit;paint-order:stroke;stroke:${lt?'#10141c':'#fff'};stroke-width:2.2px;stroke-opacity:${lt?.55:.75};stroke-linejoin:round">${t}</text>`;};
const arrow=(d,c,w)=>`<path d="${d}" fill="none" stroke="${c||'#C0392B'}" stroke-width="${w||1.6}" stroke-linecap="round" stroke-linejoin="round"/>`;
const head=(x,y,a,c,s)=>`<path transform="translate(${x} ${y}) rotate(${a}) scale(${s||1})" d="M0 0l-6-3.2 1.6 3.2-1.6 3.2z" fill="${c||'#C0392B'}"/>`;
// 剪影（用脊柱生成）
const sil=(pts,fill)=>`<path d="${tube(pts)}" fill="${fill}"/>`;

// ---------- 地球形成：炽热的岩浆海 + 忒伊亚撞击 ----------
ART.earth_form=[null,D(lg('sp',[[0,'#0B1026'],[1,'#1C1A3A']])+rg('mg',[[0,'#FFE08A'],[.35,'#F59A3A'],[.75,'#C2410C'],[1,'#5A1A0A']],.4,.38,.7)+rg('gl',[[0,'#FF9A3C',.55],[1,'#FF9A3C',0]])+rg('th',[[0,'#D9C7B0'],[1,'#5E5048']],.35,.35,.7)+clip('ec','<circle cx="82" cy="62" r="40"/>'))+
 frame(u('sp'))+stars(40,3,8,8,184,100)+`<circle cx="82" cy="62" r="56" fill="${u('gl')}"/><circle cx="82" cy="62" r="40" fill="${u('mg')}"/>`+
 `<g clip-path="${u('ec')}"><path fill="#4A1E10" opacity=".62" d="M44 48c6-6 12-8 18-6 4 4 2 10-2 14-6 2-12 0-16-8zM76 30c8-4 18-4 24 0 2 6-4 10-10 12-8 0-14-4-14-12zM100 56c6-2 12 0 14 6 0 6-4 12-10 12-6-2-8-10-4-18zM56 72c6-2 12 2 14 8-2 6-8 10-14 8-4-4-4-10 0-16zM84 90c6-4 12-2 14 2-2 4-8 6-14 4z"/><path fill="none" stroke="#FFE08A" stroke-width=".9" opacity=".85" d="M44 48c6-6 12-8 18-6M76 30c8-4 18-4 24 0M100 56c6-2 12 0 14 6M56 72c6-2 12 2 14 8M64 44l10 6 6-4M88 48l6 10-4 8M70 62l8 4 12-2"/><circle cx="82" cy="62" r="40" fill="${u('gsh2')}"/></g>`+
 D(rg('gsh2',[[.5,'#000',0],[1,'#1a0600',.7]],.35,.35,.72))+
 `<circle cx="160" cy="30" r="13" fill="${u('th')}"/><path d="M152 26c3-2 6-1 7 2M160 36c3 0 5-2 5-4" stroke="#4A3E36" stroke-width=".8" fill="none"/>`+
 `<path d="M150 38c-10 4-20 8-30 10" stroke="#FFB45A" stroke-width="3" stroke-linecap="round" opacity=".35"/>${R(14,i=>{const r=rnd(9+i)();return `<circle cx="${r1(118+i*2.4+r*6)}" cy="${r1(42+Math.sin(i)*6+r*4)}" r="${r1(.6+r*1.4)}" fill="${i%3?'#FFB45A':'#8A7060'}"/>`;})}`+
 TX(160,56,'忒伊亚','#F4E6D0',7)];

// ---------- 最早的海洋：暴雨、闪电、火山岛 ----------
ART.ocean=[null,D(lg('sk',[[0,'#5A5048'],[.55,'#B07A4E'],[1,'#E0A868']])+lg('oc',[[0,'#3E6A7A'],[1,'#12303C']])+lg('isl',[[0,'#5A4A40'],[1,'#2A221E']]))+
 frame(u('sk'))+cloud(56,20,1.6,'#4A4440')+cloud(120,16,2,'#3E3934')+cloud(170,24,1.3,'#4A4440')+
 `<g stroke="#C9D4DA" stroke-width=".7" opacity=".55">${R(26,i=>`<path d="M${24+i*6.4} ${32+(i%3)*3}l-4 ${40-(i%4)*4}"/>`)}</g>`+
 `<path d="M128 24l-6 16h6l-8 20" fill="none" stroke="#FFF6C8" stroke-width="2.2" stroke-linejoin="round"/><path d="M128 24l-6 16h6l-8 20" fill="none" stroke="#FFE45A" stroke-width=".8"/>`+
 `<path d="M30 80c6-16 12-22 18-22s10 8 16 22z" fill="${u('isl')}"/><path d="M44 60c-4-6-2-12 4-12 2-6 10-6 12 0 6-2 10 6 4 10" fill="#6A625C" opacity=".8"/><path d="M46 60c1 4 3 8 2 14" stroke="#F07A2A" stroke-width="1.4" fill="none"/>`+
 `<path d="M6 78h188v26a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="${u('oc')}"/>`+
 `<path d="${wave(80,2,14,6,194)}" fill="none" stroke="#9CC4D0" stroke-width="1.1" opacity=".8"/><path d="${wave(90,1.6,18,10,190)}" fill="none" stroke="#6E9AAA" stroke-width=".9" opacity=".7"/><path d="${wave(100,1.4,22,10,190)}" fill="none" stroke="#5A8494" stroke-width=".8" opacity=".6"/>`+
 `<path d="M150 82c6-2 14-2 20 0" stroke="#E6D2B0" stroke-width="1" opacity=".5" fill="none"/>`];

// ---------- 最早的生命：深海热泉 ----------
const chimney=(x,h,w,seed)=>{const r=rnd(seed);let pts=[],y=104;for(let i=0;i<=5;i++){pts.push([x+(r()-.5)*3,104-h*i/5,w*(1-i*.11)*(.85+r()*.3)]);}
 return `<path d="${tube(pts)}" fill="${u('ch')}" stroke="#2A1E18" stroke-width=".8"/>`+R(5,i=>`<path d="M${r1(pts[i][0]-pts[i][2]*.9)} ${r1(pts[i][1]-4)}q${r1(pts[i][2]*.9)} 2 ${r1(pts[i][2]*1.8)} 0" stroke="#C07A3A" stroke-width=".8" fill="none" opacity=".7"/>`)+`<ellipse cx="${r1(pts[5][0])}" cy="${r1(pts[5][1])}" rx="${r1(pts[5][2])}" ry="1.4" fill="#FFB060"/>`;};
ART.lifeorigin=[null,D(lg('dw',[[0,'#1E4E6A'],[1,'#07182A']])+lg('ch',[[0,'#5A4034'],[.5,'#8A5E40'],[1,'#3A2A22']],1,0)+rg('smk',[[0,'#1A1614',.9],[1,'#1A1614',0]])+rg('glow',[[0,'#FF9A3C',.5],[1,'#FF9A3C',0]]))+
 frame(u('dw'))+R(18,i=>{const r=rnd(40+i);return `<circle cx="${r1(10+r()*180)}" cy="${r1(10+r()*70)}" r="${r1(.4+r()*.8)}" fill="#BFE4F0" opacity="${r1(.2+r()*.4)}"/>`;})+
 `<ellipse cx="96" cy="30" rx="18" ry="16" fill="${u('smk')}"/><ellipse cx="90" cy="16" rx="22" ry="12" fill="${u('smk')}" opacity=".7"/><ellipse cx="130" cy="44" rx="14" ry="12" fill="${u('smk')}"/><ellipse cx="66" cy="54" rx="10" ry="9" fill="${u('smk')}" opacity=".8"/>`+
 `<ellipse cx="100" cy="100" rx="60" ry="14" fill="${u('glow')}"/>`+chimney(96,64,11,3)+chimney(128,46,8,5)+chimney(68,34,7,8)+chimney(150,24,5,2)+
 `<path d="M6 100c30-4 60 2 96-2s60 0 92 2v4a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#3A2E28"/><path d="M20 100c10-3 20-3 32 0M120 99c14-3 26-2 40 1" stroke="#E8E0C8" stroke-width="2" stroke-linecap="round" opacity=".7"/><path d="M22 102c8-2 18-2 28 0M124 101c10-2 22-2 32 0" stroke="#F0A860" stroke-width="1" stroke-linecap="round" opacity=".8"/>`+
 bubbles([[102,70,1.6],[110,58,1.1],[134,64,1.3],[74,76,1],[88,48,.9]],'#CDEBF5')+
 `<g transform="translate(166 30)"><circle r="14" fill="#0F2A3C" stroke="#7FB7DC" stroke-width="1.1"/><g fill="#7ED0B8" stroke="#2E7A66" stroke-width=".5">${R(7,i=>{const a=i*.9,d=3+(i%3)*3;return `<rect x="${r1(Math.cos(a)*d-3)}" y="${r1(Math.sin(a)*d-1.3)}" width="6" height="2.6" rx="1.3" transform="rotate(${i*37} ${r1(Math.cos(a)*d)} ${r1(Math.sin(a)*d)})"/>`;})}</g></g><path d="M156 40l-18 20" stroke="#7FB7DC" stroke-width=".7" stroke-dasharray="2 2"/>`];

// ---------- 真核细胞 ----------
const mito=(x,y,a,s)=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><ellipse rx="9" ry="4.4" fill="#E8834A" stroke="#8A3A16" stroke-width=".8"/><ellipse rx="7.4" ry="3" fill="#F6B07A"/><path d="M-6 -2.6v3M-3 2.6v-3.4M0 -2.8v3.2M3 2.6v-3.4M6 -2.4v3" stroke="#B4501E" stroke-width=".9" stroke-linecap="round"/></g>`;
ART.eukaryote=[null,D(rg('cy',[[0,'#F4FAF6'],[.8,'#CFE8DE'],[1,'#9CCBBE']],.42,.4,.62)+rg('nu',[[0,'#B7A4DA'],[.7,'#7E64B4'],[1,'#4E3A84']],.4,.38,.65))+
 `<ellipse cx="100" cy="60" rx="80" ry="48" fill="#6FA898" opacity=".25"/><path d="M26 62c-2-26 30-46 74-46s78 16 78 44-30 48-76 48-74-18-76-46z" fill="${u('cy')}" stroke="#3E7A6A" stroke-width="2.2"/><path d="M29 62c-2-24 28-43 71-43s75 15 75 41-28 45-73 45-71-17-73-43z" fill="none" stroke="#8CC4B2" stroke-width=".8"/>`+
 `<g fill="none" stroke="#A8C9BE" stroke-width=".5" opacity=".9"><path d="M36 50l40 10M60 30l20 26M130 26l-18 30M160 50l-38 12M160 80l-40-12M44 84l36-18"/></g>`+
 `<g fill="none" stroke="#7FA7C8" stroke-width="1.3" stroke-linecap="round"><path d="M66 44c-6 8-6 24 0 32M62 40c-10 10-10 30 0 40M58 36c-12 12-12 36 0 48M122 44c6 8 6 24 0 32"/></g>`+
 `<circle cx="94" cy="60" r="21" fill="${u('nu')}" stroke="#3A2A6A" stroke-width="1.4"/><circle cx="94" cy="60" r="18.6" fill="none" stroke="#C8B8E8" stroke-width=".6" stroke-dasharray="3 2.4"/><circle cx="99" cy="56" r="6" fill="#3E2A70"/><circle cx="97" cy="54" r="1.8" fill="#8A74C4"/><path d="M84 64c3 2 6 2 8 0M88 70c2 1 5 1 7 0" stroke="#5A4696" stroke-width=".8" fill="none"/>`+
 `<g transform="translate(140 76)" fill="none" stroke="#C88A2A" stroke-width="2" stroke-linecap="round"><path d="M-10 -8q10-4 20 0M-12 -3q12-4 24 0M-12 2q12-4 24 0M-10 7q10-4 20 0"/></g><g fill="#F2C86A" stroke="#A8761A" stroke-width=".5"><circle cx="156" cy="66" r="2"/><circle cx="154" cy="86" r="1.6"/><circle cx="160" cy="76" r="1.4"/></g>`+
 mito(52,78,20,1)+mito(140,36,-24,1.05)+mito(118,92,6,.85)+mito(160,56,70,.7)+
 R(9,i=>{const r=rnd(70+i);return `<circle cx="${r1(40+r()*130)}" cy="${r1(26+r()*70)}" r=".9" fill="#5A9A86" opacity=".7"/>`;})+
 TX(94,94,'细胞核','#3A2A6A',6.5)+TX(52,98,'线粒体','#8A3A16',6.5)];

// ---------- 大氧化事件：蓝细菌产氧，海底沉积条带状铁矿 ----------
const strom=(x,w,h)=>`<path d="M${x-w} 84c0-${h*1.1} ${w*.4}-${h*1.3} ${w}-${h*1.3}s${w} ${h*.2} ${w} ${h*1.3}z" fill="${u('sm')}" stroke="#2E5A2E" stroke-width=".8"/>`+R(4,i=>`<path d="M${r1(x-w*(1-i*.2))} 84c0-${r1(h*(1.05-i*.24))} ${r1(w*.35)}-${r1(h*(1.2-i*.26))} ${r1(w*(1-i*.2))}-${r1(h*(1.2-i*.26))}s${r1(w*(1-i*.2))} ${r1(h*.2)} ${r1(w*(1-i*.2))} ${r1(h*(1.2-i*.26))}" fill="none" stroke="#9CC47A" stroke-width=".6" opacity=".8"/>`);
ART.goe=[null,D(lg('sk',[[0,'#E8B87A'],[1,'#9CC8E4']],1,0)+lg('sea',[[0,'#78B8C8'],[1,'#2E6E86']])+lg('sm',[[0,'#6EA85A'],[1,'#2E5A2E']]))+
 frame(u('sk'))+`<circle cx="170" cy="22" r="9" fill="#FFE27A"/><circle cx="170" cy="22" r="14" fill="#FFE27A" opacity=".25"/>`+
 `<path d="M6 38h188v46H6z" fill="${u('sea')}"/><path d="${wave(38,1.4,12,6,194)}" fill="none" stroke="#D8F0F4" stroke-width="1"/>`+
 `<g opacity=".35" fill="#fff">${R(5,i=>`<path d="M${40+i*30} 40l-10 44h6z"/>`)}</g>`+
 strom(40,12,14)+strom(70,9,10)+strom(104,14,18)+strom(140,10,12)+strom(170,8,9)+
 `<path d="M6 84h188v20a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#8A5A44"/>`+strata(86,['#A8483A','#6E6A70','#B8543E','#5E5A62','#A8483A','#6E6A70'],4,6,194,.8)+
 `<path d="M6 104h188v0a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#5A3A30"/>`+
 bubbles([[104,56,2],[98,46,1.4],[110,44,1.2],[40,62,1.5],[46,52,1],[140,64,1.4],[144,52,1],[70,68,1.2]],'#EFFAFF')+
 R(4,i=>{const x=[28,86,124,158][i],y=[26,20,30,40][i];return `<text x="${x}" y="${y}" fill="#2E6E86" font-size="8" font-weight="700" style="font-family:inherit">O<tspan font-size="5" dy="2">2</tspan></text>`;})+
 TX(150,100,'条带状铁矿','#FBE8D8',6.2)];

// ---------- 雪球地球 ----------
ART.snowball=[null,D(lg('sp',[[0,'#0B1026'],[1,'#1E2446']])+rg('ice',[[0,'#FFFFFF'],[.6,'#DDEBF4'],[1,'#8FB0C8']],.36,.32,.75))+
 frame(u('sp'))+stars(34,11,8,8,184,100)+
 `<circle cx="100" cy="60" r="44" fill="#BFE0F4" opacity=".16"/><circle cx="100" cy="60" r="40" fill="${u('ice')}"/>`+
 `<g fill="none" stroke="#9EBCD2" stroke-width=".7" opacity=".9"><path d="M66 44c10 4 18 2 26 8s14 4 22 2M70 72c8-4 16-2 22 2s16 6 26 0M84 30c4 6 2 12 8 16M120 84c-4-6-10-8-12-14M130 40c-6 6-4 12-10 16"/></g>`+
 `<path d="M62 60c12-4 22 2 36 0s24-6 40 0" stroke="#B8D6EA" stroke-width="5" opacity=".55" fill="none"/>`+
 `<path d="M104 58l6-10 6 10z" fill="#5A4A44"/><path d="M110 48c-2-6 2-10 6-10 2-4 8-4 10 0" fill="none" stroke="#8A8A9A" stroke-width="2" opacity=".7" stroke-linecap="round"/><circle cx="110" cy="49" r="1.3" fill="#FF8A3A"/>`+
 `<circle cx="100" cy="60" r="40" fill="${u('ssh')}"/>`+D(rg('ssh',[[.55,'#000',0],[1,'#0a1a2e',.55]],.36,.34,.72))+
 `<ellipse cx="86" cy="42" rx="12" ry="6" transform="rotate(-35 86 42)" fill="#fff" opacity=".5"/>`+
 `<g stroke="#CFE4F2" stroke-width=".9" stroke-linecap="round"><path d="M28 30v8M24 34h8M25 31l6 6M31 31l-6 6M170 86v8M166 90h8"/></g>`];

// ---------- 奥陶纪末：冰川扩张，海平面下降 ----------
ART.lifeX_ice=[null,D(lg('sk',[[0,'#C8DCEA'],[1,'#EEF4F6']])+lg('ic',[[0,'#FFFFFF'],[1,'#A8C8DC']])+lg('sea',[[0,'#7AAAC4'],[1,'#3E6E8A']])+lg('sh',[[0,'#C9B48E'],[1,'#8A7658']]))+
 frame(u('sk'))+`<path d="M6 30c10-8 24-10 36-8 12-6 26-2 34 6 4 12 2 30-2 50l-68 6z" fill="${u('ic')}" stroke="#7FA2BC" stroke-width=".9"/><path d="M20 32l6 30M36 28l4 34M54 30l2 30M68 34l-2 26" stroke="#9CBCD2" stroke-width=".7"/>`+
 `<path d="M6 84l70-6c20 4 40 8 60 10l58 2v14a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="${u('sh')}"/>`+strata(96,['#A8946E','#957F5C'],5,6,194,1)+
 `<path d="M104 86c30 2 60 2 90 0v18a6 6 0 0 1-6 6h-76c-4-8-8-16-8-24z" fill="${u('sea')}" opacity=".95"/><path d="${wave(86,1,10,110,194)}" stroke="#D6ECF4" stroke-width=".9" fill="none"/>`+
 `<path d="M80 50H194" stroke="#3E6E8A" stroke-width="1" stroke-dasharray="4 3"/>`+TX(150,46,'原海平面','#2E5A76',7.5)+
 `<path d="M150 54v26" stroke="#C0392B" stroke-width="1.6"/>`+head(150,82,90)+
 `<g transform="translate(92 84) rotate(-6)"><path d="M0 0l22-3 1 3-22 3z" fill="#E8DCC4" stroke="#6E5A44" stroke-width=".6"/><path d="M5 -.8v2.6M10 -1.4v2.6M15 -2v2.6" stroke="#6E5A44" stroke-width=".5"/></g><g transform="translate(126 90)"><ellipse rx="6" ry="4" fill="#A8947A" stroke="#5A4A3A" stroke-width=".6"/><path d="M-4 -1h8M-4 1h8M0 -4v8" stroke="#5A4A3A" stroke-width=".4"/></g>`];

// ---------- 泥盆纪晚期：海洋缺氧 ----------
ART.lifeX_anox=[null,D(lg('w',[[0,'#8CC0C8'],[.35,'#4E7A7E'],[.7,'#3A3E4A'],[1,'#1C1A24']])+lg('bl',[[0,'#8CC04A',.9],[1,'#8CC04A',0]]))+
 frame(u('w'))+`<path d="M6 13a7 7 0 0 1 7-7h174a7 7 0 0 1 7 7v7H6z" fill="${u('bl')}"/>`+R(22,i=>{const r=rnd(90+i);return `<circle cx="${r1(10+r()*180)}" cy="${r1(9+r()*12)}" r="${r1(.8+r()*1.2)}" fill="#6EA83A" opacity=".8"/>`;})+
 `<path d="M6 36c30 2 60-2 90 1s64 2 98-1" stroke="#1C1A24" stroke-width="1" stroke-dasharray="3 3" opacity=".6" fill="none"/>`+TX(160,48,'缺氧水层','#F0E6F0',6.5)+
 `<g transform="translate(92 60) rotate(14)" fill="none" stroke="#E6DCC8" stroke-width="1.1" stroke-linecap="round"><path d="M-24 0c10-6 30-6 44 0"/>${R(8,i=>`<path d="M${-18+i*5} -2l-2 -5M${-18+i*5} 2l-2 5"/>`)}<path d="M20 0l6-5v10z" stroke-linejoin="round"/><path d="M-30 -4c3 1 5 3 6 4-1 1-3 3-6 4" /><circle cx="-24" cy="-1" r="1.4" fill="#E6DCC8"/></g>`+
 `<g transform="translate(40 86) rotate(-10)"><path d="M-10 0c0-8 8-12 16-8 4 2 4 8 0 10-6 2-10-2-8-6" fill="none" stroke="#B4A88A" stroke-width="1.6"/></g>`+
 `<path d="M6 94c30-3 60 2 96-1s60-1 92 1v10a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#14121A"/>`+strata(98,['#2A2632','#1C1A22','#2E2A36'],3.4,6,194,.6)+
 bubbles([[150,80,1],[156,70,.8],[60,76,.8]],'#9AA0B4')+TX(52,106,'黑色页岩','#C8C2D4',6.2)];

// ---------- 盘古大陆 ----------
const PANG='M64 28c10-6 26-8 38-4 8-6 22-6 30 2 8 4 12 12 10 20-2 6-10 8-18 8-8 0-14 6-20 10-6 4-12 4-16 8 4 8 4 18-2 26-4 8-10 14-16 18-6-4-10-12-10-20-4-6-12-8-14-16 0-8 6-12 4-20-4-6-6-14-2-20 2-6 8-10 16-12z';
ART.pangaea=[null,D(lg('sp',[[0,'#0B1026'],[1,'#1E2446']])+landG('ld',"#9CBA6A","#6E8A48"))+frame(u('sp'))+stars(26,7,8,8,184,100)+
 globe(100,60,46,{halo:'#8CC8F0',land:
  `<path d="${PANG}" fill="${u('ld')}" stroke="#3E5A2E" stroke-width=".8"/><path d="M78 40c8 4 16 2 22 6 6 4 12 2 18 0M72 62c6 4 10 10 12 16" fill="none" stroke="#D8C08A" stroke-width="7" opacity=".55" stroke-linecap="round"/><path d="M74 50l4-4 3 4 3-4 3 4 3-4 3 4" fill="none" stroke="#5A4A34" stroke-width=".9"/><path d="M66 28c8-2 16-2 22 0-6 4-16 4-22 0z" fill="#fff" opacity=".85"/><path d="M84 92c6 2 10 4 14 2" stroke="#fff" stroke-width="3" opacity=".7" stroke-linecap="round"/>`})+
 TX(96,64,'盘古大陆','#2E3A1E',8)+TX(136,74,'特提斯洋','#DCEEFA',6.5)+TX(150,100,'泛大洋','#BFD8EA',6.5)];

// ---------- 二叠纪末：西伯利亚玄武岩喷发 ----------
ART.volcano=[null,D(lg('sk',[[0,'#3A2A2A'],[.6,'#8A3A22'],[1,'#D86A2A']])+lg('bs',[[0,'#4A4644'],[1,'#26221F']])+lg('lv',[[0,'#FFE27A'],[.5,'#FF8A2A'],[1,'#C2310C']])+rg('ash',[[0,'#2A2624',.95],[1,'#2A2624',0]]))+
 frame(u('sk'))+`<ellipse cx="70" cy="30" rx="44" ry="22" fill="${u('ash')}"/><ellipse cx="130" cy="24" rx="50" ry="20" fill="${u('ash')}"/><ellipse cx="100" cy="40" rx="30" ry="14" fill="${u('ash')}"/>`+
 R(10,i=>{const r=rnd(120+i);return `<circle cx="${r1(40+r()*120)}" cy="${r1(20+r()*30)}" r="${r1(.6+r()*1)}" fill="#FF9A3A"/>`;})+
 `<path d="M6 110V64h40v6h30v8h36v-6h44v10h38v28z" fill="${u('bs')}"/><path d="M6 72h40M46 76h30M6 84h70M76 86h36M112 80h44M112 92h82M156 88h38M6 98h188" stroke="#6E6660" stroke-width=".8"/>`+
 R(12,i=>`<path d="M${14+i*15} ${[66,72,80,74,78,82,84,76,86,80,88,92][i]}v${6+(i%3)*3}" stroke="#1A1614" stroke-width=".7"/>`)+
 `<path d="M84 78c2-10 0-22 4-34 2 10 4 14 2 20 4-8 8-10 6-22 6 12 4 24 0 36z" fill="${u('lv')}"/><path d="M120 72c2-8 0-16 4-24 2 8 3 12 1 18 3-4 5-6 4-12 4 8 2 14-1 18z" fill="${u('lv')}"/>`+
 `<path d="M84 78c-10 6-20 14-30 16s-24 0-34 4" stroke="${u('lv')}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M84 78c-10 6-20 14-30 16s-24 0-34 4" stroke="#FFE27A" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M122 72c8 6 16 10 26 12s22 4 34 8" stroke="#FF8A2A" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M122 72c8 6 16 10 26 12s22 4 34 8" stroke="#FFE27A" stroke-width=".8" fill="none"/>`];

// ---------- 三叠纪末：大陆裂开，岩浆涌出 ----------
ART.rift=[null,D(lg('sk',[[0,'#8E9AA4'],[1,'#E0C8A8']])+lg('mg',[[0,'#FFB04A'],[1,'#A8260C']])+lg('crL',[[0,'#B8A488'],[1,'#7E6C58']])+rg('ash',[[0,'#4A4644',.85],[1,'#4A4644',0]]))+
 frame(u('sk'))+`<ellipse cx="96" cy="24" rx="34" ry="14" fill="${u('ash')}"/><ellipse cx="120" cy="16" rx="26" ry="10" fill="${u('ash')}"/>`+
 `<path d="M6 104V58h74l10 46z" fill="${u('crL')}"/><path d="M194 104V54h-86l-8 50z" fill="${u('crL')}"/>`+
 `<g stroke="#6A5A48" stroke-width=".8" fill="none"><path d="M6 68h76M6 80h78M6 92h81M106 66h88M104 78h90M102 90h92"/></g><g fill="#9A8A70" opacity=".6"><path d="M6 68h76v4H6zM106 78h88v4h-88z"/></g>`+
 `<path d="M6 58h74M108 54h86" stroke="#6E8A48" stroke-width="3"/><path d="M6 104h188v0a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#8A2A14"/>`+
 `<path d="M80 58l10 46h10l8-50c-6 8-10 16-14 26-4-8-8-16-14-22z" fill="${u('mg')}"/><path d="M92 76c-2-10-6-20-2-32 2 8 4 12 4 18 2-10 6-14 6-24 4 10 4 22 0 34z" fill="#FFB04A"/><path d="M93 74c-1-8-3-14-1-22 1 4 2 8 2 12 1-6 3-8 3-14 2 6 2 14-1 22z" fill="#FFE27A"/>`+
 `<path d="M54 50l-8-2m150 0" stroke="none"/>${arrow('M60 46H40')}${head(38,46,180)}${arrow('M136 44h20')}${head(158,44,0)}`];

// ---------- 盘古大陆解体：大西洋张开 ----------
ART.breakup=[null,D(lg('sea',[[0,'#A8D0EA'],[1,'#5A94C0']])+landG('ld','#A8C47A','#6E8E4A'))+
 frame(u('sea'))+`<g opacity=".4" stroke="#fff" stroke-width=".6" fill="none">${R(6,i=>`<path d="${wave(20+i*16,1,12,10,190)}"/>`)}</g>`+
 `<path d="M36 22c14-4 28 0 36 10 4 8 2 16-4 22-4 10-10 22-18 34-4-8-6-18-10-26-8-8-12-18-12-28 0-6 2-10 8-12z" fill="${u('ld')}" stroke="#3E5A2E" stroke-width=".9"/>`+
 `<path d="M112 20c16-6 36-4 48 6 6 6 12 10 18 12-2 10-8 16-14 22-2 10-8 20-16 28-6-8-6-18-10-26-8-4-18-8-24-14-4-10-6-20-2-28z" fill="${u('ld')}" stroke="#3E5A2E" stroke-width=".9"/>`+
 `<path d="M44 34l6 4 6-2M40 50l8 2M130 34l10 2 8-2M126 50l12-2" stroke="#6E8A48" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".6"/><path d="M50 28c4 2 8 2 12 0M128 26c6 2 12 2 18 0" stroke="#C8B070" stroke-width="3" opacity=".5" stroke-linecap="round"/>`+
 `<path d="M92 16c-4 10 2 18-2 28s4 18 0 28 2 20-2 30" fill="none" stroke="#C0392B" stroke-width="1.6" stroke-dasharray="3 2.2"/>${R(6,i=>`<path d="M${88+(i%2)*2} ${24+i*14}h8" stroke="#C0392B" stroke-width=".9"/>`)}`+
 arrow('M78 62H62')+head(60,62,180)+arrow('M104 62h16')+head(122,62,0)+
 TX(44,104,'南美','#2E4A1E',8)+TX(140,104,'非洲','#2E4A1E',8)+TX(92,12.5,'洋中脊','#8A2A1E',6)];

// ---------- 白垩纪末：小行星撞击 ----------
const sauro=`M-40 0c2-12 14-18 28-18 10 0 18 4 22 8l14-16c4-4 10-10 16-10 4 0 6 2 5 4l-3 1c-4 0-8 4-12 8l-14 20c2 4 2 8 0 10h-6l-2-8-6 8h-6l-1-6h-16l-2 8h-6l-1-8c-6 0-10 2-12 6h-8z`;
const trex=`M-22 0l6-10c-6-2-14-6-22-6 10-2 18-2 26 0 4-6 12-8 20-6l8-2c4 0 6 2 6 4 0 2-2 3-6 3l-6 1c-2 4-4 6-6 7l2 4h-3l-2-3c-2 1-4 2-5 2l4 6h-5l-3-5-4 5z`;
ART.asteroid=[null,D(lg('sk',[[0,'#1E2140'],[.55,'#7A3A4A'],[1,'#F0A050']])+lg('tr',[[0,'#FFE8A0',0],[.6,'#FFB050',.8],[1,'#FFF2C8']],1,1)+rg('fl',[[0,'#FFF6D0'],[.3,'#FFC860',.9],[1,'#FF7A2A',0]])+rg('ast',[[0,'#A89A8A'],[1,'#3E3632']],.35,.35,.7))+
 frame(u('sk'))+stars(18,5,8,8,184,40)+
 `<path d="M190 8L96 60l6 6L194 16z" fill="${u('tr')}"/><path d="M188 10L98 61l3 3 91-51z" fill="#FFF6D8" opacity=".8"/>`+
 `<circle cx="96" cy="64" r="16" fill="#FFB050" opacity=".35"/><circle cx="96" cy="64" r="9" fill="${u('ast')}" stroke="#FFD27A" stroke-width="1.4"/><circle cx="93" cy="61" r="2" fill="#5A4E46"/><circle cx="99" cy="67" r="1.4" fill="#5A4E46"/>`+
 `<ellipse cx="46" cy="94" rx="40" ry="18" fill="${u('fl')}"/>`+
 `<path d="M6 94c30-3 60 3 100 0s60 2 88-1v10a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#2A2228"/>`+
 `<g transform="translate(166 95) scale(-.85 .85)" fill="#1A161C">${sil([[-46,-12,.6],[-34,-14,2.4],[-20,-17,6.5],[-6,-19,10],[8,-18,9],[16,-22,4.4],[22,-34,2.8],[25,-46,2.3],[29,-50,2.6],[34,-49,1.4]],'#1A161C')}${[-12,-5,6,12].map(x=>sil([[x,-14,3.4],[x,-4,2.8],[x+.5,0,2.8]],'#1A161C')).join('')}</g>`+
 `<g transform="translate(128 95) scale(.9)" fill="#1A161C">${sil([[34,-22,.5],[22,-24,2.8],[8,-26,7],[-2,-27,7.5],[-10,-31,5],[-16,-35,4.4],[-23,-34,3.6],[-27,-33,2.4]],'#1A161C')}${sil([[2,-24,6],[5,-14,3.4],[2,-4,2.2],[-3,0,1.6]],'#1A161C')}${sil([[-4,-24,5],[-2,-14,3],[-6,-4,2],[-10,0,1.5]],'#1A161C')}${sil([[-10,-26,1.2],[-13,-22,.8]],'#1A161C')}</g>`+
 `<g transform="translate(160 40)" fill="#1A161C"><path d="M-10 0c4-2 8-2 10 0 2-2 6-2 10 0-4 0-7 1-10 3-3-2-6-3-10-3z"/></g>`];

// ---------- 古新世—始新世极热事件 ----------
ART.petm=[null,D(lg('sk',[[0,'#F6C878'],[1,'#F8E8C8']])+lg('sea',[[0,'#5AB0B8'],[1,'#1E6A7A']])+lg('pal',[[0,'#8A6440'],[1,'#5A4028']],1,0)+lg('th',[[0,'#FFD0C0'],[1,'#E0301E']]))+
 frame(u('sk'))+`<circle cx="36" cy="28" r="11" fill="#FFE07A"/><circle cx="36" cy="28" r="18" fill="#FFE07A" opacity=".35"/><circle cx="36" cy="28" r="26" fill="#FFE07A" opacity=".15"/>`+
 `<path d="M6 86h188v18a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="${u('sea')}"/><path d="${wave(86,1.2,12,6,194)}" stroke="#BFEAEA" stroke-width="1" fill="none"/>`+
 `<path d="M46 88c10-10 30-14 60-12 20 2 30 6 36 12z" fill="#C8B070"/><path d="M52 88c10-6 24-8 40-8" stroke="#6E9A4A" stroke-width="4" stroke-linecap="round" opacity=".7"/>`+
 `<path d="M82 86c0-20 0-36 6-52l3.4 1c-5 16-5 32-4.4 51z" fill="${u('pal')}"/>${R(9,i=>`<path d="M${r1(83.5+i*.4)} ${80-i*5.4}h4" stroke="#3E2A18" stroke-width=".6"/>`)}`+
 `<g stroke-linecap="round" fill="none">${[[-150,26],[-120,24],[-90,16],[-60,24],[-30,26],[-170,20],[-10,20]].map(([a,L],i)=>{const A=a*Math.PI/180,ex=90+Math.cos(A)*L,ey=34+Math.sin(A)*L*.7+L*.35;return `<path d="M90 34Q${r1(90+Math.cos(A)*L*.5)} ${r1(34+Math.sin(A)*L*.6-4)} ${r1(ex)} ${r1(ey)}" stroke="${i%2?'#2E7A3A':'#4E9A4A'}" stroke-width="3"/><path d="M90 34Q${r1(90+Math.cos(A)*L*.5)} ${r1(34+Math.sin(A)*L*.6-4)} ${r1(ex)} ${r1(ey)}" stroke="#A8D48A" stroke-width=".6"/>`;}).join('')}</g><circle cx="90" cy="36" r="2" fill="#8A5A2A"/><circle cx="93" cy="37" r="1.8" fill="#8A5A2A"/>`+
 bubbles([[150,98,1.4],[156,92,1],[146,90,.8],[162,100,1.2]],'#E0FFFF')+TX(156,82,'CH₄','#1E5A6A',6.5)+
 `<rect x="170" y="16" width="12" height="56" rx="6" fill="#fff" stroke="#8A7A6A" stroke-width="1"/><rect x="173" y="26" width="6" height="46" fill="${u('th')}"/><circle cx="176" cy="76" r="9" fill="#E0301E" stroke="#8A1A10" stroke-width="1"/><circle cx="173" cy="73" r="2.4" fill="#FF9A8A"/>${R(5,i=>`<path d="M182 ${24+i*9}h4" stroke="#8A7A6A" stroke-width=".8"/>`)}`];

// ---------- 印度撞上亚洲：喜马拉雅隆起 ----------
ART.himalaya=[null,D(lg('sk',[[0,'#A8CCE4'],[1,'#EAF2F4']])+lg('mt',[[0,'#8A8074'],[1,'#5A5048']],1,0)+lg('mt2',[[0,'#B4AA9C'],[1,'#8A8074']],1,0)+lg('sn',[[0,'#FFFFFF'],[1,'#C8DCEA']]))+
 frame(u('sk'))+`<path d="M6 80l26-22 16 10 22-30 18 16 24-32 22 26 16-12 20 18 24-10v36H6z" fill="${u('mt2')}" opacity=".7"/>`+
 `<path d="M6 92l30-30 18 14 30-44 20 22 24-18 26 26 18-10 22 24v14H6z" fill="${u('mt')}"/><path d="M84 32l-8 18 8-4 6 8 6-6 8 4z" fill="${u('sn')}"/><path d="M36 62l-6 8 6-2 4 4 4-4 6 2z" fill="${u('sn')}"/><path d="M128 36l-6 8 5-1 4 4 5-3 6 2z" fill="${u('sn')}"/>`+
 `<path d="M84 32l-10 30M84 32l14 36M128 36l-8 24M36 62l-4 16" stroke="#4A4038" stroke-width=".7" fill="none" opacity=".6"/>`+
 `<path d="M6 92h188v12a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#8A7458"/><path d="M6 96c40 2 70 0 94-4 30 4 60 6 94 4" stroke="#6A5440" stroke-width="1" fill="none"/><path d="M6 102c40 2 74 0 94-6 30 6 60 8 94 6" stroke="#6A5440" stroke-width="1" fill="none"/>`+
 `<g transform="translate(98 56)"><circle r="6" fill="#D8CCB4" stroke="#6E5E48" stroke-width=".8"/><path d="M0 0c2 0 3 1.4 2.4 3-1 2-4 2-5 0-1.6-3 1-6 4-6 4.6 0 7 4 6 8" fill="none" stroke="#6E5E48" stroke-width=".8"/></g>`+
 arrow('M20 104h40')+head(64,104,0)+TX(100,106,'印度板块北移','#FBF2E4',6.5)+TX(98,72,'海洋化石','#3A2E22',5.8)];

// ---------- 南极冰盖 ----------
ART.antarctic=[null,D(lg('sp',[[0,'#0E1A34'],[1,'#1E2E52']])+rg('ai',[[0,'#FFFFFF'],[.7,'#E2EEF6'],[1,'#9EC0D8']],.42,.4,.7))+
 frame(u('sp'))+stars(22,13,8,8,184,100)+
 globe(100,60,44,{sea:['#6FA8D0','#245C8A','#0E2E4E'],halo:'#9ED0F4',land:
 `<path d="M76 40c14-10 34-8 46 2 10 4 16 14 14 26-4 10-14 16-26 18-14 4-28 0-38-10-8-10-8-26 4-36z" fill="${u('ai')}" stroke="#8AB0C8" stroke-width=".9"/><path d="M86 50c8-4 18-2 24 4M84 66c10 4 22 4 32-2M98 40c2 8 0 14-2 22" stroke="#B4CCDC" stroke-width=".8" fill="none"/><path d="M122 48c6 4 8 8 8 12" stroke="#fff" stroke-width="2" fill="none"/>`})+
 `<ellipse cx="100" cy="60" rx="54" ry="54" fill="none" stroke="#7FD0F0" stroke-width="1.8" stroke-dasharray="7 5" opacity=".9"/>`+head(154,56,90,'#7FD0F0')+head(46,64,-90,'#7FD0F0')+head(104,114,180,'#7FD0F0',.9)+
 TX(100,64,'南极洲','#2E5A7A',8)+TX(168,104,'环南极洋流','#BFE6FA',6)];

// ---------- 巴拿马地峡 ----------
ART.isthmus=[null,D(lg('sea',[[0,'#B8DCF0'],[1,'#6AA4CC']])+landG('ld','#B4CC84','#7A9A52'))+frame(u('sea'))+
 `<g opacity=".35" stroke="#fff" stroke-width=".6" fill="none">${R(6,i=>`<path d="${wave(16+i*16,1,12,10,190)}"/>`)}</g>`+
 `<path d="M30 6h110c4 12-4 22-16 26-10 4-16 12-22 18-6 4-10 8-12 12-4-2-8-2-10-6-10-2-18-10-26-18-10-6-18-18-24-32z" fill="${u('ld')}" stroke="#3E5A2E" stroke-width=".9"/>`+
 `<path d="M86 64c2 4 6 6 10 8 4 2 8 6 12 10 8 0 16 4 18 10-2 6-6 10-10 18h-24c-4-8-6-18-8-26-2-6 0-12 2-20z" fill="${u('ld')}" stroke="#3E5A2E" stroke-width=".9"/>`+
 `<path d="M60 14l8 8 6-4 8 10M48 22l10 14" stroke="#8A7A5A" stroke-width="1.4" fill="none" opacity=".6"/><path d="M92 76l4 10 2 10" stroke="#8A7A5A" stroke-width="1.4" fill="none" opacity=".6"/>`+
 `<circle cx="88" cy="64" r="7" fill="none" stroke="#FFE27A" stroke-width="1.6"/>`+
 arrow('M70 44c4 10 8 20 14 30','#C0392B',1.8)+head(86,77,62)+arrow('M124 98c-8-10-16-18-22-28','#C0392B',1.8)+head(100,67,-125)+
 TX(98,22,'北美','#2E4A1E',8)+TX(106,104,'南美','#2E4A1E',8)+TX(150,66,'生物大交换','#8A2A1E',6.5)];

// ---------- 第四纪冰期：山谷冰川 ----------
ART.glacier=[null,D(lg('sk',[[0,'#9EC4DE'],[1,'#E8F2F6']])+lg('mt',[[0,'#8E8680'],[1,'#5E5650']],1,0)+lg('ic',[[0,'#FFFFFF'],[.5,'#D4E8F4'],[1,'#8FB8D4']],1,0))+
 frame(u('sk'))+`<path d="M6 60l24-26 16 14 20-26 22 20 18-16 30 30 20-18 38 30v44H6z" fill="#B8C4CC" opacity=".6"/>`+
 `<path d="M6 104l28-54 22 26 30-50 32 42 22-22 48 58z" fill="${u('mt')}"/><path d="M34 50l-7 13 6-2 4 5 5-5 4 2zM86 26l-10 16 7-2 5 6 5-5 6 2zM130 54l-6 10 5-2 4 4 4-4 5 1z" fill="#fff"/>`+
 `<path d="M74 40l14-14 16 22c-4 12-2 24 6 36l12 20H66c8-14 10-30 4-44-2-8-2-14 4-20z" fill="${u('ic')}" stroke="#7FA6C2" stroke-width=".8"/>`+
 `<path d="M80 56l10 2 10-2M76 72l14 2 14-2M78 88l14 2 16-2" stroke="#7FA6C2" stroke-width=".8" fill="none"/><path d="M84 50l-2 6M96 52l1 6M86 66l-1 6M100 68l1 6M90 82l-1 6" stroke="#5E88A8" stroke-width=".9"/>`+
 `<path d="M66 104c6-4 10-4 14-2M110 102c6-2 12-2 16 2" stroke="#8A7E70" stroke-width="3" stroke-linecap="round"/><circle cx="72" cy="102" r="2" fill="#7A6E64"/><circle cx="118" cy="101" r="1.6" fill="#7A6E64"/>`+
 `<g stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" opacity=".9"><path d="M170 18v8M166 22h8M167 19l6 6M173 19l-6 6M24 20v6M21 23h6"/></g>`];

// ---------- 末次冰期结束：冰盖消退，森林回归 ----------
ART.holocene=[null,D(lg('sk',[[0,'#9CCCEA'],[1,'#F4EAD0']])+lg('ic',[[0,'#FFFFFF'],[1,'#A8C8DC']])+lg('gr',[[0,'#A8C87A'],[1,'#6E9A4A']])+lg('lk',[[0,'#7AB8D8'],[1,'#3E7AA4']]))+
 frame(u('sk'))+`<circle cx="140" cy="30" r="11" fill="#FFE07A"/><circle cx="140" cy="30" r="18" fill="#FFE07A" opacity=".3"/>`+
 `<path d="M6 36c10-6 22-6 32-2 8 2 12 8 12 16l4 40H6z" fill="${u('ic')}" stroke="#7FA2BC" stroke-width=".9"/><path d="M50 50l4 40" stroke="#8FB0C8" stroke-width=".8"/><path d="M40 40l6 50M24 36l2 54" stroke="#B4CCDC" stroke-width=".7"/>`+
 `<path d="M44 90c8-6 20-6 34-4l-6 8H44z" fill="${u('lk')}"/><path d="M52 58c2 10 0 20 4 30" stroke="#8FC0DE" stroke-width="1.2" fill="none"/>`+
 `<path d="M6 92c30-6 60-10 100-10s60 4 88 6v16a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="${u('gr')}"/>`+
 [[112,1],[128,.8],[146,1.1],[164,.9],[182,1]].map(([x,s],i)=>`<g transform="translate(${x} ${86+i%2*2}) scale(${s})"><path d="M0 0v-8" stroke="#5A4028" stroke-width="1.6"/>${R(4,k=>`<path d="M${-7+k*1.2} ${-6-k*5}L0 ${-14-k*5}l${7-k*1.2} ${8}z" fill="${k%2?'#3E7A3A':'#2E6A34'}"/>`)}</g>`).join('')+
 `<g stroke="#6E9A4A" stroke-width="1" fill="none">${R(10,i=>`<path d="M${70+i*4} 94q-1-4 1-7"/>`)}</g>`+
 arrow('M58 30h-14')+head(42,30,180)+TX(72,33,'冰盖后退','#2E5A76',6.5,'start')];
const FR=/<rect x="6" y="6" width="188" height="104" rx="7" fill="[^"]*"\/>/;
const wrapFrames=keys=>keys.forEach(k=>{const b=ART[k][1],m=b.match(FR);if(!m)return;const i=b.indexOf(m[0])+m[0].length;
 ART[k][1]=b.slice(0,i)+`<g clip-path="url(#{U}fr)">`+b.slice(i)+`</g><rect x="6.4" y="6.4" width="187.2" height="103.2" rx="6.8" fill="none" stroke="#0b1a14" stroke-opacity=".18"/>`+D(clip('fr','<rect x="6" y="6" width="188" height="104" rx="7"/>'));});
wrapFrames(['earth_form','ocean','lifeorigin','goe','snowball','lifeX_ice','lifeX_anox','pangaea','volcano','rift','breakup','asteroid','petm','himalaya','antarctic','isthmus','glacier','holocene']);
K.ex={R,u,st,lg,rg,D,frame,clip,stars,globe,landG,land,wave,strata,cloud,bubbles,TX,arrow,head,sil,lum,wrapFrames};
})();
