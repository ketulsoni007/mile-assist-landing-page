"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

/** Sticky table of contents with the current section highlighted, plus a reading-progress bar under the header. */
export function LegalToc({ toc }: { toc: { id: string; text: string }[] }) {
  const [active, setActive] = useState(toc[0]?.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      const art = document.getElementById("legal-article");
      if (!art) return;
      const r = art.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, -r.top / Math.max(1, total))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [toc]);

  const links = (
    <ol className="space-y-0.5">
      {toc.map((t, i) => (
        <li key={t.id}>
          <a
            href={`#${t.id}`}
            className={cn(
              "flex gap-2.5 rounded-xl px-3 py-2 text-sm leading-snug transition-colors",
              active === t.id ? "bg-brand-orange-soft font-bold text-brand-orange" : "text-muted hover:bg-surface-alt hover:text-heading",
            )}
          >
            <span className={cn("w-5 shrink-0 text-xs font-extrabold tabular-nums", active === t.id ? "text-brand-orange" : "text-muted/60")}>{String(i + 1).padStart(2, "0")}</span>
            <span>{t.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* reading progress */}
      <div className="fixed inset-x-0 top-0 z-[55] h-1" aria-hidden="true">
        <div className="h-full origin-left bg-gradient-to-r from-brand-orange to-[#ff8a3d] transition-transform duration-150" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {toc.length > 1 && (
        <>
          {/* mobile: collapsible */}
          <details className="mb-8 rounded-2xl border border-line bg-card/85 shadow-card backdrop-blur lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-4 font-bold text-heading [&::-webkit-details-marker]:hidden">
              <List className="size-4 text-brand-orange" /> On this page
            </summary>
            <div className="px-2 pb-3">{links}</div>
          </details>
          {/* desktop: sticky */}
          <nav aria-label="On this page" className="sticky top-28 hidden max-h-[calc(100vh-9rem)] overflow-y-auto rounded-3xl border border-line bg-card/85 p-3 shadow-card backdrop-blur lg:block">
            <p className="flex items-center gap-2 px-3 pb-2 pt-1 text-xs font-extrabold uppercase tracking-widest text-muted"><List className="size-3.5" /> On this page</p>
            {links}
          </nav>
        </>
      )}
    </>
  );
}
