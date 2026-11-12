// Site routes. One list drives the header, the mobile menu and the footer.
export const mainNav = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const ctaNav = {
  partner: { href: "/contact?type=partner", label: "Become a Partner" },
  contact: { href: "/contact", label: "Contact Us" },
};
