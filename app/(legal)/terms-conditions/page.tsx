import type { Metadata } from "next";
import { loadLegal } from "@/lib/legal";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalBody } from "@/components/legal/LegalBody";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Miles Assist Driver App, including the legal disclaimer, privacy, refund and cancellation terms, Roadside Assistance (RSA) and Insurance Benefits terms.",
  alternates: { canonical: "/terms-conditions" },
};

export default function Page() {
  const doc = loadLegal("terms-conditions");
  return (
    <LegalLayout title={doc.meta.title} updated={doc.meta.updated} summary={doc.meta.summary} eyebrow={doc.meta.eyebrow} href="/terms-conditions" toc={doc.toc}>
      <LegalBody blocks={doc.blocks} />
    </LegalLayout>
  );
}
