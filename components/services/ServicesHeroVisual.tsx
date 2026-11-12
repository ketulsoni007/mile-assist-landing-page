import { Gavel, Headset, Hotel, Phone, ShieldCheck, Truck, Utensils } from "lucide-react";
import { PlayOnView } from "@/components/features/PlayOnView";

/**
 * Services hero: a bento grid. The big tile is a live roadside-assistance map (a helper truck drives along the
 * road to the stranded driver, ETA counts down); the small tiles are the other free services. Sizes in rem.
 */
const TILES = [
  { Icon: Utensils, t: "Free food", s: "Partner dhabas", c: "#ff5a00" },
  { Icon: Hotel, t: "Free stay", s: "Partner hotels", c: "#7c5cff" },
  { Icon: ShieldCheck, t: "Insurance", s: "Personal support", c: "#2f6bff" },
  { Icon: Gavel, t: "Lawyer", s: "First call free", c: "#0ea5a4" },
  { Icon: Headset, t: "24/7 Support", s: "Always on", c: "#16a34a" },
];
const ROAD = "M-10 150C60 140 90 70 160 66S260 120 330 40";

export function ServicesHeroVisual() {
  return (
    <PlayOnView className="relative mx-auto w-full max-w-[36rem]">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-[#e0457b]/20 via-brand-orange/15 to-[#2f6bff]/20 blur-3xl" aria-hidden="true" />
      <div className="grid grid-cols-3 gap-3">
        {/* roadside map tile */}
        <div className="sv-in col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] border border-white/70 bg-card/90 shadow-[0_30px_60px_-30px_rgb(8_30_76/0.5)] ring-1 ring-line backdrop-blur-xl dark:border-white/10">
          <div className="flex items-center gap-2 px-4 pt-3.5">
            <span className="grid size-8 place-items-center rounded-xl bg-[#e0457b] text-white"><Truck className="size-4" /></span>
            <span className="leading-tight"><span className="block text-sm font-extrabold text-heading">Roadside Assistance</span><span className="text-[0.65rem] text-muted">Help on the way</span></span>
            <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.6rem] font-extrabold text-emerald-600 dark:text-emerald-400">FREE</span>
          </div>
          <div className="relative mx-3 mt-3 aspect-[330/190] overflow-hidden rounded-xl" style={{ background: "var(--map-bg)" }}>
            <svg viewBox="0 0 330 190" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g style={{ fill: "var(--map-block-2)" }}><rect x="10" y="10" width="70" height="40" rx="6" /><rect x="200" y="140" width="80" height="40" rx="6" /><rect x="240" y="70" width="70" height="36" rx="6" /></g>
              <g style={{ fill: "var(--map-park)" }}><rect x="100" y="120" width="70" height="56" rx="10" /><rect x="110" y="8" width="60" height="34" rx="10" /></g>
              <path d={ROAD} fill="none" strokeWidth="16" strokeLinecap="round" style={{ stroke: "var(--map-street)" }} />
              <path d={ROAD} fill="none" stroke="#e0457b" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1" pathLength={1} className="sv-route" />
              <g className="sv-truck"><circle r="11" fill="#e0457b" stroke="#fff" strokeWidth="2.5" /><path d="M-5 -2h6v5h-6zM1 0h3l2 2v1h-5z" fill="#fff" /></g>
              <g transform="translate(330 40)">
                <circle r="16" fill="#ff5a00" opacity="0.2" className="fm-ping" />
                <circle r="8" fill="#ff5a00" stroke="#fff" strokeWidth="2.5" />
              </g>
            </svg>
          </div>
          <div className="flex items-center gap-3 px-4 pb-4 pt-3">
            <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e0457b] to-brand-orange text-white"><span className="absolute inset-0 animate-ping rounded-full bg-[#e0457b]/40" /><Phone className="relative size-4" /></span>
            <span className="min-w-0 flex-1 leading-tight"><span className="block truncate text-sm font-extrabold text-heading">Need Help · live call</span><span className="text-[0.65rem] text-muted">Miles support team connected</span></span>
            <span className="rounded-xl bg-surface-alt px-2.5 py-1.5 text-center ring-1 ring-line"><span className="block text-[0.55rem] font-bold uppercase text-muted">ETA</span><span className="sv-eta block text-sm font-extrabold text-heading" /></span>
          </div>
        </div>

        {TILES.map(({ Icon, t, s, c }, i) => (
          <div key={t} className="sv-in group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-white/70 bg-card/90 p-3.5 shadow-card ring-1 ring-line backdrop-blur-xl dark:border-white/10" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
            <span className="pointer-events-none absolute -right-6 -top-6 size-16 rounded-full opacity-25 blur-xl" style={{ background: c }} aria-hidden="true" />
            <span className="sv-bob relative grid size-10 place-items-center rounded-xl text-white shadow-md" style={{ background: `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 55%, #fff))`, animationDelay: `${i * -0.7}s` }}><Icon className="size-5" /></span>
            <p className="relative mt-2.5 text-sm font-extrabold leading-tight text-heading">{t}</p>
            <p className="relative text-[0.65rem] text-muted">{s}</p>
            {i < 2 && <span className="relative mt-auto w-fit rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.6rem] font-extrabold text-emerald-600 dark:text-emerald-400">FREE on duty</span>}
          </div>
        ))}
      </div>
    </PlayOnView>
  );
}
