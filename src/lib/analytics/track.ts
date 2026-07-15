"use client";

export type AnalyticsEvent =
  | "landing_page_visit"
  | "view_demo_click"
  | "get_started_click"
  | "sign_in_click"
  | "login_success"
  | "login_failure"
  | "signup_start"
  | "project_creation_click";

export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string>) {
  const payload = JSON.stringify({
    event,
    properties,
    path: typeof window === "undefined" ? "" : window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    navigator.sendBeacon("/api/analytics", payload);
    return;
  }

  void fetch("/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}
