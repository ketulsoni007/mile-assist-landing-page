import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Miles Assist: driver comfort, on-road support, every mile. Based in Ahmedabad, we connect intercity drivers with partner restaurants and hotels for free food and stay, cashback and 24/7 support across India.",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <AboutPage />;
}
