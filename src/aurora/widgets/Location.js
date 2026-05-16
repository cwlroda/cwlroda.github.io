import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";

export default function LocationWidget() {
  const AUR = useAur();
  const gridStroke = AUR.name === "dark" ? "#1f2330" : "#dde3ec";
  const roadStroke = AUR.name === "dark" ? "#2a2f3d" : "#cdd5e0";
  const waterFill = AUR.name === "dark" ? "#1a2b3f" : "#b9d4ec";
  const cardBg =
    AUR.name === "dark" ? "rgba(19,22,30,0.85)" : "rgba(255,255,255,0.95)";

  return (
    <div
      style={{
        position: "relative",
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        borderRadius: 16,
        overflow: "hidden",
        height: 280,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="aur-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke={gridStroke}
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#aur-grid)" />
        <path
          d="M 0 80 Q 200 60 400 110 T 800 90"
          stroke={roadStroke}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 50 200 L 280 240 L 480 200 L 700 260"
          stroke={roadStroke}
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 120 50 L 130 350"
          stroke={roadStroke}
          strokeWidth="2"
          fill="none"
        />
        <ellipse
          cx="380"
          cy="280"
          rx="160"
          ry="55"
          fill={waterFill}
          opacity={AUR.name === "dark" ? 0.5 : 0.7}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, ${AUR.glowA} 0%, transparent 65%)`,
          filter: "blur(50px)",
          opacity: 0.7,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: AUR.link,
          border: `3px solid ${AUR.panel}`,
          boxShadow: `0 0 0 8px ${AUR.link}33, 0 4px 16px ${AUR.link}55`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          padding: "10px 14px",
          background: cardBg,
          borderRadius: 10,
          backdropFilter: "blur(8px)",
          border: `1px solid ${AUR.rule}`,
        }}
      >
        <div
          style={{
            ...aurMono,
            fontSize: 10,
            color: AUR.muted,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Currently
        </div>
        <div
          style={{
            ...aurSans,
            fontSize: 16,
            fontWeight: 600,
            color: AUR.inkBold,
            marginTop: 2,
            letterSpacing: "-0.01em",
          }}
        >
          Singapore, SG
        </div>
        <div
          style={{
            ...aurMono,
            fontSize: 11,
            color: AUR.muted,
            marginTop: 2,
          }}
        >
          1.3521° N, 103.8198° E · GMT+8
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          background: cardBg,
          borderRadius: 10,
          padding: 12,
          ...aurSans,
          fontSize: 12,
          color: AUR.ink,
          display: "flex",
          justifyContent: "space-between",
          border: `1px solid ${AUR.rule}`,
        }}
      >
        <span>⏱ Replies usually within a working day</span>
        <span style={{ color: AUR.muted }}>☀ 30°C · humid</span>
      </div>
    </div>
  );
}
