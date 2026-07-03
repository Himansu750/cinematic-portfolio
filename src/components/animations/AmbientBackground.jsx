"use client";

import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* MAIN LIGHT */}
      <motion.div
        animate={{
          opacity: [0.14, 0.18, 0.14],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[18%]

          h-[900px]
          w-[900px]

          -translate-x-1/2

          rounded-full

          bg-white/[0.015]

          blur-[90px]
        "
      />

      {/* LEFT LIGHT */}
      <motion.div
        animate={{
          y: [-10, 10, -10],
          opacity: [0.06, 0.09, 0.06],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[-10%]
          top-[40%]

          h-[600px]
          w-[600px]

          rounded-full

          bg-blue-400/[0.015]

          blur-[80px]
        "
      />

      {/* RIGHT LIGHT */}
      <motion.div
        animate={{
          y: [10, -10, 10],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-10%]
          top-[15%]

          h-[600px]
          w-[600px]

          rounded-full

          bg-violet-400/[0.012]

          blur-[80px]
        "
      />

      {/* DARK VIGNETTE */}
      <div
        className="
          absolute
          inset-0

          bg-[radial-gradient(circle_at_center,transparent_20%,#050505_90%)]
        "
      />
    </div>
  );
}