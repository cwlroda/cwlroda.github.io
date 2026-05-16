import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  :root {
    --aur-bg: #0b0d12;
    --aur-bg-soft: #0f1218;
    --aur-panel: #13161e;
    --aur-panel-hi: #181c26;
    --aur-ink: #e7eaf0;
    --aur-ink-bold: #ffffff;
    --aur-muted: #7a8090;
    --aur-muted-hi: #9ba0ad;
    --aur-rule: #1f2330;
    --aur-rule-hi: #2a2f3d;
    --aur-link: #a5b4fc;
    --aur-ok: #34d399;
    --aur-glow-a: rgba(99,102,241,0.25);
    --aur-glow-b: rgba(236,72,153,0.18);
    --aur-glow-c: rgba(34,197,94,0.18);
    --aur-glow-d: rgba(245,158,11,0.18);

    --aur-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    --aur-mono: "Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: var(--aur-sans);
    font-feature-settings: "ss01", "cv11";
    margin: 0;
    transition: background 0.25s linear;
  }
`;
