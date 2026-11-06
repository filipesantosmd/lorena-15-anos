#!/usr/bin/env python3
"""Prepara fotos para o site: lê uma pasta de originais (JPG, PNG, HEIC), corrige a
rotação, reduz para no máximo 1400px no lado maior e grava JPEG q82 em assets/fotos.

Uso: python3 tools/fotos.py PASTA_DOS_ORIGINAIS nome1=arquivo1 nome2=arquivo2 ...
Os originais vêm da pasta "15 anos" do Google Drive da Lorena (ver CLAUDE.md) e
nunca entram no repositório."""
import sys, os
from PIL import Image, ImageOps
try:
    import pillow_heif; pillow_heif.register_heif_opener()
except ImportError:
    pass
src, pares = sys.argv[1], sys.argv[2:]
dst = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets', 'fotos')
os.makedirs(dst, exist_ok=True)
for par in pares:
    nome, arq = par.split('=', 1)
    im = ImageOps.exif_transpose(Image.open(os.path.join(src, arq))).convert('RGB')
    im.thumbnail((1400, 1400))
    out = os.path.join(dst, nome + '.jpg')
    im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'{nome}.jpg {im.width}x{im.height}')
