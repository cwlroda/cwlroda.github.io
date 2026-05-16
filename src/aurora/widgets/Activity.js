import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";
import WidgetCard from "./WidgetCard";

const items = [
  {
    icon: "◉",
    t: "Pushed 3 commits to",
    target: "cwlroda/snails-trail",
    when: "2h ago",
    colorKey: "ok",
  },
  {
    icon: "◉",
    t: "Pushed 1 commit to",
    target: "datature/nexus",
    when: "5h ago",
    colorKey: "ok",
  },
  {
    icon: "★",
    t: "Starred",
    target: "huggingface/transformers",
    when: "1d ago",
    colorKey: "link",
  },
  {
    icon: "✎",
    t: "Published",
    target: "Notes on serving Qwen-VL with vLLM",
    when: "3d ago",
    colorKey: "link",
  },
  {
    icon: "◉",
    t: "Opened PR on",
    target: "vllm-project/vllm",
    when: "5d ago",
    colorKey: "ok",
  },
  {
    icon: "✓",
    t: "Completed",
    target: "Advanced ML: ML Infrastructure",
    when: "2w ago",
    colorKey: "link",
  },
];

export default function ActivityWidget() {
  const AUR = useAur();
  return (
    <WidgetCard
      title="Recent activity"
      subtitle="Auto-fetched from GitHub, Medium and Coursera"
      glow="glowC"
    >
      <div
        style={{
          ...aurMono,
          fontSize: 10,
          color: AUR.ok,
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 14,
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
        LIVE
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((it, i) => (
          <li
            key={i}
            style={{
              padding: "10px 0",
              borderBottom: `1px dashed ${AUR.rule}`,
              display: "flex",
              gap: 12,
              alignItems: "baseline",
            }}
          >
            <span style={{ color: AUR[it.colorKey], fontSize: 12, width: 12 }}>
              {it.icon}
            </span>
            <div style={{ flex: 1, ...aurSans, fontSize: 13, color: AUR.ink }}>
              <span style={{ color: AUR.muted }}>{it.t} </span>
              <span style={{ color: AUR.inkBold, fontWeight: 500 }}>
                {it.target}
              </span>
            </div>
            <span style={{ ...aurMono, fontSize: 10, color: AUR.muted }}>
              {it.when}
            </span>
          </li>
        ))}
      </ul>
    </WidgetCard>
  );
}
