"use client";

import Model from "../../three/models/models";
import { CameraSetup } from "./cameraSetup";
import { LightingSetup } from "./lightingSetup";
import { EnvironmentSetup } from "./environmentSetup";

interface SceneProps {
  scrollProgress: number;
}

export default function SceneSetup({ scrollProgress }: SceneProps) {
  return (
    <>
      {/* Static Camera */}
      <CameraSetup />

      {/* Basic Lighting */}
      <LightingSetup/>

      <EnvironmentSetup />

      {/* 3D Model - Only Cylinder.001 */}
      <Model scrollProgress={scrollProgress} />
    </>
  );
}