import Image from "next/image";
import { CheckCheck, Headset, Mail, MessageCircle, Phone, Send } from "lucide-react";

/**
 * Animated support-chat illustration for the Contact section. A small chat window plays a short
 * conversation on a 10s loop (visitor asks, agent types, agent replies, a "callback booked" chip pops),
 * with the contact channels (call, mail, WhatsApp-style chat) orbiting the window. CSS only ("sc-*" classes).
 * Real markup (not a picture), so it follows the light/dark theme and stays crisp.
 */
export function SupportChat({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative w-full max-w-[30rem] pr-5 pt-6">
        {/* soft glow + orbit ring */}
        <div className="absolute inset-6 -z-10 rounded-full bg-brand-orange/15 blur-3xl" />
        <div className="sc-orbit pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-brand-orange/25" />

        {/* orbiting channel badges */}
        <span className="sc-chip absolute -left-5 top-[42%] z-10 grid size-12 place-items-center rounded-2xl bg-[#16a34a] text-white shadow-lg" style={{ animationDelay: "0s" }}>
          <Phone className="size-5" />
        </span>
        <span className="sc-chip absolute -right-3 top-24 z-10 grid size-12 place-items-center rounded-2xl bg-[#2f6bff] text-white shadow-lg" style={{ animationDelay: "-1.6s" }}>
          <Mail className="size-5" />
        </span>
        <span className="sc-chip absolute -right-4 bottom-20 z-10 grid size-11 place-items-center rounded-2xl bg-brand-orange text-white shadow-lg" style={{ animationDelay: "-3.2s" }}>
          <MessageCircle className="size-5" />
        </span>

        {/* chat window */}
        <div className="relative overflow-hidden rounded-3xl border border-white/70 bg-card/90 shadow-[0_30px_70px_-30px_rgb(8_30_76/0.45)] ring-1 ring-line backdrop-blur-xl dark:border-white/10">
          {/* header */}
          <div className="flex items-center gap-3 border-b border-line bg-gradient-to-r from-brand-orange to-[#ff8a3d] px-4 py-3 text-white">
            <span className="relative grid size-10 place-items-center rounded-full bg-white/20 ring-2 ring-white/50">
              <Headset className="size-5" />
              <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-400 ring-2 ring-[#ff7a2e]" />
            </span>
            <span className="flex-1 leading-tight">
              <span className="block text-sm font-extrabold">Miles Assist Support</span>
              <span className="flex items-center gap-1 text-[0.6875rem] font-semibold text-white/90">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" /> Online now
              </span>
            </span>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wide ring-1 ring-white/40">24/7</span>
          </div>

          {/* conversation */}
          <div className="relative h-[17rem] space-y-3 bg-surface-alt/60 p-4 text-[0.8125rem] leading-snug">
            {/* visitor */}
            <div className="sc-msg flex items-end justify-end gap-2" style={{ ["--t" as string]: "0.4s" }}>
              <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#081e4c] px-3.5 py-2.5 text-white shadow-md dark:bg-[#2a3d78]">
                Hi! I run a dhaba on NH 48. How can we become a partner?
                <span className="mt-1 flex items-center justify-end gap-1 text-[0.625rem] text-white/70">10:42 <CheckCheck className="size-3.5 text-sky-300" /></span>
              </div>
            </div>

            {/* agent typing, then reply */}
            <div className="flex items-end gap-2">
              <Image src="/users/avatar-6.webp" alt="" width={28} height={28} className="sc-msg size-7 shrink-0 rounded-full object-cover" style={{ ["--t" as string]: "1.6s" }} />
              <div className="relative">
                <div className="sc-typing absolute bottom-0 left-0 flex gap-1 rounded-2xl rounded-bl-md bg-card px-3.5 py-3 shadow-md ring-1 ring-line">
                  <i className="size-1.5 rounded-full bg-muted" /><i className="size-1.5 rounded-full bg-muted" /><i className="size-1.5 rounded-full bg-muted" />
                </div>
                <div className="sc-msg max-w-[16rem] rounded-2xl rounded-bl-md bg-card px-3.5 py-2.5 text-heading shadow-md ring-1 ring-line" style={{ ["--t" as string]: "3.4s" }}>
                  Great to hear! 🙌 Our partner team will call you to set up driver footfall and bill tracking.
                  <span className="mt-1 block text-right text-[0.625rem] text-muted">10:43</span>
                </div>
              </div>
            </div>

            {/* confirmation chip */}
            <div className="sc-pop flex justify-center" style={{ ["--t" as string]: "5.2s" }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-600 ring-1 ring-emerald-500/30 dark:text-emerald-400">
                <Phone className="size-3.5" /> Callback booked
              </span>
            </div>
          </div>

          {/* composer */}
          <div className="flex items-center gap-2 border-t border-line bg-card px-3 py-2.5">
            <span className="flex-1 rounded-full bg-surface-alt px-4 py-2 text-xs text-muted ring-1 ring-line">Type your message…</span>
            <span className="sc-send grid size-9 place-items-center rounded-full bg-brand-orange text-white shadow-glow">
              <Send className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
