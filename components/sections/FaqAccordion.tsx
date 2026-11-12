"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/faq";
import { cn } from "@/lib/utils";

/** Accordion: one item open at a time, smooth height animation, keyboard + screen-reader friendly. */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className="space-y-4">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const btn = `${base}-b${i}`;
        const panel = `${base}-p${i}`;
        return (
          <motion.li
            key={f.q}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "group relative overflow-hidden rounded-2xl border bg-card/80 shadow-card backdrop-blur-md transition-colors duration-300",
              isOpen ? "border-brand-orange/60" : "border-line hover:border-brand-orange/40",
            )}
          >
            {/* orange accent bar on the open item */}
            <span className={cn("absolute inset-y-0 left-0 w-1 bg-brand-orange transition-transform duration-300 origin-top", isOpen ? "scale-y-100" : "scale-y-0")} aria-hidden="true" />
            <h3>
              <button
                id={btn}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panel}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-orange sm:px-7"
              >
                <span className="flex items-center gap-4">
                  <span className={cn("hidden size-8 shrink-0 place-items-center rounded-full text-xs font-extrabold transition-colors sm:grid", isOpen ? "bg-brand-orange text-white" : "bg-brand-orange-soft text-brand-orange")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-bold text-heading sm:text-lg">{f.q}</span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn("grid size-9 shrink-0 place-items-center rounded-full transition-colors", isOpen ? "bg-brand-orange text-white" : "bg-brand-orange-soft text-brand-orange group-hover:bg-brand-orange/20")}
                >
                  <Plus className="size-5" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panel}
                  role="region"
                  aria-labelledby={btn}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-6 pb-6 leading-relaxed text-body sm:pl-[4.75rem] sm:pr-16">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}
