// FAQ copy. Based on the questions from the live site, rewritten to match the current app
// (Update Report v0.1 + owner-confirmed pricing). Old claims that no longer match were removed:
// ₹199 plan, booking sharing, "5000+ drivers", "25+ cities", SOS, account managers, UPI timing.

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Is Miles Assist free to use?",
    a: "Your first month is completely free once your KYC is verified. After that, the Miles Assist Driver Plan is just ₹163 per month, or ₹1,630 a year (12 months for the price of 10), and includes free food and stay at partner places, cashback on verified bills, roadside assistance, insurance support and 24/7 help.",
  },
  {
    q: "Is KYC verification mandatory?",
    a: "Yes. To keep the network safe and genuine, every driver completes KYC in the app: a live selfie, Aadhaar, driving licence, and vehicle and RC details. While verification is in progress you can explore the app, and all services unlock as soon as you are verified.",
  },
  {
    q: "How do I get free food and stay on my route?",
    a: "Enter your pickup and drop location in the app and tap Find Restaurant to see Miles Assist partner restaurants and hotels along your route. You can also open the nearby partners map and filter by Explore Food or Explore Stay. Each partner page shows the distance, what is offered to Miles drivers, the menu and terms.",
  },
  {
    q: "How does cashback work?",
    a: "After your visit is verified at the partner, upload the customer's bill (or enter the amount) and rate the place. Our team verifies the bill, and you receive a cashback scratch coupon credited to your in-app wallet. Higher tiers unlock higher cashback limits.",
  },
  {
    q: "What are Bronze, Silver and Gold tiers?",
    a: "Every driver is on the same plan and starts at Bronze. As you keep driving with Miles Assist you move up to Silver and Gold, unlocking bigger cashback, a driver uniform, legal and personal support, and at Gold, insurance cover and full roadside assistance.",
  },
  {
    q: "What cities is Miles Assist available in?",
    a: "Miles Assist is growing across India, with partner restaurants and hotels on major city and intercity routes. New partners are added regularly, so check the app for the latest coverage near you.",
  },
  {
    q: "How can hotels and restaurants partner with Miles Assist?",
    a: "Hotels and restaurants can register with us as partners. After verification you get a dashboard to manage driver visits, track bills and payouts, and receive alerts, plus steady footfall from verified Miles Assist drivers.",
  },
  {
    q: "Is there 24/7 support available?",
    a: "Yes. Support is available 24/7 from inside the app. If you need help on the road, the Need Help option in Roadside Assistance connects you to a live call with the Miles Assist support team.",
  },
];
