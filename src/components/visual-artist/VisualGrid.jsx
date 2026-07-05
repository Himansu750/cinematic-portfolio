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

  const flameOpacity = useTransform(
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

        <motion.div
          aria-hidden="true"
          style={{
            opacity: burnSheetOpacity,
            y: burnSheetY,
            scaleY: burnSheetScaleY,
            filter: burnSheetBlur,
          }}
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-30
            h-[72vh]
            origin-top
            overflow-visible
            bg-[linear-gradient(180deg,rgba(205,205,198,0.15),rgba(116,116,108,0.18)_50%,rgba(21,19,17,0.88)_100%)]
            shadow-[0_22px_90px_rgba(255,210,160,0.08)]
            will-change-transform
            [clip-path:polygon(0_0,100%_0,100%_82%,96%_84%,91%_81%,85%_86%,79%_83%,73%_87%,66%_82%,59%_86%,52%_83%,45%_88%,38%_84%,31%_87%,24%_82%,17%_86%,10%_83%,0_85%)]
          "
        >
          <motion.div
            style={{ opacity: flameOpacity }}
            className="
              burn-flicker
              absolute
              inset-x-[-8%]
              bottom-[10%]
              h-[86px]
              bg-[radial-gradient(ellipse_at_9%_68%,rgba(255,246,205,0.85),transparent_13%),radial-gradient(ellipse_at_18%_62%,rgba(255,96,27,0.88),transparent_22%),radial-gradient(ellipse_at_31%_76%,rgba(255,205,116,0.88),transparent_15%),radial-gradient(ellipse_at_46%_58%,rgba(255,85,22,0.9),transparent_24%),radial-gradient(ellipse_at_58%_74%,rgba(255,236,180,0.9),transparent_14%),radial-gradient(ellipse_at_71%_62%,rgba(255,105,24,0.86),transparent_21%),radial-gradient(ellipse_at_86%_74%,rgba(255,218,136,0.82),transparent_15%),linear-gradient(90deg,transparent,rgba(255,118,42,0.55)_18%,rgba(255,246,216,0.5)_50%,rgba(255,102,33,0.52)_82%,transparent)]
              opacity-90
              blur-[10px]
              mix-blend-screen
              [clip-path:polygon(0_70%,7%_44%,13%_76%,20%_34%,26%_78%,35%_40%,43%_82%,52%_31%,60%_78%,69%_42%,76%_82%,86%_38%,94%_72%,100%_48%,100%_100%,0_100%)]
            "
          />

          <motion.div
            style={{ opacity: flameOpacity }}
            className="
              ember-drift
              absolute
              inset-x-[-4%]
              bottom-[14%]
              h-[92px]
              bg-[radial-gradient(circle_at_11%_72%,rgba(255,234,166,0.9)_0_2px,transparent_5px),radial-gradient(circle_at_24%_52%,rgba(255,104,35,0.72)_0_2px,transparent_5px),radial-gradient(circle_at_43%_68%,rgba(255,205,108,0.82)_0_1px,transparent_4px),radial-gradient(circle_at_57%_42%,rgba(255,118,41,0.72)_0_2px,transparent_5px),radial-gradient(circle_at_74%_64%,rgba(255,224,148,0.74)_0_2px,transparent_5px),radial-gradient(circle_at_88%_50%,rgba(255,94,24,0.7)_0_1px,transparent_4px)]
              mix-blend-screen
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-[14%]
              h-[30px]
              bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,249,218,0.9)_9%,rgba(255,150,64,0.78)_18%,rgba(255,255,255,0.92)_31%,rgba(255,103,36,0.72)_47%,rgba(255,255,255,0.94)_60%,rgba(255,171,79,0.78)_78%,rgba(255,255,255,0))]
              opacity-90
              blur-[8px]
              mix-blend-screen
              [clip-path:polygon(0_54%,7%_62%,14%_42%,21%_58%,29%_46%,36%_64%,44%_40%,53%_60%,62%_44%,71%_66%,81%_41%,91%_62%,100%_48%,100%_100%,0_100%)]
            "
          />
          <div
            className="
              absolute
              inset-x-0
              bottom-[15%]
              h-[5px]
              bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95)_8%,rgba(255,238,192,1)_22%,rgba(255,255,255,1)_38%,rgba(255,211,143,0.96)_54%,rgba(255,255,255,1)_74%,transparent)]
              opacity-95
              shadow-[0_0_18px_rgba(255,255,255,0.92),0_0_42px_rgba(255,104,32,0.68)]
              [clip-path:polygon(0_48%,7%_60%,14%_39%,21%_56%,29%_43%,36%_64%,44%_38%,53%_59%,62%_42%,71%_65%,81%_39%,91%_61%,100%_45%,100%_100%,0_100%)]
            "
          />
        </motion.div>

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
