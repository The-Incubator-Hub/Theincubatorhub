const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const routes = [
  "/",
  "/about",
  "/blog",
  "/resources",
  "/programs/skill-up",
  "/api/health",
];

const failures = [];

for (const route of routes) {
  const url = `${baseUrl}${route}`;
  try {
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      failures.push(`${route} -> ${res.status}`);
    } else {
      console.log(`[smoke] ok ${route} (${res.status})`);
    }
  } catch (error) {
    failures.push(`${route} -> ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error("[smoke] failures:");
  for (const entry of failures) {
    console.error(` - ${entry}`);
  }
  process.exit(1);
}

console.log("[smoke] all checks passed");
