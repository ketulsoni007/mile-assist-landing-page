import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Miles Assist: request a demo, ask about driver support, or partner with us as a hotel or restaurant. Email support@milesassist.in, call +91 85114 36397, or visit our office in Naroda, Ahmedabad.",
  alternates: { canonical: "/contact" },
};

export default function Page() {
  return <ContactPage />;
}
