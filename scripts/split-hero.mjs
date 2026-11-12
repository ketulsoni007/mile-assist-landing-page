// Splits public/hero/mile-hero.png (transparent background) into animatable layers:
// the floating service tiles (one file each) and the base (driver + car).
// Each pixel, including the soft glow, goes to the nearest object, so cuts are clean.
// usage: node scripts/split-hero.mjs
import sharp from "sharp";
import fs from "fs";

const SRC = "public/hero/mile-hero.png";
const OUT = "public/hero";
const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const W = info.width, H = info.height, N = W * H, C = info.channels;
const A = (i) => data[i * C + 3];

// 1. objects = connected blobs of solid-ish pixels (alpha > 48)
const solid = new Uint8Array(N);
for (let i = 0; i < N; i++) solid[i] = A(i) > 170 ? 1 : 0;
const label = new Int32Array(N);
const comps = [];
for (let s = 0; s < N; s++) {
  if (!solid[s] || label[s]) continue;
  const id = comps.length + 1;
  const stack = [s];
  label[s] = id;
  let area = 0, x0 = W, y0 = H, x1 = 0, y1 = 0;
  while (stack.length) {
    const i = stack.pop();
    const x = i % W, y = (i / W) | 0;
    area++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    // 8-neighbours within radius 2 so tiny gaps (glow seams) do not split an object
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const xx = x + dx, yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
      const j = yy * W + xx;
      if (solid[j] && !label[j]) { label[j] = id; stack.push(j); }
    }
  }
  comps.push({ id, area, x0, y0, x1, y1 });
}
// The top shield tile touches the base through its glow: carve it out of its known region.
// minLuma keeps the dark phone frame (which touches the tile bottom border) out of the tile.
const FORCED = [{ x0: 695, y0: 120, x1: 860, y1: 262, minLuma: 120, lumaFromY: 244 }];
for (const f of FORCED) {
  const id = comps.length + 1;
  let area = 0, x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = f.y0; y <= f.y1; y++) for (let x = f.x0; x <= f.x1; x++) {
    const i = y * W + x;
    if (!solid[i]) continue;
    if (f.minLuma && y >= (f.lumaFromY ?? 0) && 0.3 * data[i * C] + 0.59 * data[i * C + 1] + 0.11 * data[i * C + 2] < f.minLuma) continue;
    label[i] = id; area++;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  comps.push({ id, area, x0, y0, x1, y1 });
}
const big = comps.filter((c) => c.area > 1500).sort((a, b) => b.area - a.area);
console.log("objects:");
for (const c of big) console.log(` #${c.id} area ${c.area} bbox ${c.x0},${c.y0} -> ${c.x1},${c.y1}`);

// 2. give every remaining visible pixel (glow, tiny specks) to the nearest big object (BFS, max 90px)
const keep = new Set(big.map((c) => c.id));
const owner = new Int32Array(N);
let frontier = [];
for (let i = 0; i < N; i++) if (keep.has(label[i])) { owner[i] = label[i]; frontier.push(i); }
for (let step = 0; step < 90 && frontier.length; step++) {
  const next = [];
  for (const i of frontier) {
    const x = i % W, y = (i / W) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const xx = x + dx, yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
      const j = yy * W + xx;
      if (!owner[j] && A(j) > 0) { owner[j] = owner[i]; next.push(j); }
    }
  }
  frontier = next;
}

// 3. the base is the biggest object; every other big object is a tile
const baseId = big[0].id;
const manifest = {};
const tiles = big.slice(1).sort((a, b) => a.x0 - b.x0);
const groups = [{ name: "base", ids: [baseId] }, ...tiles.map((t, i) => ({ name: `tile-${i + 1}`, ids: [t.id] }))];
for (const g of groups) {
  const ids = new Set(g.ids);
  const out = Buffer.alloc(N * 4);
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let i = 0; i < N; i++) {
    const o = owner[i] || (A(i) > 0 ? baseId : 0); // unowned stray pixels fall back to base
    if (!ids.has(o)) continue;
    out.set(data.subarray(i * C, i * C + 4), i * 4);
    if (A(i) > 3) { const x = i % W, y = (i / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  // base keeps the full canvas so layers stay registered; tiles are cropped to their bounds
  if (g.name === "base") {
    await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png({ compressionLevel: 9 }).toFile(`${OUT}/hero-base.png`);
    manifest.base = { x: 0, y: 0, w: W, h: H };
  } else {
    const w = x1 - x0 + 1, h = y1 - y0 + 1;
    await sharp(out, { raw: { width: W, height: H, channels: 4 } }).extract({ left: x0, top: y0, width: w, height: h }).png({ compressionLevel: 9 }).toFile(`${OUT}/hero-${g.name}.png`);
    manifest[g.name] = { x: x0, y: y0, w, h };
  }
  console.log(g.name, JSON.stringify(manifest[g.name]));
}
manifest.canvas = { w: W, h: H };
fs.writeFileSync("components/svg/heroLayers.json", JSON.stringify(manifest, null, 1));
