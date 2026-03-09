import { execSync } from "node:child_process";

const run = (command) => {
  execSync(command, {
    stdio: "inherit",
    env: process.env,
  });
};

console.log("[build] Running Next.js build.");
run("next build");
