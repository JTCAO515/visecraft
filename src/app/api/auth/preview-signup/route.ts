import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { encodePreviewSession, previewSessionCookie } from "@/lib/auth/preview-session";
import { isPreviewAuthEnabled } from "@/lib/supabase/config";

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(8),
  acceptedTerms: z.literal(true),
});

export async function POST(request: NextRequest) {
  if (!isPreviewAuthEnabled()) {
    return NextResponse.json({ error: "Preview auth is disabled." }, { status: 403 });
  }

  const parsed = signupSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ error: "Complete all fields and accept the terms." }, { status: 400 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: previewSessionCookie,
    value: encodePreviewSession({
      email: parsed.data.email,
      name: parsed.data.name,
      createdAt: new Date().toISOString(),
    }),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
