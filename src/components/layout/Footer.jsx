"use client";

import { motion } from "framer-motion";

import { siteConfig } from "@/data/siteConfig";

export default function Footer({
  compact = false,
}) {
  return (
    <footer
      id="contact"
      className={`
        relative
        z-10
        px-6
        ${compact ? "mt-8 pb-24 lg:pb-12" : "mt-[120px] pb-32 lg:pb-16"}
      `}
    >
      {/* LINE */}
      <div
        className="
          mx-auto
          mb-10

          h-px
          w-full
          max-w-[1100px]

          bg-white/[0.05]
        "
      />

      {/* CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
        }}
        className="
          mx-auto

          flex
          max-w-[1100px]

          flex-col
          items-center
          justify-center

          gap-4
        "
      >
        {/* NAME */}
        <h1
          className="
            text-[15px]

            font-medium

            tracking-[-0.03em]

            text-zinc-300
          "
        >
          {siteConfig.name}
        </h1>

        <div
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-3

            text-[11px]
            uppercase
            tracking-[0.2em]

            text-zinc-500
          "
        >
          {siteConfig.email && (
            <>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white"
              >
                Email
              </a>

              <span aria-hidden="true">/</span>
            </>
          )}

          {siteConfig.phone && (
            <>
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-white"
              >
                Call
              </a>

              <span aria-hidden="true">/</span>
            </>
          )}

          <a
            href="#work"
            className="hover:text-white"
          >
            Work
          </a>
        </div>

        {/* COPYRIGHT */}
        <p
          className="
            text-center

            text-[11px]
            md:text-[12px]

            uppercase

            tracking-[0.18em]

            text-zinc-500
          "
        >
          &copy; 2026 All Rights Reserved
        </p>
      </motion.div>
    </footer>
  );
}
