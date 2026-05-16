import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";
import { AurChip, AurPh } from "./primitives";
import SectionHead from "./SectionHead";

// `glow` is a theme key (resolved at render time) so washes flip when the
// theme toggles.
const projects = [
  {
    span: 2,
    glow: "glowA",
    kind: "OPEN-SOURCE · FEATURED",
    year: "2023",
    name: "Scalabel — 3D point-cloud annotation",
    desc:
      "Led an intuitive 3D point-cloud annotation workflow on the Scalabel platform, used by Berkeley DeepDrive and external research teams for autonomous-driving datasets.",
    stack: ["Python", "TypeScript", "React", "PointCloud"],
  },
  {
    span: 2,
    glow: "glowB",
    kind: "RESEARCH · SLAM",
    year: "2022",
    name: "DH3D · Hierarchical 3D descriptors",
    desc:
      "Integrated a hierarchical 3D local + global descriptor model into a multi-robot collaborative SLAM stack. Improved cross-robot loop-closure precision.",
    stack: ["Python", "TensorFlow", "MATLAB"],
  },
  {
    glow: "glowB",
    kind: "RESEARCH",
    year: "2022",
    name: "3DFeatNet",
    desc:
      "Weakly-supervised 3D feature detector for point-cloud registration on Oxford RobotCar.",
    stack: ["Python", "TF"],
  },
  {
    glow: "glowC",
    kind: "PRODUCTION · HTX",
    year: "2020",
    name: "Fall Detection",
    desc:
      "Multi-person pose-estimation for fall detection across concurrent CCTV feeds. 83% / F1 91.",
    stack: ["Python", "OpenPifPaf"],
  },
  {
    glow: "glowC",
    kind: "NLP · HTX",
    year: "2020",
    name: "BART Summariser",
    desc:
      "Abstractive news summariser fine-tuned on BART. ROUGE > 0.80 on the production corpus.",
    stack: ["Python", "BART"],
  },
  {
    glow: "glowD",
    kind: "AIHACK 2021",
    year: "2021",
    name: "BITweets",
    desc:
      "Bi-directional LSTM for BTC price prediction with tweet sentiment as side-channel.",
    stack: ["Python", "TF"],
  },
  {
    glow: "glowB",
    kind: "WINNER · HACKVIOLET",
    year: "2021",
    name: "em.",
    desc:
      "Personalised exercise plans for women to reduce menstrual pain. Won Best Domain Award.",
    stack: ["Wix", "Node"],
  },
  {
    glow: "glowD",
    kind: "HACKSHEFFIELD 6",
    year: "2020",
    name: "Virtualso Piano",
    desc:
      "Real-time multi-finger tracking with OpenCV — play a piano on any flat surface.",
    stack: ["Python", "OpenCV"],
  },
  {
    glow: "glowA",
    kind: "FB HACK-A-PROJECT",
    year: "2020",
    name: "Don8te",
    desc:
      "Donation iOS app pairing givers with the needy. Third in the prototype forum.",
    stack: ["Swift", "Firebase"],
  },
  {
    glow: "glowC",
    kind: "BEST 1ST-YEAR",
    year: "2019",
    name: "Dance Dance Conv.",
    desc:
      "Gesture-recognition rhythm game on Xilinx PYNQ-Z1 with CNN inference.",
    stack: ["C++", "Python", "FPGA"],
  },
];

function ProjectCard({ name, kind, year, desc, stack, span = 1, glow }) {
  const AUR = useAur();
  return (
    <div
      className="aur-proj-card"
      style={{
        gridColumn: `span ${span}`,
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        borderRadius: 16,
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AurPh
        h={span === 2 ? 260 : 180}
        label={name.toLowerCase()}
        glow={AUR[glow]}
      />
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              ...aurMono,
              fontSize: 10,
              color: AUR.muted,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {kind}
          </span>
          <span style={{ ...aurMono, fontSize: 11, color: AUR.muted }}>
            {year}
          </span>
        </div>
        <h3
          style={{
            ...aurSans,
            fontSize: span === 2 ? 24 : 19,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            margin: 0,
            color: AUR.inkBold,
            lineHeight: 1.2,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            ...aurSans,
            fontSize: 13.5,
            lineHeight: 1.6,
            color: AUR.mutedHi,
            margin: 0,
            flex: 1,
          }}
        >
          {desc}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginTop: 8,
          }}
        >
          {stack.map((t) => (
            <AurChip key={t} color={AUR.mutedHi}>
              {t}
            </AurChip>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AuroraProjects() {
  const AUR = useAur();
  return (
    <section>
      <SectionHead
        k="03"
        label="Projects"
        title="Things I've built."
        kicker="A working subset of the 14+ projects in the archive — research, hackathons, and weekend code."
      />
      <div
        className="aur-proj-grid"
        style={{
          padding: "0 40px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
      <div
        style={{
          padding: "0 40px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ ...aurSans, fontSize: 14, color: AUR.mutedHi }}>
          + 4 more in the archive
        </span>
        <a
          href="/#/projects"
          style={{
            ...aurSans,
            fontSize: 14,
            fontWeight: 500,
            color: AUR.link,
            textDecoration: "none",
          }}
        >
          View all projects →
        </a>
      </div>
    </section>
  );
}
