import { cookies } from "next/headers";

export const previewSessionCookie = "vc_preview_session";

export type PreviewSession = {
  email: string;
  name: string;
  createdAt: string;
};

export function encodePreviewSession(session: PreviewSession) {
  return Buffer.from(JSON.stringify(session), "utf8").toString("base64url");
}

export function decodePreviewSession(value?: string): PreviewSession | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(value, "base64url").toString("utf8")) as PreviewSession;
    if (!parsed.email || !parsed.name) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export async function getPreviewSession() {
  const cookieStore = await cookies();
  return decodePreviewSession(cookieStore.get(previewSessionCookie)?.value);
}
