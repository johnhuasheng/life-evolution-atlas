// 精细插图 · 早期植物、藻类、真菌与人类文化
(function(){
const {r1,rnd,tube,frond,leaves,trunk}=K;
const {R,u,lg,rg,D,frame,clip,stars,wave,strata,cloud,bubbles,TX,arrow,head,sil,wrapFrames}=K.ex;
const shadow=(cx,rx,y)=>`<ellipse cx="${cx}" cy="${y||107.5}" rx="${rx}" ry="${r1(Math.max(2,rx*.08))}" fill="#1d2a22" opacity=".14"/>`;
const soilLine='<path d="M8 107c30-2 60 1 92 0s62-1 92 0" stroke="#B3BAAE" stroke-width="1.2" fill="none" stroke-linecap="round"/>';
// 光滑闭合曲线（Catmull-Rom）
const closed=(p)=>{let d=`M${r1(p[0][0])} ${r1(p[0][1])}`;const n=p.length;for(let i=0;i<n;i++){const p0=p[(i-1+n)%n],p1=p[i],p2=p[(i+1)%n],p3=p[(i+2)%n];
  d+=`C${r1(p1[0]+(p2[0]-p0[0])/6)} ${r1(p1[1]+(p2[1]-p0[1])/6)} ${r1(p2[0]-(p3[0]-p1[0])/6)} ${r1(p2[1]-(p3[1]-p1[1])/6)} ${r1(p2[0])} ${r1(p2[1])}`;}return d+'Z';};
// 显微镜视野
const lens=(cx,cy,r,bg,inner,bar)=>D(rg('lb',[[0,bg[0]],[.75,bg[1]],[1,bg[2]]],.45,.42,.6)+clip('lc',`<circle cx="${cx}" cy="${cy}" r="${r}"/>`)+rg('lv',[[.7,'#000',0],[1,'#000',.35]]))+
 `<circle cx="${cx}" cy="${cy}" r="${r+5}" fill="#2E3438"/><circle cx="${cx}" cy="${cy}" r="${r+5}" fill="none" stroke="#6E767C" stroke-width="1.2"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${u('lb')}"/><g clip-path="${u('lc')}">${inner}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${u('lv')}"/></g>`+
 (bar?`<path d="M${cx+r*.25} ${cy+r*.72}h${r*.4}" stroke="#fff" stroke-width="1.6"/><text x="${r1(cx+r*.45)}" y="${r1(cy+r*.68)}" fill="#fff" font-size="5.5" text-anchor="middle" style="font-family:inherit">${bar}</text>`:'');

// ---------- 叠层石 ----------
const stromCol=(x,w,h,cut)=>{const top=104-h;let s=`<path d="M${x-w} 104V${top+w*.6}c0-${r1(w*.9)} ${r1(w*.4)}-${r1(w*1.1)} ${w}-${r1(w*1.1)}s${w} ${r1(w*.2)} ${w} ${r1(w*1.1)}V104z" fill="${u(cut?'sc':'sm')}" stroke="#3E4A2A" stroke-width=".8"/>`;
 const n=cut?9:4;for(let i=1;i<n;i++){const y=top+i*(h/n)+w*.2;s+=`<path d="M${x-w+.6} ${r1(y+w*.5)}c${r1(w*.3)}-${r1(w*.6)} ${r1(w*1.7)}-${r1(w*.6)} ${r1(2*w-1.2)} 0" fill="none" stroke="${cut?'#6E5A3A':'#A8C47A'}" stroke-width="${cut?.9:.6}" opacity="${cut?.9:.7}"/>`;}
 return s+`<path d="M${x-w} ${top+w*.6}c0-${r1(w*.9)} ${r1(w*.4)}-${r1(w*1.1)} ${w}-${r1(w*1.1)}" fill="none" stroke="#C8E0A0" stroke-width="1.4" opacity=".6"/>`;};
ART.stromatolite=[null,D(lg('sk',[[0,'#F2C890'],[1,'#F6E6C8']])+lg('sea',[[0,'#8ACCD0'],[1,'#3E8A9A']])+lg('sm',[[0,'#7A9A52'],[.4,'#8A8A5A'],[1,'#6E6048']])+lg('sc',[[0,'#D8C49A'],[1,'#A8906A']]))+
 frame(u('sk'))+`<circle cx="46" cy="22" r="8" fill="#FFE07A"/><circle cx="46" cy="22" r="13" fill="#FFE07A" opacity=".3"/>`+
 `<path d="M6 44h188v66H6z" fill="${u('sea')}"/><path d="${wave(44,1.3,12,6,194)}" fill="none" stroke="#E0F6F6" stroke-width="1"/>`+
 `<g fill="#fff" opacity=".22">${R(5,i=>`<path d="M${30+i*34} 46l-8 58h5z"/>`)}</g>`+
 stromCol(34,10,40)+stromCol(56,7,26)+stromCol(98,13,52,1)+stromCol(132,9,34)+stromCol(158,11,44)+stromCol(180,6,20)+
 `<path d="M6 100c30-2 60 2 94 0s64-2 94 0v10H6z" fill="#C8B488"/>`+
 bubbles([[36,56,1.4],[40,48,1],[134,62,1.2],[160,52,1.5],[156,46,1]],'#F4FFFF')+TX(98,40,'剖面：层层叠叠的微生物席','#2E4A5A',6.2)];

// ---------- 红藻：Bangiomorpha ----------
const bangio=(x,y0,h,a)=>{let s=`<path d="M${x-3} ${y0}q3-4 6 0z" fill="#8A2A3A"/>`;const n=Math.floor(h/6.2);for(let i=0;i<n;i++){const y=y0-3-i*6.2,dx=Math.sin(i*.35+a)*3*(i/n);
 s+=`<rect x="${r1(x+dx-3.6)}" y="${r1(y-5.6)}" width="7.2" height="5.8" rx="2" fill="${u('rc')}" stroke="#7A1E30" stroke-width=".6"/>`+(i>n*.45?`<path d="M${r1(x+dx)} ${r1(y-5.4)}v5.2M${r1(x+dx-3.2)} ${r1(y-2.7)}h6.4" stroke="#7A1E30" stroke-width=".4"/>`:`<path d="M${r1(x+dx-3)} ${r1(y-2.7)}h6" stroke="#7A1E30" stroke-width=".35"/>`);}
 return s;};
ART.redalga=[null,D(lg('rc',[[0,'#F4A8B8'],[1,'#C8485E']],1,0))+
 lens(100,58,48,['#FDF6EE','#F3E4D2','#D8C4AA'],`<path d="M52 98c20-4 40 2 60-1s28 0 40 1v12H52z" fill="#C8B08A"/>`+bangio(76,98,70,0)+bangio(92,99,82,1.3)+bangio(110,98,62,2.2)+bangio(126,99,74,.6)+`<circle cx="136" cy="40" r="2" fill="#E88A9A" opacity=".6"/><circle cx="68" cy="52" r="1.4" fill="#E88A9A" opacity=".6"/>`,'50 μm')+
 TX(168,24,'显微镜下','#5A3A40',6.5)+TX(34,104,'细胞一节节叠成丝','#7A1E30',6)];

// ---------- 绿藻：Proterocladus ----------
const septa=(pts)=>{let s='';for(let i=1;i<pts.length-1;i++){const [x,y]=pts[i],[x2,y2]=pts[i+1];const a=Math.atan2(y2-y,x2-x)+Math.PI/2;s+=`M${r1(x+Math.cos(a)*2.4)} ${r1(y+Math.sin(a)*2.4)}L${r1(x-Math.cos(a)*2.4)} ${r1(y-Math.sin(a)*2.4)}`;}return s;};
const fil=(pts)=>`<path d="${tube(pts.map(p=>[p[0],p[1],2.6]))}" fill="${u('gc')}" stroke="#2E6A2E" stroke-width=".7"/><path d="${septa(pts)}" stroke="#2E6A2E" stroke-width=".6"/><path d="M${pts.map(p=>r1(p[0]-.8)+' '+r1(p[1])).join('L')}" fill="none" stroke="#D8F0B0" stroke-width=".7" opacity=".7"/>`;
ART.greenalga=[null,D(lg('gc',[[0,'#A8D878'],[1,'#4E9A3E']],1,0))+
 lens(100,58,48,['#F6FBF2','#E4EEDC','#C4D4B4'],`<path d="M52 100c20-3 40 1 60-1s28 0 40 1v10H52z" fill="#C4B48E"/><ellipse cx="100" cy="99" rx="7" ry="2.4" fill="#6E5A3A"/>`+
  fil([[100,98],[100,86],[98,74],[96,62],[94,50],[92,38],[90,26]])+fil([[98,74],[108,66],[118,60],[126,50],[132,40]])+fil([[96,62],[86,54],[76,50],[68,42]])+fil([[118,60],[124,62],[132,60]])+fil([[92,38],[100,30],[106,22]])+fil([[86,54],[82,44]]),'1 mm')+
 TX(168,24,'显微镜下','#2E4A2E',6.5)+TX(36,104,'分枝的丝状体','#2E6A2E',6)];

// ---------- 植物登陆：苔类与隐孢子 ----------
const thallus=(x,y,s,a,c)=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0c-4-3-6-8-4-12 2-2 4-1 5 1 1-4 5-6 7-4 2 3 0 8-2 11 3-2 7-1 7 2 0 3-5 4-9 3z" fill="${c}" stroke="#2E5A2A" stroke-width=".6"/><path d="M0 0l2-10M1 -2l8-2" stroke="#2E5A2A" stroke-width=".4" fill="none" opacity=".7"/></g>`;
ART.moss=[null,D(lg('sk',[[0,'#CFE2EA'],[1,'#F2EEE2']])+lg('rk',[[0,'#A89C8C'],[1,'#6E6458']])+lg('sea',[[0,'#8ABCD0'],[1,'#4E86A4']])+rg('sp',[[0,'#F6E6B8'],[1,'#C8A868']],.4,.35,.7))+
 frame(u('sk'))+`<path d="M6 76c20-2 30 0 44 2v32H6z" fill="${u('sea')}"/><path d="${wave(78,1,10,6,50)}" stroke="#E0F4F8" stroke-width=".9" fill="none"/>`+
 `<path d="M40 110c4-20 18-34 44-38 24-4 50 2 70 8 20 6 34 16 40 30z" fill="${u('rk')}"/><path d="M60 96c10-4 20-6 30-4M110 88c10 0 18 2 26 6M140 100c8-2 14 0 20 4" stroke="#5A5048" stroke-width=".8" fill="none" opacity=".6"/>`+
 R(14,i=>{const r=rnd(200+i);return thallus(r1(56+i*8+r()*4),r1(84+Math.sin(i*.8)*4+r()*4),r1(.8+r()*.5),r1(-40+r()*80),['#5E9A48','#7AB45A','#4E8A3E'][i%3]);})+
 R(7,i=>{const x=62+i*15,y=82+(i%2)*3;return `<path d="M${x} ${y}v-9" stroke="#C8D8A0" stroke-width=".8"/><ellipse cx="${x}" cy="${y-10}" rx="1.4" ry="2" fill="#8A6A3A"/>`;})+
 `<g transform="translate(158 32)"><circle r="18" fill="#FBF6EA" stroke="#8A7A5A" stroke-width="1.2"/><circle cx="-4" cy="3" r="6" fill="${u('sp')}" stroke="#8A6A3A" stroke-width=".7"/><circle cx="4" cy="3" r="6" fill="${u('sp')}" stroke="#8A6A3A" stroke-width=".7"/><circle cx="0" cy="-4" r="6" fill="${u('sp')}" stroke="#8A6A3A" stroke-width=".7"/><circle cx="0" cy="1" r="4" fill="${u('sp')}" stroke="#8A6A3A" stroke-width=".6" opacity=".8"/></g><path d="M142 44l-30 30" stroke="#8A7A5A" stroke-width=".7" stroke-dasharray="2 2"/>`+
 TX(158,60,'隐孢子四分体','#5A4A2A',6.2)];

// ---------- 库克逊蕨 ----------
const cook=(x,s,seed)=>{const r=rnd(seed);const br=(x0,y0,a,L,d)=>{const A=a*Math.PI/180,x1=x0+Math.sin(A)*L,y1=y0-Math.cos(A)*L;let o=`<path d="M${r1(x0)} ${r1(y0)}Q${r1(x0+Math.sin(A)*L*.3)} ${r1(y0-L*.6)} ${r1(x1)} ${r1(y1)}" stroke="${u('cs')}" stroke-width="${r1(2.2-d*.4)}" fill="none" stroke-linecap="round"/>`;
  if(d<2){const sp=16+r()*10;o+=br(x1,y1,a-sp,L*.72,d+1)+br(x1,y1,a+sp,L*.72,d+1);}else o+=`<path transform="translate(${r1(x1)} ${r1(y1)}) rotate(${a})" d="M-1 0c-3-1-4-4-3-6 2 1 5 1 8 0 1 2 0 5-3 6z" fill="${u('spg')}" stroke="#6E4A1E" stroke-width=".5"/>`;return o;};
 return `<g transform="translate(${x} 104) scale(${s})">${br(0,0,(r()-.5)*8,26,0)}</g>`;};
ART.cooksonia=[null,D(lg('cs',[[0,'#7AB45A'],[1,'#3E7A3A']])+lg('spg',[[0,'#E8B85A'],[1,'#A8641E']]))+
 `<path d="M10 106c20-6 40-8 60-4s40 2 60-2 44 0 60 4v3H10z" fill="#9AB47A" opacity=".5"/>`+R(20,i=>{const r=rnd(300+i);return `<circle cx="${r1(12+r()*176)}" cy="${r1(103+r()*3)}" r="${r1(1+r()*1.6)}" fill="${i%2?'#6E9A4A':'#8AB45A'}"/>`;})+
 cook(66,.95,3)+cook(96,1.15,7)+cook(128,1,11)+cook(152,.75,5)+`<g opacity=".55">${cook(40,.6,9)}${cook(168,.6,2)}</g>`+soilLine+
 `<path d="M186 104V64" stroke="#5A5048" stroke-width=".9"/><path d="M183 104h6M183 64h6M184 84h4" stroke="#5A5048" stroke-width=".9"/>`+TX(178,60,'约 5 厘米','#5A5048',6.2)+
 `<g transform="translate(34 30)"><circle r="14" fill="#FBF6EA" stroke="#8A7A5A" stroke-width="1"/><path d="M0 12V0" stroke="#3E7A3A" stroke-width="2.4"/><path d="M-6 0c-2-6 2-10 6-10s8 4 6 10z" fill="${u('spg')}" stroke="#6E4A1E" stroke-width=".7"/>${R(6,i=>`<circle cx="${-3+i%3*3}" cy="${-6+Math.floor(i/3)*3.4}" r=".9" fill="#FFE6A8"/>`)}</g>`+TX(34,52,'孢子囊','#6E4A1E',6.2)];

// ---------- 莱尼燧石：温泉湿地 ----------
const aglao=(x,h,seed)=>{const r=rnd(seed);let s='';const br=(x0,y0,a,L,d)=>{const A=a*Math.PI/180,x1=x0+Math.sin(A)*L,y1=y0-Math.cos(A)*L;s+=`<path d="M${r1(x0)} ${r1(y0)}Q${r1(x0+Math.sin(A)*L*.2)} ${r1(y0-L*.55)} ${r1(x1)} ${r1(y1)}" stroke="${u('ag')}" stroke-width="${r1(2.6-d*.6)}" fill="none" stroke-linecap="round"/>`;
  if(d<2&&L>8){const sp=14+r()*14;br(x1,y1,a-sp,L*.7,d+1);br(x1,y1,a+sp*.8,L*.62,d+1);}else s+=`<ellipse transform="translate(${r1(x1)} ${r1(y1)}) rotate(${a})" rx="1.8" ry="4" cy="-3" fill="#C88A3A" stroke="#6E4A1E" stroke-width=".5"/>`;};
 br(x,96,(r()-.5)*10,h,0);return s;};
ART.rhynie=[null,D(lg('sk',[[0,'#C8D8DC'],[1,'#F0EAD8']])+lg('ag',[[0,'#9AC46A'],[1,'#4E8A3E']])+lg('pl',[[0,'#8ADCE0'],[1,'#3E9AAA']])+lg('si',[[0,'#F4EEDC'],[1,'#C8BCA0']]))+
 frame(u('sk'))+`<path d="M6 60c20-6 40-4 56 0 16-8 34-8 50 0 20-4 50-6 82 2v48H6z" fill="#B8C4A8" opacity=".5"/>`+
 `<path d="M6 92c30-4 50-2 70 0 30 2 70 0 118-4v22H6z" fill="#8A7E62"/>`+
 `<path d="M120 94c6-8 20-12 36-12s30 4 36 10l2 18h-76z" fill="${u('si')}"/><ellipse cx="156" cy="90" rx="26" ry="5" fill="${u('pl')}"/><path d="M134 90c8-2 16-2 22 0" stroke="#E0FAFA" stroke-width=".9" fill="none"/>`+
 `<g fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity=".55"><path d="M148 80c-4-6 4-10 0-16s4-10 0-16"/><path d="M162 80c4-6-4-10 0-16s-4-8 0-14"/></g>`+
 `<path d="M6 96c20-2 40-2 60 0s40 2 60 0" stroke="#6ABED0" stroke-width="3" opacity=".5" fill="none"/>`+
 aglao(24,26,3)+aglao(40,32,8)+aglao(58,28,13)+aglao(78,34,21)+aglao(98,29,5)+aglao(112,22,17)+
 `<g transform="translate(64 92)"><ellipse rx="4" ry="2.6" fill="#6E4A2E"/><circle cx="4" cy="-1" r="1.6" fill="#6E4A2E"/><path d="M-3 1l-3 3M-1 2l-1 3M1 2l1 3M3 1l3 3M-3-1l-3-3M3-1l3-3" stroke="#4A3020" stroke-width=".6"/></g>`+TX(156,108,'热泉与硅华','#5A5040',6.2)];

// ---------- 种子植物：Elkinsia 胚珠 ----------
const cupule=(x,y,a,s)=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0 0v-4" stroke="#4E7A3A" stroke-width="1"/>${[-30,-12,6,24].map((t,i)=>`<path transform="rotate(${t} 0 -4)" d="M0 -4c-2-4-2-10 0-14 2 4 2 10 0 14z" fill="${i%2?'#7AA85A':'#5E944A'}" stroke="#2E5A2A" stroke-width=".5"/>`).join('')}<ellipse cx="0" cy="-12" rx="2.2" ry="4" fill="#E8C878" stroke="#8A6A2A" stroke-width=".5"/></g>`;
ART.seed=[null,D(lg('ov',[[0,'#F6E0A0'],[1,'#C8943A']],1,0)+lg('cp',[[0,'#8AC46A'],[1,'#3E7A3A']],1,0))+soilLine+shadow(56,22)+
 `<path d="M56 107C56 90 58 70 54 44" stroke="#5A6A3A" stroke-width="3" fill="none" stroke-linecap="round"/>`+
 frond(55,78,-150,28,8,'#4E8C44',1)+frond(55,70,-30,30,8,'#5E9E52',1)+frond(55,60,-160,24,7,'#5E9E52',1)+frond(54,54,-20,24,7,'#4E8C44',1)+
 `<path d="M54 46c-4-6-6-12-4-18M54 46c4-4 10-8 16-8" stroke="#5A6A3A" stroke-width="1.4" fill="none"/>`+cupule(50,30,-14,1)+cupule(70,38,30,1)+cupule(46,40,-50,.8)+
 `<g transform="translate(142 62)"><circle r="40" fill="#FBF6EA" stroke="#8A7A5A" stroke-width="1.2"/>`+
 [-44,-22,0,22,44].map((t,i)=>`<path transform="rotate(${t} 0 30)" d="M0 30c-8-10-10-34-2-52 3 8 6 20 4 52z" fill="${u('cp')}" stroke="#2E5A2A" stroke-width=".8"/>`).join('')+
 `<ellipse cx="0" cy="0" rx="9" ry="15" fill="${u('ov')}" stroke="#8A5A1A" stroke-width="1"/><ellipse cx="0" cy="2" rx="4.6" ry="8" fill="#FFF2C8" stroke="#C8943A" stroke-width=".6"/><path d="M0 -15v-6" stroke="#8A5A1A" stroke-width="1.2"/><path d="M0 30V16" stroke="#3E6A2E" stroke-width="2"/></g>`+
 `<path d="M76 40l32 8" stroke="#8A7A5A" stroke-width=".7" stroke-dasharray="2 2"/>`+TX(142,114,'杯状托里的胚珠','#6E4A1E',6.5)];

// ---------- 石炭纪雨林崩溃 ----------
const lyco=(x,s,dead)=>`<g transform="translate(${x} 100) scale(${s})">${trunk(0,0,0,-60,7,4,dead?'#7A6A58':'#7E6442')}`+(dead?`<path d="M0-60l-8-8M0-60l6-10" stroke="#5A4A3A" stroke-width="2.6" stroke-linecap="round"/>`:`<path d="M0-60c-4-6-10-8-16-8M0-60c4-6 10-8 16-8M0-60v-10" stroke="#6E5236" stroke-width="3" fill="none" stroke-linecap="round"/>`+R(3,i=>{const x2=[-16,16,0][i],y2=[-68,-68,-70][i];return `<g stroke-linecap="round" fill="none">${R(9,k=>{const A=(-160+k*20)*Math.PI/180;return `<path d="M${x2} ${y2}q${r1(Math.cos(A)*5)} ${r1(Math.sin(A)*4)} ${r1(Math.cos(A)*10)} ${r1(Math.sin(A)*8+4)}" stroke="${k%2?'#3F7A3A':'#5E9E52'}" stroke-width="1.3"/>`;})}</g>`;}))+`</g>`;
ART.collapse=[null,D(lg('sk',[[0,'#E6C890'],[1,'#F4E8D0']])+lg('gd',[[0,'#C8A87A'],[1,'#A08058']])+lg('sw',[[0,'#6E9A8A'],[1,'#3E6A5A']]))+
 frame(u('sk'))+`<circle cx="160" cy="24" r="10" fill="#FFD86A"/><circle cx="160" cy="24" r="16" fill="#FFD86A" opacity=".3"/>`+
 `<path d="M6 92c40-4 80-2 120 0s50-2 68 0v18H6z" fill="${u('gd')}"/><path d="M60 98l6 4 8-2 4 5M92 96l-3 6 6 3M120 98l6 3 4-3 6 4M150 97l-4 5 5 4" stroke="#8A6A44" stroke-width=".8" fill="none"/>`+
 `<path d="M8 94c10-4 30-4 44 0v16H8z" fill="${u('sw')}"/><ellipse cx="30" cy="94" rx="22" ry="3" fill="#4E7A6A"/>`+lyco(18,.9)+lyco(34,1.05)+lyco(48,.8)+
 `<ellipse cx="170" cy="96" rx="16" ry="2.6" fill="#4E7A6A"/>`+lyco(166,.7)+lyco(178,.6)+
 lyco(92,.8,1)+`<g transform="translate(118 96) rotate(-82)">${trunk(0,0,0,-40,6,4,'#7A6A58')}</g>`+`<path d="M130 94l2-8 3 8zM76 96l2-10 3 10z" fill="#6E5A44"/>`+
 `<g transform="translate(142 96)"><path d="M0 0v-14" stroke="#5A4028" stroke-width="1.6"/>${R(4,k=>`<path d="M${-6+k*1.2} ${-4-k*4}L0 ${-12-k*4}l${6-k*1.2} 8z" fill="${k%2?'#4E7A3A':'#3E6A34'}"/>`)}</g>`+
 arrow('M58 34h60','#8A4A2A',1.4)+head(122,34,0,'#8A4A2A')+TX(90,28,'变干、雨林碎片化','#6E3A1E',6.8)];

// ---------- 古果：早期开花植物 ----------
const carpel=(x,y,a)=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0c-2.6-2-3-7 0-10 3 3 2.6 8 0 10z" fill="${u('cp')}" stroke="#6E4A1E" stroke-width=".5"/><path d="M0-1v-8" stroke="#6E4A1E" stroke-width=".35"/></g>`;
const dleaf=(x,y,a,L)=>{const A=a*Math.PI/180,ux=Math.cos(A),uy=Math.sin(A);let d=`M${x} ${y}l${r1(ux*L)} ${r1(uy*L)}`;for(let i=1;i<4;i++){const bx=x+ux*L*i/4,by=y+uy*L*i/4;d+=`M${r1(bx)} ${r1(by)}l${r1(ux*5-uy*4)} ${r1(uy*5+ux*4)}M${r1(bx)} ${r1(by)}l${r1(ux*5+uy*4)} ${r1(uy*5-ux*4)}`;}return `<path d="${d}" stroke="#4E8A4A" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;};
ART.archaefructus=[null,D(lg('sk',[[0,'#D8E8EA'],[1,'#F2F0E4']])+lg('lk',[[0,'#8CC4D8',.85],[1,'#3E7A9A',.95]])+lg('cp',[[0,'#F0C878'],[1,'#B8762A']]))+
 frame(u('sk'))+`<path d="M6 50c30-6 50-4 70-2 20-6 50-8 70-2 20-2 40 0 48 2v10H6z" fill="#9AB4A0" opacity=".6"/>`+
 `<path d="M6 56h188v54H6z" fill="${u('lk')}"/><path d="${wave(56,1,12,6,194)}" stroke="#E6F6FA" stroke-width="1" fill="none"/>`+
 `<path d="M6 100c30-3 60 2 96-1s60 0 92 1v10H6z" fill="#7A6A4E"/>`+
 `<path d="M100 102C98 86 104 70 100 56 98 44 102 34 100 20" stroke="#5E8A4A" stroke-width="2" fill="none"/><path d="M100 70c8-6 14-14 16-24M100 80c-8-6-16-10-20-20" stroke="#5E8A4A" stroke-width="1.4" fill="none"/>`+
 dleaf(100,94,-160,18)+dleaf(100,88,-20,18)+dleaf(100,78,-150,14)+dleaf(99,66,-30,14)+
 R(6,i=>carpel(100+(i%2?2.6:-2.6),22+i*5,i%2?40:-40))+R(4,i=>carpel(116+(i%2?2:-2),46-i*4.6,i%2?35:-35))+R(4,i=>carpel(80+(i%2?2:-2),60-i*4.6,i%2?35:-35))+
 `<g stroke="#C89A3A" stroke-width=".7">${R(4,i=>`<path d="M${100+(i%2?1.5:-1.5)} ${50+i*3}l${i%2?4:-4} -1"/><circle cx="${100+(i%2?5.5:-5.5)}" cy="${49+i*3}" r=".9" fill="#E8C44A"/>`)}</g>`+
 bubbles([[60,80,1],[64,72,.8],[140,86,1.1]],'#E6FAFF')+TX(150,38,'果实（心皮）','#8A4A1A',6.5)+`<path d="M130 40l-10 6" stroke="#8A4A1A" stroke-width=".7"/>`];

// ---------- 禾草出现：恐龙粪化石里的植硅体 ----------
const blades=(x,n,h,seed,col)=>{const r=rnd(seed);return R(n,i=>{const a=(i/(n-1)-.5)*1.4+(r()-.5)*.2,L=h*(.6+r()*.5);const ex=x+Math.sin(a)*L,ey=107-Math.cos(a)*L;return `<path d="M${x-1} 107Q${r1(x+Math.sin(a)*L*.3)} ${r1(107-L*.7)} ${r1(ex)} ${r1(ey)}Q${r1(x+Math.sin(a)*L*.3+1.6)} ${r1(107-L*.7)} ${x+1} 107z" fill="${col[i%col.length]}"/>`;});};
ART.grass=[null,D(rg('cop',[[0,'#B89E7A'],[1,'#6E5A42']],.4,.35,.7))+soilLine+shadow(56,26)+
 blades(56,11,50,4,['#6EA84A','#4E8A3A','#8AC05A'])+
 [[48,52,-12],[62,48,10],[56,44,0]].map(([x,y,a])=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0v-12" stroke="#8A8A4A" stroke-width=".8"/>${R(5,i=>`<ellipse cx="${i%2?1.6:-1.6}" cy="${-2-i*2.2}" rx="1.2" ry="2" fill="#C8B45A" transform="rotate(${i%2?20:-20} ${i%2?1.6:-1.6} ${-2-i*2.2})"/>`)}</g>`).join('')+
 shadow(126,18)+`<path d="M110 106c-4-8 2-16 10-16 4-6 14-6 18 0 8 0 10 10 6 16z" fill="${u('cop')}" stroke="#4A3A2A" stroke-width=".8"/><path d="M116 98c4-2 8-2 12 0M130 94c4 0 8 2 10 4" stroke="#5A4A34" stroke-width=".7" fill="none"/>`+
 `<g transform="translate(160 44)"><circle r="26" fill="#FBF6EA" stroke="#8A7A5A" stroke-width="1.2"/>${[[-12,-8,20],[6,-12,-10],[-4,6,40],[12,8,0],[-14,12,-30]].map(([x,y,a])=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-6 0c0-3 2-4 3-2.4 1 1 2 1 3 0 1-1 2-1 3 0 1-1.6 3-.6 3 2.4s-2 4-3 2.4c-1-1-2-1-3 0-1 1-2 1-3 0-1 1.6-3 .6-3-2.4z" fill="#E4EEF2" stroke="#6E8A9A" stroke-width=".7"/></g>`).join('')}</g><path d="M134 50l-4 36" stroke="#8A7A5A" stroke-width=".7" stroke-dasharray="2 2"/>`+
 TX(160,82,'粪化石中的禾草植硅体','#5A4A34',6.2)];

// ---------- 猛犸草原 ----------
const mamm=(x,s,op)=>`<g transform="translate(${x} 96) scale(${s})" opacity="${op||1}">${sil([[16,-20,1],[10,-22,8],[0,-24,11],[-10,-22,10],[-16,-18,5]],u('mf'))}${[-10,-4,6,11].map(x2=>sil([[x2,-16,3.6],[x2,-4,3.2],[x2,0,3.2]],u('mf'))).join('')}<path d="M16 -28c6 0 10 4 10 10 0 6-2 12 0 18" stroke="#5A3A22" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M20 -16c6 4 8 8 4 12" stroke="#F4EAD4" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M-18 -18c2 4 4 6 3 9M-12 -14l1 7M-6 -13l0 6M2 -13l0 6M8 -14l1 6M14 -16l1 6" stroke="#4E3018" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="-32" r="9" fill="${u('mf')}"/><path d="M4 -38c4-6 12-6 16 0" stroke="#A87A4E" stroke-width="1" fill="none" opacity=".6"/><circle cx="16" cy="-30" r="1" fill="#1A120A"/><path d="M-4-34c4-4 10-4 14 0" stroke="#3E2814" stroke-width="1.2" fill="none"/></g>`;
ART.steppe=[null,D(lg('sk',[[0,'#C4D4E0'],[1,'#F0EEE4']])+lg('gr',[[0,'#D4C47A'],[1,'#A89A4E']])+lg('mf',[[0,'#8A5A34'],[1,'#4E3018']]))+
 frame(u('sk'))+`<path d="M6 56l20-14 16 8 22-18 20 14 18-10 22 16 20-12 26 14 24-8v30H6z" fill="#C4CCD4"/><path d="M58 34l6-4 4 4-4-1zM118 38l4-3 4 3" fill="#fff"/>`+
 `<path d="M6 70c30-8 60-6 90-2s70 0 98-6v48H6z" fill="#C8BC7A" opacity=".7"/><path d="M6 84c40-6 80-4 120-2s50-2 68-2v30H6z" fill="${u('gr')}"/>`+
 mamm(150,.55,.6)+mamm(170,.45,.5)+mamm(70,1)+
 `<g stroke-linecap="round" fill="none">${R(40,i=>{const r=rnd(500+i);const x=8+r()*184,h=4+r()*8;return `<path d="M${r1(x)} 108q${r1((r()-.5)*3)} ${r1(-h*.5)} ${r1((r()-.5)*5)} ${r1(-h)}" stroke="${['#A8943A','#C8B45A','#8A8A3A'][i%3]}" stroke-width="1"/>`;})}</g>`+
 R(8,i=>{const r=rnd(600+i);return `<circle cx="${r1(20+r()*160)}" cy="${r1(96+r()*8)}" r="1.3" fill="${['#E8E0F4','#F4E07A','#E8A8C8'][i%3]}"/>`;})];

// ---------- 作物驯化 ----------
const wheat=(x,y,h)=>`<path d="M${x} 107C${x} 90 ${x+1} ${y+30} ${x} ${y}" stroke="#B8943A" stroke-width="1.6" fill="none"/>`+R(9,i=>{const yy=y-2-i*3.6,sd=i%2?1:-1,w=4.4-i*.25;return `<g transform="translate(${x+sd*1.6} ${yy}) rotate(${sd*24})"><ellipse rx="${r1(w*.55)}" ry="${r1(w*.9)}" fill="${u('wh')}" stroke="#8A6A1E" stroke-width=".5"/><path d="M0 ${-r1(w*.8)}l${sd*1.4} -14" stroke="#C8A850" stroke-width=".5"/></g>`;})+`<path d="M${x} ${y-34}v-14" stroke="#C8A850" stroke-width=".5"/>`;
const rice=(x,y)=>`<path d="M${x} 107C${x} 80 ${x+2} ${y+10} ${x+8} ${y}c8-6 14-2 18 8" stroke="#9A9A3A" stroke-width="1.4" fill="none"/>`+R(12,i=>{const t=i/11,px=x+8+t*18,py=y-4+Math.sin(t*3)*6+t*14;return `<ellipse cx="${r1(px+(i%2?2:-2))}" cy="${r1(py)}" rx="1.3" ry="2.4" transform="rotate(${i%2?-30:30} ${r1(px+(i%2?2:-2))} ${r1(py)})" fill="${u('ri')}" stroke="#8A7A2A" stroke-width=".4"/>`;})+
 `<path d="M${x} 90c-10-6-14-16-14-26M${x} 84c8-8 10-18 10-30" stroke="#6E9A3A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
ART.crops=[null,D(lg('wh',[[0,'#F4D688'],[1,'#C8942E']],1,0)+lg('ri',[[0,'#F0E0A0'],[1,'#C8B04A']],1,0))+
 soilLine+shadow(100,70)+`<path d="M20 107c20-4 50-6 80-6s60 2 80 6" stroke="#8A6A44" stroke-width="3" fill="none" opacity=".3"/>`+
 wheat(40,50)+wheat(52,56)+`<path d="M52 90c-6-4-10-10-12-18M40 92c6-4 8-10 8-16" stroke="#9AAA4A" stroke-width="1.2" fill="none"/>`+rice(120,40)+rice(138,50)+
 `<g transform="translate(78 96) rotate(-24)"><path d="M0 0h18" stroke="#8A6A3A" stroke-width="3" stroke-linecap="round"/><path d="M18 -1.6c6-6 14-6 18 0l-2 1c-3-4-9-4-14 1.6z" fill="#8A8A8A" stroke="#4A4A4A" stroke-width=".5"/></g>`+
 TX(46,116,'小麦','#6E4A1E',7)+TX(140,116,'水稻','#5A5A1E',7)];

// ---------- 最早的真菌？ Ourasphaira ----------
const hyph=(pts)=>`<path d="${tube(pts.map(p=>[p[0],p[1],1.3]))}" fill="#8A5A3A" stroke="#4A2A18" stroke-width=".4"/>`;
ART.ourasphaira=[null,lens(100,58,48,['#F8EED8','#EAD8B4','#C8B08A'],
 hyph([[60,86],[74,76],[90,70],[106,62],[124,56],[140,44]])+hyph([[90,70],[92,54],[86,40],[88,28]])+hyph([[106,62],[114,76],[124,86]])+hyph([[124,56],[132,64],[146,68]])+hyph([[74,76],[66,64],[58,56]])+hyph([[86,40],[74,34]])+
 [[88,26,3.4],[74,33,3],[57,55,3.2],[141,43,3.6],[146,68,3],[124,87,3.4],[60,87,2.6]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#B87A4A" stroke="#4A2A18" stroke-width=".6"/><circle cx="${r1(x-r*.3)}" cy="${r1(y-r*.3)}" r="${r1(r*.35)}" fill="#E8B88A"/>`).join('')+
 `<path d="M96 66l2 4M112 60l2 4M80 72l2 4" stroke="#4A2A18" stroke-width=".6"/>`,'10 μm')+TX(168,24,'显微镜下','#5A4030',6.5)+TX(36,104,'分枝菌丝 + 孢子','#6E3A1E',6)];

// ---------- 菌根共生 ----------
ART.mycorrhiza=[null,D(lg('so',[[0,'#B8946A'],[1,'#6E5238']])+lg('rt',[[0,'#F0E0C0'],[1,'#C8A878']],1,0)+rg('cl',[[0,'#FBF3E0'],[1,'#E8D4AE']]))+
 frame(u('so'))+`<path d="M6 6h188v24H6z" fill="#DCE8E0"/><path d="M6 30c30-2 60 2 94 0s64-2 94 0" stroke="#5A4028" stroke-width="1.4" fill="none"/>`+
 R(16,i=>{const r=rnd(700+i);return `<ellipse cx="${r1(10+r()*180)}" cy="${r1(40+r()*64)}" rx="${r1(1.4+r()*2.6)}" ry="${r1(1+r()*1.8)}" fill="#8A7458" opacity=".7"/>`;})+
 `<path d="M60 30c0-8 2-12 0-16M60 22c-4-3-6-6-6-9M60 18c4-3 8-4 8-8" stroke="#4E8A3E" stroke-width="2" fill="none" stroke-linecap="round"/>`+
 `<path d="M60 30c-2 14-10 24-22 32M60 30c4 16 14 26 30 34M60 30c0 20 2 36-2 52M38 62c-6 6-8 14-8 22M90 64c10 4 16 12 18 22" stroke="${u('rt')}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`+
 `<g fill="none" stroke="#FFFFFF" stroke-width=".7" opacity=".85">${R(22,i=>{const r=rnd(800+i);const x=30+r()*90,y=40+r()*60;return `<path d="M${r1(x)} ${r1(y)}q${r1((r()-.5)*20)} ${r1((r()-.5)*14)} ${r1((r()-.5)*30)} ${r1((r()-.5)*20)}"/>`;})}</g>`+
 `<g transform="translate(152 66)"><circle r="34" fill="${u('cl')}" stroke="#F4ECD8" stroke-width="1.4"/><rect x="-24" y="-18" width="48" height="36" rx="6" fill="#F6ECD4" stroke="#B89A6A" stroke-width="1"/><path d="M0 16V2M0 2l-8-8M0 2l8-8M-8-6l-4-6M-8-6l0-7M8-6l4-6M8-6l0-7M0 2l-2-10M0 -8l-3-4M0 -8l3-4" stroke="#6E8A5A" stroke-width="1.2" fill="none" stroke-linecap="round"/>${R(8,i=>`<circle cx="${r1(Math.cos(i*.8)*10)}" cy="${r1(-8+Math.sin(i*.8)*6)}" r="1.4" fill="#9AC47A"/>`)}<path d="M-34 16h10M24 16h10" stroke="#fff" stroke-width=".8"/></g><path d="M104 82l14-4" stroke="#F4ECD8" stroke-width=".8" stroke-dasharray="2 2"/>`+
 TX(152,106.5,'根细胞里的“丛枝”','#FBF3E0',6.2)+TX(40,24,'菌丝网络延伸根系','#2E4A2E',6.2,'start')];

// ---------- 原杉藻：8 米巨柱 ----------
const proto=(x,h,w)=>`<path d="M${x-w} 100V${100-h+w}c0-${w*1.3} ${w*2}-${w*1.3} ${w*2} 0V100z" fill="${u('pt')}" stroke="#4A3420" stroke-width="1"/>`+R(Math.floor(w/1.6),i=>`<path d="M${r1(x-w+1.6+i*1.6*1.05)} ${100-h+w*.8}V98" stroke="#5A4028" stroke-width=".35" opacity=".6"/>`)+R(Math.floor(h/12),i=>`<path d="M${x-w} ${100-h+w+8+i*12}q${w} 2 ${w*2} 0" stroke="#5A4028" stroke-width=".6" fill="none" opacity=".45"/>`);
ART.prototaxites=[null,D(lg('sk',[[0,'#D0DCD8'],[1,'#F2EEDE']])+lg('pt',[[0,'#8A6A48'],[.35,'#B89470'],[1,'#6E5236']],1,0))+
 frame(u('sk'))+`<path d="M6 90c30-4 60-2 90 0s70 2 98-2v22H6z" fill="#8A7E60"/>`+
 `<g opacity=".45">${proto(150,50,6)}${proto(172,36,4.4)}</g>`+proto(92,80,10)+
 R(16,i=>{const r=rnd(900+i);const x=14+r()*176;if(x>78&&x<106)return'';return `<path d="M${r1(x)} 100c0-4 1-6 0-9M${r1(x)} 94l-2-2M${r1(x+.5)} 96l2-2" stroke="#6EA84A" stroke-width="1" fill="none"/>`;})+
 `<path d="M118 100V20" stroke="#5A5048" stroke-width=".9"/><path d="M114 20h8M114 100h8M115 60h6" stroke="#5A5048" stroke-width=".9"/>`+TX(136,58,'高约 8 米','#4A3A2A',7)+
 `<path d="M20 100v-8M18 94l2 2 2-2" stroke="#6EA84A" stroke-width="1" fill="none"/>`+TX(30,86,'当时最高的植物才约 1 米','#4A5A3A',5.8,'start')];

// ---------- 地衣 ----------
const rosette=(x,y,r,c1,c2,seed)=>{const q=rnd(seed);return R(12,i=>{const a=i/12*Math.PI*2,rr=r*(.7+q()*.3);return `<ellipse cx="${r1(x+Math.cos(a)*rr*.55)}" cy="${r1(y+Math.sin(a)*rr*.32)}" rx="${r1(rr*.45)}" ry="${r1(rr*.26)}" transform="rotate(${r1(a*57.3)} ${r1(x+Math.cos(a)*rr*.55)} ${r1(y+Math.sin(a)*rr*.32)})" fill="${i%2?c1:c2}" stroke="#6E4A1E" stroke-width=".3"/>`;})+`<circle cx="${x}" cy="${y}" r="${r1(r*.2)}" fill="${c2}"/>`;};
ART.lichen=[null,D(rg('rk',[[0,'#C8C4BC'],[.7,'#9A968E'],[1,'#6E6A64']],.4,.3,.8)+lg('ly',[[0,'#E8E0CC'],[1,'#D4C8B0']]))+soilLine+shadow(76,60)+
 `<path d="M18 107c-2-24 10-46 36-56 26-10 58-8 76 6 16 12 20 32 18 50z" fill="${u('rk')}" stroke="#5A5650" stroke-width="1"/><path d="M44 66c8-4 16-4 22 0M100 60c10 2 18 8 22 16M34 90c6-4 12-4 18 0" stroke="#7A766E" stroke-width=".8" fill="none"/>`+
 rosette(56,64,14,'#E8A23A','#D2821E',3)+rosette(96,82,11,'#E8A23A','#D2821E',5)+rosette(122,66,8,'#E8B84A','#C88A2A',9)+
 R(10,i=>{const r=rnd(1000+i);return `<path d="M${r1(30+r()*20)} ${r1(84+r()*16)}c2-3 6-3 6 0-2 2-4 2-6 0z" fill="#9AB09A" stroke="#5A6E5A" stroke-width=".4"/>`;})+
 `<g stroke="#8AA08A" stroke-width="1.1" fill="none" stroke-linecap="round">${R(9,i=>`<path d="M${130+i*1.6} 90c${(i%3-1)*2}-6 ${(i%2?3:-3)}-10 ${(i%2?4:-2)}-16m${(i%2?-1:1)}-4l${i%2?3:-3}-3"/>`)}</g>`+
 `<g transform="translate(168 40)"><circle r="24" fill="#FBF6EA" stroke="#8A7A5A" stroke-width="1.2"/><path d="M-20 -8h40v4h-40z" fill="#C8A86A"/><path d="M-22 -4h44v8h-44z" fill="#F0E8D4"/>${R(10,i=>`<circle cx="${-18+i*4}" cy="0" r="1.8" fill="#5EA84A"/>`)}<path d="M-22 4h44v10h-44z" fill="#F6F0E4"/><path d="M-20 6c6 4 10-2 16 2s10-2 16 2 8-2 10 0" stroke="#B8A888" stroke-width=".7" fill="none"/></g>`+
 TX(168,72,'真菌层包着藻类层','#4A5A3A',6)+`<path d="M150 36l-26 24" stroke="#8A7A5A" stroke-width=".7" stroke-dasharray="2 2"/>`];

// ---------- 白腐菌：分解木材 ----------
const bracket=(x,y,w,c)=>`<path d="M${x} ${y}c${-w*.2}-${w*.35} ${w*.4}-${w*.55} ${w}-${w*.35}c${w*.2} ${w*.1} ${w*.1} ${w*.35}-${w*.2} ${w*.4}H${x}z" fill="${c}" stroke="#5A3A1E" stroke-width=".7"/>`+R(3,i=>`<path d="M${x+w*.1} ${r1(y-w*(.08+i*.08))}q${w*.4}-${w*.16} ${w*.8} 0" stroke="#F4E6C8" stroke-width=".6" fill="none" opacity=".7"/>`)+`<path d="M${x} ${y}h${w}" stroke="#F0DCB0" stroke-width="1"/>`;
ART.whiterot=[null,D(lg('bk',[[0,'#8A6A48'],[.5,'#6E5236'],[1,'#4A3420']])+rg('ew',[[0,'#E6C89A'],[1,'#B8905E']]))+soilLine+shadow(98,76)+
 `<path d="M24 104c-4-10-4-22 2-30h136v30z" fill="${u('bk')}" stroke="#3A2818" stroke-width="1"/><path d="M34 80h120M30 90h128M32 98h124" stroke="#3A2818" stroke-width=".5" opacity=".6"/><path d="M60 76l4 6-2 8M100 78l-3 8 3 10M130 76l2 10" stroke="#3A2818" stroke-width=".7" fill="none"/>`+
 `<ellipse cx="162" cy="89" rx="12" ry="15.4" fill="${u('ew')}" stroke="#3A2818" stroke-width="1.2"/>${R(4,i=>`<ellipse cx="162" cy="89" rx="${10-i*2.4}" ry="${13-i*3}" fill="none" stroke="#8A6A40" stroke-width=".6"/>`)}`+
 `<path d="M158 80c4-2 6 2 4 5-3 2-6 0-4-5zM166 92c3 0 5 3 3 5s-6 1-3-5zM156 96c2 1 3 3 1 4" fill="#FBF6EC" stroke="#E8DCC4" stroke-width=".5"/>`+
 bracket(60,76,20,'#C8864A')+bracket(64,70,14,'#D89A5A')+bracket(112,76,16,'#C8864A')+bracket(116,71,11,'#E0AC6A')+
 `<g fill="#FBF6EC" opacity=".8">${R(8,i=>`<circle cx="${40+i*14}" cy="${96+(i%2)*3}" r="1.2"/>`)}</g>`+TX(162,64,'被“漂白”的木头','#6E4A1E',6.2)];

// ---------- 琥珀里的蘑菇 ----------
ART.amber_mushroom=[null,D(rg('am',[[0,'#FFE6A0'],[.45,'#F2AE3A'],[.85,'#C8741A'],[1,'#8A4A10']],.4,.35,.7)+lg('cap',[[0,'#C8A07A'],[1,'#8A6040']]))+soilLine+shadow(100,48)+
 `<path d="${closed([[62,70],[70,40],[96,24],[128,28],[146,48],[142,80],[120,100],[82,102],[64,90]])}" fill="${u('am')}" stroke="#7A3E0A" stroke-width="1.2"/>`+
 `<g opacity=".92"><path d="M100 88V64" stroke="#E8D8B8" stroke-width="2.4" stroke-linecap="round"/><path d="M84 64c0-10 8-16 16-16s16 6 16 16z" fill="${u('cap')}" stroke="#5A3A1E" stroke-width=".7"/><path d="M84 64h32" stroke="#5A3A1E" stroke-width=".8"/>${R(7,i=>`<path d="M${88+i*4} 64l${i<3?1:i>3?-1:0} 3" stroke="#5A3A1E" stroke-width=".5"/>`)}<circle cx="96" cy="54" r="1.4" fill="#E8D0B0" opacity=".7"/></g>`+
 bubbles([[76,58,1.6],[128,78,1.2],[120,40,1],[80,84,.9]],'#FFF4D0')+
 `<path d="M72 50c6-12 16-20 30-22" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".55" fill="none"/><path d="M134 40c4 4 6 10 6 16" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".4" fill="none"/>`+
 `<path d="M118 84l8 6M122 82l2 6" stroke="#8A4A10" stroke-width=".5" opacity=".6"/>`+TX(160,106,'约 1 亿年前','#8A4A10',6.5)];

// ---------- 切叶蚁的真菌农场 ----------
const ant=(x,y,s,leaf,a)=>`<g transform="translate(${x} ${y}) rotate(${a||0}) scale(${s})"><ellipse cx="-6" cy="0" rx="4" ry="3" fill="#6E3A1E"/><ellipse cx="0" cy="-.4" rx="2.4" ry="1.8" fill="#7E4424"/><circle cx="4.4" cy="-1" r="2.4" fill="#8A4A28"/><path d="M-3 1l-3 4M-1 1l0 4.4M1 1l3 4M6 -2.6l3 -3" stroke="#4A2410" stroke-width=".7" fill="none"/>`+(leaf?`<path d="M5 -3l2-8M7 -11c-3-4 2-9 8-7 4 2 2 8-3 9z" fill="#6EB04A" stroke="#2E6A2E" stroke-width=".6"/>`:'')+`</g>`;
ART.leafcutter=[null,D(lg('sk',[[0,'#D8ECE0'],[1,'#EEF4E8']])+lg('so',[[0,'#A8845A'],[1,'#6E5236']])+rg('fg',[[0,'#FBF8F0'],[1,'#D8D0BC']]))+
 frame(u('so'))+`<path d="M6 6h188v36H6z" fill="${u('sk')}"/><path d="M6 42c30-2 60 2 94 0s64-2 94 0" stroke="#4E3A24" stroke-width="1.4" fill="none"/>`+
 `<path d="M150 42c0-10 4-24 10-30" stroke="#5E8A3E" stroke-width="1.6" fill="none"/>${[[160,14,-30],[154,24,-60],[162,26,20]].map(([x,y,a])=>`<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0c-4-6 0-12 6-12 4 4 2 10-6 12z" fill="#6EB04A" stroke="#2E6A2E" stroke-width=".6"/>`).join('')}`+
 ant(40,40,1,1)+ant(62,40,1,1)+ant(84,40,1,1)+ant(106,40,1)+ant(128,40,1,1)+
 `<path d="M32 42c-2 8-6 14-6 22" stroke="#4E3A24" stroke-width="5" fill="none"/>`+
 `<ellipse cx="74" cy="82" rx="46" ry="20" fill="#3E2A18"/><ellipse cx="74" cy="84" rx="40" ry="15" fill="${u('fg')}"/>`+
 R(40,i=>{const r=rnd(1100+i);const a=r()*Math.PI*2,d=Math.sqrt(r());return `<circle cx="${r1(74+Math.cos(a)*36*d)}" cy="${r1(84+Math.sin(a)*12*d)}" r="${r1(1.2+r()*2)}" fill="${i%3?'#EDE6D4':'#D8CEB6'}" stroke="#BDB298" stroke-width=".3"/>`;})+
 ant(54,82,.9,0,-10)+ant(96,84,.9,1,8)+`<path d="M122 80c10 0 20 2 30 8" stroke="#3E2A18" stroke-width="5" fill="none"/>`+TX(74,108,'地下真菌园','#FBF3E0',6.5)];

// ---------- 狄更逊虫 ----------
const dick=(x,y,rx,ry,a)=>`<g transform="translate(${x} ${y}) rotate(${a})"><ellipse rx="${rx}" ry="${ry}" fill="${u('dk')}" stroke="#4A5A5A" stroke-width=".9"/>${R(Math.round(rx/2.2),i=>{const t=-rx+2.2*(i+.5)+1.1;if(Math.abs(t)>=rx)return'';const h=ry*Math.sqrt(1-(t/rx)**2);return `<path d="M${r1(t)} ${r1(-h)}q1.2 ${r1(h)} ${-.6} ${r1(h*2)}" stroke="#4A5A5A" stroke-width=".45" fill="none"/>`;})}<path d="M${-rx} 0H${rx}" stroke="#4A5A5A" stroke-width=".7"/><ellipse cx="${r1(-rx*.2)}" cy="${r1(-ry*.4)}" rx="${r1(rx*.6)}" ry="${r1(ry*.2)}" fill="#fff" opacity=".22"/></g>`;
ART.dickinsonia=[null,D(lg('sea',[[0,'#8CC4CC'],[1,'#3E7A86']])+rg('dk',[[0,'#E6D8C0'],[1,'#B89E7E']],.45,.4,.7)+lg('mat',[[0,'#A8A070'],[1,'#7A7650']]))+
 frame(u('sea'))+`<g opacity=".25" fill="#fff">${R(4,i=>`<path d="M${40+i*40} 6l-10 70h6z"/>`)}</g>`+
 `<path d="M6 70c30-3 60 2 94 0s64-2 94 0v40H6z" fill="${u('mat')}"/>`+R(40,i=>{const r=rnd(1200+i);return `<path d="M${r1(8+r()*184)} ${r1(74+r()*34)}q2-1 4 0" stroke="#5E5A3A" stroke-width=".5" fill="none" opacity=".6"/>`;})+
 `<g transform="translate(34 72)"><path d="M0 0c-2-14 0-30 4-40 4 10 6 26 4 40z" fill="#C8B48A" stroke="#6E5A3A" stroke-width=".6"/>${R(8,i=>`<path d="M${2+(i%2?1:-1)} ${-4-i*4.4}l${i%2?4:-4} -2" stroke="#6E5A3A" stroke-width=".5"/>`)}<circle r="2.4" fill="#8A7650"/></g>`+
 dick(104,88,36,15,-6)+dick(166,82,14,6.4,20)+dick(60,98,9,4,10)+TX(104,66,'身体由许多节片组成','#1E4A56',6.5)];

// ---------- 最早的石器 ----------
const facetStone=(pts,facets,c1,c2)=>`<path d="${closed(pts)}" fill="${c1}" stroke="#4A4238" stroke-width=".9"/>`+facets.map(([d,op])=>`<path d="${d}" fill="${c2}" opacity="${op}" stroke="#5A5248" stroke-width=".5"/>`).join('');
ART.stones=[null,soilLine+shadow(60,34)+shadow(128,14)+shadow(166,16)+
 facetStone([[28,106],[26,90],[40,74],[62,70],[86,80],[94,98],[86,106]],[['M40 74l10 10 14-12z',.5],['M62 70l4 16 20-6z',.35],['M50 84l14-2 2 18-16 4z',.25],['M66 86l20-6 8 18-18 4z',.45]],'#B8AC98','#8A7E6C')+
 `<path d="M44 80q4 4 2 8M70 76q6 2 8 8" stroke="#6E6456" stroke-width=".6" fill="none"/>`+
 facetStone([[116,106],[118,96],[128,88],[140,92],[142,104]],[['M128 88l2 8 10-4z',.4]],'#9A9080','#6E6456')+
 facetStone([[150,106],[156,94],[168,90],[180,96],[182,106]],[],'#C8BCA4','#8A7E6C')+`<ellipse cx="164" cy="96" rx="6" ry="2" fill="#fff" opacity=".35"/><path d="M160 100l3-2 2 3" stroke="#6E6456" stroke-width=".6" fill="none"/>`+
 `<path d="M100 106l6-10 8 4-2 6z" fill="#A89C88" stroke="#4A4238" stroke-width=".7"/>`+
 TX(60,64,'石核','#4A4238',7)+TX(116,84,'石片','#4A4238',7)+TX(166,84,'石锤','#4A4238',7)];

// ---------- 学会用火 ----------
const flame=(x,y,h,w,c)=>`<path d="M${x} ${y}c${-w} 0 ${-w*1.1}-${h*.4} ${-w*.6}-${h*.66}c${w*.2}-${h*.14} ${w*.1}-${h*.24} ${w*.3}-${h*.34}c${w*.1} ${h*.14} ${w*.3} ${h*.2} ${w*.5} ${h*.18}c${w*.1}-${h*.1}-${w*.1}-${h*.12} 0-${h*.18}c${w*.5} ${h*.24} ${w*1.1} ${h*.6} ${w*.4} ${h}z" fill="${c}"/>`;
ART.fire=[null,D(lg('sk',[[0,'#0E1428'],[1,'#2A2230']])+rg('gl',[[0,'#FFB050',.75],[.5,'#E0602A',.3],[1,'#E0602A',0]])+lg('lg',[[0,'#8A5A34'],[1,'#4A2E18']]))+
 frame(u('sk'))+stars(22,17,8,8,184,40)+`<ellipse cx="100" cy="84" rx="80" ry="46" fill="${u('gl')}"/>`+
 `<path d="M6 94c30-3 60 1 94 0s64-2 94 0v16H6z" fill="#2A2018"/><path d="M40 96c20-2 40-2 60-2s40 0 60 2" stroke="#6E4A2A" stroke-width="1" opacity=".6" fill="none"/>`+
 R(7,i=>`<ellipse cx="${r1(74+i*8.6)}" cy="${97+(i%2)}" rx="5" ry="3.2" fill="#7A7068" stroke="#3A342E" stroke-width=".6"/>`)+
 `<g transform="translate(100 94)"><path d="M-26 0l48-10" stroke="#3A2414" stroke-width="7" stroke-linecap="round"/><path d="M-26 0l48-10" stroke="${u('lg')}" stroke-width="5" stroke-linecap="round"/><path d="M26 0l-48-10" stroke="#3A2414" stroke-width="7" stroke-linecap="round"/><path d="M26 0l-48-10" stroke="${u('lg')}" stroke-width="5" stroke-linecap="round"/><circle cx="22" cy="-10" r="2.6" fill="#E0602A"/><circle cx="-22" cy="-10" r="2.6" fill="#E0602A"/></g>`+
 flame(100,90,48,14,'#C8321A')+flame(98,90,38,11,'#F07A2A')+flame(102,90,26,8,'#FFC84A')+flame(100,90,14,4.4,'#FFF2B0')+flame(88,90,22,6,'#F07A2A')+flame(112,90,20,6,'#F07A2A')+
 R(10,i=>{const r=rnd(1300+i);return `<circle cx="${r1(80+r()*40)}" cy="${r1(20+r()*40)}" r="${r1(.6+r()*.8)}" fill="#FFC060" opacity="${r1(.5+r()*.5)}"/>`;})+
 `<g transform="translate(150 94)"><path d="M-16-2l32-20" stroke="#5A3A22" stroke-width="2" stroke-linecap="round"/><ellipse cx="-4" cy="-10" rx="5" ry="3" transform="rotate(-32 -4 -10)" fill="#8A3A1E"/></g>`];

// ---------- 智人走出非洲 ----------
const P=(lon,lat)=>[6+(lon+170)*188/360,6+(80-lat)*104/140];
const cont=(ll)=>closed(ll.map(([a,b])=>P(a,b)));
const NA=[[-165,68],[-140,70],[-95,72],[-80,65],[-62,55],[-66,45],[-76,35],[-81,26],[-90,29],[-97,26],[-97,20],[-88,21],[-88,16],[-83,10],[-79,8],[-92,14],[-105,20],[-112,28],[-117,32],[-124,40],[-124,48],[-135,58],[-150,60],[-165,62]];
const SA=[[-78,8],[-60,10],[-50,0],[-35,-6],[-40,-22],[-48,-28],[-58,-38],[-65,-42],[-68,-54],[-73,-45],[-72,-30],[-71,-18],[-76,-12],[-81,-5],[-80,2]];
const AF=[[-10,35],[10,37],[32,31],[35,28],[43,12],[51,11],[40,-5],[40,-15],[35,-25],[20,-35],[15,-28],[12,-8],[9,4],[-8,5],[-17,14],[-17,21]];
const EU=[[-10,37],[-9,43],[-2,48],[5,53],[8,58],[20,70],[40,68],[70,73],[110,76],[140,72],[180,68],[178,62],[160,60],[140,52],[130,42],[122,30],[110,20],[105,10],[100,13],[98,8],[92,22],[80,8],[72,22],[58,24],[52,16],[43,13],[35,30],[28,40],[20,40],[12,44],[2,42]];
const AU=[[114,-22],[114,-34],[130,-32],[140,-38],[150,-37],[153,-26],[146,-18],[142,-11],[136,-12],[130,-12],[122,-17]];
const GL=[[-50,60],[-42,62],[-22,70],[-20,79],[-60,79],[-70,77],[-56,70]];
const ORIG=P(36,-2),ME=P(45,30),IN=P(78,20),AUx=P(135,-24),EUx=P(15,50),EA=P(115,36),BER=P(172,64),AMx=P(-100,42),SAx=P(-62,-15);
const cv=(a,b,bend)=>{const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2-(bend||6);return `M${r1(a[0])} ${r1(a[1])}Q${r1(mx)} ${r1(my)} ${r1(b[0])} ${r1(b[1])}`;};
const ang=(a,b,bend)=>{const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2-(bend||6);return r1(Math.atan2(b[1]-my,b[0]-mx)*57.3);};
const route=(a,b,bend)=>arrow(cv(a,b,bend),'#C0392B',1.5)+head(r1(b[0]),r1(b[1]),ang(a,b,bend));
ART.map_africa=[null,D(lg('sea',[[0,'#CFE6F2'],[1,'#8CBCD8']])+lg('ld',[[0,'#D8CCA0'],[1,'#B8A878']])+rg('og',[[0,'#FFB050',.9],[1,'#FFB050',0]]))+
 frame(u('sea'))+`<g stroke="#fff" stroke-width=".4" opacity=".5" fill="none">${R(5,i=>`<path d="M6 ${22+i*20}H194"/>`)}${R(8,i=>`<path d="M${24+i*22} 6V110"/>`)}</g>`+
 [NA,SA,EU,AU,GL].map(c=>`<path d="${cont(c)}" fill="${u('ld')}" stroke="#8A7A50" stroke-width=".7"/>`).join('')+
 `<path d="${cont(AF)}" fill="#E8B060" stroke="#8A5A20" stroke-width=".9"/>`+
 [[-3,54,2.4,3.4],[47,-19,1.6,3.2],[138,37,1.4,3.4],[115,-1,4,2],[122,-3,2.4,1.2],[140,-5,4,1.6],[172,-42,1.6,3]].map(([lo,la,rx,ry])=>{const [x,y]=P(lo,la);return `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${rx}" ry="${ry}" fill="${lo===47?'#E8B060':u('ld')}" stroke="#8A7A50" stroke-width=".5"/>`;}).join('')+
 `<circle cx="${r1(ORIG[0])}" cy="${r1(ORIG[1])}" r="9" fill="${u('og')}"/><circle cx="${r1(ORIG[0])}" cy="${r1(ORIG[1])}" r="2.4" fill="#C0392B" stroke="#fff" stroke-width=".8"/>`+
 route(ORIG,ME,4)+route(ME,IN,6)+route(IN,AUx,-4)+route(ME,EUx,4)+route(IN,EA,6)+route(EA,BER,8)+
 arrow(`M${r1(BER[0])} ${r1(BER[1])}l10 -4`,'#C0392B',1.5)+arrow(`M6 ${r1(BER[1]-3)}l6 1`,'#C0392B',1.5)+route(P(-162,62),AMx,6)+route(AMx,SAx,-6)+
 TX(r1(ORIG[0]-10),r1(ORIG[1]+14),'非洲','#6E3A0A',7.5)+TX(r1(IN[0]+2),r1(IN[1]+12),'约7万年前','#8A2A1E',5.6)+TX(r1(AUx[0]),r1(AUx[1]+14),'约5万年前','#8A2A1E',5.6)+TX(r1(EUx[0]-2),r1(EUx[1]-8),'约4.5万年前','#8A2A1E',5.6)+TX(r1(AMx[0]+4),r1(AMx[1]-10),'约1.5万年前','#8A2A1E',5.6)];

// ---------- 洞穴艺术 ----------
const handPath='M0 0c-2-8-2-14 0-20l-5-16c-1-3 3-4 4-1l4 13 0-19c0-3 4-3 4 0l1 18 3-17c1-3 5-2 4 1l-2 18 5-11c1-3 5-1 4 2l-6 18c0 6-2 11-4 14z';
ART.handprint=['#B5462E',D(rg('wl',[[0,'#E6D2B0'],[.6,'#C8AE88'],[1,'#8A7254']],.3,.7,.9)+rg('spr',[[0,'#B5462E',.85],[.55,'#B5462E',.55],[1,'#B5462E',0]]))+
 frame(u('wl'))+R(26,i=>{const r=rnd(1400+i);return `<ellipse cx="${r1(10+r()*180)}" cy="${r1(10+r()*96)}" rx="${r1(4+r()*12)}" ry="${r1(2+r()*6)}" fill="${i%2?'#A88E6A':'#EFE0C4'}" opacity="${r1(.15+r()*.2)}"/>`;})+
 `<path d="M6 40c30 6 50 2 80-4M100 24c30 6 60 2 94-6M20 90c30-4 60 0 90 6" stroke="#8A7254" stroke-width=".8" fill="none" opacity=".5"/>`+
 `<ellipse cx="58" cy="60" rx="30" ry="34" fill="${u('spr')}"/><g transform="translate(60 88)"><path d="${handPath}" fill="#DCC6A0"/></g>`+
 `<ellipse cx="30" cy="36" rx="14" ry="16" fill="${u('spr')}" opacity=".7"/><g transform="translate(31 49) scale(.5) rotate(-18)"><path d="${handPath}" fill="#D4BC96"/></g>`+
 `<g transform="translate(140 64)"><path d="M-30 0c0-10 8-18 20-18 6-8 16-8 22-2 8 0 14 6 14 14-2 6-6 8-10 8l-2 14h-4l-2-12h-18l-4 12h-4l-1-12c-6-2-10-4-11-4z" fill="#8A3A20" opacity=".75"/><path d="M-30 0c0-10 8-18 20-18 6-8 16-8 22-2 8 0 14 6 14 14-2 6-6 8-10 8l-2 14h-4l-2-12h-18l-4 12h-4l-1-12c-6-2-10-4-11-4z" fill="none" stroke="#2A1A12" stroke-width="1.6"/><path d="M24 -8l6-4M22 -12l4-6M-30 0l-6 2" stroke="#2A1A12" stroke-width="1.4" stroke-linecap="round"/><circle cx="20" cy="-6" r="1" fill="#2A1A12"/><path d="M-8 -16c4 4 12 6 20 2" stroke="#2A1A12" stroke-width="1" fill="none" opacity=".6"/></g>`+
 R(9,i=>`<circle cx="${112+i*6}" cy="${96-(i%3)*2}" r="1.4" fill="#B5462E" opacity=".75"/>`)];

// ---------- 文字：楔形文字泥板 ----------
const wedge=(x,y,a)=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0-2.6V2.6L3.8 0z" fill="#6E4E2C"/><path d="M0-2.6L3.8 0H.8z" fill="#F0DCB4" opacity=".7"/><path d="M2.6-.7L9.5 0 2.6.7z" fill="#7A5A36"/></g>`;
ART.tablet=['#B9A07A',D(lg('tf',[[0,'#E0C8A0'],[1,'#B8966A']],1,1)+lg('ts',[[0,'#9A7A52'],[1,'#6E5234']]))+soilLine+shadow(96,52)+
 `<path d="M52 16c0-4 3-7 7-7h78c4 0 7 3 7 7v80c0 4-3 7-7 7H59c-4 0-7-3-7-7z" fill="${u('ts')}" transform="translate(4 3)"/>`+
 `<path d="M52 16c0-4 3-7 7-7h78c4 0 7 3 7 7v80c0 4-3 7-7 7H59c-4 0-7-3-7-7z" fill="${u('tf')}" stroke="#7A5A34" stroke-width="1"/>`+
 `<path d="M56 14c20-2 50-2 82 0" stroke="#F4E4C4" stroke-width="1.6" opacity=".6" fill="none"/>`+
 R(5,r=>`<path d="M58 ${30+r*16}h80" stroke="#8A6A44" stroke-width=".7" opacity=".7"/>`)+
 R(30,i=>{const r=Math.floor(i/6),c=i%6;const x=62+c*12.5+(r%2)*3,y=22+r*16;const q=rnd(1500+i)();return wedge(x,y,q<.3?90:q<.5?45:0)+(q>.6?wedge(x+3,y+6,90):'');})+
 R(6,i=>{const r=rnd(1600+i);return `<path d="M${r1(56+r()*80)} ${r1(14+r()*84)}l${r1(r()*4)} ${r1(r()*3)}" stroke="#8A6A44" stroke-width=".5"/>`;})+
 `<g transform="translate(160 100) rotate(-58)"><path d="M0 -2h52v4H0z" fill="#C8B070" stroke="#6E5A2A" stroke-width=".6"/><path d="M52 -2l6 2-6 2z" fill="#A89048"/><path d="M12 -2v4M28 -2v4" stroke="#8A7A3A" stroke-width=".8"/></g>`];

ART.dickinsonia_s=['#B89E7E',D(rg('dk',[[0,'#E6D8C0'],[1,'#B89E7E']],.45,.4,.7))+dick(100,100,40,15,-4)];
wrapFrames(['stromatolite','moss','rhynie','collapse','archaefructus','steppe','mycorrhiza','prototaxites','leafcutter','dickinsonia','fire','map_africa','handprint']);
})();
