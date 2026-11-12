import type { Metadata } from "next";
import { PartnerPage } from "@/components/partner/PartnerPage";

export const metadata: Metadata = {
  title: "Become a Partner – Hotels & Restaurants",
  description:
    "Partner with Miles Assist as a hotel or restaurant. Get footfall from verified intercity drivers and passengers, 0% platform fee, free listing and dashboard, bill upload and automated driver payouts.",
  alternates: { canonical: "/partner" },
};

export default function Page() {
  return <PartnerPage />;
}
