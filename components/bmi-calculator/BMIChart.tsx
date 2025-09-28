"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export const BMIChart: React.FC = () => {
  const categories = [
    { range: "< 18.5", category: "Underweight", color: "bg-bmi-accent", textColor: "text-bmi-accent" },
    { range: "18.5 - 24.9", category: "Normal weight", color: "bg-bmi-success", textColor: "text-bmi-success" },
    { range: "25.0 - 29.9", category: "Overweight", color: "bg-bmi-warning", textColor: "text-bmi-warning" },
    { range: "≥ 30.0", category: "Obese", color: "bg-bmi-danger", textColor: "text-bmi-danger" },
  ];

  // Icon mapping (no changes to your data array)
  const icons: Record<string, React.ElementType> = {
    Underweight: Activity,
    "Normal weight": CheckCircle2,
    Overweight: AlertTriangle,
    Obese: XCircle,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
      className="relative"
    >
      {/* Glow effect for branding */}
      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-bmi-card via-bmi-hover to-bmi-card opacity-70 blur-md pointer-events-none"></div>

      <Card className="relative p-6 w-100 bg-gradient-to-br from-bmi-card to-bmi-hover border-bmi-input-border shadow-xl rounded-2xl overflow-hidden">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg sm:text-xl font-bold text-foreground mb-4 text-center tracking-wide"
        >
          BMI Categories Reference
        </motion.h3>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="space-y-3"
        >
          {categories.map((cat, index) => {
            const Icon = icons[cat.category];
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, x: 5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${cat.color}`} />
                  {Icon && <Icon className={`${cat.textColor} w-5 h-5`} />}
                  <span className="font-medium text-foreground">{cat.category}</span>
                </div>
                <span className={`font-semibold ${cat.textColor}`}>{cat.range}</span>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 p-3 bg-bmi-hover rounded-lg"
        >
          <p className="text-xs text-bmi-muted text-center leading-relaxed">
            * BMI is a screening tool and may not reflect body composition.
            Consult healthcare providers for comprehensive health assessment.
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
};
