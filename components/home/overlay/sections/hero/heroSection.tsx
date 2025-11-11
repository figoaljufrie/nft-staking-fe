"use client";

import { useRef } from "react";
import { useHeroAnimation } from "@/hooks/overlay/hero/useHeroAnimation";
import { HeroText } from "./heroText";

interface TextProps {
  scrollProgress: number;
}

export function HeroSection({ scrollProgress }: TextProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const {
    headerTimeline,
    paragraphTimeline,
    wordsReadyRef,
    prevScrollRef,
  } = useHeroAnimation(textRef, scrollProgress);

  return (
    <HeroText
      textRef={textRef}
      scrollProgress={scrollProgress}
      headerTimeline={headerTimeline}
      paragraphTimeline={paragraphTimeline}
      wordsReadyRef={wordsReadyRef}
      prevScrollRef={prevScrollRef}
    />
  );
}