import Link from "next/link";
import { ArrowRight, Building2, ChevronRight, Handshake, Utensils } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PartnerDashboardVisual } from "./PartnerDashboardVisual";
import { partnerTypes, partnerStats, partnerSteps, partnerBenefits } from "@/lib/partner";
import { PartnerPicker } from "./PartnerPicker";

const eyebrow = "inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15";

function PartnerHero() {
  return (
    <section aria-labelledby="pt-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pb-16 pt-32 lg:pb-20 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[30rem] rounded-full bg-brand-orange/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[34rem] rounded-full bg-[#7c5cff]/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgb(255_90_0/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_90_0/0.05)_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:px-8">
        <div>
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <Link href="/" className="hover:text-brand-orange">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-heading" aria-current="page">Become a Partner</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}><span className={`${eyebrow} mt-6`}><Handshake className="size-3.5" /> Partner Program</span></Reveal>
          <Reveal delay={0.12}>
            <h1 id="pt-title" className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
              Grow your business with <span className="text-brand-orange">Miles Assist</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl text-lg text-body">
              Get discovered by verified intercity drivers and their passengers. 0% platform fee, bill upload and automated driver payouts. Choose your partnership type below.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
            {partnerTypes.map((p) => (
              <a key={p.id} href="#choose" className="group inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-5 py-3 text-sm font-extrabold text-heading shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:border-transparent hover:text-white hover:bg-[var(--c)]" style={{ ["--c" as string]: p.color }}>
                <p.Icon className="size-4 transition-colors group-hover:text-white" style={{ color: p.color }} /> I run a {p.short.toLowerCase()}
              </a>
            ))}
          </Reveal>

          {/* stats */}
          <Reveal delay={0.3}>
            <dl className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-card/70 py-4 shadow-card backdrop-blur">
              {partnerStats.map((s) => (
                <div key={s.label} className="px-3 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-extrabold text-brand-orange sm:text-3xl">{s.value}</dd>
                  <dd className="mt-0.5 text-xs font-semibold text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* the partner dashboard: footfall, bills, payouts, reviews */}
        <Reveal delay={0.15} y={40}>
          <PartnerDashboardVisual />
        </Reveal>
      </div>
    </section>
  );
}

function ChooseType() {
  return (
    <section id="choose" aria-labelledby="choose-title" className="relative isolate scroll-mt-24 overflow-hidden bg-surface py-24">
      <div className="pointer-events-none absolute left-1/2 top-40 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand-orange/[0.07] blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}><Building2 className="size-3.5" /> Step 1</span></Reveal>
          <Reveal delay={0.08}><h2 id="choose-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">How do you want <span className="text-brand-orange">to join?</span></h2></Reveal>
          <Reveal delay={0.14}><p className="mt-4 text-lg text-body">Hotel, restaurant or driver: pick one to begin.</p></Reveal>
        </div>
        <Reveal delay={0.1} y={40} className="mt-14">
          <PartnerPicker />
        </Reveal>
      </div>
    </section>
  );
}

function PartnerSteps() {
  return (
    <section aria-labelledby="pst-title" className="relative isolate overflow-hidden bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}>How it works</span></Reveal>
          <Reveal delay={0.08}><h2 id="pst-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">From registration to <span className="text-brand-orange">your first customer</span></h2></Reveal>
        </div>
        <ol className="relative mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <span className="pointer-events-none absolute inset-x-[12%] top-10 hidden h-0.5 bg-[repeating-linear-gradient(90deg,var(--color-brand-orange)_0_0.5rem,transparent_0.5rem_1rem)] opacity-50 lg:block" aria-hidden="true" />
          {partnerSteps.map(({ Icon, title, text }, i) => (
            <li key={title} className="relative">
              <Reveal delay={0.1 + i * 0.12} className="h-full">
                <div className="group relative h-full rounded-3xl border border-line bg-card/85 p-6 text-center shadow-card backdrop-blur transition hover:-translate-y-1.5">
                  <span className="relative mx-auto grid size-20 place-items-center rounded-full bg-gradient-to-br from-brand-orange to-[#ff8a3d] text-white shadow-glow ring-8 ring-surface-alt transition-transform duration-500 group-hover:scale-105">
                    <Icon className="size-9" />
                    <span className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-card text-sm font-extrabold text-brand-orange shadow-card ring-1 ring-line">{i + 1}</span>
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-heading">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function BenefitsBand() {
  return (
    <section className="bg-surface-alt pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div data-theme="dark" className="relative isolate grid items-center gap-10 overflow-hidden rounded-[2rem] bg-[#081433] p-8 text-white shadow-xl sm:p-12 lg:grid-cols-2">
            <div className="pointer-events-none absolute -right-16 -top-16 -z-10 size-72 rounded-full bg-brand-orange/25 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 left-10 -z-10 size-72 rounded-full bg-[#7c5cff]/20 blur-3xl" aria-hidden="true" />
            <div>
              <h2 className="text-3xl font-extrabold sm:text-4xl">For partners <span className="text-brand-orange">(hotels &amp; restaurants)</span></h2>
              <ul className="mt-7 space-y-4">
                {partnerBenefits.map(({ Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-white/85">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-orange ring-1 ring-white/15"><Icon className="size-4" /></span>
                    <span className="pt-1.5">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {partnerStats.map((s, i) => (
                <div key={s.label} className="pt-stat rounded-2xl bg-white/[0.07] p-6 text-center ring-1 ring-white/10 backdrop-blur" style={{ animationDelay: `${i * 0.8}s` }}>
                  <p className="text-3xl font-extrabold text-brand-orange xl:text-4xl">{s.value}</p>
                  <p className="mt-1 text-sm text-white/75">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PartnerCta() {
  return (
    <section className="relative isolate overflow-hidden soft-panel py-20 text-center">
      <div className="pointer-events-none absolute inset-0 -z-10 soft-panel-dots" aria-hidden="true" />
      <div className="mx-auto max-w-3xl px-5">
        <Reveal><h2 className="text-3xl font-extrabold sm:text-5xl">Ready to reach intercity travellers?</h2></Reveal>
        <Reveal delay={0.08}><p className="mx-auto mt-4 max-w-xl text-lg text-body">Join the growing network of hotels and restaurants trusted by Miles Assist drivers across India.</p></Reveal>
        <Reveal delay={0.16} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {partnerTypes.map((p) => {
            const I = p.id === "hotel" ? Building2 : Utensils;
            return (
              <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer" className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-orange px-8 py-4 font-extrabold text-white shadow-[0_14px_30px_-14px_rgb(255_90_0/0.6)] transition hover:-translate-y-0.5 sm:w-auto">
                <I className="size-5" /> Register as {p.short} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
            );
          })}
        </Reveal>
        <p className="mt-6 text-sm text-muted">
          Questions first? <Link href="/contact" className="font-bold text-brand-orange underline underline-offset-2">Talk to our team</Link>
        </p>
      </div>
    </section>
  );
}

export function PartnerPage() {
  return (
    <main>
      <PartnerHero />
      <ChooseType />
      <PartnerSteps />
      <BenefitsBand />
      <PartnerCta />
    </main>
  );
}
