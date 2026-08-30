import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const executables = {
  next: resolve("node_modules/next/dist/bin/next"),
};

function run(name, args) {
  const result = spawnSync(process.execPath, [executables[name], ...args], {
    env: process.env,
    stdio: "inherit",
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

// Database migrations and seeding are explicit maintenance operations.
// Editorial deployments must never reset accounts or overwrite content.
run("next", ["build"]);
