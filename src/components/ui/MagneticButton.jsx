"use client";

import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function MagneticButton({
  children,
  className = "",
  type = "button",
  ariaLabel,
  onClick,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 180,
    damping: 15,
  });

  const springY = useSpring(y, {
    stiffness: 180,
    damping: 15,
  });

  function handleMouseMove(e) {
    const rect =
      e.currentTarget.getBoundingClientRect();

    const centerX =
      rect.left + rect.width / 2;

    const centerY =
      rect.top + rect.height / 2;

    const moveX =
      (e.clientX - centerX) * 0.2;

    const moveY =
      (e.clientY - centerY) * 0.2;

    x.set(moveX);
    y.set(moveY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.button
      type={type}
      aria-label={ariaLabel}
      style={{
        x: springX,
        y: springY,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{
        scale: 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 18,
      }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
