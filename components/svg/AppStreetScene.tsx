/**
 * Detailed street scene for the "Get the App" banner (viewBox 640 x 460, drawn for the soft themed card; sky colours come from --as-* in globals.css).
 * Story on an 8s loop: the car drives in, stops at the partner restaurant, a cashback coin pops up,
 * then it drives on past the partner hotel. Pure SVG + CSS (classes "as-*" in app/hero-scene.css).
 */

const NAVY = "#1d2652";
const CREAM = "#fff6ec";

// far skyline silhouettes [x, height, width]
const SKY: [number, number, number][] = [
  [10, 120, 40], [54, 170, 34], [92, 130, 46], [142, 200, 30], [176, 150, 44], [226, 110, 36],
  [380, 180, 40], [560, 210, 36], [600, 150, 40],
];

function Tree({ x, y, k = 1 }: { x: number; y: number; k?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <g className="as-sway">
        <rect x="-3" y="-4" width="6" height="30" rx="3" fill="#8a4316" />
        <circle cx="0" cy="-22" r="20" fill="#2e9b5a" />
        <circle cx="-13" cy="-8" r="14" fill="#3cb36b" />
        <circle cx="13" cy="-10" r="15" fill="#34a862" />
        <circle cx="-5" cy="-28" r="7" fill="#7fd99f" opacity="0.6" />
      </g>
    </g>
  );
}

function Lamp({ x, d = 0 }: { x: number; d?: number }) {
  return (
    <g>
      <rect x={x - 1.5} y="306" width="3" height="68" rx="1.5" fill={NAVY} />
      <path d={`M${x} 308q0-10 12-10`} fill="none" stroke={NAVY} strokeWidth="3" strokeLinecap="round" />
      <ellipse cx={x + 14} cy="300" rx="7" ry="3.5" fill={NAVY} />
      <circle cx={x + 14} cy="305" r="12" fill="#fff3c4" opacity="0.45" className="as-lamp" style={{ animationDelay: `${d}s` }} />
      <circle cx={x + 14} cy="304" r="3.4" fill="#fff6d6" />
    </g>
  );
}

export function AppStreetScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 460" className={className} preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <defs>
        <linearGradient id="as-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262f63" />
          <stop offset="1" stopColor={NAVY} />
        </linearGradient>
        <linearGradient id="as-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bcd3ff" />
          <stop offset="1" stopColor="#7d9fe6" />
        </linearGradient>
        <radialGradient id="as-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff8e1" />
          <stop offset="0.6" stopColor="#ffe3a3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffe3a3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="as-head" cx="0" cy="0.5" r="1">
          <stop offset="0" stopColor="#fff6c9" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff6c9" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sun with turning rays */}
      <g transform="translate(560 70)">
        <circle r="70" fill="url(#as-sun)" />
        <g className="as-spin" stroke="#fff3cf" strokeWidth="3" strokeLinecap="round" opacity="0.7">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1="0" y1="-38" x2="0" y2="-50" transform={`rotate(${i * 30})`} />
          ))}
        </g>
        <circle r="26" style={{ fill: "var(--as-sun)" }} />
      </g>

      {/* birds */}
      <g className="as-birds" fill="none" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" style={{ stroke: "var(--as-bird)" }}>
        <path d="M120 70q6-7 12 0q6-7 12 0" className="as-flap" />
        <path d="M150 52q5-6 10 0q5-6 10 0" className="as-flap" style={{ animationDelay: "-0.3s" }} />
        <path d="M96 48q4-5 8 0q4-5 8 0" className="as-flap" style={{ animationDelay: "-0.6s" }} />
      </g>

      {/* clouds */}
      <g className="hs-drift" style={{ ["--dur" as string]: "22s", fill: "var(--as-cloud)" }}>
        <g opacity="0.95"><ellipse cx="300" cy="112" rx="52" ry="15" /><circle cx="282" cy="102" r="18" /><circle cx="308" cy="92" r="23" /><circle cx="332" cy="104" r="15" /></g>
      </g>
      <g className="hs-drift" style={{ ["--dur" as string]: "30s", ["--dd" as string]: "-9s", fill: "var(--as-cloud)" }} opacity="0.7">
        <ellipse cx="460" cy="150" rx="36" ry="10" /><circle cx="448" cy="143" r="13" /><circle cx="468" cy="137" r="16" />
      </g>

      {/* far skyline with window dots */}
      <g opacity="0.16" style={{ fill: "var(--as-skyline)" }}>
        {SKY.map(([x, h, w], i) => <rect key={i} x={x} y={372 - h} width={w} height={h} rx="3" />)}
      </g>
      <g opacity="0.22" style={{ fill: "var(--as-skyline)" }}>
        {SKY.map(([x, h, w], i) =>
          Array.from({ length: Math.floor((h - 24) / 22) }, (_, r) => (
            <g key={`${i}-${r}`}>
              <rect x={x + 7} y={372 - h + 12 + r * 22} width="6" height="8" rx="1" />
              {w > 36 && <rect x={x + w - 13} y={372 - h + 12 + r * 22} width="6" height="8" rx="1" />}
            </g>
          )),
        )}
      </g>

      {/* ───────── partner hotel ───────── */}
      <g>
        <rect x="446" y="146" width="112" height="228" rx="4" fill={CREAM} />
        <rect x="528" y="146" width="30" height="228" fill="#ffe1c9" />
        <rect x="440" y="136" width="124" height="14" rx="4" fill={NAVY} />
        <rect x="490" y="118" width="22" height="20" rx="3" fill={NAVY} />
        {Array.from({ length: 7 }, (_, r) =>
          Array.from({ length: 4 }, (_, c) => {
            const lit = (r * 4 + c) % 3 === 0;
            return (
              <rect
                key={`${r}-${c}`}
                x={458 + c * 24}
                y={162 + r * 24}
                width="14"
                height="15"
                rx="2"
                fill={lit ? "#ffd27a" : "url(#as-glass)"}
                className={lit ? "as-win" : undefined}
                style={lit ? { animationDelay: `${(r + c) * 0.4}s` } : undefined}
              />
            );
          }),
        )}
        {/* vertical neon sign */}
        <g className="as-neon">
          <rect x="424" y="172" width="24" height="104" rx="5" fill="#ff5a00" stroke="#fff" strokeWidth="2.5" />
          {"HOTEL".split("").map((ch, i) => (
            <text key={i} x="436" y={194 + i * 19} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">{ch}</text>
          ))}
        </g>
        {/* entrance */}
        <rect x="474" y="324" width="58" height="8" rx="3" fill="#ff5a00" />
        <rect x="484" y="332" width="38" height="42" rx="3" fill={NAVY} />
        <rect x="502" y="336" width="2" height="38" fill="#fff" opacity="0.3" />
        <text x="503" y="316" textAnchor="middle" fontSize="11" fill="#ffb800">★★★</text>
      </g>

      {/* ───────── partner restaurant ───────── */}
      <g>
        <rect x="246" y="262" width="156" height="112" rx="3" fill={CREAM} />
        <rect x="240" y="252" width="168" height="12" rx="3" fill={NAVY} />
        {/* signboard with blinking bulbs */}
        <rect x="268" y="214" width="112" height="34" rx="8" fill={NAVY} />
        <g className="as-bulbs" fill="#ffd27a">
          {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={278 + i * 11.5} cy="218.5" r="1.8" style={{ animationDelay: `${i * 0.15}s` }} />)}
        </g>
        <g transform="translate(282 226)" stroke="#ff8a3d" strokeWidth="2.4" strokeLinecap="round" fill="none">
          <path d="M2 0v14M6 0v6c0 2-2 3-4 3S-2 8-2 6V0M6 14" />
          <path d="M14 0c3 2 3 7 0 9v5" />
        </g>
        <text x="342" y="238" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif" letterSpacing="1">DHABA</text>
        {/* striped awning with scalloped edge */}
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={246 + i * 19.5} y="270" width="19.5" height="22" fill={i % 2 ? "#fff" : "#ff5a00"} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <circle key={i} cx={255.75 + i * 19.5} cy="292" r="9.75" fill={i % 2 ? "#fff" : "#ff5a00"} />
        ))}
        {/* window with diners + door */}
        <rect x="258" y="310" width="78" height="50" rx="4" fill="url(#as-glass)" stroke={NAVY} strokeWidth="3" />
        <g fill={NAVY} opacity="0.55">
          <circle cx="278" cy="336" r="6" /><rect x="271" y="342" width="14" height="14" rx="5" />
          <circle cx="314" cy="334" r="6" /><rect x="307" y="340" width="14" height="16" rx="5" />
        </g>
        <rect x="262" y="350" width="70" height="4" rx="2" fill="#8a4316" />
        <path d="M268 316l14-4M300 314l18-5" stroke="#fff" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <rect x="350" y="310" width="38" height="64" rx="3" fill={NAVY} />
        <circle cx="381" cy="344" r="2.5" fill="#ffd27a" />
        <rect x="356" y="318" width="26" height="20" rx="2" fill="url(#as-glass)" opacity="0.7" />
        {/* verified partner badge */}
        <g transform="translate(402 262)">
          <circle r="14" fill="#16a34a" stroke="#fff" strokeWidth="3" />
          <path d="M-6 0l4 4 8-8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* outdoor umbrella table */}
      <g transform="translate(212 310)">
        <rect x="-1.5" y="0" width="3" height="56" fill={NAVY} />
        <path d="M-30 6Q0-22 30 6Z" fill="#ff5a00" />
        <path d="M-10 6Q0-22 10 6Z" fill="#fff" />
        <rect x="-18" y="44" width="36" height="5" rx="2" fill="#8a4316" />
        <rect x="-14" y="49" width="3" height="16" fill="#8a4316" /><rect x="11" y="49" width="3" height="16" fill="#8a4316" />
      </g>

      <Tree x={160} y={346} k={1.05} />
      <Tree x={424} y={352} k={0.8} />
      <Tree x={608} y={346} k={1.1} />
      <Lamp x={110} />
      <Lamp x={588} d={-1.2} />

      {/* pin over the restaurant */}
      <g className="as-pin">
        <ellipse cx="324" cy="206" rx="9" ry="3" fill="#000" opacity="0.18" />
        <path d="M324 204C324 204 304 180 304 166A20 20 0 1 1 344 166C344 180 324 204 324 204Z" fill="#fff" />
        <circle cx="324" cy="166" r="8.5" fill="#ff5a00" />
      </g>

      {/* sidewalk, kerb, road */}
      <rect x="0" y="372" width="640" height="16" fill="#ffd9bf" />
      <g fill="#ffc8a3">{Array.from({ length: 22 }, (_, i) => <rect key={i} x={i * 30} y="372" width="1.5" height="16" />)}</g>
      <rect x="0" y="388" width="640" height="5" fill="#fff" />
      <rect x="0" y="393" width="640" height="54" fill="url(#as-road)" />
      <path d="M-20 420H660" stroke="#fff" strokeWidth="3.5" strokeDasharray="24 18" className="as-dash" opacity="0.9" />
      <rect x="0" y="443" width="640" height="3" fill="#fff" opacity="0.35" />
      <rect x="0" y="447" width="640" height="20" fill="#ffb37a" />

      {/* cashback coin pops when the car stops at the restaurant */}
      <g className="as-coin">
        <circle cx="324" cy="356" r="15" fill="#ffc83d" stroke="#fff" strokeWidth="3" />
        <text x="324" y="361.5" textAnchor="middle" fontSize="15" fontWeight="800" fill="#8a5a00" fontFamily="system-ui, sans-serif">₹</text>
        <rect x="290" y="324" width="68" height="20" rx="10" fill="#16a34a" />
        <text x="324" y="338" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff" fontFamily="system-ui, sans-serif">Cashback!</text>
      </g>

      {/* the car (your artwork) with headlight beam */}
      <g className="as-car">
        <path d="M96 418L190 404V432Z" fill="url(#as-head)" className="as-beam" />
        <ellipse cx="48" cy="434" rx="44" ry="4" fill="#000" opacity="0.25" />
        <image href="/icons/car.svg" x="0" y="397" width="96" height="38" />
      </g>
    </svg>
  );
}
