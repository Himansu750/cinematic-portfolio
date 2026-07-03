"use client";

import { motion } from "framer-motion";

export default function VisualTransition() {
  return (
    <section
      className="
        relative

        flex
        h-[65vh]
        items-center
        justify-center

        overflow-hidden

        bg-black
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-1/2

          h-[500px]
          w-[500px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-white/[0.03]

          blur-[140px]
        "
      />

      {/* TOP LINE */}
      <div
        className="
          absolute
          top-0
          left-1/2

          h-px
          w-[80%]

          -translate-x-1/2

          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />

      {/* BIG TEXT */}
      <motion.h2
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10

          text-center

          text-[18vw]
          md:text-[10vw]

          font-black

          leading-none

          tracking-[-0.1em]

          text-white/[0.06]
        "
      >
        SELECTED
        <br />
        WORK
      </motion.h2>

      {/* SMALL TEXT */}
      <motion.p
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.2,
          duration: 1,
        }}
        className="
          absolute
          z-20

          max-w-[600px]

          px-6

          text-center

          text-[13px]
          leading-[2]

          uppercase

          tracking-[0.3em]

          text-white/40
        "
      >
        A curated collection of cinematic
        visuals, immersive storytelling,
        luxury compositions, and emotional
        visual atmospheres.
      </motion.p>
    </section>
  );
}