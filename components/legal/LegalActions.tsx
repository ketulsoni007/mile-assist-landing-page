"use client";

import { useState } from "react";
import { Check, Link2, Printer } from "lucide-react";

/** Print and copy-link buttons for policy pages. */
export function LegalActions() {
  const [copied, setCopied] = useState(false);
  const btn = "inline-flex items-center gap-2 rounded-full border border-line bg-card/85 px-4 py-2.5 text-sm font-bold text-heading shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:border-brand-orange/50 hover:text-brand-orange print:hidden";
  return (
    <div className="flex gap-2.5">
      <button type="button" className={btn} onClick={() => window.print()}>
        <Printer className="size-4" /> Print
      </button>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href.split("#")[0]);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {}
        }}
      >
        {copied ? <Check className="size-4 text-emerald-500" /> : <Link2 className="size-4" />} {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
