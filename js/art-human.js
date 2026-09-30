// 精细插图 · 人类
(function(){
const {U,fig,eye,teeth,T}=K;
const BONE='#C4AE8C';
function ghost(x){return fig(x,1,{ghost:1})+`<text class="tx" x="${x-14}" y="18" style="fill:#8E978B;font-size:8px">现代人 1.7 米</text>`;}
ART.ardi=[null,'~G'+`<path class="ps" style="stroke:#6A8A4A;stroke-width:4" d="M18 107V30M18 40l-10-8M18 56l12-10M176 107V40M176 50l12-8M176 66l-12-8"/><circle class="p" cx="18" cy="28" r="15" style="fill:#8FB878"/><circle class="p" cx="176" cy="36" r="15" style="fill:#8FB878"/>`+K.shadow(84,10)+ghost(128)+fig(84,.7,{stoop:4,arm:8,brow:1,jaw:2,fur:1})];
ART.lucy=[null,'~G'+`<path class="d" style="opacity:.35" d="M20 104l6-1 1 2-6 1zM36 100l6-1 1 2-6 1zM52 104l6-1 1 2-6 1zM68 100l6-1 1 2-6 1z"/>`+K.shadow(98,9)+ghost(140)+fig(98,.65,{stoop:3,arm:6,brow:1,jaw:2,fur:1})];
ART.erectus=[null,'~G'+K.shadow(94,12)+ghost(146)+fig(94,.98,{arm:2,brow:1,jaw:1,tool:'axe',wrap:0})];
ART.neanderthal=[null,'~G'+K.shadow(96,13)+ghost(148)+fig(96,.94,{bulk:1.25,brow:1,hair:1,jaw:1,tool:'spear',wrap:1})];
ART.sapiens=[null,'~G'+`<path class="s" d="M130 107c0-14 12-22 30-22s30 8 30 22z"/>`+K.shadow(92,12)+fig(92,1,{hair:1,tool:'spear',wrap:1})];
const sk=(d)=>U([d],{fill:'url(#{U}bone)'})+`<defs><linearGradient id="{U}bone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E4D3B2"/><stop offset="1" stop-color="#A88E68"/></linearGradient></defs>`;
ART.skull_sahel=[BONE,sk('M40 70c0-26 30-40 64-38 24 2 42 12 48 24l8 2c4 2 4 8 0 10l-4 8c-2 8-10 12-18 12l-8 8h-12l-2-8c-16 2-36 2-52-2-14-2-24-6-24-16z')+
 `<path fill="#6E5A3E" opacity=".55" d="M126 58c6-4 16-4 22 0-2 4-6 6-10 6s-10-2-12-6z"/><ellipse cx="138" cy="66" rx="7" ry="6" fill="#2A2018"/><path fill="#2A2018" d="M150 74l6 2-4 6z"/>`+
 `<path class="kt" style="stroke:#6E5A3E" d="M60 46c10 6 20 8 30 6M80 36c4 10 4 20 0 30M122 94l1-4M126 94l1-4M130 94l1-4M56 70c10 4 24 6 40 4"/><path fill="#fff" opacity=".35" d="M60 44c14-8 34-10 50-6-16 0-34 2-50 6z"/>`];
ART.jaw=[BONE,sk('M30 60c0-10 8-16 18-16h12c10 16 30 26 60 26l40-4c8-2 12 2 12 8l-2 8c-20 8-60 10-90 6-20-2-36-6-44-12-4-4-6-10-6-16z')+
 `<path class="tooth" d="${Array.from({length:8},(_,i)=>`M${112+i*7} ${70-i*.5}v-6h5v6z`).join('')}"/><path class="kt" style="stroke:#6E5A3E" d="M48 50c4 8 6 16 6 26M70 80c20 4 50 4 80 0"/><text class="tx" x="60" y="104" style="font-size:9px">下颌骨化石</text>`];
ART.peking=[BONE,'<path class="s" d="M6 110V50c20-40 70-44 100-40 40 4 70 20 88 60v40z" style="fill:#A89C88"/><path class="sd" d="M40 110c0-40 20-60 60-62 36 2 56 24 56 62z" style="fill:#3E3A34"/>'+
 sk('M64 92c0-16 18-26 42-26 18 0 30 6 36 14l4 2c2 2 0 6-4 6l-4 4H70c-4 0-6 0-6 0z')+`<path fill="#6E5A3E" d="M126 82c4-2 10-2 14 0v4c-4 1-10 1-14-1z"/><path class="kt" style="stroke:#6E5A3E" d="M84 72c6 4 10 10 10 16M104 68c2 8 2 14 0 20"/>`];
ART.denisovan=[BONE,'<path class="s" d="M6 70l34-40 22 20 30-34 30 30 20-16 52 50v40H6z" style="fill:#C9CDD2;stroke:#8E969E"/><path class="ice" d="M86 22l6-6 8 8-5-1-3 3zM34 36l6-6 6 6-4-1-2 2zM150 46l6-6 6 6-4-1-2 2z"/>'+
 sk('M40 84c0-8 6-12 14-12h10c8 12 24 18 46 18l32-2c6 0 10 2 10 6l-2 6c-16 6-48 8-72 4-16-2-28-6-34-10-2-4-4-6-4-10z')+`<path class="tooth" d="M112 90v-7h7v7zM121 90v-7h7v7zM130 89v-7h7v7z"/><text class="tx" x="120" y="112" style="font-size:8px">夏河下颌骨</text>`];
})();
