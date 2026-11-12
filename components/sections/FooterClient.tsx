"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Current year. Prerendered with the build year, then corrected in the browser (avoids a stale year on a static page). */
export function FooterYear() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      className="group inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 font-semibold text-white/70 ring-1 ring-white/10 transition hover:bg-brand-orange hover:text-white hover:ring-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
    >
      Back to top
      <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
