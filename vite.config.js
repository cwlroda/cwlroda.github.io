import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The repo still uses `.js` for files that contain JSX (CRA convention).
// Vite/esbuild only treats `.jsx`/`.tsx` as JSX by default, so we tell esbuild
// to parse every `.js` under `src/` as JSX. This avoids a 69-file rename.
const jsxInJs = {
  name: "treat-js-as-jsx",
  enforce: "pre",
  config() {
    return {
      esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] },
      optimizeDeps: { esbuildOptions: { loader: { ".js": "jsx" } } },
    };
  },
};

// Snail's Trail is a separately-built Vite project emitted to
// build/snailstrail/ by the prod pipeline. The main dev server doesn't
// know about it, so without this middleware /snailstrail/* would fall
// through to index.html and render nothing under BrowserRouter. Run
// `npm run build:snailstrail` once to populate the artifacts.
const MIME = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".wasm": "application/wasm",
  ".bin": "application/octet-stream",
};
const serveSnailstrail = {
  name: "serve-snailstrail-in-dev",
  configureServer(server) {
    const root = path.resolve(__dirname, "build/snailstrail");
    let warned = false;
    server.middlewares.use("/snailstrail", (req, res, next) => {
      if (!fs.existsSync(root)) {
        if (!warned) {
          server.config.logger.warn(
            "[snailstrail] build/snailstrail/ not found — run `npm run build:snailstrail` to enable /snailstrail/ in dev.",
          );
          warned = true;
        }
        return next();
      }
      let urlPath = (req.url || "/").split("?")[0];
      if (urlPath === "" || urlPath === "/") urlPath = "/index.html";
      const filePath = path.join(root, urlPath);
      if (!filePath.startsWith(root)) return next();
      fs.stat(filePath, (err, stat) => {
        // Snailstrail has no client-side router, so missing files must
        // 404 — never fall back to index.html. Libraries like
        // @xenova/transformers probe for local model JSON and will try
        // to .json() a 200 HTML response, breaking with a parse error.
        if (err || !stat.isFile()) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/plain");
          res.end("Not Found");
          return;
        }
        const type = MIME[path.extname(filePath)];
        if (type) res.setHeader("Content-Type", type);
        fs.createReadStream(filePath).pipe(res);
      });
    });
  },
};

export default defineConfig({
  base: "/",
  plugins: [react({ include: /\.(js|jsx)$/ }), jsxInJs, serveSnailstrail],
  build: {
    outDir: "build",
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Function form so shared transitive deps (react-is, prop-types,
        // scheduler, …) land in the react chunk instead of being hoisted
        // into baseui — otherwise rollup reports a react ↔ baseui cycle.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\\/]node_modules[\\/](chart\.js|react-chartjs-2)[\\/]/.test(id))
            return "charts";
          if (
            /[\\/]node_modules[\\/](baseui|styletron-react|styletron-engine-atomic|styletron-standard)[\\/]/.test(
              id,
            )
          )
            return "baseui";
          if (
            /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|@remix-run[\\/]router|scheduler|react-is|prop-types|use-sync-external-store|set-cookie|cookie|turbo-stream)[\\/]/.test(
              id,
            )
          )
            return "react";
        },
      },
    },
  },
  server: { port: 3000, open: false },
  preview: { port: 4173 },
});
