import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3D0C3A",
          color: "#FF8A3D",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "-0.04em",
          borderRadius: 8,
        }}
      >
        HV
      </div>
    ),
    { ...size },
  );
}
