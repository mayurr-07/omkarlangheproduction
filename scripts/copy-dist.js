const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "../dist");
const outDir = path.join(__dirname, "../out");

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}

if (fs.existsSync(outDir)) {
  fs.cpSync(outDir, distDir, { recursive: true, dereference: true });
  console.log("[copy-dist] Successfully exported static site to dist/ with dereferenced files!");
} else {
  console.warn("[copy-dist] out/ directory not found!");
}
