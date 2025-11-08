"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RefObject } from "react";

export function useFloatAnimation(
  groupRef: RefObject<THREE.Group | null>,
  scrollProgress: number
) {
  useFrame(() => {
    if (!groupRef.current) return;

    //Subtle rotation
    groupRef.current.rotation.y =
      Math.sin(scrollProgress * Math.PI * 0.5) * 0.1;

    const float = Math.sin(scrollProgress * Math.PI * 2) * 0.05;
    groupRef.current.position.y = float;
  });
}
