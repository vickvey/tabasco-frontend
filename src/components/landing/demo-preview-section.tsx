"use client";

import { motion } from "framer-motion";

export default function DemoPreviewSection() {
  return (
    <motion.section
      id="demo-preview-section"
      className="py-20 px-6 lg:px-24 bg-muted/30 text-center rounded-xl scroll-margin-top"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl lg:text-5xl font-bold mb-6">Live Demo Preview</h2>
      <p className="text-muted-foreground text-lg">
        🚧 This section will soon showcase an interactive preview of Tabasco in
        action.
        <br />
        Until then, stay tuned!
      </p>
    </motion.section>
  );
}
