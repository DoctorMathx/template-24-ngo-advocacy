import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PLUM = "#3D0C3A";
const CREAM = "#FBF3EA";
const MAGENTA = "#D42A72";
const TANGERINE = "#FF8A3D";

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: CREAM, position: "relative", fontFamily: "sans-serif", color: PLUM }}>
        {/* magenta slab */}
        <div style={{ position: "absolute", right: -60, top: -40, width: 520, height: 720, background: MAGENTA, transform: "rotate(8deg)", borderLeft: `10px solid ${PLUM}` }} />
        {/* sticker */}
        <div
          style={{
            position: "absolute", right: 120, top: 150, width: 250, height: 250, borderRadius: 999, background: TANGERINE,
            border: `8px solid ${PLUM}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            transform: "rotate(-12deg)", fontSize: 38, fontWeight: 900, textAlign: "center", lineHeight: 1,
          }}
        >
          <div style={{ display: "flex" }}>SIGN.</div>
          <div style={{ display: "flex" }}>SHARE.</div>
          <div style={{ display: "flex" }}>GIVE.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: MAGENTA, border: `5px solid ${PLUM}`, color: CREAM, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900 }}>HV</div>
            <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: 1 }}>{siteConfig.brand.name.toUpperCase()}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 108, fontWeight: 900, lineHeight: 0.9, letterSpacing: -4 }}>
            <div style={{ display: "flex" }}>LOUD FOR</div>
            <div style={{ display: "flex", color: MAGENTA }}>EVERY</div>
            <div style={{ display: "flex" }}>WOMAN.</div>
          </div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, opacity: 0.85 }}>
            End GBV · Legal aid · Women in power · {siteConfig.brand.domain}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
