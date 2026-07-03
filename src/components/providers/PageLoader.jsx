"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 900);

    const startTimeout = setTimeout(() => {
      setLoading(true);
    }, 0);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeout);
    };
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            y: "100%",
          }}
          animate={{
            y: 0,
          }}
          exit={{
            y: "-100%",
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            inset-0
            z-[9999]

            bg-black
          "
        >
          {/* CENTER TEXT */}
          <div
            className="
              flex
              h-full
              items-center
              justify-center
            "
          >
            <motion.h1
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -40,
              }}
              transition={{
                duration: 0.7,
              }}
              className="
                text-[14vw]
                md:text-[7vw]

                font-black

                tracking-[-0.08em]

                text-white
              "
            >
              HC
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
