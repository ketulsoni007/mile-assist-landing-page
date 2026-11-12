// How It Works page copy. Source: Miles Assist App Update Report v0.1 + partner/customer details from the owner.
// No unconfirmed figures (cashback amounts, tier thresholds, radius) are stated as facts.
import { BadgeCheck, Building2, Car, Download, FileUp, Gift, Hotel, IdCard, LayoutDashboard, MapPinned, Percent, QrCode, Route, Search, Smartphone, TrendingUp, Users, Utensils, Wallet, type LucideIcon } from "lucide-react";

export type JourneyStep = {
  id: string;
  short: string;
  title: string;
  text: string;
  points: string[];
  Icon: LucideIcon;
  color: string;
  screen: "signup" | "kyc" | "route" | "checkin" | "bill" | "cashback" | "tiers";
};

export const journey: JourneyStep[] = [
  {
    id: "download",
    short: "Sign up",
    title: "Download the app & sign up",
    text: "Get Miles Assist Driver from Google Play or the App Store and sign up with your mobile number. A one-time password confirms it's you.",
    points: ["Free to download", "Mobile number + OTP login"],
    Icon: Download,
    color: "#2f6bff",
    screen: "signup",
  },
  {
    id: "kyc",
    short: "KYC",
    title: "Complete a quick KYC",
    text: "Take a live selfie and add your Aadhaar, driving licence, vehicle and RC details. You can explore the app while it is verified.",
    points: ["Live selfie and Aadhaar", "Driving licence, vehicle & RC", "First month free once verified"],
    Icon: IdCard,
    color: "#7c5cff",
    screen: "kyc",
  },
  {
    id: "route",
    short: "Find partners",
    title: "Find partners on your route",
    text: "Enter your pickup and drop and tap Find Restaurant to see partner restaurants and hotels along the way, or open the nearby partners map.",
    points: ["Route-based search", "Explore Food & Explore Stay map", "Menu, distance and terms for each partner"],
    Icon: Route,
    color: "#0ea5a4",
    screen: "route",
  },
  {
    id: "checkin",
    short: "Check in",
    title: "Stop at a partner & check in",
    text: "When you reach the partner restaurant or hotel, confirm your visit at the counter with an OTP or QR check-in, and enjoy your free food or free stay.",
    points: ["OTP or QR visit check-in", "Free food at partner restaurants", "Free stay at partner hotels"],
    Icon: QrCode,
    color: "#ff5a00",
    screen: "checkin",
  },
  {
    id: "bill",
    short: "Upload bill",
    title: "Upload the bill & rate the place",
    text: "Upload the customer's bill (or enter the amount) and give the place a star rating. It only takes a few seconds.",
    points: ["Bill photo or amount entry", "Star rating for every visit"],
    Icon: FileUp,
    color: "#e0457b",
    screen: "bill",
  },
  {
    id: "cashback",
    short: "Cashback",
    title: "Get verified, get cashback",
    text: "The Miles Assist team verifies your bill. Once approved, a cashback scratch card lands in your wallet, with a voice update and a little celebration.",
    points: ["Bills verified by our team", "Scratch card cashback", "Credited to your in-app wallet"],
    Icon: Wallet,
    color: "#16a34a",
    screen: "cashback",
  },
  {
    id: "tiers",
    short: "Level up",
    title: "Keep driving, level up",
    text: "Every verified duty counts towards your journey. Complete 60 duties within 180 days and move up from Bronze to Silver and Gold for bigger rewards and more support.",
    points: ["Duty journey: 60 duties in 180 days", "Bronze, Silver and Gold tiers", "More cashback and support as you grow"],
    Icon: TrendingUp,
    color: "#f2b01e",
    screen: "tiers",
  },
];

export type Audience = { id: "drivers" | "partners" | "customers"; label: string; Icon: LucideIcon; color: string; steps: { Icon: LucideIcon; title: string; text: string }[]; cta: { label: string; href: string } };

export const audiences: Audience[] = [
  {
    id: "drivers",
    label: "Drivers",
    Icon: Car,
    color: "#ff5a00",
    steps: [
      { Icon: Smartphone, title: "Join & verify", text: "Sign up, finish KYC and unlock your free first month." },
      { Icon: Utensils, title: "Eat & stay free", text: "Stop at partner restaurants and hotels on your route." },
      { Icon: Gift, title: "Earn cashback", text: "Upload the bill, get it verified and scratch your reward." },
    ],
    cta: { label: "Get the app", href: "/#download" },
  },
  {
    id: "partners",
    label: "Hotels & Restaurants",
    Icon: Building2,
    color: "#7c5cff",
    steps: [
      { Icon: Hotel, title: "Register your place", text: "Pick hotel or restaurant, verify your number and complete your profile." },
      { Icon: BadgeCheck, title: "Get verified & listed", text: "Show up on Miles Assist with a verified partner badge." },
      { Icon: LayoutDashboard, title: "Welcome drivers", text: "Upload bills from your dashboard; driver payouts are automatic." },
    ],
    cta: { label: "Become a partner", href: "/partner" },
  },
  {
    id: "customers",
    label: "Customers",
    Icon: Users,
    color: "#2f6bff",
    steps: [
      { Icon: Search, title: "Book an intercity cab", text: "Travel with a verified Miles Assist driver." },
      { Icon: MapPinned, title: "Discover good places", text: "Stop at hotels and restaurants your driver trusts." },
      { Icon: Percent, title: "Save instantly", text: "Get a 10% instant discount at partner places." },
    ],
    cta: { label: "Contact us", href: "/contact" },
  },
];
