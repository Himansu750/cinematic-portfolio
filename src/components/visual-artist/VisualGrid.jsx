"use client";

import {
  useEffect,
  useRef,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { visualCategories } from "@/data/visualCategories";

export default function VisualGrid() {
  const router = useRouter();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
    restDelta: 0.001,
  });

  const promptOpacity = useTransform(
    progress,
    [0, 0.04, 0.14],
    [1, 1, 0]
  );

  const rippleScale = useTransform(
    progress,
    [0, 0.14],
    [0.86, 1.16]
  );

  const rippleY = useTransform(
    progress,
    [0, 0.14],
    ["0vh", "-3vh"]
  );

  const wallOpacity = useTransform(
    progress,
    [0.06, 0.18, 1],
    [0, 1, 1]
  );

  const wallY = useTransform(
    progress,
    [0.06, 0.24, 1],
    ["14vh", "3vh", "3vh"]
  );

  const wallScale = useTransform(
    progress,
    [0.06, 0.24, 1],
    [0.88, 1, 1]
  );

  const haloOpacity = useTransform(
    progress,
    [0, 0.08, 0.28, 1],
    [0.26, 0.72, 0.34, 0.2]
  );

  const haloScale = useTransform(
    progress,
    [0, 0.24, 1],
    [0.78, 1.08, 1.18]
  );

  const glassOpacity = useTransform(
    progress,
    [0, 0.12, 0.36],
    [0.42, 0.18, 0]
  );

  const glassY = useTransform(
    progress,
    [0, 0.36],
    ["0vh", "-18vh"]
  );

  useEffect(() => {
    visualCategories.forEach((category) => {
      router.prefetch(category.link);
    });
  }, [router]);

  return (
    <section
      ref={sectionRef}
      data-visual-grid-section
      className="
        relative
        z-10
        min-h-[108vh]
        bg-black
        text-white
        [perspective:1200px]
        lg:min-h-[118vh]
      "
    >
      <div
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          bg-[#020403]
        "
      >
        <LiquidScrollRipple
          opacity={promptOpacity}
          scale={rippleScale}
          y={rippleY}
        />

        <motion.p
          style={{ opacity: promptOpacity }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-40
            -translate-x-1/2
            -translate-y-1/2
            select-none
            text-[13px]
            font-medium
            tracking-[-0.02em]
            text-white/76
          "
        >
          Scroll down &darr;
        </motion.p>

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.28),rgba(0,0,0,0)_35%,rgba(0,0,0,0.56))]
          "
        />

        <motion.div
          aria-hidden="true"
          style={{
            opacity: haloOpacity,
            scale: haloScale,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            z-10
            h-[46vh]
            w-[78vw]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),rgba(160,160,150,0.08)_38%,rgba(0,0,0,0)_68%)]
            blur-2xl
            will-change-transform
          "
        />

        <motion.div
          aria-hidden="true"
          style={{
            opacity: glassOpacity,
            y: glassY,
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[46%]
            z-30
            h-[42vh]
            w-[82vw]
            -translate-x-1/2
            -translate-y-1/2
            rounded-[999px]
            border
            border-white/[0.08]
            bg-[linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02)_42%,rgba(255,255,255,0.06))]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_30px_120px_rgba(0,0,0,0.55)]
            backdrop-blur-[2px]
            will-change-transform
            md:w-[70vw]
            lg:w-[54vw]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[54%]
            z-20
            w-[82vw]
            -translate-x-1/2
            -translate-y-1/2
            transform-gpu
            will-change-transform
            sm:w-[80vw]
            md:w-[88vw]
            lg:w-[82vw]
            lg:max-w-[1260px]
          "
        >
          <motion.div
            style={{
              opacity: wallOpacity,
              y: wallY,
              scale: wallScale,
            }}
            className="
              grid
              grid-cols-2
              gap-2.5
              transform-gpu
              will-change-transform
              md:grid-cols-3
              md:gap-4
              lg:gap-6
            "
          >
            {visualCategories.map((category, index) => (
              <VisualStackCard
                key={category.link}
                category={category}
                index={index}
                progress={progress}
              />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function LiquidScrollRipple({
  opacity,
  scale,
  y,
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        opacity,
        scale,
        y,
      }}
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-30
        h-[170px]
        w-[170px]
        -translate-x-1/2
        -translate-y-1/2
        transform-gpu
        will-change-transform
        md:h-[220px]
        md:w-[220px]
      "
    >
      <svg
        className="
          h-full
          w-full
          overflow-visible
        "
        viewBox="0 0 220 220"
      >
        <defs>
          <filter
            id="liquid-scroll-distortion"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.036"
              numOctaves="3"
              seed="9"
              result="liquidNoise"
            >
              <animate
                attributeName="baseFrequency"
                dur="7s"
                repeatCount="indefinite"
                values="0.012 0.036;0.02 0.052;0.012 0.036"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="liquidNoise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <radialGradient id="liquid-scroll-fill">
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="76%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          <linearGradient
            id="liquid-scroll-stroke"
            x1="0"
            x2="1"
            y1="0"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.42)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
        </defs>

        <motion.circle
          cx="110"
          cy="110"
          r="78"
          fill="url(#liquid-scroll-fill)"
          filter="url(#liquid-scroll-distortion)"
          initial={false}
          animate={{
            r: [72, 84, 76, 82, 72],
            opacity: [0.38, 0.74, 0.42, 0.64, 0.38],
          }}
          transition={{
            duration: 5.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="110"
          cy="110"
          r="62"
          fill="none"
          stroke="url(#liquid-scroll-stroke)"
          strokeWidth="1"
          filter="url(#liquid-scroll-distortion)"
          initial={false}
          animate={{
            r: [56, 72, 60, 68, 56],
            opacity: [0.18, 0.58, 0.2, 0.42, 0.18],
          }}
          transition={{
            duration: 4.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.circle
          cx="110"
          cy="110"
          r="34"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="1"
          initial={false}
          animate={{
            r: [28, 44, 30, 40, 28],
            opacity: [0.12, 0.48, 0.16, 0.34, 0.12],
          }}
          transition={{
            duration: 3.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  );
}

function VisualStackCard({
  category,
  index,
  progress,
}) {
  const row = Math.floor(index / 3);
  const column = index % 3;
  const side = column === 0 ? -1 : column === 2 ? 1 : 0;
  const start = 0.06 + row * 0.036 + column * 0.012;
  const mid = start + 0.1;
  const end = start + 0.2;

  const opacity = useTransform(
    progress,
    [start, mid, end],
    [0, 0.9, 1]
  );
  const y = useTransform(
    progress,
    [start, mid, end],
    [38 + row * 16, 8 + row * 5, 0]
  );
  const x = useTransform(
    progress,
    [start, mid, end],
    [side * 22, side * 8, 0]
  );
  const rotateX = useTransform(
    progress,
    [start, mid, end],
    [12, 4, 0]
  );
  const rotateY = useTransform(
    progress,
    [start, mid, end],
    [side * 8, side * 3, 0]
  );
  const scale = useTransform(
    progress,
    [start, mid, end],
    [0.9, 0.98, 1]
  );

  return (
    <motion.article
      style={{
        opacity,
        x,
        y,
        rotateX,
        rotateY,
        scale,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      className="
        min-w-0
        transform-gpu
        will-change-transform
      "
    >
      <Link
        href={category.link}
        prefetch
        className="
          group
          relative
          block
          overflow-hidden
          rounded-[18px]
          border
          border-white/[0.1]
          bg-zinc-950
          shadow-[0_18px_60px_rgba(0,0,0,0.42)]
          outline-none
          transition
          duration-300
          active:scale-[0.985]
          focus-visible:ring-2
          focus-visible:ring-white/40
        "
      >
        <div
          className="
            relative
            aspect-[1.04/1]
            overflow-hidden
            rounded-[18px]
            bg-zinc-950
            md:aspect-[1.08/1]
            lg:aspect-[1.16/1]
          "
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="(min-width: 1024px) 27vw, (min-width: 768px) 31vw, 58vw"
            priority={index < 3}
            className="
              object-cover
              brightness-[0.82]
              contrast-[1.08]
              saturate-[0.92]
              transition
              duration-700
              group-hover:scale-[1.035]
              group-hover:brightness-100
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.12)_40%,rgba(0,0,0,0.62))]
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              flex
              items-end
              justify-between
              gap-3
              p-3
              opacity-100
              transition
              duration-300
            "
          >
            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white/78
              "
            >
              {category.title}
            </p>

            <span
              aria-hidden="true"
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.14]
                bg-black/34
                text-white/78
                backdrop-blur-xl
              "
            >
              <ArrowUpRight size={14} strokeWidth={1.7} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
