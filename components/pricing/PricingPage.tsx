import Link from "next/link";
import { ArrowRight, BadgeIndianRupee, Building2, Check, ChevronRight, CircleHelp, Crown, Gavel, Gift, Headset, Hotel, Layers, Medal, Minus, Plus, Receipt, ShieldCheck, Sparkles, UserCheck, Utensils, Wrench, type LucideIcon } from "lucide-react";
import { BillingAmount, BillingNote, BillingProvider, BillingSwitch } from "@/components/pricing/Billing";
import { Reveal } from "@/components/motion/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { PlayOnView } from "@/components/features/PlayOnView";
import { billing, inr, plan, tiers, tierRows, pricingFaqs } from "@/lib/pricing";
import { jsonLdString, site } from "@/lib/seo";
import { cn } from "@/lib/utils";

const eyebrow = "inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15";
const perDay = inr(billing.monthly.perDay);
const yearly = inr(billing.yearly.price);

const pricingJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plan.name,
    brand: { "@type": "Brand", name: site.name },
    description: "Free food and free stay at partner restaurants and hotels, cashback on verified bills, roadside assistance, insurance support, a free first lawyer call and 24/7 support for drivers. First month free after KYC.",
    offers: [
      { "@type": "Offer", name: "Monthly", price: String(plan.price), priceCurrency: "INR", url: `${site.url}/pricing`, availability: "https://schema.org/InStock", priceSpecification: { "@type": "UnitPriceSpecification", price: plan.price, priceCurrency: "INR", unitCode: "MON", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" } } },
      { "@type": "Offer", name: "Yearly", price: String(plan.yearlyPrice), priceCurrency: "INR", url: `${site.url}/pricing`, availability: "https://schema.org/InStock", priceSpecification: { "@type": "UnitPriceSpecification", price: plan.yearlyPrice, priceCurrency: "INR", unitCode: "ANN", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "ANN" } } },
    ],
  },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: pricingFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
];

const includeIcons: LucideIcon[] = [Utensils, Hotel, BadgeIndianRupee, Wrench, ShieldCheck, Gavel, Headset];
const tierIcon = { bronze: Medal, silver: Medal, gold: Crown } as const;

/* ───────── hero receipt ───────── */
function PlanReceipt() {
  const lines = [
    { t: "Free food at partners", v: "Included" },
    { t: "Free stay at partners", v: "Included" },
    { t: "Cashback on bills", v: "Included" },
    { t: "Roadside assistance", v: "Included" },
    { t: "Insurance & legal support", v: "Included" },
    { t: "24/7 support", v: "Included" },
  ];
  return (
    <PlayOnView className="relative mx-auto w-full max-w-[25rem]">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-orange/25 via-[#f2c14e]/15 to-[#2f6bff]/15 blur-3xl" aria-hidden="true" />
      <div className="pp-print relative rounded-t-[1.5rem] bg-card px-6 pb-8 pt-6 shadow-[0_40px_80px_-30px_rgb(8_30_76/0.5)] ring-1 ring-line [mask-image:linear-gradient(#000_calc(100%-0.75rem),transparent_calc(100%-0.75rem)),radial-gradient(circle_at_0.6rem_100%,transparent_0.55rem,#000_0.6rem)] [mask-composite:add] [mask-size:100%_100%,1.2rem_100%] [mask-repeat:no-repeat,repeat-x] [mask-position:0_0,0_0]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-extrabold text-heading"><Receipt className="size-4 text-brand-orange" /> Your plan</span>
          <span className="text-[0.65rem] font-semibold text-muted">#MA-DRIVER</span>
        </div>
        <div className="my-4 border-t-2 border-dashed border-line" />
        <ul className="space-y-2.5">
          {lines.map((l, i) => (
            <li key={l.t} className="pp-line flex items-center justify-between text-sm" style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
              <span className="flex items-center gap-2 text-heading"><Check className="size-4 text-emerald-500" strokeWidth={3} /> {l.t}</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{l.v}</span>
            </li>
          ))}
        </ul>
        <div className="my-4 border-t-2 border-dashed border-line" />
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-muted">First month</span>
          <span className="pp-stamp rounded-md border-2 border-emerald-500 px-2 py-0.5 text-xs font-extrabold uppercase tracking-wider text-emerald-500">Free</span>
        </div>
        <BillingProvider>
          <div className="mt-4 flex justify-center"><BillingSwitch /></div>
          <div className="mt-4 flex items-end justify-between gap-3">
            <span className="text-sm font-semibold text-muted">Then</span>
            <BillingAmount className="text-4xl font-extrabold tabular-nums text-heading" unitClassName="mb-1 text-sm font-bold text-muted" />
          </div>
          <p className="mt-1 min-h-[2rem] text-right text-xs font-semibold text-brand-orange"><BillingNote /></p>
        </BillingProvider>
      </div>
      <span className="pp-tag absolute -right-4 -top-4 rotate-12 rounded-2xl bg-gradient-to-br from-brand-orange to-[#ff8a3d] px-3.5 py-2 text-sm font-extrabold text-white shadow-glow">1 month free</span>
    </PlayOnView>
  );
}

function PricingHero() {
  return (
    <section aria-labelledby="pp-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pb-20 pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[30rem] rounded-full bg-brand-orange/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[34rem] rounded-full bg-[#f2c14e]/15 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
        <div>
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <Link href="/" className="hover:text-brand-orange">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-heading" aria-current="page">Pricing</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}><span className={`${eyebrow} mt-6`}><Sparkles className="size-3.5" /> Simple pricing</span></Reveal>
          <Reveal delay={0.12}>
            <h1 id="pp-title" className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
              One plan. First month free. <span className="text-brand-orange">Then ₹{plan.price}/month.</span> <span className="block text-[0.55em] leading-tight text-heading">Or ₹{yearly}/year, 2 months free.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl text-lg text-body">
              Free food, free stay, cashback on every verified bill, roadside assistance and 24/7 support, for about ₹{perDay} a day. Pay monthly, or pay ₹{yearly} for the whole year and save ₹{billing.yearlySaving}. Same plan either way: you level up as you drive.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 grid max-w-lg grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-card/70 py-4 text-center shadow-card backdrop-blur">
              {[{ v: "₹0", l: "First month" }, { v: `₹${plan.price}`, l: "Per month" }, { v: `₹${yearly}`, l: "Per year · 2 months free" }].map((s) => (
                <div key={s.l} className="px-2"><p className="text-2xl font-extrabold text-brand-orange sm:text-3xl">{s.v}</p><p className="mt-0.5 text-xs font-semibold text-muted">{s.l}</p></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3} className="mt-8"><StoreBadges size="sm" /></Reveal>
        </div>
        <Reveal delay={0.15} y={40}><PlanReceipt /></Reveal>
      </div>
    </section>
  );
}

/* ───────── billing timeline ───────── */
function Timeline() {
  const steps = [
    { Icon: UserCheck, t: "Sign up & KYC", s: "Day 0", c: "#2f6bff" },
    { Icon: Gift, t: "Free month starts", s: "KYC verified", c: "#16a34a" },
    { Icon: Sparkles, t: "Use every service", s: "30 days free", c: "#7c5cff" },
    { Icon: BadgeIndianRupee, t: `₹${plan.price}/month or ₹${yearly}/year`, s: "After the free month", c: "#ff5a00" },
  ];
  return (
    <section aria-labelledby="tl-title" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}>How billing works</span></Reveal>
          <Reveal delay={0.08}><h2 id="tl-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">From sign-up to <span className="text-brand-orange">your first payment</span></h2></Reveal>
        </div>
        <PlayOnView className="relative mt-16">
          <div className="pointer-events-none absolute inset-x-[12%] top-10 hidden h-1 overflow-hidden rounded-full bg-line md:block" aria-hidden="true">
            <span className="pp-fill absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#2f6bff] via-[#16a34a] to-brand-orange" />
          </div>
          <ol className="relative grid gap-8 md:grid-cols-4">
            {steps.map(({ Icon, t, s, c }, i) => (
              <li key={t} className="text-center">
                <span className="pp-dot relative mx-auto grid size-20 place-items-center rounded-full text-white shadow-lg ring-8 ring-surface" style={{ background: `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 55%, #fff))`, animationDelay: `${0.2 + i * 0.5}s` }}>
                  <Icon className="size-9" />
                </span>
                <p className="mt-5 text-lg font-extrabold text-heading">{t}</p>
                <p className="mt-1 text-sm font-semibold" style={{ color: c }}>{s}</p>
              </li>
            ))}
          </ol>
        </PlayOnView>
      </div>
    </section>
  );
}

/* ───────── everything included ───────── */
function Included() {
  return (
    <section aria-labelledby="inc-title" className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}><Check className="size-3.5" /> Included</span></Reveal>
          <Reveal delay={0.08}><h2 id="inc-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">Everything in <span className="text-brand-orange">your plan</span></h2></Reveal>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plan.includes.map((f, i) => {
            const Icon = includeIcons[i] ?? Check;
            return (
              <li key={f} className={i === 0 ? "sm:col-span-2" : ""}>
                <Reveal delay={0.05 + i * 0.06} className="h-full">
                  <div className="group flex h-full items-center gap-4 rounded-3xl border border-line bg-card/85 p-5 shadow-card backdrop-blur transition hover:-translate-y-1">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-orange to-[#ff8a3d] text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><Icon className="size-6" /></span>
                    <span className="font-bold leading-snug text-heading">{f}</span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ───────── tier comparison ───────── */
function Cell({ v }: { v: boolean | string }) {
  if (v === true) return <span className="mx-auto grid size-6 place-items-center rounded-full bg-emerald-500 text-white"><Check className="size-3.5" strokeWidth={3.5} /></span>;
  if (v === false) return <Minus className="mx-auto size-4 text-muted/60" aria-label="Not included" />;
  return <span className="text-sm font-extrabold text-heading">{v}</span>;
}

function Compare() {
  return (
    <section aria-labelledby="cmp-title" className="relative isolate overflow-hidden bg-surface py-24">
      <div className="pointer-events-none absolute left-1/2 top-32 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-[#f2c14e]/10 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}><Layers className="size-3.5" /> Tiers</span></Reveal>
          <Reveal delay={0.08}><h2 id="cmp-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">Same price, <span className="text-brand-orange">bigger rewards</span></h2></Reveal>
          <Reveal delay={0.14}><p className="mt-4 text-lg text-body">Every driver starts at Bronze and moves up to Silver and Gold by driving with Miles Assist. Here&apos;s what each tier unlocks.</p></Reveal>
        </div>

        <Reveal delay={0.1} y={40}>
          <p className="mt-10 text-center text-xs font-semibold text-muted md:hidden">← Swipe to compare tiers →</p>
          <div className="mt-3 overflow-x-auto rounded-[1.75rem] md:mt-12 border border-line bg-card/85 shadow-[0_30px_70px_-35px_rgb(8_30_76/0.4)] backdrop-blur">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Comparison of Bronze, Silver and Gold tier benefits</caption>
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 w-[40%] bg-card p-5 text-sm font-bold text-muted md:static md:bg-transparent">Benefit</th>
                  {tiers.map((t) => {
                    const Icon = tierIcon[t.id];
                    return (
                      <th key={t.id} scope="col" className="p-3 text-center">
                        <div className={cn("relative overflow-hidden rounded-2xl px-3 py-4 text-white", t.id === "gold" && "shadow-[0_14px_30px_-12px_rgb(242_193_78/0.7)]")} style={{ background: `linear-gradient(135deg, ${t.colors.from}, ${t.colors.via} 50%, ${t.colors.to})` }}>
                          <span className="pr-sheen pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent" aria-hidden="true" />
                          <Icon className="relative mx-auto size-6" />
                          <span className="relative mt-1 block text-lg font-extrabold">{t.name}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {tierRows.map((r, i) => (
                  <tr key={r.label} className={cn("border-t border-line", i % 2 === 1 && "bg-surface-alt/50")}>
                    <th scope="row" className="sticky left-0 z-10 max-w-[11rem] bg-card p-4 pl-5 text-sm font-semibold text-heading shadow-[6px_0_10px_-8px_rgb(8_30_76/0.3)] md:static md:max-w-none md:bg-transparent md:shadow-none">{r.label}</th>
                    {r.values.map((v, k) => (
                      <td key={k} className={cn("p-4 text-center", k === 2 && "bg-[#f2c14e]/[0.06]")}><Cell v={v} /></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 text-center text-xs text-muted">Tier names, cashback limits and insurance benefits are being finalised and may change. See the app for current terms.</p>
      </div>
    </section>
  );
}

/* ───────── partners pricing ───────── */
function PartnerPricing() {
  return (
    <section className="bg-surface-alt pt-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div data-theme="dark" className="relative isolate grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[#081433] p-8 text-white sm:p-12 lg:grid-cols-[1.2fr_1fr]">
            <div className="pointer-events-none absolute -right-16 -top-16 -z-10 size-72 rounded-full bg-[#7c5cff]/25 blur-3xl" aria-hidden="true" />
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/85 ring-1 ring-white/15"><Building2 className="size-3.5" /> For hotels &amp; restaurants</span>
              <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">Partners pay <span className="text-brand-orange">0% platform fee</span></h2>
              <p className="mt-3 max-w-lg text-white/75">Free listing, a free partner dashboard and automated driver payouts. Get footfall from verified drivers without a platform fee.</p>
              <Link href="/partner" className="group mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-brand-orange transition hover:-translate-y-0.5">Become a partner <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[{ v: "0%", l: "Platform fee" }, { v: "Free", l: "Listing & dashboard" }, { v: "Instant", l: "Payouts" }].map((s, i) => (
                <div key={s.l} className="pt-stat rounded-2xl bg-white/[0.07] p-5 text-center ring-1 ring-white/10" style={{ animationDelay: `${i * 0.8}s` }}>
                  <p className="text-2xl font-extrabold text-brand-orange sm:text-3xl">{s.v}</p>
                  <p className="mt-1 text-xs text-white/75">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── FAQ + CTA ───────── */
function PricingFaq() {
  return (
    <section aria-labelledby="pfaq-title" className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <Reveal><span className={eyebrow}><CircleHelp className="size-3.5" /> Questions</span></Reveal>
          <Reveal delay={0.08}><h2 id="pfaq-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">Pricing <span className="text-brand-orange">FAQs</span></h2></Reveal>
        </div>
        <div className="mt-12 space-y-3">
          {pricingFaqs.map((f, i) => (
            <Reveal key={f.q} delay={0.05 + i * 0.05}>
              <details className="group rounded-2xl border border-line bg-card/85 shadow-card backdrop-blur open:border-brand-orange/50" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left font-bold text-heading [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-orange-soft text-brand-orange transition-transform duration-300 group-open:rotate-45 group-open:bg-brand-orange group-open:text-white"><Plus className="size-4" strokeWidth={2.75} /></span>
                </summary>
                <p className="px-6 pb-6 leading-relaxed text-body">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCta() {
  return (
    <section className="bg-surface-alt pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ff7a1f] via-brand-orange to-[#e84c00] px-8 py-12 text-center text-white sm:px-12">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(rgb(255_255_255/0.5)_1.2px,transparent_1.2px)] [background-size:1.375rem_1.375rem]" aria-hidden="true" />
            <h2 className="text-3xl font-extrabold sm:text-4xl">Start your free month today</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">Download Miles Assist, complete your KYC, and pay nothing for your first month.</p>
            <div className="mt-8 flex justify-center"><StoreBadges /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PricingPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(pricingJsonLd) }} />
      <PricingHero />
      <Timeline />
      <Included />
      <Compare />
      <PartnerPricing />
      <PricingFaq />
      <PricingCta />
    </main>
  );
}
