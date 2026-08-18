import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
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
          background: "linear-gradient(135deg, #0d9488 0%, #1d4ed8 55%, #172554 100%)",
          borderRadius: "12px",
          color: "white",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Waves */}
          <path
            d="M6 36C12 34 16 38 22 36C28 34 32 38 42 35"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.9"
          />
          {/* Boat Hull */}
          <path
            d="M8 29C13 32 35 32 40 29L43 23H5L8 29Z"
            fill="white"
          />
          {/* Pole */}
          <path
            d="M32 10L16 31"
            stroke="#5eead4"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Sun glint */}
          <circle cx="34" cy="14" r="4" fill="#5eead4" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
