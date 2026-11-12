import { BadgeIndianRupee, BatteryFull, Bed, Car, Check, ChevronRight, Gavel, Headset, Hotel, LocateFixed, Navigation, PlayCircle, PartyPopper, Phone, Receipt, Search, ShieldCheck, Signal, Star, Utensils, Wallet, Wifi, Wrench } from "lucide-react";
import CountUp from "@/components/react-bits/CountUp";
import type { FeatureId } from "@/lib/features";

/* ───────── phone shell ───────── */
export function PhoneShell({ children, title, tint = "#ff5a00" }: { children: React.ReactNode; title: string; tint?: string }) {
  return (
    <div className="relative mx-auto w-[18.125rem]">
      <div className="absolute -inset-10 -z-10 rounded-full opacity-40 blur-3xl" style={{ background: tint }} />
      <div className="relative h-[36.875rem] rounded-[2.6rem] border-[7px] border-[#0b1330] bg-card shadow-[0_40px_80px_-30px_rgb(8_30_76/0.6)] ring-1 ring-white/20">
        <span className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[#0b1330]" />
        <div className="flex h-full flex-col overflow-hidden rounded-[2.1rem]">
          <div className="flex items-center justify-between px-6 pt-3 text-[0.6875rem] font-bold text-muted">
            <span>9:41</span>
            <span className="flex items-center gap-1"><Signal className="size-3" /><Wifi className="size-3" /><BatteryFull className="size-3.5" /></span>
          </div>
          <div className="px-5 pt-5">
            <p className="text-lg font-extrabold text-heading">{title}</p>
          </div>
          <div className="relative flex-1 px-4 pb-4 pt-3">{children}</div>
        </div>
      </div>
    </div>
  );
}

const freeTag = <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.625rem] font-extrabold text-emerald-600 dark:text-emerald-400">FREE</span>;

/* ───────── 1. route search ───────── */
function RouteSearch() {
  const results = [
    { name: "Highway Dhaba", km: "3.2 km", Icon: Utensils, c: "#ff5a00" },
    { name: "Hotel Sunrise Inn", km: "18 km", Icon: Hotel, c: "#7c5cff" },
    { name: "Annapurna Kitchen", km: "41 km", Icon: Utensils, c: "#ff5a00" },
  ];
  return (
    <PhoneShell title="Find on your route" tint="#2f6bff">
      <div className="space-y-2.5 rounded-2xl bg-surface-alt p-3 ring-1 ring-line">
        {[
          { label: "Pickup", value: "Ahmedabad", c: "#16a34a", cls: "fm-type1" },
          { label: "Drop", value: "Vadodara", c: "#ff5a00", cls: "fm-type2" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2.5 rounded-xl bg-card px-3 py-2.5 ring-1 ring-line">
            <span className="size-2.5 rounded-full" style={{ background: f.c }} />
            <span className="leading-tight">
              <span className="block text-[0.625rem] font-semibold uppercase text-muted">{f.label}</span>
              <span className={`block overflow-hidden whitespace-nowrap text-sm font-bold text-heading ${f.cls}`}>{f.value}</span>
            </span>
          </div>
        ))}
        <div className="fm-press flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-2.5 text-sm font-extrabold text-white">
          <Search className="size-4" /> Find Restaurant
        </div>
      </div>
      <div className="fm-toast mt-3 flex items-center gap-2 rounded-xl bg-[#2f6bff]/12 px-3 py-2 text-xs font-bold text-[#2f6bff]">
        <span className="fm-wave flex items-end gap-0.5"><i className="h-2 w-0.5 bg-current" /><i className="h-3 w-0.5 bg-current" /><i className="h-1.5 w-0.5 bg-current" /></span>
        “8 partners found on your route”
      </div>
      <ul className="mt-3 space-y-2">
        {results.map(({ name, km, Icon, c }, i) => (
          <li key={name} className="fm-row flex items-center gap-3 rounded-xl bg-card p-2.5 shadow-card ring-1 ring-line" style={{ animationDelay: `${3.2 + i * 0.3}s` }}>
            <span className="grid size-10 place-items-center rounded-xl text-white" style={{ background: c }}><Icon className="size-5" /></span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-bold text-heading">{name}</span>
              <span className="text-[0.6875rem] text-muted">{km} · on route</span>
            </span>
            {freeTag}
          </li>
        ))}
      </ul>
    </PhoneShell>
  );
}

/* ───────── 2. nearby map ───────── */
function NearbyMap() {
  const food = [[62, 78], [150, 60], [196, 150], [86, 196]];
  const stay = [[120, 112], [40, 140], [186, 214]];
  return (
    <PhoneShell title="Nearby partners" tint="#0ea5a4">
      <div className="mb-3 flex gap-2">
        <span className="fm-tabA flex-1 rounded-full py-2 text-center text-xs font-extrabold">🍽 Explore Food</span>
        <span className="fm-tabB flex-1 rounded-full py-2 text-center text-xs font-extrabold">🛏 Explore Stay</span>
      </div>
      <div className="relative h-[20.625rem] overflow-hidden rounded-2xl ring-1 ring-line" style={{ background: "var(--map-bg)" }}>
        <svg viewBox="0 0 240 280" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
          <g style={{ fill: "var(--map-block-2)" }}>
            <rect x="10" y="10" width="60" height="50" rx="6" /><rect x="90" y="10" width="50" height="50" rx="6" /><rect x="160" y="10" width="70" height="50" rx="6" />
            <rect x="10" y="170" width="60" height="50" rx="6" /><rect x="150" y="80" width="80" height="40" rx="6" /><rect x="90" y="230" width="60" height="40" rx="6" />
          </g>
          <g style={{ fill: "var(--map-park)" }}><rect x="10" y="80" width="60" height="70" rx="10" /><rect x="160" y="230" width="70" height="40" rx="10" /></g>
          <g fill="none" strokeLinecap="round" style={{ stroke: "var(--map-street)" }}>
            <path d="M0 70H240M0 160H240M80 0V280M150 0V280" strokeWidth="8" />
            <path d="M0 225H240M210 0V280" strokeWidth="4" />
          </g>
          {/* radius around the driver */}
          <circle cx="120" cy="140" r="96" fill="#0ea5a4" fillOpacity="0.08" stroke="#0ea5a4" strokeOpacity="0.45" strokeDasharray="5 5" className="fm-radius" />
          <g className="fm-food">
            {food.map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path d="M0 0C0 0-11-13-11-20A11 11 0 1 1 11-20C11-13 0 0 0 0Z" fill="#ff5a00" stroke="#fff" strokeWidth="2" />
                <circle cy="-20" r="4" fill="#fff" />
              </g>
            ))}
          </g>
          <g className="fm-stay">
            {stay.map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <path d="M0 0C0 0-11-13-11-20A11 11 0 1 1 11-20C11-13 0 0 0 0Z" fill="#7c5cff" stroke="#fff" strokeWidth="2" />
                <circle cy="-20" r="4" fill="#fff" />
              </g>
            ))}
          </g>
          <g transform="translate(120 140)">
            <circle r="16" fill="#2f6bff" opacity="0.2" className="fm-ping" />
            <circle r="9" fill="#fff" /><circle r="7" fill="#2f6bff" />
          </g>
        </svg>
        <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-card shadow-card"><LocateFixed className="size-4 text-heading" /></span>
      </div>
      <div className="mt-3 flex items-center gap-3 rounded-xl bg-card p-2.5 shadow-card ring-1 ring-line">
        <span className="grid size-9 place-items-center rounded-xl bg-[#0ea5a4]/15 text-[#0ea5a4]"><Navigation className="size-4" /></span>
        <span className="flex-1 leading-tight">
          <span className="block text-sm font-bold text-heading">7 partners nearby</span>
          <span className="text-[0.6875rem] text-muted">Map adjusts to where they are</span>
        </span>
      </div>
    </PhoneShell>
  );
}

/* ───────── 3. bill + cashback ───────── */
function BillCashback() {
  return (
    <PhoneShell title="Upload bill" tint="#ff5a00">
      <div className="fm-bill relative rounded-2xl bg-card p-4 shadow-card ring-1 ring-line">
        <div className="flex items-center gap-2 border-b border-dashed border-line pb-2.5">
          <Receipt className="size-4 text-brand-orange" />
          <span className="text-sm font-extrabold text-heading">Highway Dhaba</span>
          <span className="ml-auto text-[0.625rem] text-muted">Bill #2481</span>
        </div>
        <div className="space-y-1.5 py-2.5 text-xs text-muted">
          {["Thali × 2", "Lassi × 2", "Paratha × 3"].map((l) => (
            <div key={l} className="flex justify-between"><span>{l}</span><span className="h-2 w-10 rounded bg-line" /></div>
          ))}
        </div>
        <div className="flex justify-between border-t border-line pt-2 text-sm font-extrabold text-heading"><span>Total</span><span>₹ ••••</span></div>
        <span className="fm-scan absolute inset-x-3 top-3 h-0.5 rounded-full bg-brand-orange shadow-[0_0_12px_#ff5a00]" />
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-surface-alt px-3 py-2.5 ring-1 ring-line">
        <span className="text-xs font-bold text-heading">Rate the place</span>
        <span className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="fm-star size-4 text-amber-400" style={{ animationDelay: `${1.6 + i * 0.18}s` }} />)}
        </span>
      </div>
      <div className="mt-3 rounded-xl bg-surface-alt px-3 py-2.5 ring-1 ring-line">
        <div className="flex items-center justify-between text-[0.6875rem] font-bold">
          <span className="text-muted">Verifying with the Miles team</span>
          <span className="fm-ok flex items-center gap-1 text-emerald-500"><Check className="size-3.5" /> Verified</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"><div className="fm-verify h-full rounded-full bg-emerald-500" /></div>
      </div>
      {/* scratch card */}
      <div className="relative mt-3 h-[7.375rem] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-center text-white shadow-[0_14px_30px_-14px_rgb(255_90_0/0.7)]">
        <div className="flex h-full flex-col items-center justify-center">
          <PartyPopper className="fm-pop size-7" />
          <p className="mt-1 text-lg font-extrabold">Cashback won!</p>
          <p className="text-[0.6875rem] font-semibold text-white/90">Added to your wallet</p>
        </div>
        <div className="fm-scratch absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(45deg,#c7cedb_0_8px,#b4bccb_8px_16px)] text-sm font-extrabold text-[#55607a]">
          Scratch to reveal
        </div>
      </div>
    </PhoneShell>
  );
}

/* ───────── 4. duty journey ───────── */
function DutyJourney() {
  const R = 74;
  const C = 2 * Math.PI * R;
  return (
    <PhoneShell title="Duty journey" tint="#7c5cff">
      <div className="relative mx-auto grid size-[12.5rem] place-items-center">
        <svg viewBox="0 0 180 180" className="absolute inset-0 size-full -rotate-90">
          <circle cx="90" cy="90" r={R} fill="none" stroke="var(--color-line)" strokeWidth="14" />
          <circle cx="90" cy="90" r={R} fill="none" stroke="url(#fm-duty)" strokeWidth="14" strokeLinecap="round" strokeDasharray={C} className="fm-ring" style={{ ["--c" as string]: `${C}` }} />
          <defs><linearGradient id="fm-duty"><stop offset="0" stopColor="#7c5cff" /><stop offset="1" stopColor="#ff5a00" /></linearGradient></defs>
        </svg>
        <div className="text-center leading-tight">
          <p className="text-4xl font-extrabold text-heading"><CountUp to={48} duration={2.4} /></p>
          <p className="text-xs font-bold text-muted">of 60 duties</p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        {[{ v: "180", l: "day window" }, { v: "12", l: "to go" }, { v: "3", l: "pending" }].map((s) => (
          <div key={s.l} className="rounded-xl bg-surface-alt py-2 ring-1 ring-line">
            <p className="text-base font-extrabold text-heading">{s.v}</p>
            <p className="text-[0.625rem] font-semibold text-muted">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 space-y-2">
        {[{ t: "Duty #48 · Ahmedabad → Surat", s: "Verified", ok: true }, { t: "Duty #49 · Surat → Vapi", s: "Pending", ok: false }].map((d, i) => (
          <div key={d.t} className="fm-row flex items-center gap-2.5 rounded-xl bg-card p-2.5 shadow-card ring-1 ring-line" style={{ animationDelay: `${1.2 + i * 0.3}s` }}>
            <span className="grid size-8 place-items-center rounded-lg bg-[#7c5cff]/15 text-[#7c5cff]"><Car className="size-4" /></span>
            <span className="flex-1 text-xs font-bold text-heading">{d.t}</span>
            <span className={`rounded-full px-2 py-0.5 text-[0.625rem] font-extrabold ${d.ok ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"}`}>{d.s}</span>
          </div>
        ))}
      </div>
    </PhoneShell>
  );
}

/* ───────── 5. wallet ───────── */
function WalletMock() {
  const tiles = [
    { l: "Free meals", v: 34, Icon: Utensils, c: "#ff5a00" },
    { l: "Free stays", v: 9, Icon: Bed, c: "#7c5cff" },
    { l: "Duties done", v: 48, Icon: Car, c: "#2f6bff" },
    { l: "Bills uploaded", v: 41, Icon: Receipt, c: "#0ea5a4" },
  ];
  return (
    <PhoneShell title="My activity" tint="#16a34a">
      <div className="rounded-2xl bg-gradient-to-br from-[#16a34a] to-[#0ea5a4] p-4 text-white shadow-[0_14px_30px_-14px_rgb(22_163_74/0.7)]">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-white/85"><Wallet className="size-3.5" /> Wallet balance</p>
        <p className="mt-1 text-3xl font-extrabold">₹ <CountUp to={1240} separator="," duration={2} /></p>
        <p className="mt-1 text-[0.6875rem] font-semibold text-white/85">Total savings this month ↑</p>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {tiles.map(({ l, v, Icon, c }) => (
          <div key={l} className="rounded-xl bg-card p-3 shadow-card ring-1 ring-line">
            <span className="grid size-8 place-items-center rounded-lg" style={{ background: `${c}22`, color: c }}><Icon className="size-4" /></span>
            <p className="mt-2 text-xl font-extrabold text-heading"><CountUp to={v} duration={1.8} /></p>
            <p className="text-[0.625rem] font-semibold text-muted">{l}</p>
          </div>
        ))}
      </div>
      <p className="mb-2 mt-3 text-xs font-bold text-heading">History</p>
      {[{ t: "Cashback credited", i: BadgeIndianRupee, c: "#16a34a" }, { t: "Free meal · Highway Dhaba", i: Utensils, c: "#ff5a00" }].map(({ t, i: I, c }, k) => (
        <div key={t} className="fm-row mb-2 flex items-center gap-2.5 rounded-xl bg-card p-2 ring-1 ring-line" style={{ animationDelay: `${1 + k * 0.3}s` }}>
          <span className="grid size-7 place-items-center rounded-lg text-white" style={{ background: c }}><I className="size-3.5" /></span>
          <span className="flex-1 text-xs font-semibold text-heading">{t}</span>
          <ChevronRight className="size-4 text-muted" />
        </div>
      ))}
    </PhoneShell>
  );
}

/* ───────── 6. free services ───────── */
function ServicesMock() {
  const s = [
    { l: "Hotel", Icon: Hotel, c: "#7c5cff" },
    { l: "Restaurant", Icon: Utensils, c: "#ff5a00" },
    { l: "Roadside", Icon: Wrench, c: "#e0457b" },
    { l: "Insurance", Icon: ShieldCheck, c: "#2f6bff" },
    { l: "Lawyer", Icon: Gavel, c: "#0ea5a4" },
    { l: "24/7 Support", Icon: Headset, c: "#16a34a" },
  ];
  return (
    <PhoneShell title="Services" tint="#e0457b">
      <div className="grid grid-cols-3 gap-2.5">
        {s.map(({ l, Icon, c }, i) => (
          <div key={l} className="fm-tile relative rounded-2xl bg-card px-1 pb-2.5 pt-3 text-center shadow-card ring-1 ring-line" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
            <span className="absolute -right-1 -top-1.5 rounded-full bg-emerald-500 px-1.5 py-px text-[0.5rem] font-extrabold text-white">FREE</span>
            <span className="mx-auto grid size-11 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 60%, #fff))` }}><Icon className="size-5" /></span>
            <p className="mt-1.5 text-[0.625rem] font-bold text-heading">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#e0457b] to-[#ff5a00] p-4 text-white">
        <p className="text-xs font-semibold text-white/85">Roadside assistance</p>
        <p className="text-base font-extrabold">Stuck on the road?</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/20 px-3 py-2.5 ring-1 ring-white/30">
          <span className="relative grid size-8 place-items-center rounded-full bg-white text-[#e0457b]">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/60" />
            <Phone className="relative size-4" />
          </span>
          <span className="text-sm font-extrabold">Need Help · Live call</span>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl bg-surface-alt px-3 py-2.5 text-xs font-bold text-heading ring-1 ring-line">
        <PlayCircle className="size-4 text-brand-orange" /> How-to video on every service
      </div>
    </PhoneShell>
  );
}

export const mocks: Record<FeatureId, () => React.JSX.Element> = {
  "route-search": RouteSearch,
  "nearby-map": NearbyMap,
  "bill-cashback": BillCashback,
  "duty-journey": DutyJourney,
  wallet: WalletMock,
  "free-services": ServicesMock,
};
