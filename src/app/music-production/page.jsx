"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Disc3, Headphones, Radio } from "lucide-react";

import Footer from "@/components/layout/Footer";
import LazyVideo from "@/components/ui/LazyVideo";

const records = [
  {
    title: "Atmospheric Sound",
    role: "Sound design",
    index: "01",
    image: "/images/optimized/personal3.webp",
    video: "/videos/optimized/personal3.mp4",
    copy: "Wide rooms, distant air, close texture, and cinematic silence shaped around motion.",
  },
  {
    title: "Rhythm And Motion",
    role: "Audio edit",
    index: "02",
    image: "/images/optimized/personal2.webp",
    video: "/videos/optimized/personal2.mp4",
    copy: "Percussive cuts, pacing, transitions, and emotional lift locked to visual timing.",
  },
  {
    title: "Cinematic Texture",
    role: "Production",
    index: "03",
    image: "/images/optimized/personal5.webp",
    video: "/videos/optimized/visual-artist-hero.mp4",
    copy: "Warm distortion, low-end pressure, grain, voice, and detail for film-led storytelling.",
  },
];

export default function MusicProductionPage() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 86,
    damping: 24,
    mass: 0.42,
  });

  const discRotate = useTransform(smooth, [0, 1], [0, 560]);
  const greenX = useTransform(smooth, [0, 0.45, 1], ["-12vw", "18vw", "-8vw"]);
  const amberX = useTransform(smooth, [0, 0.5, 1], ["18vw", "-14vw", "12vw"]);
  const shapeScale = useTransform(smooth, [0, 0.4, 1], [1, 1.18, 0.94]);
  const heroY = useTransform(smooth, [0, 0.38], ["0vh", "-16vh"]);

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#07120c]
        text-white
      "
    >
      <section
        className="
          relative
          min-h-[142vh]
          overflow-hidden
          px-5
          pt-20
          md:px-10
          lg:px-14
        "
      >
        <motion.div
          aria-hidden="true"
          style={{ x: greenX, scale: shapeScale }}
          className="
            pointer-events-none
            absolute
            left-[-22vw]
            top-[-12vh]
            h-[58vh]
            w-[82vw]
            rounded-[44%_56%_48%_52%/52%_38%_62%_48%]
            bg-[#159447]
            opacity-95
            blur-[1px]
            md:h-[68vh]
            md:w-[62vw]
          "
        />

        <motion.div
          aria-hidden="true"
          style={{ x: amberX }}
          className="
            pointer-events-none
            absolute
            right-[-22vw]
            top-[4vh]
            h-[52vh]
            w-[76vw]
            rounded-[50%_44%_56%_48%/42%_58%_44%_56%]
            bg-[#a8652a]
            opacity-90
            md:h-[64vh]
            md:w-[58vw]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.72)_72%,#030504)]
          "
        />

        <motion.div
          style={{ y: heroY }}
          className="
            sticky
            top-0
            z-10
            flex
            min-h-screen
            items-center
            justify-center
            py-10
          "
        >
          <div
            className="
              grid
              w-full
              max-w-[1180px]
              items-center
              gap-10
              lg:grid-cols-[0.95fr_1.05fr]
            "
          >
            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="
                  mb-5
                  text-[11px]
                  uppercase
                  tracking-[0.42em]
                  text-white/50
                "
              >
                Audio engineer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="
                  max-w-[760px]
                  text-[clamp(4rem,16vw,10.5rem)]
                  font-black
                  leading-[0.78]
                  tracking-[-0.085em]
                "
              >
                MUSIC
                <br />
                PRODUCTION
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.85 }}
                className="
                  mt-7
                  max-w-[520px]
                  text-[14px]
                  leading-[1.8]
                  text-white/62
                "
              >
                Cinematic audio, atmospheric sound design, rhythm editing,
                and tactile sonic textures shaped for visual storytelling.
              </motion.p>
            </div>

            <div
              className="
                relative
                mx-auto
                aspect-square
                w-[min(78vw,430px)]
                lg:w-[min(36vw,500px)]
              "
            >
              <motion.div
                style={{ rotate: discRotate }}
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-white/10
                  bg-[repeating-radial-gradient(circle,rgba(255,255,255,0.08)_0_1px,transparent_1px_8px),radial-gradient(circle_at_center,#050505_0_18%,#10100d_19%_52%,#020302_53%_100%)]
                  shadow-[0_34px_110px_rgba(0,0,0,0.58)]
                "
              />

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  flex
                  h-[38%]
                  w-[38%]
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-[#138f45]
                  shadow-[inset_0_0_30px_rgba(255,255,255,0.2)]
                "
              >
                <Disc3 className="text-white/85" size={44} strokeWidth={1.4} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section
        className="
          relative
          z-20
          -mt-[18vh]
          bg-[#050806]
          px-5
          py-12
          md:px-10
          lg:px-14
        "
      >
        <div className="mx-auto max-w-[1180px]">
          <div
            className="
              mb-8
              flex
              items-end
              justify-between
              gap-5
            "
          >
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-white/42">
                Selected sound worlds
              </p>
              <h2 className="mt-3 text-[clamp(2.6rem,8vw,6.8rem)] font-black leading-[0.82] tracking-[-0.08em]">
                TRACK
                <br />
                STUDIES
              </h2>
            </div>

            <div className="hidden items-center gap-3 text-white/45 md:flex">
              <Headphones size={18} strokeWidth={1.5} />
              <Radio size={18} strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-6">
            {records.map((record, index) => (
              <MusicPanel
                key={record.title}
                index={index}
                record={record}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer compact />
    </main>
  );
}

function MusicPanel({
  index,
  record,
}) {
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 42, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/[0.08]
        bg-[#10160f]
        p-4
        shadow-[0_30px_120px_rgba(0,0,0,0.42)]
        md:p-6
      "
    >
      <motion.div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          top-1/2
          h-[48vw]
          w-[48vw]
          max-h-[520px]
          max-w-[520px]
          -translate-y-1/2
          rounded-full
          ${reverse ? "left-[-18vw] bg-[#a8652a]" : "right-[-18vw] bg-[#159447]"}
          opacity-75
          transition
          duration-700
          group-hover:scale-110
        `}
      />

      <div
        className={`
          relative
          z-10
          grid
          gap-6
          md:grid-cols-2
          md:items-center
          ${reverse ? "md:[&>*:first-child]:order-2" : ""}
        `}
      >
        <div
          className="
            relative
            aspect-[1.16/1]
            overflow-hidden
            rounded-[22px]
            bg-black
          "
        >
          <LazyVideo
            src={record.video}
            poster={record.image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="
              h-full
              w-full
              object-cover
              brightness-[0.82]
              contrast-[1.12]
              saturate-[0.86]
              transition
              duration-700
              group-hover:scale-[1.04]
              group-hover:brightness-100
            "
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.56))]" />
        </div>

        <div className="relative">
          <div className="mb-8 flex items-center gap-4 text-white/45">
            <span className="text-[12px] uppercase tracking-[0.28em]">
              {record.index}
            </span>
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] uppercase tracking-[0.28em]">
              {record.role}
            </span>
          </div>

          <h3 className="max-w-[520px] text-[clamp(2.5rem,7vw,5.4rem)] font-black leading-[0.82] tracking-[-0.08em]">
            {record.title}
          </h3>

          <p className="mt-5 max-w-[440px] text-[14px] leading-[1.75] text-white/58">
            {record.copy}
          </p>

          <button
            type="button"
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/[0.06]
              px-5
              py-3
              text-[13px]
              font-medium
              text-white/86
              backdrop-blur-xl
            "
          >
            Listen Study
            <ArrowUpRight size={15} strokeWidth={1.6} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
