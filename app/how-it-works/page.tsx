import type { Metadata } from "next";
import { HowPage } from "@/components/how/HowPage";

export const metadata: Metadata = {
  title: "How It Works – Free Food, Free Stay & Cashback for Drivers",
  description:
    "How Miles Assist works for drivers: sign up, complete KYC, find partner restaurants and hotels on your route, check in for free food and free stay, upload the bill and get cashback. Also for hotels, restaurants and customers.",
  alternates: { canonical: "/how-it-works" },
};

export default function Page() {
  return <HowPage />;
}
