"use client";

import { motion } from "framer-motion";

import { usePathname } from "next/navigation";

import { ease } from "@/lib/motion";

export default function PageTransition({
  children,
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.16,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
