import { randomBytes } from "node:crypto";

/**
 * Generates a unique request ID for tracing.
 */
export function getRequestId() {
  return randomBytes(8).toString("hex");
}

/**
 * Logs an informational message with structured metadata.
 */
export function logInfo(message, meta = {}) {
  const entry = {
    level: "info",
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
  console.log(JSON.stringify(entry));
}

/**
 * Logs an error message with structured metadata.
 */
export function logError(message, meta = {}) {
  const entry = {
    level: "error",
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
  console.error(JSON.stringify(entry));
}

/**
 * Creates an audit log entry in the database.
 */
export async function createAuditLog({ userId, action, resource, resourceId, details, ipAddress, userAgent }) {
  try {
    const prisma = (await import("@/lib/prisma.mjs")).default;
    await prisma.auditLog.create({
      data: {
        userId: userId || null,
        action,
        resource,
        resourceId: resourceId || null,
        details: details || null,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    });
  } catch (error) {
    logError("[audit] Failed to create audit log", { error: error.message });
  }
}
