"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DynamicBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-bg-primary/80 z-10 backdrop-blur-[2px]"></div>
      
      {/* Animated glowing orbs */}
      <motion.div
        animate={{
          x: ["0%", "20%", "-10%", "0%"],
          y: ["0%", "10%", "-20%", "0%"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-primary/20 blur-[120px] mix-blend-screen"
      />
      
      <motion.div
        animate={{
          x: ["0%", "-20%", "10%", "0%"],
          y: ["0%", "-10%", "20%", "0%"],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          delay: 1,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent-secondary/20 blur-[150px] mix-blend-screen"
      />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 z-0"></div>
    </div>
  );
}
