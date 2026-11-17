import { ImageResponse } from "next/og";

export const alt = "Usama, Senior Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview card shown when the link is shared on LinkedIn, WhatsApp, etc.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#2f3cff",
          color: "#f2f4ff",
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 800, display: "flex", alignItems: "flex-end" }}>
          usama
          <div style={{ width: 28, height: 9, marginLeft: 6, marginBottom: 6, background: "#ffd23f" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>Senior full-stack</div>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>engineer.</div>
        </div>
        <div style={{ fontSize: 34, color: "#c9ccff", display: "flex" }}>
          React · Node.js · PostgreSQL · AI-assisted workflow
        </div>
      </div>
    ),
    size
  );
}
