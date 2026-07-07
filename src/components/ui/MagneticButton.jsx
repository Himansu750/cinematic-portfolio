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
  href,
  intensity = 0.2,
  ...rest
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
      (e.clientX - centerX) * intensity;

    const moveY =
      (e.clientY - centerY) * intensity;

    x.set(moveX);
    y.set(moveY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const sharedProps = {
    "aria-label": ariaLabel,
    style: {
      x: springX,
      y: springY,
    },
    onClick,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: {
      scale: 0.96,
    },
    whileFocus: {
      scale: 1.03,
    },
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 18,
    },
    className,
    ...rest,
  };

  if (href) {
    return (
      <motion.a href={href} {...sharedProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type={type} {...sharedProps}>
      {children}
    </motion.button>
  );
}
