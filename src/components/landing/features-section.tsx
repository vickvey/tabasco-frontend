"use client";

import { motion } from "framer-motion";
import {
  Card,
  // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const cardsContent = [
  {
    icon: "🔍",
    title: "Detect Ambiguity Automatically",
    description:
      "Tabasco uses BERT embeddings to detect when a term is used in different ways across your corpus - no manual review needed.",
  },
  {
    icon: "📊",
    title: "Visualize Usage Clusters",
    description:
      "Understand how the same word appears in different contexts using KMeans clustering - ideal for technical writers, domain experts, and researchers.",
  },
  {
    icon: "📁",
    title: "Works on Your Domain Corpus",
    description:
      "Upload your own domain-specific dataset - from software documentation to academic papers - and get tailored insights on usage.",
  },
  {
    icon: "⚡",
    title: "Fast & Easy API Access",
    description:
      "Integrate Tabasco into your pipeline with our FastAPI-powered backend - process new corpora or embed it into your NLP stack easily.",
  },
];

export default function FeaturesSection() {
  return (
    <motion.section
      id="features-section"
      className="py-20 px-6 lg:px-24 scroll-margin-top"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center">
        What Tabasco Can Do
      </h2>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {cardsContent.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-sm hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="text-xl">
                  {card.icon} {card.title}
                </CardTitle>
                <CardDescription className="pt-1 text-muted-foreground">
                  {card.description}
                </CardDescription>
              </CardHeader>
              {/* Optional: Use <CardContent /> if additional info/buttons are needed */}
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
