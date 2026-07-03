"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { useRouter } from "next/navigation";

import {
  ease,
  tap,
} from "@/lib/motion";

import { visualCategories } from "@/data/visualCategories";

export default function VisualGrid() {
  const router = useRouter();
  const sectionRef = useRef(null);

  const [selectedCategory, setSelectedCategory] =
    useState(null);
  const [isWide, setIsWide] = useState(false);
  const [isMedium, setIsMedium] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothScrollYProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 78,
      damping: 24,
      mass: 0.42,
      restDelta: 0.001,
    }
  );

  const sceneOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.08, 1],
    [0, 1, 1]
  );

  const gridZ = useTransform(
    smoothScrollYProgress,
    [0, 0.16, 0.32, 1],
    isWide
      ? [-1500, -720, 0, 0]
      : [-1100, -500, 0, 0]
  );

  const gridScale = useTransform(
    smoothScrollYProgress,
    [0, 0.2, 0.32, 1],
    isWide
      ? [0.3, 0.68, 0.72, 0.72]
      : [0.38, 0.68, 0.78, 0.78]
  );

  const gridY = useTransform(
    smoothScrollYProgress,
    [0, 0.24, 0.32, 1],
    isWide
      ? [260, 92, 70, 70]
      : isMedium
        ? [120, 20, 235, 235]
      : [20, -90, 160, 160]
  );

  const gridRotateX = useTransform(
    smoothScrollYProgress,
    [0, 0.32, 1],
    isWide ? [30, 0, 0] : [24, 0, 0]
  );

  const liquidDistortion = useTransform(
    smoothScrollYProgress,
    [0, 0.08, 0.18, 0.26, 1],
    [0, isWide ? 22 : 18, isWide ? 9 : 7, 0, 0]
  );

  const liquidFrequency = useTransform(
    smoothScrollYProgress,
    [0, 0.14, 0.26],
    [
      "0.006 0.03",
      isWide ? "0.012 0.06" : "0.01 0.052",
      "0.004 0.018",
    ]
  );

  useEffect(() => {
    function updateViewport() {
      const width = window.innerWidth;
      setIsWide(width >= 1024);
      setIsMedium(width >= 768 && width < 1024);
    }

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () =>
      window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const timeout = window.setTimeout(() => {
      router.push(selectedCategory.link);
    }, 560);

    return () => window.clearTimeout(timeout);
  }, [router, selectedCategory]);

  function openCategory(category) {
    if (selectedCategory) return;

    setSelectedCategory(category);
  }

  return (
    <section
      ref={sectionRef}
      className="
        relative
        z-10

        px-5
        min-h-screen
        pb-0
        md:px-10
        md:min-h-[150vh]
        md:pb-32
        lg:min-h-[125vh]

        [perspective:1050px]
        [perspective-origin:50%_40%]
        lg:[perspective:1350px]
      "
    >
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 1.02,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.5,
              ease,
            }}
            className="
              fixed
              inset-0
              z-[9999]

              flex
              items-center
              justify-center

              overflow-hidden

              bg-black
            "
          >
            <motion.img
              src={selectedCategory.image}
              alt=""
              initial={{
                scale: 0.72,
                opacity: 0,
                borderRadius: 24,
              }}
              animate={{
                scale: 1,
                opacity: 0.36,
                borderRadius: 0,
              }}
              transition={{
                duration: 0.56,
                ease,
              }}
              className="
                absolute
                inset-0

                h-full
                w-full

                object-cover

                blur-[1px]
              "
            />

            <div
              className="
                absolute
                inset-0

                bg-black/62
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                scaleX: 0.18,
              }}
              animate={{
                opacity: 1,
                scaleX: 1,
              }}
              transition={{
                duration: 0.5,
                ease,
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-px
                w-[min(68vw,760px)]
                origin-center
                -translate-x-1/2
                bg-white/18
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                y: 26,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                delay: 0.08,
                duration: 0.42,
                ease,
              }}
              className="
                relative
                z-10

                px-6
                text-center
              "
            >
              <p
                className="
                  mb-5

                  text-[11px]
                  uppercase

                  tracking-[0.45em]

                  text-white/45
                "
              >
                Entering
              </p>

              <h2
                className="
                  text-[16vw]
                  md:text-[8vw]

                  font-black

                  leading-[0.85]

                  tracking-[-0.08em]

                  text-white
                "
              >
                {selectedCategory.title}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ opacity: sceneOpacity }}
        className="
          sticky
          top-0
          h-screen
          overflow-hidden
          rounded-none
        "
      >
        <svg
          aria-hidden="true"
          className="absolute h-0 w-0"
        >
          <filter
            id="visual-stack-liquid"
            x="-18%"
            y="-18%"
            width="136%"
            height="136%"
            colorInterpolationFilters="sRGB"
          >
            <motion.feTurbulence
              type="fractalNoise"
              baseFrequency={liquidFrequency}
              numOctaves="2"
              seed="17"
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

        <div
          className="
            absolute
            inset-x-0
            top-8
            z-20

            flex
            items-center
            justify-between

            px-1
            md:px-4
          "
        >
          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.34em]
              text-white/45
            "
          >
            Visual Categories
          </p>

          <p
            className="
              hidden
              text-[11px]
              uppercase
              tracking-[0.24em]
              text-white/35
              sm:block
            "
          >
            Scroll
          </p>
        </div>

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.055),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0)_35%,rgba(0,0,0,0.38))]
          "
        />

        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
          "
        >
          <motion.div
            style={{
              scale: gridScale,
              y: gridY,
              z: gridZ,
              rotateX: gridRotateX,
              filter: "url(#visual-stack-liquid)",
              transformPerspective: 1050,
              transformStyle: "preserve-3d",
            }}
            className="
              grid
              w-[min(118vw,1040px)]
              grid-cols-2
              gap-5
              will-change-transform

              sm:gap-6
              md:w-[min(92vw,1160px)]
              md:grid-cols-3
              md:gap-8
              lg:w-[min(118vw,1480px)]
              lg:gap-7
            "
          >
            {visualCategories.map(
              (category, index) => (
                <VisualStackCard
                  key={category.link}
                  category={category}
                  index={index}
                  isMedium={isMedium}
                  isWide={isWide}
                  onOpen={openCategory}
                  scrollYProgress={smoothScrollYProgress}
                  selectedCategory={selectedCategory}
                />
              )
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function VisualStackCard({
  category,
  index,
  isMedium,
  isWide,
  onOpen,
  scrollYProgress,
  selectedCategory,
}) {
  const columnCount = isWide || isMedium ? 3 : 2;
  const columnIndex = index % columnCount;
  const rowIndex = Math.floor(index / columnCount);
  const revealSide =
    columnIndex === 0
      ? "left"
      : columnIndex === columnCount - 1
        ? "right"
        : "center";
  const direction =
    revealSide === "left"
      ? -1
      : revealSide === "right"
        ? 1
        : index % 2 === 0
          ? -0.35
          : 0.35;
  const revealStart =
    0.035 + rowIndex * 0.04 + columnIndex * 0.012;
  const revealMid = revealStart + 0.115;
  const revealEnd = revealStart + 0.285;

  const cardOpacity = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [0, 0.72, 1]
  );
  const cardRotateX = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      revealSide === "center"
        ? isWide
          ? 26
          : 24
        : isWide
          ? 22
          : 20,
      revealSide === "center" ? 8 : 6,
      0,
    ]
  );
  const cardRotateY = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      direction * (isWide ? 18 : 14),
      direction * (isWide ? 6 : 4),
      0,
    ]
  );
  const cardRotateZ = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      direction * (isWide ? 3.2 : 2.6),
      direction * 0.8,
      0,
    ]
  );
  const cardY = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      (isWide ? 58 : 44) + rowIndex * (isWide ? 10 : 8),
      (isWide ? 18 : 14) + rowIndex * 2,
      0,
    ]
  );
  const cardX = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      direction * (isWide ? 48 : 34),
      direction * (isWide ? 16 : 10),
      0,
    ]
  );
  const cardZ = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      (isWide ? -280 : -220) - rowIndex * 28,
      (isWide ? -70 : -54) - rowIndex * 12,
      0,
    ]
  );
  const cardScale = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [isWide ? 0.86 : 0.84, 0.97, 1]
  );
  const cardSkewY = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [direction * 0.8, direction * 0.25, 0]
  );

  const isSelected =
    selectedCategory?.link === category.link;

  function handleOpen() {
    onOpen(category);
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={`Open ${category.title}`}
      onClick={handleOpen}
      onKeyDown={(event) => {
        if (
          event.key !== "Enter" &&
          event.key !== " "
        ) {
          return;
        }

        event.preventDefault();
        handleOpen();
      }}
      style={{
        opacity: cardOpacity,
        rotateX: cardRotateX,
        rotateY: cardRotateY,
        rotateZ: cardRotateZ,
        skewY: cardSkewY,
        x: cardX,
        y: cardY,
        z: cardZ,
        scale: cardScale,
        transformOrigin: "50% 50%",
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
      }}
      whileTap={tap}
      transition={{ duration: 0.2, ease }}
      animate={
        isSelected
          ? {
              scale: 0.94,
              opacity: 0.75,
            }
          : undefined
      }
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-[12px]
        border
        border-white/[0.08]
        bg-black/55
        shadow-[0_22px_90px_rgba(0,0,0,0.6)]
        outline-none
        backdrop-blur-[24px]
        transform-gpu
        will-change-transform

        md:rounded-[18px]
        lg:rounded-[22px]
      "
    >
      <div
        className="
          relative
          h-[clamp(128px,30vw,190px)]
          overflow-hidden
          md:h-[clamp(210px,22vw,330px)]
          lg:h-[clamp(190px,14vw,260px)]
          "
        >
        <motion.img
          src={category.image}
          alt={category.title}
          className="
            h-full
            w-full
            object-cover
            brightness-[0.88]
            contrast-[1.08]
            transition
            duration-700
            group-hover:brightness-105
          "
          />

        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.1)_35%,rgba(0,0,0,0.92)),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.13),transparent_34%)]
          "
        />

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            p-4
            md:p-6
          "
        >
          <p
            className="
              text-[8px]
              uppercase
              tracking-[0.28em]
              text-white/45
              md:text-[10px]
            "
          >
            Visual Artist
          </p>

          <h3
            className="
              mt-2
              text-[clamp(1.25rem,6vw,2.5rem)]
              font-semibold
              leading-[0.92]
              tracking-[-0.05em]
              text-white
            "
          >
            {category.title}
          </h3>

          <div
            className="
              mt-4
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.12]
              bg-white/[0.06]
              text-white/70
              backdrop-blur-xl
            "
          >
            &rarr;
          </div>
        </div>
      </div>
    </motion.div>
  );
}
