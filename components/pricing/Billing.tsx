"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CountUp from "@/components/react-bits/CountUp";
import { billing, inr, type Cycle } from "@/lib/pricing";
import { cn } from "@/lib/utils";

/**
 * Monthly / yearly billing state shared by the pieces of a pricing card, so server components can place the
 * switch, the amount and the note wherever they like inside one <BillingProvider>.
 */
const Ctx = createContext<{ cycle: Cycle; setCycle: (c: Cycle) => void }>({ cycle: "monthly", setCycle: () => {} });

export function BillingProvider({ children, initial = "monthly" }: { children: React.ReactNode; initial?: Cycle }) {
  const [cycle, setCycle] = useState<Cycle>(initial);
  return <Ctx.Provider value={{ cycle, setCycle }}>{children}</Ctx.Provider>;
}

export const useBilling = () => useContext(Ctx);

/** Pill switch. tone="light" for use on orange/dark backgrounds. */
export function BillingSwitch({ tone = "default", size = "md", className }: { tone?: "default" | "light"; size?: "sm" | "md"; className?: string }) {
  const { cycle, setCycle } = useBilling();
  const light = tone === "light";
  return (
    <div role="radiogroup" aria-label="Billing period" className={cn("inline-flex items-center gap-1 rounded-full p-1", light ? "bg-white/15 ring-1 ring-white/30" : "border border-line bg-surface-alt", className)}>
      {(["monthly", "yearly"] as const).map((c) => {
        const on = cycle === c;
        return (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => setCycle(c)}
            className={cn(
              "relative flex items-center gap-1.5 rounded-full font-extrabold transition-colors",
              size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
              on ? (light ? "text-brand-orange" : "text-white") : light ? "text-white/85 hover:text-white" : "text-heading hover:text-brand-orange",
            )}
          >
            {on && <motion.span layoutId={`bill-pill-${tone}`} className={cn("absolute inset-0 rounded-full", light ? "bg-white" : "bg-brand-orange")} transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <span className="relative">{billing[c].label}</span>
            {c === "yearly" && (
              <span className={cn("relative rounded-full px-1.5 py-0.5 text-[0.62rem] font-extrabold uppercase", on ? (light ? "bg-brand-orange text-white" : "bg-white/25 text-white") : "bg-emerald-500 text-white")}>
                2 months free
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** The big number + unit, re-counting when the cycle changes. */
export function BillingAmount({ className, unitClassName }: { className?: string; unitClassName?: string }) {
  const { cycle } = useBilling();
  const b = billing[cycle];
  return (
    <span className="inline-flex items-end gap-1 leading-none">
      <span className={className}>
        ₹<CountUp key={cycle} to={b.price} from={cycle === "yearly" ? billing.monthly.price : 0} separator="," duration={1.2} />
      </span>
      <span className={unitClassName}>/{b.unit}</span>
    </span>
  );
}

/** Small explanatory line under the price. */
export function BillingNote({ className, prefix }: { className?: string; prefix?: string }) {
  const { cycle } = useBilling();
  return (
    <AnimatePresence mode="wait">
      <motion.span key={cycle} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }} className={cn("block", className)}>
        {prefix}
        {cycle === "monthly"
          ? `about ₹${inr(billing.monthly.perDay)} a day`
          : `12 months for the price of 10 · save ₹${inr(billing.yearlySaving)} (≈ ₹${inr(billing.yearly.perMonth)}/month)`}
      </motion.span>
    </AnimatePresence>
  );
}
