"use client";

import { motion } from "framer-motion";

import Footer from "@/components/layout/Footer";
import LazyVideo from "@/components/ui/LazyVideo";
import VisualGrid from "@/components/visual-artist/VisualGrid";

export default function VisualArtistPage() {
  return (
    <main
      className="
        relative
        min-h-screen

        overflow-x-hidden

        bg-black
        text-white
      "
    >

      {/* HERO */}
      <section
        className="
          relative

          flex
          min-h-screen
          items-center

          px-6
          pt-[120px]
          pb-[90px]
          md:px-14
          lg:pt-0
          lg:pb-0
        "
      >
        {/* VIDEO */}
        <div
          className="
            absolute
            inset-0

            overflow-hidden
          "
        >
          <LazyVideo
            src="/videos/optimized/visual-artist-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            rootMargin="640px 0px"
            poster="/images/optimized/personal5.webp"
            className="
              h-full
              w-full

              object-cover

              scale-[1.05]
            "
          />

          {/* DARK OVERLAY */}
          <div
            className="
              absolute
              inset-0

              bg-black/55
            "
          />

          {/* CINEMATIC LIGHT */}
          <div
            className="
              absolute
              inset-0

              bg-gradient-to-r
              from-black
              via-black/30
              to-transparent
            "
          />
        </div>

        {/* CONTENT */}
        <div
          className="
            relative
            z-10

            max-w-[700px]
          "
        >
          {/* SMALL TEXT */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="
              mb-6

              text-[11px]

              uppercase

              tracking-[0.45em]

              text-white/45
            "
          >
            Visual Art &bull; Direction
          </motion.p>

          {/* HUGE TITLE */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 80,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              text-[24vw]
              md:text-[10vw]

              font-black

              leading-[0.82]

              tracking-[-0.1em]

              text-white
            "
          >
            VISUAL
            <br />
            ART
          </motion.h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
              duration: 1,
            }}
            className="
              mt-8

              max-w-[520px]

              text-[15px]
              leading-[1.9]

              text-white/60
            "
          >
            Cinematic frames, visual systems,
            experimental edits, and emotional
            imagery shaped with a clean premium
            direction.
          </motion.p>
        </div>

        {/* SIDE LABEL */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
          className="
            absolute
            right-8
            top-1/2

            hidden
            md:block

            -translate-y-1/2
            rotate-90

            origin-center
          "
        >
          <p
            className="
              text-[10px]

              uppercase

              tracking-[0.5em]

              text-white/30
            "
          >
            Cinematic Portfolio Experience
          </p>
        </motion.div>
            </section>

      <VisualGrid />
      <Footer compact />
    </main>
  );
}
