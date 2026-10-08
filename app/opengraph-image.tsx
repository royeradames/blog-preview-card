import { ImageResponse } from "next/og";

export const alt = "Blog Preview Card: HTML & CSS foundations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4d04e" }}>
        <div style={{ display: "flex", flexDirection: "column", width: 820, padding: 64, borderRadius: 40, background: "#ffffff", border: "3px solid #111111", boxShadow: "20px 20px 0 #111111" }}>
          <div style={{ display: "flex", alignSelf: "flex-start", padding: "8px 24px", borderRadius: 8, background: "#f4d04e", fontSize: 30, fontWeight: 800, color: "#111111" }}>Learning</div>
          <div style={{ marginTop: 32, fontSize: 72, fontWeight: 800, color: "#111111" }}>HTML &amp; CSS foundations</div>
          <div style={{ marginTop: 24, fontSize: 34, color: "#6b6b6b" }}>These languages are the backbone of every website.</div>
        </div>
      </div>
    ),
    size,
  );
}
