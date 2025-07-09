"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Step 1: Upload Domain PDF",
    description:
      "User uploads a PDF containing domain-specific text. Tabasco starts parsing the document.",
    side: "left",
  },
  {
    title: "Step 2: Automatic Noun Extraction",
    description:
      "The app analyzes your corpus using NLP and extracts nouns (candidates for analysis).",
    side: "right",
  },
  {
    title: "Step 3: Noun Selection & Cluster Suggestion",
    description:
      "User selects a noun, and Tabasco generates an elbow plot to suggest optimal number of clusters.",
    side: "left",
  },
  {
    title: "Step 4: View Clusters & Reports",
    description:
      "User provides the sentence frequency for context. App then forms clusters and generates both summary and detailed reports.",
    side: "right",
  },
];

export default function HowItWorksSection() {
  return (
    <motion.section
      id="how-it-works-section"
      className="py-20 px-6 lg:px-24 scroll-margin-top"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-center">
        How It Works
      </h2>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2"></div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col lg:flex-row items-center lg:items-start ${
                step.side === "left" ? "lg:justify-start" : "lg:justify-end"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`bg-background shadow-sm border rounded-xl p-6 w-full lg:w-[40%] ${
                  step.side === "left" ? "lg:mr-auto" : "lg:ml-auto"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
