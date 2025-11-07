"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useScrollProgress } from "@/hooks/gsap/useScrollProgress";
import Header from "@/components/home/layout/header";
import Footer from "@/components/home/layout/footer";
import SceneSection from "@/components/home/sections/sceneSection";
import ContentOverlay from "@/components/home/overlay/contentOverlay";
import { LenisInit, destroyLenis } from "@/lib/lenis/lenis";

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

  useEffect(() => {
    console.log("Scroll Progress:", scrollProgress);
  }, [scrollProgress]);

  return (
    <div className="relative w-full bg-black">
      {/* Scrollable Content - 1000vh for 10 sections */}
      <div className="relative">
        {/* LAYER 1: 3D Background (Fixed Position) */}
        <div className="fixed inset-0 z-0">
          <SceneSection scrollProgress={scrollProgress} />
        </div>

        {/* LAYER 2: Content Overlay (Fixed Position) */}
        <div className="fixed inset-0 z-10 pointer-events-none">
          <ContentOverlay scrollProgress={scrollProgress} />
        </div>

        {/* SPACER: Creates scroll distance - 1000vh = 10 sections */}
        <div style={{ height: "1000vh", position: "relative", zIndex: 1 }} />

        {/* Progress Indicator */}
        <div className="fixed bottom-8 left-8 z-50 pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="w-2 h-32 bg-white/20 rounded-full overflow-hidden">
              <div
                className="w-full bg-gradient-to-t from-green-400 to-blue-500 transition-all duration-300"
                style={{ height: `${scrollProgress * 100}%` }}
              />
            </div>
            <span className="text-white text-sm font-mono">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Section Indicator */}
        <div className="fixed top-8 left-8 z-50 pointer-events-none">
          <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20">
            <p className="text-white text-sm font-mono">
              Section {Math.ceil(scrollProgress * 10) || 1}/10
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="fixed top-8 right-8 z-50 pointer-events-none max-w-xs">
          <div className="bg-black/60 backdrop-blur-xl p-4 rounded-lg border border-white/20">
            <h3 className="text-white text-sm font-bold mb-2">
              📸 Camera Journey
            </h3>
            <p className="text-gray-300 text-xs">
              Scroll to explore 10 different camera positions around the 3D
              scene. Objects stay still while the camera moves smoothly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}