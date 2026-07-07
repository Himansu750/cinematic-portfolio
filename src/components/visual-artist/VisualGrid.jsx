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
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { visualCategories } from "@/data/visualCategories";

export default function VisualGrid() {
  const router = useRouter();
  const liquidRef = useRef(null);
  const tunnelRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: liquidRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
    restDelta: 0.001,
  });

  const rippleX = useSpring(pointerX, {
    stiffness: 120,
    damping: 24,
    mass: 0.28,
  });
  const ripplePointerY = useSpring(pointerY, {
    stiffness: 120,
    damping: 24,
    mass: 0.28,
  });

  const promptOpacity = useTransform(
    progress,
    [0, 0.08, 0.28, 0.38],
    [1, 1, 1, 0]
  );

  const rippleScale = useTransform(
    progress,
    [0, 0.24, 0.52],
    [0.82, 1.08, 0.92]
  );

  const rippleY = useTransform(
    progress,
    [0, 0.34, 0.54],
    ["0vh", "-3vh", "-10vh"]
  );

  const rippleOpacity = useTransform(
    progress,
    [0, 0.12, 0.42, 0.56],
    [1, 1, 0.9, 0]
  );

  const haloOpacity = useTransform(
    progress,
    [0, 0.16, 0.54],
    [0.22, 0.52, 0]
  );

  const haloScale = useTransform(
    progress,
    [0, 0.42],
    [0.8, 1.08]
  );

  const glassOpacity = useTransform(
    progress,
    [0, 0.18, 0.5],
    [0.28, 0.2, 0]
  );

  const glassY = useTransform(
    progress,
    [0, 0.5],
    ["0vh", "-14vh"]
  );

  const { scrollYProgress: tunnelScroll } = useScroll({
    target: tunnelRef,
    offset: ["start start", "end end"],
  });

  const tunnelProgress = useSpring(tunnelScroll, {
    stiffness: 82,
    damping: 24,
    mass: 0.34,
    restDelta: 0.001,
  });

  const tunnelOpacity = useTransform(
    tunnelProgress,
    [0, 0.1, 1],
    [0, 1, 1]
  );

  const tunnelY = useTransform(
    tunnelProgress,
    [0, 0.2, 1],
    ["18vh", "2vh", "2vh"]
  );

  const tunnelScale = useTransform(
    tunnelProgress,
    [0, 0.24, 1],
    [0.86, 1, 1]
  );

  useEffect(() => {
    visualCategories.forEach((category) => {
      router.prefetch(category.link);
    });
  }, [router]);

  function handlePointerMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    pointerX.set((x / bounds.width) * 54);
    pointerY.set((y / bounds.height) * 42);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <>
    <section
      ref={liquidRef}
      data-visual-grid-section
      className="
        relative
        z-10
        min-h-[104vh]
        bg-black
        text-white
        [perspective:1200px]
        lg:min-h-[112vh]
      "
    >
      <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          bg-[#020403]
        "
      >
        <LiquidScrollRipple
          opacity={rippleOpacity}
          scale={rippleScale}
          y={rippleY}
          pointerX={rippleX}
          pointerY={ripplePointerY}
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

      </div>
    </section>

    <section
      ref={tunnelRef}
      className="
        relative
        z-20
        min-h-[132vh]
        bg-black
        text-white
        [perspective:1200px]
        lg:min-h-[142vh]
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
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_44%,rgba(255,255,255,0.055),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.34),rgba(0,0,0,0)_34%,rgba(0,0,0,0.56))]
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
              opacity: tunnelOpacity,
              y: tunnelY,
              scale: tunnelScale,
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
                progress={tunnelProgress}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}

function LiquidScrollRipple({
  opacity,
  scale,
  y,
  pointerX,
  pointerY,
}) {
  return (
    <div
      aria-label="Interactive liquid distortion preview"
      className="
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-30
        h-[300px]
        w-[300px]
        -translate-x-1/2
        -translate-y-1/2
        transform-gpu
        will-change-transform
        md:h-[420px]
        md:w-[420px]
      "
    >
      <motion.div
        style={{
          opacity,
          scale,
          y,
        }}
        className="
          absolute
          inset-0
          transform-gpu
          will-change-transform
        "
      >
        <motion.div
          style={{
            x: pointerX,
            y: pointerY,
          }}
          className="
            absolute
            inset-0
            transform-gpu
            will-change-transform
          "
        >
          <svg
            className="
              absolute
              inset-0
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
              baseFrequency="0.009 0.028"
              numOctaves="4"
              seed="12"
              result="liquidNoise"
            >
              <animate
                attributeName="baseFrequency"
                dur="8s"
                repeatCount="indefinite"
                values="0.009 0.028;0.018 0.05;0.011 0.034;0.009 0.028"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="liquidNoise"
              scale="34"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <filter
            id="liquid-scroll-glow"
            x="-45%"
            y="-45%"
            width="190%"
            height="190%"
          >
            <feGaussianBlur stdDeviation="5" result="softGlow" />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <radialGradient
            id="liquid-scroll-fill"
            cx="46%"
            cy="50%"
            r="58%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="38%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="72%" stopColor="rgba(255,255,255,0.035)" />
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
            <stop offset="45%" stopColor="rgba(255,255,255,0.56)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
          </linearGradient>

          <radialGradient id="liquid-scroll-core">
            <stop offset="0%" stopColor="rgba(255,255,255,0.62)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <motion.path
          d="M109 28C145 27 177 54 187 88C200 132 168 177 123 188C79 199 36 175 27 131C17 83 60 29 109 28Z"
          fill="url(#liquid-scroll-fill)"
          filter="url(#liquid-scroll-distortion)"
          initial={false}
          animate={{
            rotate: [0, 7, -5, 0],
            scale: [0.96, 1.04, 0.98, 1.02, 0.96],
            opacity: [0.62, 0.88, 0.7, 0.82, 0.62],
          }}
          transition={{
            duration: 7.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "110px 110px",
          }}
        />

        <motion.path
          d="M111 36C143 36 168 57 178 89C191 130 160 165 122 176C82 187 46 164 38 128C29 86 66 37 111 36Z"
          fill="none"
          stroke="url(#liquid-scroll-stroke)"
          strokeWidth="2.2"
          filter="url(#liquid-scroll-glow)"
          initial={false}
          animate={{
            rotate: [0, -8, 6, 0],
            opacity: [0.48, 0.92, 0.56, 0.78, 0.48],
          }}
          transition={{
            duration: 6.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "110px 110px",
          }}
        />

        <motion.path
          d="M67 124C84 92 123 88 146 108C130 103 114 111 104 128C94 145 77 145 67 124Z"
          fill="url(#liquid-scroll-core)"
          filter="url(#liquid-scroll-distortion)"
          initial={false}
          animate={{
            rotate: [0, 42, -28, 0],
            scale: [0.82, 1.28, 0.94, 1.14, 0.82],
            opacity: [0.28, 0.78, 0.4, 0.62, 0.28],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "110px 116px",
          }}
        />

        <motion.path
          d="M51 112C80 88 117 73 164 91M58 138C93 125 127 125 162 146M85 54C93 82 90 115 75 158M137 48C124 83 122 127 143 164"
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeLinecap="round"
          strokeWidth="1.2"
          filter="url(#liquid-scroll-distortion)"
          initial={false}
          animate={{
            opacity: [0.18, 0.54, 0.24, 0.42, 0.18],
            pathLength: [0.68, 1, 0.78, 0.92, 0.68],
          }}
          transition={{
            duration: 5.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
          </svg>
        </motion.div>
      </motion.div>
    </div>
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
  const start = 0.08 + row * 0.052 + column * 0.018;
  const mid = start + 0.13;
  const end = start + 0.28;

  const opacity = useTransform(
    progress,
    [start, mid, end],
    [0, 0.86, 1]
  );
  const y = useTransform(
    progress,
    [start, mid, end],
    [46 + row * 18, 12 + row * 4, 0]
  );
  const x = useTransform(
    progress,
    [start, mid, end],
    [side * 42, side * 14, 0]
  );
  const rotateX = useTransform(
    progress,
    [start, mid, end],
    [18, 6, 0]
  );
  const rotateY = useTransform(
    progress,
    [start, mid, end],
    [side * 13, side * 4, 0]
  );
  const scale = useTransform(
    progress,
    [start, mid, end],
    [0.78, 0.94, 1]
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
