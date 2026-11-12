"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { journey } from "@/lib/how";
import { PhoneShell } from "@/components/features/FeatureMocks";
import { screens } from "./JourneyScreens";
import { cn } from "@/lib/utils";

/**
 * Seven journey steps. Desktop: the steps scroll on the right while a phone stays pinned on the left and
 * switches to the screen for whichever step is in the middle of the viewport. Mobile: each step shows its own phone.
 */
export function StickyJourney() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = journey[active];
  const Screen = screens[step.screen];

  return (
    <div className="relative grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      {/* pinned phone (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="relative">
            {/* progress rail */}
            <div className="absolute -left-2 top-12 bottom-12 w-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <motion.span className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-brand-orange to-[#f2b01e]" animate={{ height: `${((active + 1) / journey.length) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
            </div>
            <PhoneShell title={`Step ${active + 1} of ${journey.length}`} tint={step.color}>
              <AnimatePresence mode="wait">
                <motion.div key={step.id} initial={{ opacity: 0, y: 18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -14, scale: 0.98 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="js-screen h-full">
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </PhoneShell>
          </div>
        </div>
      </div>

      {/* steps */}
      <ol className="relative space-y-6 lg:space-y-[32vh] lg:py-[18vh]">
        {journey.map((s, i) => {
          const on = i === active;
          const done = i < active;
          const M = screens[s.screen];
          return (
            <li key={s.id} ref={(el) => { refs.current[i] = el; }} data-i={i} id={`step-${s.id}`} className="scroll-mt-28">
              <div className={cn("relative rounded-3xl border p-6 shadow-card backdrop-blur-xl transition-all duration-500 sm:p-8", on ? "border-transparent bg-card" : "border-line bg-card/60 lg:opacity-55")} style={on ? { boxShadow: `0 30px 60px -30px ${s.color}`, outline: `2px solid ${s.color}`, outlineOffset: "-2px" } : undefined}>
                <div className="flex items-center gap-4">
                  <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500" style={{ background: `linear-gradient(135deg, ${s.color}, color-mix(in srgb, ${s.color} 55%, #fff))`, transform: on ? "scale(1.06) rotate(-4deg)" : undefined }}>
                    <s.Icon className="size-7" />
                    {done && <span className="absolute -right-1.5 -top-1.5 grid size-6 place-items-center rounded-full bg-emerald-500 ring-2 ring-card"><Check className="size-3.5" strokeWidth={3.5} /></span>}
                  </span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-widest" style={{ color: s.color }}>Step {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-xl font-extrabold leading-tight text-heading sm:text-2xl">{s.title}</h3>
                  </span>
                </div>
                <p className="mt-4 leading-relaxed text-body">{s.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold" style={{ background: `color-mix(in srgb, ${s.color} 12%, transparent)`, color: s.color }}>
                      <Check className="size-3.5" strokeWidth={3} /> {p}
                    </li>
                  ))}
                </ul>
                {/* mobile: own phone per step */}
                <div className="mt-8 lg:hidden">
                  <div className="mx-auto [zoom:0.9] sm:[zoom:1]">
                    <PhoneShell title={`Step ${i + 1} of ${journey.length}`} tint={s.color}>
                      <div className="js-screen h-full"><M /></div>
                    </PhoneShell>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
