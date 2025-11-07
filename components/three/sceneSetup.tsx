"use client";

import { Environment, PerspectiveCamera } from "@react-three/drei";
import Model from "./models";
import ScrollAnimationController from "./scrollAnimateController";

interface SceneProps {
  scrollProgress: number;
}

export default function SceneSetup({ scrollProgress }: SceneProps) {
  return (
    <>
      {/* Camera - Initial position matches first scroll position */}
      <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={75} />

      {/* Scroll animation controller */}
      <ScrollAnimationController scrollProgress={scrollProgress} />

      {/* Lighting setup */}
      <ambientLight intensity={0.4} />

      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <spotLight
        position={[-10, 10, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      {/* HDR Environment */}
      <Environment preset="sunset" />

      {/* Your 3D Model */}
      <Model scrollProgress={scrollProgress} />
    </>
  );
}