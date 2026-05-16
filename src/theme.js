// Aurora theme — dark + light variants. Same design language (soft gradient
// washes, Inter + Geist Mono), inverted surface palette.

const darkAurora = {
  name: "dark",
  body: "#0b0d12",
  bg: "#0b0d12",
  bgSoft: "#0f1218",
  panel: "#13161e",
  panelHi: "#181c26",
  ink: "#e7eaf0",
  text: "#e7eaf0",
  inkBold: "#ffffff",
  muted: "#7a8090",
  mutedHi: "#9ba0ad",
  secondaryText: "#9ba0ad",
  rule: "#1f2330",
  ruleHi: "#2a2f3d",
  link: "#a5b4fc",
  accentColor: "#a5b4fc",
  accentBright: "#6366f1",
  ok: "#34d399",
  glowA: "rgba(99,102,241,0.25)",
  glowB: "rgba(236,72,153,0.18)",
  glowC: "rgba(34,197,94,0.18)",
  glowD: "rgba(245,158,11,0.18)",
  navBackdrop: "rgba(11,13,18,0.7)",
  // Used by inverted primary buttons (bg = inkBold, text = inkInverse).
  inkInverse: "#0b0d12",
  // Soft tinted bg for the dot-grid in placeholder tiles.
  dot: "#232735",
  // Scrollbar.
  scrollTrack: "#0b0d12",
  scrollThumb: "#1f2330",
  scrollThumbHi: "#2a2f3d",
  // Selection.
  selection: "rgba(99,102,241,0.35)",

  // Legacy keys kept so existing components keep rendering.
  dark: "#000000",
  projectCard: "#13161e",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#13161e",
  imageClothes: "#13161e",
  avatarMisc: "#181c26",
  avatarShoes: "#1f2330",
};

const lightAurora = {
  name: "light",
  body: "#fafbfc",
  bg: "#fafbfc",
  bgSoft: "#f4f5f7",
  panel: "#ffffff",
  panelHi: "#f4f5f7",
  ink: "#1a1d24",
  text: "#1a1d24",
  inkBold: "#0b0d12",
  muted: "#6b7280",
  mutedHi: "#4b5563",
  secondaryText: "#4b5563",
  rule: "#e5e7eb",
  ruleHi: "#d1d5db",
  link: "#4f46e5",
  accentColor: "#4f46e5",
  accentBright: "#4338ca",
  ok: "#059669",
  // Softer glows on light bg — same hues, much lower alpha so they don't
  // wash out into pastel mush.
  glowA: "rgba(99,102,241,0.15)",
  glowB: "rgba(236,72,153,0.12)",
  glowC: "rgba(34,197,94,0.14)",
  glowD: "rgba(245,158,11,0.14)",
  navBackdrop: "rgba(250,251,252,0.75)",
  inkInverse: "#ffffff",
  dot: "#d8dbe3",
  scrollTrack: "#fafbfc",
  scrollThumb: "#d1d5db",
  scrollThumbHi: "#9ca3af",
  selection: "rgba(99,102,241,0.18)",

  dark: "#000000",
  projectCard: "#ffffff",
  skinColor: "#F7B799",
  skinColor2: "#FCB696",
  imageDark: "#f4f5f7",
  imageClothes: "#f4f5f7",
  avatarMisc: "#f4f5f7",
  avatarShoes: "#e5e7eb",
};

export const themes = { light: lightAurora, dark: darkAurora };
export const aurora = darkAurora;
