"use client";

import { BedDouble, Car, ChevronRight, Repeat2, UsersRound, Utensils, type LucideIcon } from "lucide-react";
import { openRolePicker } from "@/lib/role";
import { cn } from "@/lib/utils";

/**
 * Header control that shows the visitor's current role and reopens the role popup.
 * Every role's icon/label is rendered and CSS shows the right one (data-role-only, see globals.css),
 * so the correct icon is there from first paint with no flash after hydration.
 *  - variant "icon": round button for the desktop header, with a tooltip.
 *  - variant "row":  full-width row for the mobile menu.
 */
const VIEWS: { show: string; Icon: LucideIcon; label: string; color: string }[] = [
  { show: "default", Icon: UsersRound, label: "Choose your role", color: "#ff5a00" },
  { show: "driver", Icon: Car, label: "Driver", color: "#ff5a00" },
  { show: "restaurant", Icon: Utensils, label: "Restaurant partner", color: "#7c5cff" },
  { show: "hotel", Icon: BedDouble, label: "Hotel partner", color: "#2f6bff" },
];

export function RoleButton({ variant = "icon", className, onOpen }: { variant?: "icon" | "row"; className?: string; onOpen?: () => void }) {
  const open = () => {
    onOpen?.();
    openRolePicker();
  };

  if (variant === "row") {
    return (
      <button type="button" onClick={open} className={cn("flex w-full cursor-pointer items-center gap-3 rounded-xl border border-line bg-card/70 px-3 py-2.5 text-left transition hover:border-brand-orange/50", className)}>
        {VIEWS.map(({ show, Icon, label, color }) => (
          <span key={show} data-role-only={show} className="flex min-w-0 flex-1 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 60%, #fff))` }}>
              <Icon className="size-5" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-xs font-medium text-muted">{show === "default" ? "Personalise the site" : "Viewing as"}</span>
              <span className="block truncate font-bold text-heading">{label}</span>
            </span>
          </span>
        ))}
        <span className="flex shrink-0 items-center gap-0.5 text-sm font-bold text-brand-orange">
          <span data-role-only="driver restaurant hotel">Change</span>
          <span data-role-only="default">Choose</span>
          <ChevronRight className="size-4" />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Change your role"
      className={cn(
        "group relative grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-card text-heading shadow-card transition-transform duration-300 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange",
        className,
      )}
    >
      {VIEWS.map(({ show, Icon, color }) => (
        <span key={show} data-role-only={show} className="grid place-items-center" style={{ color }}>
          <Icon className="size-[1.125rem]" />
        </span>
      ))}
      {/* small "switch" badge so it reads as changeable, not just a status icon */}
      <span className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full bg-brand-orange text-white ring-2 ring-surface" aria-hidden="true">
        <Repeat2 className="size-2.5" strokeWidth={3} />
      </span>
      {/* tooltip */}
      <span className="pointer-events-none absolute right-0 top-[calc(100%+0.6rem)] z-10 origin-top-right scale-90 whitespace-nowrap rounded-xl bg-heading px-3 py-2 text-left text-xs font-semibold text-surface opacity-0 shadow-lg transition duration-200 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" role="tooltip">
        {VIEWS.map(({ show, label }) => (
          <span key={show} data-role-only={show} className="block">
            {show === "default" ? (
              "Choose your role"
            ) : (
              <>
                <span className="block font-medium opacity-70">Viewing as</span>
                <span className="block text-sm font-extrabold">{label}</span>
                <span className="mt-0.5 block text-brand-orange">Click to change</span>
              </>
            )}
          </span>
        ))}
      </span>
    </button>
  );
}
