import { Route } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { HowSteps } from "./HowSteps";

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative isolate overflow-clip bg-gradient-to-b from-surface-alt to-surface py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-brand-orange/[0.07] blur-3xl" aria-hidden="true" />

      {/* decorative orange strokes, as in the design */}
      <svg viewBox="0 0 60 60" className="pointer-events-none absolute left-[6%] top-1/2 hidden w-12 lg:block" aria-hidden="true">
        <g stroke="var(--color-brand-orange)" strokeWidth="4" strokeLinecap="round" className="hw-spark">
          <path d="M6 14L26 22M4 30L28 30M8 46L26 38" />
        </g>
      </svg>
      <svg viewBox="0 0 60 60" className="pointer-events-none absolute right-[6%] top-1/2 hidden w-12 -scale-x-100 lg:block" aria-hidden="true">
        <g stroke="var(--color-brand-orange)" strokeWidth="4" strokeLinecap="round" className="hw-spark" style={{ animationDelay: "-1.2s" }}>
          <path d="M6 14L26 22M4 30L28 30M8 46L26 38" />
        </g>
      </svg>

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <Route className="size-3.5" /> Simple Steps
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="how-title" className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
              How It{" "}
              <span className="relative inline-block text-brand-orange">
                Works
                <svg viewBox="0 0 120 14" className="hw-underline absolute -bottom-3 left-0 h-3 w-full" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 9C25 3 45 12 62 7S100 3 117 8" pathLength="1" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-lg text-body">Four easy steps from sign-up to cashback.</p>
          </Reveal>
        </div>

        <HowSteps />
      </div>
    </section>
  );
}
