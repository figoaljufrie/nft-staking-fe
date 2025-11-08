"use client";

import { AnimatePresence } from "framer-motion";
import HeroSection from "./sections/heroSection";
import FeaturesSection from "./sections/featuresSection";
import RewardsSection from "./sections/RewardsSection";
import DetailsSection from "./sections/detailSection";
import PreviewSection from "./sections/previewSection";
import CTASection from "./sections/ctaSection";

interface Props {
  scrollProgress: number;
}

export default function ContentOverlay({ scrollProgress }: Props) {
  // Calculate which content section to show (updated for 10 sections)
  const getSection = () => {
    if (scrollProgress < 0.1) return "hero";
    if (scrollProgress < 0.3) return "features";
    if (scrollProgress < 0.5) return "rewards";
    if (scrollProgress < 0.7) return "details";
    if (scrollProgress < 0.9) return "preview";
    return "cta";
  };

  const activeSection = getSection();

  return (
    <div className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
        {activeSection === "hero" && <HeroSection />}
      </AnimatePresence>
      <AnimatePresence>
        {activeSection === "features" && <FeaturesSection />}
      </AnimatePresence>
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
}
