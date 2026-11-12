import { BatteryCharging, Bed, Check, Clock, Fuel, Gavel, Headset, MessageCircle, Phone, PlayCircle, ShieldCheck, Star, Truck, Utensils, Wrench } from "lucide-react";
import type { ServiceId } from "@/lib/services";

/** One animated card per service (sizes in rem, theme-aware). Animations: "sv-*" in app/features.css, run inside PlayOnView. */

const Card = ({ children, color }: { children: React.ReactNode; color: string }) => (
  <div className="relative mx-auto w-full max-w-[26rem]">
    <div className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-30 blur-3xl" style={{ background: color }} />
    <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-card/90 p-5 shadow-[0_30px_70px_-30px_rgb(8_30_76/0.45)] ring-1 ring-line backdrop-blur-xl dark:border-white/10">{children}</div>
  </div>
);
const Head = ({ Icon, title, sub, color }: { Icon: React.ElementType; title: string; sub: string; color: string }) => (
  <div className="flex items-center gap-3">
    <span className="grid size-11 place-items-center rounded-2xl text-white" style={{ background: color }}><Icon className="size-5" /></span>
    <span className="leading-tight"><span className="block text-base font-extrabold text-heading">{title}</span><span className="text-xs text-muted">{sub}</span></span>
  </div>
);
const Line = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div className="sv-in flex items-center gap-2.5 rounded-xl bg-surface-alt px-3 py-2.5 ring-1 ring-line" style={{ animationDelay: `${delay}s` }}>{children}</div>
);

function Food() {
  return (
    <Card color="#ff5a00">
      <Head Icon={Utensils} title="Highway Dhaba" sub="NH 48 · 3.2 km ahead" color="#ff5a00" />
      <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#ff7a1f] to-[#e84c00] p-4 text-white">
        <p className="text-[0.65rem] font-bold uppercase tracking-widest text-white/80">For Miles drivers</p>
        <p className="mt-1 text-xl font-extrabold">Free meal on duty</p>
        <p className="text-xs text-white/85">Show your Miles Assist app at the counter</p>
        <span className="sv-steam absolute right-6 top-24 text-3xl" aria-hidden="true">🍛</span>
      </div>
      <div className="mt-3 space-y-2">
        {["Thali", "Paratha & curd", "Masala chai"].map((m, i) => (
          <Line key={m} delay={0.3 + i * 0.15}><span className="flex-1 text-sm font-bold text-heading">{m}</span><span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.6rem] font-extrabold text-emerald-600 dark:text-emerald-400">FREE</span></Line>
        ))}
      </div>
    </Card>
  );
}

function Stay() {
  return (
    <Card color="#7c5cff">
      <Head Icon={Bed} title="Hotel Sunrise Inn" sub="Partner hotel · 18 km" color="#7c5cff" />
      <div className="relative mt-4 h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-[#1d2a6b] to-[#4c3bc4]">
        <div className="sv-moon absolute right-6 top-4 size-8 rounded-full bg-[#ffe9a8] shadow-[0_0_30px_#ffe9a8]" />
        {[[12, 18], [34, 30], [60, 12], [82, 26]].map(([l, t], i) => <span key={i} className="sv-twinkle absolute size-1 rounded-full bg-white" style={{ left: `${l}%`, top: `${t}%`, animationDelay: `${i * 0.5}s` }} />)}
        <div className="absolute inset-x-0 bottom-0 flex h-16 items-end justify-center gap-1.5 px-4">
          {Array.from({ length: 6 }, (_, i) => <span key={i} className={`sv-window h-6 flex-1 rounded-t-md ${i % 2 ? "bg-[#ffd27a]" : "bg-white/20"}`} style={{ animationDelay: `${i * 0.4}s` }} />)}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[{ I: Bed, t: "Rest on duty" }, { I: Check, t: "Verified partner" }, { I: Clock, t: "On your route" }].map(({ I, t }, i) => (
          <div key={t} className="sv-in rounded-xl bg-surface-alt py-2.5 ring-1 ring-line" style={{ animationDelay: `${0.3 + i * 0.15}s` }}><I className="mx-auto size-4 text-[#7c5cff]" /><p className="mt-1 text-[0.65rem] font-bold text-heading">{t}</p></div>
        ))}
      </div>
      <div className="mt-3 rounded-xl bg-[#7c5cff] py-2.5 text-center text-sm font-extrabold text-white">Free stay for Miles drivers</div>
    </Card>
  );
}

function Roadside() {
  return (
    <Card color="#e0457b">
      <Head Icon={Wrench} title="Roadside Assistance" sub="Breakdown on NH 48" color="#e0457b" />
      <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-[#e0457b] to-[#ff5a00] p-3.5 text-white">
        <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-white text-[#e0457b]"><span className="absolute inset-0 animate-ping rounded-full bg-white/60" /><Phone className="relative size-5" /></span>
        <span className="leading-tight"><span className="block text-base font-extrabold">Need Help</span><span className="text-xs text-white/90">Connected to Miles support · live</span></span>
        <span className="sv-wave ml-auto flex h-5 items-end gap-0.5"><i className="h-2 w-0.5 bg-white" /><i className="h-5 w-0.5 bg-white" /><i className="h-3 w-0.5 bg-white" /><i className="h-4 w-0.5 bg-white" /></span>
      </div>
      {/* help on the way */}
      <div className="relative mt-3 h-14 overflow-hidden rounded-xl bg-surface-alt ring-1 ring-line">
        <div className="absolute inset-x-3 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[repeating-linear-gradient(90deg,var(--color-line)_0_0.6rem,transparent_0.6rem_1.1rem)]" />
        <span className="sv-tow absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg bg-[#e0457b] text-white"><Truck className="size-5" /></span>
        <span className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-brand-orange text-white ring-4 ring-brand-orange/25">📍</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[{ I: Truck, t: "Towing" }, { I: BatteryCharging, t: "Jump-start" }, { I: Fuel, t: "Fuel delivery" }, { I: Wrench, t: "Puncture" }].map(({ I, t }, i) => (
          <Line key={t} delay={0.4 + i * 0.12}><I className="size-4 text-[#e0457b]" /><span className="text-xs font-bold text-heading">{t}</span></Line>
        ))}
      </div>
    </Card>
  );
}

function Insurance() {
  return (
    <Card color="#2f6bff">
      <Head Icon={ShieldCheck} title="Insurance support" sub="Personal help from our team" color="#2f6bff" />
      <div className="relative mt-4 grid place-items-center py-3">
        <svg viewBox="0 0 120 130" className="sv-shield h-36 w-auto" aria-hidden="true">
          <defs><linearGradient id="sv-sh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b8cff" /><stop offset="1" stopColor="#2f6bff" /></linearGradient></defs>
          <path d="M60 6L108 24V60C108 92 86 116 60 124C34 116 12 92 12 60V24Z" fill="url(#sv-sh)" />
          <path d="M60 22L94 35V60C94 84 78 102 60 108C42 102 26 84 26 60V35Z" fill="#fff" opacity="0.18" />
          <path d="M40 64l14 14 28-30" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="sv-check" />
        </svg>
        <span className="sv-ring absolute size-40 rounded-full border-2 border-[#2f6bff]/40" />
      </div>
      <div className="space-y-2">
        <Line delay={0.3}><Check className="size-4 text-emerald-500" /><span className="text-xs font-bold text-heading">Guidance & personal support</span></Line>
        <Line delay={0.45}><span className="rounded-md bg-gradient-to-r from-[#8a5a00] to-[#f2c14e] px-1.5 py-0.5 text-[0.55rem] font-extrabold text-white">GOLD</span><span className="text-xs font-bold text-heading">Life & accident cover</span></Line>
      </div>
    </Card>
  );
}

function Legal() {
  return (
    <Card color="#0ea5a4">
      <Head Icon={Gavel} title="Talk to a lawyer" sub="First call free" color="#0ea5a4" />
      <div className="mt-4 space-y-2.5 text-sm">
        <div className="sv-in ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-[#081e4c] px-3.5 py-2.5 text-white dark:bg-[#2a3d78]">I got a challan on the highway. What should I do?</div>
        <div className="sv-typing flex w-fit gap-1 rounded-2xl rounded-bl-md bg-surface-alt px-3.5 py-3 ring-1 ring-line"><i className="size-1.5 rounded-full bg-muted" /><i className="size-1.5 rounded-full bg-muted" /><i className="size-1.5 rounded-full bg-muted" /></div>
        <div className="sv-in max-w-[85%] rounded-2xl rounded-bl-md bg-surface-alt px-3.5 py-2.5 text-heading ring-1 ring-line" style={{ animationDelay: "1.4s" }}>Don&apos;t worry. Share the challan details and I&apos;ll guide you step by step.</div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#0ea5a4]/12 px-3 py-2.5 text-xs font-extrabold text-[#0ea5a4]"><Phone className="size-4" /> Your first lawyer call is free</div>
    </Card>
  );
}

function Support() {
  return (
    <Card color="#16a34a">
      <Head Icon={Headset} title="24/7 Support" sub="Online now" color="#16a34a" />
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[{ I: MessageCircle, t: "Chat" }, { I: Phone, t: "Call" }, { I: PlayCircle, t: "Videos" }].map(({ I, t }, i) => (
          <div key={t} className="sv-in rounded-xl bg-surface-alt py-3 ring-1 ring-line" style={{ animationDelay: `${0.2 + i * 0.12}s` }}><I className="mx-auto size-5 text-[#16a34a]" /><p className="mt-1 text-xs font-bold text-heading">{t}</p></div>
        ))}
      </div>
      <p className="mb-2 mt-4 text-xs font-extrabold text-heading">Popular FAQs</p>
      <div className="space-y-2">
        {["How do I upload a bill?", "When is cashback credited?", "How do tiers work?"].map((q, i) => (
          <Line key={q} delay={0.5 + i * 0.15}><span className="grid size-5 place-items-center rounded-full bg-[#16a34a] text-[0.6rem] font-extrabold text-white">?</span><span className="flex-1 text-xs font-bold text-heading">{q}</span><Star className="size-3.5 text-muted" /></Line>
        ))}
      </div>
    </Card>
  );
}

export const widgets: Record<ServiceId, () => React.JSX.Element> = {
  "free-food": Food,
  "free-stay": Stay,
  "roadside-assistance": Roadside,
  insurance: Insurance,
  "legal-help": Legal,
  support: Support,
};
