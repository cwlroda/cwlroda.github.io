import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import { AurChip } from "../primitives";

const GLOW_CYCLE = ["glowA", "glowB", "glowC", "glowD"];

export default function ProjectArchiveCard({ repo, index = 0 }) {
  const AUR = useAur();
  const glow = GLOW_CYCLE[index % GLOW_CYCLE.length];
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "relative",
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        borderRadius: 16,
        padding: 24,
        textDecoration: "none",
        color: AUR.ink,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        overflow: "hidden",
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
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            ...aurMono,
            fontSize: 10,
            color: AUR.muted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {repo.alt_name || "Open source"}
        </span>
        <span style={{ ...aurMono, fontSize: 11, color: AUR.muted }}>
          ↗ open
        </span>
      </div>
      <h3
        style={{
          ...aurSans,
          fontSize: 19,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          margin: 0,
          color: AUR.inkBold,
          lineHeight: 1.25,
          position: "relative",
        }}
      >
        {repo.name}
      </h3>
      <p
        style={{
          ...aurSans,
          fontSize: 13.5,
          lineHeight: 1.6,
          color: AUR.mutedHi,
          margin: 0,
          position: "relative",
          flex: 1,
        }}
      >
        {repo.description}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          position: "relative",
        }}
      >
        {(repo.languages || []).map((l) => (
          <AurChip key={l.name} color={AUR.mutedHi}>
            {l.name}
          </AurChip>
        ))}
      </div>
    </a>
  );
}
