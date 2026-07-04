"use client";

import { useLayoutEffect } from "react";

import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration =
        "manual";
    }

    const shouldReturnToWork =
      pathname === "/" &&
      window.sessionStorage.getItem(
        "returnToHomeWork"
      ) === "true";

    if (shouldReturnToWork) {
      window.sessionStorage.removeItem(
        "returnToHomeWork"
      );

      const scrollToHomeCards = () => {
        const activeCard =
          window.sessionStorage.getItem(
            "activeCard"
          );
        const activeCardTarget =
          activeCard !== null
            ? [
                ...document.querySelectorAll(
                  `[data-home-card-index="${activeCard}"]`
                ),
              ].find((element) => {
                const rect =
                  element.getBoundingClientRect();

                return (
                  rect.width > 0 &&
                  rect.height > 0
                );
              })
            : null;
        const cardTarget = [
          ...document.querySelectorAll(
            "[data-home-card-target]"
          ),
        ].find((element) => {
          const rect =
            element.getBoundingClientRect();

          return (
            rect.width > 0 &&
            rect.height > 0
          );
        });

        const target =
          activeCardTarget || cardTarget;

        if (!target) {
          window.scrollTo({
            top: 0,
            behavior: "auto",
          });
          return;
        }

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          120;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "auto",
        });
      };

      scrollToHomeCards();

      window.setTimeout(scrollToHomeCards, 80);
      window.setTimeout(scrollToHomeCards, 240);

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}
