// 精细插图 · 植被（多层叶团、羽状叶、树干纹理）
(function(){
const {leaves,frond,trunk,T,U,r1}=K;
const R=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join('');
const G='<path class="g" d="M6 107H194"/>';
const soil=(c)=>`<path d="M6 107c30-3 60 2 94 0s64-2 94 0v4H6z" fill="${c||'#B9A585'}" opacity=".6"/>`;
const grassTufts=(xs,col)=>xs.map((x,i)=>`<path fill="none" stroke="${col||'#6E9A4A'}" stroke-width="1.3" stroke-linecap="round" d="M${x} 107c0-7-2-12-5-15M${x+2} 107c0-8 2-13 5-16M${x+1} 107c1-6 0-10-1-13"/>`).join('');

// 最早的森林：古羊齿
ART.archaeopteris=[null,G+soil()+
 `<g opacity=".7" transform="translate(30 58) scale(.42)">${trunk(20,116,20,40,7,4)}${[40,56,72,88].map((y,i)=>frond(20,y,200-i*4,34+i*6,7,'#5E8A4A')+frond(20,y,-20+i*4,34+i*6,7,'#5E8A4A')).join('')}</g>`+
 trunk(100,107,100,20,10,4)+`<path class="kt" style="stroke:#4A3420;opacity:.5" d="M97 100q2-20 0-40M103 90q-2-18 0-34"/>`+
 [[26,46],[36,58],[48,72],[60,86]].map(([y,L],i)=>frond(100,y,196-i*3,L,9,i%2?'#4E8C44':'#3F7A3A',1.1)+frond(100,y,-16+i*3,L,9,i%2?'#4E8C44':'#3F7A3A',1.1)).join('')+
 frond(100,20,-90,14,4,'#5E9E52')];

// 石炭纪煤炭森林：鳞木
const tuft=(x,y,s)=>`<g stroke="#4E8C44" stroke-width="1" fill="none" stroke-linecap="round">${R(9,i=>{const a=(-160+i*18)*Math.PI/180;return `M${x} ${y}q${r1(Math.cos(a)*8*s)} ${r1(Math.sin(a)*4*s)} ${r1(Math.cos(a)*14*s)} ${r1(Math.sin(a)*12*s+6*s)}`;})}</g>`;
const lcone=(x,y,a,s)=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><g stroke-linecap="round" fill="none">${R(13,i=>{const t=-150+i*25,A=t*Math.PI/180;return `<path stroke="${i%2?'#3F7A3A':'#5E9E52'}" stroke-width="1.3" d="M0 0q${r1(Math.cos(A)*6)} ${r1(Math.sin(A)*6-2)} ${r1(Math.cos(A)*12)} ${r1(Math.sin(A)*11+4)}"/>`;})}</g><ellipse cx="0" cy="-3" rx="2.6" ry="5" fill="#8A7A4A" stroke="#4A3420" stroke-width=".6"/><path d="M-2 -5h4M-2 -2h4" stroke="#4A3420" stroke-width=".4"/></g>`;
const lbr=`M100 34C96 26 88 22 80 20M100 34C104 26 112 22 120 20M80 20C76 16 70 14 64 16M80 20C80 14 82 10 86 7M120 20C124 16 130 14 136 16M120 20C120 14 118 10 114 7`;
ART.lepido=[null,'<path class="b bg" d="M6 96c30-3 60 3 94 0s64-3 94 0v14H6z" style="stroke:none"/>'+
 trunk(100,106,100,40,11,6,'#7E6442')+`<path fill="none" stroke="#4A3420" stroke-width=".7" opacity=".7" d="${R(8,r=>R(3,c=>{const y=44+r*7.2,x=96+c*3.4-(r%2)*1.7;return `M${r1(x)} ${r1(y)}l1.7 2.6-1.7 2.6-1.7-2.6z`;}))}"/>`+
`<g transform="translate(100 41) scale(.88) translate(-100 -34)">`+
 `<path fill="none" stroke="#4A3420" stroke-width="6.4" stroke-linecap="round" d="${lbr}"/><path fill="none" stroke="#7E6442" stroke-width="4.4" stroke-linecap="round" d="${lbr}"/>`+
 lcone(64,16,-20,1)+lcone(86,7,5,1)+lcone(114,7,-5,1)+lcone(136,16,20,1)+
 R(8,i=>{const x=[74,92,108,126,70,130,97,103][i],y=[26,22,22,26,30,30,28,28][i];return `<path stroke="#5E9E52" stroke-width="1" fill="none" d="M${x} ${y}l${i%2?3:-3} 6M${x+2} ${y}l0 7"/>`;})+'</g>'+
 `<g transform="translate(34 50)">${T('m',[[0,56,2.2],[0,0,1.8]]).replace('class="m"','fill="#6E9A4A" stroke="#2F6B33"')}<path fill="none" stroke="#3F7A3A" stroke-width="1.2" d="${R(6,i=>`M-7 ${8+i*8}l7-4 7 4`)}"/></g>`+
 `<g transform="translate(160 44)">${T('m',[[0,62,2.4],[0,0,2]]).replace('class="m"','fill="#6E9A4A" stroke="#2F6B33"')}<path fill="none" stroke="#3F7A3A" stroke-width="1.2" d="${R(7,i=>`M-8 ${6+i*8}l8-4 8 4`)}"/></g>`+
 [[20,92],[180,90]].map(([x,y])=>frond(x,y,-60,20,5,'#5E9E52')+frond(x,y,-120,20,5,'#5E9E52')).join('')];

// 舌羊齿
const tongue=(x,y,a,L)=>{const A=a*Math.PI/180,ex=x+Math.cos(A)*L,ey=y+Math.sin(A)*L,px=-Math.sin(A)*L*.2,py=Math.cos(A)*L*.2;return `<path d="M${r1(x)} ${r1(y)}Q${r1((x+ex)/2+px)} ${r1((y+ey)/2+py)} ${r1(ex)} ${r1(ey)}Q${r1((x+ex)/2-px)} ${r1((y+ey)/2-py)} ${r1(x)} ${r1(y)}Z" fill="#6AA85C" stroke="#2F6B33" stroke-width=".7"/><path d="M${r1(x)} ${r1(y)}L${r1(ex)} ${r1(ey)}" stroke="#2F6B33" stroke-width=".5"/>`;};
ART.glossopteris=[null,G+soil()+`<g opacity=".6" transform="translate(0 12) scale(.8)">${trunk(22,118,22,60,5,3)}${leaves(22,50,16,22,3,['#4A7A48','#6A9A5C','#8CB87A','#B4D29A'],9)}</g>`+trunk(60,107,60,44,7,4)+`<path d="M60 70l-12-10M60 62l10-9" stroke="#6E5236" stroke-width="2.4" stroke-linecap="round"/>`+
 leaves(60,40,24,30,7,['#3E7A3A','#5E9E52','#8CC276','#BCDDA2'],13)+
 R(12,i=>{const a=[150,165,180,195,20,35,5,-10,120,60,100,80][i],x=60+Math.cos(a*Math.PI/180)*[22,24,22,18,22,18,24,20,16,16,8,10][i],y=46+Math.sin(a*Math.PI/180)*24+(i>9?20:0);return tongue(x,y,a>90&&a<270?110+(i%3)*12:70-(i%3)*12,13);})+
 `<g transform="translate(150 60) rotate(-12)"><path d="M0 46C-22 30-26-10 0-44 26-10 22 30 0 46z" fill="url(#{U}lf)" stroke="#2F6B33" stroke-width="1.1"/><defs><linearGradient id="{U}lf" x1="0" x2="1"><stop offset="0" stop-color="#8CC276"/><stop offset="1" stop-color="#4E8C44"/></linearGradient></defs><path d="M0 46V-44" stroke="#2F6B33" stroke-width="1.2"/><path fill="none" stroke="#2F6B33" stroke-width=".5" opacity=".7" d="${R(9,i=>{const y=36-i*9;return `M0 ${y}q-8-2-14-8M0 ${y}q8-2 14-8M-5 ${y-2}l-3 4M5 ${y-2}l3 4`;})}"/></g><text class="tx" style="fill:#2F6B33" x="126" y="116">舌状叶片</text>`];

// 裸子植物的时代：苏铁、银杏、针叶树
const cyc=(x,s)=>`<g transform="translate(${x} 107) scale(${s})">${U([[[0,0,7],[0,-14,6.5],[0,-26,6]]],{fill:'#8A6A44'})}<path fill="none" stroke="#4A3420" stroke-width=".6" d="${R(4,r=>`M-6 ${-4-r*6}l3 2.5 3-2.5 3 2.5 3-2.5`)}"/>`+[-160,-140,-120,-100,-80,-60,-40,-20].map((a,i)=>frond(0,-28,a,26+(i%2)*4,8,i%2?'#3F7A3A':'#5E9E52',1)).join('')+`</g>`;
const conif=(x,s,c)=>`<g transform="translate(${x} 107) scale(${s})">${trunk(0,0,0,-86,4,2)}${R(7,i=>{const y=-84+i*11,w=6+i*5;return `<path d="M${-w} ${y+6}Q0 ${y-8} ${w} ${y+6}Q0 ${y+2} ${-w} ${y+6}Z" fill="${c||'#3E6E3E'}" stroke="#244A26" stroke-width=".8"/><path d="M${-w*.8} ${y+4}Q0 ${y-4} ${w*.3} ${y+1}" stroke="#7FAF6A" stroke-width="1" fill="none" opacity=".7"/>`;})}</g>`;
const ginkgoLeaf=(x,y,a,s,c)=>`<g transform="translate(${r1(x)} ${r1(y)}) rotate(${a}) scale(${s})"><path d="M0 0v-5M0-5L-8-13Q-4-16 -.6-14.5L0-11 .6-14.5Q4-16 8-13Z" fill="${c||'#9CCB6A'}" stroke="#4E7A2A" stroke-width=".7"/></g>`;
const ginkgo=(x)=>{const r=K.rnd(21);let lv='';for(let i=0;i<34;i++){const a=r()*Math.PI*2,d=Math.sqrt(r());const lx=x+Math.cos(a)*16*d,ly=58+Math.sin(a)*16*d;lv+=ginkgoLeaf(lx,ly,(r()-.5)*120,.62+r()*.3,['#8CBF5A','#A8D476','#C4E08E','#7AAE4C'][i%4]);}
 return trunk(x,107,x,50,5,2.4)+`<path d="M${x} 80l-12-14M${x} 72l12-12M${x} 64l-8-10M${x-12} 66l-6-2M${x+12} 60l6-4" stroke="#6E5236" stroke-width="1.8" stroke-linecap="round" fill="none"/>`+lv;};
ART.gymno=[null,G+soil()+`<g opacity=".75">${conif(24,.7,'#4A7A48')}</g>`+conif(182,.95)+cyc(92,1.25)+
 ginkgo(142)+
 [[40,100],[58,104]].map(([x,y])=>frond(x,y,-70,16,5,'#5E9E52')+frond(x,y,-110,16,5,'#5E9E52')).join('')];

// 被子植物大辐射：木兰花与蜜蜂
const petal=(a,L,w,fill)=>`<path transform="rotate(${a} 100 70)" d="M100 70C${100-w} ${70-L*.4} ${100-w*.6} ${70-L*.9} 100 ${70-L}C${100+w*.6} ${70-L*.9} ${100+w} ${70-L*.4} 100 70Z" fill="${fill}" stroke="#8A3A5A" stroke-width=".8"/>`;
ART.angio=['#C4568A',G+soil()+`<path d="M100 107V72" stroke="#4E7A2A" stroke-width="3" fill="none"/>`+
 `<path d="M100 96C84 94 74 86 72 78 86 78 96 86 100 96zM100 88c16-2 26-10 28-18-14 0-24 8-28 18z" fill="#5E9E52" stroke="#2F6B33" stroke-width=".8"/><path d="M100 96C90 90 80 84 74 79M100 88c10-6 18-12 26-17" stroke="#2F6B33" stroke-width=".5" fill="none"/>`+
 `<defs><linearGradient id="{U}pt" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F7E6EE"/><stop offset=".6" stop-color="#E7A3C4"/><stop offset="1" stop-color="#C4568A"/></linearGradient><linearGradient id="{U}pt2" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#F3D2E2"/><stop offset="1" stop-color="#A83C70"/></linearGradient></defs>`+
 petal(-62,34,12,'url(#{U}pt2)')+petal(62,34,12,'url(#{U}pt2)')+petal(-34,40,13,'url(#{U}pt)')+petal(34,40,13,'url(#{U}pt)')+petal(-12,44,14,'url(#{U}pt)')+petal(12,44,14,'url(#{U}pt)')+
 `<ellipse cx="100" cy="62" rx="5" ry="9" fill="#C9A43A" stroke="#7A5A12" stroke-width=".7"/>${R(10,i=>`<circle cx="${r1(100+Math.cos(i*.63)*6)}" cy="${r1(68+Math.sin(i*.63)*2)}" r="1.1" fill="#E8C44A"/>`)}`+
 `<g transform="translate(148 22) scale(.9)"><ellipse cx="10" cy="10" rx="9" ry="6" fill="#E9B63C" stroke="#7A5412" stroke-width=".7"/><path d="M6 5v10M11 4v12" stroke="#2A2014" stroke-width="1.6"/><ellipse cx="8" cy="1" rx="7" ry="3.4" fill="#fff" opacity=".75" transform="rotate(-20 8 1)"/><circle cx="19" cy="9" r="3" fill="#3E2E18"/></g><path d="M146 36c-10 6-20 14-32 20" stroke="#8A7A5A" stroke-width=".8" stroke-dasharray="2 3" fill="none"/>`];

// 北极森林与水杉
const meta=(x,s)=>`<g transform="translate(${x} 107) scale(${s})">${trunk(0,0,0,-92,6,2)}${R(8,i=>{const y=-90+i*11,w=5+i*5.4;return `<path d="M${-w} ${y+8}Q${-w*.3} ${y-4} 0 ${y-6}Q${w*.3} ${y-4} ${w} ${y+8}Q0 ${y+3} ${-w} ${y+8}Z" fill="${i%2?'#5E9E52':'#4E8C44'}" stroke="#2F6B33" stroke-width=".7"/><path fill="none" stroke="#9CCB7A" stroke-width=".6" d="${R(5,k=>`M${r1(-w+k*w*.45)} ${r1(y+6-k*.4)}l2 -3`)}"/>`;})}</g>`;
ART.metasequoia=[null,G+soil()+`<g opacity=".7">${meta(44,.72)}</g>`+meta(104,1)+
 `<g transform="translate(168 24)"><path d="M0 44L16 2" stroke="#6E5236" stroke-width="1.2"/>${R(9,i=>`<path d="M${r1(1.6*i+.5)} ${r1(40-i*4.4)}l-7-1.6M${r1(1.6*i+.5)} ${r1(40-i*4.4)}l7 1.6" stroke="#4E8C44" stroke-width="2" stroke-linecap="round"/>`)}</g>`];

// C4 草原扩张：稀树草原与金合欢
const acacia=(x,s,far)=>`<g transform="translate(${x} 107) scale(${s})"${far?' opacity=".55"':''}>${trunk(0,0,-2,-30,5,3)}<path d="M-2-28c-6-8-16-12-28-12M-1-28c4-10 12-14 24-15M-2-30c-2-6-2-10 2-14M-8-35c-2-3-6-4-10-4" stroke="#5E4630" stroke-width="2.2" fill="none" stroke-linecap="round"/>`+
 leaves(-24,-44,20,5,5,['#51703A','#6E8C44','#98B262','#C8D896'],9)+leaves(12,-46,22,5,9,['#51703A','#6E8C44','#98B262','#C8D896'],9)+leaves(-4,-50,18,4.5,13,['#51703A','#6E8C44','#98B262','#C8D896'],8)+`</g>`;
const tallGrass=(x0,x1,n,col,h,seed)=>{const r=K.rnd(seed);let d='';for(let i=0;i<n;i++){const x=x0+(x1-x0)*r(),hh=h*(.6+r()*.5),bend=(r()-.5)*8;d+=`M${r1(x)} 107q${r1(bend*.3)} ${r1(-hh*.5)} ${r1(bend)} ${r1(-hh)}`;}return `<path d="${d}" fill="none" stroke="${col}" stroke-width="1.1" stroke-linecap="round"/>`;};
ART.savanna=[null,`<circle cx="164" cy="26" r="11" fill="#F7D46A"/><circle cx="164" cy="26" r="19" fill="#F7D46A" opacity=".22"/><path d="M6 92c40-6 80-4 120-8s50 4 68 2v21H6z" fill="#E4D29A" opacity=".55"/>`+G+soil('#D2BE7C')+
 acacia(36,.5,1)+acacia(178,.42,1)+acacia(102,1.05)+
 tallGrass(8,194,70,'#C4AA52',14,3)+tallGrass(8,194,40,'#A08A3A',10,7)+tallGrass(8,194,26,'#D8C47A',18,11)];
})();
