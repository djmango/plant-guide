"use client";

import { motion, AnimatePresence } from "motion/react";

export function WateringAnimation({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <svg
            viewBox="0 0 120 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/4 h-3/4"
          >
            {/* Spout */}
            <motion.path
              d="M 20,58 Q 10,55 8,48 Q 6,42 12,38 L 38,48"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {/* Body */}
            <motion.path
              d="M 38,38 L 88,38 Q 92,38 92,42 L 92,62 Q 92,68 86,68 L 44,68 Q 38,68 38,62 Z"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, fill: "rgba(74, 122, 46, 0)" }}
              animate={{
                pathLength: 1,
                fill: "rgba(74, 122, 46, 0.15)",
              }}
              transition={{
                pathLength: { duration: 0.6, ease: "easeInOut", delay: 0.2 },
                fill: { duration: 0.4, delay: 0.8 },
              }}
            />

            {/* Lid */}
            <motion.path
              d="M 42,38 L 42,34 Q 42,32 44,32 L 82,32 Q 84,32 84,34 L 84,38"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Handle */}
            <motion.path
              d="M 56,32 Q 56,18 65,18 Q 74,18 74,32"
              stroke="#1a1a1a"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Knob on lid */}
            <motion.circle
              cx="63"
              cy="32"
              r="2"
              stroke="#1a1a1a"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.2, delay: 0.7 }}
            />

            {/* Water drops from spout */}
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={i}
                cx={6 + i * 1.5}
                cy={48}
                r={1.2 + (i % 2) * 0.5}
                fill="#2563eb"
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, 15 + i * 5, 35 + i * 4],
                  opacity: [0, 0.8, 0],
                  x: [-1 + i * 0.5, i * 0.8, 2 + i * 0.6],
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.9 + i * 0.15,
                  ease: "easeIn",
                  repeat: 1,
                  repeatDelay: 0.1,
                }}
              />
            ))}

            {/* Water stream line from spout */}
            <motion.path
              d="M 8,48 Q 6,58 10,70 Q 14,80 8,88"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity={0.5}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1, 0] }}
              transition={{
                duration: 1.2,
                delay: 0.9,
                ease: "easeInOut",
              }}
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
