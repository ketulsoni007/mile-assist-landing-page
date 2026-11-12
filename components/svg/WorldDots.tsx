import { WORLD } from "./world-data";

/** Dotted world map (generated, see scripts/make-world-dots.mjs) with pulsing pins on Indian cities. */
export function WorldDots({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${WORLD.w} ${WORLD.h}`} className={className} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <path d={WORLD.path} fill="none" strokeLinecap="round" strokeWidth="3.4" style={{ stroke: "var(--map-dot)" }} />
      {WORLD.pins.map((p, i) => (
        <g key={p.name} transform={`translate(${p.x} ${p.y})`}>
          <circle r="6" fill="#ff5a00" className="wd-pulse" style={{ ["--pd" as string]: `${i * 0.45}s` }} />
          <circle r="3.2" fill="#ff5a00" stroke="var(--color-surface)" strokeWidth="1.2" />
        </g>
      ))}
    </svg>
  );
}
