import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { join, extname } from "node:path";
import { randomBytes } from "node:crypto";
import { getAuthSession } from "@/lib/auth.mjs";
import { consumeRateLimit } from "@/lib/rate-limit.mjs";
import { logInfo, logError, getRequestId } from "@/lib/logger.mjs";

const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const ALLOWED_EXTENSIONS = [".pdf", ".jpg", ".jpeg", ".png", ".webp", ".gif"];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
  const requestId = getRequestId();

  try {
    const session = await getAuthSession();
    if (!session) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    // Rate limit: 10 uploads per hour per user
    const rl = consumeRateLimit(`upload:${session.user.id}`, 10, 60 * 60 * 1000);
    if (!rl.allowed) {
      return NextResponse.json(
        { error: "Upload limit reached. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfter) } }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // Validate file size
    const bytes = await file.arrayBuffer();
    if (bytes.byteLength > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File size must be under 5MB." }, { status: 400 });
    }

    // Validate mime type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF and image files are allowed." }, { status: 400 });
    }

    // Validate extension
    const ext = extname(file.name || "").toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ error: "Invalid file extension." }, { status: 400 });
    }

    // Generate unique filename
    const uniqueName = `${randomBytes(16).toString("hex")}${ext}`;
    const uploadDir = join(process.cwd(), "public", "incubator-media", "uploads", session.user.id);

    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, uniqueName);
    await writeFile(filePath, Buffer.from(bytes));

    const publicUrl = `/incubator-media/uploads/${session.user.id}/${uniqueName}`;

    logInfo("[upload] File uploaded", { requestId, userId: session.user.id, filename: uniqueName });

    return NextResponse.json({ ok: true, data: { url: publicUrl, name: file.name, size: bytes.byteLength } });
  } catch (error) {
    logError("[upload] Error", { requestId, error: error.message });
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
