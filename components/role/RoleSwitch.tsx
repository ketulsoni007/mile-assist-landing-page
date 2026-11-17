"use client";

import { openRolePicker, useRole, type Role } from "@/lib/role";

const LABEL: Record<Role, string> = { driver: "Driver", restaurant: "Restaurant partner", hotel: "Hotel partner" };

/** Small "Viewing as: Driver · Change" line (footer). Reopens the role popup. */
export function RoleSwitch({ className }: { className?: string }) {
  const role = useRole();
  return (
    <button type="button" onClick={openRolePicker} className={`cursor-pointer underline-offset-4 transition hover:text-brand-orange hover:underline ${className ?? ""}`}>
      {role ? <>Viewing as: <span className="font-bold">{LABEL[role]}</span> · Change</> : "Choose your role"}
    </button>
  );
}
