import DemoPreviewSection from "@/components/landing/demo-preview-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import WhoIsTabascoForSection from "@/components/landing/who-is-Tabasco-for-section";

const Divider = () => <section className="h-px bg-muted/70 my-12" />;

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <Divider />
      <FeaturesSection />
      <Divider />
      <WhoIsTabascoForSection />
      <Divider />
      <HowItWorksSection />
      <Divider />
      <DemoPreviewSection />
    </div>
  );
}
