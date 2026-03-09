import { readFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT_DIR = join(process.cwd(), "content");

/**
 * Loads content from a JSON file in the content directory.
 * @param {string} path - Relative path within content/ (e.g., "home/home.json")
 */
export function loadContent(path) {
  try {
    const fullPath = join(CONTENT_DIR, path);
    const raw = readFileSync(fullPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error(`[content-loader] Failed to load ${path}:`, error.message);
    return null;
  }
}

/**
 * Loads all program page JSON files and returns an array.
 */
export function loadAllPrograms() {
  const { readdirSync } = require("node:fs");
  try {
    const dir = join(CONTENT_DIR, "program-pages");
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    return files.map((f) => {
      try {
        const raw = readFileSync(join(dir, f), "utf-8");
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }).filter(Boolean);
  } catch {
    return [];
  }
}
