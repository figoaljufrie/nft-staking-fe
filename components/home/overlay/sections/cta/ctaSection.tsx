"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCTAAnimation from "@/hooks/overlay/cta/useCtaAnimation";
import useCardRotation from "@/hooks/overlay/cta/useCardRotation";
import CTAHeader from "./ctaHeader";
import CTACards from "./ctaCards";
import CTACardCounter from "./ctaCardCounter";
import CTACardModal from "./ctaCardModal";

interface CTASectionProps {
  sectionProgress: number;
}

export default function CTASection({ sectionProgress }: CTASectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainTitleRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const cards = [
    {
      id: 1,
      title: "Genesis Collection",
      code: "MOIST-001",
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&h=700&fit=crop",
      rarity: "Legendary",
      stake: "1000 MOIST",
    },
    {
      id: 2,
      title: "Aqua Series",
      code: "MOIST-002",
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=500&h=700&fit=crop",
      rarity: "Epic",
      stake: "750 MOIST",
    },
    {
      id: 3,
      title: "Hydro Edition",
      code: "MOIST-003",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=500&h=700&fit=crop",
      rarity: "Rare",
      stake: "500 MOIST",
    },
    {
      id: 4,
      title: "Liquid Dreams",
      code: "MOIST-004",
      image: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=500&h=700&fit=crop",
      rarity: "Uncommon",
      stake: "250 MOIST",
    },
    {
      id: 5,
      title: "Wave Riders",
      code: "MOIST-005",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&h=700&fit=crop",
      rarity: "Common",
      stake: "100 MOIST",
    },
  ];

  useCTAAnimation({
    mainTitleRef,
    titleRef,
    subtitleRef,
    cardsContainerRef,
    sectionProgress,
  });

  useCardRotation({
    cardsContainerRef,
    sectionProgress,
    currentCardIndex,
    setCurrentCardIndex,
    totalCards: cards.length,
  });

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 flex flex-col items-center pointer-events-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <CTAHeader
        mainTitleRef={mainTitleRef}
        titleRef={titleRef}
        subtitleRef={subtitleRef}
      />

      <CTACards
        cards={cards}
        cardsContainerRef={cardsContainerRef}
        currentCardIndex={currentCardIndex}
        setSelectedCard={setSelectedCard}
      />

      <CTACardCounter
        currentCardIndex={currentCardIndex}
        totalCards={cards.length}
      />

      <AnimatePresence>
        {selectedCard !== null && (
          <CTACardModal
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}