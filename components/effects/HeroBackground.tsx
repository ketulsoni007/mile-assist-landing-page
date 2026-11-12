"use client";

import LiquidEther from "@/components/react-bits/LiquidEther";
import { useIsLight } from "@/hooks/useIsLight";
import { cn } from "@/lib/utils";

// sky and cloud tones (as in the design mockup): pale sky blue, soft white, a hint of peach. No orange + blue mixing, which turns muddy pink.
const LIGHT_COLORS = ["#9ec1ff", "#ffffff", "#ffd6bd"];
const DARK_COLORS = ["#2a4aa8", "#5a78d6", "#ff8a4a"];

/**
 * Hero background in three layers:
 *  1. a liquid-ether fluid in soft sky tones that drifts with the cursor (React Bits),
 *  2. a frosted-glass pane that diffuses it into cloud-like colour, so it never fights the content,
 *  3. a faint sheen and top highlight so the pane reads as glass.
 * The fluid listens on the window, so it still reacts through the glass. Click-through, theme-aware.
 */
export function HeroBackground({ className }: { className?: string }) {
  const light = useIsLight();
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {/* 1. the effect behind the glass */}
      <div className="absolute inset-0">
        <LiquidEther key={light ? "light" : "dark"} colors={light ? LIGHT_COLORS : DARK_COLORS} lightMode={light} intensity={light ? 0.9 : 0.8} persistence={0.9} cursorSize={160} autoDemo autoIntensity={1} clickBurst={false} />
      </div>

      {/* 2. frosted glass */}
      <div className="absolute inset-0 bg-surface/45 backdrop-blur-3xl" />

      {/* 3. glass sheen + edge highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/10 dark:from-white/10 dark:to-white/0" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/80 dark:bg-white/15" />
    </div>
  );
}
