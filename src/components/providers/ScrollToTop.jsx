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

      window.requestAnimationFrame(() => {
        const workSection =
          document.getElementById("work");

        if (!workSection) {
          window.scrollTo({
            top: 0,
            behavior: "instant",
          });
          return;
        }

        workSection.scrollIntoView({
          block: "start",
          behavior: "instant",
        });
      });

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}
