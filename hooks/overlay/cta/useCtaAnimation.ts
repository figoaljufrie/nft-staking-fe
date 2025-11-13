"use client";

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { RefObject, useEffect, useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin);

interface UseCTAAnimationProps {
  mainTitleRef: RefObject<HTMLHeadingElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLHeadingElement | null>;
  cardsContainerRef: RefObject<HTMLDivElement | null>;
  sectionProgress: number;
}

export default function useCTAAnimation({
  mainTitleRef,
  titleRef,
  subtitleRef,
  cardsContainerRef,
  sectionProgress,
}: UseCTAAnimationProps) {
  const mainTitleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const titleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const subtitleTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const cardsTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const prevProgressRef = useRef(0);
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (
      !mainTitleRef.current ||
      !titleRef.current ||
      !subtitleRef.current ||
      !cardsContainerRef.current ||
      hasInitializedRef.current
    )
      return;

    const mainTitle = mainTitleRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cardsContainer = cardsContainerRef.current;

    // Set initial opacity to 1 so text is visible
    gsap.set(mainTitle, { opacity: 1 });
    gsap.set(title, { opacity: 1 });
    gsap.set(subtitle, { opacity: 1 });
    gsap.set(cardsContainer, { opacity: 1 });

    const mainTitleText = mainTitle.textContent || "";
    mainTitle.innerHTML = mainTitleText
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `<span class="char inline-block">${char}</span>`;
      })
      .join("");

    const mainTitleChars = mainTitle.querySelectorAll(".char");

    mainTitleTimelineRef.current = gsap.timeline({ paused: true });
    mainTitleChars.forEach((char, i) => {
      mainTitleTimelineRef.current?.fromTo(
        char,
        { opacity: 0, y: 80, filter: "blur(25px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        },
        i * 0.03
      );
    });

    const titleText = title.textContent || "";
    title.innerHTML = titleText
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return `<span class="char inline-block">${char}</span>`;
      })
      .join("");

    const titleChars = title.querySelectorAll(".char");

    titleTimelineRef.current = gsap.timeline({ paused: true });
    titleChars.forEach((char, i) => {
      titleTimelineRef.current?.fromTo(
        char,
        { opacity: 0, y: 60, filter: "blur(20px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power2.out",
        },
        i * 0.025
      );
    });

    subtitleTimelineRef.current = gsap.timeline({ paused: true });
    subtitleTimelineRef.current.fromTo(
      subtitle,
      { opacity: 0, y: 40, filter: "blur(15px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
      }
    );

    cardsTimelineRef.current = gsap.timeline({ paused: true });
    cardsTimelineRef.current.fromTo(
      cardsContainer,
      { opacity: 0, scale: 0.85, filter: "blur(20px)" },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power2.out",
      }
    );

    hasInitializedRef.current = true;

    return () => {
      mainTitleTimelineRef.current?.kill();
      titleTimelineRef.current?.kill();
      subtitleTimelineRef.current?.kill();
      cardsTimelineRef.current?.kill();
      hasInitializedRef.current = false;
    };
  }, [mainTitleRef, titleRef, subtitleRef, cardsContainerRef]);

  useEffect(() => {
    if (
      !mainTitleTimelineRef.current ||
      !titleTimelineRef.current ||
      !subtitleTimelineRef.current ||
      !cardsTimelineRef.current
    )
      return;

    const entranceStart = 0;
    const entranceEnd = 0.15;
    const exitStart = 0.85;
    const exitEnd = 1.0;

    const goingBack = sectionProgress < prevProgressRef.current;
    prevProgressRef.current = sectionProgress;

    if (sectionProgress >= entranceStart && sectionProgress <= entranceEnd) {
      const progress =
        (sectionProgress - entranceStart) / (entranceEnd - entranceStart);
      mainTitleTimelineRef.current.progress(progress);
      titleTimelineRef.current.progress(progress);
      subtitleTimelineRef.current.progress(progress);
      cardsTimelineRef.current.progress(progress);
    } else if (sectionProgress > entranceEnd && sectionProgress < exitStart) {
      mainTitleTimelineRef.current.progress(1);
      titleTimelineRef.current.progress(1);
      subtitleTimelineRef.current.progress(1);
      cardsTimelineRef.current.progress(1);
    } else if (sectionProgress >= exitStart && sectionProgress <= exitEnd) {
      const exitProgress =
        (sectionProgress - exitStart) / (exitEnd - exitStart);
      const inverseProgress = 1 - exitProgress;
      mainTitleTimelineRef.current.progress(inverseProgress);
      titleTimelineRef.current.progress(inverseProgress);
      subtitleTimelineRef.current.progress(inverseProgress);
      cardsTimelineRef.current.progress(inverseProgress);
    } else {
      mainTitleTimelineRef.current.progress(0);
      titleTimelineRef.current.progress(0);
      subtitleTimelineRef.current.progress(0);
      cardsTimelineRef.current.progress(0);
    }
  }, [sectionProgress]);
}
