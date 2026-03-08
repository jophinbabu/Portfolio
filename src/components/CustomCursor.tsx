"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements or elements with the 'data-cursor-hover' attribute
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.hasAttribute("data-cursor-hover")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Hide the custom cursor on smaller screens for better performance and usability
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(window.innerWidth > 768);
    const handleResize = () => setIsVisible(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main tiny dot that follows cursor exactly */}
      <motion.div
        className="custom-cursor-dot"
        animate={{
          x: mousePosition.x - 4, // Center the 8px dot
          y: mousePosition.y - 4,
          scale: isHovering ? 0 : 1, // Disappear when hovering to let the outline take over
          opacity: 1,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0, // 0 duration for instant follow
        }}
      />
      
      {/* Larger outline that lags slightly behind */}
      <motion.div
        className="custom-cursor-outline"
        animate={{
          x: mousePosition.x - 20, // Center the 40px outline
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(37, 99, 235, 0.1)" : "transparent", // Accent color with low opacity
          borderColor: isHovering ? "transparent" : "var(--accent)",
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5,
        }}
      />
    </>
  );
}
