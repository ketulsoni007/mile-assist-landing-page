// Fetches React Bits components from their public shadcn registry and writes them to
// components/react-bits/. Same files as `npx shadcn add @react-bits/<Name>-TS-TW`, but it never
// touches package.json, so it cannot downgrade motion / react-dom. Check each component dependencies first.
// usage: node scripts/add-react-bits.mjs Particles LightRays ...
import fs from "fs";
import path from "path";

const OUT = "components/react-bits";
fs.mkdirSync(OUT, { recursive: true });
for (const name of process.argv.slice(2)) {
  const res = await fetch(`https://reactbits.dev/r/${name}-TS-TW.json`);
  if (!res.ok) { console.log(`${name}: HTTP ${res.status}`); continue; }
  const item = await res.json();
  const deps = item.dependencies ?? [];
  for (const f of item.files) {
    fs.writeFileSync(path.join(OUT, path.basename(f.path)), f.content);
    console.log(`${name.padEnd(16)} -> ${OUT}/${path.basename(f.path)}${deps.length ? "   deps: " + deps.join(", ") : ""}`);
  }
}
