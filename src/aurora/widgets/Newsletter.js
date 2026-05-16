import React, { useState } from "react";
import { useAur, aurMono, aurSans } from "../tokens";

export default function NewsletterWidget() {
  const AUR = useAur();
  const [value, setValue] = useState("");
  return (
    <div
      style={{
        position: "relative",
        background: AUR.panel,
        border: `1px solid ${AUR.rule}`,
        borderRadius: 16,
        padding: 32,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          top: -180,
          right: -180,
          background: `radial-gradient(circle, ${AUR.glowA} 0%, transparent 65%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          bottom: -180,
          left: -180,
          background: `radial-gradient(circle, ${AUR.glowB} 0%, transparent 65%)`,
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <div
          style={{
            ...aurMono,
            fontSize: 11,
            color: AUR.mutedHi,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 12,
          }}
        >
          ✉ Newsletter · 4–6 times a year
        </div>
        <h3
          style={{
            ...aurSans,
            fontSize: 26,
            fontWeight: 600,
            color: AUR.inkBold,
            letterSpacing: "-0.02em",
            margin: 0,
            lineHeight: 1.15,
            maxWidth: 480,
          }}
        >
          Slow notes from a perception &amp; ML engineer.
        </h3>
        <p
          style={{
            ...aurSans,
            fontSize: 14,
            lineHeight: 1.6,
            color: AUR.mutedHi,
            marginTop: 12,
            maxWidth: 520,
          }}
        >
          What I'm working on, what I'm reading, occasional long-form essays on
          VLMs, MLOps and shipping models to production. No funnels, no
          growth-hacks, no AI-newsletter slop.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            gap: 8,
            marginTop: 20,
            maxWidth: 460,
            flexWrap: "wrap",
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="email"
            placeholder="you@example.com"
            style={{
              ...aurSans,
              fontSize: 14,
              padding: "11px 14px",
              border: `1px solid ${AUR.ruleHi}`,
              borderRadius: 8,
              background: AUR.panelHi,
              flex: "1 1 200px",
              color: AUR.ink,
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              ...aurSans,
              fontSize: 14,
              fontWeight: 500,
              padding: "11px 18px",
              borderRadius: 8,
              background: AUR.inkBold,
              color: AUR.inkInverse,
              border: "none",
              cursor: "pointer",
            }}
          >
            Subscribe
          </button>
        </form>
        <div
          style={{
            ...aurMono,
            fontSize: 11,
            color: AUR.muted,
            marginTop: 16,
            display: "flex",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <span>● 412 readers</span>
          <span>● Last issue 3 weeks ago</span>
          <span>● Unsubscribe any time</span>
        </div>
      </div>
    </div>
  );
}
