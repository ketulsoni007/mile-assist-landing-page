// Crops the face out of each public/users/driver-N.jpg into a small square avatar (public/users/avatar-N.webp).
// Centres are in the original photo, as a fraction of its width / height. Re-run after replacing the photos.
// driver-4 and up are already square face portraits, so they are only resized.
// usage: node scripts/make-avatars.mjs
import sharp from "sharp";

const cfg = [
  { n: 1, cx: 450 / 900, cy: 185 / 600, box: 270 / 600 },
  { n: 2, cx: 330 / 600, cy: 190 / 600, box: 260 / 600 },
  { n: 3, cx: 195 / 400, cy: 105 / 600, box: 250 / 600 },
];
for (const { n, cx, cy, box } of cfg) {
  const file = `public/users/driver-${n}.jpg`;
  const { width: W, height: H } = await sharp(file).metadata();
  const side = Math.round(box * H);
  const left = Math.max(0, Math.min(W - side, Math.round(cx * W - side / 2)));
  const top = Math.max(0, Math.min(H - side, Math.round(cy * H - side / 2)));
  await sharp(file).rotate().extract({ left, top, width: side, height: side }).resize(160, 160).webp({ quality: 82 }).toFile(`public/users/avatar-${n}.webp`);
  console.log(`avatar-${n}.webp`, { left, top, side });
}

for (let n = 4; n <= 10; n++) {
  await sharp(`public/users/driver-${n}.jpg`).rotate().resize(160, 160, { fit: "cover", position: "attention" }).webp({ quality: 82 }).toFile(`public/users/avatar-${n}.webp`);
  console.log(`avatar-${n}.webp`);
}
