import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

function HeroHeader() {
  return (
    <div className="flex items-center lg:space-x-2">
      <div className="lg:h-12 lg:w-12 rounded-full bg-accent"></div>
      <div className="lg:text-xl lg:font-bold">TABASCO</div>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="">
      <ul className="lg:h-14 flex bg-card lg:space-x-4 lg:px-7 lg:py-3.5 lg:rounded-full lg:font-medium items-center">
        <li
          id="ni-home"
          className="hover:text-foreground transition-colors duration-300 hover:bg-accent"
        >
          <Link href={"#hero-section"}>Home</Link>
        </li>
        <Separator orientation="vertical" />

        <li
          id="ni-features"
          className="hover:text-foreground transition-colors duration-300 hover:bg-accent"
        >
          <Link href={"#features-section"}>Features</Link>
        </li>
        <Separator orientation="vertical" />

        <li className="hover:text-foreground transition-colors duration-300 hover:bg-accent">
          gamma
        </li>
        <Separator orientation="vertical" />

        <li className="hover:text-foreground transition-colors duration-300 hover:bg-accent">
          delta
        </li>
        <Separator orientation="vertical" />

        <li className="hover:text-foreground transition-colors duration-300 hover:bg-accent">
          mu
        </li>
        <Separator orientation="vertical" />

        <li className="hover:text-foreground transition-colors duration-300 hover:bg-accent">
          zeta
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
    <header className="sticky z-50 top-0 backdrop-blur-lg flex justify-between lg:p-4 items-center">
      <HeroHeader />
      <NavBar />
      <HeroTrail />
    </header>
  );
}
