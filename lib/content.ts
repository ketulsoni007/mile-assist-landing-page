// Single source of truth for page copy. DRAFT copy: no numbers (cashback %, free-meal rules) until confirmed.
import { Building2, Car, Store, MapPinned, ThumbsUp, UserPlus, Utensils, ReceiptText, type LucideIcon } from "lucide-react";

export type Role = {
  id: string;
  title: string;
  text: string;
  points: string[];
  Icon: LucideIcon;
  color: string; // accent, kept the same in light and dark
  href: string;
};

export const roles: Role[] = [
  {
    id: "drivers",
    title: "For Drivers",
    text: "Everything you need on duty, from the first stop to the last mile.",
    points: ["Free food", "Free stay", "Insurance", "24/7 support"],
    Icon: Car,
    color: "#ff5a00",
    href: "#contact",
  },
  {
    id: "hotels",
    title: "For Hotels",
    text: "Fill more rooms with guests that verified drivers bring to your door.",
    points: ["Guests referred by verified drivers", "Digital bill & payout tracking", "Partner dashboard & alerts", "Verified partner listing"],
    Icon: Building2,
    color: "#7c5cff",
    href: "/partner",
  },
  {
    id: "restaurants",
    title: "For Restaurants",
    text: "Get drivers to stop at your restaurant or dhaba with their passengers.",
    points: ["Driver footfall on every route", "Digital bill & payout tracking", "Partner dashboard & alerts", "Verified partner listing"],
    Icon: Utensils,
    color: "#2f6bff",
    href: "/partner",
  },
];

/** Which public/users/avatar-N.webp photos appear next to "Trusted by". PLACEHOLDER portraits: replace with real, consented drivers before launch. */
export const heroAvatars = [4, 5, 7, 8];

export type Stat = { id: string; value: number; suffix: string; decimals?: number; label: string; Icon: LucideIcon; color: string };

/** PLACEHOLDER numbers copied from the design mockup. Replace with real, verifiable figures before launch. */
export const stats: Stat[] = [
  { id: "drivers", value: 55000, suffix: "+", label: "Active Drivers", Icon: Car, color: "#ff5a00" },
  { id: "partners", value: 4600, suffix: "+", label: "Partner Hotels & Restaurants", Icon: Store, color: "#2f6bff" },
  { id: "cities", value: 550, suffix: "+", label: "Cities Covered", Icon: MapPinned, color: "#0ea5a4" },
  { id: "csat", value: 99.9, suffix: "%", decimals: 1, label: "Customer Satisfaction", Icon: ThumbsUp, color: "#7c5cff" },
];

export type Step = { n: number; title: string; text: string; Icon: LucideIcon; color: string };

export const steps: Step[] = [
  { n: 1, title: "Sign Up", text: "Create your driver account in minutes.", Icon: UserPlus, color: "#ff5a00" },
  { n: 2, title: "Visit a Partner", text: "Stop at a partner restaurant or hotel on your route.", Icon: Store, color: "#2f6bff" },
  { n: 3, title: "Enjoy Free Food & Stay", text: "Eat and rest free, as a thank-you for the work you do.", Icon: Utensils, color: "#0ea5a4" },
  { n: 4, title: "Upload Bill, Earn Cashback", text: "Snap the bill, upload it and get cashback on every one.", Icon: ReceiptText, color: "#7c5cff" },
];

export type Testimonial = { id: string; quote: string; name: string; role: string; city: string; avatar: number; rating: number };

/**
 * SAMPLE testimonials for layout only. The names, quotes and photos are placeholders, not real people.
 * Replace every entry with genuine, consented reviews before launch (publishing invented reviews as real
 * is misleading and can break consumer-protection and advertising rules).
 */
export const testimonials: Testimonial[] = [
  { id: "t1", quote: "On long highway shifts I used to skip meals. Now I stop at a partner dhaba, eat free and get cashback on the bill.", name: "Rahul S.", role: "Cab Driver", city: "Ahmedabad", avatar: 4, rating: 5 },
  { id: "t2", quote: "Drivers bring guests straight to our restaurant every evening. The bill tracking dashboard keeps payouts simple.", name: "Vikram P.", role: "Restaurant Partner", city: "Vadodara", avatar: 5, rating: 5 },
  { id: "t3", quote: "Free stay at a clean partner hotel after a night drive is a huge relief. Uploading the bill takes seconds.", name: "Amit V.", role: "Intercity Driver", city: "Jaipur", avatar: 7, rating: 5 },
  { id: "t4", quote: "Our room occupancy went up once Miles Assist drivers started recommending us. Verified, steady footfall.", name: "Karan M.", role: "Hotel Partner", city: "Udaipur", avatar: 8, rating: 4 },
  { id: "t5", quote: "My driver took me to a great partner restaurant and I got 10% off instantly. Booking the cab was easy too.", name: "Nikhil R.", role: "Customer", city: "Pune", avatar: 6, rating: 5 },
  { id: "t6", quote: "Cashback on every bill adds up over a month. It feels good to be rewarded for the miles we put in.", name: "Sanjay K.", role: "Truck Driver", city: "Surat", avatar: 9, rating: 5 },
  { id: "t7", quote: "Support picked up at 2 AM when I needed help on the road. That alone makes the app worth it.", name: "Arjun D.", role: "Cab Driver", city: "Mumbai", avatar: 10, rating: 5 },
];
