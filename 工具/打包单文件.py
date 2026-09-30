# 把 index.html、样式和全部脚本合并成一个独立的 HTML 文件，方便发给别人或上传：
#   python3 工具/打包单文件.py   → 生成 生命演化长卷_单文件.html
import os,re
root=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
rd=lambda p:open(os.path.join(root,p),encoding='utf-8').read()
html=rd('index.html')
html=re.sub(r'<link rel="stylesheet" href="(style\.css|art\.css)">',lambda m:'<style>\n'+rd(m.group(1))+'\n</style>',html)
html=re.sub(r'<script src="(js/[^"]+)"></script>',lambda m:'<script>\n'+rd(m.group(1)).replace('</script','<\\/script')+'\n</script>',html)
out=os.path.join(root,'生命演化长卷_单文件.html')
open(out,'w',encoding='utf-8').write(html)
print('已生成',out,len(html.encode('utf-8'))//1024,'KB')
