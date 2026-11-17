// Makes the small web versions of the role-picker art: public/roles/<name>.png (originals) -> <name>.webp.
// Transparent margins are trimmed so each picture fills its card. Re-run after replacing an original.
// usage: node scripts/make-roles.mjs
import sharp from "sharp";

const jobs = [
  { name: "driver", width: 640 },
  { name: "restaurant", width: 640 },
  { name: "hotel", width: 640 },
  { name: "guide", width: 520 },
];
for (const { name, width } of jobs) {
  const out = await sharp(`public/roles/${name}.png`)
    .trim({ threshold: 12 })
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 84, alphaQuality: 90 })
    .toFile(`public/roles/${name}.webp`);
  console.log(`${name}.webp`, out.width, "x", out.height, Math.round(out.size / 1024) + " KB");
}
