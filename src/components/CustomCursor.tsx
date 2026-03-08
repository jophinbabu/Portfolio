"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest(".project-image-wrap")) {
        setIsHoveringImage(true);
      } else {
        setIsHoveringImage(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        * { cursor: none !important; }
        .nav-corner a, .btn { cursor: none !important; }
      `}} />
      <motion.div
        animate={{
          x: mousePosition.x - (isHoveringImage ? 24 : 8),
          y: mousePosition.y - (isHoveringImage ? 24 : 8),
          scale: isHoveringImage ? 2 : 1,
          opacity: 1
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHoveringImage ? "48px" : "16px",
          height: isHoveringImage ? "48px" : "16px",
          backgroundColor: isHoveringImage ? "rgba(255, 77, 0, 0.4)" : "var(--foreground)",
          border: isHoveringImage ? "1px solid var(--accent)" : "none",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: isHoveringImage ? "normal" : "difference"
        }}
      />
    </>
  );
}
