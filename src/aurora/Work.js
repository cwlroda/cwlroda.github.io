import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";
import { AurChip } from "./primitives";
import SectionHead from "./SectionHead";

// `glow` is a key on the theme object (e.g. "glowA") rather than a literal
// rgba so the wash adjusts intensity when the theme flips.
const experiences = [
  {
    year: "2024 — Now",
    role: "Robotics Research Intern",
    org: "DSO National Laboratories",
    where: "Singapore · hybrid",
    desc:
      "Building a distributed C++ framework for multi-robot collaborative SLAM with real-time semantic mapping, fault tolerance, and on-device optimisation for embedded compute.",
    stack: ["C++", "ROS", "PCL", "CUDA"],
    glow: "glowA",
    current: true,
  },
  {
    year: "2020 — 2021",
    role: "Data Science & AI Intern",
    org: "HTX (Home Team S&T)",
    where: "Singapore · remote",
    desc:
      "Built an abstractive BART news summariser (ROUGE > 0.80) and a multi-person pose-based fall detector across concurrent video streams — 83% accuracy, F1 91.",
    stack: ["Python", "PyTorch", "OpenPifPaf"],
    glow: "glowB",
  },
  {
    year: "2019",
    role: "Product Development Intern",
    org: "Fashion Learning Hive",
    where: "Singapore · in-person",
    desc:
      "Rebuilt the company site end-to-end and shipped a custom JS API to keep course data in sync with the LMS. Reached thousands of views in the first month.",
    stack: ["JavaScript", "WordPress"],
    glow: "glowC",
  },
  {
    year: "2013",
    role: "Product Optimisation Intern",
    org: "Trek 2000",
    where: "Singapore · in-person",
    desc:
      "My first taste of industry as a school-age intern. Optimised C++ algorithms for embedded security products.",
    stack: ["C++", "Embedded"],
    glow: "glowD",
  },
];

function ExpRow({ year, role, org, where, desc, stack, glow, current }) {
  const AUR = useAur();
  return (
    <div
      className="aur-exp-row"
      style={{
        position: "relative",
        padding: "24px",
        borderRadius: 16,
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        marginBottom: 12,
        display: "grid",
        gridTemplateColumns: "160px 1fr 1fr 220px",
        gap: 24,
        alignItems: "flex-start",
        overflow: "hidden",
      }}
    >
      {current && (
        <div
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            top: -120,
            left: -120,
            background: `radial-gradient(circle, ${AUR[glow]} 0%, transparent 65%)`,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ position: "relative" }}>
        <div
          style={{
            ...aurMono,
            fontSize: 12,
            color: AUR.mutedHi,
            marginBottom: 6,
          }}
        >
          {year}
        </div>
        <div style={{ ...aurMono, fontSize: 11, color: AUR.muted }}>
          {where}
        </div>
        {current && (
          <div
            style={{
              ...aurMono,
              fontSize: 10,
              color: AUR.ok,
              marginTop: 8,
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
          {role}
        </div>
        <div
          style={{
            ...aurSans,
            fontSize: 14,
            color: AUR.mutedHi,
            marginTop: 4,
          }}
        >
          {org}
        </div>
      </div>
      <p
        style={{
          ...aurSans,
          fontSize: 14,
          lineHeight: 1.6,
          color: AUR.mutedHi,
          margin: 0,
          position: "relative",
        }}
      >
        {desc}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        {stack.map((t) => (
          <AurChip key={t} color={AUR.mutedHi}>
            {t}
          </AurChip>
        ))}
      </div>
    </div>
  );
}

export default function AuroraWork() {
  return (
    <section>
      <SectionHead
        k="02"
        label="Experience"
        title="Where I've worked."
        kicker="Reverse chronological. Research, agencies, and a teenage internship that taught me Makefiles."
      />
      <div style={{ padding: "0 40px 32px", maxWidth: 1280, margin: "0 auto" }}>
        {experiences.map((e) => (
          <ExpRow key={e.role + e.year} {...e} />
        ))}
      </div>
    </section>
  );
}
