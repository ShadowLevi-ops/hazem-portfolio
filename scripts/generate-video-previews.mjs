import { execFile } from 'node:child_process';
import { mkdir, readdir } from 'node:fs/promises';
import { availableParallelism } from 'node:os';
import { join, extname, basename } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);

const SOURCE_DIR = join(process.cwd(), 'public', 'videos');
const OUT_DIR = join(SOURCE_DIR, 'previews');
const HERO_SOURCE = join(SOURCE_DIR, '11.mp4');
const HERO_OUT = join(SOURCE_DIR, 'hero.mp4');

const VIDEO_EXTS = new Set(['.mp4', '.webm', '.ogg']);
// Card previews are short muted loops shown at ~240-320 CSS px wide.
const PREVIEW_SECONDS = 8;
const PREVIEW_SHORT_SIDE = 540;
const PREVIEW_CRF = '30';

async function probeDuration(file) {
  const { stdout } = await run('ffprobe', [
    '-v',
    'error',
    '-show_entries',
    'format=duration',
    '-of',
    'csv=p=0',
    file,
  ]);
  return Number.parseFloat(stdout.trim()) || 0;
}

const shortSideScale = size =>
  `scale='if(gt(iw,ih),-2,${size})':'if(gt(iw,ih),${size},-2)'`;

async function encodePreview(file) {
  const inPath = join(SOURCE_DIR, file);
  const outPath = join(OUT_DIR, `${basename(file, extname(file))}.mp4`);
  const duration = await probeDuration(inPath);
  const start = Math.max(
    0,
    Math.min(duration * 0.1, duration - PREVIEW_SECONDS)
  );

  await run('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-ss',
    start.toFixed(2),
    '-t',
    String(PREVIEW_SECONDS),
    '-i',
    inPath,
    '-an',
    '-vf',
    `${shortSideScale(PREVIEW_SHORT_SIDE)},fps=30`,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    PREVIEW_CRF,
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    outPath,
  ]);
  console.log('preview', file);
}

async function encodeHero() {
  await run('ffmpeg', [
    '-y',
    '-v',
    'error',
    '-i',
    HERO_SOURCE,
    '-an',
    '-vf',
    `${shortSideScale(720)},fps=30`,
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '27',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    HERO_OUT,
  ]);
  console.log('hero', 'videos/hero.mp4');
}

async function main() {
  const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
  const queue = entries
    .filter(e => e.isFile())
    .map(e => e.name)
    .filter(name => VIDEO_EXTS.has(extname(name).toLowerCase()))
    .filter(name => name !== 'hero.mp4');

  await mkdir(OUT_DIR, { recursive: true });

  const workers = Array.from(
    { length: Math.max(1, Math.floor(availableParallelism() / 2)) },
    async () => {
      while (queue.length > 0) {
        await encodePreview(queue.shift());
      }
    }
  );
  await Promise.all([encodeHero(), ...workers]);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
