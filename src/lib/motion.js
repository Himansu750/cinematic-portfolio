export const ease = [0.22, 1, 0.36, 1];

export const premiumSpring = {
  type: "spring",
  stiffness: 180,
  damping: 24,
  mass: 0.8,
};

export const pageReveal = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease,
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

export const cardReveal = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

export const tap = {
  scale: 0.975,
  transition: premiumSpring,
};

export const routeTransition = {
  hidden: {
    opacity: 0,
    scale: 0.985,
    filter: "blur(14px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.015,
    filter: "blur(14px)",
    transition: {
      duration: 0.4,
      ease,
    },
  },
};
