// Services page copy. Source: Miles Assist App Update Report v0.1 (services list, roadside "Need Help" live call,
// lawyer "first call only", Gold-tier insurance/RSA). Insurance is NOT described as free cover for every driver:
// the report lists insurance support as a service and insurance cover as a Gold tier benefit (figures pending).
import { Gavel, Headset, Hotel, ShieldCheck, Utensils, Wrench, type LucideIcon } from "lucide-react";

export type ServiceId = "free-food" | "free-stay" | "roadside-assistance" | "insurance" | "legal-help" | "support";

export type Service = {
  id: ServiceId;
  tag: string;
  title: string;
  accent: string;
  text: string;
  points: string[];
  how: string[];
  Icon: LucideIcon;
  color: string;
};

export const services: Service[] = [
  {
    id: "free-food",
    tag: "Free",
    title: "Free food for drivers",
    accent: "on your route",
    text: "Stop at Miles Assist partner restaurants and dhabas on your route and enjoy a free meal while you are on duty. Every partner page shows the menu, what is offered to Miles drivers and the terms.",
    points: ["Partner restaurants and dhabas on highways", "Menu and driver offer shown upfront", "Cashback when you upload the customer bill"],
    how: ["Search your route or open Explore Food", "Check in at the partner", "Eat, then upload the bill"],
    Icon: Utensils,
    color: "#ff5a00",
  },
  {
    id: "free-stay",
    tag: "Free",
    title: "Free stay for drivers",
    accent: "at partner hotels",
    text: "Long intercity duty? Rest at a Miles Assist partner hotel. Find stays along your route or near you on the map, with details and terms for Miles drivers on every listing.",
    points: ["Partner hotels on intercity routes", "Explore Stay on the nearby map", "Verified, KYC-checked partners"],
    how: ["Open Explore Stay", "Check in at the partner hotel", "Rest, then upload the bill"],
    Icon: Hotel,
    color: "#7c5cff",
  },
  {
    id: "roadside-assistance",
    tag: "Free",
    title: "Roadside assistance",
    accent: "when you're stuck",
    text: "Breakdown on the highway? Tap Need Help in Roadside Assistance and a live call connects you straight to the Miles Assist support team, who help arrange towing and get you moving again.",
    points: ["Need Help: one tap, live call with our team", "Help with towing", "Breakdown, battery jump-start, fuel delivery, puncture and health check at Gold tier"],
    how: ["Open Roadside Assistance", "Tap Need Help", "Talk to our team on a live call"],
    Icon: Wrench,
    color: "#e0457b",
  },
  {
    id: "insurance",
    tag: "Support",
    title: "Insurance support",
    accent: "for drivers",
    text: "Get help understanding and using insurance, with personal support from our team. Gold tier drivers also get life and accident insurance cover and car insurance support.",
    points: ["Insurance guidance with personal support", "Life and accident cover at Gold tier", "Car insurance and tyre support vouchers at Gold tier"],
    how: ["Open Insurance in Services", "Watch the how-to video", "Talk to our team"],
    Icon: ShieldCheck,
    color: "#2f6bff",
  },
  {
    id: "legal-help",
    tag: "First call free",
    title: "Legal help",
    accent: "from a lawyer",
    text: "Stuck with a challan, an accident dispute or a document problem? Talk to a lawyer through Miles Assist. Your first call is free, and Silver tier adds on-call legal support.",
    points: ["Free lawyer support on your first call", "On-call legal support at Silver tier", "Help for on-road and document issues"],
    how: ["Open Lawyer in Services", "Request a call", "Get advice from a lawyer"],
    Icon: Gavel,
    color: "#0ea5a4",
  },
  {
    id: "support",
    tag: "24/7",
    title: "24/7 driver support",
    accent: "day or night",
    text: "Questions about a partner, a bill or your wallet? Support is available around the clock inside the app, with FAQs for quick answers and how-to videos for every service.",
    points: ["Available 24/7 in the app", "FAQs for instant answers", "How-to videos for every service"],
    how: ["Open 24/7 Support", "Check the FAQs", "Chat or call our team"],
    Icon: Headset,
    color: "#16a34a",
  },
];

export const serviceFaqs = [
  {
    q: "Is roadside assistance free for Miles Assist drivers?",
    a: "Yes. Roadside Assistance is a free service in the app: tap Need Help to get a live call with the Miles Assist support team, who help arrange towing. Gold tier drivers also get breakdown help, battery jump-start, fuel delivery, puncture support and a vehicle health check.",
  },
  {
    q: "Do drivers get free insurance?",
    a: "Every driver gets insurance support and guidance from our team. Insurance cover itself, including life and accident cover, is a Gold tier benefit. Check the app for the current tier benefits.",
  },
  {
    q: "How do I get free food or a free stay on duty?",
    a: "Search your pickup and drop in the app to find partner restaurants and hotels on your route, or use Explore Food and Explore Stay on the nearby map. Check in at the partner, enjoy your meal or stay, then upload the customer bill for cashback.",
  },
  {
    q: "Is the lawyer service free?",
    a: "Your first call with a lawyer is free. Silver tier drivers also get on-call legal support.",
  },
  {
    q: "How do I contact Miles Assist support?",
    a: "Support is available 24/7 inside the app. You can also email support@milesassist.in, call or WhatsApp +91 85114 36397.",
  },
];
