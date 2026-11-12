import { BadgeCheck, Bell, Car, CheckCircle2, FileUp, LayoutDashboard, Receipt, Settings, Star, TrendingUp, Users, Wallet } from "lucide-react";
import CountUp from "@/components/react-bits/CountUp";
import { PlayOnView } from "@/components/features/PlayOnView";

/**
 * Partner hero visual: the partner dashboard on a laptop (footfall chart that grows, KPI tiles that count up,
 * live bill list, verified badge) with floating notifications around it: a driver arriving, a bill uploaded,
 * a commission paid, a new rating. Live markup in rem, so it scales on every screen and follows the theme.
 * Numbers are illustrative only. Animations: "pd-*" in app/features.css, started by PlayOnView.
 */

const BARS = [38, 52, 44, 66, 58, 74, 62, 86, 78, 92, 84, 100];

function Toast({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <div className="pd-toast" style={{ animationDelay: `${0.8 + delay * 0.35}s` }}>
        <div className="fh-float" style={{ animationDelay: `${delay * -1.2}s` }}>
          <div className="flex items-center gap-2.5 rounded-2xl border border-white/70 bg-card/95 px-3 py-2.5 shadow-[0_18px_40px_-18px_rgb(8_30_76/0.5)] ring-1 ring-line backdrop-blur-xl dark:border-white/10">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function PartnerDashboardVisual() {
  return (
    <PlayOnView className="relative mx-auto w-full max-w-[40rem] px-4 pb-10 pt-12 sm:px-8">
      {/* glow */}
      <div className="absolute inset-x-8 inset-y-10 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-orange/25 via-[#7c5cff]/15 to-[#2f6bff]/20 blur-3xl" aria-hidden="true" />

      {/* laptop: laid out at a fixed 36rem and zoomed down on small screens, so it shrinks instead of squashing */}
      <div className="pd-rise relative mx-auto w-[36rem] max-w-none [zoom:0.58] min-[420px]:[zoom:0.68] sm:[zoom:1]">
        <div className="rounded-t-[1.25rem] border-[0.5rem] border-b-0 border-[#0b1330] bg-[#0b1330] shadow-[0_40px_80px_-30px_rgb(8_30_76/0.6)]">
          <div className="relative flex aspect-[16/10] overflow-hidden rounded-t-[0.6rem] bg-surface-alt text-heading">
            {/* sidebar */}
            <aside className="flex w-[13%] flex-col items-center gap-[0.9rem] bg-[#081e4c] py-[0.9rem] text-white/60" aria-hidden="true">
              <span className="grid size-[1.9rem] place-items-center rounded-lg bg-brand-orange text-white"><LayoutDashboard className="size-[0.95rem]" /></span>
              {[Receipt, Users, Wallet, Star, Settings].map((I, i) => <I key={i} className="size-[0.95rem]" />)}
            </aside>

            <div className="flex min-w-0 flex-1 flex-col gap-[0.55rem] p-[0.75rem]">
              {/* top bar */}
              <div className="flex items-center gap-2">
                <div className="min-w-0 leading-tight">
                  <p className="truncate text-[0.62rem] font-semibold text-muted">Partner dashboard</p>
                  <p className="flex items-center gap-1 truncate text-[0.8rem] font-extrabold">Highway Dhaba <BadgeCheck className="size-[0.85rem] shrink-0 text-emerald-500" /></p>
                </div>
                <span className="ml-auto flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.55rem] font-extrabold text-emerald-600 dark:text-emerald-400">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" /> Live
                </span>
                <span className="relative grid size-[1.6rem] place-items-center rounded-full bg-card ring-1 ring-line"><Bell className="hs-bell size-[0.8rem]" /><span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-brand-orange" /></span>
              </div>

              {/* KPI tiles */}
              <div className="grid grid-cols-3 gap-[0.45rem]">
                {[
                  { l: "Driver visits", v: 1284, Icon: Car, c: "#2f6bff", d: "+18%" },
                  { l: "Bills uploaded", v: 942, Icon: Receipt, c: "#ff5a00", d: "+12%" },
                  { l: "Avg. rating", v: 4.8, dec: 1, Icon: Star, c: "#f2b01e", d: "★" },
                ].map(({ l, v, dec, Icon, c, d }) => (
                  <div key={l} className="rounded-xl bg-card p-[0.5rem] ring-1 ring-line">
                    <div className="flex items-center justify-between">
                      <span className="grid size-[1.35rem] place-items-center rounded-md" style={{ background: `${c}22`, color: c }}><Icon className="size-[0.75rem]" /></span>
                      <span className="text-[0.5rem] font-extrabold text-emerald-500">{d}</span>
                    </div>
                    <p className="mt-1 text-[0.95rem] font-extrabold leading-none tabular-nums"><CountUp to={v} decimals={dec} separator="," duration={2} /></p>
                    <p className="mt-0.5 truncate text-[0.52rem] font-semibold text-muted">{l}</p>
                  </div>
                ))}
              </div>

              {/* chart + bills */}
              <div className="grid min-h-0 flex-1 grid-cols-[1.35fr_1fr] gap-[0.45rem]">
                <div className="flex min-h-0 flex-col rounded-xl bg-card p-[0.5rem] ring-1 ring-line">
                  <div className="flex items-center justify-between">
                    <p className="text-[0.62rem] font-extrabold">Footfall from drivers</p>
                    <span className="flex items-center gap-0.5 text-[0.5rem] font-bold text-emerald-500"><TrendingUp className="size-[0.65rem]" /> this month</span>
                  </div>
                  <div className="relative mt-1 flex flex-1 items-end gap-[0.18rem]">
                    {/* grid lines */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between" aria-hidden="true">
                      {[0, 1, 2, 3].map((i) => <span key={i} className="h-px bg-line" />)}
                    </div>
                    {BARS.map((h, i) => (
                      <span
                        key={i}
                        className="pd-bar relative flex-1 rounded-t-[0.2rem]"
                        style={{ height: `${h}%`, animationDelay: `${0.4 + i * 0.07}s`, background: i === BARS.length - 1 ? "linear-gradient(#ff8a3d,#ff5a00)" : "linear-gradient(#9db8ff,#5b7fe6)" }}
                      />
                    ))}
                    {/* trend line drawn over the bars */}
                    <svg viewBox="0 0 120 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full overflow-visible" aria-hidden="true">
                      <path d="M5 62L15 48L25 56L35 34L45 42L55 26L65 38L75 14L85 22L95 8L105 16L115 0" fill="none" stroke="#ff5a00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength={1} className="pd-line" />
                    </svg>
                  </div>
                </div>

                <div className="flex min-h-0 flex-col rounded-xl bg-card p-[0.5rem] ring-1 ring-line">
                  <p className="text-[0.62rem] font-extrabold">Recent bills</p>
                  <ul className="mt-1 flex flex-1 flex-col justify-between gap-[0.25rem]">
                    {[
                      { n: "Duty #2481", s: "Verified", ok: true },
                      { n: "Duty #2479", s: "Verified", ok: true },
                      { n: "Duty #2476", s: "Pending", ok: false },
                      { n: "Duty #2470", s: "Verified", ok: true },
                    ].map((b, i) => (
                      <li key={b.n} className="pd-row flex items-center gap-1.5 rounded-lg bg-surface-alt px-1.5 py-1" style={{ animationDelay: `${1 + i * 0.2}s` }}>
                        <Receipt className="size-[0.7rem] shrink-0 text-brand-orange" />
                        <span className="min-w-0 flex-1 truncate text-[0.55rem] font-bold">{b.n}</span>
                        <span className={`rounded-full px-1 text-[0.45rem] font-extrabold ${b.ok ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"}`}>{b.s}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-1 flex items-center justify-center gap-1 rounded-lg bg-brand-orange py-1 text-[0.55rem] font-extrabold text-white">
                    <FileUp className="size-[0.7rem]" /> Upload bill
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* laptop base */}
        <div className="relative mx-[-6%] h-[0.9rem] rounded-b-[1.2rem] bg-gradient-to-b from-[#c9d1db] to-[#8f99aa] shadow-[0_18px_30px_-12px_rgb(0_0_0/0.45)] dark:from-[#3a4566] dark:to-[#1d2645]">
          <span className="absolute left-1/2 top-0 h-[0.35rem] w-[16%] -translate-x-1/2 rounded-b-lg bg-black/20" />
        </div>
      </div>

      {/* floating notifications */}
      <Toast className="-left-1 top-0 sm:left-0" delay={0}>
        <span className="grid size-9 place-items-center rounded-xl bg-[#2f6bff] text-white"><Car className="size-4" /></span>
        <span className="leading-tight"><span className="block text-xs font-extrabold text-heading">Driver arrived</span><span className="text-[0.65rem] text-muted">with 3 passengers</span></span>
      </Toast>
      <Toast className="-right-1 top-[18%] sm:right-0" delay={1}>
        <span className="grid size-9 place-items-center rounded-xl bg-brand-orange text-white"><FileUp className="size-4" /></span>
        <span className="leading-tight"><span className="block text-xs font-extrabold text-heading">Bill uploaded</span><span className="text-[0.65rem] text-muted">Duty #2481 · verified</span></span>
      </Toast>
      <Toast className="-left-2 bottom-[10%] hidden sm:block" delay={2}>
        <span className="grid size-9 place-items-center rounded-xl bg-emerald-500 text-white"><CheckCircle2 className="size-4" /></span>
        <span className="leading-tight"><span className="block text-xs font-extrabold text-heading">Commission paid</span><span className="text-[0.65rem] text-muted">to driver wallet</span></span>
      </Toast>
      <Toast className="-right-2 bottom-[2%]" delay={3}>
        <span className="flex gap-0.5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />)}</span>
        <span className="text-xs font-extrabold text-heading">New 5★ review</span>
      </Toast>
    </PlayOnView>
  );
}
