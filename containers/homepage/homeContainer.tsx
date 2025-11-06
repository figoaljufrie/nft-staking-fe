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
gsap.registerPlugin(ScrollTrigger);

export default function HomeContainer() {
  const revealSection = useRef<HTMLDivElement | null >(null);
  const pinnedBox = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useScrollProgress("#scene-section");

  useEffect(() => {
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
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header />
      <main className="w-full">
        <HeroSection />
        <SceneSection />
        <ScrollRevealSection revealRef={revealSection} pinnedRef={pinnedBox} />
        <FooterInfoSection />
      </main>
      <Footer />
    </div>
  );
}
