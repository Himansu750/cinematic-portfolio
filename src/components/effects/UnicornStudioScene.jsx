"use client";

import { useEffect } from "react";

const UNICORN_SCRIPT_ID =
  "unicorn-studio-runtime";

const UNICORN_SCRIPT_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";

function initUnicornStudio() {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.UnicornStudio?.init) {
    return;
  }

  window.UnicornStudio.init();
}

function loadUnicornStudio() {
  if (typeof window === "undefined") {
    return;
  }

  if (window.UnicornStudio?.init) {
    initUnicornStudio();
    return;
  }

  const existingScript = document.getElementById(
    UNICORN_SCRIPT_ID
  );

  if (existingScript) {
    existingScript.addEventListener(
      "load",
      initUnicornStudio,
      { once: true }
    );

    return;
  }

  const script = document.createElement("script");
  script.id = UNICORN_SCRIPT_ID;
  script.src = UNICORN_SCRIPT_SRC;
  script.async = true;
  script.onload = initUnicornStudio;
  script.onerror = () => {
    document.documentElement.dataset.unicornStudio =
      "failed";
  };

  document.head.appendChild(script);
}

export default function UnicornStudioScene({
  projectId,
  className = "",
  style,
  ariaLabel = "Interactive Unicorn Studio animation",
}) {
  useEffect(() => {
    loadUnicornStudio();
  }, [projectId]);

  if (!projectId) {
    return null;
  }

  return (
    <div
      aria-label={ariaLabel}
      role="img"
      data-us-project={projectId}
      className={`
        pointer-events-none
        h-full
        w-full
        overflow-hidden
        ${className}
      `}
      style={style}
    />
  );
}
