"use client";

import { Environment } from "@react-three/drei";

export function EnvironmentSetup() {
  return (
    <Environment
      preset="sunset"
      background={false}
      environmentIntensity={0.5}
    />
  );
}
