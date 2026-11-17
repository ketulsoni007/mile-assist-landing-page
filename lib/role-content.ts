// Home-page copy for the two partner roles (restaurant, hotel). Driver copy stays in lib/content.ts, lib/faq.ts etc.
// Each section renders the driver version with data-role-only="driver default" and these with the partner role
// (see app/globals.css + lib/role.ts). Sources: the Become a Partner page copy (lib/partner.ts) and the published
// Partner Agreement. Deliberately no commission figure and no "free listing" claim here: the agreement is the
// place for the terms, so the pages point to it.
import { BadgeCheck, FileUp, LayoutDashboard, Smartphone, UserCheck, type LucideIcon } from "lucide-react";
import type { Faq } from "./faq";
import { partnerTypes } from "./partner";

export const PARTNER_ROLES = ["restaurant", "hotel"] as const;
export type PartnerRole = (typeof PARTNER_ROLES)[number];

/** words that differ between the two partner roles */
export const partnerWords: Record<PartnerRole, { place: string; Place: string; title: string; offer: string; registerHref: string }> = {
  restaurant: { place: "restaurant", Place: "Restaurant", title: "Restaurant Partner", offer: "one complimentary meal", registerHref: partnerTypes.find((p) => p.id === "restaurant")!.href },
  hotel: { place: "hotel", Place: "Hotel", title: "Hotel Partner", offer: "one complimentary stay", registerHref: partnerTypes.find((p) => p.id === "hotel")!.href },
};

/* ── How It Works (4 steps, same slots as "steps" in lib/content.ts) ── */
export const partnerHow: Record<PartnerRole, { subtitle: string; steps: { title: string; text: string; Icon: LucideIcon }[] }> = {
  restaurant: {
    subtitle: "Four easy steps from registration to your first guests.",
    steps: [
      { title: "Register", text: "Pick Restaurant Partner and verify your mobile number.", Icon: Smartphone },
      { title: "Complete Your Profile", text: "Add your address, photos and owner KYC documents.", Icon: UserCheck },
      { title: "Go Live", text: "Once verified, drivers see your restaurant on their route.", Icon: BadgeCheck },
      { title: "Welcome Guests, Upload Bills", text: "Upload customer bills from your dashboard and track every payout.", Icon: FileUp },
    ],
  },
  hotel: {
    subtitle: "Four easy steps from registration to your first guests.",
    steps: [
      { title: "Register", text: "Pick Hotel Partner and verify your mobile number.", Icon: Smartphone },
      { title: "Complete Your Profile", text: "Add your address, photos, amenities and owner KYC documents.", Icon: UserCheck },
      { title: "Go Live", text: "Once verified, drivers see your hotel on their route.", Icon: BadgeCheck },
      { title: "Welcome Guests, Upload Bills", text: "Upload stay bills from your dashboard and track every payout.", Icon: FileUp },
    ],
  },
};

/* ── Why Miles Assist ── */
export const partnerWhy: Record<PartnerRole, string> = {
  restaurant: "A growing network of verified drivers who bring their passengers to partner restaurants on their route.",
  hotel: "A growing network of verified drivers who recommend partner hotels to the travellers they drive.",
};

/* ── partner terms panel (shown instead of the driver pricing plan) ── */
export const partnerTermsPoints: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Smartphone, title: "Register online", text: "Verify your mobile number and complete your profile." },
  { Icon: BadgeCheck, title: "KYC-verified badge", text: "A verified badge builds traveller trust." },
  { Icon: LayoutDashboard, title: "Partner dashboard", text: "Upload bills and track every payout in one place." },
];

/* ── "get listed" banner (shown instead of the driver app download banner) ── */
export const partnerBannerTicks = ["Verified drivers bring guests", "Digital bill tracking", "Partner dashboard & alerts", "KYC-verified partner badge"];

/* ── FAQ ── */
export const partnerFaqs: Record<PartnerRole, Faq[]> = Object.fromEntries(
  PARTNER_ROLES.map((r) => {
    const w = partnerWords[r];
    return [
      r,
      [
        { q: `How do I list my ${w.place} on Miles Assist?`, a: `Choose ${w.title} on the Become a Partner page and verify your Indian mobile number. Then complete your profile with your address, photos${r === "hotel" ? ", amenities" : ""} and owner KYC documents. Once you are verified, your ${w.place} is listed on Miles Assist.` },
        { q: `How do drivers find my ${w.place}?`, a: `Verified drivers see Miles Assist partners in the driver app, both along the route they search and on a map of nearby partners. They stop at your ${w.place} with their passengers.` },
        { q: "What do I offer the driver?", a: `As set out in the Partner Agreement, the driver who brings customers to your ${w.place} receives ${w.offer}.` },
        { q: "How do bills and driver commissions work?", a: `After your guests' visit, upload the customer bill from your partner dashboard. The driver's commission is credited to their wallet automatically, and you can track every bill and payout in the dashboard.` },
        { q: "What does it cost to be a partner?", a: "The commission on bills from customers that drivers refer to you, and the payment timelines, are set out in the Partner Agreement. Please read it before you register." },
        { q: "Is KYC required for partners?", a: "Yes. Owner KYC documents are part of your partner profile. Verified partners get a KYC-verified badge, which builds trust with travellers." },
      ],
    ];
  }),
) as Record<PartnerRole, Faq[]>;
