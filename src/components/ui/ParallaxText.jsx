"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export default function ParallaxText({
  children,
}) {
  const mouseX = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 120,
    damping: 18,
  });

  const x = useTransform(
    springX,
    [-0.5, 0.5],
    [-12, 12]
  );

  function handleMouseMove(e) {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const position =
      (e.clientX - rect.left) /
        rect.width -
      0.5;

    mouseX.set(position);
  }

  function handleMouseLeave() {
    mouseX.set(0);
  }

  return (
    <motion.div
      style={{
        x,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        will-change-transform
      "
    >
      {children}
    </motion.div>
  );
}