import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'videos', 'stills');
const STILLS_PER_VIDEO = 5;
// Spread frames across the runtime, avoiding intros/outros.
const POSITIONS = [0.12, 0.31, 0.5, 0.69, 0.88];

// video-11 is hidden from the portfolio; video-21 uses shot campaign stills.
const SKIP = new Set([11, 21]);
const VIDEO_IDS = Array.from({ length: 22 }, (_, i) => i + 1).filter(
  n => !SKIP.has(n)
);

mkdirSync(OUT_DIR, { recursive: true });

function probeDuration(file) {
  const out = execFileSync(
    'ffprobe',
    [
      '-v',
      'error',
      '-show_entries',
      'format=duration',
      '-of',
      'csv=p=0',
      file,
    ],
    { encoding: 'utf8' }
  );
  return Number.parseFloat(out.trim());
}

for (const id of VIDEO_IDS) {
  const src = path.join(ROOT, 'public', 'videos', `${id}.mp4`);
  if (!existsSync(src)) {
    console.warn(`skip: ${id}.mp4 not found`);
    continue;
  }
  const duration = probeDuration(src);
  for (let i = 0; i < STILLS_PER_VIDEO; i += 1) {
    const t = (duration * POSITIONS[i]).toFixed(3);
    const dest = path.join(OUT_DIR, `${id}-${i + 1}.webp`);
    execFileSync('ffmpeg', [
      '-y',
      '-v',
      'error',
      '-ss',
      t,
      '-i',
      src,
      '-frames:v',
      '1',
      '-vf',
      "scale='min(iw,1080)':-2",
      '-c:v',
      'libwebp',
      '-quality',
      '80',
      dest,
    ]);
  }
  console.log(`extracted ${STILLS_PER_VIDEO} stills for video ${id}`);
}

console.log('done');
