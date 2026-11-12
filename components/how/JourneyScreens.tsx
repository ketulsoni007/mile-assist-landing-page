import { BadgeCheck, Camera, Car, Check, Crown, Hotel, IdCard, Lock, Medal, PartyPopper, QrCode, Receipt, ScanFace, Search, Star, Utensils, Wallet } from "lucide-react";
import type { JourneyStep } from "@/lib/how";

/** One small app screen per journey step, shown in the sticky phone. Sizes in rem so they scale. */

const Row = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center gap-2.5 rounded-xl bg-card p-2.5 shadow-card ring-1 ring-line ${className}`}>{children}</div>
);

function Signup() {
  return (
    <div className="flex h-full flex-col">
      <div className="mx-auto mt-2 grid size-16 place-items-center rounded-3xl bg-gradient-to-br from-brand-orange to-[#ff8a3d] text-white shadow-glow"><Car className="size-8" /></div>
      <p className="mt-4 text-center text-lg font-extrabold text-heading">Welcome to Miles Assist</p>
      <p className="text-center text-xs text-muted">Enter your mobile number</p>
      <div className="mt-5 flex items-center gap-2 rounded-xl bg-surface-alt px-3 py-3 ring-1 ring-line">
        <span className="text-sm font-bold text-muted">+91</span><span className="h-4 w-px bg-line" /><span className="hw-type text-sm font-bold text-heading">98765 43210</span>
      </div>
      <p className="mt-4 text-xs font-bold text-heading">Enter OTP</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {[4, 7, 2, 9].map((d, i) => (
          <span key={i} className="js-otp grid h-12 place-items-center rounded-xl bg-card text-lg font-extrabold text-heading ring-2 ring-line" style={{ animationDelay: `${0.4 + i * 0.25}s` }}>{d}</span>
        ))}
      </div>
      <span className="mt-auto rounded-xl bg-brand-orange py-3 text-center text-sm font-extrabold text-white">Verify & continue</span>
    </div>
  );
}

function Kyc() {
  const items = [
    { Icon: ScanFace, t: "Live selfie" },
    { Icon: IdCard, t: "Aadhaar" },
    { Icon: IdCard, t: "Driving licence" },
    { Icon: Car, t: "Vehicle & RC" },
  ];
  return (
    <div className="space-y-2.5">
      <div className="relative mx-auto grid size-28 place-items-center overflow-hidden rounded-full bg-surface-alt ring-4 ring-[#7c5cff]/40">
        <Camera className="size-10 text-muted" />
        <span className="js-scan absolute inset-x-0 h-1 bg-[#7c5cff] shadow-[0_0_12px_#7c5cff]" />
      </div>
      {items.map(({ Icon, t }, i) => (
        <Row key={t}>
          <span className="grid size-8 place-items-center rounded-lg bg-[#7c5cff]/15 text-[#7c5cff]"><Icon className="size-4" /></span>
          <span className="flex-1 text-sm font-bold text-heading">{t}</span>
          <span className="js-tick grid size-6 place-items-center rounded-full bg-emerald-500 text-white" style={{ animationDelay: `${0.5 + i * 0.35}s` }}><Check className="size-3.5" strokeWidth={3.5} /></span>
        </Row>
      ))}
      <div className="js-pop rounded-xl bg-emerald-500/15 px-3 py-2.5 text-center text-xs font-extrabold text-emerald-600 dark:text-emerald-400" style={{ animationDelay: "2s" }}>🎉 KYC verified · 1 month free</div>
    </div>
  );
}

function RouteScreen() {
  return (
    <div className="space-y-2.5">
      <div className="space-y-2 rounded-2xl bg-surface-alt p-2.5 ring-1 ring-line">
        <Row><span className="size-2.5 rounded-full bg-emerald-500" /><span className="text-sm font-bold text-heading">Ahmedabad</span></Row>
        <Row><span className="size-2.5 rounded-full bg-brand-orange" /><span className="text-sm font-bold text-heading">Vadodara</span></Row>
        <span className="flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-2.5 text-sm font-extrabold text-white"><Search className="size-4" /> Find Restaurant</span>
      </div>
      <p className="px-1 text-xs font-bold text-[#0ea5a4]">8 partners found on your route</p>
      {[
        { n: "Highway Dhaba", k: "3.2 km", Icon: Utensils, c: "#ff5a00" },
        { n: "Hotel Sunrise Inn", k: "18 km", Icon: Hotel, c: "#7c5cff" },
        { n: "Annapurna Kitchen", k: "41 km", Icon: Utensils, c: "#ff5a00" },
      ].map(({ n, k, Icon, c }, i) => (
        <Row key={n} className="js-in" >
          <span className="grid size-9 place-items-center rounded-xl text-white" style={{ background: c }}><Icon className="size-4" /></span>
          <span className="flex-1 leading-tight" style={{ animationDelay: `${i * 0.2}s` }}><span className="block text-sm font-bold text-heading">{n}</span><span className="text-[0.68rem] text-muted">{k} · on route</span></span>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.6rem] font-extrabold text-emerald-600 dark:text-emerald-400">FREE</span>
        </Row>
      ))}
    </div>
  );
}

function Checkin() {
  return (
    <div className="flex h-full flex-col items-center text-center">
      <p className="text-sm font-bold text-muted">You&apos;ve arrived at</p>
      <p className="text-lg font-extrabold text-heading">Highway Dhaba</p>
      <div className="relative mt-4 grid size-44 place-items-center rounded-3xl bg-card p-3 shadow-card ring-1 ring-line">
        <QrCode className="size-full text-heading" strokeWidth={1.2} />
        <span className="js-scan absolute inset-x-3 h-0.5 bg-brand-orange shadow-[0_0_12px_#ff5a00]" />
        {["left-0 top-0 border-l-4 border-t-4", "right-0 top-0 border-r-4 border-t-4", "bottom-0 left-0 border-b-4 border-l-4", "bottom-0 right-0 border-b-4 border-r-4"].map((c) => (
          <span key={c} className={`absolute size-6 rounded-sm border-brand-orange ${c}`} />
        ))}
      </div>
      <p className="mt-3 text-xs text-muted">or share OTP <b className="tracking-[0.3em] text-heading">4 8 2 1</b></p>
      <div className="mt-4 w-full space-y-2 text-left">
        {[
          { t: "Visit confirmed by partner", d: "0.6s" },
          { t: "Offer for Miles drivers applied", d: "1s" },
        ].map(({ t, d }) => (
          <Row key={t}>
            <span className="js-tick grid size-6 place-items-center rounded-full bg-emerald-500 text-white" style={{ animationDelay: d }}><Check className="size-3.5" strokeWidth={3.5} /></span>
            <span className="text-xs font-bold text-heading">{t}</span>
          </Row>
        ))}
      </div>
      <div className="js-pop mt-auto w-full rounded-2xl bg-gradient-to-r from-brand-orange to-[#ff8a3d] p-3 text-white" style={{ animationDelay: "1.6s" }}>
        <p className="flex items-center justify-center gap-1.5 text-sm font-extrabold"><Utensils className="size-4" /> Free meal unlocked</p>
        <p className="text-[0.68rem] text-white/90">Enjoy your food. Upload the bill after.</p>
      </div>
    </div>
  );
}

function Bill() {
  return (
    <div className="space-y-2.5">
      <div className="relative rounded-2xl bg-card p-3.5 shadow-card ring-1 ring-line">
        <div className="flex items-center gap-2 border-b border-dashed border-line pb-2"><Receipt className="size-4 text-brand-orange" /><span className="text-sm font-extrabold text-heading">Customer bill</span></div>
        {["Thali × 2", "Lassi × 2", "Paratha × 3"].map((l) => (
          <div key={l} className="mt-2 flex justify-between text-xs text-muted"><span>{l}</span><span className="h-2 w-10 rounded bg-line" /></div>
        ))}
        <div className="mt-2 flex justify-between border-t border-line pt-2 text-sm font-extrabold text-heading"><span>Total</span><span>₹ ••••</span></div>
        <span className="js-scan absolute inset-x-3 h-0.5 bg-[#e0457b] shadow-[0_0_12px_#e0457b]" />
      </div>
      <Row className="justify-between"><span className="text-xs font-bold text-heading">Rate the place</span>
        <span className="flex gap-0.5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="js-star size-4 text-amber-400" style={{ animationDelay: `${0.8 + i * 0.18}s` }} />)}</span>
      </Row>
      <span className="flex items-center justify-center gap-2 rounded-xl bg-[#e0457b] py-3 text-sm font-extrabold text-white">Submit bill</span>
    </div>
  );
}

function Cashback() {
  return (
    <div className="flex h-full flex-col">
      <Row><span className="grid size-8 place-items-center rounded-lg bg-emerald-500/15 text-emerald-500"><BadgeCheck className="size-4" /></span><span className="flex-1 text-sm font-bold text-heading">Bill verified</span><Check className="size-4 text-emerald-500" /></Row>
      <div className="relative mt-4 grid flex-1 place-items-center overflow-hidden rounded-3xl bg-gradient-to-br from-amber-300 to-orange-500 text-center text-white shadow-[0_14px_30px_-14px_rgb(255_90_0/0.7)]">
        <div><PartyPopper className="mx-auto size-10" /><p className="mt-2 text-2xl font-extrabold">Cashback won!</p><p className="text-xs font-semibold text-white/90">Added to your wallet</p></div>
        <span className="js-scratch absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(45deg,#c7cedb_0_8px,#b4bccb_8px_16px)] text-sm font-extrabold text-[#55607a]">Scratch to reveal</span>
      </div>
      <Row className="mt-3"><span className="grid size-8 place-items-center rounded-lg bg-emerald-500 text-white"><Wallet className="size-4" /></span><span className="flex-1 text-sm font-bold text-heading">Wallet updated</span></Row>
    </div>
  );
}

function Tiers() {
  const t = [
    { n: "Bronze", Icon: Medal, g: "from-[#7a4421] via-[#c98048] to-[#8a4b22]", on: true },
    { n: "Silver", Icon: Medal, g: "from-[#5f6b7a] via-[#c9d1db] to-[#6c7887]", on: true },
    { n: "Gold", Icon: Crown, g: "from-[#8a5a00] via-[#f2c14e] to-[#a36d00]", on: false },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-card p-3.5 shadow-card ring-1 ring-line">
        <div className="flex items-end justify-between"><span className="text-sm font-extrabold text-heading">Duty journey</span><span className="text-xs font-bold text-muted">48 / 60</span></div>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-line"><div className="js-bar h-full rounded-full bg-gradient-to-r from-[#7c5cff] to-brand-orange" /></div>
        <p className="mt-1.5 text-[0.68rem] text-muted">12 more duties within your 180-day window</p>
      </div>
      {t.map(({ n, Icon, g, on }, i) => (
        <div key={n} className={`js-in flex items-center gap-3 rounded-2xl bg-gradient-to-br ${g} p-3 text-white ${on ? "" : "opacity-60"}`} style={{ animationDelay: `${0.3 + i * 0.2}s` }}>
          <span className="grid size-10 place-items-center rounded-xl bg-white/20 ring-1 ring-white/40"><Icon className="size-5" /></span>
          <span className="flex-1 text-base font-extrabold">{n}</span>
          {on ? <Check className="size-5" strokeWidth={3} /> : <Lock className="size-4" />}
        </div>
      ))}
    </div>
  );
}

export const screens: Record<JourneyStep["screen"], () => React.JSX.Element> = {
  signup: Signup,
  kyc: Kyc,
  route: RouteScreen,
  checkin: Checkin,
  bill: Bill,
  cashback: Cashback,
  tiers: Tiers,
};
