import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "BacalaoWorld";
  const subtitle =
    searchParams.get("subtitle") || "Alt om bacalao og klippfisk";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #3C1810 0%, #8B4513 50%, #D2691E 100%)",
          padding: "60px 80px",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "white",
              fontSize: title.length > 40 ? "48px" : "64px",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "28px",
              marginTop: "20px",
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "70px",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 80px",
          }}
        >
          <div
            style={{ color: "white", fontSize: "22px", fontWeight: 700 }}
          >
            BacalaoWorld
          </div>
          <div
            style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}
          >
            bacalaoworld.no
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
