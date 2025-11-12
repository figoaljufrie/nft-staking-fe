"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";

export default function useHorizontalTween(
  contentRef: RefObject<HTMLDivElement | null>,
  tweenRef: React.RefObject<gsap.core.Tween | null>,
  sectionProgress: number
) {
  useEffect(() => {
    if (!contentRef.current) return;
    const sections = contentRef.current.querySelectorAll(".horizontal-item");
    const totalDistance = -100 * (sections.length - 1);

    if (!tweenRef.current) {
      tweenRef.current = gsap.to(sections, {
        xPercent: totalDistance,
        ease: "none",
        paused: true,
      });
    }

    const clampedProgress = gsap.utils.clamp(0, 1, sectionProgress);

    gsap.to(tweenRef.current, {
      progress: clampedProgress,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
    });
  }, [contentRef, tweenRef, sectionProgress]);
}