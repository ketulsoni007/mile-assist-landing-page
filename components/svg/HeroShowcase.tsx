import { BadgeCheck, Bell, BatteryFull, Car, Headset, Hotel, LocateFixed, Minus, Mic, Navigation, Plus, Receipt, Search, ShieldCheck, Signal, Utensils, Wallet, Wifi, type LucideIcon } from "lucide-react";
import { LogoHorizontal } from "@/components/brand/LogoHorizontal";
import { HeroScenery } from "./HeroScenery";
import { PhoneMap } from "./PhoneMap";
import { SearchTyper } from "./SearchTyper";

/**
 * Hero visual: an app-phone mockup (live map, search, tab bar) inside an animated dashed ring, with the service
 * cards sitting on the ring, over the city / cloud scenery. Everything is sized in container-query units (cqw) so it
 * scales as one piece, and it is live markup, so it follows the light/dark theme.
 * Ring and card coordinates are in a 1500 x 1000 box (the 3:2 container).
 * The illustrated version lives on in components/svg/HeroScene.tsx + public/hero/ (currently unused).
 */

const VB_W = 1500;
const VB_H = 1000;
// phone box, in % of the container (used for both the phone and the ring centre, so they always line up)
const PHONE = { left: 36.5, top: 2, width: 27, ratio: 18.6 / 9 };
const PHONE_CX = (VB_W * (PHONE.left + PHONE.width / 2)) / 100;
const PHONE_CY = (VB_H * PHONE.top) / 100 + (VB_W * (PHONE.width / 100) * PHONE.ratio) / 2;
// a true circle (rx = ry) centred on the phone; the SVG keeps its aspect, so it stays round
const RING = { cx: PHONE_CX, cy: PHONE_CY, rx: 470, ry: 470 };
const ringPath = (r: { cx: number; cy: number; rx: number; ry: number }) =>
  `M${r.cx - r.rx} ${r.cy}a${r.rx} ${r.ry} 0 1 0 ${r.rx * 2} 0a${r.rx} ${r.ry} 0 1 0 ${-r.rx * 2} 0`;

type Chip = { Icon: LucideIcon; label: string; sub: string; color: string; angle: number; depth: 1 | 2 | 3 };

// position on the ring in degrees (0 = right, clockwise because y points down)
const chips: Chip[] = [
  { Icon: Utensils, label: "Free food", sub: "On your route", color: "#ff5a00", angle: 222, depth: 2 },
  { Icon: Hotel, label: "Free stay", sub: "At partner hotels", color: "#7c5cff", angle: 180, depth: 1 },
  { Icon: Receipt, label: "Upload bill", sub: "Snap and submit", color: "#ff8a3d", angle: 140, depth: 3 },
  { Icon: Wallet, label: "Cashback", sub: "On every bill", color: "#16a34a", angle: 318, depth: 3 },
  { Icon: Car, label: "On duty", sub: "Eat and stay free", color: "#2f6bff", angle: 0, depth: 1 },
  { Icon: BadgeCheck, label: "Verified partners", sub: "Quality places", color: "#0ea5a4", angle: 40, depth: 2 },
];

const tabs: { Icon: LucideIcon; label: string; color: string }[] = [
  { Icon: Utensils, label: "Food", color: "#ff5a00" },
  { Icon: Hotel, label: "Stay", color: "#7c5cff" },
  { Icon: ShieldCheck, label: "Insurance", color: "#2f6bff" },
  { Icon: Wallet, label: "Cashback", color: "#16a34a" },
  { Icon: Headset, label: "Support", color: "#0ea5a4" },
];

const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`;

export function HeroShowcase({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative w-full [container-type:inline-size]" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
        <HeroScenery className="hs-layer hs-depth-0 pointer-events-none absolute inset-0 h-full w-full overflow-visible" />

        {/* warm glow behind the phone */}
        <div className="hs-aura pointer-events-none absolute left-[28%] top-[6%] h-[86%] w-[44%] rounded-full" aria-hidden="true" />

        {/* orbit ring: two dashed ellipses turning in opposite directions, with glowing dots travelling round */}
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="hs-layer hs-depth-2 pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id="hr-ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2f6bff" stopOpacity="0.55" />
              <stop offset="0.5" stopColor="#7da2ff" stopOpacity="0.3" />
              <stop offset="1" stopColor="#ff5a00" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <g className="hs-fade" style={{ ["--d" as string]: "0.6s" }}>
            <path d={ringPath(RING)} fill="none" stroke="url(#hr-ring)" strokeWidth="2.5" strokeDasharray="10 14" strokeLinecap="round" className="hr-ring" />
            <path d={ringPath({ ...RING, rx: RING.rx - 44, ry: RING.ry - 44 })} fill="none" stroke="url(#hr-ring)" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" className="hr-ring-rev" />
            {[0, 1].map((i) => (
              <g key={i} className="hr-orbit" style={{ offsetPath: `path("${ringPath(RING)}")`, animationDelay: `${i * -7}s` }}>
                <circle r="14" fill={i ? "#ff5a00" : "#2f6bff"} opacity="0.2" />
                <circle r="6" fill={i ? "#ff5a00" : "#2f6bff"} stroke="#fff" strokeWidth="2" />
              </g>
            ))}
          </g>
        </svg>

        {/* phone */}
        <div className="hs-layer hs-depth-4 absolute" style={{ left: `${PHONE.left}%`, top: `${PHONE.top}%`, width: `${PHONE.width}%` }}>
          <div className="hs-rise">
            <div className="hs-breathe">
              <div className="relative aspect-[9/18.6] rounded-[3.6cqw] border-[0.75cqw] border-brand-navy-900 bg-card shadow-[0_3cqw_6cqw_-1.5cqw_rgb(8_30_76/0.45)] ring-1 ring-white/30">
                <span className="absolute left-1/2 top-[0.8cqw] z-20 h-[1.15cqw] w-[7.5cqw] -translate-x-1/2 rounded-full bg-brand-navy-900" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[2.85cqw] text-heading">
                  {/* status bar */}
                  <div className="flex items-center justify-between px-[1.9cqw] pt-[1.1cqw] text-[max(6px,0.85cqw)] font-bold text-muted">
                    <span>9:41</span>
                    <span className="flex items-center gap-[0.4cqw]">
                      <Signal className="size-[1.05cqw]" /><Wifi className="size-[1.05cqw]" /><BatteryFull className="size-[1.3cqw]" />
                    </span>
                  </div>

                  {/* header */}
                  <div className="mt-[1cqw] flex items-center justify-between px-[1.6cqw]">
                    <LogoHorizontal className="h-[2.9cqw] w-auto" title="Miles Assist" />
                    <span className="relative grid size-[2.6cqw] place-items-center rounded-full bg-surface-alt ring-1 ring-line">
                      <Bell className="hs-bell size-[1.35cqw]" />
                      <span className="absolute right-[0.45cqw] top-[0.45cqw] size-[0.6cqw] rounded-full bg-brand-orange ring-2 ring-card" />
                    </span>
                  </div>

                  <p className="mt-[1.1cqw] px-[1.8cqw] text-[max(8px,1.2cqw)] font-extrabold leading-tight">
                    Good Morning, Driver <span className="hs-wave inline-block">👋</span>
                  </p>

                  {/* search */}
                  <div className="mx-[1.6cqw] mt-[0.9cqw] flex items-center gap-[0.7cqw] rounded-full bg-surface-alt px-[1.1cqw] py-[0.75cqw] ring-1 ring-line">
                    <Search className="size-[1.25cqw] shrink-0 text-muted" />
                    <SearchTyper className="flex-1 truncate text-[max(6px,0.9cqw)] font-medium text-muted" />
                    <Mic className="size-[1.25cqw] shrink-0 text-brand-orange" />
                  </div>

                  {/* map */}
                  <div className="relative mt-[1cqw] flex-1 overflow-hidden">
                    <PhoneMap className="absolute inset-0 size-full" />
                    <div className="absolute right-[1.1cqw] top-[1.1cqw] flex flex-col gap-[0.6cqw]">
                      <span className="grid size-[2.4cqw] place-items-center rounded-full bg-card shadow-card"><LocateFixed className="size-[1.25cqw] text-heading" /></span>
                      <span className="flex flex-col overflow-hidden rounded-full bg-card shadow-card">
                        <span className="grid size-[2.4cqw] place-items-center"><Plus className="size-[1.2cqw]" /></span>
                        <span className="mx-auto h-px w-[1.4cqw] bg-line" />
                        <span className="grid size-[2.4cqw] place-items-center"><Minus className="size-[1.2cqw]" /></span>
                      </span>
                    </div>
                    {/* trip card slides up once the route is drawn */}
                    <div className="hs-trip absolute inset-x-[1.1cqw] bottom-[1.1cqw] flex items-center gap-[0.9cqw] rounded-[1.4cqw] bg-card/95 px-[1.1cqw] py-[0.9cqw] shadow-card ring-1 ring-line backdrop-blur">
                      <span className="grid size-[2.6cqw] shrink-0 place-items-center rounded-full bg-[#2f6bff]/15 text-[#2f6bff]"><Car className="size-[1.4cqw]" /></span>
                      <span className="flex-1 leading-tight">
                        <span className="block text-[max(7px,1.05cqw)] font-extrabold">12 km · 18 min</span>
                        <span className="block text-[max(6px,0.8cqw)] text-muted">Continue on NH 48</span>
                      </span>
                      <span className="grid size-[2.6cqw] shrink-0 place-items-center rounded-full bg-[#2f6bff] text-white shadow-md"><Navigation className="size-[1.3cqw] rotate-45" /></span>
                    </div>
                  </div>

                  {/* tab bar */}
                  <div className="grid grid-cols-5 gap-[0.2cqw] border-t border-line bg-card px-[0.8cqw] pb-[1.5cqw] pt-[0.9cqw]">
                    {tabs.map(({ Icon, label, color }, i) => (
                      <span key={label} className="flex flex-col items-center gap-[0.35cqw]">
                        <span className="hs-tab grid size-[2.7cqw] place-items-center rounded-full text-white shadow-md" style={{ background: color, ["--td" as string]: `${i * 0.6}s` }}>
                          <Icon className="size-[1.4cqw]" />
                        </span>
                        <span className="text-[max(5px,0.72cqw)] font-bold text-heading">{label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* service cards sitting on the ring */}
        {chips.map(({ Icon, label, sub, color, angle, depth }, i) => {
          const a = (angle * Math.PI) / 180;
          const x = RING.cx + RING.rx * Math.cos(a);
          const y = RING.cy + RING.ry * Math.sin(a);
          return (
            <div key={label} className={`hs-layer hs-depth-${depth} absolute`} style={{ left: pct(x, VB_W), top: pct(y, VB_H) }}>
              <div className="-translate-x-1/2 -translate-y-1/2">
                <div className="hs-pop" style={{ ["--d" as string]: `${0.6 + i * 0.15}s` }}>
                  <div className="hs-float" style={{ ["--fd" as string]: `${i * -1.3}s`, ["--fr" as string]: `${5.5 + (i % 3) * 0.8}s` }}>
                    <div className="flex items-center gap-[1cqw] rounded-[1.8cqw] border border-white/80 bg-white/75 px-[1.3cqw] py-[0.95cqw] shadow-card backdrop-blur-md dark:border-white/15 dark:bg-white/10">
                      <span className="grid size-[3.4cqw] shrink-0 place-items-center rounded-[1.1cqw] text-white shadow-md" style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 65%, #fff))` }}>
                        <Icon className="size-[1.9cqw]" />
                      </span>
                      <span className="leading-tight">
                        <span className="block whitespace-nowrap text-[max(9px,1.4cqw)] font-extrabold text-heading">{label}</span>
                        <span className="block whitespace-nowrap text-[max(7px,0.95cqw)] font-medium text-muted">{sub}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
