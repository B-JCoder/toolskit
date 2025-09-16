"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000) // video ka duration
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Background Video */}
          <video
            src="https://v1.pinimg.com/videos/iht/720p/49/5e/d1/495ed1996ab5177e2422d1b21569a7b0.mp4"
            autoPlay
            muted
            playsInline
            className="object-cover"
          />

          {/* Overlay Text */}
          <motion.h1
            className="absolute bottom-10 text-white text-4xl font-bold"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Toolkit 🚀
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
