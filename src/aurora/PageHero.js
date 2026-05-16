import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";
import { AurChip } from "./primitives";

export default function PageHero({
  kicker,
  title,
  description,
  chips,
}) {
  const AUR = useAur();
  return (
    <section
      style={{
        position: "relative",
        padding: "96px 40px 56px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(60% 50% at 15% 20%, ${AUR.glowA} 0%, transparent 60%),
            radial-gradient(40% 40% at 80% 30%, ${AUR.glowB} 0%, transparent 60%)
          `,
          filter: "blur(20px)",
          opacity: 0.6,
        }}
      />
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        {kicker && (
          <div
            style={{
              ...aurMono,
              fontSize: 12,
              color: AUR.muted,
              marginBottom: 14,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {kicker}
          </div>
        )}
        <h1
          className="aur-page-title"
          style={{
            ...aurSans,
            fontSize: 64,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.035em",
            fontWeight: 600,
            color: AUR.inkBold,
            maxWidth: 900,
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              ...aurSans,
              fontSize: 18,
              lineHeight: 1.6,
              color: AUR.mutedHi,
              marginTop: 20,
              maxWidth: 720,
            }}
          >
            {description}
          </p>
        )}
        {chips && chips.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 24,
              flexWrap: "wrap",
            }}
          >
            {chips.map((c) => (
              <AurChip key={c.label} color={c.color}>
                {c.label}
              </AurChip>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
