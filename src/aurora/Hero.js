import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";
import { AurChip, AurPh } from "./primitives";
import { greeting, socialMediaLinks } from "../portfolio";

const stats = [
  ["Currently", "ETH MSc thesis"],
  ["Focus", "CV · SLAM · 3D"],
  ["Years", "5+ in research"],
  ["Projects", "14 shipped"],
];

export default function AuroraHero() {
  const AUR = useAur();
  return (
    <section
      style={{
        position: "relative",
        padding: "120px 40px 80px",
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
            radial-gradient(40% 40% at 80% 30%, ${AUR.glowB} 0%, transparent 60%),
            radial-gradient(50% 40% at 70% 80%, ${AUR.glowC} 0%, transparent 60%)
          `,
          filter: "blur(20px)",
          opacity: 0.6,
        }}
      />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <AurChip color={AUR.ok}>● Available Q4 2026</AurChip>
          <AurChip color={AUR.link}>Zürich · GMT+1</AurChip>
        </div>

        <h1
          className="aur-hero-title"
          style={{
            ...aurSans,
            fontSize: 80,
            lineHeight: 1.04,
            margin: 0,
            letterSpacing: "-0.035em",
            fontWeight: 600,
            color: AUR.inkBold,
            maxWidth: 1100,
          }}
        >
          AI engineer building{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            perception systems
          </span>{" "}
          for the physical world.
        </h1>

        <p
          style={{
            ...aurSans,
            fontSize: 19,
            lineHeight: 1.6,
            color: AUR.mutedHi,
            marginTop: 28,
            maxWidth: 720,
          }}
        >
          I'm {greeting.data.nickname}. Finishing a master's at ETH Zürich on
          real-time 3D multi-object tracking. Previously researched SLAM at DSO
          and shipped ML &amp; surveillance tooling at HTX. I care about systems
          that perceive — point clouds, video, language — and the messy
          engineering that takes them from notebooks to production.
        </p>

        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <a
            href={greeting.data.mail}
            style={{
              ...aurSans,
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 20px",
              borderRadius: 10,
              background: AUR.inkBold,
              color: AUR.inkInverse,
              textDecoration: "none",
            }}
          >
            Get in touch →
          </a>
          <a
            href={greeting.data.resumeLink}
            style={{
              ...aurSans,
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 20px",
              borderRadius: 10,
              background: AUR.panel,
              color: AUR.ink,
              textDecoration: "none",
              border: `1px solid ${AUR.rule}`,
            }}
          >
            View résumé
          </a>
          <a
            href={socialMediaLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...aurSans,
              fontSize: 14,
              fontWeight: 500,
              padding: "12px 20px",
              borderRadius: 10,
              color: AUR.mutedHi,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ↗ github.com/cwlroda
          </a>
        </div>

        <div
          className="aur-hero-panel"
          style={{
            marginTop: 80,
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 24,
            position: "relative",
          }}
        >
          <div
            className="aur-hero-stats"
            style={{
              background: AUR.panel,
              border: `1px solid ${AUR.rule}`,
              borderRadius: 16,
              padding: 24,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {stats.map(([k, v], i) => (
              <div
                key={k}
                style={{
                  borderLeft: i === 0 ? "none" : `1px solid ${AUR.rule}`,
                  paddingLeft: i === 0 ? 0 : 24,
                }}
              >
                <div
                  style={{
                    ...aurMono,
                    fontSize: 11,
                    color: AUR.muted,
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    ...aurSans,
                    fontSize: 16,
                    color: AUR.inkBold,
                    fontWeight: 500,
                  }}
                >
                  {v}
                </div>
              </div>
            ))}
          </div>
          <div>
            <AurPh h={140} label="portrait" />
          </div>
        </div>
      </div>
    </section>
  );
}
