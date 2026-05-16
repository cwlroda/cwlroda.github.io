import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";

const STATE_TINTS = {
  OPEN: { key: "ok", label: "Open" },
  MERGED: { key: "link", label: "Merged" },
  CLOSED: { key: "danger", label: "Closed" },
};

export default function PullRequestCard({ pullRequest }) {
  const AUR = useAur();
  const stateInfo = STATE_TINTS[pullRequest.state] || STATE_TINTS.OPEN;
  const danger = "#ef4444";
  const color =
    stateInfo.key === "danger" ? danger : AUR[stateInfo.key] || AUR.ok;
  const createdAt = pullRequest.createdAt
    ? pullRequest.createdAt.split("T")[0]
    : "";

  return (
    <a
      href={pullRequest.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "relative",
        display: "block",
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        borderRadius: 14,
        padding: 20,
        textDecoration: "none",
        color: AUR.ink,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          top: -100,
          right: -100,
          background: `radial-gradient(circle, ${color}1f 0%, transparent 65%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              ...aurMono,
              fontSize: 10,
              color,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 6,
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
                background: color,
                boxShadow: `0 0 6px ${color}`,
              }}
            />
            {stateInfo.label} · PR #{pullRequest.number}
          </div>
          <div
            style={{
              ...aurSans,
              fontSize: 15,
              fontWeight: 600,
              color: AUR.inkBold,
              letterSpacing: "-0.005em",
              lineHeight: 1.35,
            }}
          >
            {pullRequest.title}
          </div>
          <div
            style={{
              ...aurSans,
              fontSize: 13,
              color: AUR.mutedHi,
              marginTop: 6,
            }}
          >
            {pullRequest.baseRepository.owner.login}/
            {pullRequest.baseRepository.name}
          </div>
          <div
            style={{
              ...aurMono,
              fontSize: 11,
              color: AUR.muted,
              marginTop: 8,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: AUR.ok }}>+{pullRequest.additions}</span>
            <span style={{ color: "#ef4444" }}>−{pullRequest.deletions}</span>
            <span>{pullRequest.changedFiles} files</span>
            <span>opened {createdAt}</span>
          </div>
        </div>
      </div>
    </a>
  );
}
