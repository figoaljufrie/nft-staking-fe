"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";

interface HeroTextProps {
  textRef: RefObject<HTMLDivElement | null>;
  scrollProgress: number;
  headerTimeline: React.RefObject<gsap.core.Timeline | null>;
  paragraphTimeline: React.RefObject<gsap.core.Timeline | null>;
  wordsReadyRef: React.RefObject<boolean>;
  prevScrollRef: React.RefObject<number>;
}

export function HeroText({
  textRef,
  scrollProgress,
  headerTimeline,
  paragraphTimeline,
  wordsReadyRef,
  prevScrollRef,
}: HeroTextProps) {
  // ---- Cinematic scroll-driven animation ----
  useEffect(() => {
    if (!textRef.current || !wordsReadyRef.current) return;

    const direction = scrollProgress > prevScrollRef.current ? "down" : "up";
    prevScrollRef.current = scrollProgress;

    // Original timing - now scrollProgress goes 0-1 for hero section only
    const headerFadeIn = { start: 0.05, end: 0.12 };
    const headerReveal = { start: 0.10, end: 0.35 };
    const paragraphFadeIn = { start: 0.32, end: 0.38 };
    const paragraphReveal = { start: 0.40, end: 0.65 };
    const fadeOut = { start: 0.88, end: 0.95 };

    const headerProgress = gsap.utils.clamp(
      0,
      1,
      (scrollProgress - headerReveal.start) /
        (headerReveal.end - headerReveal.start)
    );
    const paragraphProgress = gsap.utils.clamp(
      0,
      1,
      (scrollProgress - paragraphReveal.start) /
        (paragraphReveal.end - paragraphReveal.start)
    );

    let opacity = 0;
    if (scrollProgress < headerFadeIn.start) opacity = 0;
    else if (scrollProgress < headerFadeIn.end)
      opacity = gsap.utils.interpolate(
        0,
        1,
        (scrollProgress - headerFadeIn.start) /
          (headerFadeIn.end - headerFadeIn.start)
      );
    else if (scrollProgress < fadeOut.start) opacity = 1;
    else if (scrollProgress < fadeOut.end)
      opacity = gsap.utils.interpolate(
        1,
        0,
        (scrollProgress - fadeOut.start) / (fadeOut.end - fadeOut.start)
      );

    const yOffset = 60 * (1 - opacity);
    const scale = gsap.utils.interpolate(0.92, 1, opacity);
    const glowIntensity = 0.3 + opacity * 0.7;

    gsap.to(textRef.current, {
      opacity: opacity,
      y: yOffset,
      scale: scale,
      filter: `brightness(${1 + glowIntensity})`,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (headerTimeline.current) headerTimeline.current.progress(headerProgress);
    if (paragraphTimeline.current)
      paragraphTimeline.current.progress(paragraphProgress);

    const pEl = textRef.current.querySelector("p");
    if (pEl) {
      gsap.to(pEl, {
        opacity: scrollProgress > paragraphFadeIn.start ? 1 : 0,
        duration: 0.3,
        overwrite: "auto",
      });
    }
  }, [scrollProgress]);

  return (
    <div
      ref={textRef}
      className="
        absolute top-[50%] left-[55%]
        -translate-x-1/2 -translate-y-1/2
        text-left pointer-events-none z-10
        will-change-transform
        w-full max-w-6xl px-6 md:px-8
        overflow-visible
        font-mono
      "
    >
      <h1 className="header-line text-5xl md:text-6xl lg:text-3xl font-bold text-black max-w-2xl mb-3 md:mb-4 mx-auto tracking-tight leading-tight break-words">
        Codename: NFT Staking Hybrid — Fusion of ERC721 and ERC20 Energy
      </h1>
      <h2 className="header-line text-3xl md:text-4xl lg:text-xl font-bold text-black max-w-2xl mb-3 md:mb-4 mx-auto tracking-tight leading-tight break-words">
        Architect: passedovtfvnk
      </h2>
      <h2 className="header-line text-2xl md:text-3xl lg:text-xl font-bold text-black max-w-2xl mb-6 md:mb-8 mx-auto tracking-tight leading-tight break-words">
        Cycle Duration: 42 nights
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-700 leading-tight max-w-5xl ml-[13rem] opacity-0 break-words">
        In the neon hum of the chain, the NFT Staking Hybrid awakens — a fusion
        of rarity and logic. Mint. Stake. Earn. Withdraw. NFTs rest within
        contracts, breathing ERC20 rewards.
        <br />
        <br />
        This six-week construct binds Solidity to React, where digital roots
        grow through on-chain soil and echoes of value ripple off-chain.
        <br />
        <br />
        Not just a project — a living protocol, a pulse between creation and
        computation.
      </p>
    </div>
  );
}