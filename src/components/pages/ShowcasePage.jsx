"use client";

import { motion } from "framer-motion";

import AmbientBackground from "@/components/effects/AmbientBackground";
import Mobile3DScrollCard from "@/components/effects/Mobile3DScrollCard";
import Footer from "@/components/layout/Footer";
import {
  cardReveal,
  ease,
  pageReveal,
  premiumSpring,
  staggerContainer,
  tap,
} from "@/lib/motion";

export default function ShowcasePage({
  eyebrow,
  title,
  description,
  items,
}) {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-black
        text-white
      "
    >
      <AmbientBackground />

      <section
        className="
          relative
          z-10
          flex
          min-h-screen
          flex-col
          justify-center
          pt-[120px]
          pb-24

          site-container

          sm:pt-[140px]
          lg:pt-[150px]
        "
      >
        <motion.p
          variants={pageReveal}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.72,
            ease,
          }}
          className="
            mb-6
            text-[11px]
            uppercase
            tracking-[0.4em]
            text-white/45
          "
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          variants={pageReveal}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.04,
            duration: 0.86,
            ease,
          }}
          className="
            max-w-5xl
            font-black
            fluid-title
          "
        >
          {title}
        </motion.h1>

        <motion.p
          variants={pageReveal}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.12,
            duration: 0.78,
            ease,
          }}
          className="
            mt-10
            max-w-2xl
            text-[15px]
            leading-[1.9]
            text-zinc-400
            md:text-[18px]
          "
        >
          {description}
        </motion.p>

        <motion.a
          href="#project-grid"
          variants={pageReveal}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.18,
            duration: 0.7,
            ease,
          }}
          className="
            mt-10
            inline-flex
            w-fit
            items-center
            gap-3
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.045]
            px-5
            py-3
            text-[11px]
            uppercase
            tracking-[0.24em]
            text-white/70
            backdrop-blur-2xl
            hover:bg-white/[0.075]
            hover:text-white
          "
        >
          View Projects
          <span aria-hidden="true">&darr;</span>
        </motion.a>
      </section>

      <motion.section
        id="project-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "-80px",
        }}
        className="
          relative
          z-10
          columns-2
          gap-4
          pb-40

          site-container

          sm:gap-5
          md:columns-3
          max-lg:[perspective:950px]
          max-lg:[perspective-origin:50%_38%]
          lg:grid
          lg:grid-cols-2
          xl:grid-cols-3
          lg:pb-32
        "
      >
        {items.map((item, index) => (
          <Mobile3DScrollCard
            as="article"
            key={item.title}
            index={index}
            variants={cardReveal}
            whileHover={{
              y: -12,
              scale: 1.015,
              rotateX: 1.2,
            }}
            whileTap={tap}
            transition={premiumSpring}
            className="
              group
              relative
              mb-4
              break-inside-avoid
              overflow-hidden
              rounded-[22px]

              premium-surface
              hover-lift

              md:rounded-[28px]
              lg:mb-0
            "
          >
            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
              "
            >
              <motion.img
                src={item.poster}
                alt={item.title}
                loading="lazy"
                decoding="async"
                whileHover={{
                  scale: 1.045,
                }}
                transition={{
                  duration: 0.75,
                  ease,
                }}
                className="
                  h-full
                  w-full
                  object-cover
                  brightness-[0.9]
                  transition
                  duration-700
                  group-hover:brightness-100
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.88)),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.14),transparent_32%)]
                "
              />

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  p-6
                "
              >
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.32em]
                    text-white/45
                  "
                >
                  {item.type}
                </p>

                <h2
                  className="
                    mt-2
                    text-[clamp(1.65rem,5vw,2rem)]
                    font-semibold
                    tracking-[-0.05em]
                  "
                >
                  {item.title}
                </h2>
              </div>
            </div>
          </Mobile3DScrollCard>
        ))}
      </motion.section>

      <Footer />
    </main>
  );
}
