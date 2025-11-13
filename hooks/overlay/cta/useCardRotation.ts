"use client";

import { RefObject, useEffect, useRef } from "react";

interface UseCardRotationProps {
  cardsContainerRef: RefObject<HTMLDivElement | null>;
  sectionProgress: number;
  currentCardIndex: number;
  setCurrentCardIndex: (index: number) => void;
  totalCards: number;
}

export default function useCardRotation({
  cardsContainerRef,
  sectionProgress,
  currentCardIndex,
  setCurrentCardIndex,
  totalCards,
}: UseCardRotationProps) {
  const lastCardChangeRef = useRef(0);
  const prevProgressRef = useRef(0);

  useEffect(() => {
    // Expanded range: cards rotate from 15% to 85% of section progress
    if (sectionProgress <= 0.15 || sectionProgress >= 0.85) return;

    // Normalize progress to 0-1 for the middle section (0.7 range total)
    const normalizedProgress = (sectionProgress - 0.15) / 0.7;
    const goingForward = sectionProgress > prevProgressRef.current;
    prevProgressRef.current = sectionProgress;

    // Calculate exact card position based on continuous progress
    const exactPosition = normalizedProgress * (totalCards - 1);

    // Use Math.round for smoother, more natural transitions
    const targetIndex = Math.round(exactPosition);
    const clampedIndex = Math.max(0, Math.min(totalCards - 1, targetIndex));

    // Use smaller threshold for smoother transitions
    const progressDelta = Math.abs(exactPosition - currentCardIndex);

    // Only change card if we've crossed the halfway point to the next card
    if (progressDelta >= 0.5 && clampedIndex !== currentCardIndex) {
      setCurrentCardIndex(clampedIndex);
      lastCardChangeRef.current = normalizedProgress;
    }
  }, [sectionProgress, currentCardIndex, setCurrentCardIndex, totalCards]);
}
