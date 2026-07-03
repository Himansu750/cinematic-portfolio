import { spawn } from "node:child_process";

const command = process.platform === "win32" ? "npm.cmd" : "npm";

const child = spawn(command, ["run", "build"], {
  env: {
    ...process.env,
    ANALYZE: "true",
  },
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
