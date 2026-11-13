"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight, Car, Check, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { joinOptions, type JoinOption } from "@/lib/partner";
import { cn } from "@/lib/utils";

/**
 * Who is joining: hotel, restaurant or driver. Each card is a radio option. Hotels and restaurants go to the real
 * registration page (each card also has its own direct link). Drivers have no web registration, so picking
 * "Driver Partner" opens a contact form below with the inquiry type already set to "Driver App".
 */
export function PartnerPicker() {
  const [picked, setPicked] = useState<JoinOption["id"] | null>(null);
  const current = joinOptions.find((p) => p.id === picked);
  const formRef = useRef<HTMLDivElement>(null);
  const [jump, setJump] = useState(0);

  /* after the driver form has appeared, bring it into view */
  useEffect(() => {
    if (!jump) return;
    const t = setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => clearTimeout(t);
  }, [jump]);
  const openDriverForm = () => {
    setPicked("driver");
    setJump((n) => n + 1);
  };

  return (
    <div>
      <div role="radiogroup" aria-label="How you want to join" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {joinOptions.map((p) => {
          const active = picked === p.id;
          return (
            <motion.div
              key={p.id}
              role="radio"
              aria-checked={active}
              tabIndex={0}
              onClick={() => setPicked(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setPicked(p.id);
                }
              }}
              animate={{ y: active ? -6 : 0, scale: picked && !active ? 0.98 : 1, opacity: picked && !active ? 0.75 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className={cn(
                "group relative flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border-2 bg-card/85 p-7 shadow-card backdrop-blur-xl outline-none transition-colors focus-visible:ring-4 focus-visible:ring-brand-orange/30 sm:p-8",
                p.id === "driver" && "md:col-span-2 lg:col-span-1",
                active ? "border-transparent" : "border-line hover:border-[var(--c)]/50",
              )}
              style={{ ["--c" as string]: p.color, boxShadow: active ? `0 30px 70px -30px ${p.color}` : undefined }}
            >
              {active && <span className="pr-border pointer-events-none absolute inset-0 rounded-[2rem] p-[2px]" aria-hidden="true" />}
              <span className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40" style={{ background: p.color }} aria-hidden="true" />

              <div className="relative flex items-start justify-between">
                <span
                  className="grid size-20 place-items-center rounded-3xl text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${p.color}, color-mix(in srgb, ${p.color} 55%, #fff))`, boxShadow: `0 16px 34px -14px ${p.color}` }}
                >
                  <p.Icon className="size-10" />
                </span>
                {/* radio indicator */}
                <span className={cn("grid size-8 place-items-center rounded-full border-2 transition-colors", active ? "border-transparent text-white" : "border-line")} style={active ? { background: p.color } : undefined} aria-hidden="true">
                  <AnimatePresence>
                    {active && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="size-4" strokeWidth={3.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </div>

              <h3 className="relative mt-6 text-2xl font-extrabold text-heading xl:text-3xl">{p.title}</h3>
              <p className="relative mt-2 leading-relaxed text-muted">{p.text}</p>

              <ul className="relative mt-6 flex-1 space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 text-[0.95rem] font-semibold text-heading">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                      <Check className="size-3" strokeWidth={3.2} />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>

              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="relative mt-8 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ background: `linear-gradient(90deg, ${p.color}, color-mix(in srgb, ${p.color} 70%, #fff))`, outlineColor: p.color }}
                >
                  Register as {p.title} <ArrowRight className="size-4" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDriverForm();
                  }}
                  className="relative mt-8 flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 w-full cursor-pointer"
                  style={{ background: `linear-gradient(90deg, ${p.color}, color-mix(in srgb, ${p.color} 70%, #fff))`, outlineColor: p.color }}
                >
                  Join as {p.title} <ArrowRight className="size-4" />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* continue bar */}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 text-center" aria-live="polite">
        <AnimatePresence mode="wait">
          {current && !current.href ? (
            <motion.button
              key={current.id}
              type="button"
              onClick={openDriverForm}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full px-7 py-4 text-base font-extrabold text-white shadow-glow transition hover:-translate-y-0.5"
              style={{ background: `linear-gradient(90deg, ${current.color}, color-mix(in srgb, ${current.color} 70%, #fff))` }}
            >
              Continue as {current.title} <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </motion.button>
          ) : current ? (
            <motion.a
              key={current.id}
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-extrabold text-white shadow-glow transition hover:-translate-y-0.5"
              style={{ background: `linear-gradient(90deg, ${current.color}, color-mix(in srgb, ${current.color} 70%, #fff))` }}
            >
              Continue as {current.title} <ExternalLink className="size-4 transition-transform group-hover:translate-x-0.5" />
            </motion.a>
          ) : (
            <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sm font-medium text-muted">
              Tap a card to choose how you want to join.
            </motion.p>
          )}
        </AnimatePresence>
        <p className="text-xs text-muted">{picked === "driver" ? "Fill the short form below and our team will contact you." : "Hotel and restaurant registration opens on app.milesassist.com in a new tab."}</p>
      </div>

      {/* driver contact form: appears when "Driver Partner" is picked */}
      <AnimatePresence>
        {picked === "driver" && (
          <motion.div
            ref={formRef}
            id="driver-form"
            key="driver-form"
            initial={{ opacity: 0, y: 24, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 12, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="scroll-mt-28 overflow-hidden"
          >
            <div className="relative mx-auto mt-12 grid max-w-5xl gap-8 rounded-[2rem] border border-line bg-card/85 p-6 shadow-[0_40px_90px_-45px_rgb(8_30_76/0.4)] backdrop-blur-xl sm:p-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
              <div>
                <span className="grid size-14 place-items-center rounded-2xl text-white shadow-lg" style={{ background: "linear-gradient(135deg, #2f6bff, #8fb0ff)" }}>
                  <Car className="size-7" />
                </span>
                <h3 className="mt-5 text-3xl font-extrabold tracking-tight text-heading">Join as a <span className="text-brand-orange">driver</span></h3>
                <p className="mt-3 leading-relaxed text-body">Leave your details and our team will contact you and help you get started. Your first month is free once your KYC is verified.</p>
                <p className="mt-7 text-xs font-bold uppercase tracking-wider text-muted">Or sign up yourself in the app</p>
                <StoreBadges size="sm" className="mt-3" />
              </div>
              <div>
                <ContactForm defaultType="Driver App" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
