// Aurora design tokens.
// useAur() returns the active theme (light or dark) from styled-components'
// ThemeProvider so components re-render whenever the theme toggle fires.
// Font helpers stay static — they don't vary with theme.

import { useContext } from "react";
import { ThemeContext } from "styled-components";

export function useAur() {
  return useContext(ThemeContext);
}

export const aurSans = {
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFeatureSettings: '"ss01", "cv11"',
};

export const aurMono = {
  fontFamily:
    '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
};
