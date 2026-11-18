"""Gera os ficheiros únicos (V1, V2, V3) com as fotos e a configuração embutidas.
Correr com:  python3 build.py   (depois de alterar js/config.js, as fotos ou os ficheiros do site)."""
import base64, os, re

cfg = open('js/config.js').read()

def embed(text):
    def uri(m):
        if not os.path.exists(m.group(1)):
            return m.group(0)
        data = base64.b64encode(open(m.group(1), 'rb').read()).decode()
        mime = 'png' if m.group(1).endswith('.png') else 'jpeg'
        return '"data:image/' + mime + ';base64,' + data + '"'
    return re.sub(r'"(img/[^"]+\.(?:jpe?g|png))"', uri, text)

cfg_inline = embed(cfg)

# V2: index.html + css + js
h = open('index.html').read()
h = h.replace('<link rel="stylesheet" href="css/style.css">', '<style>\n' + open('css/style.css').read() + '\n</style>')
h = h.replace('<script src="js/config.js"></script>', '<script>\n' + cfg_inline + '\n</script>')
h = h.replace('<script src="js/main.js"></script>', '<script>\n' + open('js/main.js').read() + '\n</script>')
h = re.sub(r'<title>.*?</title>', '<title>V2 · MonteiroServic</title>', h)
assert 'css/style.css' not in h and 'js/main.js' not in h
open('monteiro-servicos-V2.html', 'w').write(embed(h))

# V3: modelo próprio
t = open('v3/template.html').read()
assert '/*__CONFIG__*/' in t
open('monteiro-servicos-V3.html', 'w').write(embed(t).replace('/*__CONFIG__*/', cfg_inline))

# V1: design congelado; só se troca o bloco de configuração
v1 = open('monteiro-servicos-V1.html').read()
a = v1.index('/* =====', v1.index('<script>'))
b = v1.index('</script>', a)
open('monteiro-servicos-V1.html', 'w').write(embed(v1[:a]) + cfg_inline + '\n' + embed(v1[b:]))
print('ok')
