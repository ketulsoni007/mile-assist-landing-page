import { INDIA } from "@/components/svg/india-data";
import { PlayOnView } from "@/components/features/PlayOnView";

/**
 * Dotted India with highway routes drawing between cities, pulsing city pins, and a car icon travelling the
 * main corridor (Delhi → Jaipur → Ahmedabad → Mumbai → Pune → Bengaluru → Chennai). Generated map data,
 * pure SVG + CSS ("ar-*" in app/features.css).
 */
// label side per city (unlisted cities show a pin only, to keep the map clean)
const LABEL: Record<string, "l" | "r"> = { Delhi: "r", Jaipur: "l", Ahmedabad: "l", Mumbai: "l", Bengaluru: "l", Chennai: "r", Hyderabad: "r", Kolkata: "r", Lucknow: "r" };

const P = Object.fromEntries(INDIA.pins.map((p) => [p.name, p])) as Record<string, { x: number; y: number; name: string }>;

const curve = (a: string, b: string, bend = 0.18) => {
  const p = P[a], q = P[b];
  const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2;
  const dx = q.x - p.x, dy = q.y - p.y;
  return `Q${(mx - dy * bend).toFixed(1)} ${(my + dx * bend).toFixed(1)} ${q.x} ${q.y}`;
};
const chain = (names: string[]) => `M${P[names[0]].x} ${P[names[0]].y}` + names.slice(1).map((n, i) => curve(names[i], n)).join("");

const MAIN = chain(["Delhi", "Jaipur", "Ahmedabad", "Mumbai", "Pune", "Bengaluru", "Chennai"]);
const SIDE = [chain(["Delhi", "Lucknow", "Kolkata"]), chain(["Ahmedabad", "Indore", "Hyderabad", "Bengaluru"]), chain(["Mumbai", "Hyderabad", "Chennai"]), chain(["Ahmedabad", "Surat", "Mumbai"])];

export function IndiaRoutes({ className }: { className?: string }) {
  return (
    <PlayOnView className={className}>
      <svg viewBox={`0 0 ${INDIA.w} ${INDIA.h}`} className="h-auto w-full overflow-visible" role="img" aria-label="Map of India with Miles Assist routes connecting Delhi, Jaipur, Ahmedabad, Surat, Mumbai, Pune, Indore, Hyderabad, Bengaluru, Chennai, Lucknow and Kolkata">
        <defs>
          <linearGradient id="ar-main" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff5a00" />
            <stop offset="1" stopColor="#ff9a52" />
          </linearGradient>
        </defs>
        <path d={INDIA.path} fill="none" strokeLinecap="round" strokeWidth="4.2" style={{ stroke: "var(--map-dot)" }} className="ar-dots" />

        {SIDE.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#2f6bff" strokeOpacity="0.55" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1" pathLength={1} className="ar-route" style={{ animationDelay: `${0.8 + i * 0.35}s` }} />
        ))}
        <path d={MAIN} fill="none" stroke="url(#ar-main)" strokeOpacity="0.25" strokeWidth="10" strokeLinecap="round" />
        <path d={MAIN} fill="none" stroke="url(#ar-main)" strokeWidth="4" strokeLinecap="round" strokeDasharray="1" pathLength={1} className="ar-route" style={{ animationDelay: "0.3s" }} />

        {INDIA.pins.map((p, i) => (
          <g key={p.name} transform={`translate(${p.x} ${p.y})`}>
            <g className="ar-pin" style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
              <circle r="7" fill="none" stroke="#ff5a00" strokeWidth="2" className="ar-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
              <circle r="6" fill="#ff5a00" stroke="var(--color-surface)" strokeWidth="2.5" />
              {LABEL[p.name] && (
                <text x={LABEL[p.name] === "l" ? -12 : 12} y="5" textAnchor={LABEL[p.name] === "l" ? "end" : "start"} fontSize="15" fontWeight="800" paintOrder="stroke" strokeWidth="4" strokeLinejoin="round" style={{ fill: "var(--color-heading)", stroke: "var(--color-surface)" }} fontFamily="inherit">{p.name}</text>
              )}
            </g>
          </g>
        ))}

        <g className="ar-car" style={{ offsetPath: `path("${MAIN}")` }}>
          <circle r="13" fill="#fff" stroke="#ff5a00" strokeWidth="3" />
          <path d="M-7 2.5c0-1.4.8-2.3 2.2-2.6l1.8-3.4c.4-.8 1.2-1.2 2-1.2h2c.8 0 1.5.4 1.9 1l2 3.6c1.3.3 2.1 1.2 2.1 2.6v1.4H-7z" fill="#ff5a00" transform="translate(-2 0)" />
          <circle cx="-5" cy="5" r="1.8" fill="#081e4c" /><circle cx="4" cy="5" r="1.8" fill="#081e4c" />
        </g>
      </svg>
    </PlayOnView>
  );
}
