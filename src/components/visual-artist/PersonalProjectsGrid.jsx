"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import VideoModal from "./VideoModal";

import Mobile3DScrollCard from "@/components/effects/Mobile3DScrollCard";

const videos = [
  {
    title: "Night Drive",
    video: "/videos/optimized/personal1.mp4",
    preview: "/images/optimized/personal1.webp",
    height: "h-[360px] sm:h-[460px] md:h-[520px]",
  },

  {
    title: "Lost Memories",
    video: "/videos/optimized/personal2.mp4",
    preview: "/images/optimized/personal2.webp",
    height: "h-[300px] sm:h-[320px] md:h-[340px]",
  },

  {
    title: "Cinematic Soul",
    video: "/videos/optimized/personal3.mp4",
    preview: "/images/optimized/personal3.webp",
    height: "h-[420px] sm:h-[540px] md:h-[620px]",
  },

  {
    title: "Visual Atmosphere",
    video: "/videos/optimized/personal4.mp4",
    preview: "/images/optimized/personal4.webp",
    height: "h-[340px] sm:h-[380px] md:h-[420px]",
  },

  {
    title: "Dream Sequence",
    video: "/videos/optimized/personal5.mp4",
    preview: "/images/optimized/personal5.webp",
    height: "h-[360px] sm:h-[460px] md:h-[520px]",
  },
];

export default function PersonalProjectsGrid() {
  const [selectedVideo, setSelectedVideo] =
    useState(null);

  return (
    <>
      {/* MODAL */}
      <VideoModal
        video={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() =>
          setSelectedVideo(null)
        }
      />

      {/* GRID */}
      <section
        className="
          relative
          z-10

          px-5
          pb-32
          md:px-10
        "
      >
        <div
          className="
            columns-2
            gap-3

            sm:gap-5
            md:columns-3
            max-lg:[perspective:950px]
            max-lg:[perspective-origin:50%_38%]
            xl:columns-3
          "
        >
          {videos.map((video, index) => (
            <Mobile3DScrollCard
              key={index}
              index={index}
              onClick={() =>
                setSelectedVideo(
                  video.video
                )
              }
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -12,
                scale: 1.01,
              }}
              className="
                group

                relative
                mb-3

                cursor-pointer

                break-inside-avoid

                overflow-hidden

                rounded-[36px]

                border
                border-white/[0.08]

                bg-white/[0.03]

                backdrop-blur-[30px]
                backdrop-saturate-[180%]

                shadow-[0_25px_120px_rgba(0,0,0,0.55)]

                before:absolute
                before:inset-0

                before:bg-gradient-to-b
                before:from-white/[0.10]
                before:via-white/[0.03]
                before:to-transparent

                before:pointer-events-none

                sm:mb-5
              "
            >
              {/* TOP REFLECTION */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0

                  z-20

                  h-px

                  bg-gradient-to-r
                  from-transparent
                  via-white/40
                  to-transparent
                "
              />

              {/* SOFT LIGHT */}
              <div
                className="
                  absolute
                  top-0
                  left-0

                  z-10

                  h-full
                  w-[35%]

                  skew-x-[-20deg]

                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.08]
                  to-transparent

                  blur-[20px]
                "
              />

              {/* PREVIEW */}
              <div
                className={`
                  relative
                  overflow-hidden

                  ${video.height}
                `}
              >
                <motion.img
                  src={video.preview}
                  alt={video.title}
                  loading="lazy"
                  decoding="async"
                  whileHover={{
                    scale: 1.04,
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="
                    h-full
                    w-full

                    object-cover

                    scale-[1.02]

                    brightness-[0.92]
                    contrast-[1.05]
                    saturate-[1.1]

                    transition-all
                    duration-700

                    group-hover:brightness-100
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-b
                    from-transparent
                    via-transparent
                    to-black/80
                  "
                />

                {/* PLAY BUTTON */}
                <motion.div
                  initial={{
                    opacity: 0.9,
                    y: 10,
                  }}
                  whileHover={{
                    scale: 1.04,
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                    mass: 0.8,
                  }}
                  className="
                    absolute
                    bottom-5
                    right-5
                    z-20

                    origin-center

                    flex
                    items-center
                    gap-4

                    rounded-full

                    border
                    border-white/[0.08]

                    bg-black/30

                    px-5
                    py-3

                    overflow-hidden

                    backdrop-blur-[24px]

                    shadow-[0_8px_30px_rgba(0,0,0,0.35)]

                    transition-all
                    duration-500

                    group-hover:border-white/[0.14]
                    group-hover:bg-black/45
                  "
                >
                  {/* APPLE LIGHT SWEEP */}
                  <div
                    className="
                      absolute
                      inset-y-0

                      w-[40%]

                      skew-x-[-20deg]

                      bg-gradient-to-r
                      from-transparent
                      via-white/[0.18]
                      to-transparent
                    "
                  />

                  {/* PLAY CIRCLE */}
                  <motion.div
                    whileHover={{
                      rotate: 90,
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.4,
                    }}
                    className="
                      relative

                      flex
                      h-12
                      w-12

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/[0.10]

                      bg-white/[0.04]

                      overflow-hidden
                    "
                  >
                    {/* ICON */}
                    <div
                      className="
                        relative
                        z-10

                        ml-[5px]

                        h-0
                        w-0

                        border-y-[7px]
                        border-y-transparent

                        border-l-[11px]
                        border-l-white
                      "
                    />
                  </motion.div>

                  {/* TEXT */}
                  <div
                    className="
                      relative
                      z-10

                      flex
                      flex-col

                      items-center
                      justify-center
                    "
                  >
                    <p
                      className="
                        mb-[2px]

                        text-[8px]

                        uppercase

                        tracking-[0.28em]

                        text-center

                        text-white/35
                      "
                    >
                      Tap To
                    </p>

                    <p
                      className="
                        text-[15px]

                        font-medium

                        tracking-[-0.04em]

                        text-center

                        text-white
                      "
                    >
                      Watch Project
                    </p>
                  </div>

                  {/* ARROW */}
                  <div
                    className="
                      relative
                      z-10

                      text-lg
                      text-white/60
                    "
                  >
                    &rarr;
                  </div>
                </motion.div>

                {/* TEXT */}
                <div
                  className="
                    absolute
                    bottom-0
                    left-0

                    p-6
                  "
                >
                  <p
                    className="
                      text-[10px]

                      uppercase

                      tracking-[0.35em]

                      text-white/40
                    "
                  >
                    Personal Project
                  </p>

                  <h3
                    className="
                      mt-2

                      text-[30px]

                      font-semibold

                      tracking-[-0.06em]

                      text-white
                    "
                  >
                    {video.title}
                  </h3>
                </div>
              </div>
            </Mobile3DScrollCard>
          ))}
        </div>
      </section>
    </>
  );
}
