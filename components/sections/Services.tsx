import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { roles } from "@/lib/content";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-c to-surface-alt py-24 sm:py-28">
      {/* soft colour washes behind the cards */}
      <div className="pointer-events-none absolute -left-32 top-24 -z-10 size-[28rem] rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-40 -z-10 size-[26rem] rounded-full bg-[#2f6bff]/10 blur-3xl" aria-hidden="true" />

      {/* paper plane flying along a dashed route */}
      <svg viewBox="0 0 300 120" className="pointer-events-none absolute right-[4%] top-12 hidden w-60 sm:block" aria-hidden="true">
        <path d="M10 100C60 90 80 30 140 50S230 20 285 12" fill="none" stroke="var(--color-brand-orange)" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="5 7" className="svc-route" />
        <g className="svc-plane" fill="var(--color-brand-orange)">
          <path d="M0 0 L22 -9 L14 0 L22 9 Z" />
        </g>
      </svg>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <Sparkles className="size-3.5" /> Our Services
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="services-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
              One Platform. <span className="text-brand-orange">Multiple Roles.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 text-lg text-body">
              From free food and stay for drivers to new footfall for partners and instant savings for customers, Miles Assist keeps everyone connected on the road.
            </p>
          </Reveal>
        </div>

        {/* equal-height cards: every wrapper passes the height down to the card */}
        <ul className="mx-auto mt-14 grid max-w-6xl items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map(({ id, title, text, points, Icon, color, href }, i) => (
            <li key={id} className="h-full">
              <Reveal delay={0.1 + i * 0.1} className="h-full">
                <GlassCard color={color} className="!p-8">
                  <span
                    className="grid size-14 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, #fff))`, boxShadow: `0 12px 24px -8px ${color}` }}
                  >
                    <Icon className="size-7" />
                  </span>

                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-heading">{title}</h3>
                  <p className="mt-2 min-h-[3rem] text-[0.95rem] leading-relaxed text-muted">{text}</p>

                  <div className="my-6 h-px w-full bg-line" />

                  <ul className="flex-1 space-y-3.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[0.95rem] font-semibold leading-snug text-heading">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white" style={{ background: color }}>
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* footer: arrow always pinned bottom-right */}
                  <div className="mt-8 flex items-center justify-between border-t border-line pt-5">
                    <span className="text-sm font-bold" style={{ color }}>Learn more</span>
                    <a
                      href={href}
                      aria-label={`Learn more: ${title}`}
                      className="grid size-11 place-items-center rounded-full text-white shadow-md transition-transform duration-300 group-hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2"
                      style={{ background: color, outlineColor: color }}
                    >
                      <ArrowRight className="size-5" />
                    </a>
                  </div>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
