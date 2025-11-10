"use client";

import { PerspectiveCamera } from "@react-three/drei";

export function CameraSetup() {
  // Static camera - will stay in place
  return <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />;
}