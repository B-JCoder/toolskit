"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Smartphone, Clock } from "lucide-react";

const features = [
  {
    title: "Fast & Reliable",
    description:
      "All tools are optimized for speed and work instantly in your browser.",
    icon: Zap,
  },
  {
    title: "Privacy First",
    description:
      "We don’t collect or store your data. Everything runs locally.",
    icon: ShieldCheck,
  },
  {
    title: "Mobile Friendly",
    description:
      "Our tools are fully responsive and work seamlessly on any device.",
    icon: Smartphone,
  },
  {
    title: "Always Available",
    description: "Access ToolFixo anytime, anywhere – no sign-up required.",
    icon: Clock,
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ✨ Features of Our Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed with simplicity, speed, and security in mind — here’s what
            makes ToolFixo stand out.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-background/70 backdrop-blur-md border border-border rounded-xl shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
