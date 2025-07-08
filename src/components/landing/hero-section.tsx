export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="lg:h-[600px] flex flex-col justify-center lg:px-24"
    >
      <span className="lg:text-7xl text-foreground/50 lg:font-extrabold text-wrap">
        A <span className="text-foreground/80">BERT</span>
        -based text contextualization toolkit
      </span>
    </section>
  );
}
