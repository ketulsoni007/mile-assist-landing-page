"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const KEY = "theme";
type Theme = "light" | "dark";

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}
const getTheme = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
const getServerTheme = (): Theme => "light";

/**
 * Light/dark switch. Both icons are always rendered and swapped with the `dark:` variant,
 * so there is no icon flash before hydration; the inline ThemeScript sets the initial theme.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  const toggle = () => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.add("theme-switching"); // lets colours cross-fade, removed right after
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
    window.setTimeout(() => root.classList.remove("theme-switching"), 450);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-card text-heading shadow-card transition-transform duration-300 hover:scale-110 hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange active:scale-95",
        className,
      )}
    >
      <Moon className="absolute size-[18px] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
      <Sun className="absolute size-[18px] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
