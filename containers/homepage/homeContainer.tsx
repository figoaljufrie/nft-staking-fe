"use client";

import ContentOverlay from "@/components/home/overlay/contentOverlay";
import SceneSection from "@/components/home/overlay/sections/sceneSection";
import { useScrollProgress } from "@/hooks/gsap/useScrollProgress";
import { LenisInit, destroyLenis } from "@/lib/lenis/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { ProgressBar } from "@/components/home/overlay/elements/progressBar";
import { SectionIndicator } from "@/components/home/overlay/elements/sectionIndicator";
import { Instructions } from "@/components/home/overlay/elements/instructions";

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

  useEffect(() => {}, [scrollProgress]);

  return (
    <div className="relative w-full" style={{ background: "transparent" }}>
      {/* Scrollable Content - 1000vh for 10 sections */}
      <div className="relative">
        {/* LAYER 1: 3D Background */}
        <div className="fixed inset-0 z-0">
          <SceneSection scrollProgress={scrollProgress} />
        </div>

        {/* LAYER 2: Content Overlay */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          <ContentOverlay scrollProgress={scrollProgress} />
        </div>

        {/* SPACER */}
        <div style={{ height: "1000vh", position: "relative", zIndex: 1 }} />

        {/* UI Elements */}
        <ProgressBar scrollProgress={scrollProgress} />
        <SectionIndicator scrollProgress={scrollProgress} />
        <Instructions />
      </div>
    </div>
  );
}
