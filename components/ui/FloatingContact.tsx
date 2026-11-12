"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquareText, X } from "lucide-react";
import { site } from "@/lib/seo";

const WA_TEXT = "Hi Miles Assist, I have a query.";
const waHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(WA_TEXT)}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88m8.41-18.29A11.81 11.81 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.94L.06 24l6.31-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.49-8.41" />
    </svg>
  );
}

/**
 * Two floating buttons, bottom-right on every page: WhatsApp chat (pre-filled message) and Contact Us.
 * They slide in after a moment, pulse to catch the eye, and a "Need help?" bubble pops up once per visit.
 */
export function FloatingContact() {
  const [show, setShow] = useState(false);
  const [bubble, setBubble] = useState(false);

  useEffect(() => {
    const t1 = window.setTimeout(() => setShow(true), 1200);
    let seen = false;
    try {
      seen = sessionStorage.getItem("ma-help-bubble") === "1";
    } catch {}
    const t2 = seen ? 0 : window.setTimeout(() => setBubble(true), 4500);
    const t3 = seen ? 0 : window.setTimeout(() => setBubble(false), 14000);
    return () => [t1, t2, t3].forEach((t) => window.clearTimeout(t));
  }, []);

  const dismiss = () => {
    setBubble(false);
    try {
      sessionStorage.setItem("ma-help-bubble", "1");
    } catch {}
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3.5 sm:bottom-6 sm:right-6"
        >
          {/* help bubble */}
          <AnimatePresence>
            {bubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                className="relative w-[15rem] rounded-2xl border border-line bg-card p-3.5 pr-8 shadow-[0_18px_40px_-14px_rgb(8_30_76/0.45)]"
                role="status"
              >
                <button type="button" onClick={dismiss} aria-label="Close" className="absolute right-2 top-2 grid size-6 place-items-center rounded-full text-muted hover:bg-surface-alt hover:text-heading">
                  <X className="size-3.5" />
                </button>
                <p className="text-sm font-extrabold text-heading">Need help? 👋</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">Chat with us on WhatsApp or send us a message. We&apos;re happy to help.</p>
                <span className="absolute -bottom-1.5 right-5 size-3 rotate-45 border-b border-r border-line bg-card" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contact Us */}
          <Link href="/contact#contact" onClick={dismiss} aria-label="Contact Us" className="fc-btn group relative grid size-14 place-items-center rounded-full bg-gradient-to-br from-[#ff7a2e] to-brand-orange text-white shadow-[0_12px_28px_-10px_rgb(255_90_0/0.75)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-orange">
            <MessageSquareText className="fc-wiggle size-6" />
            <span className="fc-tip" aria-hidden="true">Contact Us</span>
          </Link>

          {/* WhatsApp */}
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={dismiss} aria-label="Chat with Miles Assist on WhatsApp" className="fc-btn group relative grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_28px_-10px_rgb(37_211_102/0.85)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25d366]" style={{ animationDelay: "0.2s" }}>
            <span className="fc-ring pointer-events-none absolute inset-0 rounded-full bg-[#25d366]" aria-hidden="true" />
            <span className="fc-ring pointer-events-none absolute inset-0 rounded-full bg-[#25d366]" style={{ animationDelay: "1s" }} aria-hidden="true" />
            <WhatsAppIcon className="relative size-7" />
            <span className="fc-tip" aria-hidden="true">WhatsApp us</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
