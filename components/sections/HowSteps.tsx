"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Check } from "lucide-react";
import { steps, type Step } from "@/lib/content";

/* ───────────── road geometry (viewBox 1000 x 540; badges sit ON the road) ───────────── */
const VB_W = 1000;
const VB_H = 540;
const LOW = 340;
const HIGH = 190;
const STEP_X = [125, 375, 625, 875];
const STEP_Y = [LOW, HIGH, LOW, HIGH];
const ROAD = `M-30 ${LOW} L125 ${LOW} C250 ${LOW} 250 ${HIGH} 375 ${HIGH} C500 ${HIGH} 500 ${LOW} 625 ${LOW} C750 ${LOW} 750 ${HIGH} 875 ${HIGH} L1030 ${HIGH}`;

/** scroll progress (0..1) at which the car has parked at each step */
const ARRIVE = [0.08, 0.36, 0.64, 0.92];
const PARK_GAP = 80; // the car stops this far (viewBox units) before the badge so it never hides the icon

function Badge({ step, progress, threshold }: { step: Step; progress: MotionValue<number>; threshold: number }) {
  const lit = useTransform(progress, [threshold - 0.05, threshold], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.88, 1]);
  const glow = useTransform(lit, [0, 1], [0, 0.4]);
  const ring = useTransform(lit, [0, 1], [0.25, 0.85]);
  const [reached, setReached] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setReached(v >= threshold));
  const { Icon, color, n } = step;
  const last = n === steps.length;
  return (
    <div className="relative z-20 mx-auto grid size-28 place-items-center">
      <motion.span className="absolute inset-0 rounded-full blur-xl" style={{ background: color, opacity: glow }} />
      <motion.span className="absolute inset-2 rounded-full border-2 border-dashed" style={{ borderColor: color, opacity: ring }} />
      {reached && (
        <>
          <span className="hw-ripple absolute inset-4 rounded-full border-2" style={{ borderColor: color }} />
          <span className="hw-ripple absolute inset-4 rounded-full border-2" style={{ borderColor: color, animationDelay: "0.25s" }} />
        </>
      )}
      {last && reached && [0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="hw-coin absolute left-1/2 top-1/2 grid size-6 place-items-center rounded-full bg-amber-400 text-[0.6875rem] font-extrabold text-amber-900 shadow-md" style={{ ["--a" as string]: `${-70 + i * 35}deg`, animationDelay: `${i * 0.08}s` }}>₹</span>
      ))}
      <motion.div
        style={{ scale, background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 55%, #fff))`, boxShadow: `0 16px 32px -12px ${color}` }}
        className="relative grid size-20 place-items-center rounded-full text-white"
      >
        <motion.span animate={reached ? { scale: [1, 1.3, 1], rotate: [0, -10, 0] } : {}} transition={{ duration: 0.55 }} className="hw-float" style={{ ["--fd" as string]: `${n * -0.9}s` }}>
          <Icon className="size-9" strokeWidth={1.8} />
        </motion.span>
        <span className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full border-2 border-surface bg-card text-sm font-extrabold shadow-card" style={{ color }}>{n}</span>
        <motion.span
          initial={false}
          animate={{ scale: reached ? 1 : 0, rotate: reached ? 0 : -90 }}
          transition={{ type: "spring", stiffness: 420, damping: 16, delay: reached ? 0.12 : 0 }}
          className="absolute -bottom-1 -left-1 grid size-7 place-items-center rounded-full border-2 border-surface bg-emerald-500 text-white shadow-md"
        >
          <Check className="size-4" strokeWidth={3.2} />
        </motion.span>
      </motion.div>
    </div>
  );
}

function StepText({ step, progress, threshold, left }: { step: Step; progress: MotionValue<number>; threshold: number; left?: boolean }) {
  const lit = useTransform(progress, [threshold - 0.06, threshold], [0, 1]);
  const opacity = useTransform(lit, [0, 1], [0.35, 1]);
  const y = useTransform(lit, [0, 1], [12, 0]);
  return (
    <motion.div style={{ opacity, y }} className={left ? "text-left" : "text-center"}>
      <h3 className="text-xl font-extrabold tracking-tight text-heading">{step.title}</h3>
      <p className={`mt-1.5 max-w-[15rem] text-[0.95rem] leading-relaxed text-muted ${left ? "" : "mx-auto"}`}>{step.text}</p>
    </motion.div>
  );
}

const SPARKS = [
  { l: "6%", t: "74%", s: 6, d: 0, c: "#ff5a00" }, { l: "16%", t: "30%", s: 4, d: 1.4, c: "#2f6bff" }, { l: "27%", t: "82%", s: 5, d: 2.8, c: "#ff8a3d" },
  { l: "38%", t: "18%", s: 4, d: 0.7, c: "#7c5cff" }, { l: "52%", t: "88%", s: 6, d: 2.1, c: "#ff5a00" }, { l: "63%", t: "24%", s: 5, d: 3.5, c: "#0ea5a4" },
  { l: "74%", t: "78%", s: 4, d: 1.1, c: "#2f6bff" }, { l: "84%", t: "34%", s: 6, d: 2.5, c: "#ff8a3d" }, { l: "93%", t: "70%", s: 5, d: 0.4, c: "#ff5a00" },
];

/** piecewise-linear lookup: input stops -> output stops (linear, so the car never eases to a halt between steps) */
function keyframes(p: number, xs: number[], ys: number[]) {
  if (p <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) {
    if (p <= xs[i]) return ys[i - 1] + ((ys[i] - ys[i - 1]) * (p - xs[i - 1])) / (xs[i] - xs[i - 1]);
  }
  return ys[ys.length - 1];
}

/**
 * Scroll-driven story. Desktop: the section pins in place and a car drives along a curved road; it parks next to
 * step 1, then a little more scrolling drives it to step 2, then 3, then 4. Mobile: a vertical rail that fills on scroll.
 */
export function HowSteps() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const roadPath = useRef<SVGPathElement>(null);
  const carEl = useRef<HTMLDivElement>(null);
  const geo = useRef<{ total: number; stops: number[] }>({ total: 1, stops: [0, 0, 0, 0] });
  const reduce = useReducedMotion();

  const { scrollYProgress: deskScroll } = useScroll({ target: wrap, offset: ["start 96px", "end end"] });
  const { scrollYProgress: mobScroll } = useScroll({ target: wrap, offset: ["start 75%", "end 60%"] });
  const done = useMotionValue(1);
  const progress = reduce ? done : deskScroll;
  const mobile = reduce ? done : mobScroll;

  /* measure the road once: where each badge sits along it, and the total length */
  useEffect(() => {
    const path = roadPath.current;
    if (!path) return;
    const total = path.getTotalLength();
    const stops = STEP_X.map((x) => {
      let lo = 0, hi = total;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).x < x) lo = mid; else hi = mid;
      }
      return Math.max(0, lo - PARK_GAP);
    });
    geo.current = { total, stops };
    place(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lengthAt = useCallback((p: number) => {
    const s = geo.current.stops;
    return keyframes(p, [0, ...ARRIVE, 1], [0, s[0], s[1], s[2], s[3], s[3]]);
  }, []);

  /** put the car on the road at progress p, rotated along the road, in % of the stage */
  const place = useCallback((p: number) => {
    const path = roadPath.current, car = carEl.current, box = stage.current;
    if (!path || !car || !box) return;
    const len = lengthAt(p);
    const a = path.getPointAtLength(len);
    const b = path.getPointAtLength(Math.min(len + 2, geo.current.total));
    const w = box.clientWidth, h = box.clientHeight;
    const ang = (Math.atan2(((b.y - a.y) / VB_H) * h, ((b.x - a.x) / VB_W) * w) * 180) / Math.PI;
    car.style.left = `${(a.x / VB_W) * 100}%`;
    car.style.top = `${(a.y / VB_H) * 100}%`;
    car.style.transform = `translate(-50%, -66%) rotate(${ang}deg)`;
  }, [lengthAt]);

  useMotionValueEvent(progress, "change", place);
  useEffect(() => {
    const ro = new ResizeObserver(() => place(progress.get()));
    if (stage.current) ro.observe(stage.current);
    return () => ro.disconnect();
  }, [place, progress]);

  const trail = useTransform(progress, (p) => Math.min(1, (lengthAt(p) + 0) / geo.current.total));
  const railScale = useTransform(mobile, [0, 1], [0, 1]);

  return (
    <div ref={wrap} className={`relative mt-12 ${reduce ? "" : "lg:h-[215vh]"}`}>
      <div className={reduce ? "" : "lg:sticky lg:top-24"}>
        <div className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10" aria-hidden="true">
          {SPARKS.map((p, i) => (
            <span key={i} className="hw-spark-dot absolute rounded-full" style={{ left: p.l, top: p.t, width: p.s, height: p.s, background: p.c, animationDelay: `${p.d}s` }} />
          ))}
        </div>

        {/* ===== desktop: pinned road ===== */}
        <div ref={stage} className="relative mx-auto hidden h-[min(540px,calc(100vh-8rem))] w-full max-w-6xl lg:block">
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
            {/* tarmac */}
            <path d={ROAD} fill="none" strokeWidth="44" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ stroke: "var(--color-line)" }} />
            <path d={ROAD} fill="none" strokeWidth="38" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ stroke: "var(--color-surface-alt)" }} />
            {/* lane dashes */}
            <path ref={roadPath} d={ROAD} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="10 12" vectorEffect="non-scaling-stroke" style={{ stroke: "var(--color-muted)", opacity: 0.45 }} />
            {/* driven part lights up */}
            <motion.path d={ROAD} fill="none" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" stroke="#ff5a00" style={{ pathLength: trail, filter: "drop-shadow(0 0 6px rgb(255 90 0 / 0.6))" }} />
          </svg>

          {steps.map((s, i) => {
            const above = STEP_Y[i] === HIGH;
            return (
              <div key={s.n} className="absolute" style={{ left: `${(STEP_X[i] / VB_W) * 100}%`, top: `${(STEP_Y[i] / VB_H) * 100}%` }}>
                <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                  <Badge step={s} progress={progress} threshold={ARRIVE[i]} />
                </div>
                <div className={`absolute left-1/2 w-64 -translate-x-1/2 ${above ? "bottom-[4.9rem]" : "top-[4.9rem]"}`}>
                  <StepText step={s} progress={progress} threshold={ARRIVE[i]} />
                </div>
              </div>
            );
          })}

          {/* the car (your SVG): positioned by place() while scrolling */}
          <div ref={carEl} className="pointer-events-none absolute z-30" style={{ left: "-4%", top: `${(LOW / VB_H) * 100}%`, transform: "translate(-50%, -66%)" }} aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/car.svg" alt="" width={64} height={25} className="max-w-none drop-shadow-[0_6px_6px_rgb(0_0_0/0.2)]" />
          </div>
        </div>
      </div>

      {/* ===== mobile / tablet: vertical rail ===== */}
      <div className="relative mx-auto max-w-md lg:hidden">
        <div className="absolute bottom-10 left-[3.1rem] top-10 w-0.5 rounded-full bg-line" aria-hidden="true" />
        <motion.div className="absolute bottom-10 left-[3.1rem] top-10 w-0.5 origin-top rounded-full bg-brand-orange" style={{ scaleY: railScale }} aria-hidden="true" />
        <ol className="space-y-8">
          {steps.map((s, i) => (
            <li key={s.n} className="relative flex items-center gap-5">
              <div className="shrink-0 [&>div]:size-24 [&>div>div]:size-[4.25rem]">
                <Badge step={s} progress={mobile} threshold={ARRIVE[i]} />
              </div>
              <StepText step={s} progress={mobile} threshold={ARRIVE[i]} left />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
