"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { useEffect } from "react";

export default function CursorTrail() {
  const mouseX = useMotionValue(-100);

  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, {
    stiffness: 140,
    damping: 22,
    mass: 0.5,
  });

  const springY = useSpring(mouseY, {
    stiffness: 140,
    damping: 22,
    mass: 0.5,
  });

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX - 10);

      mouseY.set(e.clientY - 10);
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="
        pointer-events-none

        fixed
        left-0
        top-0

        z-[9999]

        hidden md:block

        h-5
        w-5

        rounded-full

        border
        border-white/[0.10]

        bg-white/[0.04]

        backdrop-blur-md

        shadow-[0_0_30px_rgba(255,255,255,0.08)]
      "
    />
  );
}