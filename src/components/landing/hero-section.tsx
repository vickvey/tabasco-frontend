"use client";

import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      id="hero-section"
      className="lg:h-[600px] flex flex-col justify-center lg:px-24 py-16 px-6 scroll-margin-top"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="text-left max-w-4xl">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
          Understand your domain. Uncover ambiguity.
        </h1>

        <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl">
          Tabasco is an NLP-powered tool that helps you uncover{" "}
          <span className="font-semibold text-foreground">
            intra-domain ambiguities
          </span>{" "}
          in your technical corpus. Know exactly when and where your terms are
          used inconsistently — before they cause confusion.
        </p>

        <div className="flex gap-4">
          <Button className="hover:cursor-pointer">Try Demo</Button>
          <Button
            variant="outline"
            className="hover:cursor-pointer hover:underline text-foreground"
          >
            Learn More
          </Button>
        </div>
      </div>
    </motion.section>
  );
}
