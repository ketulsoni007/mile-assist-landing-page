import { BadgeIndianRupee, Check, Smartphone, Utensils } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { QR } from "@/components/svg/qr-data";
import { AppStreetScene } from "@/components/svg/AppStreetScene";

function QrCard({ data, label }: { data: { size: number; path: string }; label: string }) {
  return (
    <figure className="group flex items-center gap-3 rounded-2xl bg-white p-2.5 pr-4 shadow-[0_14px_30px_-14px_rgb(0_0_0/0.45)] transition-transform duration-300 hover:-translate-y-1">
      <svg viewBox={`-2 -2 ${data.size + 4} ${data.size + 4}`} className="size-[76px] rounded-lg" role="img" aria-label={`QR code: ${label}`} shapeRendering="crispEdges">
        <rect x="-2" y="-2" width={data.size + 4} height={data.size + 4} fill="#fff" />
        <path d={data.path} fill="#081e4c" />
      </svg>
      <figcaption className="leading-tight">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#51607a]">Scan to get</span>
        <span className="block text-sm font-extrabold text-[#081e4c]">{label}</span>
      </figcaption>
    </figure>
  );
}

/** "Get the app" banner: orange card with store badges, QR codes and an animated road scene (car drives to the pin). */
export function GetApp() {
  return (
    <section id="download" aria-labelledby="download-title" className="relative bg-surface-alt py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal y={40}>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#ff7a1f] via-brand-orange to-[#e84c00] shadow-[0_40px_80px_-40px_rgb(255_90_0/0.75)]">
            {/* texture + glows */}
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background-image:radial-gradient(rgb(255_255_255/0.5)_1.2px,transparent_1.2px)] [background-size:22px_22px] [mask-image:linear-gradient(to_right,#000,transparent_70%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-white/20 blur-3xl" aria-hidden="true" />
            <div className="ga-glow pointer-events-none absolute -bottom-32 right-10 -z-10 size-96 rounded-full bg-[#ffd27a]/30 blur-3xl" aria-hidden="true" />

            <div className="grid items-center lg:grid-cols-[1.05fr_1fr]">
              {/* copy */}
              <div className="relative z-10 p-8 text-white sm:p-12">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold ring-1 ring-white/30 backdrop-blur">
                  <Smartphone className="size-3.5" /> Get the Miles Assist Driver app
                </span>
                <h2 id="download-title" className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
                  Free food &amp; stay,
                  <span className="block text-[#081e4c]">right in your pocket.</span>
                </h2>
                <p className="mt-4 max-w-md text-lg text-white/90">
                  Download the app, finish your KYC and enjoy your first month free. Partner stops, bill upload and cashback, all in one place.
                </p>

                <ul className="mt-6 grid gap-2.5 text-[0.95rem] font-semibold sm:grid-cols-2">
                  {["Partners on your route", "Bill upload & cashback", "Insurance & roadside help", "24/7 driver support"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-white text-brand-orange"><Check className="size-3" strokeWidth={3.2} /></span>
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

              {/* animated scene */}
              <div className="relative h-80 sm:h-[26rem] lg:h-full lg:min-h-[560px]" aria-hidden="true">
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
