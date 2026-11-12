import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { GetApp } from "@/components/sections/GetApp";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Faq />
        <GetApp />
        <Contact />
      </main>
    </>
  );
}
