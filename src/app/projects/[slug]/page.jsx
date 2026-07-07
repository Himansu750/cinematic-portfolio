"use client";

import { use } from "react";

import { notFound } from "next/navigation";

import { motion } from "framer-motion";

import Footer from "@/components/layout/Footer";

import AmbientBackground from "@/components/effects/AmbientBackground";
import Mobile3DScrollCard from "@/components/effects/Mobile3DScrollCard";
import LazyVideo from "@/components/ui/LazyVideo";

import { projects } from "@/data/projects";

export default function ProjectPage({
  params,
}) {
  const { slug } = use(params);

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

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

      {/* HERO */}
      <section
        className="
          relative
          z-10

          mx-auto

          flex
          min-h-screen
          max-w-[1400px]

          flex-col
          justify-center

          px-6
          pt-[140px]
          pb-[100px]
        "
      >
        {/* CATEGORY */}
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
            duration: 0.8,
          }}
          className="
            mb-6

            text-[11px]

            uppercase

            tracking-[0.35em]

            text-white/40
          "
        >
          {project.category}
        </motion.p>

        {/* TITLE */}
        <motion.h1
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            max-w-5xl

            text-[16vw]
            md:text-[7vw]

            font-black

            leading-[0.9]

            tracking-[-0.08em]
          "
        >
          {project.title}
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          initial={{
            opacity: 0,
            y: 40,
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
            mt-10

            max-w-2xl

            text-[15px]
            md:text-[18px]

            leading-[1.9]

            text-zinc-400
          "
        >
          {project.description}
        </motion.p>

        {/* VIDEO */}
        <Mobile3DScrollCard
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 1,
          }}
          className="
            relative

            mt-20

            overflow-hidden

            rounded-[36px]

            border
            border-white/[0.06]

            bg-black/50

            shadow-[0_25px_120px_rgba(0,0,0,0.75)]
          "
        >
          <LazyVideo
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            rootMargin="420px 0px"
            className="
              h-full
              w-full

              object-cover
            "
          />
        </Mobile3DScrollCard>
      </section>

      <Footer />
    </main>
  );
}
