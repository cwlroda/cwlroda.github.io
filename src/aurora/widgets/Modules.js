import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import WidgetCard from "./WidgetCard";
import { modules } from "../../portfolio";

const GROUP_GLOW = ["glowA", "glowB", "glowC", "glowD"];

export default function ModulesWidget() {
  const AUR = useAur();
  return (
    <WidgetCard
      title="Coursework"
      subtitle="Modules taken across Imperial and ETH, grouped by area"
      glow="glowA"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {modules.groups.map((g, gi) => (
          <div key={g.title}>
            <div
              style={{
                ...aurMono,
                fontSize: 11,
                color: AUR.mutedHi,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 10,
              }}
            >
              <span
                style={{
                  color: AUR.muted,
                  marginRight: 6,
                }}
              >
                {String(gi + 1).padStart(2, "0")} /
              </span>
              {g.title}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 8,
              }}
            >
              {g.data.map((m) => (
                <a
                  key={m.id + m.name}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: "relative",
                    padding: "12px 14px",
                    border: `1px solid ${AUR.rule}`,
                    borderRadius: 10,
                    background: AUR.panelHi,
                    textDecoration: "none",
                    color: AUR.ink,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      ...aurSans,
                      fontSize: 13,
                      fontWeight: 600,
                      color: AUR.inkBold,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {m.name}
                  </div>
                  {m.languages && m.languages.length > 0 && (
                    <div
                      style={{
                        ...aurMono,
                        fontSize: 10,
                        color: AUR.muted,
                        marginTop: 4,
                      }}
                    >
                      {m.languages.map((l) => l.name).join(" · ")}
                    </div>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
