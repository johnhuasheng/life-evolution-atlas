// 插图引擎：用“脊柱 + 半径”生成平滑的有机体形，并提供眼睛、牙齿、鳞片、毛发、羽毛、光影等细节工具。
// 所有坐标都在 200×120 的画布内；动物默认面朝右，地面在 y=107。
var ART = window.ART = window.ART || {};
var K=(function(){
const r1=v=>Math.round(v*10)/10;
// Catmull-Rom 插值：pts = [[x,y,r],...]
function cr(pts,seg){
  const out=[],n=pts.length;
  for(let i=0;i<n-1;i++){
    const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(n-1,i+2)];
    for(let s=0;s<seg;s++){
      const t=s/seg,t2=t*t,t3=t2*t;
      const q=k=>0.5*((2*p1[k])+(-p0[k]+p2[k])*t+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*t2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*t3);
      const o=[q(0),q(1)];for(let k=2;k<p1.length;k++) o.push(Math.max(0,q(k)));out.push(o);
    }
  }
  out.push(pts[n-1].slice());
  return out;
}
// 每个采样点的切线与“背侧”法线（脊柱从尾到头朝右时，背侧朝上）
function sample(pts,seg){
  pts=pts.map(p=>p.length>3?p:[p[0],p[1],p[2],p[2]]);
  const P=cr(pts,seg||10);
  return P.map((p,i)=>{
    const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)];
    let tx=b[0]-a[0],ty=b[1]-a[1];const L=Math.hypot(tx,ty)||1;tx/=L;ty/=L;
    return {x:p[0],y:p[1],r:p[2],rb:p[3],tx,ty,ux:ty,uy:-tx};
  });
}
// 平滑折线（经过中点的二次曲线）
function smooth(Q,move){
  if(Q.length<3) return (move?'M':'L')+Q.map(q=>r1(q[0])+' '+r1(q[1])).join('L');
  let d=(move?'M':'L')+r1(Q[0][0])+' '+r1(Q[0][1]);
  for(let i=1;i<Q.length-1;i++){const m=[(Q[i][0]+Q[i+1][0])/2,(Q[i][1]+Q[i+1][1])/2];d+=`Q${r1(Q[i][0])} ${r1(Q[i][1])} ${r1(m[0])} ${r1(m[1])}`;}
  const z=Q[Q.length-1];return d+`L${r1(z[0])} ${r1(z[1])}`;
}
// 管状体形轮廓
function tube(pts,seg){
  const F=sample(pts,seg);
  const L=F.map(p=>[p.x+p.ux*p.r,p.y+p.uy*p.r]),R=F.map(p=>[p.x-p.ux*p.rb,p.y-p.uy*p.rb]);
  const e0=F[F.length-1],s0=F[0],e={r:(e0.r+e0.rb)/2},s={r:(s0.r+s0.rb)/2};
  let d=smooth(L,true);
  const Re=R[R.length-1];
  d+=e.r>0.4?`A${r1(e.r)} ${r1(e.r)} 0 0 1 ${r1(Re[0])} ${r1(Re[1])}`:`L${r1(Re[0])} ${r1(Re[1])}`;
  d+=smooth(R.slice().reverse(),false);
  d+=s.r>0.4?`A${r1(s.r)} ${r1(s.r)} 0 0 1 ${r1(L[0][0])} ${r1(L[0][1])}`:'';
  return d+'Z';
}
const T=(cls,pts,extra,seg)=>`<path class="${cls}" d="${tube(pts,seg)}"${extra?' '+extra:''}/>`;
// 沿体表的点：f=1 背侧轮廓，0 中线，-1 腹侧轮廓
function along(pts,f,step,fn,from,to){
  const F=sample(pts,10);let s='';const a=Math.floor((from||0)*F.length),b=Math.floor((to==null?1:to)*F.length);
  for(let i=a;i<b;i+=step){const p=F[i];if(!p) continue;const rr=f>=0?p.r:p.rb;s+=fn(p.x+p.ux*rr*f,p.y+p.uy*rr*f,p,i);}
  return s;
}
// 鳞片纹：多排小弧
function scales(pts,rows,step,sz,from,to){
  sz=sz||1.6;let d='';
  (rows||[.7,.35,0]).forEach((f,k)=>{d+=along(pts,f,step||3,(x,y,p,i)=>{if(p.r<2.5) return '';const ox=(k%2)*sz;return `M${r1(x-sz+ox*.5)} ${r1(y)}a${sz} ${sz} 0 0 0 ${r1(sz*2)} 0`;},from,to);});
  return `<path class="sc" d="${d}"/>`;
}
// 横向条纹（背部深色斑纹）
function stripes(pts,step,from,to,f0,f1,w){
  let d='';d+=along(pts,f0==null?.98:f0,step||6,(x,y,p)=>{if(p.r<2) return '';const f=f1==null?.25:f1;const x2=p.x+p.ux*p.r*f,y2=p.y+p.uy*p.r*f;return `M${r1(x)} ${r1(y)}L${r1(x2)} ${r1(y2)}`;},from,to);
  return `<path class="str" style="stroke-width:${w||2.2}" d="${d}"/>`;
}
// 毛发 / 羽毛：沿轮廓的短笔触，朝后倾斜
function fur(pts,side,step,len,from,to,cls){
  let d='';const s=side||1,L=len||4;
  d+=along(pts,s*0.96,step||2,(x,y,p)=>{if(p.r<1.5) return '';const ex=x-p.tx*L*.8+p.ux*s*L*.45,ey=y-p.ty*L*.8+p.uy*s*L*.45;return `M${r1(x)} ${r1(y)}Q${r1((x+ex)/2+p.ux*s)} ${r1((y+ey)/2+p.uy*s)} ${r1(ex)} ${r1(ey)}`;},from,to);
  return `<path class="${cls||'fu'}" d="${d}"/>`;
}
// 背部高光
function rim(pts,from,to){const F=sample(pts,10);const a=Math.floor((from||0)*F.length),b=Math.floor((to==null?1:to)*F.length);const Q=F.slice(a,b).filter(p=>p.r>2).map(p=>[p.x+p.ux*p.r*.72,p.y+p.uy*p.r*.72]);return Q.length>2?`<path class="rim" d="${smooth(Q,true)}"/>`:'';}
// 背棘 / 骨板
function spikes(pts,step,h,from,to,cls){
  return along(pts,.9,step||5,(x,y,p)=>{const H=(h||6)*Math.min(1,p.r/8);if(H<1) return '';const bx=p.tx*H*.45,by=p.ty*H*.45;return `<path class="${cls||'l'}" d="M${r1(x-bx)} ${r1(y-by)}L${r1(x+p.ux*H)} ${r1(y+p.uy*H)}L${r1(x+bx)} ${r1(y+by)}Z"/>`;},from,to);
}
// 眼睛
function eye(x,y,r,type){
  type=type||'rep';
  if(type==='rep') return `<circle cx="${x}" cy="${y}" r="${r}" fill="#E4B94E" stroke="#2A1E0E" stroke-width=".8"/><ellipse cx="${x}" cy="${y}" rx="${r1(r*.32)}" ry="${r1(r*.85)}" fill="#141210"/><circle cx="${r1(x-r*.35)}" cy="${r1(y-r*.4)}" r="${r1(r*.28)}" fill="#fff" opacity=".9"/>`;
  if(type==='bird') return `<circle cx="${x}" cy="${y}" r="${r}" fill="#D9892E" stroke="#2A1E0E" stroke-width=".8"/><circle cx="${x}" cy="${y}" r="${r1(r*.55)}" fill="#141210"/><circle cx="${r1(x-r*.3)}" cy="${r1(y-r*.35)}" r="${r1(r*.25)}" fill="#fff"/>`;
  if(type==='fish') return `<circle cx="${x}" cy="${y}" r="${r}" fill="#F3F0E4" stroke="#1d2a33" stroke-width=".8"/><circle cx="${r1(x+r*.12)}" cy="${y}" r="${r1(r*.6)}" fill="#141a1e"/><circle cx="${r1(x-r*.1)}" cy="${r1(y-r*.28)}" r="${r1(r*.22)}" fill="#fff"/>`;
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#17120E"/><circle cx="${r1(x-r*.3)}" cy="${r1(y-r*.35)}" r="${r1(r*.33)}" fill="#fff" opacity=".85"/>`;
}
// 牙齿：沿 (x1,y1)→(x2,y2) 排列，dir=1 朝下
function teeth(x1,y1,x2,y2,n,h,dir){
  let d='';dir=dir||1;
  for(let i=0;i<n;i++){const t=(i+.5)/n,x=x1+(x2-x1)*t,y=y1+(y2-y1)*t,w=Math.abs(x2-x1)/n*.42,hh=h*(0.7+0.3*Math.sin(t*3.1));d+=`M${r1(x-w)} ${r1(y)}L${r1(x)} ${r1(y+hh*dir)}L${r1(x+w)} ${r1(y)}Z`;}
  return `<path class="tooth" d="${d}"/>`;
}
// 爪子：在 (x,y) 处向 dir 方向的弯钩
function claws(x,y,n,len,dir){let d='';dir=dir||1;for(let i=0;i<n;i++){const ox=x+i*len*.9*dir;d+=`M${r1(ox)} ${r1(y)}q${r1(len*.6*dir)} 0 ${r1(len*dir)} ${r1(len*.5)}`;}return `<path class="claw" d="${d}"/>`;}
// 柱状腿（蜥脚类、象等）：从 y0 到地面，脚掌平底带趾甲
function pillar(x,y0,r,cls,lean,nails){
  lean=lean||0;cls=cls||'lg';
  const pts=[[x,y0,r*1.22],[x+lean*.5,y0+(100-y0)*.55,r*.98],[x+lean,100,r*.92]];
  const fx=x+lean;let n='';
  if(nails!==0){const k=nails||3;for(let i=0;i<k;i++){const nx=fx-r*.7+i*(r*1.4/(k-1||1));n+=`<path class="nail" d="M${r1(nx-1.6)} 107l.4-2.6h2.4l.4 2.6z"/>`;}}
  return T(cls,pts)+`<path class="${cls}" d="M${r1(fx-r*1.02)} 99.5h${r1(r*2.04)}l1.6 7.3h-${r1(r*2.04+3.2)}z"/>`+n;
}
// 两足动物后腿：髋部 (x,y)，自动落地；s 缩放
function hleg(x,y,s,cls,toes){
  cls=cls||'lg';const H=104-y;
  const kx=x+6*s,ky=y+H*.36,ax=x+1*s,ay=y+H*.68,fx=x+5*s;
  const up=T(cls,[[x,y,11*s],[x+3*s,y+H*.2,9*s],[kx,ky,6.2*s]],'style="stroke:none"');
  const low=T(cls,[[kx,ky,5.6*s],[ax,ay,3.3*s],[fx,103,2.4*s]]);
  const crease=cls==='f'?'':`<path class="kt" style="opacity:.55" d="M${r1(x+8*s)} ${r1(y-2*s)}q${r1(4*s)} ${r1(10*s)} ${r1(-1*s)} ${r1(H*.34)}"/>`;
  const t=toes===0?'':claws(fx+9*s,105.5,1,2.4*s,1);
  return up+low+crease+`<path class="${cls}" d="M${r1(fx-3*s)} ${r1(101.5)}q${r1(7*s)}-2.4 ${r1(14*s)} .6l.8 3.4h-${r1(15*s)}z"/>`+t;
}
// 合并体形：多个部件合成一个剪影，只保留外轮廓；按绝对高度做背深腹浅的渐变
let uc=0;
function U(items,o){
  o=o||{};const c=++uc;let y0=1e9,y1=-1e9;
  const ds=items.filter(Boolean).map(it=>{if(typeof it==='string') return it;it.forEach(p=>{y0=Math.min(y0,p[1]-p[2]);y1=Math.max(y1,p[1]+(p[3]==null?p[2]:p[3]));});return tube(it);});
  if(y0>y1){y0=20;y1=107;}
  const ps=ds.map(d=>`<path d="${d}"/>`).join('');
  const fill=o.far?'var(--ab)':(o.fill||`url(#{U}g${c})`);
  const g=o.far||o.fill?'':`<defs><linearGradient id="{U}g${c}" gradientUnits="userSpaceOnUse" x1="0" y1="${r1(y0)}" x2="0" y2="${r1(y1)}"><stop offset="0" style="stop-color:var(--ab)"/><stop offset="${o.st||.42}" style="stop-color:var(--am)"/><stop offset="${o.sv||.7}" style="stop-color:var(--av)"/><stop offset="1" style="stop-color:var(--am)"/></linearGradient></defs>`;
  return g+`<g class="uo${o.far?' far':''}${o.cls?' '+o.cls:''}">${ps}</g><g class="uf${o.cls?' '+o.cls:''}" style="fill:${fill}">${ps}</g>`;
}
// 腿部零件：返回 {t:[体形部件], x:细节}
function LH(x,y,s){const H=104-y,fx=x+5*s;
  return {t:[[[x,y,11*s],[x+3*s,y+H*.2,9*s],[x+6*s,y+H*.36,6*s],[x+1*s,y+H*.68,3.3*s],[fx,103,2.4*s]],`M${r1(fx-3*s)} 101.5q${r1(7*s)}-2.4 ${r1(14*s)} .6l.8 3.4h-${r1(15*s)}z`],
   x:claws(fx+9*s,105.5,1,2.4*s,1)+`<path class="kt" style="opacity:.5" d="M${r1(x+9*s)} ${r1(y-1*s)}q${r1(4*s)} ${r1(10*s)} ${r1(-2*s)} ${r1(H*.34)}"/>`};}
function LQ(x,y,s,kind,foot){const H=104-y;let pts;
  if(kind==='b') pts=[[x,y,9.5*s],[x+4*s,y+H*.36,5.8*s],[x-2*s,y+H*.72,3.2*s],[x,102.5,2.7*s]];
  else pts=[[x,y,7.5*s],[x+1*s,y+H*.45,4.8*s],[x,y+H*.78,3.2*s],[x+1*s,102.5,2.8*s]];
  const fx=pts[3][0];let t=[pts],xx='';
  if(foot==='hoof') xx=`<path class="hoof" d="M${r1(fx-2.8*s)} 101.5h${r1(5.6*s)}l${r1(1.2*s)} 5.5h-${r1(8*s)}z"/>`;
  else {t.push(`M${r1(fx-2.6*s)} 106.8a${r1(4.4*s)} ${r1(2.6*s)} 0 0 1 ${r1(8.8*s)} 0z`);xx=foot==='claw'?claws(fx+4.5*s,106,2,1.8*s,1):`<path class="kt" d="M${r1(fx+1.6*s)} 104.8v2M${r1(fx+3.6*s)} 104.8v2"/>`;}
  return {t,x:xx};}
function LP(x,y0,r,lean,nails){lean=lean||0;const fx=x+lean;let n='';const k=nails==null?3:nails;
  for(let i=0;i<k;i++){const nx=fx-r*.7+i*(r*1.4/(k-1||1));n+=`<path class="nail" d="M${r1(nx-1.6)} 107l.4-2.6h2.4l.4 2.6z"/>`;}
  return {t:[[[x,y0,r*1.2],[x+lean*.5,y0+(100-y0)*.55,r*.98],[fx,100,r*.95]],`M${r1(fx-r*1.05)} 99h${r1(r*2.1)}l1.6 7.8h-${r1(r*2.1+3.2)}z`],x:n};}
function LS(x,y,s,dir){return {t:[[[x,y,3.8*s],[x+dir*6*s,y+4*s,2.9*s],[x+dir*8*s,103,2.1*s]]],x:claws(x+dir*8*s,105.5,3,2.2*s,dir)};}
// 把多条腿的零件合并
function legs(){const a=[...arguments];return {t:a.flatMap(l=>l.t),x:a.map(l=>l.x).join('')};}
// ---------- 植物工具 ----------
function rnd(seed){let x=Math.sin(seed*999.13)*10000;return ()=>{x=Math.sin(x)*10000;return x-Math.floor(x);};}
const circ=(x,y,r)=>`M${r1(x-r)} ${r1(y)}a${r1(r)} ${r1(r)} 0 1 0 ${r1(2*r)} 0a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2*r)} 0z`;
// 树冠：多层叶团（深→中→浅），pal=[深,中,浅,高光]
function leaves(cx,cy,rx,ry,seed,pal,n){
  pal=pal||['#3E7A3A','#5E9E52','#8CC276','#BCDDA2'];const r=rnd(seed||1);n=n||11;
  const base=[],mid=[],lt=[];
  for(let i=0;i<n;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*.72;base.push(circ(cx+Math.cos(a)*rx*d,cy+Math.sin(a)*ry*d,Math.min(rx,ry)*(.34+r()*.2)));}
  for(let i=0;i<n;i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*.6;mid.push(`<circle cx="${r1(cx+Math.cos(a)*rx*d-rx*.1)}" cy="${r1(cy+Math.sin(a)*ry*d-ry*.14)}" r="${r1(Math.min(rx,ry)*(.26+r()*.14))}"/>`);}
  for(let i=0;i<Math.ceil(n*.6);i++){const a=r()*Math.PI*2,d=Math.sqrt(r())*.5;lt.push(`<circle cx="${r1(cx+Math.cos(a)*rx*d-rx*.22)}" cy="${r1(cy+Math.sin(a)*ry*d-ry*.3)}" r="${r1(Math.min(rx,ry)*(.14+r()*.1))}"/>`);}
  return `<g class="uo" style="--ad:#2A5A2C">${base.map(d=>`<path d="${d}"/>`).join('')}</g><g class="uf" style="fill:${pal[0]}">${base.map(d=>`<path d="${d}"/>`).join('')}</g><g fill="${pal[1]}">${mid.join('')}</g><g fill="${pal[2]}">${lt.join('')}</g><g fill="${pal[3]}" opacity=".7">${lt.slice(0,3).map(c=>c.replace(/r="([\d.]+)"/,(m,v)=>`r="${r1(v*.45)}"`)).join('')}</g>`;
}
// 蕨叶 / 羽状叶：从 (x,y) 以角度 a（度）伸出长度 L，n 对小叶
function frond(x,y,a,L,n,col,w){
  col=col||'#4E8C44';w=w||1;const A=a*Math.PI/180,ux=Math.cos(A),uy=Math.sin(A),px=-uy,py=ux;
  const ex=x+ux*L,ey=y+uy*L+L*.12;let d='';
  for(let i=1;i<=n;i++){const t=i/(n+1),bx=x+ux*L*t,by=y+uy*L*t+L*.12*t*t,ll=L*.28*(1-t*.75)*w;
    for(const sgn of [1,-1]){const tx=bx+px*ll*sgn+ux*ll*.35,ty=by+py*ll*sgn+uy*ll*.35+ll*.2;d+=`M${r1(bx)} ${r1(by)}Q${r1((bx+tx)/2+ux*1.5)} ${r1((by+ty)/2-1)} ${r1(tx)} ${r1(ty)}`;}}
  return `<path d="M${r1(x)} ${r1(y)}Q${r1(x+ux*L*.5)} ${r1(y+uy*L*.5)} ${r1(ex)} ${r1(ey)}" fill="none" stroke="${col}" stroke-width="1.4" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${r1(2.2*w)}" stroke-linecap="round"/>`;
}
// 树干
function trunk(x0,y0,x1,y1,w0,w1,col){col=col||'#8A6440';const d=tube([[x0,y0,w0/2],[(x0+x1)/2,(y0+y1)/2,(w0+w1)/4],[x1,y1,w1/2]]);
  return `<path d="${d}" fill="${col}" stroke="#4A3420" stroke-width="1"/><path d="M${r1(x0-w0*.15)} ${r1(y0)}L${r1(x1-w1*.15)} ${r1(y1)}" stroke="#fff" stroke-opacity=".18" stroke-width="${r1(w1*.3)}" stroke-linecap="round"/>`;}
// 四足动物的腿：kind='f' 前腿、'b' 后腿；foot='paw'|'hoof'|'claw'
function qleg(x,y,s,cls,kind,foot){
  cls=cls||'lg';const H=104-y;let pts;
  if(kind==='b') pts=[[x,y,9.5*s],[x+4*s,y+H*.36,5.8*s],[x-2*s,y+H*.72,3.2*s],[x,102.5,2.7*s]];
  else pts=[[x,y,7.5*s],[x+1*s,y+H*.45,4.8*s],[x,y+H*.78,3.2*s],[x+1*s,102.5,2.8*s]];
  const fx=pts[3][0];let f='';
  if(foot==='hoof') f=`<path class="hoof" d="M${r1(fx-2.8*s)} 101.5h${r1(5.6*s)}l${r1(1.2*s)} 5.5h-${r1(8*s)}z"/>`;
  else f=`<ellipse class="${cls}" cx="${r1(fx+1.8*s)}" cy="${r1(104.6)}" rx="${r1(4.2*s)}" ry="${r1(2.3*s)}"/>`+(foot==='claw'?claws(fx+4.5*s,105.8,2,1.8*s,1):`<path class="kt" d="M${r1(fx+1*s)} 104v2.4M${r1(fx+3*s)} 104v2.4"/>`);
  return T(cls,pts)+f;
}
// 爬行类的外撇腿
function sleg(x,y,s,dir,cls){
  cls=cls||'lg';
  return T(cls,[[x,y,3.8*s],[x+dir*6*s,y+4*s,2.9*s],[x+dir*8*s,103,2.1*s]])+claws(x+dir*8*s,105.5,3,2.2*s,dir);
}
// 人形（x 为脚底中心，s=1 约 1.7 米）；o: stoop 前倾, bulk 体宽, arm 手臂长, brow 眉嵴, hair 头发, tool 工具, jaw 突颌, fur 体毛, ghost 虚线参照, wrap 兽皮
function fig(x,s,o){
  o=o||{};const st=o.stoop||0,b=o.bulk||1,al=o.arm||0,j=o.jaw||0;
  const hx=st+2,hy=-76+Math.abs(st)*.25;
  const farLeg=[[-1,-42,5*b],[-6,-21,3.8],[-10,-3,2.8]],farFoot='M-14 -3.5h8q3 0 3 3.5h-12z';
  const farArm=[[st,-64,2.8*b],[st-4,-52,2.2],[st-4.5+al*.2,-42+al,1.8]];
  const torso=[[0,-40,6*b,6.5*b],[st*.5+1,-55,7.2*b,7*b],[st+1,-66,6.2*b,5.6*b]];
  const nearLeg=[[1,-42,5.5*b],[5,-21,4],[7,-3,3]],nearFoot='M4 -3.5h9q3 0 3 3.5h-13z';
  const neck=[[st+1,-67,3],[st+2.5,-71,2.8]],head=[[hx-1,hy,6.6],[hx+3,hy-.5,6.4],[hx+7+j,hy+3,3.4]];
  const nearArm=[[st+2,-64,3*b],[st+6,-52,2.4],[st+9+al*.3,-42+al,2]];
  let g=`<g transform="translate(${x} 106.5) scale(${s})">`;
  if(o.ghost){
    g+=U([farLeg,farFoot,torso,nearLeg,nearFoot,neck,head,nearArm,farArm],{fill:'#E2E6DE',cls:'gh'});
    return g+'</g>';
  }
  g+=U([farLeg,farFoot,farArm],{far:1});
  if(o.tool==='spear') g+=`<path class="wd" style="fill:none;stroke-width:1.8;stroke:#6E5236" d="M${st+18} ${-100}L${st+2} ${-4}"/><path class="s" d="M${st+18} ${-100}l-1.4 6 3 .6z"/>`;
  g+=U([torso,nearLeg,nearFoot,neck,head]);
  if(o.fur) g+=fur(torso,1,2,2.4,0,1)+fur(head,1,2,1.8,0,.6);
  if(o.wrap) g+=`<path class="hide" d="M${-7*b} -48q8 -3 ${14*b+st*.5} -1l1 10q-8 3 -${16*b} 0z"/><path class="kt" style="stroke:#4a3420" d="M${-4*b} -40l1-6M${2} -40l0-7M${6*b} -40l-1-7"/>`;
  if(o.hair) g+=`<path class="d" d="M${hx-7} ${hy+1}c-1-7 4-11 10-10 4 1 6 3 6 6-5-2-10-1-12 4z"/>`;
  if(o.brow) g+=`<path class="d" d="M${hx+2} ${hy-4.5}q4-1.5 7 1l-.5 1.6q-3-1.5-6.5-.8z"/>`;
  g+=eye(hx+5,hy-1.5,1.1,'mam')+`<path class="kt" d="M${hx+6+j} ${hy+4}h2.5"/><path class="kt" style="opacity:.5" d="M${hx-3} ${hy-1}q2 3 0 5M-1 -30q3 8 2 16"/>`;
  g+=U([nearArm]);
  if(o.tool==='axe') g+=`<path class="s" d="M${st+8+al*.3} ${-43+al}l4-5 4 6-5 4z"/>`;
  return g+'</g>';
}
const shadow=(cx,rx)=>`<ellipse class="shd" cx="${cx}" cy="107.5" rx="${rx}" ry="${r1(Math.max(2.2,rx*.07))}"/>`;
const ground='<path class="g" d="M6 107H194"/>';

// ---------- 渲染 ----------
let uid=0,hueOf=null;
function hue(key){
  if(!hueOf){hueOf={};const L={};(window.LANES||[]).forEach(l=>L[l.id]=l.ah);(window.EVENTS||[]).forEach(e=>{hueOf[e.a]=L[e.l];});}
  return hueOf[key]||'#6A7A70';
}
const TOK={'~G':ground,'~S':'<path class="g" d="M6 110c28-4 58 3 92 0s66-3 96 0"/>'};
function defs(i,tex){
  return `<defs><linearGradient id="km${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--ab)"/><stop offset=".48" style="stop-color:var(--am)"/><stop offset="1" style="stop-color:var(--av)"/></linearGradient>`+
  `<linearGradient id="kg${i}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" style="stop-color:var(--am)"/><stop offset=".5" style="stop-color:var(--am)"/><stop offset="1" style="stop-color:var(--ab)"/></linearGradient><linearGradient id="kl${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--al)"/><stop offset="1" style="stop-color:var(--alv)"/></linearGradient>`+
  (tex?`<filter id="kt${i}" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  .45 .45 .45 0 -.55" result="a"/><feComposite in="a" in2="SourceGraphic" operator="in" result="s"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s"/></feMerge></filter>`:'')+`</defs>`;
}
function body(key,i){const a=ART[key];return a?a[1].replace(/~[GS]/g,m=>TOK[m]).replace(/\{U\}/g,'k'+i+'-'):'';}
function vars(key,i,tex){const a=ART[key];return `--h:${(a&&a[0])||hue(key)};--fm:url(#km${i});--fl:url(#kl${i});--fg:url(#kg${i})`+(tex?`;--tx:url(#kt${i})`:'');}
function render(key,o){
  o=o||{};if(!ART[key]) return '';const i=++uid;
  return `<svg class="art${o.cls?' '+o.cls:''}${o.tex?' tex':''}" viewBox="0 0 200 120" style="${vars(key,i,o.tex)}" aria-hidden="true">${defs(i,o.tex)}${body(key,i)}</svg>`;
}
function group(key,transform,o){
  o=o||{};if(!ART[key]) return '';const i=++uid;
  let b=body(key,i);if(o.strip) b=b.replace(/<path class="g"[^>]*\/>/g,'');
  return `<g class="hue${o.tex?' tex':''}" style="${vars(key,i,o.tex)}" transform="${transform}">${defs(i,o.tex)}${b}</g>`;
}
return {leaves,frond,trunk,circ,rnd,U,LH,LQ,LP,LS,legs,qleg,sleg,fig,pillar,hleg,cr,sample,tube,T,along,scales,stripes,fur,rim,spikes,eye,teeth,claws,shadow,ground,render,group,smooth,r1};
})();
