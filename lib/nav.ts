// Site routes. One list drives the header, the mobile menu and the footer.
export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const ctaNav = {
  partner: { href: "/partner", label: "Become a Partner" },
  contact: { href: "/contact", label: "Contact Us" },
};
