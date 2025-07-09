import DemoPreviewSection from "@/components/landing/demo-preview-section";
import FeaturesSection from "@/components/landing/features-section";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import WhoIsTabascoForSection from "@/components/landing/who-is-Tabasco-for-section";

const Divider = () => <section className="h-px bg-muted/70 my-12" />;

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col lg:mx-24 text-foreground/70">
      <Header />
      <main className="">
        <HeroSection />
        <Divider />
        <FeaturesSection />
        <Divider />
        <WhoIsTabascoForSection />
        <Divider />
        <HowItWorksSection />
        <Divider />
        <DemoPreviewSection />
      </main>
      <Footer />
    </div>
  );
}
