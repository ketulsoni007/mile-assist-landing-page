"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { audiences } from "@/lib/how";
import { cn } from "@/lib/utils";

/** "How it works for…" tabs: drivers, hotels & restaurants, customers. Keyboard-friendly tablist. */
export function AudienceTabs() {
  const [tab, setTab] = useState(0);
  const a = audiences[tab];

  return (
    <div>
      <div role="tablist" aria-label="Choose who you are" className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-line bg-card/80 p-1.5 shadow-card backdrop-blur">
        {audiences.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            type="button"
            id={`aud-tab-${x.id}`}
            aria-selected={tab === i}
            aria-controls={`aud-panel-${x.id}`}
            onClick={() => setTab(i)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setTab((tab + 1) % audiences.length);
              if (e.key === "ArrowLeft") setTab((tab - 1 + audiences.length) % audiences.length);
            }}
            className={cn("relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-extrabold transition-colors sm:px-5", tab === i ? "text-white" : "text-heading hover:text-brand-orange")}
          >
            {tab === i && <motion.span layoutId="aud-pill" className="absolute inset-0 -z-0 rounded-full" style={{ background: x.color }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <x.Icon className="relative size-4" />
            <span className="relative">{x.label}</span>
          </button>
        ))}
      </div>

      <div className="relative mt-12 min-h-[18rem]">
        <AnimatePresence mode="wait">
          <motion.div
            key={a.id}
            id={`aud-panel-${a.id}`}
            role="tabpanel"
            aria-labelledby={`aud-tab-${a.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <ol className="relative grid gap-6 md:grid-cols-3">
              <span className="pointer-events-none absolute inset-x-[16%] top-10 hidden h-0.5 md:block" style={{ backgroundImage: `repeating-linear-gradient(90deg, ${a.color} 0 0.5rem, transparent 0.5rem 1rem)`, opacity: 0.5 }} aria-hidden="true" />
              {a.steps.map(({ Icon, title, text }, i) => (
                <motion.li key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.1 }} className="relative rounded-3xl border border-line bg-card/85 p-6 text-center shadow-card backdrop-blur">
                  <span className="relative mx-auto grid size-20 place-items-center rounded-full text-white shadow-lg ring-8 ring-surface" style={{ background: `linear-gradient(135deg, ${a.color}, color-mix(in srgb, ${a.color} 55%, #fff))` }}>
                    <Icon className="size-9" />
                    <span className="absolute -right-1 -top-1 grid size-7 place-items-center rounded-full bg-card text-xs font-extrabold shadow-card ring-1 ring-line" style={{ color: a.color }}>{i + 1}</span>
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-heading">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
                </motion.li>
              ))}
            </ol>
            <div className="mt-10 text-center">
              <Link href={a.cta.href} className="group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:-translate-y-0.5" style={{ background: a.color }}>
                {a.cta.label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
