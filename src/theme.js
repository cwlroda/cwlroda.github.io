// Aurora theme — dark, modern AI-product feel with soft gradient glow washes.
// Inspired by Linear / Resend / modern AI startup aesthetics.

const auroraTheme = {
  name: "dark",
  body: "#0b0d12",
  bgSoft: "#0f1218",
  panel: "#13161e",
  panelHi: "#181c26",
  text: "#e7eaf0",
  inkBold: "#ffffff",
  dark: "#000000",
  secondaryText: "#9ba0ad",
  muted: "#7a8090",
  rule: "#1f2330",
  ruleHi: "#2a2f3d",

  accentColor: "#a5b4fc",
  accentBright: "#6366f1",
  link: "#a5b4fc",
  ok: "#34d399",

  // Soft gradient washes — used as backgrounds, never solid blocks of text.
  glowA: "rgba(99,102,241,0.25)",
  glowB: "rgba(236,72,153,0.18)",
  glowC: "rgba(34,197,94,0.18)",
  glowD: "rgba(245,158,11,0.18)",

  // Legacy keys kept so existing components keep rendering until they are
  // explicitly restyled — the visual swap is incremental, not a big-bang.
  projectCard: "#13161e",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#13161e",
  imageClothes: "#13161e",
  avatarMisc: "#181c26",
  avatarShoes: "#1f2330",
};

export const themes = { light: auroraTheme, dark: auroraTheme };
export const aurora = auroraTheme;
