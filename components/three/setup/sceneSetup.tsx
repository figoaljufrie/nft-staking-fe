"use client";

import BackgroundPlane from "../backgroundPlane";
import ScrollAnimationController from "../scrollAnimateController";
import Model from "../../three/models/models";
import { CameraSetup } from "./cameraSetup";
import { EnvironmentSetup } from "./environmentSetup";
import { LightingSetup } from "./lightingSetup";

interface SceneProps {
  scrollProgress: number;
}

export default function SceneSetup({ scrollProgress }: SceneProps) {
  return (
    <>
      {/* Camera */}
      <CameraSetup />

      {/* Scroll Animation */}
      <ScrollAnimationController scrollProgress={scrollProgress} />

      {/* Background Plane */}
      <BackgroundPlane />

      {/* Lighting Setup */}
      <LightingSetup />

      {/* Environment */}
      <EnvironmentSetup />

      {/* 3D Model */}
      <Model scrollProgress={scrollProgress} />
    </>
  );
}
