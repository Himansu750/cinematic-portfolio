"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import HeroCard from "./HeroCard";

import { cards } from "@/data/cardsData";
import LazyVideo from "@/components/ui/LazyVideo";

export default function HeroSection({
  revealOnScroll = true,
  revealStart = 760,
  revealDistance = 260,
}) {
  const { scrollY } = useScroll();

  const [active, setActive] = useState(0);

  const [centerHovered, setCenterHovered] =
    useState(false);

  const [sideOffset, setSideOffset] =
    useState(280);
  const [layoutScale, setLayoutScale] =
    useState(1);

  const opacity = useTransform(
    scrollY,
    [revealStart, revealStart + revealDistance],
    [0, 1]
  );

  const y = useTransform(
    scrollY,
    [revealStart, revealStart + revealDistance],
    [56, 0]
  );

  useEffect(() => {
    function updateLayout() {
      const width = window.innerWidth;

      setSideOffset(280);
      setLayoutScale(
        Math.min(
          1,
          Math.max(0.82, width / 860)
        )
      );
    }

    updateLayout();

    window.addEventListener(
      "resize",
      updateLayout
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateLayout
      );
    };
  }, []);

  function prepareHomeReturn(index) {
    sessionStorage.setItem("activeCard", index);
    sessionStorage.setItem(
      "returnToHomeWork",
      "true"
    );

    window.history.replaceState(
      window.history.state,
      "",
      "/"
    );
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const savedCard =
        sessionStorage.getItem(
          "activeCard"
        );

      if (savedCard !== null) {
        setActive(Number(savedCard));
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <motion.section
      style={{
        opacity: revealOnScroll ? opacity : 1,
        y: revealOnScroll ? y : 0,
      }}
      className="
        relative
        flex
        min-h-[105vh]
        items-center
        justify-center
        overflow-visible

        px-4
        pt-[200px]
        pb-[260px]

        sm:pt-[260px]
        sm:pb-[280px]
        md:pt-[320px]
        md:pb-[280px]
        lg:pb-[220px]
      "
    >
      {/* LEFT BUTTON */}
      <motion.button
        type="button"
        aria-label="Show previous work category"
        onClick={() =>
          setActive(
            (prev) =>
              (prev - 1 + cards.length) %
              cards.length
          )
        }
        whileHover={{
          scale: 1.18,
          x: -4,
        }}
        whileTap={{
          scale: 0.82,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 16,
          mass: 0.6,
        }}
        className="
          absolute
          left-4
          md:left-[6%]

          z-[999]

          hidden
          lg:flex
          items-center
          justify-center

          h-12
          w-12

          rounded-full
          border
          border-white/[0.08]
          bg-black/40
          text-white/62
          shadow-[0_18px_70px_rgba(0,0,0,0.55)]
          backdrop-blur-2xl
        "
      >
        <ChevronLeft size={22} strokeWidth={1.6} />
      </motion.button>

      {/* RIGHT BUTTON */}
      <motion.button
        type="button"
        aria-label="Show next work category"
        onClick={() =>
          setActive(
            (prev) =>
              (prev + 1) % cards.length
          )
        }
        whileHover={{
          scale: 1.18,
          x: 4,
        }}
        whileTap={{
          scale: 0.82,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 16,
          mass: 0.6,
        }}
        className="
          absolute
          right-4
          md:right-[6%]

          z-[999]

          hidden
          lg:flex
          items-center
          justify-center

          h-12
          w-12

          rounded-full
          border
          border-white/[0.08]
          bg-black/40
          text-white/62
          shadow-[0_18px_70px_rgba(0,0,0,0.55)]
          backdrop-blur-2xl
        "
      >
        <ChevronRight size={22} strokeWidth={1.6} />
      </motion.button>

      <motion.div
        data-home-card-target
        data-home-mobile-card-target
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          margin: "-80px",
        }}
        className="
          w-full
          max-w-[720px]
          translate-y-20

          md:max-w-[860px]
          lg:hidden
        "
      >
        <div
          className="
            mb-5
            flex
            items-end
            justify-between
            px-1

            sm:mb-6
          "
        >
          <div>
            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.28em]
                text-white/38
              "
            >
              Browse
            </p>

            <h2
              className="
                mt-1
                text-[clamp(2.1rem,10vw,4.5rem)]
                font-semibold
                leading-[0.9]
                tracking-[-0.065em]
                text-white
              "
            >
              Selected
              <br />
              Work
            </h2>
          </div>

          <span
            className="
              mb-1
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.04]
              px-3
              py-1.5

              text-[10px]
              uppercase
              tracking-[0.18em]
              text-white/55
              backdrop-blur-[20px]
            "
          >
            2026
          </span>
        </div>

        <div
          className="
            grid
            grid-cols-2
            gap-3

            sm:gap-4
            md:gap-5
          "
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.link}
              data-home-card-index={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 28,
                  scale: 0.96,
                  filter: "blur(8px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    duration: 0.62,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
              className="
                min-w-0
              "
            >
              <Link
                href={card.link}
                onClick={() => {
                  prepareHomeReturn(index);
                }}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  rounded-[20px]
                  border
                  border-white/[0.08]
                  bg-[rgba(8,8,10,0.68)]
                  p-2
                  shadow-[0_24px_90px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.06)]
                  backdrop-blur-[34px]
                  backdrop-saturate-[115%]

                  sm:rounded-[24px]
                  sm:p-2.5
                  md:rounded-[28px]
                  md:p-3
                "
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[16px]

                    sm:rounded-[20px]
                    md:rounded-[24px]
                  "
                >
                  <LazyVideo
                    src={card.video}
                    muted
                    loop
                    playsInline
                    autoPlay={index === 0}
                    preload="metadata"
                    rootMargin="260px 0px"
                    className="
                      h-[var(--card-media-height)]
                      w-full
                      object-cover
                    "
                    style={{
                      "--card-media-height":
                        "clamp(118px, 31vw, 190px)",
                    }}
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.12)_36%,rgba(0,0,0,0.9)),radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_34%)]
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      p-3

                      sm:p-4
                      md:p-5
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.16em]
                        text-white/50

                        sm:text-[10px]
                        sm:tracking-[0.24em]
                      "
                    >
                      0{index + 1}
                    </p>

                    <h2
                      className="
                        mt-2
                        text-[clamp(1.15rem,5.7vw,2.7rem)]
                        font-semibold
                        leading-[0.9]
                        tracking-[-0.06em]
                        text-white
                      "
                    >
                      {card.title[0]}
                      <br />
                      {card.title[1]}
                    </h2>
                  </div>
                </div>

                <p
                  className="
                    hidden
                    px-2.5
                    pt-3
                    pb-2
                    text-[11px]
                    leading-[1.55]
                    text-zinc-400

                    sm:block
                    sm:px-3
                    sm:text-[12px]
                    sm:leading-[1.6]
                    md:text-[13px]
                    md:leading-[1.7]
                  "
                >
                  {card.description}
                </p>

                <span
                  className="
                    mx-2.5
                    mb-2
                    inline-flex
                    min-h-9
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/[0.08]
                    bg-white/[0.045]
                    px-3
                    text-[10px]
                    font-medium
                    text-white/82
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                    backdrop-blur-2xl
                    transition
                    duration-300
                    group-active:scale-[0.98]
                    group-hover:bg-white/[0.075]
                    group-hover:text-white

                    sm:mx-3
                    sm:min-h-10
                    sm:px-4
                    sm:text-[12px]
                  "
                >
                  Open Section
                  <ArrowUpRight
                    aria-hidden="true"
                    size={14}
                    strokeWidth={1.7}
                    className="opacity-70"
                  />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* CARD STACK */}
      <div
        id="home-cards"
        data-home-card-target
        style={{
          scale: layoutScale,
        }}
        className="
          relative
          flex
          translate-y-40
          sm:translate-y-16
          md:translate-y-12

          h-[520px]
          w-full

          max-w-[1400px]

          hidden
          items-center
          justify-center

          lg:flex
        "
      >
        {cards.map((card, index) => {
          const total = cards.length;

          let position =
            (index - active + total) % total;

          if (position > total / 2) {
            position -= total;
          }

          return (
            <HeroCard
              key={index}
              card={card}
              position={position}
              index={index}
              onPrepareHomeReturn={
                prepareHomeReturn
              }
              setActive={setActive}
              centerHovered={centerHovered}
              setCenterHovered={
                setCenterHovered
              }
              sideOffset={sideOffset}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
