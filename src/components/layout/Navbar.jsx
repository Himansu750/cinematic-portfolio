"use client";

import { useSyncExternalStore } from "react";

import { motion } from "framer-motion";

import { siteConfig } from "@/data/siteConfig";

function subscribeToScroll(callback) {
  window.addEventListener("scroll", callback, {
    passive: true,
  });
  window.addEventListener("resize", callback);

  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}

function getScrollSnapshot() {
  return window.scrollY;
}

function getServerScrollSnapshot() {
  return 0;
}

export default function Navbar({
  revealAt = 0,
  revealStart,
  revealDistance = 140,
  revealOnScroll = false,
}) {
  const scrollY = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerScrollSnapshot
  );

  const animationStart =
    revealStart ?? Math.max(0, revealAt - 110);

  const shouldShowImmediately = !revealOnScroll;

  const animationEnd =
    revealAt > animationStart
      ? revealAt
      : animationStart + revealDistance;

  const revealProgress = shouldShowImmediately
    ? 1
    : Math.min(
        1,
        Math.max(
          0,
          (scrollY - animationStart) /
            Math.max(1, animationEnd - animationStart)
        )
      );

  const opacity = revealProgress;
  const y = -72 * (1 - revealProgress);
  const scale = 0.92 + 0.08 * revealProgress;
  const blur = 14 * (1 - revealProgress);

  return (
    <motion.header
      initial={false}
      animate={{
        opacity,
        y,
        scale,
        filter: `blur(${blur}px)`,
      }}
      transition={{
        duration: 0.24,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        pointerEvents:
          revealProgress > 0.02 ? "auto" : "none",
      }}
      className="
        fixed
        top-4
        inset-x-0
        z-[5000]

        flex
        justify-center

        px-4

        sm:top-6
        md:top-[40px]
      "
    >
      <div
        className="
          relative

          flex
          min-h-[64px]
          w-full
          max-w-[760px]
          flex-col
          items-center
          justify-center

          overflow-hidden
          rounded-[32px]
          border
          border-white/[0.12]
          bg-[rgba(8,8,10,0.94)]

          px-6
          py-4

          text-center

          shadow-[0_22px_90px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.09),inset_0_-24px_60px_rgba(255,255,255,0.025)]
          backdrop-blur-[26px]
          backdrop-saturate-[95%]

          before:absolute
          before:inset-0
          before:rounded-[inherit]
          before:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),rgba(255,255,255,0.035)_34%,transparent_68%)]
          before:pointer-events-none
        "
      >
        <div
          className="
            absolute
            inset-0
            rounded-[inherit]

            bg-gradient-to-b
            from-white/[0.085]
            via-white/[0.026]
            to-black/[0.18]

            pointer-events-none
          "
        />

        <div
          className="
            absolute
            inset-x-8
            bottom-0
            h-10
            rounded-full
            bg-white/[0.035]
            blur-2xl
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
          "
        />

        <h1
          className="
            relative
            z-10

            text-[15px]
            font-medium
            tracking-[-0.035em]
            text-white

            sm:text-[16px]
          "
        >
          {siteConfig.name}
        </h1>

        <p
          className="
            relative
            z-10

            mt-[4px]

            max-w-full
            whitespace-nowrap

            text-[clamp(7px,2vw,9px)]
            uppercase
            tracking-[0.12em]
            text-zinc-400

            sm:text-[10px]
            sm:tracking-[0.22em]
          "
        >
          {siteConfig.role}
        </p>
      </div>
    </motion.header>
  );
}
