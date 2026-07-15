import subprocess, re, os

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
FAMILIES = {
    "fraunces-italic": ("Fraunces:ital,opsz,wght@1,9..144,400..700", "fraunces-ital-var"),
    "inter":           ("Inter:wght@400..700", "inter-var"),
    "jetbrains-mono":  ("JetBrains+Mono:wght@400..500", "jbmono-var"),
}
KEEP = {"latin", "latin-ext"}

def curl_text(url):
    return subprocess.check_output(["curl","-sS","-A",UA,url]).decode("utf-8")
def curl_bin(url, out):
    subprocess.check_call(["curl","-sS","-A",UA,"-o",out,url])

faces = []
for key,(q,prefix) in FAMILIES.items():
    css = curl_text(f"https://fonts.googleapis.com/css2?family={q}&display=swap")
    blocks = re.split(r'/\*\s*([\w-]+)\s*\*/', css)
    for i in range(1, len(blocks), 2):
        subset = blocks[i].strip(); block = blocks[i+1]
        if subset not in KEEP: continue
        m = re.search(r'src:\s*url\((https://[^)]+\.woff2)\)', block)
        if not m: continue
        fname = f"{prefix}-{subset}.woff2"
        curl_bin(m.group(1), os.path.join("fonts", fname))
        b = os.path.getsize(os.path.join("fonts", fname))
        fam   = re.search(r'font-family:\s*([^;]+);', block).group(1).strip()
        style = re.search(r'font-style:\s*([^;]+);', block).group(1).strip()
        wght  = re.search(r'font-weight:\s*([^;]+);', block).group(1).strip()
        urange= re.search(r'unicode-range:\s*([^;]+);', block).group(1).strip()
        faces.append({"fam":fam,"style":style,"wght":wght,"urange":urange,"file":fname,"bytes":b})
        print(f"  {fname:34s} {b:>7,d} B  ({fam} {style} {wght})")

out = ["/* self-hosted fonts (Google Fonts, latin + latin-ext) — generated, do not edit by hand */"]
for f in faces:
    out.append("@font-face{font-family:%s;font-style:%s;font-weight:%s;font-display:swap;src:url('/fonts/%s') format('woff2');unicode-range:%s}"
        % (f["fam"], f["style"], f["wght"], f["file"], f["urange"]))
open("fonts/fonts.css","w").write("\n".join(out)+"\n")
print("\n--- fonts/fonts.css ---"); print("\n".join(out))
print(f"\nTotal woff2: {sum(f['bytes'] for f in faces):,} B across {len(faces)} files")
