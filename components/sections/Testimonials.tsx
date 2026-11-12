import { MessageCircleHeart, Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { TestimonialSlider } from "./TestimonialSlider";

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="ts-title" className="relative isolate overflow-hidden bg-gradient-to-b from-surface to-surface-alt py-24 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[30rem] rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-24 bottom-0 -z-10 size-[26rem] rounded-full bg-[#2f6bff]/10 blur-3xl" aria-hidden="true" />
      {/* giant faint quote mark */}
      <svg viewBox="0 0 100 80" className="ts-quote pointer-events-none absolute left-[3%] top-16 -z-10 w-48 text-brand-orange/[0.07]" aria-hidden="true">
        <path fill="currentColor" d="M0 80V48C0 22 12 6 36 0l4 10C26 16 20 26 20 40h18v40zm56 0V48c0-26 12-42 36-48l4 10C82 16 76 26 76 40h18v40z" />
      </svg>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:items-center lg:px-8">
        <div className="text-center lg:text-left">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <MessageCircleHeart className="size-3.5" /> What People Say
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="ts-title" className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-heading sm:text-5xl">
              Real Stories.
              <span className="block text-brand-orange">Real Impact.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-4 max-w-sm text-lg text-body lg:mx-0">
              How Miles Assist is making a difference for drivers, partners and travellers on the road.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-card ring-1 ring-line">
              <span className="text-3xl font-extrabold text-heading">4.8</span>
              <span className="text-left leading-tight">
                <span className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-4 fill-amber-400 text-amber-400" />)}
                </span>
                <span className="text-xs font-semibold text-muted">Average rating (sample)</span>
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={40} className="min-w-0">
          <TestimonialSlider />
        </Reveal>
      </div>
    </section>
  );
}
