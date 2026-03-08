"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ScrollRevealText({ text, className = "" }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2em' }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
      })}
    </div>
  );
}

function Word({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  // Phase 1: grey → accent red (first half of range)
  // Phase 2: accent red → black (second half of range)
  const midpoint = (range[0] + range[1]) / 2;

  const color = useTransform(
    progress,
    [range[0], midpoint, range[1]],
    ["rgba(15,23,42,0.15)", "#2563eb", "#0f172a"]
  );

  return (
    <motion.span style={{ color, transition: 'none' }}>
      {word}
    </motion.span>
  );
}
