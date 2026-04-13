"use client";

import { motion, AnimatePresence } from "motion/react";

export function WateringAnimation({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.7, rotate: 15 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 0.8,
          }}
        >
          <motion.img
            src="/images/watering-can.webp"
            alt=""
            className="w-[80%] h-[80%] object-contain"
            initial={{ y: -10 }}
            animate={{ y: [0, -4, 0] }}
            transition={{
              y: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
