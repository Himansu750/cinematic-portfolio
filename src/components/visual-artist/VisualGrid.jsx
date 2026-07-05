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
    [0, 0.08, 0.15],
    [1, 1, 0]
  );

  const titleOpacity = useTransform(
    progress,
    [0.04, 0.1, 0.22, 0.32],
    [0, 1, 1, 0]
  );

  const titleY = useTransform(
    progress,
    [0.04, 0.18, 0.32, 0.46],
    ["22vh", "2vh", "-12vh", "-22vh"]
  );

  const titleX = useTransform(
    progress,
    [0.04, 0.28, 0.46],
    ["8vw", "-4vw", "-10vw"]
  );

  const titleScale = useTransform(
    progress,
    [0.04, 0.2, 0.46],
    [0.9, 1.02, 0.94]
  );

  const wallOpacity = useTransform(
    progress,
    [0.18, 0.3, 1],
    [0, 1, 1]
  );

  const wallY = useTransform(
    progress,
    [0.18, 0.42, 1],
    ["18vh", "0vh", "0vh"]
  );

  const wallScale = useTransform(
    progress,
    [0.18, 0.42, 1],
    [0.86, 0.98, 0.98]
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
        min-h-[165vh]
        bg-black
        text-white
        [perspective:1200px]
        lg:min-h-[185vh]
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
            absolute
            left-1/2
            top-1/2
            z-40
            -translate-x-1/2
            -translate-y-1/2
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
            bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0)_36%,rgba(0,0,0,0.52))]
          "
        />

        <motion.div
          style={{
            opacity: wallOpacity,
            y: wallY,
            scale: wallScale,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            w-[84vw]
            -translate-x-1/2
            -translate-y-1/2
            transform-gpu
            will-change-transform
            sm:w-[82vw]
            md:w-[88vw]
            lg:w-[82vw]
            lg:max-w-[1260px]
          "
        >
          <div
            className="
              grid
              grid-cols-2
              gap-2.5
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
          </div>
        </motion.div>

        <motion.div
          style={{
            opacity: titleOpacity,
            x: titleX,
            y: titleY,
            scale: titleScale,
          }}
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-[25%]
            z-30
            select-none
            text-center
            text-white
            mix-blend-screen
            transform-gpu
            will-change-transform
          "
        >
          <p
            className="
              mb-2
              font-serif
              text-[clamp(1.6rem,6vw,4.6rem)]
              italic
              leading-none
              text-white/82
            "
          >
            Himanshu Artspace
          </p>

          <h2
            className="
              mx-auto
              w-[162vw]
              font-serif
              text-[clamp(6.6rem,31vw,23rem)]
              font-normal
              leading-[0.72]
              tracking-[-0.095em]
              text-white
              sm:w-[140vw]
              md:w-[124vw]
              lg:w-[112vw]
            "
          >
            Visual
            <br />
            Art
          </h2>
        </motion.div>

      </div>
    </section>
  );
}

function VisualStackCard({
  category,
  index,
  progress,
}) {
  const row = Math.floor(index / 3);
  const column = index % 3;
  const side = column === 0 ? -1 : column === 2 ? 1 : index % 2 ? 0.5 : -0.5;
  const start = 0.2 + row * 0.045 + column * 0.014;
  const mid = start + 0.12;
  const end = start + 0.24;

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
    [side * 34, side * 12, 0]
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
          bg-zinc-950
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
