import os
import re
import shutil

# Paths
base_dir = r"c:\Users\Luca\Desktop\UNIVE\content\UNI\ANNO 3\INGEGNERIA DEL SOFTWARE"
md_file = os.path.join(base_dir, "INGEGNERIA DEL SOFTWARE MODULO 1.md")
dest_dir = os.path.join(base_dir, "FOTOIS")

source_dirs = [
    os.path.join(base_dir, r"DRAFT\IS_andrea_obsidian_full\IS_andrea_obsidian_full\assets"),
    os.path.join(base_dir, r"DRAFT\software-engineering\assets")
]

# Create destination directory if it doesn't exist
os.makedirs(dest_dir, exist_ok=True)

# Read markdown file
with open(md_file, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern for Obsidian links: [[filename.ext|options]] or ![[filename.ext]]
obsidian_pattern = r"\[\[(.*?)(?:\|.*?)?\]\]"
# Pattern for Standard markdown links: ![alt](filename.ext)
standard_pattern = r"!\[.*?\]\((.*?)\)"

obsidian_matches = re.findall(obsidian_pattern, content)
standard_matches = re.findall(standard_pattern, content)

all_matches = obsidian_matches + standard_matches

# Filter only images
image_extensions = ('.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp')
image_filenames = set()

for match in all_matches:
    # Some matches could have a path like 'assets/image.png' or just 'image.png'
    basename = os.path.basename(match.strip())
    if basename.lower().endswith(image_extensions):
        image_filenames.add(basename)

print(f"Trovate {len(image_filenames)} immagini uniche citate nel file Markdown.")

copied_count = 0
missing_files = []

for filename in image_filenames:
    found = False
    for src_dir in source_dirs:
        src_path = os.path.join(src_dir, filename)
        if os.path.exists(src_path):
            dest_path = os.path.join(dest_dir, filename)
            shutil.copy2(src_path, dest_path)
            copied_count += 1
            found = True
            break # Stop searching if found
    
    if not found:
        missing_files.append(filename)

print(f"Copia completata. {copied_count} file copiati nella cartella FOTOIS.")
if missing_files:
    print(f"Attenzione: i seguenti file non sono stati trovati nelle cartelle di origine:")
    for m in missing_files:
        print(f" - {m}")
