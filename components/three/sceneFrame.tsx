"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LoadingFallback from "./LoadingFallback";
import SceneSetup from "./setup/sceneSetup";

interface Props {
  scrollProgress: number;
}

export default function SceneFrame({ scrollProgress }: Props) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true, // No transparency needed
          powerPreference: "high-performance",
        }}
        dpr={[1.5, 2]}
        style={{ background: "#ffffff" }} // White background
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneSetup scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}