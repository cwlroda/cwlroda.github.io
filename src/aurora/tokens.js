// Aurora design tokens — single source of truth for colors and type.
// Keep this in sync with src/theme.js (which feeds the styled-components
// ThemeProvider) and the CSS variables in src/global.js.

export const AUR = {
  bg: "#0b0d12",
  bgSoft: "#0f1218",
  panel: "#13161e",
  panelHi: "#181c26",
  ink: "#e7eaf0",
  inkBold: "#ffffff",
  muted: "#7a8090",
  mutedHi: "#9ba0ad",
  rule: "#1f2330",
  ruleHi: "#2a2f3d",
  glowA: "rgba(99,102,241,0.25)",
  glowB: "rgba(236,72,153,0.18)",
  glowC: "rgba(34,197,94,0.18)",
  glowD: "rgba(245,158,11,0.18)",
  link: "#a5b4fc",
  ok: "#34d399",
};

export const aurSans = {
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFeatureSettings: '"ss01", "cv11"',
};

export const aurMono = {
  fontFamily:
    '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};
