import Image from "next/image";
import { Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { heroAvatars } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { HeroShowcase } from "@/components/svg/HeroShowcase";
import { HeroVisual } from "@/components/svg/HeroVisual";
import { HeroBackground } from "@/components/effects/HeroBackground";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-gradient-to-b from-hero-a via-hero-b to-hero-c pt-28 pb-10 lg:min-h-[740px] lg:pt-10 lg:pb-8"
    >
      {/* interactive liquid background: swirls with the cursor, fades out towards the bottom */}
      <HeroBackground className="-z-10 [mask-image:linear-gradient(to_bottom,#000_60%,transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:flex lg:min-h-[720px] lg:items-center lg:px-8">
        <div className="max-w-xl">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-bold text-brand-orange ring-1 ring-brand-orange/15">
              <Zap className="size-3.5 fill-brand-orange" /> Your Trusted Travel Companion
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 id="hero-title" className="mt-5 text-[2.3rem] font-extrabold leading-[1.05] tracking-tight text-heading sm:text-6xl">
              Smart Driver
              <span className="block text-brand-orange">Collaboration</span>
              &amp; Travel Assistance
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-lg text-body">
              Everything you need for a safer, smoother and more rewarding journey, all in one place.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#download" size="lg">Start Your Journey</Button>
            <Button href="#how-it-works" variant="ghost" size="lg">
              <span className="grid size-9 place-items-center rounded-full bg-card shadow-card">
                <Play className="size-4 fill-brand-orange text-brand-orange" />
              </span>
              Watch Video
            </Button>
          </Reveal>
          <Reveal delay={0.35} className="mt-6">
            <StoreBadges size="sm" />
          </Reveal>
          <Reveal delay={0.45} className="mt-7 flex items-center gap-3 text-sm">
            <span className="flex items-center -space-x-3" aria-hidden="true">
              {heroAvatars.map((n) => (
                <Image
                  key={n}
                  src={`/users/avatar-${n}.webp`}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-full border-[3px] border-surface object-cover shadow-card transition-transform duration-300 hover:z-10 hover:-translate-y-1 hover:scale-110"
                />
              ))}
              <span className="relative grid size-11 place-items-center rounded-full border-[3px] border-surface bg-brand-orange text-xs font-extrabold text-white shadow-card">+</span>
            </span>
            <span className="text-body">
              Trusted by <strong className="text-heading">55,000+ Drivers</strong>
            </span>
          </Reveal>
        </div>
      </div>

      {/* Visual: app mockup + glass cards. (The illustrated driver/car version is parked in components/svg/HeroScene.tsx and public/hero/.) */}
      <HeroVisual className="relative mt-8 lg:absolute lg:bottom-0 lg:right-0 lg:top-10 lg:mt-0 lg:flex lg:w-[62%] lg:items-end xl:w-[57%]">
        <HeroShowcase className="h-auto w-full" />
      </HeroVisual>
    </section>
  );
}
