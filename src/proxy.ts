import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { decodePreviewSession, previewSessionCookie } from "@/lib/auth/preview-session";

function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  );
}

function previewAuthEnabled() {
  const mode = process.env.NEXT_PUBLIC_AUTH_MODE ?? process.env.AUTH_MODE;
  return mode === "preview" || (!hasSupabaseEnv() && mode !== "supabase");
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/app")) {
    return NextResponse.next();
  }

  const nextUrl = new URL("/login", request.url);
  nextUrl.searchParams.set("next", pathname);

  if (previewAuthEnabled()) {
    const preview = decodePreviewSession(request.cookies.get(previewSessionCookie)?.value);
    if (preview) {
      return NextResponse.next();
    }
  }

  if (!hasSupabaseEnv()) {
    return NextResponse.redirect(nextUrl);
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    return NextResponse.redirect(nextUrl);
  }

  return response;
}

export const config = {
  matcher: ["/app/:path*"],
};
