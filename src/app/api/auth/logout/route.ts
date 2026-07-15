import { NextResponse, type NextRequest } from "next/server";
import { previewSessionCookie } from "@/lib/auth/preview-session";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.delete(previewSessionCookie);

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Supabase may be intentionally absent in preview auth mode.
  }

  return response;
}
