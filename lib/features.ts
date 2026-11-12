// Features page copy. Source: Miles Assist App Update Report v0.1. No unconfirmed numbers
// (cashback amounts, the ~10 km radius, tier names) are stated as facts here.
import { BadgeCheck, Bell, Car, Gift, Hotel, IdCard, Map, Megaphone, PlayCircle, ReceiptText, Route, ScanFace, ShieldCheck, Volume2, Wallet, Wrench, type LucideIcon } from "lucide-react";

export type FeatureId = "route-search" | "nearby-map" | "bill-cashback" | "duty-journey" | "wallet" | "free-services";

export type Feature = {
  id: FeatureId;
  eyebrow: string;
  title: string;
  accent: string;
  text: string;
  points: string[];
  Icon: LucideIcon;
  color: string;
};

export const features: Feature[] = [
  {
    id: "route-search",
    eyebrow: "Route search",
    title: "Find partners",
    accent: "along your route",
    text: "Enter your pickup and drop, tap Find Restaurant, and see every Miles Assist partner on the way. The app even reads out how many it found.",
    points: ["Pickup and drop based search", "Voice announcement of results", "Distance, menu, offers and terms on every partner page", "See how many Miles drivers visited"],
    Icon: Route,
    color: "#2f6bff",
  },
  {
    id: "nearby-map",
    eyebrow: "Nearby partners",
    title: "A live map of",
    accent: "free stops near you",
    text: "Open the map to see partner hotels and restaurants around you as pins. It frames itself like a navigation app, and you can filter to just food or just stay.",
    points: ["Auto zoom and camera framing", "Explore Food and Explore Stay filters", "Partner pins with quick details"],
    Icon: Map,
    color: "#0ea5a4",
  },
  {
    id: "bill-cashback",
    eyebrow: "Bill upload & cashback",
    title: "Upload the bill,",
    accent: "scratch your reward",
    text: "After your visit is confirmed at the partner, upload the customer bill and rate the place. Once our team verifies it, a cashback scratch card lands in your wallet, with a voice and a celebration.",
    points: ["Quick bill photo or amount entry", "Star rating for every partner", "Verified by the Miles Assist team", "Scratch card cashback"],
    Icon: ReceiptText,
    color: "#ff5a00",
  },
  {
    id: "duty-journey",
    eyebrow: "Duty journey",
    title: "Every duty",
    accent: "moves you forward",
    text: "Track your duty journey with a live progress bar. Complete 60 verified duties within 180 days to hit the milestone.",
    points: ["Animated duty progress", "Milestone: 60 duties in 180 days", "Pending duties shown until verified"],
    Icon: Car,
    color: "#7c5cff",
  },
  {
    id: "wallet",
    eyebrow: "Wallet & history",
    title: "Your savings,",
    accent: "all in one place",
    text: "See your wallet, total savings, free meals, free stays and completed duties at a glance. Tap any card for the full details, or open your complete service history.",
    points: ["Wallet and total savings", "Free food and free stay counts", "Complete service history"],
    Icon: Wallet,
    color: "#16a34a",
  },
  {
    id: "free-services",
    eyebrow: "Free services",
    title: "Help that's",
    accent: "always free",
    text: "Every service carries a Free tag. Roadside assistance connects you to a live call with our team, and each service has a how-to video so you always know what to do.",
    points: ["Roadside assistance with live Need Help call", "Insurance and personal support", "Free lawyer support on your first call", "24/7 support with FAQs"],
    Icon: Wrench,
    color: "#e0457b",
  },
];

export const kycSteps: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: ScanFace, title: "Live selfie & profile", text: "Mobile OTP, a live selfie, your name as per Aadhaar, city and date of birth." },
  { Icon: IdCard, title: "Aadhaar & licence", text: "Aadhaar number and photos, plus your driving licence number, expiry and photos." },
  { Icon: Car, title: "Vehicle & RC", text: "Vehicle type, model, registration and fuel, with vehicle and RC book photos." },
  { Icon: BadgeCheck, title: "Verified & rewarded", text: "Once KYC is verified, services unlock and your first month is free." },
];

export const extras: { Icon: LucideIcon; title: string; text: string; color: string }[] = [
  { Icon: Volume2, title: "Voice greetings", text: "A personal greeting by name, three times a day, and spoken updates for results and rewards.", color: "#ff5a00" },
  { Icon: Megaphone, title: "Campaign cards", text: "The latest updates and awareness campaigns, right at the top of your home screen.", color: "#2f6bff" },
  { Icon: PlayCircle, title: "How-to videos", text: "Short videos for every service and every section of the app.", color: "#e0457b" },
  { Icon: Bell, title: "Miles Assist on social", text: "Trending Miles Assist videos inside the app, so you never miss what's new.", color: "#7c5cff" },
  { Icon: ShieldCheck, title: "Safe, verified network", text: "Every driver is KYC verified, and each vehicle and RC can only be registered once.", color: "#0ea5a4" },
  { Icon: Gift, title: "Rewards that grow", text: "Climb the tiers for bigger cashback and more support as you keep driving.", color: "#16a34a" },
  { Icon: Hotel, title: "Partner details", text: "Menu, services for Miles drivers, terms and a website link for every partner.", color: "#ff8a3d" },
];
