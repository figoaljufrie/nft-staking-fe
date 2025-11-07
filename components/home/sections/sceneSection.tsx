"use client";

import SceneFrame from "@/components/three/sceneFrame";

interface SceneSectionProps {
  scrollProgress: number;
}

export default function SceneSection({ scrollProgress }: SceneSectionProps) {
  return (
    <section
      id="scene-section"
      className="w-full h-screen bg-gradient-to-b from-black via-purple-900/20 to-black"
    >
      <SceneFrame scrollProgress={scrollProgress} />
    </section>
  );
}
