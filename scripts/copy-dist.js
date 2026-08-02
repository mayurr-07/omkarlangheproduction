const fs = require("fs");
const path = require("path");

const distDir = path.join(__dirname, "../dist");
const publicDir = path.join(__dirname, "../public");
const nextDir = path.join(__dirname, "../.next");

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
}

if (fs.existsSync(nextDir)) {
  fs.cpSync(nextDir, path.join(distDir, ".next"), { recursive: true });
}

console.log("[copy-dist] Successfully created and populated dist/ directory!");
