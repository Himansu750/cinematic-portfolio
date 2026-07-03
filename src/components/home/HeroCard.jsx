"use client";

import {
  useEffect,
  useRef,
} from "react";

import { useRouter } from "next/navigation";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import MagneticButton from "@/components/ui/MagneticButton";

import ParallaxText from "@/components/ui/ParallaxText";

export default function HeroCard({
  card,
  position,
  index,
  setActive,
  sideOffset = 280,

  centerHovered,
  setCenterHovered,
}) {
  const isActive = position === 0;

  const ref = useRef(null);
  const videoRef = useRef(null);

  const router = useRouter();

  /* MOUSE */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    {
      stiffness: 140,
      damping: 22,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    {
      stiffness: 140,
      damping: 22,
    }
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isActive) {
      const playPromise = video.play();

      if (playPromise) {
        playPromise.catch(() => {});
      }

      return;
    }

    video.pause();
  }, [isActive]);

  function handleMouseMove(e) {
    if (!isActive) {
      return;
    }

    if ("ontouchstart" in window) {
      return;
    }

    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const x =
      (e.clientX - rect.left) / width - 0.5;

    const y =
      (e.clientY - rect.top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);

    setCenterHovered(false);
  }

  function openCard() {
    sessionStorage.setItem(
      "activeCard",
      index
    );

    router.push(card.link);
  }

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`Open ${card.title.join(" ")} section`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        if (isActive) {
          setCenterHovered(true);
        }
      }}
      onMouseLeave={handleMouseLeave}
      onClick={() => setActive(index)}
      onKeyDown={(event) => {
        if (
          event.key !== "Enter" &&
          event.key !== " "
        ) {
          return;
        }

        event.preventDefault();

        if (isActive) {
          openCard();
          return;
        }

        setActive(index);
      }}
      style={
        isActive
          ? {
              rotateX,
              rotateY,

              transformPerspective: 1400,
            }
          : {}
      }
      initial={{
        opacity: 0,
        scale: isActive ? 0.92 : 0.84,
      }}
      whileInView={{
        opacity: 1,

        scale: isActive ? 1 : 0.84,
      }}
      viewport={{
        once: true,
      }}
      whileHover={
        isActive
          ? {
              y: -14,

              scale: 1.035,

              transition: {
                type: "spring",
                stiffness: 420,
                damping: 12,
                mass: 0.5,
              },
            }
          : {}
      }
      whileTap={
        isActive
          ? {
              scale: 0.97,

              transition: {
                type: "spring",
                stiffness: 500,
                damping: 14,
              },
            }
          : {}
      }
      animate={{
        x:
          isActive
            ? 0
            : position === -1
            ? -sideOffset
            : sideOffset,

        scale:
          isActive ? 1 : 0.84,

        rotateZ:
          !isActive && centerHovered
            ? position === -1
              ? -6
              : 6
            : 0,

        y:
          isActive
            ? 0
            : 16,

        zIndex:
          isActive ? 30 : 10,

        opacity: 1,
      }}
      transition={{
        x: {
          type: "spring",
          stiffness: 180,
          damping: 20,
        },

        scale: {
          type: "spring",
          stiffness: 180,
          damping: 20,
        },

        rotateZ: {
          type: "spring",
          stiffness: 180,
          damping: 20,
        },

        y: {
          type: "spring",
          stiffness: 180,
          damping: 22,
        },
      }}
      className="
        absolute

        w-full

        max-w-[440px]

        cursor-pointer
        will-change-transform
      "
    >
      {/* CARD */}
      <motion.div
        className="
          relative
          overflow-hidden

          rounded-[30px]

          border
          border-white/[0.06]

          bg-black/55

          backdrop-blur-[40px]
          backdrop-saturate-[180%]

          p-6

          shadow-[0_24px_90px_rgba(0,0,0,0.68)]

          before:absolute
          before:inset-0

          before:bg-gradient-to-b
          before:from-white/[0.05]
          before:to-transparent

          before:pointer-events-none

          transform-gpu
        "
      >
        {/* TOP LIGHT */}
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

        {/* VIDEO */}
        <div
          className="
            relative
            overflow-hidden

            rounded-[22px]
          "
        >
          <motion.video
            ref={videoRef}
            key={card.video}
            src={card.video}
            autoPlay={isActive}
            muted
            loop
            playsInline
            preload={isActive ? "auto" : "metadata"}
            whileHover={{
              scale: 1.03,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              h-[200px]
              w-full

              object-cover
            "
          />
        </div>

        {/* TEXT */}
        <div className="mt-5">
          <div
            className="
              mb-3

              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-[11px]

                uppercase

                tracking-[0.25em]

                text-zinc-500
              "
            >
              Creative Direction
            </span>

            <span
              className="
                text-sm
                text-zinc-500
              "
            >
              0{index + 1}
            </span>
          </div>

          <ParallaxText>
            <motion.h1
              className="
                text-center

                text-[4rem]

                font-semibold

                leading-[0.9]

                tracking-[-3px]

                text-white
              "
            >
              {card.title[0]}
              <br />
              {card.title[1]}
            </motion.h1>
          </ParallaxText>

          <p
            className="
              mt-4

              mx-auto
              max-w-[90%]

              text-center

              text-[14px]
              leading-[1.65]

              text-zinc-400
            "
          >
            {card.description}
          </p>
        </div>

        {/* BUTTON */}
        <div
          className="
            mt-5

            flex
            justify-center
          "
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              openCard();
            }}
          >
            <MagneticButton
              type="button"
              ariaLabel={`Explore ${card.title.join(" ")}`}
              className="
                rounded-full

                border
                border-white/[0.08]

                bg-white/[0.05]

                px-7
                py-3

                text-sm
                text-white

                transition-all
                duration-300

                hover:bg-white/[0.08]
              "
            >
              Explore My Work
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
