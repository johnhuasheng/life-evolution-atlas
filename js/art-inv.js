// 精细插图 · 海洋无脊椎动物、昆虫与陆生节肢动物
(function(){
const {U,T,fur,rim,eye,claws,r1,scales,stripes}=K;
const R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join('');
const seabed='<path class="g" d="M6 110c28-4 58 3 92 0s66-3 96 0"/>';
const leg=(pts,cls)=>T(cls||'m',pts);

/* ===== 海洋无脊椎 ===== */
// 三叶虫（俯视）
ART.trilobite=[null,
 U(['M60 46C60 26 78 14 100 14S140 26 140 46Z','M62 44L52 76L68 48Z','M138 44L148 76L132 48Z',
   ...Array.from({length:9},(_,i)=>{const y=45+i*5.2,w=37-i*1.2;return `M${r1(100-w)} ${r1(y)}L${r1(100+w)} ${r1(y)}L${r1(100+w+3)} ${r1(y+7)}L${r1(100+w-2)} ${r1(y+5.2)}L${r1(100-w+2)} ${r1(y+5.2)}L${r1(100-w-3)} ${r1(y+7)}Z`;}),
   'M68 92h64c-4 14-18 22-32 22s-28-8-32-22z'])+
 `<path class="kt" d="${R(9,i=>{const y=45+i*5.2,w=37-i*1.2;return `M${r1(100-w)} ${r1(y)}H${r1(100+w)}`;})}"/>`+
 U([[[100,112,4.5],[100,94,6],[100,70,7.5],[100,46,8]]],{fill:'url(#{U}ax)'})+`<defs><linearGradient id="{U}ax" x1="0" x2="1"><stop offset="0" style="stop-color:var(--am)"/><stop offset=".45" style="stop-color:var(--al)"/><stop offset="1" style="stop-color:var(--ab)"/></linearGradient></defs>`+
 `<path class="kt" d="${R(12,i=>`M${r1(93+i*.1)} ${r1(48+i*5.3)}h${r1(14-i*.2)}`)}M80 95l6 14M120 95l-6 14M88 94l3 16M112 94l-3 16"/>`+
 U([[[100,42,6.5],[100,30,9],[100,20,7]]],{fill:'url(#{U}ax)'})+`<path class="kt" d="M94 36h12M95 30h10"/>`+
 `<path class="d" d="M74 32c5-5 12-5 15 0-4 3-10 3-15 0zM126 32c-5-5-12-5-15 0 4 3 10 3 15 0z"/>`+R(5,i=>`<circle cx="${76+i*2.6}" cy="${31.4-Math.sin(i/4*3.1)*1.2}" r=".7" fill="#E8E2CC"/><circle cx="${113+i*2.6}" cy="${31.4-Math.sin(i/4*3.1)*1.2}" r=".7" fill="#E8E2CC"/>`)+
 `<path class="rim" d="M70 38c6-14 18-20 30-20"/>`];

// 奇虾（俯视）
const anoFlaps=Array.from({length:8},(_,i)=>{const x=50+i*13.5,dy=Math.abs(i-3.5)*1.2;return [`M${x-10} ${42+dy}q10-10 20 0q-10 6-20 0z`,`M${x-10} ${78-dy}q10 10 20 0q-10-6-20 0z`];}).flat();
ART.anomalocaris=[null,U(['M44 60L16 42l8 18-8 18z','M44 60l-20-8 5 8-5 8z'],{})+
 U(anoFlaps)+`<path class="kt" style="opacity:.6" d="${R(8,i=>{const x=50+i*13.5,dy=Math.abs(i-3.5)*1.2;return `M${x-6} ${40+dy}l6-3M${x-3} ${42+dy}l7-3M${x-6} ${80-dy}l6 3M${x-3} ${78-dy}l7 3`;})}"/>`+
 U([[[40,60,3,3],[60,60,13,13],[100,60,15,15],[140,60,12,12],[150,60,8,8]]],{fill:'url(#{U}ax)'})+`<defs><linearGradient id="{U}ax" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--am)"/><stop offset=".5" style="stop-color:var(--al)"/><stop offset="1" style="stop-color:var(--am)"/></linearGradient></defs>`+
 `<path class="kt" d="${R(8,i=>`M${50+i*13.5} 47v26`)}"/>`+
 U([[[146,60,9,9],[158,60,11,11],[166,60,7,7]]])+
 `<path class="k" d="M158 52l6-12M158 68l6 12"/><ellipse cx="165" cy="38" rx="4.6" ry="3.4" fill="#1d1d1a"/><ellipse cx="165" cy="82" rx="4.6" ry="3.4" fill="#1d1d1a"/><circle cx="163.5" cy="37" r="1.1" fill="#fff" opacity=".7"/><circle cx="163.5" cy="81" r="1.1" fill="#fff" opacity=".7"/>`+
 U([[[164,55,3.6],[176,50,3.2],[186,56,2.6],[186,66,2],[180,70,1.4]],[[164,65,3.6],[174,72,3],[180,82,2.4],[174,88,1.6]]])+
 `<path class="kt" d="M170 50v5M176 48.5v5M182 51l-4 3M185 58l-4 1M184 64l-4-1M170 67v5M175 71l-3 4M178 77l-4 2"/><path class="claw" d="M176 47l1-4M182 49l3-3M188 56l4-1M187 64l4 1M173 75l-3 3M180 80l3 3M178 86l1 4"/>`];

// 欧巴宾海蝎
ART.opabinia=[null,U(['M34 60L14 48l6 12-6 12z','M34 60l-12-4 2 4-2 4z'])+
 U(Array.from({length:7},(_,i)=>{const x=40+i*13;return [`M${x-9} ${45}q9-9 18 0q-9 5-18 0z`,`M${x-9} ${75}q9 9 18 0q-9-5-18 0z`];}).flat())+
 U([[[32,60,3,3],[50,60,11,11],[90,60,12,12],[124,60,10,10],[136,60,7,7]]])+`<path class="kt" d="${R(7,i=>`M${40+i*13} 49v22`)}"/>`+
 U([[[134,60,8],[142,60,9],[148,60,5]]])+
 `<path class="k" d="M138 52l-6-10M141 51l0-12M144 52l6-10M136 54l-12-6M146 55l12-6"/>`+[[132,41],[141,38],[150,41],[122,47],[159,48]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.8" fill="#1d1d1a"/><circle cx="${x-.8}" cy="${y-.8}" r=".8" fill="#fff" opacity=".7"/>`).join('')+
 T('m',[[148,62,2.4],[160,66,2],[170,76,1.6],[175,86,1.4]])+`<path class="kt" d="M156 63l1 2M162 68l1 2M167 73l2 1M171 79l2 1"/><path class="claw" d="M175 86l-5 6M175 86l5 6M175 86v7"/>`];

// 直角石
const orB=[[18,62,.5,.5],[60,62,7,7],[100,62,12.5,12.5],[140,62,18,18]];
ART.orthocone=[null,U([orB])+stripes(orB,5,.05,.95,.98,-.98,2.6)+
 `<path class="kt" d="${R(9,i=>{const x=36+i*12,r=(x-18)/122*18;return `M${r1(x)} ${r1(62-r)}q2 ${r1(r)} 0 ${r1(r*2)}`;})}"/>`+rim(orB,.1,1)+
 U([[[138,62,15],[150,62,14],[158,62,10]]],{fill:'url(#{U}sk)'})+`<defs><linearGradient id="{U}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98A5A"/><stop offset="1" stop-color="#8E5A38"/></linearGradient></defs>`+
 eye(150,55,3.4,'fish')+
 R(8,i=>{const a=(-60+i*17)*Math.PI/180;const x0=158+Math.cos(a)*6,y0=62+Math.sin(a)*8;return `<path class="tent" d="M${r1(x0)} ${r1(y0)}q${r1(10+Math.cos(a)*6)} ${r1(Math.sin(a)*10-4+i%2*6)} ${r1(22+Math.cos(a)*6)} ${r1(Math.sin(a)*14)}"/>`;})];

// 菊石
ART.ammonite=['#B8864A',(()=>{
 let rib='',sp='';
 for(let k=0;k<44;k++){const th=k*.34,r=6+th*4.9,r2=r*0.62;const x=92+Math.cos(th)*r,y=58+Math.sin(th)*r,x2=92+Math.cos(th)*r2,y2=58+Math.sin(th)*r2;if(r<44)rib+=`M${r1(x2)} ${r1(y2)}Q${r1((x+x2)/2+Math.sin(th)*2)} ${r1((y+y2)/2-Math.cos(th)*2)} ${r1(x)} ${r1(y)}`;}
 for(let k=0;k<=90;k++){const th=k*.16,r=4+th*3.1;sp+=(k?'L':'M')+r1(92+Math.cos(th)*r)+' '+r1(58+Math.sin(th)*r);}
 return `<circle class="m" cx="92" cy="58" r="44"/><circle class="l" style="opacity:.35;stroke:none" cx="84" cy="48" r="26"/><path class="kt" style="stroke-width:.9" d="${rib}"/><path class="k" style="stroke-width:1.2" d="${sp}"/><path class="rim" d="M58 36c10-12 26-18 40-16"/>`;})()+
 U([[[128,82,9],[140,90,10],[148,98,6]]],{fill:'url(#{U}sk)'})+`<defs><linearGradient id="{U}sk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C98A5A"/><stop offset="1" stop-color="#8E5A38"/></linearGradient></defs>`+
 eye(140,86,2.8,'fish')+R(7,i=>{const a=(10+i*14)*Math.PI/180;return `<path class="tent" d="M${r1(148+Math.cos(a)*3)} ${r1(98+Math.sin(a)*3)}q${r1(8+i)} ${r1(4+i*.5)} ${r1(14+Math.cos(a)*6)} ${r1(10+Math.sin(a)*8)}"/>`;})];

// 广翅鲎
ART.eurypterid=[null,U(['M36 56L6 60l30 4z'])+
 U(['M132 46c-6-12-2-24 6-28 4 8 2 20-2 28z','M132 74c-6 12-2 24 6 28 4-8 2-20-2-28z'])+`<path class="kt" d="M134 44l2-22M134 76l2 22"/>`+
 U(Array.from({length:12},(_,i)=>{const x=126-i*7.5,w=16-i*.9;return `M${r1(x)} ${r1(60-w)}q-4 ${r1(w)} 0 ${r1(w*2)}h-8q-3 -${r1(w)} 0 -${r1(w*2)}z`;}).concat(['M150 44c10 0 18 7 18 16s-8 16-18 16h-22V44z']))+
 `<path class="kt" d="${R(12,i=>{const x=126-i*7.5,w=16-i*.9;return `M${r1(x-4)} ${r1(60-w+1)}v${r1(w*2-2)}`;})}"/>`+
 U(['M166 54c10-8 22-8 28-4l-10 4 10 3c-8 4-18 3-26 1z','M166 66c10 8 22 8 28 4l-10-4 10-3c-8-4-18-3-26-1z'])+
 `<path class="k" d="M138 46l-8-10M140 74l-8 10M144 46l-4-12M146 74l-4 12"/><ellipse cx="154" cy="52" rx="2.6" ry="3.4" fill="#1d1d1a"/><ellipse cx="154" cy="68" rx="2.6" ry="3.4" fill="#1d1d1a"/><path class="rim" d="M44 52c30-6 60-8 84-8"/>`];

// 怪诞虫
const haB=[[40,76,3,3],[70,72,5,5],[100,72,5.5,5.5],[130,70,5,5],[150,70,4,4],[160,68,6,6]];
ART.hallucigenia=[null,seabed+R(7,i=>T('f',[[54+i*14,78,2],[53+i*14,94,1.4],[54+i*14,106,1]])+claws(54+i*14,106,1,2,1))+
 R(7,i=>T('bn',[[50+i*14,70,1.8],[47+i*14+i*.6,52,1.2],[45+i*14+i,36,.3]]))+
 U([haB])+rim(haB,.05,.95)+R(7,i=>T('m',[[56+i*14,78,2.2],[57+i*14,94,1.6],[58+i*14,106,1.1]])+claws(58+i*14,106.5,1,2,1))+
 `<circle cx="164" cy="66" r="1.4" fill="#111"/><circle cx="160" cy="66" r="1" fill="#111"/>`];

// 查恩盘虫
const charFrond=(x,y,h,s)=>{let ribs='';for(let i=0;i<14;i++){const t=i/13,yy=y-6-t*h*.9,w=Math.sin(t*3.1)*h*.22+2;ribs+=`M${x} ${r1(yy)}q${r1(-w*.6)} ${r1(-2)} ${r1(-w)} ${r1(-6*s)}M${x} ${r1(yy)}q${r1(w*.6)} ${r1(-2)} ${r1(w)} ${r1(-6*s)}`;}
 return `<ellipse class="m" cx="${x}" cy="${y+2}" rx="${14*s}" ry="${4*s}"/>`+U([`M${x} ${y-4}C${x-h*.3} ${y-h*.35} ${x-h*.3} ${y-h*.8} ${x} ${y-h}C${x+h*.3} ${y-h*.8} ${x+h*.3} ${y-h*.35} ${x} ${y-4}Z`,[[x,y+2,1.6*s],[x,y-6,1.4*s]]])+`<path class="kt" style="opacity:.7" d="M${x} ${y-4}V${y-h+4}${ribs}"/>`;};
ART.charnia=[null,seabed+`<g opacity=".7">${charFrond(56,108,56,.7)}</g>`+charFrond(104,106,92,1)+`<g opacity=".85">${charFrond(152,108,64,.75)}</g>`];

// 石珊瑚
ART.coral=['#D07A5A',seabed+
 T('m',[[60,108,5],[60,86,4.4],[52,70,3.6],[48,54,2.6],[48,46,2.4]])+T('m',[[60,90,4],[70,76,3.4],[74,56,2.6],[76,46,2.4]])+T('m',[[70,78,3],[84,70,2.4],[90,66,2.2]])+T('m',[[52,72,2.6],[40,64,2.2],[36,58,2]])+
 R(18,i=>`<circle cx="${[48,76,90,36,52,60,70,74,58,44][i%10]+(i>9?2:-1)}" cy="${[46,46,66,58,62,96,82,58,76,52][i%10]+(i>9?6:0)}" r="1.1" fill="#FBE3D6"/>`)+
 `<path class="m" style="--h:#D9B460" d="M110 108c0-18 12-30 28-30s28 12 28 30z"/><path class="kt" style="stroke:#8A6A2A" d="M116 104c2-6 6-6 8 0s6 6 8 0 6-6 8 0 6 6 8 0 6-6 8 0M120 96c2-5 5-5 7 0s5 5 7 0 5-5 7 0 5 5 7 0M126 88c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/>`+
 `<g style="--h:#E0A43C">`+U([[[150,50,.5],[156,48,4.6],[166,49,5],[174,50,2]],'M150 50l-8-6v12z'])+`<path class="kt" style="stroke:#fff;opacity:.8;stroke-width:1.4" d="M158 45v8M164 44v10"/></g>`+eye(170,48,1.6,'fish')];

/* ===== 昆虫与陆生节肢 ===== */
ART.millipede=[null,'~G'+R(30,i=>`<path class="k" d="M${40+i*4.4} 98l${i%2?2:-2} 8"/>`)+
 U(Array.from({length:15},(_,i)=>`M${36+i*9} 72h10q5 0 5 7v6q0 7-5 7h-10q-5 0-5-7v-6q0-7 5-7z`).concat([[[170,82,8],[178,84,6]]]))+
 `<path class="kt" d="${R(14,i=>`M${46+i*9} 73v18`)}"/>`+R(14,i=>`<circle class="d" cx="${50+i*9}" cy="84" r="1"/>`)+
 `<path class="rim" d="M40 76h128"/><circle class="e" cx="178" cy="80" r="1.8"/><path class="k" d="M182 78c6-6 10-8 14-8M180 76c4-8 6-12 10-14"/>`];

ART.bristletail=[null,'~G'+`<path class="k" d="M92 92l-6 14M110 92v14M128 91l6 15M52 86c-14-2-28 2-40 8M52 88c-14 4-26 10-36 18M54 84c-12-6-26-8-38-6"/>`+
 U(Array.from({length:10},(_,i)=>{const x=54+i*10,h=9-Math.abs(i-4)*.9;return `M${x} ${86-h}h10q3 0 3 ${h}t-3 ${h}h-10q-3 0-3-${h}t3-${h}z`;}).concat([[[156,84,7],[164,84,6]]]))+
 `<path class="kt" d="${R(9,i=>`M${64+i*10} ${78}v14`)}"/><path class="rim" d="M58 80h96"/>`+eye(165,81,1.8,'mam')+`<path class="k" d="M168 78c10-12 20-18 30-20M166 77c6-14 12-22 20-28"/>`];

const veins=(x0,y0,x1,y1,n,spread)=>R(n,i=>{const t=(i+1)/(n+1);return `M${r1(x0)} ${r1(y0+(i-n/2)*spread*.2)}Q${r1((x0+x1)/2)} ${r1((y0+y1)/2+(i-n/2)*spread)} ${r1(x1)} ${r1(y1+(i-n/2)*spread*1.4)}`;});
const wing=(d,v,spot)=>`<path class="wing" d="${d}"/><path class="kt" style="opacity:.55;stroke-width:.6" d="${v}"/>${spot||''}`;
ART.palaeodictyoptera=[null,
 wing('M98 40C70 26 36 22 14 30c16 10 52 18 84 18z',veins(98,42,18,30,5,1.6),'<ellipse class="d" style="opacity:.55" cx="52" cy="34" rx="8" ry="4"/>')+
 wing('M102 40c28-14 62-18 84-10-16 10-52 18-84 18z',veins(102,42,182,30,5,1.6),'<ellipse class="d" style="opacity:.55" cx="148" cy="34" rx="8" ry="4"/>')+
 wing('M98 54C72 50 40 56 20 70c18 6 52 2 78-8z',veins(98,56,24,68,5,1.6),'<ellipse class="d" style="opacity:.55" cx="56" cy="62" rx="8" ry="4"/>')+
 wing('M102 54c26-4 58 2 78 16-18 6-52 2-78-8z',veins(102,56,176,68,5,1.6),'<ellipse class="d" style="opacity:.55" cx="144" cy="62" rx="8" ry="4"/>')+
 `<path class="k" d="M98 94l-6 18M102 94l6 18M100 20V8"/>`+U([[[100,20,4],[100,32,6],[100,50,5.5],[100,72,4],[100,94,2]]])+`<path class="kt" d="${R(6,i=>`M97 ${58+i*6}h6`)}"/>`+
 `<circle cx="96.5" cy="22" r="2" fill="#1d1d1a"/><circle cx="103.5" cy="22" r="2" fill="#1d1d1a"/>`];

const netVeins=(x0,y0,x1,y1,dir)=>{let s='';for(let i=0;i<5;i++){const f=i/4;s+=`M${x0} ${y0}Q${(x0+x1)/2} ${r1(y0+(y1-y0)*f*.6-2)} ${x1} ${r1(y1+(f-.5)*6*dir)}`;}for(let k=1;k<12;k++){const x=x0+(x1-x0)*k/12;s+=`M${r1(x)} ${r1(y0-2+ (y1-y0)*k/12*.3)}l${r1(1.2*dir)} ${r1(6)}`;}return s;};
ART.meganeura=[null,
 wing('M96 32C70 22 36 20 8 26c24 8 60 10 88 10z',netVeins(96,33,10,26,1))+wing('M104 32c26-10 60-12 88-6-24 8-60 10-88 10z',netVeins(104,33,190,26,1))+
 wing('M96 40C70 38 36 42 10 52c26 4 60 0 86-6z',netVeins(96,42,12,51,-1))+wing('M104 40c26-2 60 2 86 12-26 4-60 0-86-6z',netVeins(104,42,188,51,-1))+
 `<path class="d" d="M18 25h8v3h-8zM174 25h8v3h-8zM20 49l8-2 1 3-8 2zM172 47l8 2-1 3-8-2z"/>`+
 U([[[100,40,3.2],[100,70,2.8],[100,112,2]],[[100,26,6],[100,36,7],[100,44,5]]])+`<path class="kt" d="${R(8,i=>`M97 ${50+i*7.5}h6`)}"/>`+
 `<ellipse cx="96" cy="21" rx="4" ry="4.4" fill="#2E3A2A"/><ellipse cx="104" cy="21" rx="4" ry="4.4" fill="#2E3A2A"/><circle cx="95" cy="19.5" r="1.3" fill="#fff" opacity=".6"/><circle cx="103" cy="19.5" r="1.3" fill="#fff" opacity=".6"/>`];

ART.arthropleura=[null,`<path class="k" d="${R(28,i=>`M${26+i*5.4} 45l-2-7M${26+i*5.4} 79l-2 7`)}"/>`+
 U(Array.from({length:15},(_,i)=>`M${22+i*10} 44h10q4 0 4 4v24q0 4-4 4h-10q-4 0-4-4v-24q0-4 4-4z`).concat([[[172,60,10],[180,60,8]]]))+
 `<path class="kt" d="${R(14,i=>`M${32+i*10} 45v30`)}M22 56h150M22 64h150"/>`+R(14,i=>`<circle class="l" style="stroke-width:.4" cx="${37+i*10}" cy="60" r="1.6"/>`)+
 `<path class="rim" d="M26 50h144"/><path class="k" d="M184 56c6-4 10-8 12-14M184 64c6 4 10 8 12 14"/>`];

ART.beetle=[null,`<path class="k" d="M76 60l-16-6-4-10M74 76l-18 2-6 8M78 92l-14 10-2 10M124 60l16-6 4-10M126 76l18 2 6 8M122 92l14 10 2 10M96 18c-4-6-10-10-16-10M104 18c4-6 10-10 16-10"/><path class="claw" d="M56 44l-2-3M50 86l-2 3M62 112l-1 3M144 44l2-3M150 86l2 3M138 112l1 3"/>`+
 U(['M100 44c-18 0-26 12-26 30 0 22 12 38 26 38s26-16 26-38c0-18-8-30-26-30z','M84 44c0-10 6-16 16-16s16 6 16 16z','M92 28c0-6 4-10 8-10s8 4 8 10z'])+
 `<path class="k" d="M100 44v68"/><path class="kt" style="opacity:.6" d="M88 48c-4 16-4 36 2 58M112 48c4 16 4 36-2 58M81 54c-2 14-2 30 2 44M119 54c2 14 2 30-2 44"/>`+
 `<ellipse fill="#fff" opacity=".45" cx="88" cy="64" rx="4" ry="11"/><ellipse fill="#fff" opacity=".3" cx="96" cy="34" rx="6" ry="2.4"/>`+
 `<circle class="d" cx="90" cy="84" r="4"/><circle class="d" cx="110" cy="84" r="4"/><circle class="d" cx="112" cy="60" r="3"/><circle class="d" cx="88" cy="98" r="3"/>`];

ART.moth=['#A87A3A',`<path class="l" d="M98 62c-20 4-40 12-44 30 16 8 34 2 44-14z"/><path class="l" d="M102 62c20 4 40 12 44 30-16 8-34 2-44-14z"/>`+
 `<circle class="w" cx="74" cy="84" r="7"/><circle cx="74" cy="84" r="4.4" fill="#3A2A1A"/><circle cx="72.6" cy="82.6" r="1.4" fill="#fff"/><circle class="w" cx="126" cy="84" r="7"/><circle cx="126" cy="84" r="4.4" fill="#3A2A1A"/><circle cx="124.6" cy="82.6" r="1.4" fill="#fff"/>`+
 U(['M98 44L28 26c-8 16-6 36 10 50l60-14z','M102 44l70-18c8 16 6 36-10 50l-60-14z'])+
 `<path class="kt" d="M96 48L40 36M96 54L44 58M104 48l56-12M104 54l52 4M50 32c2 10 2 22-4 32M150 32c-2 10-2 22 4 32"/>`+
 `<path class="d" style="opacity:.35" d="M40 40c10 2 20 6 26 12-10 2-20 0-28-4zM160 40c-10 2-20 6-26 12 10 2 20 0 28-4z"/><path fill="#fff" opacity=".35" d="M34 34c10 0 22 4 30 8-10 0-22-2-30-8zM166 34c-10 0-22 4-30 8 10 0 22-2 30-8z"/>`+
 fur([[100,86,3],[100,64,6],[100,46,5]],1,1,2,0,1)+fur([[100,86,3],[100,64,6],[100,46,5]],-1,1,2,0,1)+U([[[100,86,3],[100,64,6],[100,46,5]]])+
 `<path class="k" d="M98 44c-4-10-10-16-18-20M102 44c4-10 10-16 18-20"/><path class="kt" d="${R(6,i=>`M${94-i*2.6} ${40-i*2.6}l-3-2M${94-i*2.6} ${40-i*2.6}l-1-3.4M${106+i*2.6} ${40-i*2.6}l3-2M${106+i*2.6} ${40-i*2.6}l1-3.4`)}"/>`];

const spW=()=>{let s='';const cx=100,cy=58;for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`M${cx} ${cy}L${(cx+60*Math.cos(a)).toFixed(1)} ${(cy+56*Math.sin(a)).toFixed(1)}`;}
 [14,24,34,44,54].forEach(r=>{for(let i=0;i<=12;i++){const a=i*Math.PI/6;s+=(i?'L':'M')+(cx+r*1.07*Math.cos(a)).toFixed(1)+' '+(cy+r*Math.sin(a)).toFixed(1);}});return `<path class="kt" style="stroke:#9AA39A;stroke-width:.7" d="${s}"/>`;};
const spLeg=(x,y,a,b,c)=>T('m',[[x,y,1.8],[a[0],a[1],1.5],[b[0],b[1],1.1],[c[0],c[1],.6]]);
ART.spider=[null,spW()+
 spLeg(96,50,[80,40],[64,38],[56,50])+spLeg(95,53,[76,50],[60,58],[56,72])+spLeg(95,58,[80,66],[70,80],[74,94])+spLeg(97,62,[88,74],[86,90],[92,104])+
 spLeg(104,50,[120,40],[136,38],[144,50])+spLeg(105,53,[124,50],[140,58],[144,72])+spLeg(105,58,[120,66],[130,80],[126,94])+spLeg(103,62,[112,74],[114,90],[108,104])+
 U([[[100,62,6],[100,74,9],[100,88,6]],[[100,44,5],[100,52,7]]])+
 `<path class="wf" style="opacity:.9" d="M96 68l4-3 4 3-4 3zM96 78l4-3 4 3-4 3z"/><path class="kt" d="M94 86h12"/>`+
 `<circle cx="98" cy="45" r="1.2" fill="#111"/><circle cx="102" cy="45" r="1.2" fill="#111"/>`];

ART.bee=[null,`<path class="ps" d="M30 110c4-18 4-30 0-44"/><path style="fill:#E08AB0;stroke:#9A3A66;stroke-width:.8" d="M30 66c-14-6-18-18-10-26 8 4 10 14 10 26zM30 66c14-6 18-18 10-26-8 4-10 14-10 26zM30 66c-6-14-4-26 0-32 4 6 6 18 0 32z"/>`+
 `<path class="k" d="M112 74l-4 16-6 4M124 74l2 16 6 6M136 72l6 14"/><circle class="y" cx="106" cy="92" r="4.4"/>`+
 fur([[52,66,4],[80,64,19],[100,62,14]],1,1,2.4,0,1)+
 U([[[50,66,3],[66,65,15],[88,64,18],[102,62,12]]],{fill:'url(#{U}by)'})+`<defs><linearGradient id="{U}by" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9B63C"/><stop offset="1" stop-color="#B98418"/></linearGradient></defs>`+
 `<path fill="#2A2014" d="M64 48c-5 11-5 23 0 34l8 1c-5-12-5-24 0-36zM82 45c-5 13-5 27 0 40h8c-5-13-5-27 0-40z"/><path d="M46 62l-8 4 8 3z" fill="#2A2014"/>`+
 fur([[112,60,15],[122,60,15]],1,1,2.4,0,1)+U([[[110,60,14],[124,60,14]]],{fill:'#7A5A22'})+
 U([[[140,62,10],[148,64,9]]],{fill:'#3E2E18'})+`<ellipse cx="150" cy="60" rx="3.4" ry="5" fill="#111"/><circle cx="149" cy="58" r="1" fill="#fff" opacity=".7"/><path class="k" d="M150 54c6-10 12-14 20-14M146 54c2-10 6-16 12-20"/>`+
 `<path class="wing" d="M110 48c-2-14 14-26 32-22 6 8-8 20-32 22z"/><path class="wing" d="M104 50c-10-10-6-24 8-26 6 6 2 18-8 26z"/><path class="kt" style="opacity:.5" d="M112 46c8-8 16-12 26-14M106 48c0-8 2-14 6-20"/>`];

ART.ant=[null,`<path class="am" d="M30 60c0-30 32-46 70-44s70 22 68 48-32 44-70 42-68-16-68-46z"/><path fill="#F7D48A" opacity=".35" d="M44 50c6-18 26-28 52-28-20 6-40 16-52 28z"/>`+
 R(9,i=>`<circle cx="${50+i*14%110}" cy="${40+(i*23)%50}" r="${1+(i%3)*.6}" fill="#FFF3D0" opacity=".6"/>`)+
 `<g class="hue" style="--h:#3B2A1A">`+`<path class="k" d="M110 70l-8 18-6 2M116 70l6 18 6 4M96 68l-14 16-8 0M92 70l4 20M104 66l-4 18"/>`+
 U([[[60,64,10],[76,64,12],[88,63,8]],[[94,62,3.6],[98,62,3.6]],[[102,60,6],[114,59,7],[120,57,5]],[[126,54,8],[136,52,8.4],[142,55,5]]])+
 `<path class="rim" d="M64 58c6-4 16-4 22-1"/><path class="k" style="stroke-width:2" d="M136 46c4-10 12-14 18-12M142 60c8-2 14-10 16-20"/><path class="k" d="M128 46c-6-8-4-16 4-20"/><circle cx="138" cy="51" r="2" fill="#000"/></g>`+
 `<path fill="#fff" opacity=".55" d="M58 30c8-6 18-10 30-10-10 4-20 8-30 10z"/>`];
})();
