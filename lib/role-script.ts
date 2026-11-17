// Server-safe part of the visitor role (no React hooks here, so app/layout.tsx can import it). The rest is in lib/role.ts.
export const ROLES = ["driver", "restaurant", "hotel"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_KEY = "ma-role";

/** Runs in <head> before first paint: copies the saved role onto <html data-role>. */
export const ROLE_SCRIPT = `(function(){try{var r=localStorage.getItem("${ROLE_KEY}");if(${ROLES.map((r) => `r==="${r}"`).join("||")})document.documentElement.setAttribute("data-role",r)}catch(e){}})()`;
