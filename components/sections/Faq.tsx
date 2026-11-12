import { CircleHelp, Headset, MessageCircleQuestion } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/lib/faq";
import { jsonLdString } from "@/lib/seo";
import { FaqAccordion } from "./FaqAccordion";

// FAQ rich results: answers are rendered on the page too, as Google requires.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative isolate overflow-hidden bg-gradient-to-b from-surface-alt to-surface py-24 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(faqJsonLd) }} />
      <div className="pointer-events-none absolute -left-32 top-24 -z-10 size-[28rem] rounded-full bg-brand-orange/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 size-[26rem] rounded-full bg-[#2f6bff]/10 blur-3xl" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-16 lg:px-8">
        {/* left: heading + animated help bubble + contact card (sticky on desktop) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <CircleHelp className="size-3.5" /> Got Questions?
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="faq-title" className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-heading sm:text-5xl">
              Frequently Asked <span className="block text-brand-orange">Questions</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-4 max-w-sm text-lg text-body">Everything drivers and partners usually ask about Miles Assist.</p>
          </Reveal>

          {/* floating question bubbles */}
          <Reveal delay={0.2} className="relative mt-10 hidden h-40 lg:block" aria-hidden="true">
            <span className="fq-bubble absolute left-2 top-6 grid size-24 place-items-center rounded-[2rem] rounded-bl-md bg-gradient-to-br from-brand-orange to-[#ff8a3d] text-5xl font-extrabold text-white shadow-glow">?</span>
            <span className="fq-bubble absolute left-32 top-0 grid size-16 place-items-center rounded-3xl rounded-br-md bg-card text-brand-orange shadow-card ring-1 ring-line" style={{ animationDelay: "-1.4s" }}>
              <MessageCircleQuestion className="size-8" />
            </span>
            <span className="fq-bubble absolute left-48 top-20 grid size-12 place-items-center rounded-2xl rounded-tl-md bg-[#2f6bff] text-xl font-extrabold text-white shadow-lg" style={{ animationDelay: "-2.6s" }}>!</span>
            <span className="fq-dots absolute left-[7.5rem] top-[6.5rem] flex gap-1.5 rounded-full bg-card px-3 py-2 shadow-card ring-1 ring-line">
              <i className="size-2 rounded-full bg-brand-orange" /><i className="size-2 rounded-full bg-brand-orange" /><i className="size-2 rounded-full bg-brand-orange" />
            </span>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 rounded-3xl border border-line bg-card/80 p-6 shadow-card backdrop-blur-md">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-orange-soft text-brand-orange">
                <Headset className="size-6" />
              </span>
              <h3 className="mt-4 text-xl font-extrabold text-heading">Still have questions?</h3>
              <p className="mt-1.5 text-sm text-muted">Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.</p>
              <Button href="#contact" size="md" className="mt-5">Contact Support</Button>
            </div>
          </Reveal>
        </div>

        {/* right: accordion */}
        <FaqAccordion />
      </div>
    </section>
  );
}
