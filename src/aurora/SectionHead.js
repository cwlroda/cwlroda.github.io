import React from "react";
import { useAur, aurMono, aurSans } from "./tokens";

export default function SectionHead({ k, label, title, kicker }) {
  const AUR = useAur();
  return (
    <div
      style={{ padding: "64px 40px 32px", maxWidth: 1280, margin: "0 auto" }}
    >
      <div
        style={{
          ...aurMono,
          fontSize: 12,
          color: AUR.muted,
          marginBottom: 12,
          letterSpacing: "0.04em",
        }}
      >
        {k} / {label}
      </div>
      <h2
        style={{
          ...aurSans,
          fontSize: 40,
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.025em",
          fontWeight: 600,
          color: AUR.inkBold,
          maxWidth: 720,
        }}
      >
        {title}
      </h2>
      {kicker && (
        <p
          style={{
            ...aurSans,
            fontSize: 16,
            lineHeight: 1.55,
            color: AUR.mutedHi,
            marginTop: 14,
            maxWidth: 640,
          }}
        >
          {kicker}
        </p>
      )}
    </div>
  );
}
