"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Dot = { x: number; y: number; dx: number; dy: number; vx: number; vy: number };

type Props = {
  className?: string;
  /** distance between dots in px */
  gap?: number;
  /** how far the cursor reaches in px */
  radius?: number;
};

const LIGHT = { base: [8, 30, 76], baseA: 0.16, hot: [255, 90, 0], spot: 0.14 };
const DARK = { base: [150, 178, 255], baseA: 0.16, hot: [255, 138, 61], spot: 0.2 };

/**
 * Interactive dot-grid background (canvas). Dots are pushed away from the cursor, light up orange,
 * spring back, and a click sends a shockwave through the grid. With no pointer present (touch,
 * idle) a virtual cursor drifts across so the hero never looks static. Pauses off-screen / in a
 * hidden tab, follows the light/dark theme, and draws once (no animation) for reduced motion.
 * Listens on the parent element, so the canvas itself never blocks clicks.
 */
export function DotGridBackground({ className, gap = 34, radius = 170 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dots: Dot[] = [];
    let raf = 0, visible = true, tabVisible = !document.hidden;
    let palette = LIGHT;
    const mouse = { x: -9999, y: -9999, sx: 0, sy: 0, vx: 0, vy: 0, active: false, lx: 0, ly: 0 };

    const readTheme = () => {
      palette = document.documentElement.getAttribute("data-theme") === "dark" ? DARK : LIGHT;
    };

    const build = () => {
      const r = host.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;
      dots = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) dots.push({ x: ox + i * gap, y: oy + j * gap, dx: 0, dy: 0, vx: 0, vy: 0 });
      mouse.sx = w * 0.7;
      mouse.sy = h * 0.5;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const { base, baseA, hot, spot } = palette;

      // the force source: the real cursor, or a slow virtual one when nobody is hovering
      let fx = mouse.x, fy = mouse.y, strength = 1;
      if (!mouse.active) {
        fx = w * (0.55 + 0.38 * Math.sin(t * 0.00031));
        fy = h * (0.5 + 0.32 * Math.sin(t * 0.00053 + 1.3));
        strength = 0.55;
      }
      mouse.sx += (fx - mouse.sx) * 0.1;
      mouse.sy += (fy - mouse.sy) * 0.1;
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;
      const speed = Math.min(Math.hypot(mouse.vx, mouse.vy), 40);

      // soft spotlight under the cursor
      const g = ctx.createRadialGradient(mouse.sx, mouse.sy, 0, mouse.sx, mouse.sy, radius * 1.7);
      const a0 = spot * (mouse.active ? 1 : 0.55);
      g.addColorStop(0, `rgba(${hot[0]},${hot[1]},${hot[2]},${a0})`);
      g.addColorStop(1, `rgba(${hot[0]},${hot[1]},${hot[2]},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      for (const d of dots) {
        const px = d.x + d.dx, py = d.y + d.dy;
        const mx = px - fx, my = py - fy;
        const dist = Math.hypot(mx, my);

        if (dist < radius && dist > 0.001) {
          const f = 1 - dist / radius;
          const push = (f * f * 0.9 + f * speed * 0.05) * strength;
          d.vx += (mx / dist) * push;
          d.vy += (my / dist) * push;
        }
        d.vx += -d.dx * 0.055;
        d.vy += -d.dy * 0.055;
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.dx += d.vx;
        d.dy += d.vy;

        const near = Math.max(0, 1 - Math.hypot(d.x - fx, d.y - fy) / (radius * 1.1)) * strength;
        const moved = Math.min(1, Math.hypot(d.dx, d.dy) / 18);
        const k = Math.min(1, near * 1.2 + moved * 0.6);
        const ambient = (0.5 + 0.5 * Math.sin(t * 0.0012 + d.x * 0.012 + d.y * 0.008)) * 0.05;

        const r = Math.round(base[0] + (hot[0] - base[0]) * k);
        const gg = Math.round(base[1] + (hot[1] - base[1]) * k);
        const b = Math.round(base[2] + (hot[2] - base[2]) * k);
        ctx.fillStyle = `rgba(${r},${gg},${b},${(baseA + ambient + k * (0.85 - baseA)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x + d.dx, d.y + d.dy, 1.5 + k * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = visible && tabVisible ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf && !reduce && visible && tabVisible) raf = requestAnimationFrame(loop);
    };

    // pointer input (listens on the section, canvas stays click-through)
    const toLocal = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const p = toLocal(e);
      if (mouse.active) {
        mouse.vx += (p.x - mouse.lx) * 0.35;
        mouse.vy += (p.y - mouse.ly) * 0.35;
      }
      mouse.x = mouse.lx = p.x;
      mouse.y = mouse.ly = p.y;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e);
      for (const d of dots) {
        const mx = d.x + d.dx - p.x, my = d.y + d.dy - p.y;
        const dist = Math.hypot(mx, my);
        if (dist < 340 && dist > 0.001) {
          const f = 1 - dist / 340;
          d.vx += (mx / dist) * f * 16;
          d.vy += (my / dist) * f * 16;
        }
      }
    };

    readTheme();
    build();
    if (reduce) draw(0);
    else start();

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) draw(0);
    });
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(host);
    const onVis = () => {
      tabVisible = !document.hidden;
      if (tabVisible) start();
    };
    const mo = new MutationObserver(() => {
      readTheme();
      if (reduce) draw(0);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [gap, radius]);

  return <canvas ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 size-full", className)} />;
}
