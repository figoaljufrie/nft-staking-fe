"use client";

import useSlideAnimation from "@/hooks/overlay/horizontal/useHorizontalAnimation";
import useHorizontalTween from "@/hooks/overlay/horizontal/useHorizontalTween";
import useWordSplit from "@/hooks/overlay/horizontal/useWordSplit";
import { motion } from "framer-motion";
import { useRef } from "react";

interface HorizontalScrollSectionProps {
  sectionProgress: number;
}

export default function HorizontalScrollSection({
  sectionProgress,
}: HorizontalScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const wordsSetupRef = useRef(false);
  const prevProgressRef = useRef(0);

  useWordSplit(contentRef, wordsSetupRef);
  useSlideAnimation(contentRef, sectionProgress, prevProgressRef, wordsSetupRef);
  useHorizontalTween(contentRef, tweenRef, sectionProgress);

  const slides = [
  { title: "LOREM IPSUM DOLOR SIT AMET" },
  { title: "SED UT PERSPICIATIS UNDE" },
  { title: "AT VERO EOS ET ACCUSAMUS" },
  { title: "NEMO ENIM IPSAM VOLUPTATEM" },
  { title: "QUIS AUTEM VEL EUM IURE" },
];

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden pointer-events-auto"
      style={{ willChange: "transform, opacity, filter" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div ref={contentRef} className="relative z-10 flex h-full">
        {slides.map((slide) => (
          <div
            key={slide.title}
            className="horizontal-item flex-shrink-0 w-screen h-full relative"
          >
            <div className="slide-content absolute inset-0 z-10 flex flex-col items-center justify-center px-8">
              <h2 className="slide-title font-mono font-extrabold text-[30vh] leading-none text-black tracking-[-0.15em] select-none uppercase">
                {slide.title}
              </h2>

              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
                <div className="progress-bar w-32 h-px bg-black/20 mb-2 origin-left scale-x-0" />
                <div className="progress-text font-mono text-xs tracking-widest uppercase text-black/50">
                  {(sectionProgress * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}