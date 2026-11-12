"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, MapPin, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 5000;
const GAP = 24;

/** cards visible at once for the current width */
function usePerView() {
  const [per, setPer] = useState(3);
  useEffect(() => {
    const read = () => setPer(window.innerWidth >= 1280 ? 3 : window.innerWidth >= 768 ? 2 : 1);
    read();
    window.addEventListener("resize", read);
    return () => window.removeEventListener("resize", read);
  }, []);
  return per;
}

function Stars({ rating, play }: { rating: number; play: boolean }) {
  return (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          initial={false}
          animate={play ? { scale: [0.4, 1.25, 1], rotate: [-30, 10, 0] } : { scale: 1, rotate: 0 }}
          transition={{ delay: play ? 0.15 + i * 0.07 : 0, duration: 0.45 }}
        >
          <Star className={cn("size-4", i < rating ? "fill-amber-400 text-amber-400" : "fill-line text-line")} />
        </motion.span>
      ))}
    </span>
  );
}

/**
 * Testimonial carousel: auto-plays (pauses on hover, focus, drag and in a hidden tab), can be dragged or swiped,
 * and has arrow buttons and dots. The card in the middle of the view is highlighted as "Top Rated".
 */
export function TestimonialSlider() {
  const per = usePerView();
  const reduce = useReducedMotion();
  const count = testimonials.length;
  const maxIndex = Math.max(0, count - per);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardW, setCardW] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // measure card width from the viewport
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCardW((el.clientWidth - GAP * (per - 1)) / per));
    ro.observe(el);
    return () => ro.disconnect();
  }, [per]);

  const clamped = Math.min(index, maxIndex);
  const target = -clamped * (cardW + GAP);

  useEffect(() => {
    const c = animate(x, target, reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 32 });
    return () => c.stop();
  }, [target, x, reduce]);

  const go = useCallback((i: number) => setIndex(((i % (maxIndex + 1)) + maxIndex + 1) % (maxIndex + 1)), [maxIndex]);
  const next = useCallback(() => go(clamped + 1), [go, clamped]);
  const prev = useCallback(() => go(clamped - 1), [go, clamped]);

  // autoplay
  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [clamped, paused, reduce, next]);
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -cardW / 4) next();
    else if (swipe > cardW / 4) prev();
    else animate(x, target, { type: "spring", stiffness: 260, damping: 32 });
    setPaused(false);
  };

  const featured = clamped + Math.floor(per / 2); // middle card of the view

  return (
    <div
      className="relative min-w-0"
      role="region"
      aria-roledescription="carousel"
      aria-label="What people say about Miles Assist"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div ref={viewport} className="-my-6 min-w-0 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,#000_2%,#000_98%,transparent)]">
        <motion.ul
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x, gap: GAP }}
          drag={reduce ? false : "x"}
          dragConstraints={{ left: -maxIndex * (cardW + GAP) - 60, right: 60 }}
          dragElastic={0.15}
          onDragStart={() => setPaused(true)}
          onDragEnd={onDragEnd}
        >
          {testimonials.map((t, i) => {
            const active = i === featured;
            const visible = i >= clamped && i < clamped + per;
            return (
              <li
                key={t.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}`}
                aria-hidden={!visible}
                className="shrink-0 select-none"
                style={{ width: `calc((100% - ${GAP * (per - 1)}px) / ${per})` }}
              >
                <motion.figure
                  animate={{ scale: active ? 1 : 0.95, opacity: visible ? (active ? 1 : 0.8) : 0.35, y: active ? -6 : 0 }}
                  transition={{ type: "spring", stiffness: 240, damping: 26 }}
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border bg-card/80 p-7 shadow-card backdrop-blur-md transition-colors duration-300",
                    active ? "border-brand-orange shadow-[0_24px_60px_-24px_rgb(255_90_0/0.55)]" : "border-line",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="top-rated"
                      className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-brand-orange to-[#ff8a3d] px-3 py-1 text-xs font-bold text-white shadow-glow"
                    >
                      Top Rated
                    </motion.span>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand-orange-soft text-brand-orange">
                      <Quote className="size-5 fill-brand-orange" />
                    </span>
                    <Stars rating={t.rating} play={active && !reduce} />
                  </div>

                  <blockquote className="mt-5 flex-1 text-[0.98rem] leading-relaxed text-heading">&ldquo;{t.quote}&rdquo;</blockquote>

                  <div className="my-5 h-px bg-line" />

                  <figcaption className="flex items-center gap-3">
                    <span className="relative shrink-0">
                      <Image src={`/users/avatar-${t.avatar}.webp`} alt="" width={48} height={48} loading="eager" draggable={false} className="size-12 rounded-full object-cover ring-2 ring-surface" />
                      {active && <span className="absolute -inset-1 animate-ping rounded-full border-2 border-brand-orange/50 [animation-duration:2s]" />}
                    </span>
                    <span className="min-w-0 flex-1 leading-tight">
                      <span className="block font-extrabold text-heading">{t.name}</span>
                      <span className="mt-0.5 block text-xs font-semibold text-brand-orange">{t.role}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs font-medium text-muted">
                        <MapPin className="size-3 shrink-0" /> {t.city}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </li>
            );
          })}
        </motion.ul>
      </div>

      {/* controls */}
      <div className="mt-10 flex items-center justify-center gap-5 lg:justify-start">
        <button type="button" onClick={prev} aria-label="Previous testimonial" className="grid size-11 place-items-center rounded-full border border-line bg-card text-heading shadow-card transition hover:-translate-x-0.5 hover:border-brand-orange hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-brand-orange">
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === clamped}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={cn("relative h-2.5 overflow-hidden rounded-full transition-all duration-300", i === clamped ? "w-10 bg-brand-orange/25" : "w-2.5 bg-line hover:bg-brand-orange/40")}
            >
              {/* autoplay progress inside the active dot */}
              {i === clamped && (
                <span
                  key={`${clamped}-${paused}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-brand-orange"
                  style={{ width: reduce || paused ? "100%" : undefined, animation: reduce || paused ? undefined : `ts-progress ${AUTOPLAY_MS}ms linear forwards` }}
                />
              )}
            </button>
          ))}
        </div>
        <button type="button" onClick={next} aria-label="Next testimonial" className="grid size-11 place-items-center rounded-full bg-brand-orange text-white shadow-glow transition hover:translate-x-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange">
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
