import { createGlobalStyle } from "styled-components";

// Body bg + scrollbar bg follow the active theme so the page chrome (and
// overscroll area on macOS) recolors when the user toggles.
export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  html,
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
  }

  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-feature-settings: "ss01", "cv11";
    margin: 0;
    transition: background 0.2s ease, color 0.2s ease;
  }

  ::selection {
    background: ${({ theme }) => theme.selection};
    color: ${({ theme }) => theme.inkBold};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollTrack};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollThumb};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollThumbHi};
  }
`;
