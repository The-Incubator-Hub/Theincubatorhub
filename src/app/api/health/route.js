import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "theincubatorhub-web",
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV || "development",
      commit: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA || "",
    },
    { status: 200 }
  );
}
