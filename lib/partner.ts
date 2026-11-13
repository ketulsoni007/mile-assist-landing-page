// Partner programme copy. Source: the live milesassist site's partner page (provided by the owner).
import { BadgeCheck, Building2, Car, FileUp, LayoutDashboard, Smartphone, UserCheck, Utensils, Wallet, type LucideIcon } from "lucide-react";

export const PARTNER_REGISTER_URL = "https://app.milesassist.com/registration-partner";

export type PartnerType = {
  id: "hotel" | "restaurant";
  title: string;
  short: string;
  text: string;
  points: string[];
  Icon: LucideIcon;
  color: string;
  href: string;
};

const shared = ["Increase footfall with verified drivers", "Digital billing & automated commission payouts", "Dedicated partner dashboard for analytics", "0% platform fee"];

export const partnerTypes: PartnerType[] = [
  {
    id: "hotel",
    title: "Hotel Partner",
    short: "Hotel",
    text: "List your hotel. Verified intercity drivers recommend your property to passengers on their route.",
    points: shared,
    Icon: Building2,
    color: "#7c5cff",
    href: `${PARTNER_REGISTER_URL}?registrationType=hotel`,
  },
  {
    id: "restaurant",
    title: "Restaurant Partner",
    short: "Restaurant",
    text: "List your restaurant or dhaba. Get drivers to stop and recommend your food to passengers on every intercity trip.",
    points: shared,
    Icon: Utensils,
    color: "#ff5a00",
    href: `${PARTNER_REGISTER_URL}?registrationType=restaurant`,
  },
];

/** Drivers join too, but not through the web registration: they leave their details (contact form) or use the app. */
export type JoinOption = Omit<PartnerType, "id" | "href"> & { id: PartnerType["id"] | "driver"; href?: string };

export const driverJoin: JoinOption = {
  id: "driver",
  title: "Driver Partner",
  short: "Driver",
  text: "Drive a cab or intercity trips? Join Miles Assist for free food and stay at partner places, cashback and on-road support.",
  points: ["Free food & stay at partner places", "Cashback on verified bills", "Roadside assistance & 24/7 support", "First month free after KYC"],
  Icon: Car,
  color: "#2f6bff",
};

export const joinOptions: JoinOption[] = [...partnerTypes, driverJoin];

export const partnerStats = [
  { value: "0%", label: "Platform fee" },
  { value: "Free", label: "Listing & dashboard" },
  { value: "Instant", label: "Commission payouts" },
];

export const partnerSteps: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Building2, title: "Select your business type", text: "Choose Hotel Partner or Restaurant Partner. You'll go to the registration page for your business type. Drivers fill a short form instead." },
  { Icon: Smartphone, title: "Verify your mobile number", text: "Enter and verify your Indian mobile number to create your partner account." },
  { Icon: UserCheck, title: "Complete your profile", text: "Add your address, photos, amenities and owner KYC documents to complete your partner profile." },
  { Icon: FileUp, title: "Go live & upload bills", text: "Once verified, you're listed on Miles Assist. Upload customer bills from your dashboard and driver commissions are credited to their wallet automatically." },
];

export const partnerBenefits: { Icon: LucideIcon; text: string }[] = [
  { Icon: UserCheck, text: "Increase footfall with verified drivers" },
  { Icon: Wallet, text: "Upload bills and driver commissions are credited automatically" },
  { Icon: LayoutDashboard, text: "Dedicated partner dashboard for analytics" },
  { Icon: BadgeCheck, text: "KYC-verified partner badge builds traveller trust" },
];
