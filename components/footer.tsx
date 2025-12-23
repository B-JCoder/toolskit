"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-16 text-white">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://v1.pinimg.com/videos/mc/720p/44/12/67/441267f7b86440dbb3d1f718c8c0b001.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Top grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-4"
            >
              🚀 ToolFixo
            </motion.h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your ultimate collection of free calculators, generators, and
              utilities. Making tasks simpler & smarter.
            </p>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              {["Home", "About", "Tools", "Contact"].map((link, i) => (
                <li key={i}>
                  <Link
                    href={`/${link.toLowerCase()}`}
                    className="hover:text-white transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/tools/health" className="hover:text-white">
                  Health & Fitness
                </Link>
              </li>
              <li>
                <Link href="/tools/education" className="hover:text-white">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/tools/productivity" className="hover:text-white">
                  Productivity
                </Link>
              </li>
              <li>
                <Link href="/tools/creative" className="hover:text-white">
                  Creative
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin, Github].map(
                (Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="p-2 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/20 my-10"></div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400"
        >
          <p>© {new Date().getFullYear()} ToolFixo. All rights reserved.</p>
          <p>
            Built By{" "}
            <Link
              href="https://bshsolutionss.com/"
              className="hover:text-white font-semibold"
            >
              BSH SOLUTIONS
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
