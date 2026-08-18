import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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
          background: "linear-gradient(135deg, #d97706 0%, #c85a32 50%, #9f1239 100%)",
          borderRadius: "36px",
          color: "white",
        }}
      >
        <svg
          width="120"
          height="120"
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
            stroke="#fef08a"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Tuscan Sun */}
          <circle cx="34" cy="14" r="4" fill="#fef08a" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
