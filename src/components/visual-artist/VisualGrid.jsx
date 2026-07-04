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
    offset: ["start start", "end end"],
  });

  const smoothScrollYProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 66,
      damping: 21,
      mass: 0.48,
      restDelta: 0.001,
    }
  );

  const promptOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.08, 0.16],
    [1, 1, 0]
  );

  const sceneOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.04, 0.94, 1],
    [1, 1, 1, 0.82]
  );

  const gridScale = useTransform(
    smoothScrollYProgress,
    [0.08, 0.32, 0.62, 1],
    isWide
      ? [0.54, 0.92, 1.04, 0.92]
      : isMedium
        ? [0.48, 0.66, 0.74, 0.7]
        : [0.46, 0.6, 0.68, 0.64]
  );

  const gridY = useTransform(
    smoothScrollYProgress,
    [0.08, 0.36, 0.7, 1],
    isWide
      ? [220, 120, 96, 140]
      : isMedium
        ? [154, 72, 260, 380]
        : [132, 58, 300, 440]
  );

  const gridRotateX = useTransform(
    smoothScrollYProgress,
    [0.08, 0.34, 0.72, 1],
    [18, 8, 0, -1]
  );

  const gridZ = useTransform(
    smoothScrollYProgress,
    [0.08, 0.34, 0.7, 1],
    isWide ? [-620, -170, 0, 48] : [-460, -140, 0, 42]
  );

  const titleY = useTransform(
    smoothScrollYProgress,
    [0.08, 0.26, 0.42, 0.56],
    isWide ? [260, 36, -94, -230] : [220, 18, -120, -240]
  );

  const titleScale = useTransform(
    smoothScrollYProgress,
    [0.08, 0.3, 0.56, 1],
    isWide ? [1.16, 0.94, 0.9, 0.82] : [1.08, 0.88, 0.78, 0.72]
  );

  const titleOpacity = useTransform(
    smoothScrollYProgress,
    [0.06, 0.1, 0.18, 0.26],
    [0, 1, 0.42, 0]
  );

  const remixOpacity = useTransform(
    smoothScrollYProgress,
    [0.78, 0.9, 1],
    [0, 1, 1]
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
    }, 520);

    return () => window.clearTimeout(timeout);
  }, [router, selectedCategory]);

  function openCategory(category) {
    if (selectedCategory) return;

    setSelectedCategory(category);
  }

  return (
    <section
      ref={sectionRef}
      data-visual-grid-section
      className="
        relative
        z-10
        min-h-[245vh]
        bg-black
        px-0
        [perspective:1100px]
        [perspective-origin:50%_42%]
        md:min-h-[250vh]
        lg:min-h-[245vh]
        lg:[perspective:1500px]
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
              duration: 0.48,
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
              }}
              animate={{
                scale: 1.04,
                opacity: 0.34,
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
              "
            />

            <div className="absolute inset-0 bg-black/64" />

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
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
                  font-black
                  leading-[0.85]
                  tracking-[-0.08em]
                  text-white
                  md:text-[8vw]
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
          bg-black
        "
      >
        <motion.p
          style={{ opacity: promptOpacity }}
          className="
            absolute
            left-1/2
            top-1/2
            z-30
            -translate-x-1/2
            -translate-y-1/2
            text-[15px]
            font-medium
            tracking-[-0.02em]
            text-white/74
          "
        >
          Scroll down &darr;
        </motion.p>

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_46%,rgba(255,255,255,0.04),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0)_38%,rgba(0,0,0,0.34))]
          "
        />

        <motion.div
          style={{
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale,
          }}
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-[45%]
            z-20
            -translate-y-1/2
            select-none
            text-center
            text-white
            mix-blend-screen
            will-change-transform
          "
        >
          <p
            className="
              mb-2
              font-serif
              text-[clamp(1.65rem,6vw,4.5rem)]
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
              w-[150vw]
              -translate-x-[18vw]
              font-serif
              text-[clamp(6.7rem,28vw,20rem)]
              font-normal
              leading-[0.74]
              tracking-[-0.095em]
              text-white
              md:w-[128vw]
              md:-translate-x-[12vw]
              lg:w-[116vw]
              lg:-translate-x-[6vw]
            "
          >
            Visual
            <br />
            Art
          </h2>
        </motion.div>

        <div
          className="
            absolute
            left-1/2
            top-[61%]
            z-20
            w-[82vw]
            -translate-x-1/2
            -translate-y-1/2
            md:w-[78vw]
            md:top-[60%]
            lg:w-[92vw]
            lg:max-w-[1460px]
            lg:top-[76%]
          "
        >
          <motion.div
            style={{
              scale: gridScale,
              y: gridY,
              z: gridZ,
              rotateX: gridRotateX,
              transformPerspective: 1200,
              transformStyle: "preserve-3d",
            }}
            className="
              grid
              w-full
              grid-cols-2
              gap-3
              will-change-transform
              sm:gap-4
              md:grid-cols-3
              md:gap-5
              lg:gap-6
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

        <motion.button
          type="button"
          style={{ opacity: remixOpacity }}
          onClick={() =>
            window.scrollTo({
              top: sectionRef.current?.offsetTop ?? 0,
              behavior: "smooth",
            })
          }
          className="
            absolute
            left-1/2
            top-[76%]
            z-30
            -translate-x-1/2
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.025]
            px-5
            py-2.5
            text-[15px]
            font-medium
            text-white/64
            backdrop-blur-xl
            transition
            hover:bg-white/[0.06]
            hover:text-white
          "
        >
          Remix
        </motion.button>
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
  const isLeft = columnIndex === 0;
  const isRight = columnIndex === columnCount - 1;
  const direction = isLeft ? -1 : isRight ? 1 : index % 2 ? 0.45 : -0.45;

  const revealStart =
    0.1 + rowIndex * 0.052 + columnIndex * 0.018;
  const revealMid = revealStart + 0.18;
  const revealEnd = revealStart + 0.34;

  const cardOpacity = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [0, 0.74, 1]
  );

  const cardRotateX = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [isWide ? 34 : 30, isWide ? 12 : 10, 0]
  );

  const cardRotateY = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      direction * (isWide ? 24 : 20),
      direction * (isWide ? 8 : 6),
      0,
    ]
  );

  const cardRotateZ = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      direction * (isWide ? 7 : 6),
      direction * 2,
      0,
    ]
  );

  const cardX = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      direction * (isWide ? 120 : 74),
      direction * (isWide ? 34 : 24),
      0,
    ]
  );

  const cardY = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      (isWide ? 110 : 76) + rowIndex * 34,
      (isWide ? 26 : isMedium ? 128 : 210) +
        rowIndex * 10,
      isWide ? 0 : isMedium ? 360 : 520,
    ]
  );

  const cardZ = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [
      (isWide ? -500 : -340) - rowIndex * 70,
      (isWide ? -120 : -88) - rowIndex * 26,
      0,
    ]
  );

  const cardScale = useTransform(
    scrollYProgress,
    [revealStart, revealMid, revealEnd],
    [isWide ? 0.76 : 0.72, 0.95, 1]
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
        x: cardX,
        y: cardY,
        z: cardZ,
        scale: cardScale,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileTap={tap}
      transition={{ duration: 0.2, ease }}
      animate={
        isSelected
          ? {
              scale: 0.94,
              opacity: 0.7,
            }
          : undefined
      }
      className="
        group
        relative
        cursor-pointer
        overflow-hidden
        bg-black
        outline-none
        transform-gpu
        will-change-transform
      "
    >
      <div
        className="
          relative
          aspect-[1.04/1]
          overflow-hidden
          border
          border-black
          bg-zinc-950
          md:aspect-[1.12/1]
          lg:aspect-[1.2/1]
        "
      >
        <motion.img
          src={category.image}
          alt={category.title}
          whileHover={{
            scale: 1.04,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className="
            h-full
            w-full
            object-cover
            brightness-[0.82]
            contrast-[1.08]
            saturate-[0.95]
            transition
            duration-700
            group-hover:brightness-100
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.13),transparent_34%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.18)_48%,rgba(0,0,0,0.74))]
            opacity-80
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
            opacity-0
            transition
            duration-300
            group-hover:opacity-100
            md:p-4
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
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.14]
              bg-black/34
              text-white/70
              backdrop-blur-xl
            "
          >
            &rarr;
          </span>
        </div>
      </div>
    </motion.div>
  );
}
