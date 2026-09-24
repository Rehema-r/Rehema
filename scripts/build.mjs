import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const executable = resolve("node_modules/next/dist/bin/next");
const result = spawnSync(process.execPath, [executable, "build"], {
  env: process.env,
  stdio: "inherit",
});

if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
