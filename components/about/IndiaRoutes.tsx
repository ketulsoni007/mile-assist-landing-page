import { BadgeIndianRupee, Hotel, Utensils } from "lucide-react";
import { INDIA } from "@/components/svg/india-data";
import { PlayOnView } from "@/components/features/PlayOnView";
import { stats } from "@/lib/content";

/**
 * About hero map: dotted India (generated from Natural Earth data) with highway routes drawing between cities,
 * an HQ radar at Ahmedabad, partner food/stay pins popping up along the routes, light pulses travelling the side
 * routes, and the brand car (public/icons/car.svg) driving the main corridor. Glass info cards float on top.
 * Pure SVG + CSS ("ar-*" in app/features.css), all positions in map units so it scales on every screen.
 */
type Pt = { x: number; y: number; name: string };
const P = Object.fromEntries(INDIA.pins.map((p) => [p.name, p])) as Record<string, Pt>;
const W = INDIA.w;
const H = INDIA.h;

const LABEL: Record<string, "l" | "r"> = { Delhi: "r", Jaipur: "l", Ahmedabad: "l", Mumbai: "l", Bengaluru: "l", Chennai: "r", Hyderabad: "r", Kolkata: "r", Lucknow: "r" };

const BEND = 0.18;
const ctrl = (a: string, b: string) => {
  const p = P[a], q = P[b];
  return { x: (p.x + q.x) / 2 - (q.y - p.y) * BEND, y: (p.y + q.y) / 2 + (q.x - p.x) * BEND };
};
const chain = (names: string[]) =>
  `M${P[names[0]].x} ${P[names[0]].y}` +
  names
    .slice(1)
    .map((n, i) => {
      const c = ctrl(names[i], n);
      return `Q${c.x.toFixed(1)} ${c.y.toFixed(1)} ${P[n].x} ${P[n].y}`;
    })
    .join("");
/** point halfway along the curve between two cities */
const mid = (a: string, b: string) => {
  const p = P[a], q = P[b], c = ctrl(a, b);
  return { x: 0.25 * p.x + 0.5 * c.x + 0.25 * q.x, y: 0.25 * p.y + 0.5 * c.y + 0.25 * q.y };
};

const MAIN_CITIES = ["Delhi", "Jaipur", "Ahmedabad", "Mumbai", "Pune", "Bengaluru", "Chennai"];
const MAIN = chain(MAIN_CITIES);
const SIDE = [["Delhi", "Lucknow", "Kolkata"], ["Ahmedabad", "Indore", "Hyderabad", "Bengaluru"], ["Mumbai", "Hyderabad", "Chennai"], ["Ahmedabad", "Surat", "Mumbai"]].map(chain);

// partner stops along the routes
const STOPS: { a: string; b: string; kind: "food" | "stay" }[] = [
  { a: "Delhi", b: "Jaipur", kind: "food" },
  { a: "Jaipur", b: "Ahmedabad", kind: "stay" },
  { a: "Mumbai", b: "Pune", kind: "food" },
  { a: "Pune", b: "Bengaluru", kind: "stay" },
  { a: "Bengaluru", b: "Chennai", kind: "food" },
  { a: "Lucknow", b: "Kolkata", kind: "stay" },
  { a: "Indore", b: "Hyderabad", kind: "food" },
  { a: "Delhi", b: "Lucknow", kind: "food" },
];

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(2)}%`;
const CAR_W = 58;
const CAR_H = (CAR_W * 705) / 1798;

function Fork() {
  return <path d="M-3.2 -5v4.2M0 -5v4.2M3.2 -5v4.2M-3.2 -0.8h6.4M0 -0.8v6" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />;
}
function Bed() {
  return <path d="M-5 4v-7M-5 1h10v3M-2 1v-2.2h6.2a1.2 1.2 0 0 1 1.2 1.2v1M-3.3 -0.4a1.2 1.2 0 1 0 0.01 0" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />;
}

export function IndiaRoutes({ className }: { className?: string }) {
  const hq = P.Ahmedabad;
  const partners = stats.find((s) => s.id === "partners");
  const cities = stats.find((s) => s.id === "cities");

  return (
    <PlayOnView className={className}>
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" role="img" aria-label="Map of India showing Miles Assist routes and partner stops between Delhi, Jaipur, Ahmedabad, Surat, Mumbai, Pune, Indore, Hyderabad, Bengaluru, Chennai, Lucknow and Kolkata">
          <defs>
            <linearGradient id="ar-dots" x1="0" y1="0" x2="0.3" y2="1">
              <stop offset="0" stopColor="#2f6bff" stopOpacity="0.55" />
              <stop offset="0.55" stopColor="#7c5cff" stopOpacity="0.4" />
              <stop offset="1" stopColor="#ff5a00" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="ar-main" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff5a00" />
              <stop offset="1" stopColor="#ff9a52" />
            </linearGradient>
            <radialGradient id="ar-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ff5a00" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ff5a00" stopOpacity="0" />
            </radialGradient>
            <filter id="ar-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
          </defs>

          {/* seas + compass */}
          <g className="ar-dots" fontFamily="inherit" fontStyle="italic" fontWeight="600" fontSize="15" letterSpacing="3" style={{ fill: "var(--color-muted)" }} opacity="0.55">
            <text x="18" y="600">ARABIAN SEA</text>
            <text x="395" y="520">BAY OF BENGAL</text>
          </g>
          <g transform="translate(548 600)" className="ar-dots" opacity="0.7">
            <circle r="26" fill="none" style={{ stroke: "var(--color-line)" }} strokeWidth="1.5" />
            <path d="M0 -20L5 0L0 20L-5 0Z" style={{ fill: "var(--color-muted)" }} opacity="0.5" />
            <path d="M0 -20L5 0H-5Z" fill="#ff5a00" />
            <text y="-30" textAnchor="middle" fontSize="12" fontWeight="800" fill="#ff5a00" fontFamily="inherit">N</text>
          </g>

          {/* country */}
          <path d={INDIA.path} fill="none" strokeLinecap="round" strokeWidth="4.4" stroke="url(#ar-dots)" className="ar-dots" />

          {/* HQ glow + radar */}
          <circle cx={hq.x} cy={hq.y} r="70" fill="url(#ar-glow)" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={hq.x} cy={hq.y} r="16" fill="none" stroke="#ff5a00" strokeWidth="2" className="ar-radar" style={{ animationDelay: `${i * 1}s` }} />
          ))}

          {/* routes */}
          {SIDE.map((d, i) => (
            <g key={i}>
              <path d={d} fill="none" stroke="#2f6bff" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1" pathLength={1} className="ar-route" style={{ animationDelay: `${0.8 + i * 0.35}s` }} />
              <g className="ar-trip" style={{ offsetPath: `path("${d}")`, animationDelay: `${2.5 + i * 1.3}s`, animationDuration: `${6 + i}s` }}>
                <circle r="7" fill="#2f6bff" opacity="0.35" filter="url(#ar-soft)" />
                <circle r="3.2" fill="#9db8ff" />
              </g>
            </g>
          ))}
          <path d={MAIN} fill="none" stroke="url(#ar-main)" strokeOpacity="0.22" strokeWidth="12" strokeLinecap="round" />
          <path d={MAIN} fill="none" stroke="url(#ar-main)" strokeWidth="4" strokeLinecap="round" strokeDasharray="1" pathLength={1} className="ar-route" style={{ animationDelay: "0.3s" }} />
          <path d={MAIN} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.2" strokeDasharray="0.012 0.02" pathLength={1} className="ar-flow" />

          {/* partner stops */}
          {STOPS.map(({ a, b, kind }, i) => {
            const m = mid(a, b);
            return (
              <g key={i} transform={`translate(${m.x.toFixed(1)} ${m.y.toFixed(1)})`}>
                <g className="ar-stop" style={{ animationDelay: `${1.6 + i * 0.18}s` }}>
                  <path d="M0 0C0 0-11-12-11-19A11 11 0 1 1 11-19C11-12 0 0 0 0Z" fill={kind === "food" ? "#ff5a00" : "#7c5cff"} stroke="var(--color-surface)" strokeWidth="2" />
                  <g transform="translate(0 -19)">{kind === "food" ? <Fork /> : <Bed />}</g>
                </g>
              </g>
            );
          })}

          {/* cities */}
          {INDIA.pins.map((p, i) => (
            <g key={p.name} transform={`translate(${p.x} ${p.y})`}>
              <g className="ar-pin" style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
                {p.name !== "Ahmedabad" && <circle r="7" fill="none" stroke="#ff5a00" strokeWidth="2" className="ar-pulse" style={{ animationDelay: `${i * 0.3}s` }} />}
                <circle r={p.name === "Ahmedabad" ? 9 : 6} fill={p.name === "Ahmedabad" ? "#081e4c" : "#ff5a00"} stroke={p.name === "Ahmedabad" ? "#ff5a00" : "var(--color-surface)"} strokeWidth={p.name === "Ahmedabad" ? 3.5 : 2.5} />
                {LABEL[p.name] && (
                  <text x={LABEL[p.name] === "l" ? -14 : 14} y="5" textAnchor={LABEL[p.name] === "l" ? "end" : "start"} fontSize="15" fontWeight="800" paintOrder="stroke" strokeWidth="4" strokeLinejoin="round" style={{ fill: "var(--color-heading)", stroke: "var(--color-surface)" }} fontFamily="inherit">
                    {p.name}
                  </text>
                )}
              </g>
            </g>
          ))}

          {/* HQ tag */}
          <g transform={`translate(${hq.x} ${hq.y - 22})`}>
            <g className="ar-pin" style={{ animationDelay: "0.9s" }}>
              <rect x="-17" y="-20" width="34" height="20" rx="10" fill="#ff5a00" />
              <path d="M-4 0L0 5L4 0Z" fill="#ff5a00" />
              <text x="0" y="-6" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#fff" fontFamily="inherit">HQ</text>
            </g>
          </g>

          {/* the car, upright, driving the main corridor */}
          <g className="ar-car" style={{ offsetPath: `path("${MAIN}")` }}>
            <ellipse cx="0" cy={CAR_H / 2 + 2} rx={CAR_W * 0.42} ry="3.5" fill="#000" opacity="0.25" />
            <circle r="22" fill="#ff5a00" opacity="0.18" filter="url(#ar-soft)" />
            <image href="/icons/car.svg" x={-CAR_W / 2} y={-CAR_H / 2 - 4} width={CAR_W} height={CAR_H} />
          </g>
        </svg>

        {/* floating glass cards */}
        <div className="ar-card pointer-events-none absolute z-10 hidden -translate-x-[115%] -translate-y-1/2 sm:block" style={{ left: pct(P.Jaipur.x, W), top: pct(P.Jaipur.y - 40, H), animationDelay: "2.2s" }}>
          <div className="hs-float flex items-center gap-2.5 rounded-2xl border border-white/70 bg-card/90 px-3 py-2.5 shadow-card backdrop-blur-xl dark:border-white/10">
            <span className="grid size-8 place-items-center rounded-xl bg-brand-orange text-white"><Utensils className="size-4" /></span>
            <span className="leading-tight"><span className="block text-xs font-extrabold text-heading">Free meal unlocked</span><span className="text-[0.65rem] text-muted">Partner dhaba · NH 48</span></span>
          </div>
        </div>
        <div className="ar-card pointer-events-none absolute z-10 hidden sm:block" style={{ left: pct(P.Chennai.x + 14, W), top: pct(P.Chennai.y + 26, H), animationDelay: "3s" }}>
          <div className="hs-float flex items-center gap-2.5 rounded-2xl border border-white/70 bg-card/90 px-3 py-2.5 shadow-card backdrop-blur-xl dark:border-white/10" style={{ animationDelay: "-2s" }}>
            <span className="grid size-8 place-items-center rounded-xl bg-emerald-500 text-white"><BadgeIndianRupee className="size-4" /></span>
            <span className="leading-tight"><span className="block text-xs font-extrabold text-heading">Cashback credited</span><span className="text-[0.65rem] text-muted">Bill verified</span></span>
          </div>
        </div>
        <div className="ar-card pointer-events-none absolute right-0 top-[6%] z-10 hidden sm:block" style={{ animationDelay: "1.6s" }}>
          <div className="rounded-2xl border border-white/70 bg-card/90 p-3 shadow-card backdrop-blur-xl dark:border-white/10">
            <p className="text-[0.6rem] font-extrabold uppercase tracking-widest text-muted">On the map</p>
            <div className="mt-1.5 space-y-1 text-xs font-bold text-heading">
              <p className="flex items-center gap-1.5"><span className="grid size-4 place-items-center rounded-full bg-brand-orange"><Utensils className="size-2.5 text-white" /></span> Food partners</p>
              <p className="flex items-center gap-1.5"><span className="grid size-4 place-items-center rounded-full bg-[#7c5cff]"><Hotel className="size-2.5 text-white" /></span> Stay partners</p>
            </div>
            {partners && cities && (
              <p className="mt-2 border-t border-line pt-2 text-[0.68rem] font-semibold text-muted">
                <b className="text-brand-orange">{partners.value.toLocaleString("en-IN")}+</b> partners · <b className="text-brand-orange">{cities.value}+</b> cities
              </p>
            )}
          </div>
        </div>
      </div>
    </PlayOnView>
  );
}
