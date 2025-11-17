"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className={`relative overflow-hidden bg-black backdrop-blur-sm border border-[#003B00]/50 shadow-[0_0_30px_rgba(0,143,17,0.2)] hover:shadow-[0_0_40px_rgba(0,255,65,0.5)] transition-all ${className}`}
    >
      {/* Animated border glow
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#00FF41] via-[#008F11] to-[#00FF41] opacity-0 hover:opacity-20 transition-opacity duration-300 blur-sm" /> */}
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#003B00] opacity-60" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#008F11] opacity-60" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#008F11] opacity-60" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#003B00] opacity-60" />
      
      {children}
    </motion.div>
  );
}