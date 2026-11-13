import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Car, ChevronRight, Eye, Headset, Heart, Mail, MapPin, Phone, Scale, Sparkles, Target, Users, type LucideIcon } from "lucide-react";
import CountUp from "@/components/react-bits/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { stats } from "@/lib/content";
import { site } from "@/lib/seo";
import { IndiaRoutes } from "./IndiaRoutes";

const eyebrow = "inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15";

const values: { Icon: LucideIcon; t: string; d: string; c: string }[] = [
  { Icon: Heart, t: "Drivers first", d: "Every feature starts with one question: does this make a driver's day on the road easier?", c: "#ff5a00" },
  { Icon: BadgeCheck, t: "Verified & safe", d: "Every driver and partner is KYC verified, so the whole network can trust each other.", c: "#16a34a" },
  { Icon: Scale, t: "Fair & transparent", d: "Clear pricing, bills verified by our team and rewards credited straight to the driver's wallet.", c: "#2f6bff" },
  { Icon: Headset, t: "Always there", d: "Roadside help, legal support and a team that answers 24/7, wherever the duty goes.", c: "#7c5cff" },
];

const sides: { Icon: LucideIcon; t: string; d: string; href: string; cta: string; c: string }[] = [
  { Icon: Car, t: "For drivers", d: "Free food and stay on duty, cashback on every verified bill, roadside, insurance and legal support.", href: "/services", cta: "Driver services", c: "#ff5a00" },
  { Icon: Building2, t: "For hotels & restaurants", d: "Steady footfall from verified drivers, a free dashboard and automated driver payouts.", href: "/partner", cta: "Become a partner", c: "#7c5cff" },
  { Icon: Users, t: "For customers", d: "Intercity cabs with verified drivers and instant savings at places they trust.", href: "/contact", cta: "Contact us", c: "#2f6bff" },
];

function AboutHero() {
  return (
    <section aria-labelledby="ab-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pb-16 pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[30rem] rounded-full bg-brand-orange/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[34rem] rounded-full bg-[#2f6bff]/12 blur-3xl" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-8">
        <div>
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <Link href="/" className="hover:text-brand-orange">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-heading" aria-current="page">About</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}><span className={`${eyebrow} mt-6`}><Sparkles className="size-3.5" /> About Miles Assist</span></Reveal>
          <Reveal delay={0.12}>
            <h1 id="ab-title" className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
              Driver comfort. On-road support. <span className="text-brand-orange">Every mile.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-xl text-lg text-body">
              Miles Assist is built for the drivers who keep India moving. We connect them with partner restaurants and hotels on their routes, and back them with rewards and support on every trip.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/how-it-works" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-[#ff7a2e] px-6 py-3.5 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5">
              See how it works <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold text-heading ring-1 ring-line transition hover:ring-brand-orange/50">Talk to us</Link>
          </Reveal>
        </div>
        <Reveal delay={0.15} y={40}>
          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute inset-[10%] -z-10 rounded-full bg-brand-orange/15 blur-3xl" aria-hidden="true" />
            <IndiaRoutes />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section aria-labelledby="story-title" className="bg-surface py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <div>
          <Reveal><span className={eyebrow}>Our story</span></Reveal>
          <Reveal delay={0.08}><h2 id="story-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">Long roads deserve <span className="text-brand-orange">better support</span></h2></Reveal>
          <Reveal delay={0.14}>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-body">
              <p>Intercity drivers spend long hours on highways. Meals get skipped, rest is uncertain, and when something goes wrong on the road, help can feel far away.</p>
              <p>Miles Assist brings that support together in one app: free food and free stay at verified partners along the route, cashback on verified bills, and roadside, insurance and legal help when it matters most.</p>
              <p>For partner hotels and restaurants, it means steady footfall from drivers who recommend them. For travellers, it means a trusted stop on the way.</p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} y={40}>
          <figure className="relative overflow-hidden rounded-[2rem] soft-panel p-8 sm:p-10">
            <div className="pointer-events-none absolute inset-0 soft-panel-dots" aria-hidden="true" />
            <svg viewBox="0 0 100 80" className="relative w-14 text-brand-orange/50" aria-hidden="true"><path fill="currentColor" d="M0 80V48C0 22 12 6 36 0l4 10C26 16 20 26 20 40h18v40zm56 0V48c0-26 12-42 36-48l4 10C82 16 76 26 76 40h18v40z" /></svg>
            <blockquote className="relative mt-5 text-2xl font-extrabold leading-snug sm:text-3xl">Every mile a driver covers should come with comfort, respect and someone in their corner.</blockquote>
            <figcaption className="relative mt-6 flex items-center gap-3 text-sm font-semibold text-body">
              <span className="h-px w-8 bg-brand-orange/60" /> The Miles Assist promise
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function MissionVision() {
  const cards = [
    { Icon: Target, t: "Our mission", d: "To make every duty easier for drivers in India: free food and stay on their routes, fair rewards for every verified bill, and reliable support whenever they need it.", c: "#ff5a00" },
    { Icon: Eye, t: "Our vision", d: "To become the backbone of intercity road travel in India, bringing safety, comfort and value to every driver, partner hotel, restaurant and traveller on the platform.", c: "#2f6bff" },
  ];
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:px-8">
        {cards.map(({ Icon, t, d, c }, i) => (
          <Reveal key={t} delay={0.1 + i * 0.1} className="h-full">
            <div className="group relative h-full overflow-hidden rounded-[2rem] border border-line bg-card/85 p-8 shadow-card backdrop-blur transition hover:-translate-y-1.5 sm:p-10">
              <span className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-35" style={{ background: c }} aria-hidden="true" />
              <span className="relative grid size-16 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 55%, #fff))`, boxShadow: `0 16px 34px -14px ${c}` }}><Icon className="size-8" /></span>
              <h2 className="relative mt-6 text-3xl font-extrabold text-heading">{t}</h2>
              <p className="relative mt-3 text-lg leading-relaxed text-body">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Values() {
  return (
    <section aria-labelledby="val-title" className="bg-surface-alt pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}>What we stand for</span></Reveal>
          <Reveal delay={0.08}><h2 id="val-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">Our <span className="text-brand-orange">values</span></h2></Reveal>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ Icon, t, d, c }, i) => (
            <li key={t}>
              <Reveal delay={0.08 + i * 0.08} className="h-full">
                <div className="group h-full rounded-3xl border border-line bg-card/85 p-6 shadow-card backdrop-blur transition hover:-translate-y-1.5">
                  <span className="grid size-12 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110" style={{ background: c }}><Icon className="size-6" /></span>
                  <h3 className="mt-5 text-lg font-extrabold text-heading">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section aria-labelledby="num-title" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div data-theme="dark" className="relative isolate overflow-hidden rounded-[2rem] bg-[#081433] p-8 text-white sm:p-12">
            <div className="pointer-events-none absolute -left-16 -top-16 -z-10 size-72 rounded-full bg-brand-orange/25 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 -z-10 size-72 rounded-full bg-[#2f6bff]/25 blur-3xl" aria-hidden="true" />
            <h2 id="num-title" className="text-center text-3xl font-extrabold sm:text-4xl">Miles Assist <span className="text-brand-orange">in numbers</span></h2>
            <dl className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-2xl bg-white/[0.06] p-6 text-center ring-1 ring-white/10">
                <dt className="sr-only">Founded</dt>
                <dd className="text-4xl font-extrabold text-brand-orange sm:text-5xl">2026</dd>
                <dd className="mt-2 text-sm text-white/70">Founded</dd>
              </div>
              {stats.filter((s) => s.id !== "csat").map((s) => (
                <div key={s.id} className="rounded-2xl bg-white/[0.06] p-6 text-center ring-1 ring-white/10">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-4xl font-extrabold tabular-nums text-brand-orange sm:text-5xl"><CountUp to={s.value} separator="," duration={2.2} />{s.suffix}</dd>
                  <dd className="mt-2 text-sm text-white/70">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Sides() {
  return (
    <section aria-labelledby="sides-title" className="bg-surface pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><span className={eyebrow}>Who we serve</span></Reveal>
          <Reveal delay={0.08}><h2 id="sides-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">One platform, <span className="text-brand-orange">three sides of the road</span></h2></Reveal>
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {sides.map(({ Icon, t, d, href, cta, c }, i) => (
            <li key={t} className="h-full">
              <Reveal delay={0.08 + i * 0.1} className="h-full">
                <Link href={href} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card/85 p-7 shadow-card backdrop-blur transition hover:-translate-y-1.5">
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: c }} aria-hidden="true" />
                  <span className="grid size-14 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${c}, color-mix(in srgb, ${c} 55%, #fff))` }}><Icon className="size-7" /></span>
                  <h3 className="mt-5 text-xl font-extrabold text-heading">{t}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{d}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold" style={{ color: c }}>{cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Company() {
  const items = [
    { Icon: MapPin, l: "Office", v: `${site.address.street}, ${site.address.city}, ${site.address.region} - ${site.address.postalCode}`, href: site.address.mapUrl, ext: true },
    { Icon: Mail, l: "Email", v: site.email, href: `mailto:${site.email}`, ext: false },
    { Icon: Phone, l: "Phone & WhatsApp", v: site.phone, href: site.phoneHref, ext: false },
  ];
  return (
    <section className="bg-surface-alt py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div className="grid items-center gap-10 rounded-[2rem] border border-line bg-card/85 p-8 shadow-card backdrop-blur sm:p-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <span className={eyebrow}><Building2 className="size-3.5" /> The company</span>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">Proudly built in <span className="text-brand-orange">Ahmedabad</span></h2>
              <p className="mt-3 text-body">Miles Assist is headquartered in Naroda, Ahmedabad, and serves drivers and partners across India.</p>
              <div className="mt-6"><StoreBadges size="sm" /></div>
            </div>
            <ul className="grid gap-3">
              {items.map(({ Icon, l, v, href, ext }) => (
                <li key={l}>
                  <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 transition hover:-translate-y-0.5 hover:border-brand-orange/40">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"><Icon className="size-5" /></span>
                    <span className="min-w-0 leading-tight"><span className="block text-xs font-semibold uppercase tracking-wide text-muted">{l}</span><span className="mt-1 block font-bold text-heading">{v}</span></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutCta() {
  return (
    <section className="bg-surface-alt pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div className="relative isolate overflow-hidden rounded-[2rem] soft-panel px-8 py-12 text-center sm:px-12">
            <div className="pointer-events-none absolute inset-0 -z-10 soft-panel-dots" aria-hidden="true" />
            <h2 className="text-3xl font-extrabold sm:text-4xl">Join our growing community</h2>
            <p className="mx-auto mt-3 max-w-xl text-body">Drivers, hotels and restaurants across India are already on the road with Miles Assist.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <StoreBadges />
              <Link href="/partner" className="group inline-flex items-center gap-2 rounded-full border-2 border-brand-orange/60 px-6 py-3 text-sm font-extrabold text-brand-orange transition hover:bg-brand-orange hover:text-white">
                Become a partner <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Story />
      <MissionVision />
      <Values />
      <Numbers />
      <Sides />
      <Company />
      <AboutCta />
    </main>
  );
}
