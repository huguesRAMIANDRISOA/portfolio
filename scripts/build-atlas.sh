#!/usr/bin/env bash
#
# Génère les atlas WebP de la séquence de fond à partir de public/image/.
#
# Dépendance unique : ffmpeg (ImageMagick n'est PAS requis — et sur Windows,
# `convert` désigne l'utilitaire système FAT→NTFS, pas ImageMagick).
#
# Pipeline : 240 JPG 1920×1080  →  1 frame sur 2  →  scale 1024×576  →  WebP q70
#            →  pavage 4 colonnes × 5 lignes  →  6 atlas de 4096×2880.
#
# Usage : bash scripts/build-atlas.sh   (depuis la racine du projet)

set -euo pipefail

SRC_DIR="public/image"
OUT_DIR="src/assets"

FRAME_W=896       # largeur d'UNE frame. 1280 dépasserait la limite de ~16,7 Mpx
                  # d'iOS Safari une fois pavé (20 × 1280×720 = 18,4 Mpx) ;
                  # 896 tient le budget mémoire décodée à ~217 Mo.
COLS=4
ROWS=5
QUALITY=70        # libwebp, 0-100
PER_ATLAS=$((COLS * ROWS))

# ---- Garde-fous -------------------------------------------------------------

command -v ffmpeg  >/dev/null 2>&1 || { echo "ffmpeg introuvable dans le PATH." >&2; exit 1; }
command -v ffprobe >/dev/null 2>&1 || { echo "ffprobe introuvable dans le PATH." >&2; exit 1; }
[ -d "$SRC_DIR" ] || { echo "Dossier source absent : $SRC_DIR" >&2; exit 1; }

src_count=$(find "$SRC_DIR" -maxdepth 1 -name 'ezgif-frame-*.jpg' | wc -l)
if [ "$src_count" -ne 240 ]; then
  echo "Attendu 240 frames source, trouvé $src_count." >&2
  echo "Le filtre tile paverait le dernier atlas avec du vide." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"
rm -f "$OUT_DIR"/atlas-*.webp

# ---- Génération -------------------------------------------------------------
#
# select='not(mod(n\,2))' : garde n = 0,2,4… soit les fichiers 001, 003 … 239.
# scale=$FRAME_W:-2       : hauteur déduite du ratio, forcée paire (1080 → 576).
# tile=4x5                : consomme 20 frames et émet UNE image ; 120 frames
#                           en entrée produisent donc exactement 6 sorties.
# -start_number 0         : nomme atlas-0 … atlas-5 (et non atlas-1 … atlas-6).

echo "Génération des atlas…"
ffmpeg -hide_banner -loglevel warning -y \
  -start_number 1 \
  -framerate 1 \
  -i "$SRC_DIR/ezgif-frame-%03d.jpg" \
  -vf "select='not(mod(n\,2))',scale=${FRAME_W}:-2:flags=lanczos,tile=${COLS}x${ROWS}:padding=0:margin=0" \
  -fps_mode passthrough \
  -c:v libwebp -quality "$QUALITY" -compression_level 6 -lossless 0 \
  -start_number 0 \
  "$OUT_DIR/atlas-%d.webp"

# ---- Vérification -----------------------------------------------------------

echo
echo "Atlas générés :"
total=0
for f in "$OUT_DIR"/atlas-*.webp; do
  dims=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f")
  bytes=$(wc -c < "$f")
  total=$((total + bytes))
  printf "  %-14s %-12s %6.1f Ko\n" "$(basename "$f")" "$dims" "$(echo "$bytes" | awk '{print $1/1024}')"
done

atlas_w=$((FRAME_W * COLS))
frame_h=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of csv=p=0 "$OUT_DIR/atlas-0.webp")
frame_h=$((frame_h / ROWS))

echo
echo "  Dimensions d'UNE frame dans l'atlas : ${FRAME_W} × ${frame_h}"
echo "  Dimensions d'UN atlas               : ${atlas_w} × $((frame_h * ROWS))"
echo "  Frames par atlas                    : ${PER_ATLAS}  (${COLS} col × ${ROWS} lignes)"
printf "  Poids total                         : %.2f Mo  (%d fichiers)\n" \
  "$(echo "$total" | awk '{print $1/1048576}')" "$(ls -1 "$OUT_DIR"/atlas-*.webp | wc -l)"
echo
echo "Source : $(find "$SRC_DIR" -name '*.jpg' -type f -printf '%s\n' | awk '{s+=$1} END {printf "%.2f Mo en %d requêtes", s/1048576, NR}')"
