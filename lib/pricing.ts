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

/** Tier comparison table. true = included, false = not included, string = value. Source: App Update Report v0.1. */
export const tierRows: { label: string; values: [boolean | string, boolean | string, boolean | string] }[] = [
  { label: "Cashback on verified bills", values: ["Up to ₹250", "Up to ₹600", "Highest"] },
  { label: "Free food & free stay at partners", values: [true, true, true] },
  { label: "24/7 driver support", values: [true, true, true] },
  { label: "Free first lawyer call", values: [true, true, true] },
  { label: "Roadside assistance: Need Help live call", values: [true, true, true] },
  { label: "Additional personal support", values: [false, true, true] },
  { label: "On-call legal support", values: [false, true, true] },
  { label: "Driver uniform", values: [false, true, true] },
  { label: "Tier sticker", values: ["Bronze", "Silver", "Golden"] },
  { label: "Life & accident insurance cover", values: [false, false, true] },
  { label: "Full RSA: breakdown, jump-start, fuel, puncture, health check", values: [false, false, true] },
  { label: "Car insurance & tyre support vouchers", values: [false, false, true] },
  { label: "Business support", values: [false, false, true] },
];

export const pricingFaqs = [
  { q: "Is the first month really free?", a: "Yes. Once your KYC is verified you get a 1 month free subscription with full access to Miles Assist services." },
  { q: "How much does Miles Assist cost after the free month?", a: "The Miles Assist Driver Plan is ₹163 per month after your free month, which works out to about ₹5.4 a day." },
  { q: "Do I pay more for Silver or Gold?", a: "No. Every driver is on the same plan. Bronze, Silver and Gold are levels you move up through as you keep driving with Miles Assist, unlocking bigger cashback and more support." },
  { q: "Do hotels and restaurants pay to partner?", a: "Partners pay a 0% platform fee, and listing and the partner dashboard are free." },
  { q: "Where can I read the refund and cancellation terms?", a: "See our Refund Policy and Cancellation Policy pages, or contact support@milesassist.in." },
];
