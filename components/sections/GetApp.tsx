import Link from "next/link";
import { ArrowRight, BadgeIndianRupee, Check, Smartphone, Store, Utensils } from "lucide-react";
import { PARTNER_ROLES, partnerBannerTicks, partnerWords } from "@/lib/role-content";
import { Reveal } from "@/components/motion/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { QR } from "@/components/svg/qr-data";
import { AppStreetScene } from "@/components/svg/AppStreetScene";

function QrCard({ data, label }: { data: { size: number; path: string }; label: string }) {
  return (
    <figure className="group flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-4 shadow-[0_14px_30px_-16px_rgb(8_30_76/0.35)] ring-1 ring-[#081e4c]/10 transition-transform duration-300 hover:-translate-y-1">
      <svg viewBox={`-2 -2 ${data.size + 4} ${data.size + 4}`} className="size-[4.75rem] rounded-lg" role="img" aria-label={`QR code: ${label}`} shapeRendering="crispEdges">
        <rect x="-2" y="-2" width={data.size + 4} height={data.size + 4} fill="#fff" />
        <path d={data.path} fill="#081e4c" />
      </svg>
      <figcaption className="leading-tight">
        <span className="block text-[0.6875rem] font-semibold uppercase tracking-wide text-[#51607a]">Scan to get</span>
        <span className="block text-sm font-extrabold text-[#081e4c]">{label}</span>
      </figcaption>
    </figure>
  );
}

/** "Get the app" banner: soft themed card (see .soft-panel) with store badges, QR codes and an animated road scene (car drives to the pin). */
export function GetApp() {
  return (
    <section id="download" aria-label="Get started" className="relative bg-surface-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div className="relative isolate overflow-hidden rounded-[2rem] soft-panel">
            {/* texture + glows */}
            <div className="pointer-events-none absolute inset-0 -z-10 soft-panel-dots [mask-image:linear-gradient(to_right,#000,transparent_70%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
            <div className="ga-glow pointer-events-none absolute -bottom-32 right-10 -z-10 size-96 rounded-full bg-[#ffd27a]/15 blur-3xl" aria-hidden="true" />

            <div className="grid items-center lg:grid-cols-[1.05fr_1fr]">
              {/* copy */}
              <div data-role-only="driver default" className="relative z-10 p-8 sm:p-12">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/25">
                  <Smartphone className="size-3.5" /> Get the Miles Assist Driver app
                </span>
                <h2 id="download-title" className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                  Free food &amp; stay,
                  <span className="block text-brand-orange">right in your pocket.</span>
                </h2>
                <p className="mt-4 max-w-md text-lg text-body">
                  Download the app, finish your KYC and enjoy your first month free. Partner stops, bill upload and cashback, all in one place.
                </p>

                <ul className="mt-6 grid gap-2.5 text-[0.95rem] font-semibold sm:grid-cols-2">
                  {["Partners on your route", "Bill upload & cashback", "Insurance & roadside help", "24/7 driver support"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-orange text-white"><Check className="size-3" strokeWidth={3.2} /></span>
                      {t}
                    </li>
                  ))}
                </ul>

                <StoreBadges className="mt-8" />

                <div className="mt-7 hidden gap-4 lg:flex">
                  <QrCard data={QR.play} label="Android app" />
                  <QrCard data={QR.apple} label="iPhone app" />
                </div>
              </div>

              {/* partners register on the web, so they get a "get listed" version instead of the app download */}
              {PARTNER_ROLES.map((r) => {
                const w = partnerWords[r];
                return (
                  <div key={r} data-role-only={r} className="relative z-10 p-8 sm:p-12">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/25">
                      <Store className="size-3.5" /> Partner registration
                    </span>
                    <h2 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                      Your {w.place},
                      <span className="block text-brand-orange">on every driver&apos;s route.</span>
                    </h2>
                    <p className="mt-4 max-w-md text-lg text-body">
                      Register online in a few minutes. Verify your mobile number, complete your profile and go live once you are verified.
                    </p>
                    <ul className="mt-6 grid gap-2.5 text-[0.95rem] font-semibold sm:grid-cols-2">
                      {partnerBannerTicks.map((t) => (
                        <li key={t} className="flex items-center gap-2">
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-orange text-white"><Check className="size-3" strokeWidth={3.2} /></span>
                          {t}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <a href={w.registerHref} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_14px_30px_-14px_rgb(255_90_0/0.6)] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange">
                        Register as {w.title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </a>
                      <Link href="/partner" className="inline-flex items-center gap-2 rounded-full border-2 border-brand-orange/60 px-6 py-3 text-sm font-extrabold text-brand-orange transition hover:bg-brand-orange hover:text-white">
                        How partnering works
                      </Link>
                    </div>
                    <p className="mt-4 text-xs text-muted">Registration opens on app.milesassist.com in a new tab.</p>
                  </div>
                );
              })}

              {/* animated scene */}
              <div className="relative h-80 sm:h-[26rem] lg:h-full lg:min-h-[35rem]" aria-hidden="true">
                <AppStreetScene className="absolute inset-0 size-full [mask-image:linear-gradient(to_right,transparent,#000_14%)]" />

                {/* reward toasts popping up along the way */}
                <div className="ga-toast absolute left-[6%] top-[6%] hidden items-center sm:flex gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-xl">
                  <span className="grid size-8 place-items-center rounded-xl bg-brand-orange text-white"><Utensils className="size-4" /></span>
                  <span className="leading-tight">
                    <span className="block text-sm font-extrabold text-[#081e4c]">Free meal unlocked</span>
                    <span className="block text-xs font-medium text-[#51607a]">Partner dhaba · 2 km</span>
                  </span>
                </div>
                <div className="ga-toast absolute right-[24%] top-[22%] hidden items-center sm:flex gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-xl" style={{ animationDelay: "-3.5s" }}>
                  <span className="grid size-8 place-items-center rounded-xl bg-emerald-500 text-white"><BadgeIndianRupee className="size-4" /></span>
                  <span className="leading-tight">
                    <span className="block text-sm font-extrabold text-[#081e4c]">Cashback credited</span>
                    <span className="block text-xs font-medium text-[#51607a]">Bill verified</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
