import type { Metadata } from "next";
import { FeaturesPage } from "@/components/features/FeaturesPage";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore Miles Assist features: find partner restaurants and hotels on your route, a live nearby-partners map, bill upload with scratch-card cashback, duty journey tracking, wallet and free driver services.",
  alternates: { canonical: "/features" },
};

export default function Page() {
  return <FeaturesPage />;
}
