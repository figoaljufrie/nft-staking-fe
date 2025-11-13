"use client";

import { motion } from "framer-motion";

interface FloatingCardProps {
  card: {
    id: number;
    title: string;
    code: string;
    image: string;
    rarity: string;
    stake: string;
  };
  index: number;
  position: {
    x: number;
    y: number;
    rotation: number;
  } | null;
  onClick: () => void;
}

export default function FloatingCard({
  card,
  index,
  position,
  onClick,
}: FloatingCardProps) {
  if (!position) return null;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: "350px",
        height: "490px",
        left: 0,
        top: 0,
        x: position.x,
        y: position.y,
        rotate: position.rotation,
        willChange: "transform",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{
        duration: 1,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/20 hover:shadow-black/40 transition-shadow">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
}