from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
files = [
    root / 'imagenes' / 'logo.png',
    root / 'imagenes' / 'background.png',
    root / 'imagenes' / 'detras-de-camaras' / 'detrasdecamaras.jpg',
    root / 'imagenes' / 'detras-de-camaras' / 'detrasdecamaras1.jpg',
    root / 'imagenes' / 'detras-de-camaras' / 'detrasdecamaras2.jpg',
    root / 'imagenes' / 'detras-de-camaras' / 'detrasdecamaras3.jpg',
    root / 'imagenes' / 'detras-de-camaras' / 'detrasdecamaras4.jpg',
    root / 'imagenes' / 'detras-de-camaras' / 'detrasdecamaras5.jpg',
    root / 'imagenes' / 'detras-de-camaras' / 'detrasdecamaras6.jpg',
    root / 'imagenes' / 'proyectos' / 'proyectopatapo.jpg',
    root / 'imagenes' / 'proyectos' / '_MG_0307_EDITADA.jpg',
    root / 'imagenes' / 'proyectos' / '_MG_0355_EDITADA.jpg',
    root / 'imagenes' / 'proyectos' / '_MG_0390_EDITADA.jpg',
    root / 'imagenes' / 'proyectos' / '_MG_0408_EDITADA.jpg',
]

for path in files:
    if not path.exists():
        continue

    with Image.open(path) as img:
        img.load()

        if img.mode in {'RGBA', 'LA', 'P'}:
            img = img.convert('RGBA')
        else:
            img = img.convert('RGB')

        max_width = 1600 if path.parent.name == 'proyectos' else 1200
        if img.width > max_width:
            ratio = max_width / img.width
            new_size = (max_width, max(int(img.height * ratio), 1))
            img = img.resize(new_size, Image.LANCZOS)

        output_path = path.with_suffix('.webp')
        quality = 70 if path.name.lower().startswith('logo') or path.name.lower() == 'background.png' else 75
        img.save(output_path, 'WEBP', quality=quality, optimize=True)
        print(f'{path.name}: {path.stat().st_size} bytes -> {output_path.stat().st_size} bytes')
