# 生成插图总览（检查用）：python 工具/contact.py → 输出 工具/插图总览.html（打开后可在网址末尾加 #关键字 只看部分插图）
import os,re
here=os.path.dirname(os.path.abspath(__file__)); root=os.path.join(here,'..')
idx=open(os.path.join(root,'index.html'),encoding='utf-8').read()
files=[f for f in re.findall(r'<script src="(js/[^"]+)"></script>',idx) if re.search(r'js/(artkit|art-|data)',f)]
js='\n;\n'.join(open(os.path.join(root,f),encoding='utf-8').read() for f in files)
css=open(os.path.join(root,'art.css'),encoding='utf-8').read()
html='''<!doctype html><meta charset="utf-8"><title>插图总览</title><style>body{margin:0;padding:12px;background:#dfe3dc;font:12px sans-serif}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:8px}.c{background:#EEF1EA;border-radius:6px;padding:4px}.c b{display:block;text-align:center}
'''+css+'''</style><div class="grid" id="g"></div><script>'''+js.replace('</script','<\\/script')+'''
const g=document.getElementById('g');const only=decodeURIComponent(location.hash.slice(1));
EVENTS.forEach(e=>{if(only&&!(e.a+e.n).includes(only))return;const d=document.createElement('div');d.className='c';
d.innerHTML=K.render(e.a,{tex:1})+'<b>'+e.n+'</b>';g.append(d);});
</script>'''
open(os.path.join(here,'插图总览.html'),'w',encoding='utf-8').write(html)
print('ok',len(html))
