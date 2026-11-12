import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/seo";
import { SupportChat } from "@/components/svg/SupportChat";
import { ContactForm } from "./ContactForm";

const info = [
  { Icon: Mail, label: "Email support", value: site.email, href: `mailto:${site.email}`, external: false },
  { Icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref, external: false },
  {
    Icon: MapPin,
    label: "Visit us",
    value: `${site.address.street}, ${site.address.city}, ${site.address.region} - ${site.address.postalCode}`,
    href: site.address.mapUrl,
    external: true,
  },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden bg-gradient-to-b from-surface to-surface-alt py-24 sm:py-28">
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 size-[34rem] rounded-full bg-brand-orange/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 bottom-0 -z-10 size-[28rem] rounded-full bg-[#2f6bff]/10 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)] lg:items-stretch lg:gap-14 lg:px-8">
        {/* left: pitch, animated support chat, contact info */}
        <div className="flex flex-col">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <MessageCircle className="size-3.5" /> Get in Touch
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="contact-title" className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-heading sm:text-5xl">
              Request a Demo <span className="block text-brand-orange">or Ask Us Anything</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-md text-lg text-body">
              Driver, hotel, restaurant or enterprise partner, tell us what you need and our team will get back to you shortly.
            </p>
          </Reveal>

          {/* animated live-support chat */}
          <Reveal delay={0.2} className="mt-10 hidden flex-1 items-end lg:flex">
            <SupportChat className="w-full" />
          </Reveal>

        </div>

        {/* right: form card */}
        <Reveal delay={0.12} y={40}>
          <div className="relative">
            <span className="pr-border pointer-events-none absolute -inset-[0.125rem] rounded-[calc(2rem+2px)] p-[0.125rem] opacity-70" aria-hidden="true" />
            <div className="relative rounded-[2rem] border border-white/70 bg-card/85 p-6 shadow-[0_40px_90px_-40px_rgb(8_30_76/0.35)] backdrop-blur-xl dark:border-white/10 sm:p-9">
              <h3 className="text-2xl font-extrabold text-heading">Send us a message</h3>
              <p className="mt-1 text-sm text-muted">All fields are required.</p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* contact details: one full-width row under both columns */}
      <div className="mx-auto mt-12 max-w-7xl px-5 lg:px-8">
            <Reveal delay={0.1}>
              <ul className="grid gap-4 md:grid-cols-[1fr_1fr_1.6fr]">
                {info.map(({ Icon, label, value, href, external }) => {
                  const inner = (
                    <>
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-orange-soft text-brand-orange transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0 leading-tight">
                        <span className="block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
                        <span className="mt-0.5 block break-words text-sm font-bold text-heading">{value}</span>
                      </span>
                    </>
                  );
                  const cls = "group flex h-full items-center gap-3 rounded-2xl border border-line bg-card/70 p-3.5 shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-orange/40";
                  return (
                    <li key={label} className="h-full">
                      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted">
                <ShieldCheck className="size-4 text-emerald-500" /> Your details are only used to respond to your inquiry.
              </p>
            </Reveal>
      </div>
    </section>
  );
}
