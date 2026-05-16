import React from "react";
import { AUR, aurMono, aurSans } from "./tokens";

export default function AuroraFooter() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${AUR.rule}`,
        padding: "32px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...aurSans,
        fontSize: 13,
        color: AUR.muted,
        maxWidth: 1280,
        margin: "0 auto",
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <span>
        © {new Date().getFullYear()} Wei Loon Cheng · Designed in Zürich
      </span>
      <span style={{ ...aurMono, fontSize: 12 }}>v3.0 · Aurora</span>
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        style={{ color: AUR.mutedHi, textDecoration: "none" }}
      >
        ↑ Back to top
      </a>
    </footer>
  );
}
