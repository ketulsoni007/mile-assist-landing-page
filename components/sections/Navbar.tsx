"use client";

import { useEffect, useState } from "react";
import { LogoHorizontal } from "@/components/brand/LogoHorizontal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav, ctaNav } from "@/lib/nav";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";



export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-surface/80 shadow-card backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link href="/" aria-label="Miles Assist home" className="shrink-0">
          <LogoHorizontal className="h-11 w-auto lg:h-12" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active ? "text-brand-orange" : "text-heading hover:text-brand-orange",
                  )}
                >
                  {active && (
                    <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-brand-orange-soft ring-1 ring-brand-orange/20" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href={ctaNav.partner.href} variant="outline" size="sm">{ctaNav.partner.label}</Button>
          <Button href={ctaNav.contact.href} size="sm">{ctaNav.contact.label}</Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
        <ThemeToggle />
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-full text-heading"
        >
          {open ? <X /> : <Menu />}
        </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-surface/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {mainNav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn("block rounded-xl px-3 py-3 font-semibold hover:bg-brand-orange-soft", isActive(l.href) ? "bg-brand-orange-soft text-brand-orange" : "text-heading")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3 flex gap-3">
                <Button href={ctaNav.partner.href} variant="outline" size="sm" className="flex-1">{ctaNav.partner.label}</Button>
                <Button href={ctaNav.contact.href} size="sm" className="flex-1">{ctaNav.contact.label}</Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
