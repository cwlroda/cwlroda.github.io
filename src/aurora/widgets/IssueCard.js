import React from "react";
import { useAur, aurMono, aurSans } from "../tokens";

export default function IssueCard({ issue }) {
  const AUR = useAur();
  const isOpen = !issue.closed;
  const color = isOpen ? AUR.ok : AUR.muted;
  const createdAt = issue.createdAt ? issue.createdAt.split("T")[0] : "";

  return (
    <a
      href={issue.url}
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
          background: `radial-gradient(circle, ${color}22 0%, transparent 65%)`,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
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
            boxShadow: isOpen ? `0 0 6px ${color}` : "none",
          }}
        />
        {isOpen ? "Open" : "Closed"} · Issue #{issue.number}
      </div>
      <div
        style={{
          ...aurSans,
          fontSize: 15,
          fontWeight: 600,
          color: AUR.inkBold,
          letterSpacing: "-0.005em",
          lineHeight: 1.35,
          position: "relative",
        }}
      >
        {issue.title}
      </div>
      <div
        style={{
          ...aurSans,
          fontSize: 13,
          color: AUR.mutedHi,
          marginTop: 6,
          position: "relative",
        }}
      >
        {issue.repository.owner.login}/{issue.repository.name}
      </div>
      <div
        style={{
          ...aurMono,
          fontSize: 11,
          color: AUR.muted,
          marginTop: 8,
          position: "relative",
        }}
      >
        opened {createdAt}
      </div>
    </a>
  );
}
