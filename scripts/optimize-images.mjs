import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDir = path.join(process.cwd(), "public", "images");
const outputDir = path.join(inputDir, "optimized");

const imageNames = (await readdir(inputDir)).filter((name) =>
  /\.(jpe?g|png)$/i.test(name)
);

await mkdir(outputDir, { recursive: true });

for (const name of imageNames) {
  const input = path.join(inputDir, name);
  const outputName = `${path.parse(name).name}.webp`;
  const output = path.join(outputDir, outputName);

  await sharp(input)
    .rotate()
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 86,
      effort: 6,
    })
    .toFile(output);

  const before = await stat(input);
  const after = await stat(output);
  const saved = 1 - after.size / before.size;

  console.log(
    `${name}: ${(before.size / 1024).toFixed(0)} KB -> ${(
      after.size / 1024
    ).toFixed(0)} KB (${Math.round(saved * 100)}% smaller)`
  );
}
