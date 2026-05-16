import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import WidgetCard from "./WidgetCard";

const items = [
  {
    yr: "2021",
    t: "Best Domain Award",
    sub: "HackViolet 2021 · em.",
    icon: "★",
    glow: "glowB",
  },
  {
    yr: "2021",
    t: "3rd Place",
    sub: "AIHack 2021 · BITweets",
    icon: "◆",
    glow: "glowA",
  },
  {
    yr: "2020",
    t: "3rd Place",
    sub: "FB Hack-A-Project · Don8te",
    icon: "◆",
    glow: "glowC",
  },
  {
    yr: "2020",
    t: "Finalist",
    sub: "Hacklytics 2021",
    icon: "▲",
    glow: "glowD",
  },
  {
    yr: "2019",
    t: "Best First-Year Project",
    sub: "Imperial EEE · Dance Dance Convolution",
    icon: "✦",
    glow: "glowA",
  },
  {
    yr: "2018",
    t: "SEMP Scholar",
    sub: "Swiss-European Mobility Programme",
    icon: "✷",
    glow: "glowB",
  },
];

export default function AwardsWidget() {
  const AUR = useAur();
  return (
    <WidgetCard
      title="Awards & recognition"
      subtitle="Where the work earned something other than a paycheck"
      glow="glowB"
    >
      <div
        className="aur-awards-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              border: `1px solid ${AUR.rule}`,
              borderRadius: 12,
              padding: 14,
              background: AUR.panelHi,
              overflow: "hidden",
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
                  AUR[it.glow]
                } 0%, transparent 65%)`,
                filter: "blur(30px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: 18, color: AUR.link }}>{it.icon}</span>
              <span style={{ ...aurMono, fontSize: 10, color: AUR.muted }}>
                {it.yr}
              </span>
            </div>
            <div
              style={{
                ...aurSans,
                fontSize: 14,
                fontWeight: 600,
                color: AUR.inkBold,
                marginTop: 12,
                letterSpacing: "-0.005em",
                position: "relative",
              }}
            >
              {it.t}
            </div>
            <div
              style={{
                ...aurSans,
                fontSize: 12,
                color: AUR.mutedHi,
                marginTop: 2,
                position: "relative",
              }}
            >
              {it.sub}
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
