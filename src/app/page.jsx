import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PortfolioIntro from "@/components/intro/PortfolioIntro";
import HeroSection from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <PortfolioIntro />

      <Navbar
        revealStart={410}
        revealDistance={170}
        revealOnScroll
      />

      <section
        id="work"
        className="
          relative
          z-10
          pt-[58svh]
          pb-[80px]
        "
      >
        <HeroSection revealStart={450} revealDistance={140} />
      </section>

      <Footer />
    </main>
  );
}
