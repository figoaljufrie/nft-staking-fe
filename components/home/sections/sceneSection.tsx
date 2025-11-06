"use client";

import SceneFrame from "@/components/three/sceneFrame";

interface SceneSectionProps {
  scrollProgress: number;
}

export default function SceneSection({ scrollProgress }: SceneSectionProps) {
  return (
    <section id="scene-section" className="bg-white">
      <SceneFrame scrollProgress={scrollProgress} />
    </section>
  );
}
