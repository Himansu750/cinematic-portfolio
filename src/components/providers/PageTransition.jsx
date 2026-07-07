"use client";

import { AnimatePresence, motion } from "framer-motion";

import { usePathname } from "next/navigation";

import { routeTransition } from "@/lib/motion";

export default function PageTransition({
  children,
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        variants={routeTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
