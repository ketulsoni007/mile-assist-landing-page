// Builds the site icons from the logo MARK only (steering wheel + road + pin), cropped out of the
// registered horizontal logo. The wordmark is far too small to read at 16-32px.
// Output: app/favicon.ico, app/icon.png, app/apple-icon.png, public/icons/icon-192.png, icon-512.png
// usage: node scripts/make-favicons.mjs
import sharp from "sharp";
import fs from "fs";

const SRC = "public/brand/logo-horizontal.png";
const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, C = info.channels;

// the mark is everything left of the first fully empty column gap after the pin
const colHas = (x) => { for (let y = 0; y < H; y++) if (data[(y * W + x) * C + 3] > 40) return true; return false; };
let x = 0, seen = false, end = 0;
for (; x < W; x++) {
  if (colHas(x)) { seen = true; end = x; }
  else if (seen && x - end > 120) break; // a 120px empty gap = end of the mark
}
let y0 = H, y1 = 0;
for (let yy = 0; yy < H; yy++) for (let xx = 0; xx <= end; xx++) if (data[(yy * W + xx) * C + 3] > 40) { if (yy < y0) y0 = yy; if (yy > y1) y1 = yy; break; }
const mark = await sharp(SRC).extract({ left: 0, top: y0, width: end + 1, height: y1 - y0 + 1 }).png().toBuffer();
console.log("mark box", end + 1, "x", y1 - y0 + 1);

// white rounded tile (so the navy parts stay visible on dark browser tabs), mark centred inside
async function icon(size, { radius = 0.22, pad = 0.14, bg = "#ffffff" } = {}) {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize(inner, inner, { fit: "inside" }).toBuffer();
  const mm = await sharp(m).metadata();
  const r = Math.round(size * radius);
  const tile = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="${bg}"/></svg>`);
  return sharp(tile).composite([{ input: m, left: Math.round((size - mm.width) / 2), top: Math.round((size - mm.height) / 2) }]).png().toBuffer();
}

fs.mkdirSync("public/icons", { recursive: true });
const png512 = await icon(512, { pad: 0.09 });
fs.writeFileSync("app/icon.png", png512);
fs.writeFileSync("public/icons/icon-512.png", png512);
fs.writeFileSync("public/icons/icon-192.png", await icon(192, { pad: 0.09 }));
// iOS rounds the corners itself, so it gets a full-bleed square
fs.writeFileSync("app/apple-icon.png", await icon(180, { radius: 0, pad: 0.07 }));

// favicon.ico with 16/32/48 PNG images
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map((s) => icon(s, { radius: 0.18, pad: 0.03 })));
const head = Buffer.alloc(6); head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = Buffer.alloc(16 * sizes.length);
imgs.forEach((b, i) => {
  const o = i * 16;
  dir.writeUInt8(sizes[i], o); dir.writeUInt8(sizes[i], o + 1); dir.writeUInt8(0, o + 2); dir.writeUInt8(0, o + 3);
  dir.writeUInt16LE(1, o + 4); dir.writeUInt16LE(32, o + 6); dir.writeUInt32LE(b.length, o + 8); dir.writeUInt32LE(offset, o + 12);
  offset += b.length;
});
fs.writeFileSync("app/favicon.ico", Buffer.concat([head, dir, ...imgs]));
console.log("icons written");
