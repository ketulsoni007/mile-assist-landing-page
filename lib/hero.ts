// Home hero copy for each visitor role (see lib/role.ts). "show" is the data-role-only value:
// the listed roles see this version; "default" means it is also the version shown before a role is picked.
// A role without its own version yet must be added to the driver version's list.
import { ArrowRight, BadgeCheck, BedDouble, Building2, Car, Play, Receipt, Store, UsersRound, Utensils, Wallet, Zap, type LucideIcon } from "lucide-react";

export type HeroCopy = {
  id: string;
  show: string;
  eyebrow: { Icon: LucideIcon; text: string };
  title: [string, string, string]; // the middle part is orange
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string; Icon: LucideIcon };
  /** "stores" shows the app store badges; a list shows short benefit ticks instead */
  extra: "stores" | string[];
  trust: { lead: string; strong: string; tail?: string };
};

export const heroCopy: HeroCopy[] = [
  {
    id: "driver",
    show: "driver default",
    eyebrow: { Icon: Zap, text: "Your Trusted Travel Companion" },
    title: ["Smart Driver", "Collaboration", "& Travel Assistance"],
    text: "Everything you need for a safer, smoother and more rewarding journey, all in one place.",
    primary: { label: "Start Your Journey", href: "#download" },
    secondary: { label: "Watch Video", href: "#how-it-works", Icon: Play },
    extra: "stores",
    trust: { lead: "Trusted by", strong: "55,000+ Drivers" }, // PLACEHOLDER number, same as before
  },
  {
    id: "restaurant",
    show: "restaurant",
    eyebrow: { Icon: Utensils, text: "For Restaurants & Dhabas" },
    title: ["Turn Passing Drivers", "Into Regular", "Guests"],
    text: "List your restaurant or dhaba on Miles Assist. Verified drivers stop at your place with their passengers, and you track every bill and payout from one dashboard.",
    primary: { label: "Register Your Restaurant", href: "/partner#choose" },
    secondary: { label: "How It Works", href: "/how-it-works", Icon: ArrowRight },
    extra: ["Driver footfall on every route", "Digital bill & payout tracking", "Partner dashboard & alerts"],
    trust: { lead: "Reach", strong: "55,000+ Drivers" }, // PLACEHOLDER number
  },
  {
    id: "hotel",
    show: "hotel",
    eyebrow: { Icon: BedDouble, text: "For Hotels & Stays" },
    title: ["Fill More Rooms", "With Guests", "Drivers Bring You"],
    text: "List your hotel on Miles Assist. Verified intercity drivers recommend your property to their passengers, and you track every stay bill and payout from one dashboard.",
    primary: { label: "Register Your Hotel", href: "/partner#choose" },
    secondary: { label: "How It Works", href: "/how-it-works", Icon: ArrowRight },
    extra: ["Guests referred by verified drivers", "Digital bill & payout tracking", "Partner dashboard & alerts"],
    trust: { lead: "Reach", strong: "55,000+ Drivers" }, // PLACEHOLDER number
  },
];

type RoleChip = { Icon: LucideIcon; label: string; sub: string };

/** Ring chips around the hero phone for the partner roles. Same order as "chips" in components/svg/HeroShowcase.tsx. */
export const partnerChips: Record<"restaurant" | "hotel", RoleChip[]> = {
  restaurant: [
    { Icon: UsersRound, label: "More guests", sub: "Drivers bring them" },
    { Icon: Store, label: "Verified listing", sub: "On the driver app" },
    { Icon: Receipt, label: "Upload bills", sub: "From your dashboard" },
    { Icon: Wallet, label: "Payouts tracked", sub: "Bill by bill" },
    { Icon: Car, label: "Drivers on route", sub: "Stop at your place" },
    { Icon: BadgeCheck, label: "Verified drivers", sub: "KYC checked" },
  ],
  hotel: [
    { Icon: BedDouble, label: "More bookings", sub: "Drivers bring guests" },
    { Icon: Building2, label: "Verified listing", sub: "On the driver app" },
    { Icon: Receipt, label: "Upload bills", sub: "From your dashboard" },
    { Icon: Wallet, label: "Payouts tracked", sub: "Bill by bill" },
    { Icon: Car, label: "Drivers on route", sub: "Recommend your hotel" },
    { Icon: BadgeCheck, label: "Verified drivers", sub: "KYC checked" },
  ],
};
export const partnerRoles = ["restaurant", "hotel"] as const;
