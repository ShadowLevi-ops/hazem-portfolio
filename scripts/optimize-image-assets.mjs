import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const QUALITY = 72;
const MAX_WIDTH = 1920;

const SOURCES = [
  ...Array.from({ length: 17 }, (_, idx) => `public/images/p${idx + 1}`),
  ...Array.from({ length: 19 }, (_, idx) => `public/videos/VT-${idx + 1}`),
];

const EXTENSIONS = ['.png', '.PNG', '.jpg', '.JPG', '.jpeg', '.JPEG'];

function resolveSource(basePath) {
  for (const ext of EXTENSIONS) {
    const candidate = path.join(ROOT, `${basePath}${ext}`);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

async function convertToWebP(inputPath) {
  const outputPath = inputPath.replace(/\.(png|jpe?g)$/i, '.webp');
  const outputDir = path.dirname(outputPath);
  await mkdir(outputDir, { recursive: true });

  const transformer = sharp(inputPath, { failOn: 'none' }).rotate();
  const metadata = await transformer.metadata();
  const resizeWidth =
    metadata.width && metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined;

  await transformer
    .resize({ width: resizeWidth, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outputPath);

  return outputPath;
}

async function run() {
  let convertedCount = 0;
  for (const sourceBase of SOURCES) {
    const source = resolveSource(sourceBase);
    if (!source) continue;
    const output = await convertToWebP(source);
    convertedCount += 1;
    console.log(`optimized: ${path.relative(ROOT, source)} -> ${path.relative(ROOT, output)}`);
  }
  console.log(`done: ${convertedCount} image assets optimized to webp`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
