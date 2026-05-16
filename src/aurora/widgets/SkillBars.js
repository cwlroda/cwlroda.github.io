import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import WidgetCard from "./WidgetCard";

const skills = [
  { name: "Computer Vision", level: 95 },
  { name: "PyTorch", level: 92 },
  { name: "Python", level: 96 },
  { name: "VLM Fine-tuning (Q)LoRA", level: 90 },
  { name: "vLLM / TRT-LLM Serving", level: 88 },
  { name: "MLOps / Docker / CI-CD", level: 86 },
  { name: "C++ / Systems", level: 80 },
  { name: "TypeScript / React", level: 74 },
  { name: "CUDA / GPU optimisation", level: 70 },
];

export default function SkillBarsWidget() {
  const AUR = useAur();
  return (
    <WidgetCard
      title="Proficiency"
      subtitle="A self-rated snapshot — take with salt"
      glow="glowD"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {skills.map((s) => (
          <div key={s.name}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                ...aurSans,
                fontSize: 13,
                marginBottom: 6,
              }}
            >
              <span style={{ color: AUR.ink, fontWeight: 500 }}>{s.name}</span>
              <span style={{ ...aurMono, fontSize: 11, color: AUR.muted }}>
                {s.level}
              </span>
            </div>
            <div
              style={{
                height: 6,
                background: AUR.panelHi,
                borderRadius: 3,
                overflow: "hidden",
                border: `1px solid ${AUR.rule}`,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${s.level}%`,
                  background:
                    "linear-gradient(90deg, #6366f1, #a5b4fc 70%, #67e8f9)",
                  borderRadius: 3,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
