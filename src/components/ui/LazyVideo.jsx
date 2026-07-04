"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

function setRefs(refs, value) {
  refs.forEach((ref) => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(value);
      return;
    }

    ref.current = value;
  });
}

const LazyVideo = forwardRef(function LazyVideo(
  {
    src,
    autoPlay = false,
    preload = "metadata",
    rootMargin = "360px 0px",
    muted = true,
    loop = true,
    playsInline = true,
    ...props
  },
  forwardedRef
) {
  const localRef = useRef(null);
  const [shouldLoad, setShouldLoad] =
    useState(false);
  const [isVisible, setIsVisible] =
    useState(false);

  useEffect(() => {
    const video = localRef.current;

    if (!video) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        setIsVisible(visible);

        if (visible) {
          setShouldLoad(true);
        }
      },
      {
        rootMargin,
        threshold: 0.08,
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    const video = localRef.current;

    if (!video || !shouldLoad) return;

    const connection = navigator.connection;
    const saveData = Boolean(connection?.saveData);
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      autoPlay &&
      isVisible &&
      !saveData &&
      !reduceMotion
    ) {
      const playPromise = video.play();

      if (playPromise) {
        playPromise.catch(() => {});
      }

      return;
    }

    video.pause();
  }, [autoPlay, isVisible, shouldLoad]);

  return (
    <video
      ref={(element) => {
        localRef.current = element;
        setRefs([forwardedRef], element);
      }}
      src={shouldLoad ? src : undefined}
      preload={shouldLoad ? preload : "none"}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      {...props}
    />
  );
});

export default LazyVideo;
