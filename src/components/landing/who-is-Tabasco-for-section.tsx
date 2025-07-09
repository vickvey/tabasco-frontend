"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const userProfiles = [
  {
    icon: "🧠",
    title: "Researchers & Academics",
    description:
      "Ensure consistent terminology in your scientific papers or theses - spot ambiguous terms in domain-specific literature.",
  },
  {
    icon: "💻",
    title: "Engineers & Developers",
    description:
      "Review technical documentation for confusing usage of domain terms before handing it off to stakeholders or users.",
  },
  {
    icon: "📝",
    title: "Technical Writers",
    description:
      "Polish large corpora of documentation by identifying where terms are used inconsistently - before confusion spreads.",
  },
  {
    icon: "📚",
    title: "Anyone With a Domain Corpus",
    description:
      "Have a document set in your own field? Tabasco works best on single-domain corpora where clarity of language matters.",
  },
];

export default function WhoIsTabascoForSection() {
  return (
    <motion.section
      id="ideal-users-section"
      className="py-20 px-6 lg:px-24 scroll-margin-top"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl lg:text-5xl font-bold mb-12 text-center">
        Who Is Tabasco For?
      </h2>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {userProfiles.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full shadow-sm hover:shadow-md transition">
              <CardHeader>
                <CardTitle className="text-xl">
                  {user.icon} {user.title}
                </CardTitle>
                <CardDescription className="pt-1 text-muted-foreground">
                  {user.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
