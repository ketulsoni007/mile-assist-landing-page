import type { Metadata } from "next";
import { ServicesPage } from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Driver Services – Roadside Assistance, Free Food & Free Stay",
  description:
    "Miles Assist services for drivers on the road: free food and free stay at partner restaurants and hotels, roadside assistance with a live Need Help call, insurance support, free first lawyer call and 24/7 driver support.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return <ServicesPage />;
}
