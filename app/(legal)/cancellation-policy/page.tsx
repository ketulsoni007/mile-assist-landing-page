import type { Metadata } from "next";
import { loadLegal } from "@/lib/legal";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalBody } from "@/components/legal/LegalBody";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "Miles Assist cancellation rules for driver subscriptions, bookings, customers and hotel and restaurant partners.",
  alternates: { canonical: "/cancellation-policy" },
};

export default function Page() {
  const doc = loadLegal("cancellation-policy");
  return (
    <LegalLayout title={doc.meta.title} updated={doc.meta.updated} summary={doc.meta.summary} eyebrow={doc.meta.eyebrow} href="/cancellation-policy" toc={doc.toc}>
      <LegalBody blocks={doc.blocks} />
    </LegalLayout>
  );
}
