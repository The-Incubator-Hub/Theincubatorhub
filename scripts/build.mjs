import { execSync } from "node:child_process";

const REQUIRED_TINA_ENV = ["NEXT_PUBLIC_TINA_CLIENT_ID", "TINA_TOKEN"];
const missingTinaEnv = REQUIRED_TINA_ENV.filter((name) => !process.env[name]);

const run = (command) => {
  execSync(command, {
    stdio: "inherit",
    env: process.env,
  });
};

if (missingTinaEnv.length === 0) {
  console.log("[build] Tina env detected. Running Tina codegen build.");
  run("tinacms build --no-client-build-cache");
} else {
  console.warn(
    `[build] Skipping Tina codegen. Missing env var(s): ${missingTinaEnv.join(
      ", ",
    )}.`,
  );
}

console.log("[build] Running Next.js build.");
run("next build");
