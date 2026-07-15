import { redirect } from "next/navigation";
import { isPreviewAuthEnabled } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import { getPreviewSession } from "@/lib/auth/preview-session";

export type AuthenticatedUser = {
  email: string;
  name: string;
  provider: "preview" | "supabase";
};

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  if (isPreviewAuthEnabled()) {
    const preview = await getPreviewSession();
    if (preview) {
      return {
        email: preview.email,
        name: preview.name,
        provider: "preview",
      };
    }
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user?.email) {
      return null;
    }

    return {
      email: data.user.email,
      name:
        typeof data.user.user_metadata?.name === "string"
          ? data.user.user_metadata.name
          : data.user.email,
      provider: "supabase",
    };
  } catch {
    return null;
  }
}

export async function requireAuthenticatedUser() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/login?next=/app");
  }

  return user;
}
