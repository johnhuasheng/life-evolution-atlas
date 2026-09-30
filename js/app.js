// 生命演化长卷 · 交互逻辑
(function(){
const $=id=>document.getElementById(id);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const laneBy=Object.fromEntries(LANES.map(l=>[l.id,l]));
const byPer=Object.fromEntries(PERIODS.map(p=>[p.id,p]));

// 类群配色注入（浅色 / 深色）
(function(){
  const lt=LANES.map(l=>`--c-${l.id}:${l.c}`).join(';'),dk=LANES.map(l=>`--c-${l.id}:${l.dc}`).join(';');
  const st=document.createElement('style');
  st.textContent=`:root{${lt}}@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${dk}}}:root[data-theme="dark"]{${dk}}`;
  document.head.append(st);
})();

// ---------- 数据预处理 ----------
function periodOf(e){ if(e.p) return byPer[e.p]; return PERIODS.find(p=>p.s>e.t&&e.t>=p.e)||PERIODS[0]; }
EVENTS.sort((a,b)=>b.t-a.t);
EVENTS.forEach((e,i)=>{e.id='e'+i;e.per=periodOf(e);});
const byId=Object.fromEntries(EVENTS.map(e=>[e.id,e]));
const byArt=Object.fromEntries(EVENTS.map(e=>[e.a,e]));

// ---------- 插图 ----------
function art(key,cls,tex){return K.render(key,{cls:cls||'',tex:!!tex});}

// ---------- 格式 ----------
const num=(v,d)=>String(+v.toFixed(d));
function fmtAbs(t){
  if(t<=0) return '今天';
  if(t>=100){const y=t/100;return num(y,y>=10?1:2)+' 亿';}
  const w=t*100;
  if(w<1) return num(w*10000,0)+' ';
  return num(w,w>=10?0:2)+' 万';
}
const fmtAgo=t=>t*1e6<10000?'约 '+Math.round(t*1e6)+' 年前':'约 '+fmtAbs(t)+'年前';
const fmtMa=t=>t>=1?num(t,2)+' Ma':(t>=0.001?num(t*1000,1)+' ka':Math.round(t*1e6)+' 年前');
const fmtRange=(s,e)=>fmtAbs(s)+'年前 — '+(e<=0?'今天':fmtAbs(e)+'年前');
function fmtLen(m){ if(m>=1) return num(m,1)+' 米'; if(m>=0.01) return num(m*100,m>=0.1?0:1)+' 厘米'; if(m>=0.001) return num(m*1000,1)+' 毫米'; return num(m*1e6,0)+' 微米'; }
function textOn(hex){
  const n=parseInt(hex.slice(1),16),r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255;
  const f=c=>c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4);
  return (0.2126*f(r)+0.7152*f(g)+0.0722*f(b))>0.3?'#1A1D1B':'#FFFFFF';
}
const cvs=document.createElement('canvas').getContext('2d');
function tw(text,px,wt){cvs.font=(wt||400)+' '+px+'px "Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif';return cvs.measureText(text).width;}

// ---------- 比例尺 ----------
const ALL=[{a:4567,b:538.8,x0:0,x1:.12},{a:538.8,b:66,x0:.12,x1:.72},{a:66,b:0,x0:.72,x1:1}];
const rangeOf=z=>ERAS.find(e=>e.id===z)||byPer[z];
const isPeriod=z=>!!byPer[z];
function segsFor(z){ if(z==='all') return ALL; const r=rangeOf(z),pad=(r.s-r.e)*.04; return [{a:r.s+pad,b:r.e-pad,x0:0,x1:1}]; }
function X(t,S){
  for(const g of S) if(t<=g.a&&t>=g.b) return g.x0+(g.a-t)/(g.a-g.b)*(g.x1-g.x0);
  const g=t>S[0].a?S[0]:S[S.length-1];
  return g.x0+(g.a-t)/(g.a-g.b)*(g.x1-g.x0);
}
const inView=f=>f>=-0.001&&f<=1.001;
const NICE=[0.001,0.002,0.005,0.01,0.02,0.05,0.1,0.2,0.5,1,2,5,10,20,50,100,200,500,1000,2000];
function niceStep(raw){let b=NICE[0];for(const n of NICE) if(Math.abs(Math.log(n/raw))<Math.abs(Math.log(b/raw))) b=n;return b;}
function ticks(S,W){
  const out=[];
  for(const g of S){
    const px=(g.x1-g.x0)*W,n=Math.max(2,Math.round(px/85)),step=niceStep((g.a-g.b)/n);
    for(let k=Math.floor(g.a/step+1e-9);k*step>=g.b-1e-9;k--){
      const v=+(k*step).toFixed(6); if(v<0) break;
      const f=X(v,S); if(!inView(f)) continue;
      const x=f*W; if(out.some(o=>Math.abs(o.x-x)<48)) continue;
      out.push({v,f,x});
    }
  }
  return out;
}

// ---------- 状态 ----------
const hashE=byArt[decodeURIComponent(location.hash.slice(1))];
const state={zoom:'all',lanes:new Set(LANES.map(l=>l.id)),sel:(hashE||byArt.archaefructus).id,per:(hashE?hashE.per.id:'kr')};
const ordered=()=>EVENTS.filter(e=>state.lanes.has(e.l));

// ---------- 构建 ----------
function build(){
  $('stats').innerHTML='<li><b>45.4 亿</b>年地球史</li><li><b>'+LANES.length+'</b>条类群线</li><li><b>'+EVENTS.length+'</b>个演化节点</li><li><b>'+EVENTS.length+'</b>幅复原插图</li><li><b>'+EVENTS.filter(e=>e.x).length+'</b>次大灭绝</li><li><b>'+Object.values(window.MEDIA||{}).reduce((n,m)=>n+(m.v||[]).length,0)+'</b>个科普视频</li>';

  const MARCH=['stromatolite','trilobite','cooksonia','tiktaalik','meganeura','dimetrodon','mamenchisaurus','archaeopteryx','trex','mammoth','sapiens'];
  $('march').innerHTML=MARCH.map(k=>{const e=byArt[k];return `<button type="button" class="mitem" data-id="${e.id}">${art(k)}<b>${e.n.split('：')[0]}</b><span>${fmtAbs(e.t)}年前</span></button>`;}).join('');
  $('march').onclick=ev=>{const b=ev.target.closest('button');if(b){select(b.dataset.id,{reveal:true});$('detail').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});}};

  [['all','全部'],['pre','前寒武纪'],['pz','古生代'],['mz','中生代'],['cz','新生代']].forEach(([z,n])=>{
    const b=document.createElement('button');b.type='button';b.textContent=n;b.dataset.z=z;b.onclick=()=>zoomTo(z);$('seg').append(b);
  });
  const all=document.createElement('button');all.type='button';all.className='chip all';all.textContent='全部类群';
  all.onclick=()=>{state.lanes=new Set(LANES.map(l=>l.id));update();};$('chips').append(all);
  LANES.forEach(l=>{
    const b=document.createElement('button');b.type='button';b.className='chip';b.dataset.l=l.id;
    b.style.setProperty('--lc','var(--c-'+l.id+')');b.innerHTML='<i></i>'+l.n;b.title='单击切换显示；双击只看这一类';
    b.onclick=()=>toggleLane(l.id);b.ondblclick=()=>{state.lanes=new Set([l.id]);fixSel();update();};$('chips').append(b);
  });

  ERAS.forEach(e=>{
    const b=document.createElement('button');b.type='button';b.className='band';
    b.style.background=e.c;b.style.color=textOn(e.c);b.title=e.n+'：'+fmtRange(e.s,e.e);
    b.innerHTML='<span></span>';b.onclick=()=>zoomTo(e.id);$('eraTrack').append(b);e.el=b;
  });
  PERIODS.forEach(p=>{
    const b=document.createElement('button');b.type='button';b.className='band';
    b.style.background=p.c;b.style.color=textOn(p.c);b.title=p.n+'：'+fmtRange(p.s,p.e);
    b.setAttribute('aria-label',p.n+'，放大到该时期');
    b.innerHTML='<span></span>';b.onclick=()=>pickPeriod(p.id);$('perTrack').append(b);p.el=b;
  });
  VEG.forEach(v=>{
    const d=document.createElement('div');d.className='veg';d.style.background='var(--veg'+v.v+')';
    d.title=v.n+'：'+fmtRange(v.s,v.e);d.innerHTML='<span></span>';$('vegTrack').append(d);v.el=d;
  });

  const peek=$('peek');
  LANES.forEach(l=>{
    const row=document.createElement('div');row.className='lane';row.style.setProperty('--lc','var(--c-'+l.id+')');
    row.innerHTML='<div class="rl"><i></i>'+l.n+'</div><div class="track"></div>';
    const track=row.lastChild;
    EVENTS.filter(e=>e.l===l.id).forEach(e=>{
      const b=document.createElement('button');b.type='button';b.className='ev'+(e.x?' x':'');
      b.setAttribute('aria-label',e.n+'，'+fmtAgo(e.t));
      b.innerHTML='<span class="dot"></span><span class="lbl">'+e.n+'</span>';
      b.onclick=()=>{select(e.id);showDetail();};
      b.onmouseenter=()=>{peek.innerHTML='<div class="pl">'+art(e.a)+'</div><b>'+e.n+'</b><span>'+fmtAgo(e.t)+'</span>';
        const r=b.getBoundingClientRect();let x=r.left+12,y=r.top-8-190;
        if(x+230>innerWidth) x=r.left-232; if(y<8) y=r.top+20; peek.style.left=x+'px';peek.style.top=y+'px';peek.classList.add('show');};
      b.onmouseleave=()=>peek.classList.remove('show');
      track.append(b);e.el=b;e.lw=tw(e.n,12)+12;
    });
    $('lanes').append(row);l.row=row;l.track=track;
  });
  EVENTS.filter(e=>e.x).forEach(e=>{const d=document.createElement('div');d.className='xl';$('xlines').append(d);e.xl=d;});

  $('prev').onclick=()=>step(-1);$('next').onclick=()=>step(1);
  $('dPer').onclick=()=>pickPeriod(byId[state.sel].per.id);
  $('pChips').onclick=ev=>{const b=ev.target.closest('button');if(b) select(b.dataset.id,{reveal:true});};
  $('groups').onclick=ev=>{const b=ev.target.closest('button');if(b){select(b.dataset.id,{reveal:true});$('detail').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});}};
  document.addEventListener('keydown',ev=>{
    if(ev.altKey||ev.ctrlKey||ev.metaKey) return;
    const tag=(ev.target.tagName||'').toLowerCase(); if(tag==='input'||tag==='textarea') return;
    if(ev.key==='ArrowLeft'){ev.preventDefault();step(-1,true);} else if(ev.key==='ArrowRight'){ev.preventDefault();step(1,true);}
  });
  buildSearch();buildTop();
  $('jump').onclick=()=>$('media').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
  buildTree();
}

// ---------- 搜索 ----------
function buildSearch(){
  const q=$('q'),box=$('qres');let hits=[],cur=0;
  const norm=t=>String(t||'').toLowerCase();
  const hl=(t,k)=>{const i=norm(t).indexOf(k);return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+k.length))+'</mark>'+esc(t.slice(i+k.length));};
  const close=()=>{box.hidden=true;q.setAttribute('aria-expanded','false');};
  const paint=k=>{
    box.innerHTML=hits.length?hits.map((e,i)=>`<li role="option" id="qo${i}" data-id="${e.id}" aria-selected="${i===cur}"><span class="pl">${art(e.a)}</span><span><b>${hl(e.n,k)}</b><small>${hl(e.s||'',k)} · ${fmtAbs(e.t)}年前 · ${laneBy[e.l].n}</small></span></li>`).join(''):'<li class="none">没有找到相关节点，换个关键词试试</li>';
    box.hidden=false;q.setAttribute('aria-expanded','true');if(hits.length) q.setAttribute('aria-activedescendant','qo'+cur);
  };
  const run=()=>{const k=norm(q.value.trim());if(!k){close();return;}
    const sc=e=>{const n=norm(e.n),s=norm(e.s),l=norm(laneBy[e.l].n),m=(window.MEDIA||{})[e.a]||{};
      if(n.startsWith(k)) return 0; if(n.includes(k)) return 1; if(s.includes(k)) return 2; if(norm(m.zh).includes(k)||norm(m.en).includes(k)) return 3; if(l.includes(k)) return 4; if(norm(e.d).includes(k)) return 5; return 9;};
    hits=EVENTS.map(e=>[sc(e),e]).filter(x=>x[0]<9).sort((a,b)=>a[0]-b[0]||b[1].t-a[1].t).slice(0,10).map(x=>x[1]);cur=0;paint(k);};
  const go=e=>{if(!e) return;q.value='';close();q.blur();
    if(!state.lanes.has(e.l)) state.lanes.add(e.l);
    select(e.id,{reveal:true});showDetail();};
  q.addEventListener('input',run);q.addEventListener('focus',()=>{if(q.value.trim()) run();});
  q.addEventListener('keydown',ev=>{
    if(ev.key==='ArrowDown'||ev.key==='ArrowUp'){if(!hits.length) return;ev.preventDefault();cur=(cur+(ev.key==='ArrowDown'?1:-1)+hits.length)%hits.length;paint(norm(q.value.trim()));const li=$('qo'+cur);if(li) li.scrollIntoView({block:'nearest'});}
    else if(ev.key==='Enter'){ev.preventDefault();go(hits[cur]);}
    else if(ev.key==='Escape'){close();q.blur();}
  });
  box.addEventListener('mousedown',ev=>{const li=ev.target.closest('li[data-id]');if(li){ev.preventDefault();go(byId[li.dataset.id]);}});
  q.addEventListener('blur',()=>setTimeout(close,120));
  document.addEventListener('keydown',ev=>{if(ev.key==='/'&&!/input|textarea/i.test(ev.target.tagName||'')){ev.preventDefault();q.focus();}});
}
function buildTop(){
  const b=$('totop');let tick=0;
  addEventListener('scroll',()=>{if(tick) return;tick=requestAnimationFrame(()=>{tick=0;b.hidden=scrollY<900;});},{passive:true});
  b.onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'});
}
addEventListener('hashchange',()=>{const e=byArt[decodeURIComponent(location.hash.slice(1))];if(e&&e.id!==state.sel){select(e.id,{reveal:true});showDetail();}});

// ---------- 时间轴布局 ----------
function placeBand(o,S,W,full,short){
  const cl=v=>Math.max(-0.5,Math.min(1.5,v));
  const x0=cl(X(o.s,S)),x1=cl(X(o.e,S));
  o.el.style.left=(x0*100)+'%';o.el.style.width=((x1-x0)*100)+'%';
  const px=Math.max(0,Math.min(x1,1)-Math.max(x0,0))*W;
  o.el.firstChild.textContent=px>tw(full,12)+14?full:(px>tw(short,12)+8?short:'');
}
function layout(){
  const S=segsFor(state.zoom),W=$('axis').clientWidth;
  if(!W) return;
  ERAS.forEach(e=>{placeBand(e,S,W,e.n,e.n.slice(0,1));e.el.classList.toggle('on',state.zoom===e.id);});
  PERIODS.forEach(p=>{placeBand(p,S,W,p.n,p.sh);p.el.classList.toggle('on',state.per===p.id);});
  VEG.forEach(v=>placeBand(v,S,W,v.n,v.sh));
  const a=ALL;
  $('zones').innerHTML=state.zoom==='all'?`<div class="zone pre" style="left:0;width:${a[0].x1*100}%"></div><div class="zone" style="left:${a[2].x0*100}%;width:${(1-a[2].x0)*100}%"></div>`:'';
  const tk=ticks(S,W);
  $('grid').innerHTML=tk.map(t=>'<div class="gl" style="left:'+(t.f*100)+'%"></div>').join('');
  $('axis').innerHTML=tk.map(t=>{const c=t.x<24?' l':(t.x>W-24?' r':'');return '<span class="tick'+c+'" style="left:'+(t.f*100)+'%">'+num(t.v,4)+'</span>';}).join('');
  EVENTS.forEach(e=>{if(e.xl){const f=X(e.t,S);e.xl.style.left=(f*100)+'%';e.xl.style.opacity=inView(f)?'':'0';}});
  const sf=X(byId[state.sel].t,S);$('selLine').style.left=(sf*100)+'%';$('selLine').style.opacity=inView(sf)?'':'0';

  LANES.forEach(l=>{
    const on=state.lanes.has(l.id);l.row.hidden=!on;if(!on) return;
    const items=EVENTS.filter(e=>e.l===l.id).map(e=>({e,f:X(e.t,S)}));
    const NR=6,occ=Array.from({length:NR},()=>[]);const free=(row,a,b)=>row.every(([c,d])=>b<=c||a>=d);
    let used=1;
    items.filter(i=>inView(i.f)).sort((a,b)=>a.f-b.f).forEach(it=>{
      const px=it.f*W,dot=[px-8,px+8],w=it.e.lw;
      let side='r',lab=[px+8,px+10+w];
      if(lab[1]>W-2){side='l';lab=[px-10-w,px-8];}
      let r=-1,show=false;
      for(let k=0;k<NR;k++) if(free(occ[k],dot[0],dot[1])&&free(occ[k],lab[0],lab[1])&&lab[0]>=0){r=k;show=true;break;}
      if(r<0) for(let k=0;k<NR;k++) if(free(occ[k],dot[0],dot[1])){r=k;break;}
      if(r<0) r=0;
      occ[r].push(dot);if(show) occ[r].push(lab);
      used=Math.max(used,r+1);it.r=r;it.show=show;it.side=side;
    });
    l.track.style.height=(used*22+14)+'px';
    items.forEach(it=>{
      const b=it.e.el,vis=inView(it.f);
      b.style.left=(it.f*100)+'%'; if(vis) b.style.top=(18+it.r*22)+'px';
      b.classList.toggle('off',!vis);b.tabIndex=vis?0:-1;
      b.classList.toggle('nolbl',vis&&!it.show);b.classList.toggle('left',it.side==='l');
      b.classList.toggle('on',it.e.id===state.sel);b.setAttribute('aria-pressed',it.e.id===state.sel?'true':'false');
    });
  });
  if(state.zoom==='all'){
    const mid=(a[1].x1-a[1].x0)/(a[1].a-a[1].b),pre=(a[0].x1-a[0].x0)/(a[0].a-a[0].b),cz=(a[2].x1-a[2].x0)/(a[2].a-a[2].b);
    $('zoneText').textContent='阴影区：前寒武纪压缩约 '+Math.round(mid/pre)+' 倍，新生代放大约 '+Math.round(cz/mid)+' 倍';$('zoneNote').hidden=false;
  } else $('zoneNote').hidden=true;
}

// ---------- 详情卡 ----------
const FIELDS={org:[['z','体型'],['f','关键特征'],['g','演化意义'],['r','现代亲属']],earth:[['z','规模'],['f','原因'],['g','影响'],['r','今天的线索']],human:[['z','体型'],['f','关键特征'],['g','意义'],['r','与我们的关系']]};
function sizeHTML(e){
  if(!e.len) return '';
  const H=1.7,m=Math.max(e.len,H),pa=e.len/m*100,ph=H/m*100;
  let note='';
  if(e.len<H/20){const k=Math.round(H/e.len);note=`<p>它的大小约为成年人身高的 ${k>=1000?'1/'+(k>=1e5?Math.round(k/1e4)+' 万':k.toLocaleString()):'1/'+k}。</p>`;}
  else if(e.len>H*2) note=`<p>它的长度约相当于 ${num(e.len/H,1)} 个成年人。</p>`;
  return `<div class="bar"><span>${fmtLen(e.len)}</span><div><i style="width:${pa}%"></i></div></div><div class="bar me"><span>人 1.7 米</span><div><i style="width:${ph}%"></i></div></div>`+note;
}

// ---------- 科普视频与百科 ----------
const PLAY='<svg viewBox="0 0 10 10"><path d="M1 0l9 5-9 5z"/></svg>',LENS='<svg viewBox="0 0 16 16"><path d="M6.5 1a5.5 5.5 0 0 1 4.4 8.8l4 4-1.2 1.2-4-4A5.5 5.5 0 1 1 6.5 1zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>';
const enc=encodeURIComponent,PF={b:['B站','中文'],y:['YouTube','英文']};
const hasVid=e=>{const m=(window.MEDIA||{})[e.a];return !!(m&&m.v&&m.v.length);};
function esc(t){return String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function renderMedia(e){
  const m=(window.MEDIA||{})[e.a]||{},name=e.n.split('：')[0],en=m.en||(e.s||'').split(' · ')[0]||name;
  const bq=name+' 科普',yq=en+' documentary';
  const bs='https://search.bilibili.com/all?keyword='+enc(bq),ys='https://www.youtube.com/results?search_query='+enc(yq);
  $('mName').textContent=name;
  const th=(k,p,ic)=>`<span class="thumb">${art(e.a)}<i class="play">${ic}</i><em class="pf">${PF[p][0]}</em></span>`;
  const vids=(m.v||[]).slice().sort((a,b)=>(a.r||0)-(b.r||0));
  let h=vids.map(v=>`<a class="vid ${v.p}" href="${esc(v.u)}" target="_blank" rel="noopener noreferrer" title="在${PF[v.p][0]}观看">${th(e.a,v.p,PLAY)}<span class="vt"><b>${esc(v.t)}</b><small>${PF[v.p][0]} · ${PF[v.p][1]}${v.w?' · '+esc(v.w):''}${v.r?'<em>相关主题</em>':''}</small></span></a>`).join('');
  const has=p=>vids.some(v=>v.p===p&&!v.r);
  if(!has('b')) h+=`<a class="vid b s" href="${bs}" target="_blank" rel="noopener noreferrer">${th(e.a,'b',LENS)}<span class="vt"><b>在 B站 搜索「${esc(bq)}」</b><small>B站 · 中文 · 搜索结果页</small></span></a>`;
  if(!vids.length) h+=`<a class="vid y s" href="${ys}" target="_blank" rel="noopener noreferrer">${th(e.a,'y',LENS)}<span class="vt"><b>在 YouTube 搜索「${esc(yq)}」</b><small>YouTube · 英文 · 搜索结果页</small></span></a>`;
  $('mVids').innerHTML=h;
  $('jumpN').textContent=vids.length?vids.length+' 个视频 ↓':'搜索入口 ↓';
  $('mBili').href=bs;$('mYt').href=ys;$('mMore').hidden=!vids.length;
  const zh=m.zh||name;
  $('mWiki').innerHTML=`<a class="wlink" target="_blank" rel="noopener noreferrer" href="https://zh.wikipedia.org/w/index.php?search=${enc(zh)}&go=Go"><b>W</b>维基百科 · ${esc(zh)}</a>`+
    `<a class="wlink" target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/w/index.php?search=${enc(en)}&go=Go"><b>W</b>Wikipedia · ${esc(en)}</a>`+
    `<a class="wlink bd" target="_blank" rel="noopener noreferrer" href="https://baike.baidu.com/item/${enc(name)}"><b>百</b>百度百科</a>`;
}
function renderCards(){
  const e=byId[state.sel],lane=laneBy[e.l],lc=e.x?'var(--ext)':'var(--c-'+e.l+')';
  $('detail').style.setProperty('--lc',lc);
  $('dArt').innerHTML=art(e.a,'',1);
  $('dCap').textContent=e.l==='earth'?'示意图':(e.l==='human'&&/skull|jaw|stones|fire|map|hand|tablet|peking|deniso/.test(e.a)?'示意图':'复原图');
  const list=ordered(),i=list.findIndex(x=>x.id===e.id);
  $('dNo').textContent='No. '+String(EVENTS.indexOf(e)+1).padStart(3,'0');
  const dl=$('dLane');dl.style.setProperty('--lc',lc);dl.lastChild.textContent=lane.n;
  const dp=$('dPer');dp.firstChild.style.background=e.per.c;dp.lastChild.textContent=e.per.n;dp.title='查看'+e.per.n+'并放大';
  $('dName').textContent=e.n;$('dSci').textContent=e.s||'';
  $('dAgo').textContent=fmtAgo(e.t);$('dMa').textContent=fmtMa(e.t);
  $('dDesc').textContent=e.d;
  $('dSize').innerHTML=sizeHTML(e);$('dSize').style.setProperty('--lc',lc);
  const F=e.l==='earth'?FIELDS.earth:(e.l==='human'?FIELDS.human:FIELDS.org);
  $('dFacts').innerHTML=F.filter(([k])=>e[k]).map(([k,n])=>`<div><dt>${n}</dt><dd></dd></div>`).join('');
  [...$('dFacts').querySelectorAll('dd')].forEach((dd,j)=>{dd.textContent=e[F.filter(([k])=>e[k])[j][0]];});
  $('dPlace').textContent=e.w?'化石产地 / 发生地点：'+e.w:'';
  renderMedia(e);
  $('pos').textContent=(i+1)+' / '+list.length;$('prev').disabled=i<=0;$('next').disabled=i>=list.length-1;

  const p=byPer[state.per];
  if($('pScene').dataset.p!==p.id){$('pScene').innerHTML=SCENE(p.id);$('pScene').dataset.p=p.id;}
  const sw=$('pSw');sw.style.background=p.c;sw.style.color=textOn(p.c);sw.textContent=p.sh;
  $('pName').innerHTML='';$('pName').append(p.n);const sm=document.createElement('small');sm.textContent=p.en;$('pName').append(sm);
  $('pRange').textContent=fmtRange(p.s,p.e)+' · 持续约 '+fmtAbs(p.s-p.e)+'年';
  $('pNote').textContent=p.note||'';$('pTravel').textContent=p.sc;
  $('pFlora').textContent=p.fl;$('pFauna').textContent=p.fa;$('pClimate').textContent=p.cl;
  const inP=list.filter(x=>x.per.id===p.id);
  $('pChips').innerHTML=inP.length?inP.map(x=>`<button type="button" data-id="${x.id}" style="--lc:${x.x?'var(--ext)':'var(--c-'+x.l+')'}"${x.id===state.sel?' aria-current="true"':''}><i></i>${x.n}</button>`).join(''):'<span style="font-size:13px;color:var(--muted)">当前筛选下没有节点</span>';
}

// ---------- 图鉴 ----------
function renderGallery(){
  const S=segsFor(state.zoom),evs=ordered().filter(e=>inView(X(e.t,S)));
  const scope=state.zoom==='all'?'全部 45 亿年':rangeOf(state.zoom).n;
  $('gallerySub').textContent='当前范围：'+scope+' · '+evs.length+' 种（随上方的时间范围和类群筛选变化，点击卡片查看详情）';
  const groups=[];evs.forEach(e=>{let g=groups[groups.length-1];if(!g||g.p!==e.per){g={p:e.per,items:[]};groups.push(g);}g.items.push(e);});
  $('groups').innerHTML=groups.map(g=>'<div class="group"><div class="ghead"><i style="background:'+g.p.c+'"></i>'+g.p.n+'<small>'+fmtRange(g.p.s,g.p.e)+'</small></div><div class="cards">'+
    g.items.map(e=>`<button type="button" class="gcard${e.x?' x':''}${e.id===state.sel?' on':''}" data-id="${e.id}" style="--lc:var(--c-${e.l})"><div class="pl"><i></i>${art(e.a)}</div><b>${e.n}</b><span>${fmtAbs(e.t)}年前 · ${laneBy[e.l].n}</span></button>`).join('')+'</div></div>').join('');
}
function renderControls(){
  document.querySelectorAll('#seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.z===state.zoom?'true':'false'));
  document.querySelectorAll('#chips .chip[data-l]').forEach(b=>b.setAttribute('aria-pressed',state.lanes.has(b.dataset.l)?'true':'false'));
  const r=state.zoom==='all'?null:rangeOf(state.zoom);
  $('viewlabel').innerHTML=r?'显示范围：<b>'+r.n+'</b>（'+fmtRange(r.s,r.e)+'）':'显示范围：<b>全部</b>（约 45.7 亿年前 — 今天）';
}
let lastGalleryKey='';
function update(){
  renderControls();layout();renderCards();
  const key=state.zoom+'|'+[...state.lanes].sort().join(',');
  if(key!==lastGalleryKey){renderGallery();lastGalleryKey=key;}
  else document.querySelectorAll('.gcard').forEach(c=>c.classList.toggle('on',c.dataset.id===state.sel));
}

// ---------- 交互 ----------
function reveal(e){
  const wrap=$('tlwrap');if(wrap.scrollWidth<=wrap.clientWidth+2) return;
  const W=$('axis').clientWidth,lw=$('axis').offsetLeft,px=lw+X(e.t,segsFor(state.zoom))*W;
  if(px<wrap.scrollLeft+lw+20||px>wrap.scrollLeft+wrap.clientWidth-20) wrap.scrollTo({left:Math.max(0,px-wrap.clientWidth/2),behavior:reduce?'auto':'smooth'});
}
function showDetail(){
  const d=$('detail'),r=d.getBoundingClientRect();
  if(r.top>innerHeight*.6||r.bottom<80) d.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
  ['detail','media'].forEach(id=>{const c=$(id);c.classList.remove('pop');void c.offsetWidth;c.classList.add('pop');});
}
function select(id,opt){
  const e=byId[id];state.sel=id;state.per=e.per.id;
  if(!state.lanes.has(e.l)) state.lanes.add(e.l);
  if(!inView(X(e.t,segsFor(state.zoom)))) state.zoom=isPeriod(state.zoom)?e.per.id:'all';
  update();if(opt&&opt.reveal) reveal(e);
  try{history.replaceState(null,'','#'+e.a);}catch(_){}
}
function step(d,focus){
  const list=ordered(),i=list.findIndex(x=>x.id===state.sel),n=list[i+d];if(!n) return;
  select(n.id,{reveal:true});
  if(focus&&document.activeElement&&document.activeElement.classList.contains('ev')) n.el.focus({preventScroll:true});
}
function zoomTo(z){state.zoom=z;update();}
function pickPeriod(pid){
  state.zoom=pid;state.per=pid;
  if(byId[state.sel].per.id!==pid){const f=ordered().find(e=>e.per.id===pid);if(f) state.sel=f.id;}
  update();
}
function fixSel(){
  const cur=byId[state.sel];
  if(!state.lanes.has(cur.l)){const near=ordered().reduce((b,e)=>!b||Math.abs(Math.log(e.t+.001)-Math.log(cur.t+.001))<Math.abs(Math.log(b.t+.001)-Math.log(cur.t+.001))?e:b,null);if(near){state.sel=near.id;state.per=near.per.id;}}
}
function toggleLane(id){
  if(state.lanes.has(id)){if(state.lanes.size===1) return;state.lanes.delete(id);}else state.lanes.add(id);
  fixSel();update();
}

// ---------- 生命之树 ----------
const TREE_LABELS=new Set(['真核生物','植物','陆地植物','维管植物','种子植物','真菌与动物','动物','两侧对称动物','节肢动物','脊椎动物','四足动物','羊膜动物','恐龙']);
function buildTree(){
  const leaves=[];(function walk(n){if(n.c) n.c.forEach(walk); else leaves.push(n);})(TREE);
  const RH=30,top=24,H=top+leaves.length*RH+44,W=960,x0=20,x1=700;
  const L=Math.log10(4001),xs=t=>x0+(1-Math.log10(t+1)/L)*(x1-x0);
  leaves.forEach((n,i)=>n.y=top+i*RH+RH/2);
  (function pos(n){if(n.c){n.c.forEach(pos);n.y=(n.c[0].y+n.c[n.c.length-1].y)/2;}})(TREE);
  const col=n=>n.l?`var(--c-${n.l})`:'var(--muted)';
  let g='';
  // 坐标轴
  [4000,1000,500,100,50,10,1,0].forEach(t=>{const x=xs(t);g+=`<line class="axl" x1="${x}" x2="${x}" y1="${top-8}" y2="${H-30}"/><text class="ax" x="${x}" y="${H-14}" text-anchor="middle">${t>=100?num(t/100,1)+'亿':(t?t*100+'万':'今天')}</text>`;});
  g+=`<text class="ax" x="${x1}" y="${H-1}" text-anchor="end">距今年数（对数刻度）</text>`;
  (function draw(n){
    if(!n.c) return;
    const x=xs(n.t);
    g+=`<path class="br" stroke="var(--muted)" d="M${x} ${n.c[0].y}V${n.c[n.c.length-1].y}"/>`;
    n.c.forEach(c=>{
      const cx=c.c?xs(c.t):xs(c.e||0);
      g+=`<path class="br" stroke="${c.c?'var(--muted)':col(c)}" ${c.e?'stroke-dasharray="6 4"':''} d="M${x} ${c.y}H${cx}"><title>${c.n}</title></path>`;
      draw(c);
    });
    g+=`<circle class="nd" cx="${x}" cy="${n.y}" r="3.5"><title>${n.n}：约 ${fmtAbs(n.t)}年前分化</title></circle>`;
    if(TREE_LABELS.has(n.n)) g+=`<text class="nl" x="${x-5}" y="${n.y-6}" text-anchor="end">${n.n}</text>`;
  })(TREE);
  leaves.forEach(n=>{
    const x=xs(n.e||0)+8;
    if(n.a) g+=`<g class="icon" transform="translate(${x} ${n.y-13})"><rect width="44" height="26" rx="4"/>${K.render(n.a).replace('<svg ','<svg x="0" y="0" width="44" height="26" ')}</g>`;
    g+=`<text class="${n.e?'dg':'lf'}" x="${x+(n.a?52:0)}" y="${n.y+4.5}">${n.n}${n.e?' †':''}</text>`;
  });
  $('treeWrap').innerHTML=`<svg class="tree" viewBox="0 0 ${W} ${H}" role="img" aria-label="生命之树：各大类群的分化时间">${g}</svg>`;
}

build();update();
if(window.ResizeObserver) new ResizeObserver(()=>layout()).observe($('axis')); else addEventListener('resize',layout);
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{EVENTS.forEach(e=>e.lw=tw(e.n,12)+12);layout();});
})();
