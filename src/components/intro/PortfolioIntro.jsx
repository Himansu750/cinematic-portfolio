"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function PortfolioIntro() {
  const { scrollY } = useScroll();
  const [hideIntroOnReturn, setHideIntroOnReturn] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      return (
        window.sessionStorage.getItem(
          "returnToHomeWork"
        ) === "true"
      );
    });
  const [distance, setDistance] = useState(520);
  const [isCompact, setIsCompact] =
    useState(false);

  useEffect(() => {
    function updateIntro() {
      const compact = window.innerWidth < 900;

      setIsCompact(compact);
      setDistance(
        compact
          ? Math.max(
              360,
              Math.min(
                520,
                window.innerHeight * 0.58
              )
            )
          : Math.max(
              420,
              Math.min(
                620,
                window.innerHeight * 0.68
              )
            )
      );
    }

    updateIntro();
    window.addEventListener("resize", updateIntro);

    return () => window.removeEventListener("resize", updateIntro);
  }, []);

  useEffect(() => {
    if (!hideIntroOnReturn) {
      return;
    }

    function revealIntroWhenScrollingBack() {
      if (window.scrollY < 220) {
        setHideIntroOnReturn(false);
      }
    }

    revealIntroWhenScrollingBack();

    window.addEventListener(
      "scroll",
      revealIntroWhenScrollingBack,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        revealIntroWhenScrollingBack
      );
    };
  }, [hideIntroOnReturn]);

  const stretchY = useTransform(
    scrollY,
    [0, distance],
    [1, isCompact ? 2.45 : 3.15]
  );

  const textRotateX = useTransform(
    scrollY,
    [0, distance],
    [0, isCompact ? -8 : -11]
  );

  const cameraY = useTransform(
    scrollY,
    [0, distance],
    [0, isCompact ? -120 : -170]
  );

  const cameraZ = useTransform(
    scrollY,
    [0, distance],
    [0, isCompact ? 220 : 320]
  );

  const cameraRotateX = useTransform(
    scrollY,
    [0, distance],
    [0, isCompact ? 8 : 10]
  );

  const depthShadowY = useTransform(
    scrollY,
    [0, distance],
    [14, isCompact ? 86 : 128]
  );

  const depthShadowScaleY = useTransform(
    scrollY,
    [0, distance],
    [0.95, isCompact ? 2.05 : 2.65]
  );

  const depthShadowOpacity = useTransform(
    scrollY,
    [0, distance * 0.18, distance * 0.78],
    [0, 0.34, 0]
  );

  const liquidDistortion = useTransform(
    scrollY,
    [
      0,
      distance * 0.18,
      distance * 0.58,
      distance,
    ],
    [0, isCompact ? 0 : 10, isCompact ? 0 : 38, 0]
  );

  const liquidFrequency = useTransform(
    scrollY,
    [0, distance * 0.52, distance],
    [
      "0.006 0.024",
      isCompact ? "0.008 0.082" : "0.01 0.105",
      "0.004 0.018",
    ]
  );

  const colorSplit = useTransform(
    scrollY,
    [0, distance * 0.62, distance],
    [0, isCompact ? 3 : 5, 0]
  );

  const reverseColorSplit = useTransform(
    colorSplit,
    (value) => -value
  );

  const liquidGlowOpacity = useTransform(
    scrollY,
    [0, distance * 0.24, distance * 0.76],
    [0, 0.34, 0]
  );

  const spacing = useTransform(
    scrollY,
    [0, distance],
    isCompact
      ? ["-0.055em", "0.08em"]
      : ["-0.08em", "0.22em"]
  );

  const opacity = useTransform(
    scrollY,
    [
      0,
      distance * 0.45,
      distance * 0.78,
      distance,
    ],
    [1, 0.92, 0.18, 0]
  );

  const y = useTransform(
    scrollY,
    [0, distance],
    [0, isCompact ? -82 : -126]
  );

  const helperOpacity = useTransform(
    scrollY,
    [0, distance * 0.22],
    [1, 0]
  );

  if (hideIntroOnReturn) {
    return null;
  }

  return (
    <motion.section
      style={{ opacity, y }}
      className="
        fixed inset-0 z-[300]
        flex items-center justify-center
        pointer-events-none
        perspective-[900px]
        [perspective-origin:50%_30%]
      "
    >
      <svg
        aria-hidden="true"
        className="absolute h-0 w-0"
      >
        <filter
          id="portfolio-scroll-liquid"
          x="-35%"
          y="-120%"
          width="170%"
          height="340%"
          colorInterpolationFilters="sRGB"
        >
          <motion.feTurbulence
            type="fractalNoise"
            baseFrequency={liquidFrequency}
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <motion.feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={liquidDistortion}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <motion.div
        style={{
          y: cameraY,
          z: cameraZ,
          rotateX: cameraRotateX,
          transformStyle: "preserve-3d",
          transformOrigin: "50% 0%",
        }}
        className="
          flex
          w-full
          max-w-[100vw]
          -translate-y-[2svh]
          flex-col
          items-center
          px-4

          md:-translate-y-[4svh]
        "
      >
        <motion.div
          aria-hidden="true"
          style={{
            x: "-50%",
            y: depthShadowY,
            scaleY: depthShadowScaleY,
            opacity: depthShadowOpacity,
            transformOrigin: "center top",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[clamp(3rem,13vw,6rem)]
            w-[min(92vw,980px)]
            bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03)_42%,transparent)]
            blur-2xl
            will-change-transform
          "
        />

        <div
          className="
            relative
            flex
            w-[min(94vw,1240px)]
            max-w-full
            justify-center
            overflow-visible
          "
        >
          <motion.h1
            aria-hidden="true"
            style={{
              x: colorSplit,
              scaleY: stretchY,
              rotateX: textRotateX,
              letterSpacing: spacing,
              opacity: liquidGlowOpacity,
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
            }}
            className="
              absolute
              inset-0
              w-full
              text-center
              text-[clamp(3rem,13vw,6rem)]
              md:text-[10vw]
              font-black
              leading-none
              tracking-[-0.08em]
              text-white/35
              blur-[2px]
              mix-blend-screen
              will-change-transform
              select-none
            "
          >
            PORTFOLIO
          </motion.h1>

          <motion.h1
            aria-hidden="true"
            style={{
              x: reverseColorSplit,
              scaleY: stretchY,
              rotateX: textRotateX,
              letterSpacing: spacing,
              opacity: liquidGlowOpacity,
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
            }}
            className="
              absolute
              inset-0
              w-full
              text-center
              text-[clamp(3rem,13vw,6rem)]
              md:text-[10vw]
              font-black
              leading-none
              tracking-[-0.08em]
              text-zinc-300/30
              blur-[2px]
              mix-blend-screen
              will-change-transform
              select-none
            "
          >
            PORTFOLIO
          </motion.h1>

          <motion.h1
            style={{
              scaleY: stretchY,
              rotateX: textRotateX,
              letterSpacing: spacing,
              filter: isCompact
                ? "none"
                : "url(#portfolio-scroll-liquid)",
              transformOrigin: "50% 0%",
              transformStyle: "preserve-3d",
            }}
            className="
              relative
              w-full
              max-w-full
              text-center
              text-[clamp(3rem,13vw,6rem)]
              md:text-[10vw]
              font-black leading-none
              tracking-[-0.08em]
              text-white
              will-change-transform
              select-none
              [text-shadow:0_20px_90px_rgba(255,255,255,0.14),0_0_36px_rgba(255,255,255,0.07)]
            "
          >
            PORTFOLIO
          </motion.h1>
        </div>

        <motion.p
          style={{ opacity: helperOpacity }}
          className="
            mt-8
            text-[10px] md:text-[11px]
            uppercase tracking-[0.35em]
            text-white/38
            select-none
          "
        >
          Scroll Down To Explore
        </motion.p>

        <motion.div
          style={{ opacity: helperOpacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            mt-6
            flex items-start justify-center
            h-14 w-8
            rounded-full
            border border-white/14
            bg-white/[0.025]
            backdrop-blur-xl
          "
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-2 h-2 w-2 rounded-full bg-white/70"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
