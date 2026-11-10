import { ImageResponse } from "next/og";

export const alt = "LOOK CLOSER — ARK STUDIO | Abdulrehman Khalid";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#050505",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Hairline border frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        />

        {/* Outer ambient red radial glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255, 42, 31, 0.35) 0%, rgba(255, 42, 31, 0.05) 50%, transparent 75%)",
          }}
        />

        {/* Concentric red lens circles */}
        <div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "1px dashed rgba(255, 42, 31, 0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "2px solid #FF2A1F",
            boxShadow: "0 0 35px rgba(255, 42, 31, 0.8)",
          }}
        />

        {/* Center monogram mark */}
        <div
          style={{
            width: 72,
            height: 72,
            backgroundColor: "#FF2A1F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            boxShadow: "0 0 25px rgba(255, 42, 31, 0.6)",
          }}
        >
          <span style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 900, letterSpacing: 4 }}>
            AK
          </span>
        </div>

        {/* Typography */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 48,
          }}
        >
          <span
            style={{
              color: "#8B9099",
              fontSize: 14,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            ARK STUDIO • SARGODHA, PK
          </span>
          <span
            style={{
              color: "#EDE9E3",
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            LOOK CLOSER.
          </span>
          <span
            style={{
              color: "#8B9099",
              fontSize: 18,
              letterSpacing: 2,
              marginTop: 12,
            }}
          >
            An Infinite-Zoom Portfolio by Abdulrehman Khalid
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
