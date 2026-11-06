#!/usr/bin/env python3
"""Gera os arquivos de apoio do site a partir da paleta e das fontes:
assets/og.jpg (prévia no WhatsApp, 1200x630, sem rosto), assets/icon-512.png,
assets/apple-touch-icon.png, assets/favicon-32.png, assets/eu-vou.png
(template de story 1080x1920), assets/lorena15.ics e as versões pequenas das
fotos em assets/fotos/sm/ (480px) e assets/fotos/capa-700.jpg.

Uso: python3 tools/build_assets.py            (tudo)
     python3 tools/build_assets.py fotos      (só as versões pequenas)
Fontes em tools/fonts/ (Italiana, Jost, Bodoni Moda, licença OFL)."""
import os, sys, glob
from PIL import Image, ImageDraw, ImageFont, ImageOps

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(RAIZ, 'assets'); F = os.path.join(RAIZ, 'tools', 'fonts')
BG, PAPER, INK, MUTED, ROSE, ROSE_DEEP, GOLD, BLUSH = '#FFF7F6', '#FFFFFF', '#3A2A30', '#7D6670', '#E8899A', '#B84C66', '#C9A24B', '#FDEBEE'

def fonte(nome, tam):
    p = {'italiana': 'Italiana-Regular.ttf', 'jost': 'Jost[wght].ttf', 'bodoni': 'BodoniModa-Italic[opsz,wght].ttf'}[nome]
    f = ImageFont.truetype(os.path.join(F, p), tam)
    try:
        if nome == 'jost': f.set_variation_by_axes([500])
        if nome == 'bodoni': f.set_variation_by_axes([72, 400])
    except Exception:
        pass
    return f

def texto_centrado(d, xy, s, f, cor, esp=0):
    x, y = xy
    if esp:
        larg = sum(d.textlength(c, font=f) + esp for c in s) - esp
        cx = x - larg / 2
        for c in s:
            d.text((cx, y), c, font=f, fill=cor); cx += d.textlength(c, font=f) + esp
    else:
        larg = d.textlength(s, font=f); d.text((x - larg / 2, y), s, font=f, fill=cor)

def selo(d, cx, cy, r, f):
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=GOLD, width=max(2, r // 24))
    texto_centrado(d, (cx, cy - r * 0.62), '15', f, GOLD)

def og():
    im = Image.new('RGB', (1200, 630), BG); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, 1200, 14), fill=ROSE_DEEP)
    selo(d, 600, 118, 48, fonte('italiana', 56))
    texto_centrado(d, (600, 190), 'OS QUINZE ANOS DE', fonte('jost', 20), ROSE_DEEP, esp=5)
    texto_centrado(d, (600, 222), 'LORENA', fonte('italiana', 210), INK, esp=12)
    texto_centrado(d, (600, 452), 'Sábado, 13 de fevereiro de 2027 · 19h30', fonte('jost', 30), INK)
    texto_centrado(d, (600, 496), 'Casa Quintal · São Paulo', fonte('bodoni', 34), ROSE_DEEP)
    texto_centrado(d, (600, 570), 'TOQUE PARA ABRIR O CONVITE', fonte('jost', 18), MUTED, esp=4)
    im.save(os.path.join(A, 'og.jpg'), 'JPEG', quality=86, optimize=True); print('og.jpg')

def icones():
    for tam, nome in ((512, 'icon-512.png'), (180, 'apple-touch-icon.png'), (32, 'favicon-32.png')):
        im = Image.new('RGB', (tam, tam), BLUSH); d = ImageDraw.Draw(im)
        r = int(tam * 0.36); selo(d, tam / 2, tam / 2, r, fonte('italiana', int(tam * 0.42)))
        im.save(os.path.join(A, nome)); print(nome)

def story():
    W, H = 1080, 1920
    im = Image.new('RGB', (W, H), BG); d = ImageDraw.Draw(im)
    d.rectangle((0, 0, W, 22), fill=ROSE_DEEP); d.rectangle((0, H - 22, W, H), fill=ROSE_DEEP)
    selo(d, W / 2, 230, 70, fonte('italiana', 82))
    texto_centrado(d, (W / 2, 340), 'EU VOU', fonte('italiana', 230), INK, esp=14)
    texto_centrado(d, (W / 2, 590), 'nos quinze da', fonte('bodoni', 60), ROSE_DEEP)
    texto_centrado(d, (W / 2, 650), 'LORENA', fonte('italiana', 150), INK, esp=10)
    # moldura polaroid vazia para a foto de quem posta
    pw, ph = 720, 860; px, py = (W - pw) // 2, 860
    som = Image.new('RGB', (pw + 40, ph + 40), BG)
    im.paste(som, (px - 20, py - 20))
    d.rectangle((px + 8, py + 12, px + pw + 8, py + ph + 12), fill='#EADADC')
    d.rectangle((px, py, px + pw, py + ph), fill=PAPER)
    d.rectangle((px + 36, py + 36, px + pw - 36, py + ph - 150), fill=BLUSH)
    texto_centrado(d, (W / 2, py + ph / 2 - 110), 'sua foto aqui', fonte('bodoni', 44), ROSE)
    texto_centrado(d, (W / 2, py + ph - 110), '13 · 02 · 2027', fonte('italiana', 44), GOLD, esp=4)
    texto_centrado(d, (W / 2, 1790), 'CASA QUINTAL · SÃO PAULO', fonte('jost', 30), MUTED, esp=6)
    im = im.rotate(0)
    im.save(os.path.join(A, 'eu-vou.png'), optimize=True); print('eu-vou.png')

def ics():
    s = ("BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Os 15 da Lorena//PT-BR\r\nCALSCALE:GREGORIAN\r\nMETHOD:PUBLISH\r\n"
         "BEGIN:VTIMEZONE\r\nTZID:America/Sao_Paulo\r\nBEGIN:STANDARD\r\nDTSTART:19700101T000000\r\nTZOFFSETFROM:-0300\r\nTZOFFSETTO:-0300\r\nEND:STANDARD\r\nEND:VTIMEZONE\r\n"
         "BEGIN:VEVENT\r\nUID:festa-2027-02-13@15anosdalorena.com.br\r\nDTSTAMP:20261106T000000Z\r\n"
         "DTSTART;TZID=America/Sao_Paulo:20270213T193000\r\nDTEND;TZID=America/Sao_Paulo:20270214T020000\r\n"
         "SUMMARY:Os 15 da Lorena\r\nLOCATION:Casa Quintal\\, Av. Angélica\\, 2278 - Consolação\\, São Paulo - SP\r\n"
         "DESCRIPTION:Festa de 15 anos da Lorena. Confirme até 31 de dezembro em https://15anosdalorena.com.br\r\n"
         "URL:https://15anosdalorena.com.br\r\nBEGIN:VALARM\r\nTRIGGER:-P1D\r\nACTION:DISPLAY\r\nDESCRIPTION:Amanhã: os 15 da Lorena\r\nEND:VALARM\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n")
    open(os.path.join(A, 'lorena15.ics'), 'w', encoding='utf-8', newline='').write(s); print('lorena15.ics')

def fotos():
    sm = os.path.join(A, 'fotos', 'sm'); os.makedirs(sm, exist_ok=True)
    for f in sorted(glob.glob(os.path.join(A, 'fotos', '*.jpg'))):
        im = Image.open(f).convert('RGB'); n = os.path.basename(f)
        if n == 'capa.jpg':
            c = im.copy(); c.thumbnail((700, 700)); c.save(os.path.join(A, 'fotos', 'capa-700.jpg'), 'JPEG', quality=80, optimize=True, progressive=True)
        im.thumbnail((480, 480)); im.save(os.path.join(sm, n), 'JPEG', quality=76, optimize=True, progressive=True)
    print('fotos/sm:', len(os.listdir(sm)), 'arquivos')

if __name__ == '__main__':
    alvo = sys.argv[1] if len(sys.argv) > 1 else 'tudo'
    if alvo in ('tudo', 'fotos'): fotos()
    if alvo == 'tudo': og(); icones(); story(); ics()
