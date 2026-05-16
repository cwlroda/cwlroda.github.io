import React from "react";
import AuroraNav from "./Nav";
import AuroraFooter from "./Footer";
import { AUR } from "./tokens";
import "./aurora.css";

// Shared shell for any sub-page that wants the Aurora chrome (nav + footer)
// without re-implementing the home page's section composition.
export default function AuroraLayout({ children }) {
  return (
    <div className="aur-root" style={{ background: AUR.bg, color: AUR.ink }}>
      <AuroraNav />
      <main style={{ minHeight: "60vh" }}>{children}</main>
      <AuroraFooter />
    </div>
  );
}
