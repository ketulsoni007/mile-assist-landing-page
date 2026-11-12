import type { Metadata } from "next";
import { loadLegal } from "@/lib/legal";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalBody } from "@/components/legal/LegalBody";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How refunds work for Miles Assist subscriptions, wallet balances, failed transactions and disputes.",
  alternates: { canonical: "/refund-policy" },
};

export default function Page() {
  const doc = loadLegal("refund-policy");
  return (
    <LegalLayout title={doc.meta.title} updated={doc.meta.updated} summary={doc.meta.summary} eyebrow={doc.meta.eyebrow} href="/refund-policy" toc={doc.toc}>
      <LegalBody blocks={doc.blocks} />
    </LegalLayout>
  );
}
