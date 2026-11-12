"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Building2, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

/** Hotel / Restaurant switch for the partner agreement. Both versions are server-rendered; only one is shown. */
export function PartnerAgreementTabs({ hotel, restaurant }: { hotel: React.ReactNode; restaurant: React.ReactNode }) {
  const [tab, setTab] = useState<"hotel" | "restaurant">("hotel");
  const tabs = [
    { id: "hotel" as const, label: "Hotel Partner", Icon: Building2, color: "#7c5cff" },
    { id: "restaurant" as const, label: "Restaurant Partner", Icon: Utensils, color: "#ff5a00" },
  ];
  return (
    <div>
      <div role="tablist" aria-label="Partner type" className="flex w-fit max-w-full flex-wrap gap-1.5 rounded-full border border-line bg-surface-alt p-1.5">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`pa-tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`pa-panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={cn("relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold transition-colors", tab === t.id ? "text-white" : "text-heading hover:text-brand-orange")}
          >
            {tab === t.id && <motion.span layoutId="pa-pill" className="absolute inset-0 rounded-full" style={{ background: t.color }} transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
            <t.Icon className="relative size-4" />
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-10">
        <div role="tabpanel" id="pa-panel-hotel" aria-labelledby="pa-tab-hotel" hidden={tab !== "hotel"}>{hotel}</div>
        <div role="tabpanel" id="pa-panel-restaurant" aria-labelledby="pa-tab-restaurant" hidden={tab !== "restaurant"}>{restaurant}</div>
      </div>
    </div>
  );
}
