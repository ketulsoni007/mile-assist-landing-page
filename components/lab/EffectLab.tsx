"use client";

import { useState, useSyncExternalStore, type ReactNode } from "react";
import Aurora from "@/components/react-bits/Aurora";
import Particles from "@/components/react-bits/Particles";
import LightRays from "@/components/react-bits/LightRays";
import RippleGrid from "@/components/react-bits/RippleGrid";
import Silk from "@/components/react-bits/Silk";
import Iridescence from "@/components/react-bits/Iridescence";
import Threads from "@/components/react-bits/Threads";
import Waves from "@/components/react-bits/Waves";
import SoftAurora from "@/components/react-bits/SoftAurora";
import LiquidEther from "@/components/react-bits/LiquidEther";
import DotGrid from "@/components/react-bits/DotGrid";
import { DotGridBackground } from "@/components/effects/DotGridBackground";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const ORANGE = "#ff5a00";
const BLUE = "#2f6bff";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const useIsLight = () =>
  useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute("data-theme") !== "dark",
    () => true,
  );

const effects: { name: string; render: (light: boolean) => ReactNode }[] = [
  { name: "Liquid Ether", render: (l) => <LiquidEther colors={[ORANGE, BLUE, "#ff9a52"]} lightMode={l} autoDemo clickBurst /> },
  { name: "Dot grid (ours)", render: () => <DotGridBackground /> },
  { name: "Dot Grid", render: (l) => <DotGrid baseColor={l ? "#b9c6e4" : "#3b4a78"} activeColor={ORANGE} /> },
  { name: "Particles", render: (l) => <Particles particleColors={[ORANGE, BLUE, "#76889b"]} lightMode={l} connections hoverEffect="repel" clickBurst /> },
  { name: "Light Rays", render: (l) => <LightRays raysColor="#ff8a3d" lightMode={l} followMouse clickPulse /> },
  { name: "Ripple Grid", render: (l) => <RippleGrid color={ORANGE} lightMode={l} mouseInteraction clickRipple /> },
  { name: "Aurora", render: (l) => <Aurora colorStops={[ORANGE, BLUE, "#ff8a3d"]} lightMode={l} mouseInteraction /> },
  { name: "Soft Aurora", render: (l) => <SoftAurora color1={ORANGE} color2={BLUE} lightMode={l} enableMouseInteraction clickPulse /> },
  { name: "Silk", render: (l) => <Silk color={ORANGE} lightMode={l} mouseInteraction clickRipple /> },
  { name: "Iridescence", render: () => <Iridescence color={[1, 0.45, 0.15]} mouseReact clickSwirl /> },
  { name: "Threads", render: () => <Threads color={ORANGE} accentColor={BLUE} enableMouseInteraction /> },
  { name: "Waves", render: (l) => <Waves lineColor={BLUE} accentColor={ORANGE} lightMode={l} mouseInteraction clickRipple /> },
];

/** Hidden playground: every background live on the hero colours, light/dark aware. */
export function EffectLab() {
  const [active, setActive] = useState(0);
  const light = useIsLight();
  const current = effects[active];

  return (
    <div className="min-h-screen bg-surface">
      <div className="sticky top-0 z-30 flex flex-wrap items-center gap-2 border-b border-line bg-surface/90 px-4 py-3 backdrop-blur">
        <strong className="mr-2 text-heading">Effect lab</strong>
        {effects.map((e, i) => (
          <button
            key={e.name}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
              i === active ? "border-brand-orange bg-brand-orange text-white" : "border-line bg-card text-heading hover:border-brand-orange",
            )}
          >
            {e.name}
          </button>
        ))}
        <ThemeToggle className="ml-auto" />
      </div>

      <section className="relative isolate h-[calc(100vh-61px)] overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c">
        {/* key forces a clean remount (and WebGL context) when switching */}
        <div key={`${current.name}-${light}`} className="absolute inset-0">
          {current.render(light)}
        </div>
        <div className="pointer-events-none relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">
          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
            Smart Driver <span className="text-brand-orange">Collaboration</span> &amp; Travel Assistance
          </h1>
          <p className="mt-5 max-w-md text-lg text-body">Move your mouse, click, and switch the theme. Pick the background you like.</p>
        </div>
      </section>
    </div>
  );
}
