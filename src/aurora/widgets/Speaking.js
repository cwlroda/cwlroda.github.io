import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import WidgetCard from "./WidgetCard";

const items = [
  {
    yr: "2025",
    t: "From notebook to robot: lessons in shipping perception",
    where: "Singapore ML Meetup · invited talk",
    kind: "UPCOMING",
    upcoming: true,
  },
  {
    yr: "2024",
    t: "Fine-tuning Qwen-VL with (Q)LoRA in production",
    where: "Datature internal · engineering deep-dive",
    kind: "INTERNAL",
  },
  {
    yr: "2023",
    t: "Multimodal RAG that actually retrieves",
    where: "Vision-Language workshop · panel",
    kind: "PANEL",
  },
  {
    yr: "2021",
    t: "Pose estimation for safety surveillance",
    where: "HTX internal demo day",
    kind: "INTERNAL",
  },
];

export default function SpeakingWidget() {
  const AUR = useAur();
  return (
    <WidgetCard
      title="Speaking"
      subtitle="Talks, panels, lab seminars"
      glow="glowC"
    >
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              padding: "14px 0",
              borderTop: i === 0 ? "none" : `1px solid ${AUR.rule}`,
              display: "grid",
              gridTemplateColumns: "60px 1fr 100px",
              gap: 12,
              alignItems: "baseline",
            }}
          >
            <span style={{ ...aurMono, fontSize: 12, color: AUR.muted }}>
              {it.yr}
            </span>
            <div>
              <div
                style={{
                  ...aurSans,
                  fontSize: 14,
                  fontWeight: 500,
                  color: AUR.inkBold,
                  letterSpacing: "-0.005em",
                }}
              >
                {it.t}
              </div>
              <div
                style={{
                  ...aurSans,
                  fontSize: 12,
                  color: AUR.mutedHi,
                  marginTop: 4,
                }}
              >
                {it.where}
              </div>
            </div>
            <span
              style={{
                ...aurMono,
                fontSize: 9,
                color: it.upcoming ? AUR.ok : AUR.muted,
                padding: "3px 8px",
                border: `1px solid ${it.upcoming ? AUR.ok + "55" : AUR.rule}`,
                background: it.upcoming ? AUR.ok + "12" : "transparent",
                borderRadius: 999,
                textAlign: "center",
                justifySelf: "end",
              }}
            >
              {it.kind}
            </span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
