"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Starts the CSS animations inside it only once it scrolls into view (and pauses them again when it
 * leaves), via data-play. CSS in app/features.css: `.fm-*` animations run only under [data-play].
 */
export function PlayOnView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  return (
    <div ref={ref} data-play={inView ? "" : undefined} className={cn("fm", className)}>
      {children}
    </div>
  );
}
