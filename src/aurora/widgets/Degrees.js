import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import { getImage } from "../../assets/images";
import { degrees } from "../../portfolio";

const GLOW_CYCLE = ["glowA", "glowB"];

export default function Degrees() {
  const AUR = useAur();
  return (
    <div
      className="aur-edu-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}
    >
      {degrees.degrees.map((d, i) => {
        const logo = getImage(d.logo_path);
        const glow = GLOW_CYCLE[i % GLOW_CYCLE.length];
        return (
          <a
            key={d.title}
            href={d.website_link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "relative",
              background: AUR.panel,
              border: `1px solid ${AUR.rule}`,
              borderRadius: 16,
              padding: 28,
              overflow: "hidden",
              textDecoration: "none",
              color: AUR.ink,
              display: "block",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 280,
                height: 280,
                top: -140,
                right: -140,
                background: `radial-gradient(circle, ${
                  AUR[glow]
                } 0%, transparent 65%)`,
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
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
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
                    alt={d.title}
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
                    }}
                  >
                    {d.alt_name}
                  </span>
                )}
              </div>
              <div
                style={{
                  ...aurMono,
                  fontSize: 11,
                  color: AUR.muted,
                  textAlign: "right",
                }}
              >
                {d.duration}
              </div>
            </div>
            <h3
              style={{
                ...aurSans,
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: "20px 0 4px",
                color: AUR.inkBold,
                position: "relative",
              }}
            >
              {d.title}
            </h3>
            <div
              style={{
                ...aurSans,
                fontSize: 14,
                color: AUR.mutedHi,
                marginBottom: 16,
                position: "relative",
              }}
            >
              {d.subtitle}
            </div>
            <ul
              style={{
                ...aurSans,
                fontSize: 14,
                lineHeight: 1.75,
                color: AUR.mutedHi,
                margin: 0,
                paddingLeft: 0,
                listStyle: "none",
                position: "relative",
              }}
            >
              {d.descriptions.map((n) => (
                <li
                  key={n}
                  style={{ display: "flex", gap: 10, padding: "3px 0" }}
                >
                  <span style={{ color: AUR.link, flexShrink: 0 }}>·</span>
                  <span>{n.replace(/^[⚡\t\s]+/, "")}</span>
                </li>
              ))}
            </ul>
          </a>
        );
      })}
    </div>
  );
}
