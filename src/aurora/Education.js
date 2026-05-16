import React from "react";
import { AUR, aurMono, aurSans } from "./tokens";
import SectionHead from "./SectionHead";

const schools = [
  {
    name: "ETH Zürich",
    sub: "Exchange MSc · EE & Information Technology",
    dur: "2021 — Now",
    loc: "Zürich, CH",
    glow: AUR.glowA,
    notes: [
      "Swiss-European Mobility Programme scholar",
      "Specialising in real-time 3D multi-object tracking",
      "Modules in robotics and computer vision",
    ],
  },
  {
    name: "Imperial College London",
    sub: "MEng Electronic & Information Engineering",
    dur: "2018 — Now",
    loc: "London, UK",
    glow: AUR.glowB,
    notes: [
      "On track for First Class Honours",
      "UG tutor — Information Processing & Software Systems",
      "Best First Year Project (2019)",
      "Top 15% of cohort, Year 1",
    ],
  },
];

export default function AuroraEducation() {
  return (
    <section>
      <SectionHead
        k="05"
        label="Education"
        title="Schools."
        kicker="Two universities. Currently splitting time between Zürich and London."
      />
      <div
        className="aur-edu-grid"
        style={{
          padding: "0 40px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        {schools.map((s) => (
          <div
            key={s.name}
            style={{
              position: "relative",
              background: AUR.panel,
              border: `1px solid ${AUR.rule}`,
              borderRadius: 16,
              padding: 28,
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
                background: `radial-gradient(circle, ${s.glow} 0%, transparent 65%)`,
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                position: "relative",
              }}
            >
              <div style={{ ...aurMono, fontSize: 12, color: AUR.mutedHi }}>
                {s.dur}
              </div>
              <div style={{ ...aurMono, fontSize: 11, color: AUR.muted }}>
                {s.loc}
              </div>
            </div>
            <h3
              style={{
                ...aurSans,
                fontSize: 26,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: "12px 0 4px",
                color: AUR.inkBold,
                position: "relative",
              }}
            >
              {s.name}
            </h3>
            <div
              style={{
                ...aurSans,
                fontSize: 14,
                color: AUR.mutedHi,
                marginBottom: 20,
                position: "relative",
              }}
            >
              {s.sub}
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
              {s.notes.map((n) => (
                <li
                  key={n}
                  style={{ display: "flex", gap: 10, padding: "3px 0" }}
                >
                  <span style={{ color: AUR.link }}>—</span>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
