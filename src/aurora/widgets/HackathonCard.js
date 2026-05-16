import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import { AurChip } from "../primitives";
import { getImage } from "../../assets/images";

const GLOW_CYCLE = ["glowA", "glowB", "glowC", "glowD"];

export default function HackathonCard({ repo, index = 0 }) {
  const AUR = useAur();
  const glow = GLOW_CYCLE[index % GLOW_CYCLE.length];
  const logo = getImage(repo.logo_path);
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
        gap: 14,
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
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 10,
            background: AUR.panelHi,
            border: `1px solid ${AUR.rule}`,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {logo ? (
            <img
              src={logo}
              alt={repo.alt_name}
              style={{
                width: "70%",
                height: "70%",
                objectFit: "contain",
              }}
            />
          ) : (
            <span style={{ ...aurMono, fontSize: 16, color: AUR.muted }}>
              {repo.name[0]}
            </span>
          )}
        </div>
        <span
          style={{
            ...aurMono,
            fontSize: 10,
            color: AUR.muted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {repo.alt_name}
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <h3
          style={{
            ...aurSans,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            margin: 0,
            color: AUR.inkBold,
            lineHeight: 1.2,
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
            margin: "8px 0 0",
          }}
        >
          {repo.description}
        </p>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginTop: "auto",
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
