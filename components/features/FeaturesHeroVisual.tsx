import { BadgeIndianRupee, Bell, Car, Check, Home, Map, Megaphone, PartyPopper, Phone as PhoneIcon, Route, Star, User, Utensils, Wallet, Wrench } from "lucide-react";
import { PhoneShell } from "./FeatureMocks";
import { PlayOnView } from "./PlayOnView";

/**
 * Features hero visual: the app's home screen (greeting with voice, campaign carousel, tier status, nearby
 * partners map, bottom nav) surrounded by six floating "live" cards, one per feature, wired to the phone with
 * flowing dashed connectors. All CSS animation ("fh-*" / "fm-*" in app/features.css).
 */

function Card({ className, delay, children }: { className: string; delay: number; children: React.ReactNode }) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <div className="fh-pop" style={{ animationDelay: `${0.5 + delay * 0.18}s` }}>
        <div className="fh-float" style={{ animationDelay: `${delay * -1.1}s` }}>
          <div className="rounded-2xl border border-white/70 bg-card/90 p-3 shadow-[0_18px_40px_-18px_rgb(8_30_76/0.45)] ring-1 ring-line backdrop-blur-xl dark:border-white/10">{children}</div>
        </div>
      </div>
    </div>
  );
}

function HomeScreen() {
  return (
    <PhoneShell title="" tint="#ff5a00">
      <div className="-mt-9 space-y-2.5">
        {/* greeting + voice */}
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-brand-orange to-[#ff8a3d] text-sm font-extrabold text-white">R</span>
          <span className="flex-1 leading-tight">
            <span className="block text-[0.625rem] font-semibold text-muted">Good morning 👋</span>
            <span className="block text-sm font-extrabold text-heading">Rahul</span>
          </span>
          <span className="fm-wave flex h-4 items-end gap-0.5 text-brand-orange" aria-hidden="true"><i className="h-2 w-0.5 bg-current" /><i className="h-4 w-0.5 bg-current" /><i className="h-2.5 w-0.5 bg-current" /></span>
          <span className="relative grid size-8 place-items-center rounded-full bg-surface-alt ring-1 ring-line"><Bell className="hs-bell size-4 text-heading" /><span className="absolute right-1 top-1 size-1.5 rounded-full bg-brand-orange" /></span>
        </div>

        {/* campaign carousel */}
        <div className="relative h-[5.375rem] overflow-hidden rounded-2xl">
          <div className="fh-slides flex h-full w-[300%]">
            {[
              { t: "Free meals on NH 48", s: "12 new partner dhabas", from: "#ff7a1f", to: "#e84c00", Icon: Utensils },
              { t: "Upload bills, win more", s: "Scratch cards every visit", from: "#16a34a", to: "#0ea5a4", Icon: BadgeIndianRupee },
              { t: "Roadside help, free", s: "Live call, 24/7", from: "#7c5cff", to: "#2f6bff", Icon: Wrench },
            ].map(({ t, s, from, to, Icon }) => (
              <div key={t} className="relative flex h-full w-1/3 items-center gap-3 px-3.5 text-white" style={{ background: `linear-gradient(120deg, ${from}, ${to})` }}>
                <span className="leading-tight">
                  <span className="flex items-center gap-1 text-[0.5625rem] font-bold uppercase tracking-wider text-white/80"><Megaphone className="size-3" /> Campaign</span>
                  <span className="mt-0.5 block text-sm font-extrabold">{t}</span>
                  <span className="text-[0.625rem] text-white/85">{s}</span>
                </span>
                <Icon className="absolute -right-2 -bottom-2 size-16 text-white/20" />
              </div>
            ))}
          </div>
          <span className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1"><i className="size-1 rounded-full bg-white" /><i className="size-1 rounded-full bg-white/50" /><i className="size-1 rounded-full bg-white/50" /></span>
        </div>

        {/* tier / subscription */}
        <div className="rounded-2xl bg-gradient-to-br from-[#7a4421] via-[#c98048] to-[#8a4b22] p-3 text-white">
          <div className="flex items-center justify-between text-[0.625rem] font-bold uppercase tracking-wider text-white/85">
            <span>Bronze member</span><span className="rounded-full bg-white/25 px-1.5 py-px">Free month</span>
          </div>
          <div className="mt-2 flex items-end justify-between">
            <span className="text-lg font-extrabold leading-none">22 days left</span>
            <span className="text-[0.625rem] font-semibold text-white/85">of 30</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/25"><div className="fh-tier h-full rounded-full bg-white" /></div>
        </div>

        {/* nearby map */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-xs font-extrabold text-heading">Nearby partners</span>
            <span className="text-[0.625rem] font-bold text-brand-orange">See map</span>
          </div>
          <div className="relative h-[11.625rem] overflow-hidden rounded-2xl ring-1 ring-line" style={{ background: "var(--map-bg)" }}>
            <svg viewBox="0 0 240 186" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <g style={{ fill: "var(--map-block-2)" }}><rect x="8" y="8" width="60" height="34" rx="5" /><rect x="90" y="8" width="44" height="34" rx="5" /><rect x="160" y="70" width="70" height="40" rx="5" /><rect x="90" y="130" width="44" height="46" rx="5" /><rect x="8" y="130" width="60" height="46" rx="5" /></g>
              <g style={{ fill: "var(--map-park)" }}><rect x="8" y="64" width="60" height="46" rx="8" /><rect x="160" y="8" width="70" height="34" rx="8" /></g>
              <g fill="none" strokeLinecap="round" style={{ stroke: "var(--map-street)" }}><path d="M0 52H240M0 120H240M78 0V186M146 0V186" strokeWidth="7" /></g>
              <path d="M78 186V60Q78 52 86 52H146V0" fill="none" stroke="#2f6bff" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="1" pathLength={1} className="fh-route" />
              {[[110, 46, "#ff5a00"], [40, 60, "#ff5a00"], [190, 66, "#7c5cff"], [150, 26, "#7c5cff"], [112, 150, "#ff5a00"], [205, 140, "#7c5cff"]].map(([x, y, c], i) => (
                <g key={i} transform={`translate(${x} ${y})`}>
                  <g className="fh-pin" style={{ animationDelay: `${1.6 + i * 0.25}s` }}>
                    <path d="M0 0C0 0-8-9-8-14A8 8 0 1 1 8-14C8-9 0 0 0 0Z" fill={c as string} stroke="#fff" strokeWidth="1.5" /><circle cy="-14" r="3" fill="#fff" />
                  </g>
                </g>
              ))}
              <g transform="translate(78 150)"><circle r="10" fill="#2f6bff" opacity="0.2" className="fm-ping" /><circle r="5" fill="#2f6bff" stroke="#fff" strokeWidth="2" /></g>
            </svg>
          </div>
        </div>

        {/* bottom nav */}
        <div className="grid grid-cols-5 rounded-2xl bg-surface-alt px-1 py-2 ring-1 ring-line">
          {[Home, Map, Route, Wallet, User].map((I, i) => (
            <span key={i} className={`mx-auto grid size-8 place-items-center rounded-xl ${i === 0 ? "bg-brand-orange text-white shadow-glow" : "text-muted"}`}><I className="size-4" /></span>
          ))}
        </div>
      </div>
    </PhoneShell>
  );
}

export function FeaturesHeroVisual() {
  return (
    <PlayOnView className="relative mx-auto h-[40rem] w-full max-w-[38rem]">
      {/* backdrop */}
      <div className="absolute inset-x-[8%] inset-y-[10%] -z-10 rounded-[3rem] bg-gradient-to-br from-brand-orange/15 via-[#7c5cff]/10 to-[#2f6bff]/15 blur-2xl" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 opacity-70 [background-image:radial-gradient(var(--color-line)_1.3px,transparent_1.3px)] [background-size:20px_20px] [mask-image:radial-gradient(closest-side,#000,transparent)]" aria-hidden="true" />

      {/* connectors from the cards to the phone */}
      <svg viewBox="0 0 600 640" className="absolute inset-0 -z-0 size-full" preserveAspectRatio="none" aria-hidden="true">
        <g fill="none" stroke="var(--color-brand-orange)" strokeOpacity="0.45" strokeWidth="1.6" strokeDasharray="4 6" className="fh-wires">
          <path d="M130 180C190 180 200 200 240 210" />
          <path d="M130 360C190 360 200 350 240 345" />
          <path d="M140 590C200 590 210 540 240 520" />
          <path d="M470 190C410 190 400 210 360 220" />
          <path d="M470 365C410 365 400 355 360 350" />
          <path d="M460 590C400 590 390 540 360 520" />
        </g>
      </svg>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 scale-[0.9] sm:scale-100">
        <div className="fh-tilt">
          <HomeScreen />
        </div>
      </div>

      {/* 1 route search */}
      <Card className="-left-6 top-[24%] hidden w-[9.75rem] sm:block" delay={0}>
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-[#2f6bff] text-white"><Route className="size-4" /></span>
          <span className="leading-tight"><span className="block text-xs font-extrabold text-heading">8 partners</span><span className="text-[0.625rem] text-muted">on your route</span></span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[0.625rem] font-semibold text-muted">
          <span className="size-2 rounded-full bg-emerald-500" />Ahmedabad<span className="h-px flex-1 border-t border-dashed border-line" /><span className="size-2 rounded-full bg-brand-orange" />Vadodara
        </div>
      </Card>

      {/* 2 cashback scratch */}
      <Card className="-left-4 top-[52%] w-[9.5rem]" delay={1}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-300 to-orange-500 px-3 py-3 text-center text-white">
          <PartyPopper className="fh-wiggle mx-auto size-5" />
          <p className="mt-0.5 text-sm font-extrabold">Cashback won!</p>
          <p className="text-[0.5625rem] font-semibold text-white/90">Bill verified</p>
          <span className="fh-scratch absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(45deg,#c7cedb_0_6px,#b4bccb_6px_12px)] text-[0.625rem] font-extrabold text-[#55607a]">Scratch</span>
        </div>
      </Card>

      {/* 3 duty ring */}
      <Card className="-left-2 bottom-[4%] hidden w-[9.75rem] sm:block" delay={2}>
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 40 40" className="size-11 -rotate-90"><circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-line)" strokeWidth="5" /><circle cx="20" cy="20" r="16" fill="none" stroke="#7c5cff" strokeWidth="5" strokeLinecap="round" strokeDasharray="100.5" className="fh-duty" /></svg>
          <span className="leading-tight"><span className="block text-sm font-extrabold text-heading">48 / 60</span><span className="text-[0.625rem] text-muted">duties · 180 days</span></span>
        </div>
      </Card>

      {/* 4 free meal unlocked */}
      <Card className="-right-6 top-[26%] w-[10rem]" delay={3}>
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl bg-brand-orange text-white"><Utensils className="size-4" /></span>
          <span className="min-w-0 flex-1 leading-tight"><span className="block text-xs font-extrabold text-heading">Free meal</span><span className="block truncate text-[0.625rem] text-muted">Highway Dhaba</span></span>
          <span className="grid size-5 place-items-center rounded-full bg-emerald-500 text-white"><Check className="size-3" strokeWidth={3.5} /></span>
        </div>
      </Card>

      {/* 5 need help */}
      <Card className="-right-4 top-[52%] hidden w-[9.5rem] sm:block" delay={4}>
        <div className="flex items-center gap-2">
          <span className="relative grid size-8 place-items-center rounded-full bg-[#e0457b] text-white"><span className="absolute inset-0 animate-ping rounded-full bg-[#e0457b]/50" /><PhoneIcon className="relative size-4" /></span>
          <span className="leading-tight"><span className="block text-xs font-extrabold text-heading">Need Help</span><span className="text-[0.625rem] text-muted">Live call · 24/7</span></span>
        </div>
      </Card>

      {/* 6 rate the place */}
      <Card className="-right-2 bottom-[4%] w-[10rem]" delay={5}>
        <p className="text-[0.625rem] font-bold uppercase tracking-wide text-muted">Rate the place</p>
        <span className="mt-1 flex gap-0.5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="fm-star size-4 text-amber-400" style={{ animationDelay: `${2 + i * 0.15}s` }} />)}</span>
        <p className="mt-1 flex items-center gap-1 text-[0.625rem] font-semibold text-muted"><Car className="size-3" /> 1,284 drivers visited</p>
      </Card>
    </PlayOnView>
  );
}
