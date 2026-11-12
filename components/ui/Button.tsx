import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange active:scale-95",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-brand-orange to-[#ff7a2e] text-white shadow-glow hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgb(255_90_0/0.6)]",
        outline:
          "border-2 border-brand-orange/70 bg-surface text-brand-orange hover:bg-brand-orange hover:text-white",
        ghost: "text-heading hover:bg-heading/5",
      },
      size: { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = VariantProps<typeof button> & {
  href: string;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant, size, className, children }: ButtonProps) {
  return (
    <Link href={href} className={cn(button({ variant, size }), className)}>
      {children}
    </Link>
  );
}
