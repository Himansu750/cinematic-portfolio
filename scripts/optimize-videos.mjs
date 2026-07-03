import { spawn } from "node:child_process";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const inputDir = path.join(process.cwd(), "public", "videos");
const outputDir = path.join(inputDir, "optimized");

const videoNames = (await readdir(inputDir)).filter((name) =>
  name.toLowerCase().endsWith(".mp4")
);

await mkdir(outputDir, { recursive: true });

function runFfmpeg(input, output) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      ffmpegPath,
      [
        "-y",
        "-i",
        input,
        "-map",
        "0:v:0",
        "-map",
        "0:a?",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "20",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        output,
      ],
      {
        stdio: "inherit",
      }
    );

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `ffmpeg exited with code ${code} for ${path.basename(input)}`
        )
      );
    });
  });
}

for (const name of videoNames) {
  const input = path.join(inputDir, name);
  const output = path.join(outputDir, name);

  console.log(`Optimizing ${name}...`);
  await runFfmpeg(input, output);

  const before = await stat(input);
  const after = await stat(output);
  const saved = 1 - after.size / before.size;

  console.log(
    `${name}: ${(before.size / 1024 / 1024).toFixed(1)} MB -> ${(
      after.size /
      1024 /
      1024
    ).toFixed(1)} MB (${Math.round(saved * 100)}% smaller)`
  );
}
