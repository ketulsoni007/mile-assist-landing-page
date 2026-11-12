import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { loadLegal } from "@/lib/legal";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalBody } from "@/components/legal/LegalBody";
import { PartnerAgreementTabs } from "@/components/legal/PartnerAgreementTabs";

export const metadata: Metadata = {
  title: "Partner Agreement – Hotels & Restaurants",
  description: "The Miles Assist partner agreement for hotels and restaurants: benefits, background, commission, driver facility, payment terms and termination.",
  alternates: { canonical: "/partner-agreement" },
};

export default function Page() {
  const hotel = loadLegal("partner-agreement-hotel", "hotel-");
  const restaurant = loadLegal("partner-agreement-restaurant", "restaurant-");
  return (
    <LegalLayout
      title="Partner Agreement"
      eyebrow="Hotels & Restaurants"
      summary="Applicable to Hotels & Restaurants registering on the Miles Assist platform. Review the benefits, background, and terms before collaborating with us."
      href="/partner-agreement"
      toc={[]}
    >
      <PartnerAgreementTabs hotel={<LegalBody blocks={hotel.blocks} />} restaurant={<LegalBody blocks={restaurant.blocks} />} />
      <div className="mt-12 flex flex-col items-start gap-4 rounded-3xl bg-surface-alt p-7 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xl font-extrabold text-heading">Ready to become a partner?</p>
          <p className="mt-1 text-sm text-muted">Join hotels and restaurants already growing with Miles Assist.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/partner" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-[#ff7a2e] px-5 py-3 text-sm font-extrabold text-white shadow-glow">Register as partner <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
          <Link href="/contact" className="inline-flex items-center rounded-full px-5 py-3 text-sm font-extrabold text-heading ring-1 ring-line hover:ring-brand-orange/50">Contact us</Link>
        </div>
      </div>
    </LegalLayout>
  );
}
