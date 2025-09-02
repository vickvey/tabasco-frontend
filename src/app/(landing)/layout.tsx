import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col border-2 max-w-screen text-foreground/70 lg:mx-24 xl:mx-48 2xl:mx-64">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
