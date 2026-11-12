import type { MetadataRoute } from "next";
import { site } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/features", "/how-it-works", "/services", "/pricing", "/about", "/partner", "/contact", "/privacy-policy", "/terms-conditions", "/refund-policy", "/cancellation-policy", "/partner-agreement"];
  return pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p ? 0.8 : 1 }));
}
