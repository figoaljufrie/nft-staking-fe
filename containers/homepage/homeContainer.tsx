"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { useScrollProgress } from "@/hooks/gsap/useScrollProgress";
import Header from "@/components/home/layout/header";
import Footer from "@/components/home/layout/footer";
import HeroSection from "@/components/home/sections/heroSection";
import SceneSection from "@/components/home/sections/sceneSection";
import ScrollRevealSection from "@/components/home/sections/ScrollRevealSection";
import FooterInfoSection from "@/components/home/sections/footerSection";
import { LenisInit, destroyLenis } from "@/lib/lenis/lenis";
import ContentOverlay from "@/components/home/overlay/contentOverlay";
gsap.registerPlugin(ScrollTrigger);

export default function HomeContainer() {
  const revealSection = useRef<HTMLDivElement | null>(null);
  const pinnedBox = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useScrollProgress("#scene-section");

  useEffect(() => {
    const lenis = LenisInit();
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      //revealing animations
      gsap.utils.toArray<HTMLElement>(".reveal-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 100, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.fromTo(
        pinnedBox.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: pinnedBox.current,
            start: "top-center",
            end: "+=400",
            scrub: true,
            pin: true,
            pinSpacing: true,
          },
        }
      );
    });
    return () => {
      ctx.revert();
      destroyLenis();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* LAYER 1: 3D Background (z-index: 0) */}
      <div className="fixed inset-0 z-0">
        <SceneSection scrollProgress={scrollProgress} />
      </div>

      {/* LAYER 2: Content on top (z-index: 10) */}
      <div className="relative z-10">
        <Header />

        <main className="w-full">
          {/* Spacer to allow scrolling through 3D */}
          <div className="h-[300vh]">
            <ContentOverlay scrollProgress={scrollProgress} />
          </div>

          {/* Other sections AFTER 3D */}
          <div className="bg-white dark:bg-zinc-900">
            <HeroSection />
            <ScrollRevealSection
              revealRef={revealSection}
              pinnedRef={pinnedBox}
            />
            <FooterInfoSection />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
