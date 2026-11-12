import { ArrowRight, TrendingUp } from "lucide-react";
import CountUp from "@/components/react-bits/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { WorldDots } from "@/components/svg/WorldDots";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { stats } from "@/lib/content";

export function WhyUs() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative isolate overflow-hidden bg-surface-alt py-24 sm:py-28">
      {/* dotted world map with pulsing Indian city pins */}
      <WorldDots className="pointer-events-none absolute [mask-image:linear-gradient(to_bottom,transparent,#000_22%,#000_80%,transparent)] inset-x-0 top-1/2 -z-10 mx-auto h-auto w-[130%] max-w-none -translate-y-[64%] sm:w-full" />
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 size-[24rem] rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[0.9fr_1.4fr] lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <TrendingUp className="size-3.5" /> Our Impact
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="why-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
              Why <span className="text-brand-orange">Miles Assist?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-sm text-lg text-body">A growing network built on free food, free stay and cashback for every driver on duty.</p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8">
            <Button href="#how-it-works" size="md">
              Learn More <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>

        <ul className="grid grid-cols-2 gap-5 xl:grid-cols-4 [&>li]:h-full">
          {stats.map(({ id, value, suffix, decimals, label, Icon, color }, i) => (
            <li key={id}>
              <Reveal delay={0.1 + i * 0.1} className="h-full">
                <GlassCard color={color} className="!p-6 text-center">
                  <span
                    className="mx-auto grid size-12 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:scale-110"
                    style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, #fff))`, boxShadow: `0 10px 20px -8px ${color}` }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <p className="mt-5 text-3xl font-extrabold tabular-nums tracking-tight text-heading">
                    <CountUp to={value} decimals={decimals} separator="," duration={2.2} />
                    <span style={{ color }}>{suffix}</span>
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-snug text-muted">{label}</p>
                </GlassCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
