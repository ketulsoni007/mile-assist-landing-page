import type { Metadata } from "next";
import { PricingPage } from "@/components/pricing/PricingPage";

export const metadata: Metadata = {
  title: "Pricing – First Month Free, then ₹163/month",
  description:
    "Miles Assist pricing for drivers: one simple plan, first month free after KYC, then ₹163 per month. Includes free food and free stay at partners, cashback, roadside assistance, insurance support and 24/7 help. Compare Bronze, Silver and Gold tiers.",
  alternates: { canonical: "/pricing" },
};

export default function Page() {
  return <PricingPage />;
}
