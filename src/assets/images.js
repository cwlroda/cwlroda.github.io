// Vite-friendly replacement for `require("../../assets/images/<path>")`.
// `import.meta.glob` is resolved at build time, so all referenced files end
// up bundled and hashed even though the lookup key is dynamic at runtime.
const imageUrls = import.meta.glob("./images/**/*.{png,jpg,jpeg,gif,svg,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const lookup = Object.fromEntries(
  Object.entries(imageUrls).map(([key, url]) => [
    key.replace(/^\.\/images\//, ""),
    url,
  ])
);

export function getImage(relativePath) {
  if (!relativePath) return undefined;
  const url = lookup[relativePath];
  if (!url && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn(`getImage: missing asset "${relativePath}"`);
  }
  return url;
}
