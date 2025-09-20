"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Calculator, MousePointerClick, Keyboard, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import Hero3d from "./Hero3d";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating animation config
  const floatTransition = {
    duration: 3,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black pt-16 overflow-hidden">
      {/* Hero3D as Background */}
      <div className="absolute inset-0 z-0">
        <Hero3d />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] z-10" />

      {/* Mouse Tracking Glow */}
      <div
        className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-primary/20 rounded-full blur-3xl pointer-events-none transition-transform duration-200 z-20"
        style={{
          transform: `translate(${mousePosition.x - 200}px, ${
            mousePosition.y - 200
          }px)`,
        }}
      />

      {/* Floating Icons */}
      <motion.div
        className="hidden sm:block absolute top-20 left-10 text-white/70 z-20"
        animate={{ y: [0, 30, 0] }}
        transition={floatTransition}
      >
        <Calculator size={60} />
      </motion.div>

      <motion.div
        className="hidden sm:block absolute bottom-28 right-16 text-white/70 z-20"
        animate={{ y: [0, -25, 0] }}
        transition={floatTransition}
      >
        <Keyboard size={60} />
      </motion.div>

      <motion.div
        className="hidden sm:block absolute top-40 right-1/3 text-white/70 z-20"
        animate={{ y: [0, 40, 0] }}
        transition={floatTransition}
      >
        <MousePointerClick size={55} />
      </motion.div>

      <motion.div
        className="hidden sm:block absolute bottom-16 left-1/4 text-white/70 z-20"
        animate={{ y: [0, -35, 0] }}
        transition={floatTransition}
      >
        <BarChart3 size={55} />
      </motion.div>

      {/* Content */}
      <div className="relative z-30 max-w-4xl mx-auto text-center px-4">
        <motion.h1
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Handy Web Tools
        </motion.h1>

        <motion.p
          className="text-sm sm:text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A collection of useful online tools to help you with calculations,
          testing, and generation tasks. All tools are free to use and work
          directly in your browser.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="#tools">Explore Tools</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
