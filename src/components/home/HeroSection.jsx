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

import HeroCard from "./HeroCard";

import { cards } from "@/data/cardsData";

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
        min-h-[110vh]
        items-center
        justify-center
        overflow-visible

        px-4
        pt-[220px]
        pb-[300px]

        sm:pt-[300px]
        sm:pb-[320px]
        md:pt-[360px]
        md:pb-[320px]
        lg:pb-[240px]
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
        "
      >
        <motion.div
          whileHover={{
            x: -2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 18,
          }}
          className="
            h-0
            w-0

            border-y-[8px]
            border-y-transparent

            border-r-[12px]
            border-r-white/55
          "
        />
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
        "
      >
        <motion.div
          whileHover={{
            x: 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 18,
          }}
          className="
            h-0
            w-0

            border-y-[8px]
            border-y-transparent

            border-l-[12px]
            border-l-white/55
          "
        />
      </motion.button>

      <motion.div
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
          translate-y-24

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
                text-white/40
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
              bg-white/[0.045]
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
            columns-2
            gap-3

            sm:gap-5
            md:columns-3
          "
        >
          {cards.map((card, index) => (
            <motion.article
              key={card.link}
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
                mb-3
                break-inside-avoid
                sm:mb-5
              "
            >
              <Link
                href={card.link}
                onClick={() => {
                  sessionStorage.setItem(
                    "activeCard",
                    index
                  );
                }}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-white/[0.08]
                  bg-black/58
                  p-2.5
                  shadow-[0_24px_90px_rgba(0,0,0,0.62)]
                  backdrop-blur-[34px]
                  backdrop-saturate-[130%]

                  sm:rounded-[30px]
                  sm:p-3
                "
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[20px]

                    sm:rounded-[24px]
                  "
                >
                  <video
                    src={card.video}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className="
                      h-[var(--card-media-height)]
                      w-full
                      object-cover
                    "
                    style={{
                      "--card-media-height":
                        index === 0
                          ? "clamp(210px, 62vw, 300px)"
                          : index === 1
                          ? "clamp(170px, 48vw, 260px)"
                          : "clamp(190px, 54vw, 280px)",
                    }}
                  />

                  <div
                    className="
                      absolute
                      inset-0
                      bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.1)_35%,rgba(0,0,0,0.86))]
                    "
                  />

                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      p-4

                      sm:p-5
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
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
                        text-[clamp(1.75rem,8vw,3.75rem)]
                        font-semibold
                        leading-[0.88]
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
                  px-3
                  pt-4
                  pb-2
                  text-[11px]
                  leading-[1.65]
                  text-zinc-400

                  sm:text-[13px]
                  sm:leading-[1.7]
                "
              >
                  {card.description}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.div>

      {/* CARD STACK */}
      <div
        style={{
          scale: layoutScale,
        }}
        className="
          relative
          flex
          translate-y-48
          sm:translate-y-20
          md:translate-y-16

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
