"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimateInViewProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimateInView({ children, delay = 0, yOffset = 50, duration = 1.0, className = "", style = {} }: AnimateInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
