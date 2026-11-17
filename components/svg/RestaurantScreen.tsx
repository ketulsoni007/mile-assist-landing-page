import { BadgeCheck, Car, Check, Headset, LayoutDashboard, Receipt, TrendingUp, UsersRound, Utensils, Wallet, type LucideIcon } from "lucide-react";

/**
 * Hero phone screen for the restaurant role: a partner dashboard (today's guests and bills, weekly driver visits,
 * drivers on the way, a "bill uploaded" toast). Shown instead of the driver map screen (see HeroShowcase).
 * Sized in cqw like the rest of the hero visual. All names and figures are illustrative app-mockup data.
 * Animation classes "rp-*" live in app/hero-scene.css.
 */

const week = [
  { d: "M", v: 46 }, { d: "T", v: 62 }, { d: "W", v: 54 }, { d: "T", v: 78 }, { d: "F", v: 70 }, { d: "S", v: 100, today: true }, { d: "S", v: 34, upcoming: true },
];

const arriving: { initials: string; name: string; meta: string; status: string; color: string; done?: boolean }[] = [
  { initials: "RK", name: "Ramesh K.", meta: "3 guests · 2 km away", status: "Arriving", color: "#2f6bff" },
  { initials: "SP", name: "Suresh P.", meta: "4 guests · at your place", status: "Checked in", color: "#16a34a", done: true },
];

const tabs: { Icon: LucideIcon; label: string; color: string }[] = [
  { Icon: LayoutDashboard, label: "Home", color: "#ff5a00" },
  { Icon: UsersRound, label: "Guests", color: "#7c5cff" },
  { Icon: Receipt, label: "Bills", color: "#2f6bff" },
  { Icon: Wallet, label: "Payouts", color: "#16a34a" },
  { Icon: Headset, label: "Support", color: "#0ea5a4" },
];

export function RestaurantScreen() {
  return (
    <>
      <p className="mt-[1.1cqw] px-[1.8cqw] text-[max(8px,1.2cqw)] font-extrabold leading-tight">
        Welcome back, Partner <span className="hs-wave inline-block">👋</span>
      </p>

      {/* the restaurant */}
      <div className="mx-[1.6cqw] mt-[0.9cqw] flex items-center gap-[0.8cqw] rounded-[1.3cqw] bg-surface-alt px-[0.9cqw] py-[0.75cqw] ring-1 ring-line">
        <span className="grid size-[2.7cqw] shrink-0 place-items-center rounded-[0.9cqw] bg-gradient-to-br from-brand-orange to-[#ff8a3d] text-white shadow-md">
          <Utensils className="size-[1.4cqw]" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="block truncate text-[max(7px,1.02cqw)] font-extrabold">Highway Dhaba</span>
          <span className="flex items-center gap-[0.3cqw] text-[max(5px,0.74cqw)] font-semibold text-muted">
            <BadgeCheck className="size-[0.95cqw] text-[#0ea5a4]" /> Verified partner
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-[0.4cqw] rounded-full bg-emerald-500/15 px-[0.7cqw] py-[0.3cqw] text-[max(5px,0.74cqw)] font-extrabold text-emerald-600 dark:text-emerald-400">
          <span className="relative grid size-[0.6cqw] place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative size-[0.6cqw] rounded-full bg-emerald-500" />
          </span>
          Open
        </span>
      </div>

      <div className="relative mt-[1cqw] flex min-h-0 flex-1 flex-col gap-[0.9cqw] overflow-hidden px-[1.6cqw] pb-[1cqw]">
        {/* today */}
        <div className="grid grid-cols-2 gap-[0.8cqw]">
          <div className="hs-rise-soft rounded-[1.3cqw] bg-card p-[0.95cqw] shadow-card ring-1 ring-line" style={{ ["--d" as string]: "0.9s" }}>
            <span className="flex items-center gap-[0.4cqw] text-[max(5px,0.74cqw)] font-bold text-muted"><UsersRound className="size-[1cqw] text-[#7c5cff]" /> Guests today</span>
            <span className="mt-[0.3cqw] block text-[max(11px,1.9cqw)] font-extrabold leading-none tracking-tight">24</span>
            <span className="mt-[0.35cqw] flex items-center gap-[0.25cqw] text-[max(5px,0.7cqw)] font-bold text-emerald-600 dark:text-emerald-400"><TrendingUp className="size-[0.9cqw]" /> +6 vs yesterday</span>
          </div>
          <div className="hs-rise-soft rounded-[1.3cqw] bg-card p-[0.95cqw] shadow-card ring-1 ring-line" style={{ ["--d" as string]: "1.05s" }}>
            <span className="flex items-center gap-[0.4cqw] text-[max(5px,0.74cqw)] font-bold text-muted"><Receipt className="size-[1cqw] text-brand-orange" /> Bills today</span>
            <span className="mt-[0.3cqw] block text-[max(11px,1.9cqw)] font-extrabold leading-none tracking-tight">₹18,450</span>
            <span className="mt-[0.35cqw] block text-[max(5px,0.7cqw)] font-bold text-muted">12 bills uploaded</span>
          </div>
        </div>

        {/* weekly driver visits */}
        <div className="hs-rise-soft rounded-[1.3cqw] bg-card p-[0.95cqw] shadow-card ring-1 ring-line" style={{ ["--d" as string]: "1.2s" }}>
          <div className="flex items-center justify-between">
            <span className="text-[max(6px,0.85cqw)] font-extrabold">Driver visits</span>
            <span className="rounded-full bg-surface-alt px-[0.6cqw] py-[0.2cqw] text-[max(5px,0.66cqw)] font-bold text-muted ring-1 ring-line">This week</span>
          </div>
          <div className="mt-[0.8cqw] flex h-[6.2cqw] items-end gap-[0.7cqw]">
            {week.map((b, i) => (
              <span key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-[0.35cqw]">
                <span className="relative flex w-full flex-1 items-end">
                  <span
                    className={`rp-bar block w-full rounded-t-[0.5cqw] ${b.today ? "bg-gradient-to-t from-brand-orange to-[#ffa35c] shadow-[0_0_1.2cqw_rgb(255_90_0/0.45)]" : b.upcoming ? "bg-line" : "bg-gradient-to-t from-[#2f6bff]/75 to-[#7da2ff]/75"}`}
                    style={{ height: `${b.v}%`, ["--bd" as string]: `${i * 0.09}s` }}
                  />
                </span>
                <span className={`text-[max(5px,0.66cqw)] font-bold ${b.today ? "text-brand-orange" : "text-muted"}`}>{b.d}</span>
              </span>
            ))}
          </div>
        </div>

        {/* drivers on the way */}
        <div className="flex items-center justify-between">
          <span className="text-[max(6px,0.85cqw)] font-extrabold">Drivers on the way</span>
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
            <span className="block text-[max(7px,1.05cqw)] font-extrabold">Bill uploaded</span>
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
