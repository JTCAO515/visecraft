import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#06090b",
          color: "#e8edf4",
          padding: 72,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 24, height: 46, background: "#34d399", transform: "skewX(-18deg)", borderRadius: 4 }} />
            <div style={{ width: 24, height: 46, background: "#60a5fa", transform: "skewX(18deg)", borderRadius: 4 }} />
          </div>
          ViseCraft
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#34d399", fontSize: 18, letterSpacing: 4, textTransform: "uppercase" }}>
            Living pitch pages
          </div>
          <div style={{ marginTop: 24, maxWidth: 880, fontSize: 76, lineHeight: 1, fontWeight: 700 }}>
            Turn project progress into an investor-ready story.
          </div>
          <div style={{ marginTop: 28, maxWidth: 820, color: "#9aa7b5", fontSize: 28, lineHeight: 1.35 }}>
            Verified timelines, evidence-backed milestones and founder-ready updates.
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, color: "#9aa7b5", fontSize: 22 }}>
          <span>GitHub-connected</span>
          <span>Evidence-first</span>
          <span>Founder, Investor and Public views</span>
        </div>
      </div>
    ),
    size,
  );
}
