import Link from "next/link";
import { ArrowRight, Building2, Check, ChevronRight, CircleHelp, LifeBuoy, Plus, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { PlayOnView } from "@/components/features/PlayOnView";
import { services, serviceFaqs } from "@/lib/services";
import { jsonLdString, site } from "@/lib/seo";
import { widgets } from "./ServiceWidgets";
import { ServicesHeroVisual } from "./ServicesHeroVisual";

const eyebrow = "inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15";

const servicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serviceFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
  ...services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${s.title} ${s.accent}`,
    description: s.text,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "IN",
    audience: { "@type": "Audience", audienceType: "Cab and intercity drivers" },
  })),
];

function ServicesHero() {
  return (
    <section aria-labelledby="sv-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pb-20 pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[30rem] rounded-full bg-[#e0457b]/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[34rem] rounded-full bg-[#2f6bff]/12 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
        <div>
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <Link href="/" className="hover:text-brand-orange">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-heading" aria-current="page">Services</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}><span className={`${eyebrow} mt-6`}><LifeBuoy className="size-3.5" /> Driver services</span></Reveal>
          <Reveal delay={0.12}>
            <h1 id="sv-title" className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
              Help for drivers <span className="text-brand-orange">on every road</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl text-lg text-body">
              Free food, free stay, roadside assistance, insurance support, legal help and 24/7 support. Everything a driver on duty needs, in the Miles Assist app.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-7 flex flex-wrap gap-2">
              {services.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-card/80 px-3.5 py-2 text-sm font-semibold text-heading shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:border-transparent hover:bg-[var(--c)] hover:text-white" style={{ ["--c" as string]: s.color }}>
                    <s.Icon className="size-4 transition-colors group-hover:text-white" style={{ color: s.color }} /> {s.title.replace(" for drivers", "")}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3} className="mt-8"><StoreBadges size="sm" /></Reveal>
        </div>
        <Reveal delay={0.15} y={40}><ServicesHeroVisual /></Reveal>
      </div>
    </section>
  );
}

function ServiceRows() {
  return (
    <div>
      {services.map((s, i) => {
        const W = widgets[s.id];
        const flip = i % 2 === 1;
        return (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-t`} className={`relative scroll-mt-24 overflow-hidden py-20 lg:py-24 ${flip ? "bg-surface-alt" : "bg-surface"}`}>
            <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
              <div className={flip ? "lg:order-2" : ""}>
                <Reveal>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wide" style={{ background: `color-mix(in srgb, ${s.color} 14%, transparent)`, color: s.color }}>
                    <s.Icon className="size-3.5" /> {s.tag}
                  </span>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 id={`${s.id}-t`} className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-heading sm:text-[2.75rem]">
                    {s.title} <span style={{ color: s.color }}>{s.accent}</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.14}><p className="mt-4 max-w-lg text-lg text-body">{s.text}</p></Reveal>
                <Reveal delay={0.18}>
                  <ul className="mt-6 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 font-semibold leading-snug text-heading">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white" style={{ background: s.color }}><Check className="size-3" strokeWidth={3.2} /></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.24}>
                  <div className="mt-7 rounded-2xl border border-line bg-card/70 p-4 shadow-card backdrop-blur">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-muted">How to use it</p>
                    <ol className="mt-3 grid gap-2 sm:grid-cols-3">
                      {s.how.map((h, k) => (
                        <li key={h} className="flex items-center gap-2 text-sm font-semibold text-heading">
                          <span className="grid size-6 shrink-0 place-items-center rounded-full text-xs font-extrabold text-white" style={{ background: s.color }}>{k + 1}</span>
                          {h}
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.1} y={50} className={flip ? "lg:order-1" : ""}>
                <PlayOnView><W /></PlayOnView>
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}

function OtherSides() {
  const cards = [
    { Icon: Building2, t: "For hotels & restaurants", text: "Driver footfall, digital bill and payout tracking, a dashboard with alerts and a verified partner badge.", cta: "Become a partner", href: "/partner", c: "#7c5cff" },
    { Icon: Users, t: "For customers", text: "Book intercity cabs, discover hotels and restaurants your driver trusts, and get a 10% instant discount at partners.", cta: "Contact us", href: "/contact", c: "#2f6bff" },
  ];
  return (
    <section aria-labelledby="os-title" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}>Beyond drivers</span></Reveal>
          <Reveal delay={0.08}><h2 id="os-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">Services for <span className="text-brand-orange">partners &amp; customers</span></h2></Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map(({ Icon, t, text, cta, href, c }, i) => (
            <Reveal key={t} delay={0.1 + i * 0.1} className="h-full">
              <Link href={href} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card/85 p-8 shadow-card backdrop-blur transition hover:-translate-y-1.5">
                <span className="pointer-events-none absolute -right-14 -top-14 size-48 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40" style={{ background: c }} aria-hidden="true" />
                <span className="relative grid size-14 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 55%, #fff))` }}><Icon className="size-7" /></span>
                <h3 className="relative mt-5 text-2xl font-extrabold text-heading">{t}</h3>
                <p className="relative mt-2 flex-1 leading-relaxed text-muted">{text}</p>
                <span className="relative mt-6 inline-flex items-center gap-1.5 font-extrabold" style={{ color: c }}>{cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceFaq() {
  return (
    <section aria-labelledby="sfaq-title" className="bg-surface-alt py-24">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <Reveal><span className={eyebrow}><CircleHelp className="size-3.5" /> Questions</span></Reveal>
          <Reveal delay={0.08}><h2 id="sfaq-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">Service <span className="text-brand-orange">FAQs</span></h2></Reveal>
        </div>
        <div className="mt-12 space-y-3">
          {serviceFaqs.map((f, i) => (
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

function ServicesCta() {
  return (
    <section className="bg-surface-alt pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div className="relative isolate overflow-hidden rounded-[2rem] soft-panel px-8 py-12 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0 -z-10 soft-panel-dots" aria-hidden="true" />
            <h2 className="text-3xl font-extrabold sm:text-4xl">Every service, one app, first month free</h2>
            <p className="mx-auto mt-3 max-w-xl text-body">Download Miles Assist, complete your KYC and get help on every road.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <StoreBadges />
              <Link href="/pricing" className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-orange/60 px-6 py-3 text-sm font-extrabold text-brand-orange transition hover:bg-brand-orange hover:text-white">
                See pricing <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(servicesJsonLd) }} />
      <ServicesHero />
      <ServiceRows />
      <OtherSides />
      <ServiceFaq />
      <ServicesCta />
    </main>
  );
}
