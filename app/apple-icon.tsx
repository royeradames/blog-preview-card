import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/* The same mark as app/icon.svg, rendered as the 180 x 180 Home Screen icon. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f4d04e" }}>
        <svg width="150" height="150" viewBox="0 0 64 64">
          <path d="M19 15h16c8 0 13 5 13 11 0 4-2 7-5 9 4 2 6 5 6 9 0 7-5 11-14 11H19V15Zm9 8v9h7c3 0 5-2 5-5s-2-4-5-4h-7Zm0 17v8h8c3 0 5-1 5-4 0-2-2-4-5-4h-8Z" fill="#121212" transform="translate(0 -3)" />
        </svg>
      </div>
    ),
    size,
  );
}
