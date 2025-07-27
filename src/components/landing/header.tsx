import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

function HeroHeader() {
  return (
    // <div className="flex items-center lg:space-x-2">
    //   <div className="lg:h-12 lg:w-12 rounded-full bg-accent"></div>
    //   <div className="lg:text-xl lg:font-bold">TABASCO</div>
    // </div>
    <Link href="/" className="flex items-center lg:space-x-2">
      <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-accent"></div>
      <span className="text-lg lg:text-xl font-bold">TABASCO</span>
    </Link>
  );
}

function NavBar() {
  return (
    <nav>
      <ul className="lg:h-14 flex bg-card lg:space-x-4 lg:px-7 lg:py-3.5 lg:rounded-full lg:font-medium items-center">
        {/* ✅ Updated nav item: Home → Hero */}
        <li className="px-3 py-1 rounded-md hover:bg-accent hover:text-foreground transition-colors duration-300 hover:cursor-pointer">
          <Link href={"#hero-section"}>Home</Link>
        </li>
        <Separator orientation="vertical" />

        {/* ✅ Updated nav item: Features */}
        <li className="px-3 py-1 rounded-md hover:bg-accent hover:text-foreground transition-colors duration-300 hover:cursor-pointer">
          <Link href={"#features-section"}>Features</Link>
        </li>
        <Separator orientation="vertical" />

        {/* ✅ New nav item: Who It's For */}
        <li className="px-3 py-1 rounded-md hover:bg-accent hover:text-foreground transition-colors duration-300 hover:cursor-pointer">
          <Link href={"#ideal-users-section"}>Who It's For</Link>
        </li>
        <Separator orientation="vertical" />

        {/* ✅ New nav item: Demo */}
        <li className="px-3 py-1 rounded-md hover:bg-accent hover:text-foreground transition-colors duration-300 hover:cursor-pointer">
          <Link href={"#demo-preview-section"}>Demo</Link>
        </li>
        <Separator orientation="vertical" />

        {/* ✅ New nav item: How It Works */}
        <li className="px-3 py-1 rounded-md hover:bg-accent hover:text-foreground transition-colors duration-300 hover:cursor-pointer">
          <Link href={"#how-it-works-section"}>How It Works</Link>
        </li>
      </ul>
    </nav>
  );
}

function HeroTrail() {
  return (
    <div className="flex lg:space-x-4 px-2 items-center">
      <ToggleTheme />
      <Button>
        <Link href={"/user"}>Get Started</Link>
      </Button>
    </div>
  );
}

export default function Header() {
  return (
    <header className=" sticky z-50 top-5 backdrop-blur-lg border-b border-border shadow-sm flex justify-between lg:px-4 lg:py-2 items-center rounded-full">
      <HeroHeader />
      <NavBar />
      <HeroTrail />
    </header>
  );
}
