"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, BedDouble, Car, Check, ShieldCheck, Sparkles, Utensils, X, type LucideIcon } from "lucide-react";
import { getRole, onOpenRolePicker, setRole, useRole, type Role } from "@/lib/role";
import { cn } from "@/lib/utils";

type Option = { id: Role; title: string; short: string; text: string; img: string; w: number; h: number; Icon: LucideIcon; color: string; badge?: string };

const OPTIONS: Option[] = [
  { id: "driver", title: "I'm a Driver", short: "Driver", text: "Enjoy free meals, comfortable stays and exclusive travel benefits.", img: "/roles/driver.webp", w: 640, h: 416, Icon: Car, color: "#ff5a00", badge: "For drivers" },
  { id: "restaurant", title: "I'm a Restaurant Partner", short: "Restaurant", text: "Welcome drivers, grow your reach and manage your partnership.", img: "/roles/restaurant.webp", w: 640, h: 449, Icon: Utensils, color: "#7c5cff" },
  { id: "hotel", title: "I'm a Hotel Partner", short: "Hotel", text: "Connect with verified drivers and grow your guest bookings.", img: "/roles/hotel.webp", w: 640, h: 449, Icon: BedDouble, color: "#2f6bff" },
];

const DISMISSED = "ma-role-dismissed"; // sessionStorage: closed without choosing, don't ask again this visit

/**
 * Welcome popup: "How will you use Miles Assist?". Opens by itself on the home page for a first-time visitor,
 * and from openRolePicker() anywhere (footer "Change" link). The pick is saved by setRole() (see lib/role.ts).
 */
export function RoleModal() {
  const pathname = usePathname();
  const role = useRole();
  // "closing" keeps the popup mounted for its short fade-out. Plain CSS animations are used on purpose:
  // an exit animation driven by AnimatePresence got stuck on screen when the popup was closed while still fading in.
  const [phase, setPhase] = useState<"closed" | "open" | "closing">("closed");
  const open = phase === "open";
  const setOpen = (v: boolean) => setPhase((cur) => (v ? "open" : cur === "open" ? "closing" : cur));
  useEffect(() => {
    if (phase !== "closing") return;
    const t = setTimeout(() => setPhase("closed"), 200);
    return () => clearTimeout(t);
  }, [phase]);
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  /* first visit to the home page: ask once */
  useEffect(() => {
    if (pathname !== "/") return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISSED) === "1";
    } catch {}
    if (getRole() || dismissed) return;
    const t = setTimeout(() => setPhase("open"), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => onOpenRolePicker(() => setPhase("open")), []);

  const close = () => {
    try {
      sessionStorage.setItem(DISMISSED, "1");
    } catch {}
    setOpen(false);
  };
  const choose = (r: Role) => {
    setRole(r);
    setOpen(false);
  };

  /* while open: lock page scroll, Esc closes, Tab stays inside, focus returns afterwards */
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const focusables = () => Array.from(panel.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? []);
    const t = setTimeout(() => (panel.current?.querySelector<HTMLElement>("[data-autofocus]") ?? focusables()[0])?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        try {
          sessionStorage.setItem(DISMISSED, "1");
        } catch {}
        setPhase("closing");
      } else if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      lastFocus.current?.focus?.();
    };
  }, [open]);

  return (
    <>
      {phase !== "closed" && (
        <div
          data-lenis-prevent
          data-closing={phase === "closing" ? "" : undefined}
          className="rm-overlay fixed inset-0 z-[80] grid place-items-center overflow-y-auto overscroll-contain bg-[#061233]/55 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="role-title"
            aria-describedby="role-sub"
            className="rm-panel relative my-auto w-full max-w-[54rem] overflow-hidden rounded-[1.75rem] bg-card shadow-[0_50px_120px_-30px_rgb(3_10_35/0.7)] ring-1 ring-line"
          >
            {/* soft warm wash behind the header */}
            <div className="pointer-events-none absolute -right-24 -top-28 size-[26rem] rounded-full bg-brand-orange/[0.13] blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-[#2f6bff]/[0.07] blur-3xl" aria-hidden="true" />

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 grid size-10 cursor-pointer place-items-center rounded-full bg-card text-heading shadow-card ring-1 ring-line transition hover:rotate-90 hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:right-4 sm:top-4"
            >
              <X className="size-5" />
            </button>

            {/* header */}
            <div className="relative px-5 pt-6 sm:px-10 sm:pt-9">
              {/* sized by height so the whole character (hair included) stays inside the popup and stands on the divider */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/roles/guide.webp" alt="" width={520} height={493} className="pointer-events-none absolute bottom-3 right-14 top-3 hidden h-[calc(100%-1.5rem)] w-auto select-none sm:block lg:right-16" aria-hidden="true" />
              <div className="relative sm:max-w-[60%]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-wider text-brand-orange ring-1 ring-brand-orange/15">
                  <Sparkles className="size-3.5" /> Welcome to Miles Assist
                </span>
                <h2 id="role-title" className="mt-4 pr-10 text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-heading sm:pr-0 sm:text-[2.6rem]">
                  How will you use <span className="block text-brand-orange">Miles Assist?</span>
                </h2>
              </div>
              <p id="role-sub" className="relative mt-3 flex items-center gap-4 text-sm font-medium text-body sm:mt-5 sm:pr-[15rem] sm:text-base lg:pr-[15.5rem]">
                <span className="hidden h-px w-16 bg-line sm:block" aria-hidden="true" />
                Choose your experience to get started
                <span className="hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />
              </p>
            </div>

            {/* options */}
            <ul className="relative grid gap-3 px-5 pt-5 sm:grid-cols-3 sm:gap-4 sm:px-10 sm:pt-6">
              {OPTIONS.map((o, i) => {
                const current = role === o.id;
                return (
                  <li key={o.id} className="rm-card h-full min-w-0" style={{ animationDelay: `${0.12 + i * 0.08}s` }}>
                    <div
                      className={cn(
                        "group relative flex h-full items-center gap-3.5 rounded-[1.25rem] border p-3 transition duration-300 hover:-translate-y-1 sm:flex-col sm:items-stretch sm:gap-0 sm:p-4",
                        "border-[color-mix(in_srgb,var(--c)_28%,transparent)] bg-[color-mix(in_srgb,var(--c)_7%,var(--card))] hover:border-[color-mix(in_srgb,var(--c)_65%,transparent)] hover:shadow-[0_22px_44px_-24px_var(--c)]",
                        current && "border-[var(--c)]",
                      )}
                      style={{ ["--c" as string]: o.color }}
                    >
                      {(o.badge || current) && (
                        <span className="absolute -top-px left-3 z-10 flex items-center gap-1 rounded-b-lg px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wider text-white" style={{ background: o.color }}>
                          {current ? <><Check className="size-3" strokeWidth={3.5} /> Selected</> : o.badge}
                        </span>
                      )}

                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={o.img} alt="" width={o.w} height={o.h} className="rm-art h-auto w-[5.75rem] shrink-0 select-none object-contain sm:mx-auto sm:mt-3 sm:aspect-[640/449] sm:w-[86%]" style={{ animationDelay: `${i * -1.3}s` }} aria-hidden="true" />

                      <div className="flex min-w-0 flex-1 flex-col sm:text-center">
                        <span className="hidden items-center gap-3 sm:mt-2 sm:flex" aria-hidden="true">
                          <span className="h-px flex-1" style={{ background: `color-mix(in srgb, ${o.color} 30%, transparent)` }} />
                          <o.Icon className="size-5" style={{ color: o.color }} />
                          <span className="h-px flex-1" style={{ background: `color-mix(in srgb, ${o.color} 30%, transparent)` }} />
                        </span>
                        <h3 className="text-base font-extrabold leading-tight text-heading sm:mt-3 sm:text-[1.05rem]">{o.title}</h3>
                        <p className="mt-1 text-[0.8rem] leading-snug text-body sm:mt-1.5 sm:flex-1 sm:text-[0.82rem]">{o.text}</p>
                        <button
                          type="button"
                          data-autofocus={i === 0 ? "" : undefined}
                          onClick={() => choose(o.id)}
                          aria-label={`Continue as ${o.short}`}
                          className={cn(
                            "group/btn mt-2.5 inline-flex w-fit cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-3.5 py-2.5 text-[0.82rem] font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c)] sm:mt-4 sm:w-full sm:py-3 sm:text-sm",
                            i === 0
                              ? "bg-[var(--c)] text-white shadow-[0_12px_24px_-12px_var(--c)] hover:brightness-110"
                              : "bg-[color-mix(in_srgb,var(--c)_14%,transparent)] text-[var(--c)] hover:bg-[var(--c)] hover:text-white dark:text-[color-mix(in_srgb,var(--c)_70%,#fff)]",
                          )}
                        >
                          <span>Continue<span className="hidden sm:inline"> as {o.short}</span></span> <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <p className="relative flex items-center justify-center gap-4 px-5 pb-5 pt-5 text-sm font-semibold text-heading sm:px-10 sm:pb-7 sm:pt-6">
              <span className="hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />
              <span className="flex items-center gap-2"><ShieldCheck className="size-5 text-brand-orange" /> You can switch roles anytime</span>
              <span className="hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />
            </p>
          </div>
        </div>
      )}
    </>
  );
}
