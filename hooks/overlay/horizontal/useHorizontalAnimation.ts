"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";

export default function useSlideAnimation(
  contentRef: RefObject<HTMLDivElement | null>,
  sectionProgress: number,
  prevProgressRef: React.RefObject<number>,
  wordsSetupRef: React.RefObject<boolean>
) {
  useEffect(() => {
    if (!contentRef.current || !wordsSetupRef.current) return;

    const slides = contentRef.current.querySelectorAll(".slide-content");

    const entranceStart = 0;
    const entranceEnd = 0.15;
    const exitStart = 0.85;
    const exitEnd = 1.0;

    slides.forEach((slide) => {
      const titleWordEls = slide.querySelectorAll<HTMLSpanElement>(".word");
      const progressBar = slide.querySelector(".progress-bar");
      const progressText = slide.querySelector(".progress-text");

      const goingBack = sectionProgress < prevProgressRef.current;
      prevProgressRef.current = sectionProgress;

      if (sectionProgress >= entranceStart && sectionProgress <= entranceEnd) {
        const entranceProgress =
          (sectionProgress - entranceStart) / (entranceEnd - entranceStart);

        titleWordEls.forEach((word, i) => {
          const wordProgress = Math.max(
            0,
            Math.min(1, entranceProgress * titleWordEls.length - i)
          );

          gsap.to(word, {
            opacity: wordProgress,
            y: 40 * (1 - wordProgress),
            filter: `blur(${12 * (1 - wordProgress)}px)`,
            duration: goingBack ? 0.25 : 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        });

        if (progressBar && progressText) {
          gsap.to(progressBar, {
            scaleX: entranceProgress,
            opacity: entranceProgress,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(progressText, {
            opacity: entranceProgress * 0.6,
            y: 20 * (1 - entranceProgress),
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      } else if (sectionProgress >= exitStart && sectionProgress <= exitEnd) {
        const exitProgress =
          (sectionProgress - exitStart) / (exitEnd - exitStart);
        const inverseProgress = 1 - exitProgress;

        titleWordEls.forEach((word, i) => {
          const wordProgress = Math.max(
            0,
            Math.min(1, inverseProgress * titleWordEls.length - i)
          );

          gsap.to(word, {
            opacity: wordProgress,
            y: 24 * (1 - wordProgress),
            filter: `blur(${12 * (1 - wordProgress)}px)`,
            duration: goingBack ? 0.25 : 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        });

        if (progressBar && progressText) {
          gsap.to(progressBar, {
            scaleX: inverseProgress,
            opacity: inverseProgress,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(progressText, {
            opacity: inverseProgress * 0.6,
            y: 12 * (1 - inverseProgress),
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      } else if (sectionProgress > entranceEnd && sectionProgress < exitStart) {
        gsap.to(titleWordEls, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.15,
          ease: "power1.out",
          overwrite: "auto",
        });

        if (progressBar && progressText) {
          gsap.to(progressBar, {
            scaleX: 1,
            opacity: 1,
            duration: 0.15,
            ease: "power1.out",
            overwrite: "auto",
          });
          gsap.to(progressText, {
            opacity: 0.6,
            y: 0,
            duration: 0.15,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      } else {
        gsap.to(titleWordEls, {
          opacity: 0,
          y: 40,
          filter: "blur(12px)",
          duration: 0.15,
          ease: "none",
          overwrite: "auto",
        });
        if (progressBar && progressText) {
          gsap.to(progressBar, {
            scaleX: 0,
            opacity: 0,
            duration: 0.15,
            ease: "none",
            overwrite: "auto",
          });
          gsap.to(progressText, {
            opacity: 0,
            y: 20,
            duration: 0.15,
            ease: "none",
            overwrite: "auto",
          });
        }
      }
    });
  }, [contentRef, sectionProgress, prevProgressRef, wordsSetupRef]);
}
