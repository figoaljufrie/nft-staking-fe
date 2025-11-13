"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFloatingCardsAnimation from "@/hooks/overlay/floating/useFloatingCardAnimation";
import FloatingCard from "./floatingCardProps";
import CardDetailModal from "./cardDetailModal";

interface FloatingCardsSectionProps {
  scrollProgress: number;
}

export default function FloatingCardsSection({
  scrollProgress,
}: FloatingCardsSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const cards = [
    {
      id: 1,
      title: "Genesis Collection",
      code: "MOIST-001",
      image:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&h=700&fit=crop",
      rarity: "Legendary",
      stake: "1000 MOIST",
    },
    {
      id: 2,
      title: "Aqua Series",
      code: "MOIST-002",
      image:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&h=700&fit=crop",
      rarity: "Epic",
      stake: "750 MOIST",
    },
    {
      id: 3,
      title: "Hydro Edition",
      code: "MOIST-003",
      image:
        "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=500&h=700&fit=crop",
      rarity: "Rare",
      stake: "500 MOIST",
    },
    {
      id: 4,
      title: "Liquid Dreams",
      code: "MOIST-004",
      image:
        "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=500&h=700&fit=crop",
      rarity: "Uncommon",
      stake: "250 MOIST",
    },
    {
      id: 5,
      title: "Wave Riders",
      code: "MOIST-005",
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=700&fit=crop",
      rarity: "Common",
      stake: "100 MOIST",
    },
  ];

  const { cardPositions } = useFloatingCardsAnimation(cards);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-auto bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Floating Cards */}
      <div className="absolute inset-0 z-40">
        {cards.map((card, index) => (
          <FloatingCard
            key={card.id}
            card={card}
            index={index}
            position={cardPositions[index]}
            onClick={() => setSelectedCard(card.id)}
          />
        ))}
      </div>

      {/* Card Detail Modal */}
      <AnimatePresence>
        {selectedCard !== null && (
          <CardDetailModal
            card={cards.find((c) => c.id === selectedCard)!}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}