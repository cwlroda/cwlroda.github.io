import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import WidgetCard from "./WidgetCard";
import { certifications } from "../../portfolio";

const GLOW_CYCLE = ["glowA", "glowB", "glowC", "glowD"];

export default function CertificationsWidget() {
  const AUR = useAur();
  return (
    <WidgetCard
      title="Certifications"
      subtitle="Courses, credentials and competitive-programming profiles"
      glow="glowB"
    >
      <div
        className="aur-cert-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {certifications.certifications.map((c, i) => (
          <a
            key={c.title + i}
            href={c.certificate_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "relative",
              padding: 16,
              borderRadius: 12,
              border: `1px solid ${AUR.rule}`,
              background: AUR.panelHi,
              textDecoration: "none",
              color: AUR.ink,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              minHeight: 116,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 140,
                height: 140,
                top: -70,
                right: -70,
                background: `radial-gradient(circle, ${
                  AUR[GLOW_CYCLE[i % GLOW_CYCLE.length]]
                } 0%, transparent 65%)`,
                filter: "blur(30px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                ...aurMono,
                fontSize: 10,
                color: AUR.muted,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {c.subtitle || c.alt_name}
            </div>
            <div
              style={{
                position: "relative",
                ...aurSans,
                fontSize: 14,
                fontWeight: 600,
                color: AUR.inkBold,
                letterSpacing: "-0.005em",
                lineHeight: 1.3,
                flex: 1,
              }}
            >
              {c.title}
            </div>
            <div
              style={{
                position: "relative",
                ...aurSans,
                fontSize: 12,
                color: AUR.link,
                fontWeight: 500,
              }}
            >
              View credential →
            </div>
          </a>
        ))}
      </div>
    </WidgetCard>
  );
}
