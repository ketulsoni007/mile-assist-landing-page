import { Fragment } from "react";
import { Hash } from "lucide-react";
import type { Block } from "@/lib/legal";

/** Inline formatting: **bold**, plus clickable emails and +91 phone numbers. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|[\w.+-]+@[\w-]+\.[\w.]+|\+91[-\s]?\d[\d\s-]{8,12}\d)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith("**") && p.endsWith("**")) return <strong key={i} className="font-extrabold text-heading">{p.slice(2, -2)}</strong>;
        if (/^[\w.+-]+@[\w-]+\.[\w.]+$/.test(p)) return <a key={i} href={`mailto:${p}`} className="font-semibold text-brand-orange underline decoration-brand-orange/30 underline-offset-2 hover:decoration-brand-orange">{p}</a>;
        if (/^\+91/.test(p)) return <a key={i} href={`tel:${p.replace(/[^\d+]/g, "")}`} className="font-semibold text-brand-orange underline decoration-brand-orange/30 underline-offset-2 hover:decoration-brand-orange">{p}</a>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export function LegalBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="legal-body">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="group mt-12 scroll-mt-28 border-t border-line pt-10 text-2xl font-extrabold tracking-tight text-heading first:mt-0 first:border-0 first:pt-0 sm:text-[1.7rem]">
                <a href={`#${b.id}`} className="inline-flex items-center gap-2">
                  {b.text}
                  <Hash className="size-5 text-brand-orange opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </a>
              </h2>
            );
          case "h3":
            return <h3 key={i} id={b.id} className="mt-8 scroll-mt-28 text-lg font-extrabold text-heading">{b.text}</h3>;
          case "p":
            return <p key={i} className="mt-4 leading-[1.8] text-body"><Inline text={b.text} /></p>;
          case "quote":
            return (
              <blockquote key={i} className="mt-6 rounded-2xl border-l-4 border-brand-orange bg-brand-orange-soft px-5 py-4 font-semibold italic leading-relaxed text-heading">
                <Inline text={b.text} />
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="mt-4 space-y-2.5">
                {b.items.map((it, k) => (
                  <li key={k} className="flex gap-3 leading-[1.7] text-body">
                    <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-brand-orange" aria-hidden="true" />
                    <span><Inline text={it} /></span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 space-y-3">
                {b.items.map((it, k) => (
                  <li key={k} className="flex gap-4 rounded-2xl border border-line bg-surface-alt/60 p-4 leading-[1.7] text-body">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-orange to-[#ff8a3d] text-sm font-extrabold text-white">{k + 1}</span>
                    <span className="pt-0.5"><Inline text={it} /></span>
                  </li>
                ))}
              </ol>
            );
        }
      })}
    </div>
  );
}
