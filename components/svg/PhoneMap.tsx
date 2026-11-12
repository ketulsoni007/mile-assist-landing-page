import { Hotel, Utensils } from "lucide-react";

/**
 * Street map shown inside the hero phone (viewBox 220 x 300, sized to the phone's map area so nothing important
 * is cropped; keep key content inside x 30..170). Pure SVG + CSS animation: the blue route draws itself, a
 * navigation arrow drives along it, partner pins pop up on the way and the destination pin drops in.
 * Colours come from --map-* variables, so it switches with the theme.
 * If you change MAP_ROUTE, update the offset-path of .pm-nav in app/hero-scene.css too.
 */
export const MAP_ROUTE = "M96 312L96 204Q96 180 120 180L128 180Q152 180 152 156L152 92";

export function PhoneMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 300" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="220" height="300" style={{ fill: "var(--map-bg)" }} />

      {/* city blocks */}
      <g style={{ fill: "var(--map-block-2)" }}>
        <rect x="20" y="8" width="66" height="54" rx="5" /><rect x="104" y="8" width="40" height="54" rx="5" />
        <rect x="20" y="80" width="30" height="40" rx="5" /><rect x="104" y="80" width="40" height="88" rx="5" />
        <rect x="160" y="190" width="50" height="52" rx="5" /><rect x="104" y="192" width="40" height="50" rx="5" />
        <rect x="160" y="258" width="50" height="50" rx="5" /><rect x="20" y="258" width="64" height="50" rx="5" />
      </g>

      {/* parks */}
      <g style={{ fill: "var(--map-park)" }}>
        <rect x="160" y="8" width="50" height="54" rx="9" />
        <rect x="160" y="80" width="50" height="40" rx="9" />
        <rect x="104" y="258" width="40" height="44" rx="9" />
        <circle cx="72" cy="100" r="13" />
      </g>

      {/* river */}
      <path d="M-10 130C28 136 50 168 46 204S60 266 92 312" fill="none" strokeWidth="13" strokeLinecap="round" style={{ stroke: "var(--map-water)" }} />

      {/* streets */}
      <g fill="none" strokeLinecap="round" style={{ stroke: "var(--map-street)" }}>
        <g strokeWidth="7">
          <path d="M-4 71H226M-4 180H226M96 -4V312M152 -4V312" />
        </g>
        <g strokeWidth="3.4" opacity="0.9">
          <path d="M-4 130H90M100 130H226M-4 250H226M58 -4V170M200 -4V312M30 180V312" />
        </g>
      </g>

      {/* route: white casing, then a blue line that draws itself */}
      <path d={MAP_ROUTE} fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d={MAP_ROUTE} pathLength={1} fill="none" stroke="#2f6bff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="pm-route" />

      {/* partner pins along the route */}
      <g className="pm-pop">
        <circle cx="96" cy="236" r="10" fill="#ff5a00" stroke="#fff" strokeWidth="2" />
        <Utensils x={90.5} y={230.5} width={11} height={11} color="#fff" strokeWidth={2.4} />
      </g>
      <g className="pm-pop" style={{ animationDelay: "0.6s" }}>
        <circle cx="152" cy="128" r="10" fill="#7c5cff" stroke="#fff" strokeWidth="2" />
        <Hotel x={146.5} y={122.5} width={11} height={11} color="#fff" strokeWidth={2.4} />
      </g>

      {/* destination pin */}
      <g className="pm-dest">
        <ellipse cx="152" cy="92" rx="6" ry="2.4" fill="#000" opacity="0.18" />
        <path d="M152 92C152 92 140 78 140 69A12 12 0 1 1 164 69C164 78 152 92 152 92Z" fill="#ff5a00" stroke="#fff" strokeWidth="2" />
        <circle cx="152" cy="69" r="4.5" fill="#fff" />
      </g>

      {/* navigation arrow driving the route */}
      <g className="pm-nav">
        <circle r="14" fill="#2f6bff" opacity="0.18" className="pm-ping" />
        <circle r="10" fill="#fff" />
        <circle r="8" fill="#2f6bff" />
        <path d="M5 0L-3.5 -4.5L-1.5 0L-3.5 4.5Z" fill="#fff" />
      </g>
    </svg>
  );
}
