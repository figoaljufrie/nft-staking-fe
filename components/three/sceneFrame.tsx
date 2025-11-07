"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import LoadingFallback from "./LoadingFallback";
import SceneSetup from "./sceneSetup";
import * as THREE from "three";

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
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1,
          }}
          dpr={[1.5, 2]}
          shadows
        >
          <Suspense fallback={<LoadingFallback />}>
            <SceneSetup scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
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
