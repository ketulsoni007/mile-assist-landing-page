"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

/** true in light theme. SSR / first render assume light; the inline ThemeScript has already set the real theme. */
export function useIsLight() {
  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.getAttribute("data-theme") !== "dark",
    () => true,
  );
}
