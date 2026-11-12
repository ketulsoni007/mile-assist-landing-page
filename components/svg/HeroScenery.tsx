/**
 * Hero scenery behind the hero visual. Shares the 1536x1024 space of the artwork.
 * Built for blending: every layer fades into the one behind it. Towers dissolve into haze at the base and
 * at both ends, the far skyline is slightly blurred for depth, and clouds and the backdrop are feathered,
 * with no hard outlines. Colours come from CSS variables (--sky-*, see globals.css), so dark mode is a night city.
 * Buildings come from a seeded generator, so output is identical on every render. Motion is CSS only.
 */

const W = 1536;
const BASE = 900;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type B = { x: number; w: number; h: number; kind: 0 | 1 | 2 };

function skyline(seed: number, from: number, to: number, wMin: number, wMax: number, hMin: number, hMax: number, gap = 4): B[] {
  const r = rng(seed);
  const out: B[] = [];
  let x = from;
  while (x < to) {
    const w = wMin + r() * (wMax - wMin);
    const h = hMin + r() * (hMax - hMin);
    const a = r();
    const c = r();
    out.push({ x, w, h, kind: (a < 0.55 ? 0 : c < 0.6 ? 1 : 2) as B["kind"] });
    x += w + gap + r() * 6;
  }
  return out;
}

function Tower({ b, fill }: { b: B; fill: string }) {
  const top = BASE - b.h;
  const x2 = b.x + b.w;
  const r = 3;
  let d: string;
  if (b.kind === 1) {
    const i = b.w * 0.22;
    d = `M${b.x} ${BASE}V${top + 26}Q${b.x} ${top + 22} ${b.x + r} ${top + 22}H${b.x + i}V${top + r}Q${b.x + i} ${top} ${b.x + i + r} ${top}H${x2 - i - r}Q${x2 - i} ${top} ${x2 - i} ${top + r}V${top + 22}H${x2 - r}Q${x2} ${top + 22} ${x2} ${top + 26}V${BASE}Z`;
  } else if (b.kind === 2) {
    d = `M${b.x} ${BASE}V${top + 20}Q${b.x} ${top + 14} ${b.x + 5} ${top + 12}L${x2 - 5} ${top}Q${x2} ${top - 1} ${x2} ${top + 5}V${BASE}Z`;
  } else {
    d = `M${b.x} ${BASE}V${top + r}Q${b.x} ${top} ${b.x + r} ${top}H${x2 - r}Q${x2} ${top} ${x2} ${top + r}V${BASE}Z`;
  }
  return <path d={d} fill={fill} />;
}

function Cloud({ x, y, k, drift, delay, op }: { x: number; y: number; k: number; drift: number; delay: number; op: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`} opacity={op}>
      <g className="hs-drift" style={{ ["--dur" as string]: `${drift}s`, ["--dd" as string]: `${delay}s` }} filter="url(#hsc-soft)">
        <g fill="url(#hsc-cloud)">
          <ellipse cx="130" cy="92" rx="132" ry="26" />
          <circle cx="66" cy="72" r="34" />
          <circle cx="118" cy="52" r="46" />
          <circle cx="178" cy="70" r="34" />
          <circle cx="212" cy="86" r="22" />
        </g>
      </g>
    </g>
  );
}

export function HeroScenery({ className }: { className?: string }) {
  const far = skyline(7, 40, W + 40, 34, 60, 360, 640);
  const mid = skyline(21, 60, W + 40, 42, 72, 290, 520);
  const near = skyline(45, 90, W + 40, 50, 88, 160, 330);
  const r = rng(99);
  const lights = Array.from({ length: 26 }, (_, i) => ({ x: 360 + r() * 1120, y: 470 + r() * 360, d: i * 0.37 }));

  return (
    <svg viewBox={`0 0 ${W} 1024`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs>
        <filter id="hsc-soft" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="5" /></filter>
        <filter id="hsc-haze" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.2" /></filter>
        <filter id="hsc-blobblur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22" /></filter>

        <radialGradient id="hsc-blob" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: "var(--blob-a)" }} stopOpacity="1" />
          <stop offset="0.72" style={{ stopColor: "var(--blob-a)" }} stopOpacity="0.75" />
          <stop offset="1" style={{ stopColor: "var(--blob-b)" }} stopOpacity="0" />
        </radialGradient>

        {(["far", "mid", "near"] as const).map((k) => (
          <linearGradient key={k} id={`hsc-t-${k}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: `var(--sky-${k})` }} stopOpacity={k === "far" ? 0.75 : k === "mid" ? 0.9 : 1} />
            <stop offset="0.75" style={{ stopColor: `var(--sky-${k})` }} stopOpacity={k === "far" ? 0.35 : 0.55} />
            <stop offset="1" style={{ stopColor: `var(--sky-${k})` }} stopOpacity="0" />
          </linearGradient>
        ))}

        <linearGradient id="hsc-cloud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--cloud)" }} />
          <stop offset="1" style={{ stopColor: "var(--cloud-shade)" }} />
        </linearGradient>
        <radialGradient id="hsc-ground" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" style={{ stopColor: "var(--ground)" }} stopOpacity="0.9" />
          <stop offset="0.65" style={{ stopColor: "var(--ground)" }} stopOpacity="0.45" />
          <stop offset="1" style={{ stopColor: "var(--ground)" }} stopOpacity="0" />
        </radialGradient>

        <pattern id="hsc-win" width="26" height="38" patternUnits="userSpaceOnUse">
          <rect x="9" y="8" width="4" height="9" rx="1" style={{ fill: "var(--sky-win)" }} />
        </pattern>

        <linearGradient id="hsc-mx" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.02" stopColor="#000" />
          <stop offset="0.16" stopColor="#fff" />
          <stop offset="0.86" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <linearGradient id="hsc-my" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.7" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id="hsc-mask-x" maskUnits="userSpaceOnUse" x="0" y="200" width="1700" height="760"><rect x="0" y="200" width="1700" height="760" fill="url(#hsc-mx)" /></mask>
        <mask id="hsc-mask-y" maskUnits="userSpaceOnUse" x="0" y="200" width="1700" height="760"><rect x="0" y="200" width="1700" height="760" fill="url(#hsc-my)" /></mask>
      </defs>

      {/* backdrop glow, feathered */}
      <g className="hs-fade" style={{ ["--d" as string]: "0.1s" }}>
        <g filter="url(#hsc-blobblur)">
          <ellipse className="hs-blob" cx="960" cy="520" rx="600" ry="440" fill="url(#hsc-blob)" />
        </g>
      </g>

      {/* clouds, placed in the gaps between the cards */}
      <Cloud x={380} y={170} k={0.8} drift={30} delay={0} op={0.85} />
      <Cloud x={1050} y={90} k={0.95} drift={36} delay={-12} op={0.8} />
      <Cloud x={1250} y={470} k={0.6} drift={32} delay={-18} op={0.7} />
      <Cloud x={120} y={500} k={0.5} drift={40} delay={-24} op={0.55} />

      {/* skyline: three depths, each rising in turn */}
      <g mask="url(#hsc-mask-x)">
        <g mask="url(#hsc-mask-y)">
          <g className="hs-rise-soft" style={{ ["--d" as string]: "0.25s" }} filter="url(#hsc-haze)">
            {far.map((b, i) => <Tower key={i} b={b} fill="url(#hsc-t-far)" />)}
          </g>
          <g className="hs-rise-soft" style={{ ["--d" as string]: "0.4s" }}>
            {mid.map((b, i) => <Tower key={i} b={b} fill="url(#hsc-t-mid)" />)}
            <g opacity="0.5">{mid.map((b, i) => <Tower key={i} b={b} fill="url(#hsc-win)" />)}</g>
          </g>
          <g className="hs-rise-soft" style={{ ["--d" as string]: "0.55s" }}>
            {near.map((b, i) => <Tower key={i} b={b} fill="url(#hsc-t-near)" />)}
          </g>
          <g style={{ opacity: "var(--lights-op)" }}>
            {lights.map((l, i) => (
              <rect key={i} className="hs-twinkle-win" x={l.x} y={l.y} width="5" height="8" rx="1.2" fill="#ffd27a" style={{ ["--wd" as string]: `${l.d}s` }} />
            ))}
          </g>
        </g>
      </g>

      {/* soft trees along the ground, same tone as the city */}
      <g className="hs-fade" style={{ ["--d" as string]: "0.7s" }} opacity="0.85">
        {[[170, 860, 1], [235, 878, 0.75], [520, 872, 0.9], [1150, 868, 0.85], [1225, 880, 1.05], [1440, 870, 0.8]].map(([x, y, k], i) => (
          <g key={i} transform={`translate(${x} ${y}) scale(${k})`}>
            <g className="hs-sway-slow" style={{ ["--sd" as string]: `${i * -0.9}s` }}>
              <rect x="-3" y="-6" width="6" height="40" rx="3" fill="url(#hsc-t-near)" />
              <circle cx="0" cy="-34" r="30" fill="url(#hsc-t-mid)" />
              <circle cx="-20" cy="-14" r="20" fill="url(#hsc-t-mid)" />
              <circle cx="20" cy="-16" r="22" fill="url(#hsc-t-mid)" />
            </g>
          </g>
        ))}
      </g>

      {/* ground haze tying buildings and background together */}
      <ellipse cx="800" cy="905" rx="860" ry="150" fill="url(#hsc-ground)" />

      {/* road sweeping in from the right */}
      <g className="hs-fade" style={{ ["--d" as string]: "0.5s" }}>
        <path d="M1536 720C1400 755 1290 810 1170 905L1536 965Z" style={{ fill: "var(--road)" }} opacity="0.75" />
        <path d="M1536 752C1415 788 1320 842 1225 918" fill="none" strokeWidth="4" strokeLinecap="round" strokeDasharray="20 22" className="hs-road-dash" style={{ stroke: "var(--road-line)" }} opacity="0.9" />
      </g>
    </svg>
  );
}
