"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { motionConfig } from "@/lib/constants/animations";

export function RevealOnScroll({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: motionConfig.duration, delay, ease: motionConfig.ease }}
    >
      {children}
    </motion.div>
  );
}
