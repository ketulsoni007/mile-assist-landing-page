import type { Metadata } from "next";
import { loadLegal } from "@/lib/legal";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { LegalBody } from "@/components/legal/LegalBody";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Miles Assist collects, uses, shares and protects your personal information, and the choices and rights you have.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  const doc = loadLegal("privacy-policy");
  return (
    <LegalLayout title={doc.meta.title} updated={doc.meta.updated} summary={doc.meta.summary} eyebrow={doc.meta.eyebrow} href="/privacy-policy" toc={doc.toc}>
      <LegalBody blocks={doc.blocks} />
    </LegalLayout>
  );
}
