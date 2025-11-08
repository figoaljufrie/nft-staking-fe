"use client";

import { PerspectiveCamera } from "@react-three/drei";

export function CameraSetup() {
  return <PerspectiveCamera makeDefault position={[0, 3, 8]} fov={75} />;
}
