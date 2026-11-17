import Link from "next/link";
import { ArrowRight, FileText, Handshake } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PARTNER_ROLES, partnerTermsPoints, partnerWords } from "@/lib/role-content";

/**
 * Home page, partner roles only: takes the place of the driver pricing plan (which does not apply to partners).
 * It does not quote fees; it points to the Partner Agreement, where the commission and payment terms are published.
 */
export function PartnerTerms() {
  return (
    <section data-role-only="restaurant hotel" aria-label="Partner terms" className="relative isolate overflow-hidden bg-gradient-to-b from-surface to-surface-alt py-24 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 size-[40rem] -translate-x-1/2 rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <Handshake className="size-3.5" /> Partner terms
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-heading sm:text-5xl">
              Clear terms for{" "}
              {PARTNER_ROLES.map((r) => (
                <span key={r} data-role-only={r} className="text-brand-orange">your {partnerWords[r].place}.</span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 text-lg text-body">
              You register online and manage everything from your partner dashboard. The commission on bills from guests that drivers bring you, the payment timelines and what the driver receives are all set out in the Partner Agreement.
            </p>
          </Reveal>
        </div>

        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {partnerTermsPoints.map(({ Icon, title, text }, i) => (
            <li key={title} className="h-full">
              <Reveal delay={0.1 + i * 0.08} className="h-full">
                <div className="group flex h-full flex-col rounded-3xl border border-line bg-card/85 p-6 shadow-card backdrop-blur transition hover:-translate-y-1">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-orange to-[#ff8a3d] text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"><Icon className="size-6" /></span>
                  <h3 className="mt-4 text-lg font-extrabold text-heading">{title}</h3>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">{text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.2} y={30}>
          <div className="soft-panel relative mx-auto mt-8 flex max-w-5xl flex-col items-center gap-5 overflow-hidden rounded-[2rem] p-7 text-center sm:p-9 md:flex-row md:text-left">
            <div className="pointer-events-none absolute inset-0 soft-panel-dots" aria-hidden="true" />
            <span className="relative grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-orange text-white shadow-lg"><FileText className="size-7" /></span>
            <div className="relative flex-1">
              <p className="text-xl font-extrabold">Read the Partner Agreement before you register</p>
              <p className="mt-1 text-body">It covers commission, payment timelines and partner responsibilities in full.</p>
            </div>
            <div className="relative flex shrink-0 flex-wrap justify-center gap-3">
              <Link href="/partner-agreement" className="inline-flex items-center gap-2 rounded-full border-2 border-brand-orange/60 px-5 py-3 text-sm font-extrabold text-brand-orange transition hover:bg-brand-orange hover:text-white">
                Partner Agreement
              </Link>
              <Link href="/partner#choose" className="group inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-extrabold text-white shadow-[0_14px_30px_-14px_rgb(255_90_0/0.6)] transition hover:-translate-y-0.5">
                Register now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
