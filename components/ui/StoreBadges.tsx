import { site } from "@/lib/seo";
import { cn } from "@/lib/utils";

/* Store marks (Apple logo; Google Play's four-colour triangle). */
function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function PlayMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M3.6 1.8C3.2 2.2 3 2.8 3 3.5v16.6c0 .7.2 1.3.6 1.7l10-10z" fill="#4285f4" />
      <path d="M3.6 1.8l10 10 3.3-3.3-11-6.3c-.9-.5-1.7-.8-2.3-.4z" fill="#34a853" />
      <path d="M3.6 21.8l10-10 3.3 3.3-11 6.3c-.9.5-1.7.8-2.3.4z" fill="#ea4335" />
      <path d="M16.9 8.5l3.7 2.1c1.2.7 1.2 1.7 0 2.4l-3.7 2.1-3.3-3.3z" fill="#fbbc04" />
    </svg>
  );
}

type BadgeProps = { size?: "sm" | "md"; className?: string };

function Badge({ href, label, small, big, mark, size = "md", className }: BadgeProps & { href: string; label: string; small: string; big: string; mark: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group relative inline-flex items-center overflow-hidden rounded-2xl bg-[#0b0f19] text-white ring-1 ring-white/15 shadow-[0_10px_24px_-10px_rgb(0_0_0/0.55)] transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-[0_18px_34px_-12px_rgb(255_90_0/0.55)] hover:ring-brand-orange/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange active:translate-y-0 active:scale-[0.98]",
        size === "sm" ? "h-12 gap-2.5 px-3.5" : "h-14 gap-3 px-4",
        className,
      )}
    >
      {/* light sweep on hover */}
      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-none group-hover:animate-[sb-shine_0.9s_ease-out] group-hover:opacity-100" />
      <span className={cn("transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110", size === "sm" ? "[&>svg]:size-6" : "[&>svg]:size-7")}>{mark}</span>
      <span className="text-left leading-none">
        <span className={cn("block font-medium uppercase tracking-wide text-white/75", size === "sm" ? "text-[9px]" : "text-[10px]")}>{small}</span>
        <span className={cn("mt-1 block font-bold tracking-tight", size === "sm" ? "text-[15px]" : "text-lg")}>{big}</span>
      </span>
    </a>
  );
}

export function PlayStoreBadge(props: BadgeProps) {
  return <Badge {...props} href={site.playStoreUrl} label="Get Miles Assist Driver on Google Play" small="Get it on" big="Google Play" mark={<PlayMark />} />;
}

export function AppStoreBadge(props: BadgeProps) {
  return <Badge {...props} href={site.appStoreUrl} label="Download Miles Assist Driver on the App Store" small="Download on the" big="App Store" mark={<AppleMark />} />;
}

export function StoreBadges({ size = "md", className }: BadgeProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <PlayStoreBadge size={size} />
      <AppStoreBadge size={size} />
    </div>
  );
}
