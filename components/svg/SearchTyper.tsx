"use client";

import { useEffect, useState } from "react";

const PHRASES = ["Search for hotels, food, fuel…", "Free meals near NH 48", "Partner hotels on your route", "Upload a bill for cashback"];

/** Typewriter placeholder for the search bar in the hero phone. Static for reduced motion. */
export function SearchTyper({ className }: { className?: string }) {
  const [text, setText] = useState(PHRASES[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let phrase = 0, len = PHRASES[0].length, deleting = true, timer = 0;
    const tick = () => {
      const target = PHRASES[phrase];
      if (deleting) {
        len--;
        if (len <= 0) { deleting = false; phrase = (phrase + 1) % PHRASES.length; }
      } else {
        len++;
        if (len >= PHRASES[phrase].length) { deleting = true; setText(PHRASES[phrase]); timer = window.setTimeout(tick, 2200); return; }
      }
      setText((deleting ? target : PHRASES[phrase]).slice(0, Math.max(0, len)));
      timer = window.setTimeout(tick, deleting ? 28 : 55);
    };
    timer = window.setTimeout(tick, 2600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <span className={className}>
      {text}
      <span className="ml-px inline-block h-[1em] w-px translate-y-[0.12em] animate-pulse bg-current align-baseline" />
    </span>
  );
}
