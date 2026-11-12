import Link from "next/link";
import { ArrowRight, ChevronRight, Route, Users } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { PhoneShell } from "@/components/features/FeatureMocks";
import { PhoneMap } from "@/components/svg/PhoneMap";
import { journey } from "@/lib/how";
import { StickyJourney } from "./StickyJourney";
import { AudienceTabs } from "./AudienceTabs";

const eyebrow = "inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15";

function HowHero() {
  return (
    <section aria-labelledby="hw-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pb-20 pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[30rem] rounded-full bg-brand-orange/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[34rem] rounded-full bg-[#0ea5a4]/12 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
        <div>
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <Link href="/" className="hover:text-brand-orange">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-heading" aria-current="page">How It Works</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}><span className={`${eyebrow} mt-6`}><Route className="size-3.5" /> How It Works</span></Reveal>
          <Reveal delay={0.12}>
            <h1 id="hw-title" className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
              Free food, free stay &amp; cashback <span className="text-brand-orange">in 7 simple steps</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl text-lg text-body">
              Here&apos;s exactly how Miles Assist works for drivers on duty, from downloading the app to scratching your cashback card.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ol className="mt-7 flex flex-wrap gap-2">
              {journey.map((s, i) => (
                <li key={s.id}>
                  <a href={`#step-${s.id}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-card/80 py-1.5 pl-1.5 pr-3.5 text-sm font-semibold text-heading shadow-card backdrop-blur transition hover:-translate-y-0.5">
                    <span className="grid size-6 place-items-center rounded-full text-xs font-extrabold text-white" style={{ background: s.color }}>{i + 1}</span>
                    {s.short}
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.3} className="mt-8"><StoreBadges size="sm" /></Reveal>
        </div>

        {/* today's route */}
        <Reveal delay={0.15} y={40} className="relative mx-auto">
          <div className="hw-hero-tilt">
            <PhoneShell title="Your route today" tint="#0ea5a4">
              <div className="relative h-full overflow-hidden rounded-2xl ring-1 ring-line">
                <PhoneMap className="absolute inset-0 size-full" />
                <div className="absolute inset-x-2 bottom-2 rounded-xl bg-card/95 p-2.5 shadow-card ring-1 ring-line backdrop-blur">
                  <p className="text-xs font-extrabold text-heading">2 partner stops ahead</p>
                  <p className="text-[0.68rem] text-muted">Free meal in 3 km · Free stay in 18 km</p>
                </div>
              </div>
            </PhoneShell>
          </div>
          <div className="hw-hero-chip absolute -left-6 top-24 hidden rounded-2xl border border-line bg-card/95 px-3 py-2.5 shadow-card backdrop-blur sm:block">
            <p className="text-xs font-extrabold text-heading">Step 4 · Check in</p>
            <p className="text-[0.68rem] text-muted">OTP or QR at the counter</p>
          </div>
          <div className="hw-hero-chip absolute -right-6 bottom-28 hidden rounded-2xl border border-line bg-card/95 px-3 py-2.5 shadow-card backdrop-blur sm:block" style={{ animationDelay: "-2s" }}>
            <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">Cashback credited</p>
            <p className="text-[0.68rem] text-muted">Bill verified</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function HowPage() {
  return (
    <main>
      <HowHero />

      <section aria-labelledby="journey-title" className="relative bg-surface py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><span className={eyebrow}><Route className="size-3.5" /> The driver journey</span></Reveal>
            <Reveal delay={0.08}><h2 id="journey-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">From sign-up to <span className="text-brand-orange">cashback</span></h2></Reveal>
            <Reveal delay={0.14}><p className="mt-4 text-lg text-body">Scroll through each step and watch it happen in the app.</p></Reveal>
          </div>
          <div className="mt-16">
            <StickyJourney />
          </div>
        </div>
      </section>

      <section aria-labelledby="aud-title" className="relative isolate overflow-hidden bg-surface-alt py-24">
        <div className="pointer-events-none absolute left-1/2 top-24 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-brand-orange/[0.07] blur-3xl" aria-hidden="true" />
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal><span className={eyebrow}><Users className="size-3.5" /> For everyone</span></Reveal>
            <Reveal delay={0.08}><h2 id="aud-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">How it works <span className="text-brand-orange">for you</span></h2></Reveal>
          </div>
          <Reveal delay={0.12} className="mt-12"><AudienceTabs /></Reveal>
        </div>
      </section>

      <section className="bg-surface-alt pb-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal y={40}>
            <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ff7a1f] via-brand-orange to-[#e84c00] px-8 py-12 text-center text-white sm:px-12">
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(rgb(255_255_255/0.5)_1.2px,transparent_1.2px)] [background-size:1.375rem_1.375rem]" aria-hidden="true" />
              <h2 className="text-3xl font-extrabold sm:text-4xl">Start your first free meal today</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/90">Download Miles Assist, finish your KYC and your first month is on us.</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <StoreBadges />
                <Link href="/pricing" className="group inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3.5 text-sm font-extrabold ring-1 ring-white/40 backdrop-blur transition hover:bg-white hover:text-brand-orange">
                  See pricing <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
