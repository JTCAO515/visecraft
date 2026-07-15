import type { DeterministicCheck, EvidenceItem } from "@/lib/proof/types";

function basicSignature(text: string) {
  return text
    .replace(/\s+/g, " ")
    .slice(0, 160);
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs = 5_000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function verifyUrlAvailability(evidence: EvidenceItem): Promise<DeterministicCheck> {
  const checkedAt = new Date().toISOString();
  const url = evidence.sourceUrl;

  if (!url) {
    return {
      evidenceId: evidence.id,
      adapter: "url",
      status: "unavailable",
      checkedAt,
      summary: "URL evidence is missing a source URL.",
    };
  }

  try {
    let response = await fetchWithTimeout(url, {
      method: "HEAD",
      redirect: "follow",
      cache: "no-store",
    });

    if (response.status === 405 || response.status === 403) {
      response = await fetchWithTimeout(url, {
        method: "GET",
        redirect: "follow",
        cache: "no-store",
      });
    }

    const metadata: Record<string, unknown> = {
      status: response.status,
      finalUrl: response.url,
      contentType: response.headers.get("content-type"),
      tls: response.url.startsWith("https://"),
    };

    if (response.ok && response.body && response.headers.get("content-type")?.includes("text")) {
      try {
        const clone = response.clone();
        metadata.contentSignature = basicSignature(await clone.text());
      } catch {
        metadata.contentSignature = "unavailable";
      }
    }

    return {
      evidenceId: evidence.id,
      adapter: "url",
      status: response.ok ? "passed" : "failed",
      checkedAt,
      observedAt: checkedAt,
      summary: response.ok
        ? "The URL is reachable right now. This confirms availability only, not feature behavior or usage."
        : `The URL is not currently reachable. HTTP ${response.status}.`,
      metadata,
    };
  } catch (error) {
    return {
      evidenceId: evidence.id,
      adapter: "url",
      status: "unavailable",
      checkedAt,
      summary: error instanceof Error ? error.message : "URL availability check failed.",
    };
  }
}
