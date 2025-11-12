"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

export function useHeroAnimation(
  textRef: React.RefObject<HTMLDivElement | null>,
  scrollProgress: number
) {
  const headerTimeline = useRef<gsap.core.Timeline | null>(null);
  const paragraphTimeline = useRef<gsap.core.Timeline | null>(null);
  const wordsReadyRef = useRef(false);
  const prevScrollRef = useRef(0);

  // ---- Setup text for scrambling ----
  useEffect(() => {
    if (!textRef.current) return;

    const headerLines = textRef.current.querySelectorAll(".header-line");
    const p = textRef.current.querySelector("p");
    if (!headerLines.length || !p) return;

    const originalParagraph = (p.textContent || "").trim();

    const setupText = (el: HTMLElement, originalText: string) => {
      const words = originalText.split(/\s+/);
      el.innerHTML = words
        .map((w, i) => {
          const spacer = i < words.length - 1 ? " " : "";
          return `<span class="word inline-block mr-2 opacity-0" data-orig="${w}">${w}</span>${spacer}`;
        })
        .join("");
      return Array.from(el.querySelectorAll<HTMLSpanElement>(".word"));
    };

    const allHeaderWords: HTMLSpanElement[] = [];
    headerLines.forEach((line) => {
      const words = setupText(
        line as HTMLElement,
        (line.textContent || "").trim()
      );
      allHeaderWords.push(...words);
    });

    const pWords = setupText(p, originalParagraph);

    headerTimeline.current = gsap.timeline({ paused: true });
    paragraphTimeline.current = gsap.timeline({ paused: true });

    allHeaderWords.forEach((word, i) => {
      const target = word.dataset.orig || "";
      headerTimeline.current
        ?.fromTo(
          word,
          { y: 40, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          },
          i * 0.08
        )
        .to(
          word,
          {
            scrambleText: {
              text: target,
              chars: "upperAndLowerCase",
              revealDelay: 0.1,
              speed: 0.4,
            },
            duration: 1.2,
            ease: "power2.inOut",
          },
          i * 0.08
        );
    });

    pWords.forEach((word, i) => {
      const target = word.dataset.orig || "";
      paragraphTimeline.current
        ?.fromTo(
          word,
          { y: 20, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0.5px)",
            duration: 0.6,
            ease: "power2.out",
          },
          i * 0.03
        )
        .to(
          word,
          {
            scrambleText: {
              text: target,
              chars: "lowerCase",
              revealDelay: 0.05,
              speed: 0.5,
            },
            duration: 0.9,
            ease: "power2.inOut",
          },
          i * 0.03
        );
    });

    wordsReadyRef.current = true;

    return () => {
      headerTimeline.current?.kill();
      paragraphTimeline.current?.kill();
      wordsReadyRef.current = false;
    };
  }, []);

  return {
    headerTimeline,
    paragraphTimeline,
    wordsReadyRef,
    prevScrollRef,
  };
}
