"use client";

import Header from "@/components/home/layout/header";
import { ProgressBar } from "@/components/home/overlay/elements/progressBar";
import { SectionIndicator } from "@/components/home/overlay/elements/sectionIndicator";
import SceneSection from "@/components/home/overlay/sections/sceneSection";
import { useScrollProgress } from "@/hooks/gsap/useScrollProgress";
import { LenisInit, destroyLenis } from "@/lib/lenis/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import ContentOverlay from "@/components/home/overlay/contentOverlay";

gsap.registerPlugin(ScrollTrigger);

export default function HomeContainer() {
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = LenisInit();

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      destroyLenis();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full bg-white">
      {/* Scrollable Content */}
      <div className="relative">
        {/* LAYER 1: 3D Background - White */}
        <div className="fixed inset-0 z-0 bg-white">
          <Header />
          <SceneSection scrollProgress={scrollProgress} />
        </div>

        {/* LAYER 2: Content Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none">
          <ContentOverlay scrollProgress={scrollProgress} />
        </div>

        {/* SPACER - FIXED: Added pointer-events-none to allow clicks through */}
        <div 
          style={{ 
            height: "2000vh", 
            position: "relative", 
            zIndex: 1,
            pointerEvents: "none" 
          }} 
        />

        {/* UI Elements */}
        <ProgressBar scrollProgress={scrollProgress} />
        <SectionIndicator scrollProgress={scrollProgress} />
      </div>
    </div>
  );
}