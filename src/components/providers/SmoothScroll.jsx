"use client";

import { useEffect } from "react";

import Lenis from "lenis";

export default function SmoothScroll({
  children,
}) {
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (media.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    function handleReducedMotionChange(event) {
      if (event.matches) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      }
    }

    media.addEventListener(
      "change",
      handleReducedMotionChange
    );

    return () => {
      media.removeEventListener(
        "change",
        handleReducedMotionChange
      );
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}