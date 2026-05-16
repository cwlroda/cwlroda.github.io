import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import { AurChip } from "../primitives";
import { getImage } from "../../assets/images";
import { experience } from "../../portfolio";

const GLOW_CYCLE = ["glowA", "glowB", "glowC", "glowD"];

function ExpRow({ item, glow, index }) {
  const AUR = useAur();
  const current = item.duration.toLowerCase().includes("present");
  const logo = getImage(item.logo_path);
  return (
    <a
      href={item.link || item.company_url}
      target="_blank"
      rel="noopener noreferrer"
      className="aur-exp-row"
      style={{
        position: "relative",
        padding: "24px",
        borderRadius: 16,
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        marginBottom: 14,
        display: "grid",
        gridTemplateColumns: "72px 200px 1fr 200px",
        gap: 24,
        alignItems: "flex-start",
        overflow: "hidden",
        textDecoration: "none",
        color: AUR.ink,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          top: -130,
          left: -130,
          background: `radial-gradient(circle, ${AUR[glow]} 0%, transparent 65%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
          opacity: current ? 1 : 0.6,
        }}
      />
      <div
        style={{
          position: "relative",
          width: 56,
          height: 56,
          borderRadius: 12,
          background: AUR.panelHi,
          border: `1px solid ${AUR.rule}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {logo ? (
          <img
            src={logo}
            alt={item.company}
            style={{
              width: "70%",
              height: "70%",
              objectFit: "contain",
            }}
          />
        ) : (
          <span
            style={{
              ...aurMono,
              fontSize: 18,
              color: AUR.muted,
              fontWeight: 600,
            }}
          >
            {item.company[0]}
          </span>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            ...aurMono,
            fontSize: 12,
            color: AUR.mutedHi,
            marginBottom: 6,
          }}
        >
          {item.duration}
        </div>
        <div style={{ ...aurMono, fontSize: 11, color: AUR.muted }}>
          {item.location}
        </div>
        {current && (
          <div
            style={{
              ...aurMono,
              fontSize: 10,
              color: AUR.ok,
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: AUR.ok,
                boxShadow: `0 0 6px ${AUR.ok}`,
              }}
            />
            ACTIVE
          </div>
        )}
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            ...aurSans,
            fontSize: 18,
            fontWeight: 600,
            color: AUR.inkBold,
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            ...aurSans,
            fontSize: 14,
            color: AUR.mutedHi,
            marginTop: 4,
            marginBottom: 12,
          }}
        >
          {item.company}
        </div>
        <p
          style={{
            ...aurSans,
            fontSize: 14,
            lineHeight: 1.65,
            color: AUR.mutedHi,
            margin: 0,
          }}
        >
          {item.description}
        </p>
      </div>

      <div
        style={{
          position: "relative",
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}
      >
        <AurChip color={AUR.link}>↗ open</AurChip>
      </div>
    </a>
  );
}

export default function ExperienceList() {
  return (
    <div>
      {experience.internships.experiences.map((e, i) => (
        <ExpRow
          key={e.company + e.title + i}
          item={e}
          glow={GLOW_CYCLE[i % GLOW_CYCLE.length]}
          index={i}
        />
      ))}
    </div>
  );
}
