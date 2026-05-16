import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";
import { socialMediaLinks } from "../portfolio";

const cards = [
  {
    label: "EMAIL",
    value: "weiloon.c97@gmail.com",
    cta: "Compose →",
    href: "mailto:weiloon.c97@gmail.com",
  },
  {
    label: "GITHUB",
    value: "github.com/cwlroda",
    cta: "See code →",
    href: socialMediaLinks.github,
  },
  {
    label: "LINKEDIN",
    value: "in/weilooncheng",
    cta: "Connect →",
    href: socialMediaLinks.linkedin,
  },
];

export default function AuroraContact() {
  const AUR = useAur();
  return (
    <section
      style={{
        position: "relative",
        padding: "120px 40px",
        marginTop: 64,
        overflow: "hidden",
        borderTop: `1px solid ${AUR.rule}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(60% 60% at 20% 30%, ${AUR.glowA} 0%, transparent 60%),
            radial-gradient(50% 40% at 80% 70%, ${AUR.glowB} 0%, transparent 60%)
          `,
          filter: "blur(20px)",
          opacity: 0.5,
        }}
      />
      <div style={{ position: "relative", maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            ...aurMono,
            fontSize: 12,
            color: AUR.mutedHi,
            marginBottom: 16,
          }}
        >
          06 / Contact
        </div>
        <h2
          className="aur-contact-title"
          style={{
            ...aurSans,
            fontSize: 72,
            lineHeight: 1.05,
            margin: 0,
            letterSpacing: "-0.035em",
            fontWeight: 600,
            color: AUR.inkBold,
            maxWidth: 880,
          }}
        >
          Have a problem worth working on?
        </h2>
        <p
          style={{
            ...aurSans,
            fontSize: 18,
            lineHeight: 1.6,
            color: AUR.mutedHi,
            marginTop: 24,
            maxWidth: 640,
          }}
        >
          Open to research collaborations and perception / robotics roles
          starting Q4 2026. I aim to reply within a working day.
        </p>
        <div
          className="aur-contact-grid"
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            maxWidth: 960,
          }}
        >
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={
                c.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              style={{
                background: AUR.panel,
                border: `1px solid ${AUR.rule}`,
                borderRadius: 16,
                padding: 24,
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  ...aurMono,
                  fontSize: 11,
                  color: AUR.muted,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 12,
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  ...aurSans,
                  fontSize: 18,
                  color: AUR.inkBold,
                  fontWeight: 500,
                  marginBottom: 16,
                  wordBreak: "break-word",
                }}
              >
                {c.value}
              </div>
              <div
                style={{
                  ...aurSans,
                  fontSize: 13,
                  color: AUR.link,
                  fontWeight: 500,
                }}
              >
                {c.cta}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
