"use client";

import { AnimatePresence } from "framer-motion";
import { HeroSection } from "./sections/hero/heroSection";
import HorizontalScrollSection from "./sections/horizontal-info/horizontalSection";
import RewardsSection from "./sections/RewardsSection";
import DetailsSection from "./sections/detailSection";
import PreviewSection from "./sections/previewSection";
import CTASection from "./sections/ctaSection";

interface Props {
  scrollProgress: number;
}

export default function ContentOverlay({ scrollProgress }: Props) {
  // Each section gets equal scroll space
  const sectionProgress = (start: number, end: number) => {
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  };

  // Define section ranges
  const heroRange = { start: 0, end: 0.2 };
  const featuresRange = { start: 0.2, end: 0.5 };
  const rewardsRange = { start: 0.5, end: 0.65 };
  const detailsRange = { start: 0.65, end: 0.8 };
  const previewRange = { start: 0.8, end: 0.9 };
  const ctaRange = { start: 0.9, end: 1.0 };

  // Calculate individual section progress (0-1 for each section)
  const heroProgress = sectionProgress(heroRange.start, heroRange.end);
  const featuresProgress = sectionProgress(featuresRange.start, featuresRange.end);

  // Determine active section
  const getSection = () => {
    if (scrollProgress < heroRange.end) return "hero";
    if (scrollProgress < featuresRange.end) return "features";
    if (scrollProgress < rewardsRange.end) return "rewards";
    if (scrollProgress < detailsRange.end) return "details";
    if (scrollProgress < previewRange.end) return "preview";
    return "cta";
  };

  const activeSection = getSection();

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Hero Section - gets its own 0-1 progress */}
      {scrollProgress < featuresRange.start && (
        <div className="fixed inset-0">
          <HeroSection scrollProgress={heroProgress} />
        </div>
      )}
      
      {/* Horizontal Section - gets its own 0-1 progress */}
      {scrollProgress >= heroRange.end && scrollProgress < rewardsRange.start && (
        <div 
          className="fixed inset-0"
          style={{ 
            pointerEvents: "auto",
            zIndex: 10
          }}
        >
          <HorizontalScrollSection sectionProgress={featuresProgress} />
        </div>
      )}
      
      {/* <AnimatePresence>
        {activeSection === "rewards" && <RewardsSection />}
      </AnimatePresence>
      <AnimatePresence>
        {activeSection === "details" && <DetailsSection />}
      </AnimatePresence>
      <AnimatePresence>
        {activeSection === "preview" && <PreviewSection />}
      </AnimatePresence>
      <AnimatePresence>
        {activeSection === "cta" && <CTASection />}
      </AnimatePresence> */}
    </div>
  );
}