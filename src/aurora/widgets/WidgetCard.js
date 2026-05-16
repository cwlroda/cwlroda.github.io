import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";

export default function WidgetCard({
  title,
  subtitle,
  glow = "glowA",
  children,
  pad = 24,
  style,
}) {
  const AUR = useAur();
  return (
    <div
      style={{
        position: "relative",
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        borderRadius: 16,
        padding: pad,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          top: -130,
          right: -130,
          background: `radial-gradient(circle, ${AUR[glow]} 0%, transparent 65%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      {(title || subtitle) && (
        <div style={{ position: "relative", marginBottom: 18 }}>
          {title && (
            <div
              style={{
                ...aurSans,
                fontSize: 15,
                fontWeight: 600,
                color: AUR.inkBold,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </div>
          )}
          {subtitle && (
            <div
              style={{
                ...aurMono,
                fontSize: 11,
                color: AUR.muted,
                marginTop: 4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      )}
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}
