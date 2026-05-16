import React from "react";
import AuroraNav from "./Nav";
import AuroraFooter from "./Footer";
import { useAur } from "./tokens";
import "./aurora.css";

// Shared shell for any sub-page that wants the Aurora chrome (nav + footer)
// without re-implementing the home page's section composition.
export default function AuroraLayout({ children, setTheme }) {
  const AUR = useAur();
  return (
    <div
      className="aur-root"
      style={{ background: AUR.bg, color: AUR.ink, minHeight: "100vh" }}
    >
      <AuroraNav setTheme={setTheme} />
      <main style={{ minHeight: "60vh" }}>{children}</main>
      <AuroraFooter />
    </div>
  );
}
