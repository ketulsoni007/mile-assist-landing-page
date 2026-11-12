import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return <PageStub title="Services" />;
}
