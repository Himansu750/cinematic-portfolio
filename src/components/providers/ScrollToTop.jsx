"use client";

import { useLayoutEffect } from "react";

import { usePathname } from "next/navigation";

function getDocumentTop(element) {
  let top = 0;
  let current = element;

  while (current) {
    top += current.offsetTop;
    current = current.offsetParent;
  }

  return top;
}

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
        const mobileCardTarget =
          document.querySelector(
            "[data-home-mobile-card-target]"
          );

        const isDesktop =
          window.innerWidth >= 1024;
        const target = isDesktop
          ? activeCardTarget || cardTarget
          : mobileCardTarget ||
            cardTarget ||
            activeCardTarget;

        if (!target) {
          window.scrollTo({
            top: 0,
            behavior: "auto",
          });
          return;
        }

        const targetTop = isDesktop
          ? target.getBoundingClientRect().top +
            window.scrollY -
            205
          : getDocumentTop(target) +
            80 -
            (window.innerWidth < 768 ? 250 : 220);

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
