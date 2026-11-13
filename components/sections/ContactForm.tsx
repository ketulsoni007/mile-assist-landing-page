"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Building2, Check, Handshake, Loader2, Mail, MessageSquareText, Phone, Send, Smartphone, User, type LucideIcon } from "lucide-react";
import { contactSchema, INQUIRY_TYPES, type ContactInput } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

const typeIcons: Record<(typeof INQUIRY_TYPES)[number], LucideIcon> = {
  "Driver App": Smartphone,
  "Hotel / Restaurant": Building2,
  "Admin / Enterprise": Building2,
  "Sales Partnership": Handshake,
};

function Field({ id, label, Icon, error, children, filled }: { id: string; label: string; Icon: LucideIcon; error?: FieldError; children: React.ReactNode; filled?: boolean }) {
  return (
    <div>
      <div
        className={cn(
          "group relative rounded-2xl border bg-surface/70 transition-all duration-300 focus-within:bg-card focus-within:shadow-[0_0_0_4px_rgb(255_90_0/0.12)]",
          error ? "border-red-400" : "border-line focus-within:border-brand-orange",
        )}
      >
        <Icon className={cn("pointer-events-none absolute left-4 top-[1.15rem] size-5 transition-colors", error ? "text-red-400" : "text-muted group-focus-within:text-brand-orange")} />
        {children}
        {/* floating label */}
        <label
          htmlFor={id}
          className={cn(
            "pointer-events-none absolute left-12 origin-left font-medium text-muted transition-all duration-200",
            "top-4 text-base peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-brand-orange",
            "peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-xs",
            filled && "top-1.5 text-xs",
          )}
        >
          {label}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            className="mt-1.5 pl-2 text-xs font-semibold text-red-500"
            role="alert"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = "peer block w-full rounded-2xl bg-transparent pb-2 pl-12 pr-4 pt-6 text-base text-heading outline-none placeholder:text-transparent";

export function ContactForm({ defaultType }: { defaultType?: (typeof INQUIRY_TYPES)[number] } = {}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), mode: "onTouched", defaultValues: { consent: undefined, type: defaultType } });

  const type = watch("type");
  const consent = watch("consent");
  const message = watch("message") ?? "";

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong");
      setStatus("sent");
      reset({ consent: undefined, type: defaultType });
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[32rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="relative grid size-24 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30 [animation-duration:1.6s]" />
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="relative grid size-24 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_16px_40px_-12px_rgb(16_185_129/0.7)]">
                <svg viewBox="0 0 24 24" className="size-12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.5 }} />
                </svg>
              </motion.span>
            </span>
            <h3 className="mt-7 text-2xl font-extrabold text-heading">Thanks! We got your message.</h3>
            <p className="mt-2 max-w-sm text-body">Our team will reach out to you shortly on email, phone or WhatsApp.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-7 rounded-full px-5 py-2.5 text-sm font-bold text-brand-orange ring-1 ring-brand-orange/40 transition hover:bg-brand-orange-soft">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* honeypot: hidden from people, bots fill it */}
            <div aria-hidden="true" className="absolute -left-[624.9375rem] h-0 w-0 overflow-hidden">
              <label htmlFor="ct-website">Website</label>
              <input id="ct-website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <Field id="ct-name" label="Full name" Icon={User} error={errors.name}>
              <input id="ct-name" placeholder=" " autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "ct-name-err" : undefined} className={inputCls} {...register("name")} />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="ct-email" label="Email address" Icon={Mail} error={errors.email}>
                <input id="ct-email" type="email" inputMode="email" placeholder=" " autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "ct-email-err" : undefined} className={inputCls} {...register("email")} />
              </Field>
              <Field id="ct-phone" label="Mobile number" Icon={Phone} error={errors.phone}>
                <input id="ct-phone" type="tel" inputMode="tel" placeholder=" " autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "ct-phone-err" : undefined} className={inputCls} {...register("phone")} />
              </Field>
            </div>

            {/* inquiry type as animated chips */}
            <fieldset>
              <legend className="mb-2.5 pl-1 text-sm font-bold text-heading">Inquiry type</legend>
              <div className="grid grid-cols-2 gap-2.5">
                {INQUIRY_TYPES.map((t) => {
                  const Icon = typeIcons[t];
                  const active = type === t;
                  return (
                    <label
                      key={t}
                      className={cn(
                        "relative flex cursor-pointer items-center gap-2.5 overflow-hidden rounded-2xl border px-3.5 py-3 text-sm font-semibold transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange",
                        active ? "border-brand-orange text-white" : "border-line bg-surface/70 text-heading hover:border-brand-orange/50",
                      )}
                    >
                      {active && <motion.span layoutId="ct-type" className="absolute inset-0 -z-0 bg-gradient-to-r from-brand-orange to-[#ff8a3d]" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                      <input type="radio" value={t} className="sr-only" {...register("type")} />
                      <Icon className={cn("relative size-4 shrink-0", active ? "text-white" : "text-brand-orange")} />
                      <span className="relative">{t}</span>
                    </label>
                  );
                })}
              </div>
              <AnimatePresence>
                {errors.type && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-1.5 pl-2 text-xs font-semibold text-red-500" role="alert">
                    {errors.type.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </fieldset>

            <Field id="ct-message" label="Your message" Icon={MessageSquareText} error={errors.message}>
              <textarea id="ct-message" rows={4} placeholder=" " maxLength={1500} aria-invalid={!!errors.message} aria-describedby={errors.message ? "ct-message-err" : undefined} className={cn(inputCls, "resize-none")} {...register("message")} />
              <span className="pointer-events-none absolute bottom-2 right-3 text-[0.6875rem] font-medium text-muted">{message.length}/1500</span>
            </Field>

            {/* consent */}
            <div>
              <label className="group flex cursor-pointer items-start gap-3 rounded-2xl p-1">
                <input type="checkbox" className="peer sr-only" {...register("consent")} />
                <span
                  className={cn(
                    "mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border-2 transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-orange peer-focus-visible:ring-offset-2",
                    consent ? "scale-105 border-brand-orange bg-brand-orange" : errors.consent ? "border-red-400" : "border-line group-hover:border-brand-orange/60",
                  )}
                  aria-hidden="true"
                >
                  <motion.span initial={false} animate={{ scale: consent ? 1 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 22 }}>
                    <Check className="size-4 text-white" strokeWidth={3.5} />
                  </motion.span>
                </span>
                <span className="text-sm leading-relaxed text-body">
                  I authorise Miles Assist &amp; its representatives to contact me with updates and notifications via Email/SMS/WhatsApp/Call. This will override DND/NDNC.
                </span>
              </label>
              {errors.consent && <p className="mt-1 pl-10 text-xs font-semibold text-red-500" role="alert">{errors.consent.message}</p>}
            </div>

            {status === "error" && (
              <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-500" role="alert">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-brand-orange to-[#ff7a2e] py-4 text-base font-extrabold text-white shadow-glow transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-10px_rgb(255_90_0/0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange disabled:cursor-wait disabled:opacity-80"
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[sb-shine_0.9s_ease-out]" />
              {status === "sending" ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Submit <Send className="size-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:translate-x-1" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-muted">
              By submitting, you agree to our{" "}
              <Link href="/terms-conditions" className="font-semibold text-heading underline decoration-brand-orange/40 underline-offset-2 hover:text-brand-orange">Terms of Service</Link> and{" "}
              <Link href="/privacy-policy" className="font-semibold text-heading underline decoration-brand-orange/40 underline-offset-2 hover:text-brand-orange">Privacy Policy</Link>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

