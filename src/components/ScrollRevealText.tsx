"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 40%"],
  });

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => {
      setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.2em" }}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            theme={theme}
          />
        );
      })}
    </div>
  );
}

function Word({
  word,
  progress,
  range,
  theme,
}: {
  word: string;
  progress: any;
  range: [number, number];
  theme: "light" | "dark";
}) {
  const midpoint = (range[0] + range[1]) / 2;
  const palette =
    theme === "dark"
      ? ["rgba(229,238,251,0.24)", "#60a5fa", "#e5eefb"]
      : ["rgba(15,23,42,0.15)", "#2563eb", "#0f172a"];

  const color = useTransform(progress, [range[0], midpoint, range[1]], palette);

  return <motion.span style={{ color, transition: "none" }}>{word}</motion.span>;
}
