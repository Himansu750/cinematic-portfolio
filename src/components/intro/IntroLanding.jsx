"use client";

import AmbientBackground from "@/components/effects/AmbientBackground";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import PortfolioIntro from "@/components/intro/PortfolioIntro";

export default function IntroLanding() {
  return (
    <main
      className="
        relative
        overflow-hidden
        bg-[#050505]
        text-white
      "
    >
      <AmbientBackground />
      <PortfolioIntro />

      <div
        id="work"
        className="
          relative
          z-10
          pt-[100svh]
        "
      >
        <HeroSection revealStart={560} />
      </div>

      <Footer />
    </main>
  );
}
