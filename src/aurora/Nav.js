import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AUR, aurMono, aurSans } from "./tokens";
import { settings } from "../portfolio";

const links = [
  { to: "/home", label: "Home" },
  { to: "/experience", label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/education", label: "Education" },
  { to: "/stats", label: "Stats" },
  { to: "/contact", label: "Contact" },
];

export default function AuroraNav() {
  const homeLink = settings.isSplash ? "/splash" : "/home";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: "rgba(11,13,18,0.7)",
        backdropFilter: "blur(14px) saturate(160%)",
        WebkitBackdropFilter: "blur(14px) saturate(160%)",
        borderBottom: `1px solid ${AUR.rule}`,
        padding: "14px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 24,
      }}
    >
      <NavLink
        to={homeLink}
        tag={Link}
        style={{
          ...aurSans,
          fontSize: 15,
          fontWeight: 600,
          color: AUR.inkBold,
          letterSpacing: "-0.01em",
          display: "flex",
          alignItems: "center",
          gap: 12,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #ec4899)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            color: "#fff",
            fontWeight: 700,
          }}
        >
          W
        </span>
        Wei Loon Cheng
        <span
          style={{
            ...aurMono,
            fontSize: 11,
            color: AUR.muted,
            fontWeight: 400,
            marginLeft: 4,
          }}
          className="aur-nav-tag"
        >
          · AI engineer
        </span>
      </NavLink>
      <nav
        className="aur-nav-links"
        style={{
          ...aurSans,
          display: "flex",
          gap: 28,
          fontSize: 14,
          color: AUR.mutedHi,
        }}
      >
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            tag={Link}
            style={{
              textDecoration: "none",
              color: AUR.mutedHi,
              fontWeight: 400,
            }}
            activeStyle={{ color: AUR.inkBold, fontWeight: 500 }}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <a
        href="mailto:weiloon.c97@gmail.com"
        style={{
          ...aurSans,
          fontSize: 13,
          fontWeight: 500,
          padding: "8px 14px",
          borderRadius: 8,
          background: "rgba(52,211,153,0.1)",
          border: "1px solid rgba(52,211,153,0.25)",
          color: AUR.ok,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: AUR.ok,
            boxShadow: `0 0 8px ${AUR.ok}`,
          }}
        />
        Open to Q4 '26
      </a>
    </header>
  );
}
