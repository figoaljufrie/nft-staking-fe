"use client";

import CTASection from "./sections/cta/ctaSection";
import FloatingCardsSection from "./sections/floating/floatingCardSection";
import { HeroSection } from "./sections/hero/heroSection";
import HorizontalScrollSection from "./sections/horizontal-info/horizontalSection";

interface Props {
  scrollProgress: number;
}

export default function ContentOverlay({ scrollProgress }: Props) {
  const sectionProgress = (start: number, end: number) => {
    if (scrollProgress < start) return 0;
    if (scrollProgress > end) return 1;
    return (scrollProgress - start) / (end - start);
  };

  const heroRange = { start: 0, end: 0.2 };
  const featuresRange = { start: 0.2, end: 0.5 };
  const ctaRange = { start: 0.5, end: 0.65 };
  const floatingRange = { start: 0.65, end: 1.0 };

  const heroProgress = sectionProgress(heroRange.start, heroRange.end);
  const featuresProgress = sectionProgress(
    featuresRange.start,
    featuresRange.end
  );
  const floatingProgress = sectionProgress(
    floatingRange.start,
    floatingRange.end
  );

  const getSection = () => {
    if (scrollProgress < heroRange.end) return "hero";
    if (scrollProgress < featuresRange.end) return "features";
    if (scrollProgress < ctaRange.end) return "cta";
    return "floating";
  };

  const activeSection = getSection();

  return (
    <div className="fixed inset-0 pointer-events-none">
      {scrollProgress < featuresRange.start && (
        <div className="fixed inset-0">
          <HeroSection scrollProgress={heroProgress} />
        </div>
      )}

      {scrollProgress >= heroRange.end && scrollProgress < ctaRange.start && (
        <div
          className="fixed inset-0"
          style={{
            pointerEvents: "auto",
            zIndex: 10,
          }}
        >
          <HorizontalScrollSection sectionProgress={featuresProgress} />
        </div>
      )}

      {scrollProgress >= ctaRange.start &&
        scrollProgress < floatingRange.start && (
          <div
            className="fixed inset-0"
            style={{ pointerEvents: "auto", zIndex: 10 }}
          >
            <CTASection
              sectionProgress={sectionProgress(ctaRange.start, ctaRange.end)}
            />
          </div>
        )}

      {scrollProgress >= floatingRange.start && (
        <div
          className="fixed inset-0"
          style={{ pointerEvents: "auto", zIndex: 10 }}
        >
          <FloatingCardsSection scrollProgress={floatingProgress} />
        </div>
      )}
    </div>
  );
}
