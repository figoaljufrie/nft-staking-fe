"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center px-66 py-20 bg-blue-700 text-white">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold"
      >
        Stake. Earn. Build the future of ownership!
      </motion.h1>
      <p className="text-sm font-bold">One-liner insert</p>
    </section>
  );
}
