import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const executables = {
  next: resolve("node_modules/next/dist/bin/next"),
  prisma: resolve("node_modules/prisma/build/index.js"),
  tsx: resolve("node_modules/tsx/dist/cli.mjs"),
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

if (process.env.VERCEL && process.env.DATABASE_URL) {
  console.info("Vercel: application des migrations Prisma.");
  run("prisma", ["migrate", "deploy"]);

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    console.info("Vercel: initialisation des données et du compte administrateur.");
    run("tsx", ["prisma/seed.ts"]);
  }
}

run("next", ["build"]);
