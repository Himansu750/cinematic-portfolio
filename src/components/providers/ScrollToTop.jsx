"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
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

        if (!cardTarget) {
          window.scrollTo({
            top: 0,
            behavior: "auto",
          });
          return;
        }

        const targetTop =
          cardTarget.getBoundingClientRect().top +
          window.scrollY -
          120;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "auto",
        });
      };

      window.requestAnimationFrame(() => {
        scrollToHomeCards();

        window.setTimeout(scrollToHomeCards, 120);
        window.setTimeout(scrollToHomeCards, 360);
      });

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
}
