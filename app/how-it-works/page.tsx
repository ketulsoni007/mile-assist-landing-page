import type { Metadata } from "next";
import { PageStub } from "@/components/ui/PageStub";

export const metadata: Metadata = {
  title: "How It Works",
  alternates: { canonical: "/how-it-works" },
};

export default function Page() {
  return <PageStub title="How It Works" />;
}
