import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { LogoHorizontal } from "@/components/brand/LogoHorizontal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { site } from "@/lib/seo";
import { mainNav } from "@/lib/nav";
import { FooterYear, BackToTop } from "./FooterClient";

const quickLinks = [{ href: "/", label: "Home" }, ...mainNav, { href: "/contact", label: "Contact Us" }];

// Same URLs as the current live site. The pages themselves still need to be added to this project.
const legalLinks = [
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-conditions", label: "Terms of Service" },
  { href: "/partner-agreement", label: "Partner Agreement" },
];

const socials = [
  { href: site.social.facebook, label: "Facebook", color: "#1877f2", d: "M22.675 0h-21.35C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" },
  { href: site.social.instagram, label: "Instagram", color: "#e1306c", d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" },
  { href: site.social.youtube, label: "YouTube", color: "#ff0000", d: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" },
];

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const cls =
    "group inline-flex items-center gap-0 text-[0.95rem] transition-[gap] duration-300 hover:gap-1.5 text-white/60 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none";
  const inner = (
    <>
      <span className="h-px w-0 bg-brand-orange transition-all duration-300 group-hover:w-3" aria-hidden="true" />
      {children}
    </>
  );
  return href.startsWith("/") ? <Link href={href} className={cls}>{inner}</Link> : <a href={href} className={cls}>{inner}</a>;
}

/** Site footer. Always dark (data-theme="dark" scopes the dark tokens, so the logo and cards use their dark colours). */
export function Footer() {
  return (
    <footer data-theme="dark" className="relative isolate overflow-hidden bg-[#050b1f] text-white" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Miles Assist footer</h2>

      {/* animated road along the top edge */}
      <div className="relative h-16" aria-hidden="true">
        <div className="absolute inset-x-0 top-6 h-10 bg-[#0d1736]" />
        <div className="ft-dash absolute inset-x-0 top-[2.6rem] h-[3px] opacity-70" style={{ backgroundImage: "repeating-linear-gradient(90deg, #fff 0 22px, transparent 22px 44px)", backgroundSize: "44px 3px" }} />
        <div className="ft-car absolute top-[1.15rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/car.svg" alt="" width={72} height={28} className="drop-shadow-[0_4px_8px_rgb(255_90_0/0.45)]" />
        </div>
      </div>

      {/* glows */}
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 size-[30rem] rounded-full bg-brand-orange/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-[28rem] rounded-full bg-[#2f6bff]/15 blur-3xl" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-5 pb-10 pt-12 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.1fr_1.4fr]">
          {/* brand */}
          <div>
            <Link href="/" aria-label="Miles Assist home" className="inline-block rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/10">
              <LogoHorizontal className="h-11 w-auto" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-white/60">
              Empowering intercity cab drivers with smart collaboration tools, route-based services, and transparent earning opportunities.
            </p>

            <ul className="mt-6 flex gap-3" aria-label="Miles Assist on social media">
              {socials.map(({ href, label, color, d }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Miles Assist on ${label}`}
                    className="group relative grid size-11 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:ring-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
                    style={{ ["--brand" as string]: color }}
                  >
                    <svg viewBox="0 0 24 24" className="size-5 fill-white/70 transition-all duration-300 group-hover:scale-110 group-hover:fill-white" aria-hidden="true">
                      <path d={d} />
                    </svg>
                    <span className="pointer-events-none absolute -z-10 size-11 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: color, boxShadow: `0 10px 24px -8px ${color}` }} />
                  </a>
                </li>
              ))}
            </ul>

            <p className="mb-3 mt-8 text-xs font-bold uppercase tracking-wider text-white/40">Get the driver app</p>
            <StoreBadges size="sm" />
          </div>

          {/* quick links */}
          <nav aria-label="Quick links">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand-orange" aria-hidden="true" />
            <ul className="mt-6 space-y-3.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* legal */}
          <nav aria-label="Legal and policies">
            <h3 className="text-lg font-bold">Legal &amp; Policies</h3>
            <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand-orange" aria-hidden="true" />
            <ul className="mt-6 space-y-3.5">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* contact */}
          <div>
            <h3 className="text-lg font-bold">Contact Us</h3>
            <span className="mt-2 block h-0.5 w-8 rounded-full bg-brand-orange" aria-hidden="true" />
            <address className="mt-6 space-y-3 not-italic">
              {[
                { Icon: MapPin, href: site.address.mapUrl, text: `${site.address.street}, ${site.address.city}, ${site.address.region} - ${site.address.postalCode}`, ext: true },
                { Icon: Mail, href: `mailto:${site.email}`, text: site.email, ext: false },
                { Icon: Phone, href: site.phoneHref, text: site.phone, ext: false },
              ].map(({ Icon, href, text, ext }) => (
                <a
                  key={text}
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-start gap-3 rounded-2xl p-2 -m-2 text-[0.95rem] text-white/60 transition hover:bg-white/5 hover:text-white"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-orange/15 text-brand-orange transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="size-4" />
                  </span>
                  <span className="pt-1.5 leading-snug">{text}</span>
                  {ext && <ArrowUpRight className="mt-2 size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />}
                </a>
              ))}
            </address>
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50 sm:flex-row">
          <p>
            © <FooterYear /> {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <span className="ft-heart inline-block text-brand-orange">♥</span> for drivers in India
          </p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}
