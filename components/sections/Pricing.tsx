import { ArrowRight, Award, BadgeIndianRupee, Check, Crown, Gift, Medal, Sparkles } from "lucide-react";
import CountUp from "@/components/react-bits/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { plan, tiers, type Tier } from "@/lib/pricing";

const tierIcon = { bronze: Medal, silver: Award, gold: Crown } as const;

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const Icon = tierIcon[tier.id];
  const gold = tier.id === "gold";
  const metal = `linear-gradient(135deg, ${tier.colors.from}, ${tier.colors.via} 48%, ${tier.colors.to})`;
  return (
    <Reveal delay={0.1 + index * 0.12} className="h-full">
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border bg-card/80 p-6 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-2 ${gold ? "border-transparent lg:-translate-y-3 lg:hover:-translate-y-5" : "border-line"}`}
        style={{ ["--glow" as string]: tier.colors.glow }}
      >
        {/* animated metallic border on Gold */}
        {gold && <span className="pr-border pointer-events-none absolute inset-0 rounded-3xl p-[0.125rem]" aria-hidden="true" />}
        <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ boxShadow: `0 30px 60px -28px ${tier.colors.glow}` }} aria-hidden="true" />

        {/* metal header plate with a light sweep */}
        <div className="relative -mx-6 -mt-6 overflow-hidden px-6 pb-6 pt-6" style={{ background: metal, color: tier.colors.ink }}>
          <span className="pr-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" style={{ animationDelay: `${index * 1.1}s` }} aria-hidden="true" />
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <span className="pr-medal grid size-11 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/40 backdrop-blur" style={{ animationDelay: `${index * 0.4}s` }}>
                <Icon className="size-6" />
              </span>
              <span className="leading-tight">
                <span className="block text-xl font-extrabold tracking-tight">{tier.name}</span>
                <span className="block text-xs font-semibold opacity-85">{tier.tagline}</span>
              </span>
            </span>
            {gold && <span className="rounded-full bg-white/25 px-2.5 py-1 text-[0.6875rem] font-extrabold uppercase tracking-wide ring-1 ring-white/40">Top tier</span>}
          </div>
          <p className="relative mt-5 flex items-center gap-2 text-2xl font-extrabold">
            <BadgeIndianRupee className="size-6 opacity-90" /> {tier.cashback}
          </p>
          <p className="relative text-xs font-semibold opacity-80">cashback on verified bills</p>
        </div>

        <ul className="mt-5 flex-1 space-y-3">
          {tier.perks.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm font-medium leading-snug text-heading">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white" style={{ background: metal }}>
                <Check className="size-3" strokeWidth={3.2} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

export function Pricing() {
  const perDay = (plan.price / 30).toFixed(1);
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="relative isolate overflow-hidden bg-gradient-to-b from-surface to-surface-alt py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 size-[26rem] rounded-full bg-[#f2c14e]/15 blur-3xl" aria-hidden="true" />
      {/* floating coins */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block" aria-hidden="true">
        {[["4%", "16%", 0], ["93%", "12%", 1.4], ["3%", "56%", 2.6], ["94%", "50%", 0.8]].map(([l, t, d], i) => (
          <span key={i} className="pr-coin absolute grid size-10 place-items-center rounded-full bg-gradient-to-br from-[#ffe08a] to-[#f2b01e] text-sm font-extrabold text-[#8a5a00] shadow-lg ring-2 ring-white/70" style={{ left: l as string, top: t as string, animationDelay: `${d}s` }}>₹</span>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <Sparkles className="size-3.5" /> Simple Pricing
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="pricing-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
              Start free. <span className="text-brand-orange">Stay for ₹{plan.price}.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-lg text-body">One simple plan for every driver. Your first month is on us, and you earn bigger rewards as you level up.</p>
          </Reveal>
        </div>

        {/* ===== main plan card ===== */}
        <Reveal delay={0.1} y={40}>
          <div className="relative mx-auto mt-14 max-w-5xl">
            <span className="pr-border pointer-events-none absolute -inset-[0.1875rem] rounded-[calc(2rem+3px)] p-[0.1875rem]" aria-hidden="true" />
            <div className="relative grid overflow-hidden rounded-[2rem] bg-card shadow-[0_40px_90px_-40px_rgb(255_90_0/0.45)] md:grid-cols-[1fr_1.15fr]">
              {/* price side */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#ff7a1f] via-brand-orange to-[#e84c00] p-8 text-white sm:p-10">
                <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgb(255_255_255/0.6)_1.2px,transparent_1.2px)] [background-size:20px_20px]" aria-hidden="true" />
                {/* ribbon */}
                <span className="absolute -right-12 top-7 rotate-45 bg-[#081e4c] px-14 py-1.5 text-xs font-extrabold uppercase tracking-widest shadow-lg">
                  1 month free
                </span>

                <p className="relative text-sm font-bold uppercase tracking-widest text-white/85">{plan.name}</p>

                {/* timeline: free month -> paid */}
                <div className="relative mt-6 flex items-center gap-3">
                  <span className="pr-gift grid size-12 place-items-center rounded-2xl bg-white text-brand-orange shadow-lg">
                    <Gift className="size-6" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-2xl font-extrabold">First month FREE</span>
                    <span className="block text-sm font-medium text-white/85">Unlocked when your KYC is verified</span>
                  </span>
                </div>
                <div className="relative ml-6 mt-2 h-8 w-0.5 overflow-hidden rounded-full bg-white/30">
                  <span className="pr-flow absolute inset-x-0 top-0 h-1/2 rounded-full bg-white" />
                </div>

                <p className="relative mt-2 flex items-end gap-1 leading-none">
                  <span className="text-3xl font-extrabold">₹</span>
                  <span className="text-7xl font-extrabold tabular-nums tracking-tight">
                    <CountUp to={plan.price} from={0} duration={1.6} />
                  </span>
                  <span className="mb-2 text-lg font-bold text-white/85">/{plan.period}</span>
                </p>
                <p className="relative mt-2 text-sm font-semibold text-white/90">
                  after your free month · that&apos;s about <span className="rounded-md bg-white/20 px-1.5 py-0.5">₹{perDay} a day</span>
                </p>

                <a href="#download" className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-brand-orange shadow-[0_14px_30px_-12px_rgb(0_0_0/0.45)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                  Start your free month <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              {/* includes side */}
              <div className="p-8 sm:p-10">
                <p className="text-lg font-extrabold text-heading">Everything included</p>
                <p className="mt-1 text-sm text-muted">Every driver gets these, from day one of the free month.</p>
                <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                  {plan.includes.map((f, i) => (
                    <li key={f} className="flex items-start gap-2.5 text-[0.95rem] font-semibold leading-snug text-heading" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-orange text-white">
                        <Check className="size-3" strokeWidth={3.2} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-line pt-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted">Get the app to start</p>
                  <StoreBadges size="sm" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ===== tiers ===== */}
        <div className="mx-auto mt-24 max-w-2xl text-center">
          <Reveal>
            <h3 className="text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
              Level up, <span className="text-brand-orange">earn more.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-3 text-body">Same plan, bigger rewards. Drive with Miles Assist and move from Bronze to Silver to Gold.</p>
          </Reveal>
        </div>

        <div className="relative mt-12">
          {/* progress line behind the tier cards */}
          <div className="pointer-events-none absolute inset-x-[16%] top-[4.2rem] hidden h-1 overflow-hidden rounded-full bg-line md:block" aria-hidden="true">
            <span className="pr-ladder absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#c98048] via-[#c9d1db] to-[#f2c14e]" />
          </div>
          <ul className="relative grid items-stretch gap-6 md:grid-cols-3">
            {tiers.map((t, i) => (
              <li key={t.id} className="h-full">
                <TierCard tier={t} index={i} />
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted">
          Prices in INR. Cashback is credited after bill verification. Tier names and benefits may change; see the app for current terms.
        </p>
      </div>
    </section>
  );
}
