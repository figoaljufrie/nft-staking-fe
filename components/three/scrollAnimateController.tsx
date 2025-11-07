// components/three/scrollAnimateController.tsx - MORE POSITIONS
"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  scrollProgress: number;
}

export default function ScrollAnimationController({ scrollProgress }: Props) {
  const { camera } = useThree();

  useFrame(() => {
    let target = new THREE.Vector3();
    let lookAt = new THREE.Vector3(0, 1, 0);

    // Section 1: Hero (0-0.2)
    if (scrollProgress <= 0.2) {
      const t = scrollProgress / 0.2;
      target.set(0, 2 + t * 1, 5 - t * 0.5);
    }
    // Section 2: Approach (0.2-0.4)
    else if (scrollProgress <= 0.4) {
      const t = (scrollProgress - 0.2) / 0.2;
      target.set(t * 2, 2.5, 4.5 - t * 1);
    }
    // Section 3: Orbit Right (0.4-0.6)
    else if (scrollProgress <= 0.6) {
      const t = (scrollProgress - 0.4) / 0.2;
      const angle = t * Math.PI * 0.5; // Quarter circle
      const radius = 3.5;
      target.set(
        Math.sin(angle) * radius,
        2.5 + t * 0.5,
        Math.cos(angle) * radius
      );
    }
    // Section 4: Top View (0.6-0.75)
    else if (scrollProgress <= 0.75) {
      const t = (scrollProgress - 0.6) / 0.15;
      target.set(2, 3 + t * 2, 2);
      lookAt.set(0, 0, 0); // Look at center from above
    }
    // Section 5: Close-up (0.75-0.9)
    else if (scrollProgress <= 0.9) {
      const t = (scrollProgress - 0.75) / 0.15;
      target.set(1 + t * 0.5, 2, 2 - t * 0.5);
    }
    // Section 6: Final CTA (0.9-1.0)
    else {
      const t = (scrollProgress - 0.9) / 0.1;
      target.set(2, 2 - t * 0.3, 1.5);
    }

    // Smooth camera movement
    camera.position.lerp(target, 0.05);
    camera.lookAt(lookAt);
  });

  return null;
}