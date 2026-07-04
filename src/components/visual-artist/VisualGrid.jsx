"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { visualCategories } from "@/data/visualCategories";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 34,
    scale: 0.96,
    filter: "blur(10px)",
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.055,
      duration: 0.58,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function VisualGrid() {
  return (
    <section
      data-visual-grid-section
      className="
        relative
        z-10
        bg-black
        px-5
        pt-20
        pb-28
        text-white
        sm:px-8
        md:px-10
        lg:px-14
        lg:pt-28
      "
    >
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.58))]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-[1280px]
        "
      >
        <div
          className="
            mb-8
            flex
            items-end
            justify-between
            gap-5
            md:mb-11
          "
        >
          <div>
            <p
              className="
                mb-3
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/38
              "
            >
              Browse
            </p>

            <h2
              className="
                font-serif
                text-[clamp(4.2rem,18vw,13rem)]
                font-normal
                leading-[0.78]
                tracking-[-0.075em]
                text-white
              "
            >
              Visual
              <br />
              Art
            </h2>
          </div>

          <span
            className="
              mb-2
              hidden
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.04]
              px-4
              py-2
              text-[11px]
              uppercase
              tracking-[0.2em]
              text-white/52
              backdrop-blur-2xl
              sm:inline-flex
            "
          >
            2026
          </span>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="
            grid
            grid-cols-2
            gap-3
            sm:gap-4
            md:grid-cols-3
            md:gap-5
            lg:gap-6
          "
        >
          {visualCategories.map((category, index) => (
            <VisualStackCard
              key={category.link}
              category={category}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function VisualStackCard({ category, index }) {
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      className="
        min-w-0
      "
    >
      <Link
        href={category.link}
        className="
          group
          relative
          block
          overflow-hidden
          rounded-[22px]
          border
          border-white/[0.08]
          bg-[rgba(8,8,10,0.72)]
          p-2
          shadow-[0_26px_95px_rgba(0,0,0,0.58),inset_0_1px_0_rgba(255,255,255,0.06)]
          outline-none
          backdrop-blur-[30px]
          backdrop-saturate-[120%]
          transition
          duration-300
          active:scale-[0.985]
          hover:border-white/[0.14]
          hover:bg-white/[0.055]
          focus-visible:ring-2
          focus-visible:ring-white/40
          sm:rounded-[26px]
          sm:p-2.5
          md:rounded-[30px]
          md:p-3
        "
      >
        <div
          className="
            relative
            aspect-[1.06/1]
            overflow-hidden
            rounded-[18px]
            bg-zinc-950
            sm:rounded-[22px]
            md:rounded-[26px]
            lg:aspect-[1.18/1]
          "
        >
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 768px) 30vw, 45vw"
            className="
              object-cover
              brightness-[0.82]
              contrast-[1.08]
              saturate-[0.95]
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
              bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.13),transparent_34%),linear-gradient(to_bottom,transparent,rgba(0,0,0,0.16)_38%,rgba(0,0,0,0.86))]
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
                tracking-[0.18em]
                text-white/50
                sm:text-[10px]
                sm:tracking-[0.24em]
              "
            >
              Visual Art
            </p>

            <h3
              className="
                mt-2
                text-[clamp(1.25rem,5.8vw,3.3rem)]
                font-semibold
                leading-[0.9]
                tracking-[-0.06em]
                text-white
              "
            >
              {category.title}
            </h3>
          </div>
        </div>

        <span
          className="
            mt-3
            inline-flex
            min-h-10
            items-center
            gap-2
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.045]
            px-4
            text-[12px]
            font-medium
            text-white/84
            shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
            backdrop-blur-2xl
            transition
            duration-300
            group-hover:bg-white/[0.075]
            group-hover:text-white
          "
        >
          Explore Work
          <ArrowUpRight
            aria-hidden="true"
            size={14}
            strokeWidth={1.7}
            className="opacity-70"
          />
        </span>
      </Link>
    </motion.article>
  );
}
