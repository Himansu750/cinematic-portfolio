"use client";

import { useEffect } from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

export default function VideoModal({
  video,
  isOpen,
  onClose,
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          className="
            fixed
            inset-0
            z-[9999]

            flex
            items-center
            justify-center

            bg-black/90

            backdrop-blur-xl
          "
        >
          {/* VIDEO CONTAINER */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 40,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              relative

              w-[95vw]
              max-w-[1400px]

              overflow-hidden

              rounded-[28px]

              border
              border-white/[0.06]

              bg-black
            "
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              aria-label="Close video"
              onClick={onClose}
              className="
                absolute
                right-5
                top-5
                z-20

                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                bg-black/60

                text-xl
                text-white/70

                backdrop-blur-md

                transition-all
                duration-300

                hover:bg-white/10
                hover:text-white
              "
            >
              &times;
            </button>

            {/* VIDEO */}
            <video
              src={video}
              autoPlay
              controls
              playsInline
              className="
                max-h-[90vh]
                w-full

                object-cover
              "
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
