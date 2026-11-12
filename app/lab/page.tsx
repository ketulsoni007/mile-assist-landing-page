import type { Metadata } from "next";
import { EffectLab } from "@/components/lab/EffectLab";

// Internal playground for choosing a hero background. Not linked, not indexed.
export const metadata: Metadata = {
  title: "Effect lab",
  robots: { index: false, follow: false },
};

export default function LabPage() {
  return <EffectLab />;
}
