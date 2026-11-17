import { BadgeCheck, BedDouble, Building2, Car, Check, Headset, LayoutDashboard, Receipt, TrendingUp, Wallet, type LucideIcon } from "lucide-react";

/**
 * Hero phone screen for the hotel role: a partner dashboard (today's check-ins and bills, room occupancy with a
 * room map, guests arriving with drivers, a "bill uploaded" toast). Shown instead of the driver map screen
 * (see HeroShowcase). Sized in cqw like the rest of the hero visual. All names and figures are illustrative
 * app-mockup data. Animation classes "hp-*" live in app/hero-scene.css.
 */

// 20 rooms: "d" = booked by a guest a driver brought, "b" = booked, "f" = free
const rooms = "d b b f d b f b d b b f b d b f b b f d".split(" ");
const booked = rooms.filter((r) => r !== "f").length;
const occupancy = Math.round((booked / rooms.length) * 100);
const roomClass: Record<string, string> = {
  d: "bg-gradient-to-br from-brand-orange to-[#ffa35c]",
  b: "bg-gradient-to-br from-[#2f6bff] to-[#7da2ff]",
  f: "bg-surface-alt ring-1 ring-line",
};

const arriving: { initials: string; name: string; meta: string; status: string; color: string; done?: boolean }[] = [
  { initials: "RK", name: "Ramesh K.", meta: "2 guests · 5 km away", status: "Arriving", color: "#2f6bff" },
  { initials: "VS", name: "Vikram S.", meta: "Family of 4 · Room 204", status: "Checked in", color: "#16a34a", done: true },
];

const tabs: { Icon: LucideIcon; label: string; color: string }[] = [
  { Icon: LayoutDashboard, label: "Home", color: "#ff5a00" },
  { Icon: BedDouble, label: "Rooms", color: "#7c5cff" },
  { Icon: Receipt, label: "Bills", color: "#2f6bff" },
  { Icon: Wallet, label: "Payouts", color: "#16a34a" },
  { Icon: Headset, label: "Support", color: "#0ea5a4" },
];

export function HotelScreen() {
  return (
    <>
      <p className="mt-[1.1cqw] px-[1.8cqw] text-[max(8px,1.2cqw)] font-extrabold leading-tight">
        Welcome back, Partner <span className="hs-wave inline-block">👋</span>
      </p>

      {/* the hotel */}
      <div className="mx-[1.6cqw] mt-[0.9cqw] flex items-center gap-[0.8cqw] rounded-[1.3cqw] bg-surface-alt px-[0.9cqw] py-[0.75cqw] ring-1 ring-line">
        <span className="grid size-[2.7cqw] shrink-0 place-items-center rounded-[0.9cqw] bg-gradient-to-br from-[#2f6bff] to-[#7da2ff] text-white shadow-md">
          <Building2 className="size-[1.4cqw]" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[max(7px,1.02cqw)] font-extrabold">Sunrise Inn</span>
          <span className="flex items-center gap-[0.3cqw] text-[max(5px,0.74cqw)] font-semibold text-muted">
            <BadgeCheck className="size-[0.95cqw] text-[#0ea5a4]" /> Verified partner
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-[0.4cqw] rounded-full bg-emerald-500/15 px-[0.7cqw] py-[0.3cqw] text-[max(5px,0.74cqw)] font-extrabold text-emerald-600 dark:text-emerald-400">
          <span className="relative grid size-[0.6cqw] place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative size-[0.6cqw] rounded-full bg-emerald-500" />
          </span>
          Rooms open
        </span>
      </div>

      <div className="relative mt-[1cqw] flex min-h-0 flex-1 flex-col gap-[0.9cqw] overflow-hidden px-[1.6cqw] pb-[1cqw]">
        {/* today */}
        <div className="grid grid-cols-2 gap-[0.8cqw]">
          <div className="hs-rise-soft rounded-[1.3cqw] bg-card p-[0.95cqw] shadow-card ring-1 ring-line" style={{ ["--d" as string]: "0.9s" }}>
            <span className="flex items-center gap-[0.4cqw] text-[max(5px,0.74cqw)] font-bold text-muted"><BedDouble className="size-[1cqw] text-[#7c5cff]" /> Check-ins today</span>
            <span className="mt-[0.3cqw] block text-[max(11px,1.9cqw)] font-extrabold leading-none tracking-tight">8</span>
            <span className="mt-[0.35cqw] flex items-center gap-[0.25cqw] text-[max(5px,0.7cqw)] font-bold text-emerald-600 dark:text-emerald-400"><TrendingUp className="size-[0.9cqw]" /> +2 vs yesterday</span>
          </div>
          <div className="hs-rise-soft rounded-[1.3cqw] bg-card p-[0.95cqw] shadow-card ring-1 ring-line" style={{ ["--d" as string]: "1.05s" }}>
            <span className="flex items-center gap-[0.4cqw] text-[max(5px,0.74cqw)] font-bold text-muted"><Receipt className="size-[1cqw] text-brand-orange" /> Bills today</span>
            <span className="mt-[0.3cqw] block text-[max(11px,1.9cqw)] font-extrabold leading-none tracking-tight">₹32,600</span>
            <span className="mt-[0.35cqw] block text-[max(5px,0.7cqw)] font-bold text-muted">7 bills uploaded</span>
          </div>
        </div>

        {/* occupancy: ring + room map */}
        <div className="hs-rise-soft rounded-[1.3cqw] bg-card p-[0.95cqw] shadow-card ring-1 ring-line" style={{ ["--d" as string]: "1.2s" }}>
          <div className="flex items-center justify-between">
            <span className="text-[max(6px,0.85cqw)] font-extrabold">Room occupancy</span>
            <span className="rounded-full bg-surface-alt px-[0.6cqw] py-[0.2cqw] text-[max(5px,0.66cqw)] font-bold text-muted ring-1 ring-line">Tonight</span>
          </div>
          <div className="mt-[0.8cqw] flex items-center gap-[1.1cqw]">
            <span className="relative grid size-[6.2cqw] shrink-0 place-items-center">
              <svg viewBox="0 0 40 40" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
                <circle cx="20" cy="20" r="16" fill="none" strokeWidth="5" style={{ stroke: "var(--color-line)" }} />
                <circle cx="20" cy="20" r="16" fill="none" stroke="#2f6bff" strokeWidth="5" strokeLinecap="round" pathLength="100" strokeDasharray={`${occupancy} 100`} className="hp-ring" style={{ ["--occ" as string]: occupancy }} />
              </svg>
              <span className="relative text-center leading-none">
                <span className="block text-[max(8px,1.3cqw)] font-extrabold">{occupancy}%</span>
                <span className="mt-[0.15cqw] block text-[max(4px,0.58cqw)] font-bold text-muted">booked</span>
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="grid grid-cols-10 gap-[0.32cqw]">
                {rooms.map((r, i) => (
                  <span key={i} className={`hp-room aspect-square rounded-[0.28cqw] ${roomClass[r]}`} style={{ ["--rd" as string]: `${i * 0.05}s` }} />
                ))}
              </span>
              <span className="mt-[0.6cqw] flex flex-wrap gap-x-[0.8cqw] gap-y-[0.2cqw] text-[max(4px,0.6cqw)] font-bold text-muted">
                <span className="flex items-center gap-[0.25cqw]"><span className="size-[0.55cqw] rounded-[0.15cqw] bg-brand-orange" /> Via drivers</span>
                <span className="flex items-center gap-[0.25cqw]"><span className="size-[0.55cqw] rounded-[0.15cqw] bg-[#2f6bff]" /> Booked</span>
                <span className="flex items-center gap-[0.25cqw]"><span className="size-[0.55cqw] rounded-[0.15cqw] bg-surface-alt ring-1 ring-line" /> Free</span>
              </span>
            </span>
          </div>
        </div>

        {/* guests arriving */}
        <div className="flex items-center justify-between">
          <span className="text-[max(6px,0.85cqw)] font-extrabold">Guests arriving</span>
          <span className="flex items-center gap-[0.35cqw] text-[max(5px,0.66cqw)] font-extrabold uppercase tracking-wide text-brand-orange">
            <span className="size-[0.5cqw] animate-pulse rounded-full bg-brand-orange" /> Live
          </span>
        </div>
        <ul className="-mt-[0.2cqw] flex flex-col gap-[0.7cqw]">
          {arriving.map((a, i) => (
            <li key={a.name} className="hs-rise-soft flex items-center gap-[0.8cqw] rounded-[1.2cqw] bg-card px-[0.9cqw] py-[0.7cqw] shadow-card ring-1 ring-line" style={{ ["--d" as string]: `${1.4 + i * 0.18}s` }}>
              <span className="grid size-[2.5cqw] shrink-0 place-items-center rounded-full text-[max(5px,0.78cqw)] font-extrabold text-white" style={{ background: `linear-gradient(135deg, ${a.color}, color-mix(in srgb, ${a.color} 60%, #fff))` }}>{a.initials}</span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[max(6px,0.92cqw)] font-extrabold">{a.name}</span>
                <span className="block truncate text-[max(5px,0.7cqw)] font-medium text-muted">{a.meta}</span>
              </span>
              <span className="flex shrink-0 items-center gap-[0.3cqw] rounded-full px-[0.65cqw] py-[0.3cqw] text-[max(5px,0.68cqw)] font-extrabold" style={{ color: a.color, background: `color-mix(in srgb, ${a.color} 15%, transparent)` }}>
                {a.done ? <Check className="size-[0.85cqw]" strokeWidth={3.5} /> : <Car className="rp-drive size-[0.95cqw]" />} {a.status}
              </span>
            </li>
          ))}
        </ul>

        {/* toast: a bill was uploaded */}
        <div className="hs-trip absolute inset-x-[1.1cqw] bottom-[1.1cqw] flex items-center gap-[0.9cqw] rounded-[1.4cqw] bg-card/95 px-[1.1cqw] py-[0.9cqw] shadow-[0_1cqw_2.4cqw_-0.8cqw_rgb(8_30_76/0.5)] ring-1 ring-line backdrop-blur">
          <span className="grid size-[2.6cqw] shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"><Receipt className="size-[1.4cqw]" /></span>
          <span className="flex-1 leading-tight">
            <span className="block text-[max(7px,1.05cqw)] font-extrabold">Stay bill uploaded</span>
            <span className="block text-[max(6px,0.8cqw)] text-muted">Driver commission tracked</span>
          </span>
          <span className="grid size-[2.6cqw] shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-md"><Check className="size-[1.3cqw]" strokeWidth={3.2} /></span>
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
    </>
  );
}
