const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

// Utility to copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Ensure dist exists
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy specific files and folders
const itemsToCopy = [
  'index.html',
  'tailwind.css',
  'assets'
];

for (const item of itemsToCopy) {
  const srcPath = path.join(__dirname, item);
  const destPath = path.join(distDir, item);

  if (fs.existsSync(srcPath)) {
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
      console.log(`Copied directory: ${item}`);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied file: ${item}`);
    }
  } else {
    console.warn(`Warning: ${item} not found!`);
  }
}

console.log("Build preparation completed successfully.");