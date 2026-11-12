import Link from "next/link";
import { CalendarDays, ChevronRight, FileText, Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { legalPages } from "@/lib/legal";
import { site } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { LegalToc } from "./LegalToc";
import { LegalActions } from "./LegalActions";

type Props = {
  title: string;
  updated?: string;
  summary?: string;
  eyebrow?: string;
  href: string;
  toc: { id: string; text: string }[];
  children: React.ReactNode;
};

/** Shared layout for all legal / policy pages. */
export function LegalLayout({ title, updated, summary, eyebrow, href, toc, children }: Props) {
  const hasToc = toc.length > 1;
  return (
    <main>
      <section aria-labelledby="legal-title" className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pb-14 pt-32 lg:pt-36">
        <div className="pointer-events-none absolute -left-40 top-24 -z-10 size-[28rem] rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-10 -z-10 size-[30rem] rounded-full bg-[#2f6bff]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background-image:radial-gradient(var(--color-line)_1.2px,transparent_1.2px)] [background-size:1.6rem_1.6rem] [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)]" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm font-medium text-muted">
              <Link href="/" className="hover:text-brand-orange">Home</Link>
              <ChevronRight className="size-3.5" />
              <span className="text-heading" aria-current="page">{title}</span>
            </nav>
          </Reveal>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Reveal delay={0.06}>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
                  <FileText className="size-3.5" /> {eyebrow ?? "Legal"}
                </span>
              </Reveal>
              <Reveal delay={0.12}>
                <h1 id="legal-title" className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">{title}</h1>
              </Reveal>
              {summary && <Reveal delay={0.18}><p className="mt-4 text-lg text-body">{summary}</p></Reveal>}
              {updated && (
                <Reveal delay={0.22}>
                  <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/80 px-4 py-2 text-sm font-semibold text-heading shadow-card backdrop-blur">
                    <CalendarDays className="size-4 text-brand-orange" /> Last updated: {updated}
                  </p>
                </Reveal>
              )}
            </div>
            <Reveal delay={0.25}><LegalActions /></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-surface pb-24 pt-10 lg:pt-14">
        <div className={cn("mx-auto grid max-w-7xl gap-10 px-5 lg:px-8", hasToc && "lg:grid-cols-[17rem_minmax(0,1fr)] xl:grid-cols-[19rem_minmax(0,1fr)]")}>
          {hasToc && <aside><LegalToc toc={toc} /></aside>}
          {!hasToc && <LegalToc toc={toc} />}

          <div className="min-w-0">
            <article id="legal-article" className="rounded-[2rem] border border-line bg-card/85 p-6 shadow-card backdrop-blur sm:p-10 lg:p-12">
              {children}
            </article>

            {/* help card */}
            <div className="mt-8 grid gap-5 rounded-[2rem] bg-gradient-to-br from-[#ff7a1f] via-brand-orange to-[#e84c00] p-7 text-white shadow-[0_30px_70px_-35px_rgb(255_90_0/0.7)] sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
              <div>
                <p className="text-2xl font-extrabold">Questions about this policy?</p>
                <p className="mt-1 text-white/90">Our team is happy to help. Reach out any time.</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-brand-orange transition hover:-translate-y-0.5"><Mail className="size-4" /> Email</a>
                <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-sm font-extrabold ring-1 ring-white/40 transition hover:bg-white/25"><Phone className="size-4" /> Call</a>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-sm font-extrabold ring-1 ring-white/40 transition hover:bg-white/25"><MessageCircle className="size-4" /> WhatsApp</a>
              </div>
            </div>

            {/* related policies */}
            <nav aria-label="Other policies" className="mt-8">
              <p className="text-xs font-extrabold uppercase tracking-widest text-muted">Other policies</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {legalPages.filter((p) => p.href !== href).map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card/80 px-4 py-2 text-sm font-semibold text-heading transition hover:-translate-y-0.5 hover:border-brand-orange/50 hover:text-brand-orange">
                      <FileText className="size-3.5" /> {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
