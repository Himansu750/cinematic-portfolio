"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Mobile3DScrollCard({
  as = "div",
  index = 0,
  enableOn = "mobile",
  intensity = "normal",
  children,
  className = "",
  style,
  ...props
}) {
  const ref = useRef(null);
  const [mobileEnabled, setMobileEnabled] =
    useState(false);
  const enabled =
    enableOn === "all" || mobileEnabled;

  useEffect(() => {
    if (enableOn === "all") {
      return;
    }

    const media = window.matchMedia(
      "(max-width: 1023px)"
    );

    function update() {
      setMobileEnabled(media.matches);
    }

    update();
    media.addEventListener("change", update);

    return () =>
      media.removeEventListener("change", update);
  }, [enableOn]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 110%", "center 52%", "end -10%"],
  });

  const direction = index % 2 === 0 ? -1 : 1;
  const deep = intensity === "deep";

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    deep ? [34, 0, -24] : [24, 0, -18]
  );

  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    deep
      ? [direction * 18, 0, direction * -14]
      : [direction * 12, 0, direction * -9]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    deep ? [96, 0, -70] : [56, 0, -46]
  );

  const z = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    deep ? [-520, 80, -340] : [-190, 0, -150]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    deep ? [0.68, 1, 0.82] : [0.84, 1, 0.9]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.5, 0.88, 1],
    deep
      ? [0.1, 0.58, 1, 0.7, 0.28]
      : [0.34, 0.72, 1, 0.76, 0.48]
  );

  const MotionTag =
    as === "article" ? motion.article : motion.div;

  return (
    <MotionTag
      ref={ref}
      style={
        enabled
          ? {
              ...style,
              opacity,
              rotateX,
              rotateY,
              scale,
              y,
              z,
              transformPerspective: deep ? 1250 : 920,
              transformStyle: "preserve-3d",
            }
          : style
      }
      className={`
        ${className}
        ${
          enableOn === "all"
            ? "transform-gpu will-change-transform"
            : "max-lg:transform-gpu max-lg:will-change-transform lg:!transform-none"
        }
      `}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
