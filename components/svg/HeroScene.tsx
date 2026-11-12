import Image from "next/image";
import layers from "./heroLayers.json";
import { HeroScenery } from "./HeroScenery";

/**
 * Hero artwork: the generated illustration (public/hero/mile-hero.png) split by
 * scripts/split-hero.mjs into the driver + car and six floating service tiles, so each can move.
 * All layers share one 1536x1024 space and are positioned in percent, so they scale together.
 * Motion is CSS only (app/hero-scene.css). Entrance animation sits on an outer element and the
 * idle loop on an inner one, because two animations on one element would fight over `transform`.
 */

const W = layers.canvas.w;
const H = layers.canvas.h;
const pct = (v: number, total: number) => `${((v / total) * 100).toFixed(3)}%`;

type TileKey = "tile-1" | "tile-2" | "tile-3" | "tile-4" | "tile-5" | "tile-6";
const tiles: { key: TileKey; depth: 1 | 2 | 3 }[] = [
  { key: "tile-3", depth: 2 }, // restaurants
  { key: "tile-5", depth: 3 }, // insurance
  { key: "tile-1", depth: 1 }, // hotels
  { key: "tile-4", depth: 2 }, // protection
  { key: "tile-2", depth: 3 }, // legal
  { key: "tile-6", depth: 1 }, // legal support
];

// the screen of the phone in the artwork, used to swap in the real logo
const SCREEN = "673,335 860,335 898,545 708,545";

const sparkles = [
  { x: 640, y: 90, s: 22, d: 0 },
  { x: 1020, y: 120, s: 16, d: 1.1 },
  { x: 130, y: 190, s: 18, d: 0.6 },
  { x: 1290, y: 190, s: 24, d: 1.7 },
  { x: 380, y: 620, s: 14, d: 2.3 },
  { x: 1500, y: 560, s: 18, d: 0.3 },
];

export function HeroScene({ className }: { className?: string }) {
  const base = layers.base;
  return (
    <div className={className}>
      <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
        {/* city, clouds, road and bushes behind everything (overflow visible so the blob can bleed past the art) */}
        <HeroScenery className="hs-layer hs-depth-0 pointer-events-none absolute inset-0 h-full w-full overflow-visible" />

        {/* warm glow behind the characters */}
        <div className="hs-aura pointer-events-none absolute left-[30%] top-[22%] h-[70%] w-[68%] rounded-full" aria-hidden="true" />

        {/* floating service tiles */}
        {tiles.map(({ key, depth }, i) => {
          const t = layers[key];
          return (
            <div
              key={key}
              className={`hs-layer hs-depth-${depth} absolute`}
              style={{ left: pct(t.x, W), top: pct(t.y, H), width: pct(t.w, W) }}
              aria-hidden="true"
            >
              <div className="hs-pop" style={{ ["--d" as string]: `${0.5 + i * 0.14}s` }}>
                <div className="hs-float" style={{ ["--fd" as string]: `${i * -1.4}s`, ["--fr" as string]: `${5.5 + (i % 3) * 0.8}s` }}>
                  <Image src={`/hero/hero-${key}.png`} alt="" width={t.w} height={t.h} sizes="(min-width: 1024px) 12vw, 25vw" className="h-auto w-full" />
                </div>
              </div>
            </div>
          );
        })}

        {/* sparkles */}
        <svg viewBox={`0 0 ${W} ${H}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          {sparkles.map((s, i) => (
            <path
              key={i}
              className="hs-twinkle"
              style={{ ["--td" as string]: `${s.d}s`, transformOrigin: `${s.x}px ${s.y}px`, transformBox: "view-box" }}
              d={`M${s.x} ${s.y - s.s}Q${s.x + 2} ${s.y - 2} ${s.x + s.s} ${s.y}Q${s.x + 2} ${s.y + 2} ${s.x} ${s.y + s.s}Q${s.x - 2} ${s.y + 2} ${s.x - s.s} ${s.y}Q${s.x - 2} ${s.y - 2} ${s.x} ${s.y - s.s}Z`}
              fill={i % 2 ? "#ff8a3d" : "#7da2ff"}
            />
          ))}
        </svg>

        {/* driver + car (+ the real logo on the phone) */}
        <div className="hs-layer hs-depth-4 absolute inset-0">
          <div className="hs-rise absolute inset-0">
            <div className="hs-breathe absolute inset-0">
              <Image
                src="/hero/hero-base.png"
                alt="A smiling driver in an orange hoodie holds up the Miles Assist app and gives a thumbs-up beside an orange car"
                width={base.w}
                height={base.h}
                priority
                quality={92}
                sizes="(min-width: 1280px) 62vw, (min-width: 1024px) 66vw, 100vw"
                className="absolute inset-0 h-full w-full"
              />
              <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                  <clipPath id="hs-screen">
                    <polygon points={SCREEN} />
                  </clipPath>
                  <linearGradient id="hs-shine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* hide the generated (incorrect) tagline and show the registered logo instead */}
                <polygon points={SCREEN} fill="#fefefe" />
                <image href="/brand/logo-stacked.png" x="702" y="364" width="176" height="134" transform="rotate(-9 790 431)" preserveAspectRatio="xMidYMid meet" />
                <g clipPath="url(#hs-screen)">
                  <rect className="hs-shine" x="640" y="300" width="70" height="300" fill="url(#hs-shine)" transform="skewX(-12)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
