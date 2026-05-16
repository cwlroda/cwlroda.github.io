import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";
import SectionHead from "./SectionHead";

const groups = [
  {
    h: "Machine Learning / CV",
    glow: "glowA",
    items: [
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "OpenPifPaf",
      "NumPy",
      "Jupyter",
      "scikit-learn",
      "HuggingFace",
    ],
  },
  {
    h: "Systems / Robotics",
    glow: "glowB",
    items: ["C", "C++", "CUDA", "ROS", "PCL", "Linux", "Bash", "Verilog"],
  },
  {
    h: "Product / Web",
    glow: "glowC",
    items: [
      "Python",
      "TypeScript",
      "React",
      "Node.js",
      "F#",
      "Electron",
      "Swift",
      "Flask",
    ],
  },
  {
    h: "Infra / Ops",
    glow: "glowD",
    items: [
      "Docker",
      "AWS",
      "GCP",
      "Firebase",
      "GitHub Actions",
      "MySQL",
      "Heroku",
      "Git",
    ],
  },
];

export default function AuroraStack() {
  const AUR = useAur();
  return (
    <section>
      <SectionHead
        k="04"
        label="Stack"
        title="Tools I reach for."
        kicker="What's loaded in muscle memory. Grouped by domain."
      />
      <div
        className="aur-stack-grid"
        style={{
          padding: "0 40px 32px",
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
        }}
      >
        {groups.map((g) => (
          <div
            key={g.h}
            style={{
              position: "relative",
              background: AUR.panel,
              border: `1px solid ${AUR.rule}`,
              borderRadius: 16,
              padding: 24,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 240,
                height: 240,
                top: -120,
                right: -120,
                background: `radial-gradient(circle, ${
                  AUR[g.glow]
                } 0%, transparent 65%)`,
                filter: "blur(40px)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                ...aurMono,
                fontSize: 11,
                color: AUR.mutedHi,
                marginBottom: 16,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                position: "relative",
              }}
            >
              {g.h}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                position: "relative",
              }}
            >
              {g.items.map((s) => (
                <span
                  key={s}
                  style={{
                    ...aurSans,
                    fontSize: 13,
                    fontWeight: 500,
                    padding: "6px 12px",
                    borderRadius: 8,
                    background: AUR.panelHi,
                    color: AUR.ink,
                    border: `1px solid ${AUR.ruleHi}`,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
