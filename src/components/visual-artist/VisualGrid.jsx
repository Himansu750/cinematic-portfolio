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

  const burnSheetOpacity = useTransform(
    progress,
    [0, 0.03, 0.22, 0.34],
    [0, 1, 1, 0]
  );

  const burnSheetY = useTransform(
    progress,
    [0.02, 0.3],
    ["0%", "-90%"]
  );

  const burnSheetScaleY = useTransform(
    progress,
    [0.02, 0.3],
    [1, 0.86]
  );

  const burnSheetBlur = useTransform(
    progress,
    [0, 0.2, 0.34],
    ["blur(0px)", "blur(0.6px)", "blur(6px)"]
  );

  const burnEdgeOpacity = useTransform(
    progress,
    [0.03, 0.1, 0.26, 0.36],
    [0, 1, 0.86, 0]
  );

  const wallOpacity = useTransform(
    progress,
    [0.08, 0.2, 1],
    [0, 1, 1]
  );

  const wallY = useTransform(
    progress,
    [0.08, 0.24, 1],
    ["10vh", "3vh", "3vh"]
  );

  const wallScale = useTransform(
    progress,
    [0.08, 0.24, 1],
    [0.92, 1, 1]
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

        <BurnReveal
          edgeOpacity={burnEdgeOpacity}
          opacity={burnSheetOpacity}
          y={burnSheetY}
          scaleY={burnSheetScaleY}
          blur={burnSheetBlur}
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0)_36%,rgba(0,0,0,0.52))]
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

function BurnReveal({
  edgeOpacity,
  opacity,
  y,
  scaleY,
  blur,
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        opacity,
        y,
        scaleY,
        filter: blur,
      }}
      className="
        pointer-events-none
        absolute
        inset-x-0
        top-0
        z-30
        h-[74vh]
        origin-top
        overflow-visible
        will-change-transform
      "
    >
      <svg
        className="
          absolute
          inset-x-[-9%]
          top-0
          h-full
          w-[118%]
          overflow-visible
        "
        viewBox="0 0 1200 740"
        preserveAspectRatio="none"
      >
        <defs>
          <filter
            id="visual-burn-displace"
            x="-6%"
            y="-12%"
            width="112%"
            height="130%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.052"
              numOctaves="4"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <linearGradient
            id="burn-sheet"
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop offset="0%" stopColor="rgba(214,214,205,0.2)" />
            <stop offset="45%" stopColor="rgba(100,100,94,0.22)" />
            <stop offset="100%" stopColor="rgba(13,12,10,0.94)" />
          </linearGradient>

          <linearGradient
            id="burn-core"
            x1="0"
            x2="1"
            y1="0"
            y2="0"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="12%" stopColor="rgba(255,246,210,0.95)" />
            <stop offset="24%" stopColor="rgba(255,130,46,0.9)" />
            <stop offset="38%" stopColor="rgba(255,255,255,0.98)" />
            <stop offset="52%" stopColor="rgba(255,183,76,0.96)" />
            <stop offset="68%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="84%" stopColor="rgba(255,112,34,0.82)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          <filter
            id="burn-glow"
            x="-10%"
            y="-300%"
            width="120%"
            height="700%"
          >
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        <motion.path
          d="M 0 0 H 1200 V 594 C 1130 622 1082 566 1018 604 C 952 642 914 565 850 598 C 786 631 735 585 682 612 C 612 648 578 560 506 600 C 436 638 391 571 326 604 C 257 639 220 584 156 615 C 94 645 54 586 0 606 Z"
          fill="url(#burn-sheet)"
          filter="url(#visual-burn-displace)"
        />

        <motion.path
          d="M 0 606 C 54 586 94 645 156 615 C 220 584 257 639 326 604 C 391 571 436 638 506 600 C 578 560 612 648 682 612 C 735 585 786 631 850 598 C 914 565 952 642 1018 604 C 1082 566 1130 622 1200 594"
          fill="none"
          stroke="rgba(0,0,0,0.72)"
          strokeWidth="42"
          filter="url(#visual-burn-displace)"
        />

        <motion.path
          style={{ opacity: edgeOpacity }}
          className="burn-flicker"
          d="M 0 606 C 54 586 94 645 156 615 C 220 584 257 639 326 604 C 391 571 436 638 506 600 C 578 560 612 648 682 612 C 735 585 786 631 850 598 C 914 565 952 642 1018 604 C 1082 566 1130 622 1200 594"
          fill="none"
          stroke="url(#burn-core)"
          strokeLinecap="round"
          strokeWidth="28"
          filter="url(#burn-glow)"
        />

        <motion.path
          style={{ opacity: edgeOpacity }}
          d="M 0 606 C 54 586 94 645 156 615 C 220 584 257 639 326 604 C 391 571 436 638 506 600 C 578 560 612 648 682 612 C 735 585 786 631 850 598 C 914 565 952 642 1018 604 C 1082 566 1130 622 1200 594"
          fill="none"
          stroke="rgba(255,255,244,0.95)"
          strokeLinecap="round"
          strokeWidth="4"
          filter="url(#visual-burn-displace)"
        />

        <motion.g
          style={{ opacity: edgeOpacity }}
          className="ember-drift"
          fill="rgba(255,167,64,0.9)"
        >
          <circle cx="148" cy="582" r="2.2" />
          <circle cx="264" cy="626" r="1.5" />
          <circle cx="391" cy="590" r="2" />
          <circle cx="532" cy="625" r="1.8" />
          <circle cx="672" cy="586" r="1.5" />
          <circle cx="812" cy="618" r="2.1" />
          <circle cx="1014" cy="585" r="1.7" />
          <circle cx="1106" cy="613" r="2.4" />
        </motion.g>
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
