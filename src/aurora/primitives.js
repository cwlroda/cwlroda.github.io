import React from "react";
import { AUR, aurMono } from "./tokens";

export function AurPh({ h = 200, label = "image", glow }) {
  return (
    <div
      style={{
        width: "100%",
        height: h,
        borderRadius: 12,
        background: AUR.panelHi,
        border: `1px solid ${AUR.rule}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        color: AUR.muted,
        ...aurMono,
        fontSize: 11,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "70%",
          height: "120%",
          top: "-20%",
          left: "15%",
          background: `radial-gradient(circle, ${
            glow || AUR.glowA
          } 0%, transparent 65%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.5,
          backgroundImage:
            "radial-gradient(circle, #232735 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      <span style={{ position: "relative" }}>[ {label} ]</span>
    </div>
  );
}

export function AurChip({ children, color = AUR.link }) {
  return (
    <span
      style={{
        ...aurMono,
        fontSize: 11,
        padding: "4px 10px",
        borderRadius: 999,
        background: `${color}14`,
        color,
        border: `1px solid ${color}22`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
