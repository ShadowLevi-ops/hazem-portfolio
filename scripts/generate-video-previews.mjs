import { spawn } from 'node:child_process';
import { mkdir, readdir } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const SOURCE_DIR = join(process.cwd(), 'public', 'videos');
const OUT_DIR = join(process.cwd(), 'public', 'videos', 'previews');

const VIDEO_EXTS = new Set(['.mp4', '.webm', '.ogg']);

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true });
    child.on('exit', code => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}

async function main() {
  const entries = await readdir(SOURCE_DIR, { withFileTypes: true });
  const videos = entries
    .filter(e => e.isFile())
    .map(e => e.name)
    .filter(name => VIDEO_EXTS.has(extname(name).toLowerCase()));

  if (videos.length === 0) {
    console.log('No videos found in', SOURCE_DIR);
    return;
  }

  // Create output folder (ffmpeg will fail if it doesn't exist).
  await mkdir(OUT_DIR, { recursive: true });

  // Preview encoding targets:
  // - fast to load, good enough for hover previews
  // - strip audio
  // - cap resolution; keep aspect
  // - frequent keyframes for snappy seeking
  for (const file of videos) {
    const inPath = join(SOURCE_DIR, file);
    const outName = `${basename(file, extname(file))}.mp4`;
    const outPath = join(OUT_DIR, outName);

    console.log('\n==> preview', file, '->', `videos/previews/${outName}`);

    await run('ffmpeg', [
      '-y',
      '-i',
      inPath,
      '-an',
      '-vf',
      "scale='min(720,iw)':-2",
      '-c:v',
      'libx264',
      '-profile:v',
      'main',
      '-preset',
      'veryfast',
      '-crf',
      '30',
      '-movflags',
      '+faststart',
      '-g',
      '48',
      '-keyint_min',
      '48',
      outPath,
    ]);
  }

  console.log('\nDone. Now set `previewMediaUrl` to `/videos/previews/<name>.mp4`.');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

