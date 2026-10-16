import fs from "fs";
import path from "path";
import sharp from "sharp";

// 1. High-Resolution Vector SVG Icon (128x128)
// Matches authentic Durozen Logo from src/components/common/Logo.tsx:
// - Red: #DE2F28 ('D')
// - Warm Golden Yellow: #F4A81E ('UR')
// - Grass Green: #549B31 ('OZ')
// - Royal Blue: #24419E ('EN')
// With crisp white border and subtle drop shadow for perfect visibility on both light and dark browser tabs.
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="none">
  <defs>
    <filter id="d-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.28" />
    </filter>
  </defs>

  <!-- 4. Royal Blue Circle (EN) -->
  <g filter="url(#d-shadow)">
    <circle cx="103" cy="65.5" r="18" fill="#24419E" stroke="#FFFFFF" stroke-width="1.8" />
    <text x="103" y="65.5" fill="#FFFFFF" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="900" letter-spacing="-0.04em" text-anchor="middle" dominant-baseline="central">EN</text>
  </g>

  <!-- 3. Grass Green Circle (OZ) -->
  <g filter="url(#d-shadow)">
    <circle cx="77" cy="68" r="18" fill="#549B31" stroke="#FFFFFF" stroke-width="1.8" />
    <text x="77" y="68" fill="#FFFFFF" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="900" letter-spacing="-0.04em" text-anchor="middle" dominant-baseline="central">OZ</text>
  </g>

  <!-- 2. Warm Golden Yellow Circle (UR) -->
  <g filter="url(#d-shadow)">
    <circle cx="51" cy="61" r="18" fill="#F4A81E" stroke="#FFFFFF" stroke-width="1.8" />
    <text x="51" y="61" fill="#FFFFFF" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12.5" font-weight="900" letter-spacing="-0.04em" text-anchor="middle" dominant-baseline="central">UR</text>
  </g>

  <!-- 1. Durozen Red Circle (D) -->
  <g filter="url(#d-shadow)">
    <circle cx="25" cy="64" r="18" fill="#DE2F28" stroke="#FFFFFF" stroke-width="1.8" />
    <text x="25" y="64" fill="#FFFFFF" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14.5" font-weight="900" letter-spacing="-0.04em" text-anchor="middle" dominant-baseline="central">D</text>
  </g>
</svg>`;

// Helper function to build a multi-resolution ICO file from PNG buffers
function createIcoFromPngs(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let currentOffset = headerSize + count * dirEntrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = ICO
  header.writeUInt16LE(count, 4); // Number of images

  const dirEntries = [];
  for (const { buffer, width, height } of pngBuffers) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2); // Palette count
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size
    entry.writeUInt32LE(currentOffset, 12); // Offset
    dirEntries.push(entry);
    currentOffset += buffer.length;
  }

  return Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map((p) => p.buffer),
  ]);
}

async function run() {
  const rootDir = process.cwd();
  const svgBuffer = Buffer.from(svgContent, "utf-8");

  // Write icon.svg to both src/app/icon.svg and public/icon.svg
  fs.writeFileSync(path.join(rootDir, "src/app/icon.svg"), svgContent);
  fs.writeFileSync(path.join(rootDir, "public/icon.svg"), svgContent);
  console.log("Created src/app/icon.svg & public/icon.svg");

  // Render PNGs at 16x16, 32x32, 48x48, 64x64, 180x180 (apple-touch-icon), 192x192, 512x512
  const sizes = [16, 32, 48, 64];
  const pngBuffers = [];

  for (const size of sizes) {
    const buf = await sharp(svgBuffer)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push({ buffer: buf, width: size, height: size });
  }

  // Generate multi-resolution ICO file
  const icoBuffer = createIcoFromPngs(pngBuffers);
  fs.writeFileSync(path.join(rootDir, "src/app/favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(rootDir, "public/favicon.ico"), icoBuffer);
  console.log("Created src/app/favicon.ico & public/favicon.ico (Multi-res 16, 32, 48, 64px)");

  // Apple touch icon (180x180)
  const appleTouch = await sharp(svgBuffer)
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, "public/apple-touch-icon.png"), appleTouch);
  fs.writeFileSync(path.join(rootDir, "src/app/apple-icon.png"), appleTouch);
  console.log("Created apple-touch-icon.png");

  // App icons (192 & 512)
  const icon192 = await sharp(svgBuffer).resize(192, 192).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, "public/icon-192.png"), icon192);

  const icon512 = await sharp(svgBuffer).resize(512, 512).png().toBuffer();
  fs.writeFileSync(path.join(rootDir, "public/icon-512.png"), icon512);
  console.log("Created icon-192.png & icon-512.png");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
