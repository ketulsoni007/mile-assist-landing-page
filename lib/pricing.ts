// Pricing copy. Source: Miles Assist App Update Report v0.1 (tiers) + owner confirmation (one plan, ₹163/month after a free month; tiers are earned).
// Before launch: confirm final tier names, the Gold cashback figure (owner says it is higher than Silver's), and how tiers are earned.

export const plan = {
  name: "Miles Assist Driver Plan",
  freeMonths: 1,
  price: 163, // ₹ per month, after the free month
  period: "month",
  includes: [
    "Free food at partner restaurants",
    "Free stay at partner hotels",
    "Cashback on every verified bill",
    "Roadside assistance",
    "Insurance support",
    "Free legal call (first call)",
    "24/7 driver support",
  ],
};

export type Tier = {
  id: "bronze" | "silver" | "gold";
  name: string;
  cashback: string;
  tagline: string;
  perks: string[];
  colors: { from: string; via: string; to: string; ink: string; glow: string };
};

export const tiers: Tier[] = [
  {
    id: "bronze",
    name: "Bronze",
    cashback: "Up to ₹250",
    tagline: "Where every driver starts",
    perks: ["1 month free subscription", "Bronze sticker", "24/7 support"],
    colors: { from: "#7a4421", via: "#c98048", to: "#8a4b22", ink: "#fff4ea", glow: "rgb(201 128 72 / 0.55)" },
  },
  {
    id: "silver",
    name: "Silver",
    cashback: "Up to ₹600",
    tagline: "More support on the road",
    perks: ["Additional personal support", "Driver uniform", "Silver sticker", "On-call legal support", "24/7 support"],
    colors: { from: "#5f6b7a", via: "#c9d1db", to: "#6c7887", ink: "#ffffff", glow: "rgb(160 172 186 / 0.55)" },
  },
  {
    id: "gold",
    name: "Gold",
    cashback: "Highest cashback", // TODO: owner confirms Gold > ₹600; add the exact figure when known
    tagline: "The full Miles Assist experience",
    perks: [
      "₹15L life + ₹7.5L accident insurance",
      "Roadside assistance: breakdown, battery jump-start, fuel delivery, puncture, health check",
      "Car insurance & tyre support vouchers",
      "Business support",
      "Uniform & golden sticker",
      "24/7 support",
    ],
    colors: { from: "#8a5a00", via: "#f2c14e", to: "#a36d00", ink: "#fffaf0", glow: "rgb(242 193 78 / 0.6)" },
  },
];
