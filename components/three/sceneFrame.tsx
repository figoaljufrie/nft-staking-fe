"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LoadingFallback from "./LoadingFallback";
import SceneSetup from "./sceneSetup";

interface Props {
  scrollProgress: number;
}

export default function SceneFrame({ scrollProgress }: Props) {
  return (
    <div id="r3f-root" className="w-full w-full h-[300vh]">
      <div className="sticky top-0 h-screen">
        <Canvas
          camera={{ position: [0, 2, 5], fov: 75 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          shadows
        >
          <Suspense fallback={<LoadingFallback />}>
            <SceneSetup scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
        3D scene Placeholder
      </div>
    </div>
  );
}

/**
note;
camera: initial camera position [x, y, z] axis & field of view (fov).

gl: WebGL renderer setting
  - anitalias: Smooths jagged edges(costs performance)

  - alpha: Transparent background(so you can see HTML behind)

  - powerPreference: Tells browser to use GPU

dpr: pixel density - [1,2] means max 2x retine (prevents 4k rendering on high-end displays)

shadows: enable shadow casting.

Suspense: Shows loading while models load.
 
  */
