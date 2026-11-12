import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function Page() {
  return <PageStub title="About" />;
}
