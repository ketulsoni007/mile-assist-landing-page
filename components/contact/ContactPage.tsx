import Link from "next/link";
import { ArrowRight, ChevronRight, Building2, ExternalLink, Headset, MapPin, MessageCircle, Navigation, Smartphone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/lib/seo";

const eyebrow = "inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15";
const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} - ${site.address.postalCode}`;

const routes = [
  {
    Icon: Smartphone,
    who: "I'm a driver",
    text: "Get help 24/7 inside the Miles Assist app, or send us a message below.",
    cta: "Get the app",
    href: "/#download",
    color: "#ff5a00",
  },
  {
    Icon: Building2,
    who: "I own a hotel or restaurant",
    text: "Register as a partner and start getting footfall from verified drivers.",
    cta: "Become a partner",
    href: "/partner",
    color: "#7c5cff",
  },
  {
    Icon: MessageCircle,
    who: "Enterprise, sales or anything else",
    text: "Request a demo or ask us anything. Our team will get back to you.",
    cta: "Send a message",
    href: "#contact",
    color: "#2f6bff",
  },
];

function ContactHero() {
  return (
    <section aria-labelledby="cp-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pb-16 pt-32 lg:pt-36">
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[30rem] rounded-full bg-brand-orange/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[34rem] rounded-full bg-[#2f6bff]/12 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted">
              <Link href="/" className="hover:text-brand-orange">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-heading" aria-current="page">Contact</span>
            </nav>
          </Reveal>
          <Reveal delay={0.06}><span className={`${eyebrow} mt-6`}><Headset className="size-3.5" /> We&apos;re here to help</span></Reveal>
          <Reveal delay={0.12}>
            <h1 id="cp-title" className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
              How can we <span className="text-brand-orange">help you?</span>
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mx-auto mt-5 max-w-xl text-lg text-body">Choose who you are and we&apos;ll point you to the fastest way to get an answer.</p>
          </Reveal>
        </div>

        <ul className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">
          {routes.map(({ Icon, who, text, cta, href, color }, i) => (
            <li key={who} className="h-full">
              <Reveal delay={0.15 + i * 0.1} className="h-full">
                <Link href={href} className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card/85 p-7 shadow-card backdrop-blur-xl transition duration-300 hover:-translate-y-1.5">
                  <span className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-35" style={{ background: color }} aria-hidden="true" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: color }} aria-hidden="true" />
                  <span className="relative grid size-14 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 55%, #fff))`, boxShadow: `0 14px 30px -12px ${color}` }}>
                    <Icon className="size-7" />
                  </span>
                  <h2 className="relative mt-5 text-xl font-extrabold text-heading">{who}</h2>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold" style={{ color }}>
                    {cta} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FindUs() {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(`Pearl Plaza, Naroda, Ahmedabad, Gujarat ${site.address.postalCode}`)}&output=embed`;
  return (
    <section aria-labelledby="find-title" className="relative isolate overflow-hidden bg-surface-alt pb-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-card shadow-[0_40px_90px_-40px_rgb(8_30_76/0.35)]">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
              <div className="relative p-8 sm:p-10">
                <span className={eyebrow}><MapPin className="size-3.5" /> Our office</span>
                <h2 id="find-title" className="mt-5 text-3xl font-extrabold tracking-tight text-heading sm:text-4xl">
                  Find us in <span className="text-brand-orange">Ahmedabad</span>
                </h2>
                <address className="mt-6 not-italic">
                  <p className="flex items-start gap-3 text-body">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange"><MapPin className="size-5" /></span>
                    <span className="pt-1 font-semibold leading-relaxed text-heading">{fullAddress}</span>
                  </p>
                </address>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-[#ff7a2e] px-5 py-3 text-sm font-extrabold text-white shadow-glow transition hover:-translate-y-0.5">
                    <Navigation className="size-4" /> Get directions
                  </a>
                  <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold text-heading ring-1 ring-line transition hover:ring-brand-orange/50">
                    Call {site.phone}
                  </a>
                </div>
              </div>
              <div className="relative min-h-[20rem] lg:min-h-[26rem]">
                <iframe
                  title="Miles Assist office on Google Maps"
                  src={embed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0 dark:invert-[0.9] dark:hue-rotate-180"
                />
                <a href={site.address.mapUrl} target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3.5 py-2 text-xs font-bold text-heading shadow-card ring-1 ring-line backdrop-blur">
                  Open in Google Maps <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ContactPage() {
  return (
    <main>
      <ContactHero />
      <Contact />
      <FindUs />
    </main>
  );
}
