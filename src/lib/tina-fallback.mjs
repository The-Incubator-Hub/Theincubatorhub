import { readFile } from "node:fs/promises";
import path from "node:path";

export function isTinaUnavailableError(error) {
  const causeCode = error?.cause?.code;
  const message = String(error?.message || "").toLowerCase();
  return (
    causeCode === "ECONNREFUSED" ||
    message.includes("fetch failed") ||
    message.includes("client not configured properly")
  );
}

export function logTinaFallback(context, error) {
  if (isTinaUnavailableError(error)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[${context}] Tina unavailable; using local fallback data.`);
    }
    return;
  }
  console.error(`[${context}]`, error);
}

export async function loadCollectionDocument(collection, fileName, rootKey) {
  const filePath = path.join(process.cwd(), "content", collection, fileName);
  try {
    const raw = await readFile(filePath, "utf8");
    const json = JSON.parse(raw);
    return rootKey ? { [rootKey]: json } : json;
  } catch (error) {
    console.error(
      `[fallback] Failed to load content/${collection}/${fileName}:`,
      error
    );
    return rootKey ? { [rootKey]: {} } : {};
  }
}

export async function loadTinaSingleton({
  queryFn,
  variables,
  fallbackCollection,
  fallbackFile,
  rootKey,
  context,
}) {
  let data = {};
  let query = {};
  let resolvedVariables = variables;

  try {
    const res = await queryFn(variables);
    query = res.query;
    data = res.data;
    resolvedVariables = res.variables;
  } catch (error) {
    logTinaFallback(context, error);
  }

  if (!data?.[rootKey]) {
    const fallback = await loadCollectionDocument(
      fallbackCollection,
      fallbackFile,
      rootKey
    );
    if (fallback?.[rootKey]) {
      data = { ...data, ...fallback };
    }
  }

  return { data, query, variables: resolvedVariables };
}
