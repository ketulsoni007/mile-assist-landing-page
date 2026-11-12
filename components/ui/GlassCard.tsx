"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Frosted-glass card with a coloured spotlight that follows the pointer and a gentle 3D tilt.
 * Colours come from the theme variables, so it works in light and dark. Falls back to a plain
 * glass card on touch devices and for reduced motion.
 */
export function GlassCard({
  color,
  className,
  children,
}: {
  color: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.style.setProperty("--rx", `${((0.5 - y / r.height) * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x / r.width - 0.5) * 9).toFixed(2)}deg`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="h-full [perspective:1000px]">
      <div
        ref={ref}
        onPointerMove={move}
        onPointerLeave={leave}
        style={{ ["--accent" as string]: color }}
        className={cn(
          "group relative h-full overflow-hidden rounded-3xl border border-white/70 bg-white/60 p-7 shadow-card backdrop-blur-xl transition-[transform,box-shadow] duration-300 ease-out",
          "[transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-20px_var(--accent)]",
          "dark:border-white/10 dark:bg-white/[0.05]",
          className,
        )}
      >
        {/* tint + spotlight */}
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: `linear-gradient(135deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent 55%)` }} />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--accent) 22%, transparent), transparent 62%)" }}
        />
        <div className="relative flex h-full flex-col">{children}</div>
      </div>
    </div>
  );
}
