# Wei Loon's Portfolio

View portfolio at [cwlroda.github.io](https://cwlroda.github.io)

Built with React + Vite. Uses the Aurora theme (dark + light) with Inter / Geist
Mono, soft gradient washes, and a small widget library under `src/aurora/`.

## Prerequisites

- Node.js `>= 24` (see `.nvmrc`)
- npm `>= 10`

```bash
nvm install
nvm use
```

## Run locally

```bash
npm install
npm run dev
```

Vite serves the site at <http://localhost:5173>. Edits hot-reload.

## Other scripts

| Command           | What it does                                                                 |
| ----------------- | ---------------------------------------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR.                                                    |
| `npm run build`   | Production build of the portfolio plus the `snailstrail` side project into `build/`. |
| `npm run preview` | Serve the built `build/` output for a final smoke test.                      |
| `npm run deploy`  | Build then push `build/` to the `gh-pages` branch via `gh-pages`.            |

## Deployment

`master` deploys automatically through `.github/workflows/deploy.yml`. To
publish from a local checkout instead:

```bash
npm run deploy
```

That runs the build and pushes `build/` to the `gh-pages` branch, which GitHub
Pages serves from `cwlroda.github.io`.

## Project structure

```
src/
  aurora/           Theme tokens, primitives, and the home-page sections.
  aurora/widgets/   Reusable widgets (heatmap, awards, activity, skill bars, …).
  pages/            One folder per route (home / experience / education / projects
                    / stats / contact / resume / splash). Each composes Aurora
                    components — no Lottie, no Particle background.
  portfolio.js      Content / data for every page.
  theme.js          Dark + light Aurora palettes consumed via styled-components.
```

## Template references

- [PortfolioV2](https://github.com/harikanani/PortfolioV2)
- [Software Developer Master Portfolio](https://github.com/ashutosh1919/masterPortfolio)
- [Software Developer Folio](https://github.com/saadpasta/developerFolio)
- [Portfolio Website - v2.0](https://github.com/soumyajit4419/Portfolio)
