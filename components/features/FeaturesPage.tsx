import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Gift, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { features, kycSteps, extras } from "@/lib/features";
import { mocks } from "./FeatureMocks";
import { PlayOnView } from "./PlayOnView";
import { FeaturesHeroVisual } from "./FeaturesHeroVisual";

const eyebrow = "inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15";

/* ───────── hero ───────── */
function FeaturesHero() {
  return (
    <section aria-labelledby="ft-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pb-20 pt-32 lg:pb-28 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[30rem] rounded-full bg-brand-orange/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[34rem] rounded-full bg-[#2f6bff]/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 [background-image:radial-gradient(var(--color-line)_1.2px,transparent_1.2px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.05fr_1fr] lg:px-8">
        <div>
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <Link href="/" className="hover:text-brand-orange">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-heading" aria-current="page">Features</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}>
            <span className={`${eyebrow} mt-6`}><Sparkles className="size-3.5" /> App Features</span>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 id="ft-title" className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
              Every feature a driver needs, <span className="text-brand-orange">in one app.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl text-lg text-body">
              Find free food and stay on your route, upload bills for cashback, track your duty journey and get help 24/7. Here is everything inside Miles Assist.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <ul className="mt-7 flex flex-wrap gap-2">
              {features.map((f) => (
                <li key={f.id}>
                  <a href={`#${f.id}`} className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-card/70 px-3.5 py-2 text-sm font-semibold text-heading shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:border-transparent hover:bg-[var(--c)] hover:text-white" style={{ ["--c" as string]: f.color }}>
                    <f.Icon className="size-4 transition-colors group-hover:text-white" style={{ color: f.color }} />
                    <span className="relative">{f.eyebrow}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <StoreBadges size="sm" />
          </Reveal>
        </div>

        {/* detailed app home screen with live feature cards */}
        <Reveal delay={0.15} y={40}>
          <FeaturesHeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── feature rows ───────── */
function FeatureRows() {
  return (
    <div className="relative">
      {features.map((f, i) => {
        const Mock = mocks[f.id];
        const flip = i % 2 === 1;
        return (
          <section key={f.id} id={f.id} aria-labelledby={`${f.id}-t`} className={`relative scroll-mt-24 overflow-hidden py-20 lg:py-24 ${flip ? "bg-surface-alt" : "bg-surface"}`}>
            <div className="pointer-events-none absolute top-1/2 -z-0 size-[28rem] -translate-y-1/2 rounded-full opacity-[0.12] blur-3xl" style={{ background: f.color, [flip ? "left" : "right"]: "-8rem" }} aria-hidden="true" />
            <div className={`relative mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8`}>
              <div className={flip ? "lg:order-2" : ""}>
                <Reveal>
                  <div className="flex items-center gap-3">
                    <span className="text-6xl font-extrabold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_var(--color-line)]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold" style={{ background: `color-mix(in srgb, ${f.color} 14%, transparent)`, color: f.color }}>
                      <f.Icon className="size-3.5" /> {f.eyebrow}
                    </span>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 id={`${f.id}-t`} className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-heading sm:text-[2.75rem]">
                    {f.title} <span style={{ color: f.color }}>{f.accent}</span>
                  </h2>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="mt-4 max-w-lg text-lg text-body">{f.text}</p>
                </Reveal>
                <div role="list" className="mt-7 grid gap-3 sm:grid-cols-2">
                  {f.points.map((p, k) => (
                    <Reveal key={p} delay={0.18 + k * 0.06}>
                      <div role="listitem" className="flex h-full items-start gap-2.5 rounded-2xl border border-line bg-card/70 p-3.5 text-[0.95rem] font-semibold leading-snug text-heading shadow-card backdrop-blur">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white" style={{ background: f.color }}><Check className="size-3" strokeWidth={3.2} /></span>
                        {p}
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Reveal delay={0.1} y={50} className={flip ? "lg:order-1" : ""}>
                <PlayOnView>
                  <Mock />
                </PlayOnView>
              </Reveal>
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ───────── KYC + free month ───────── */
function KycSection() {
  return (
    <section aria-labelledby="kyc-title" className="relative isolate overflow-hidden bg-gradient-to-b from-surface to-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}><Gift className="size-3.5" /> Getting started</span></Reveal>
          <Reveal delay={0.08}>
            <h2 id="kyc-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
              Verified in a few steps, <span className="text-brand-orange">first month free.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}><p className="mt-4 text-lg text-body">A quick KYC keeps the network safe. You can explore the app while it&apos;s verified, and every service unlocks the moment it is.</p></Reveal>
        </div>

        <PlayOnView className="relative mt-16">
          <div className="pointer-events-none absolute inset-x-[12%] top-9 hidden h-1 overflow-hidden rounded-full bg-line md:block" aria-hidden="true">
            <span className="fm-kycline absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-orange to-emerald-500" />
          </div>
          <div role="list" className="relative grid gap-8 md:grid-cols-4">
            {kycSteps.map(({ Icon, title, text }, i) => {
              const last = i === kycSteps.length - 1;
              return (
                <Reveal key={title} delay={0.1 + i * 0.12} className="text-center" role="listitem">
                  <div>
                    <span className={`fm-kycdot relative mx-auto grid size-[4.5rem] place-items-center rounded-2xl text-white shadow-lg ring-8 ring-surface ${last ? "bg-emerald-500" : "bg-gradient-to-br from-brand-orange to-[#ff8a3d]"}`} style={{ animationDelay: `${i * 0.5}s` }}>
                      <Icon className="size-8" />
                      <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-card text-xs font-extrabold text-heading shadow-card ring-1 ring-line">{i + 1}</span>
                    </span>
                    <h3 className="mt-5 text-lg font-extrabold text-heading">{title}</h3>
                    <p className="mx-auto mt-1.5 max-w-[15rem] text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </PlayOnView>

        {/* unlock card */}
        <Reveal delay={0.2} y={40}>
          <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#16a34a] via-[#0ea5a4] to-[#2f6bff] p-8 text-center text-white shadow-[0_30px_70px_-30px_rgb(14_165_164/0.7)] sm:p-10">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className="fm-confetti absolute size-2 rounded-sm" style={{ left: `${(i * 7.3) % 100}%`, top: "-10%", background: ["#ffd27a", "#fff", "#ff8a3d", "#a7f3d0"][i % 4], animationDelay: `${(i % 7) * 0.45}s`, animationDuration: `${3.2 + (i % 4) * 0.5}s` }} />
              ))}
            </div>
            <span className="fm-gift relative mx-auto grid size-16 place-items-center rounded-2xl bg-white/20 ring-1 ring-white/40"><Gift className="size-8" /></span>
            <p className="relative mt-4 text-sm font-bold uppercase tracking-widest text-white/85">KYC verified</p>
            <p className="relative mt-1 text-3xl font-extrabold sm:text-4xl">Welcome to the Miles Assist family!</p>
            <p className="relative mx-auto mt-2 max-w-lg text-white/90">You received 1 month free subscription. Enjoy your route with us.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ───────── extras bento ───────── */
function Extras() {
  return (
    <section aria-labelledby="ex-title" className="relative isolate overflow-hidden bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}><Sparkles className="size-3.5" /> And there&apos;s more</span></Reveal>
          <Reveal delay={0.08}><h2 id="ex-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">Little things that <span className="text-brand-orange">make a big difference</span></h2></Reveal>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {extras.map(({ Icon, title, text, color }, i) => (
            <li key={title} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : i >= 5 ? "lg:col-span-2" : ""}>
              <Reveal delay={0.05 + i * 0.06} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card/80 p-6 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1.5" style={{ boxShadow: undefined }}>
                  <span className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40" style={{ background: color }} aria-hidden="true" />
                  <span className="relative grid size-12 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, #fff))` }}>
                    <Icon className="size-6" />
                  </span>
                  <h3 className={`relative mt-5 font-extrabold text-heading ${i === 0 ? "text-2xl" : "text-lg"}`}>{title}</h3>
                  <p className="relative mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
                  {i === 0 && (
                    <div className="relative mt-8 flex items-end gap-1.5" aria-hidden="true">
                      {Array.from({ length: 22 }, (_, k) => (
                        <span key={k} className="fx-bar w-2 rounded-full bg-brand-orange/70" style={{ height: `${14 + ((k * 37) % 46)}px`, animationDelay: `${k * 0.08}s` }} />
                      ))}
                    </div>
                  )}
                  {i === 0 && <p className="relative mt-4 rounded-2xl bg-brand-orange-soft px-4 py-3 text-sm font-semibold text-brand-orange">“Good morning, Rahul! 3 partners are on your route today.”</p>}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── CTA ───────── */
function FeaturesCta() {
  return (
    <section className="bg-surface-alt pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div className="relative isolate overflow-hidden rounded-[2rem] soft-panel px-8 py-12 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0 -z-10 soft-panel-dots" aria-hidden="true" />
            <h2 className="text-3xl font-extrabold sm:text-4xl">Ready to drive smarter?</h2>
            <p className="mx-auto mt-3 max-w-xl text-body">Download Miles Assist, complete your KYC and enjoy your first month free.</p>
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

export function FeaturesPage() {
  return (
    <main>
      <FeaturesHero />
      <FeatureRows />
      <KycSection />
      <Extras />
      <FeaturesCta />
    </main>
  );
}
