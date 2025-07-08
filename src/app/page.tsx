import FeaturesSection from "@/components/landing/features-section";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col lg:mx-36 text-foreground/80">
      <Header />
      <main className="">
        <HeroSection />
        <FeaturesSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
