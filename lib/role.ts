import { useSyncExternalStore } from "react";

/**
 * The visitor's role (driver / restaurant / hotel), picked in the welcome popup.
 *
 * Where it lives:
 *  - localStorage["ma-role"]: remembered across visits, so the popup asks only once.
 *  - <html data-role="...">: set before first paint by ROLE_SCRIPT (lib/role-script.ts, used in app/layout.tsx) and on every change,
 *    so CSS can show or hide role content with no flash (see the data-role-only rules in globals.css).
 *
 * How to use it for role-based content:
 *  - In a client component:  const role = useRole();   // "driver" | "restaurant" | "hotel" | null
 *  - In any component (server too), CSS only:  <div data-role-only="driver"> ... </div>
 *    (space-separate several roles; add "default" to also show it before a role is picked, e.g. "driver hotel default")
 */
import { ROLES, ROLE_KEY, type Role } from "./role-script";

export { ROLES, ROLE_KEY, type Role };
const CHANGE = "ma-role-change";
const OPEN = "ma-role-open";

const isRole = (v: unknown): v is Role => typeof v === "string" && (ROLES as readonly string[]).includes(v);

export function getRole(): Role | null {
  try {
    const v = localStorage.getItem(ROLE_KEY);
    return isRole(v) ? v : null;
  } catch {
    return null;
  }
}

export function setRole(role: Role | null) {
  try {
    if (role) localStorage.setItem(ROLE_KEY, role);
    else localStorage.removeItem(ROLE_KEY);
  } catch {
    /* private mode: the role still applies for this page view via the attribute below */
  }
  if (role) document.documentElement.setAttribute("data-role", role);
  else document.documentElement.removeAttribute("data-role");
  window.dispatchEvent(new Event(CHANGE));
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  window.addEventListener("storage", cb); // another tab changed it
  return () => {
    window.removeEventListener(CHANGE, cb);
    window.removeEventListener("storage", cb);
  };
}

/** The current role; null until the visitor picks one (and always null while server-rendering). */
export function useRole(): Role | null {
  return useSyncExternalStore(subscribe, getRole, () => null);
}

/** Opens the role popup from anywhere (e.g. the "Change" link in the footer). */
export function openRolePicker() {
  window.dispatchEvent(new Event(OPEN));
}

export function onOpenRolePicker(cb: () => void) {
  window.addEventListener(OPEN, cb);
  return () => window.removeEventListener(OPEN, cb);
}
