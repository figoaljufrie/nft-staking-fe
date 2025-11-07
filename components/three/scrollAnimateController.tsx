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
    let lookAt = new THREE.Vector3(0, 1, 0); // Default look at center object

    // ============================================
    // 10 CAMERA POSITIONS (Each ~10% of scroll)
    // ============================================

    // POSITION 1: Opening View (0-0.1)
    if (scrollProgress <= 0.1) {
      const t = scrollProgress / 0.1;
      target.set(0, 3, 8 - t * 1); // Start far, move slightly closer
    }
    // POSITION 2: Approach Center (0.1-0.2)
    else if (scrollProgress <= 0.2) {
      const t = (scrollProgress - 0.1) / 0.1;
      target.set(0, 2.5 - t * 0.5, 7 - t * 1.5);
    }
    // POSITION 3: Right Side View (0.2-0.3)
    else if (scrollProgress <= 0.3) {
      const t = (scrollProgress - 0.2) / 0.1;
      target.set(t * 4, 2, 5.5 - t * 1);
      lookAt.set(0, 1, 0);
    }
    // POSITION 4: Right Side Close (0.3-0.4)
    else if (scrollProgress <= 0.4) {
      const t = (scrollProgress - 0.3) / 0.1;
      target.set(4 - t * 0.5, 2 - t * 0.5, 4.5 - t * 0.5);
      lookAt.set(3, 1, 0); // Focus on right sphere
    }
    // POSITION 5: Top View (0.4-0.5)
    else if (scrollProgress <= 0.5) {
      const t = (scrollProgress - 0.4) / 0.1;
      target.set(3 - t * 3, 1.5 + t * 3, 4 - t * 2);
      lookAt.set(0, 0, 0); // Look down at scene
    }
    // POSITION 6: Bird's Eye (0.5-0.6)
    else if (scrollProgress <= 0.6) {
      const t = (scrollProgress - 0.5) / 0.1;
      target.set(0, 4.5 + t * 1, 2 - t * 1);
      lookAt.set(0, 0, 0);
    }
    // POSITION 7: Left Side Orbit (0.6-0.7)
    else if (scrollProgress <= 0.7) {
      const t = (scrollProgress - 0.6) / 0.1;
      const angle = Math.PI * 0.5 + t * Math.PI * 0.5; // Continue orbit
      const radius = 5;
      target.set(
        Math.sin(angle) * radius,
        4.5 - t * 1.5,
        Math.cos(angle) * radius
      );
      lookAt.set(-3, 1, 2); // Focus on left sphere
    }
    // POSITION 8: Back View (0.7-0.8)
    else if (scrollProgress <= 0.8) {
      const t = (scrollProgress - 0.7) / 0.1;
      target.set(-4 + t * 2, 3 - t * 1, -3 + t * 0.5);
      lookAt.set(0, 1, 0);
    }
    // POSITION 9: Low Angle Approach (0.8-0.9)
    else if (scrollProgress <= 0.9) {
      const t = (scrollProgress - 0.8) / 0.1;
      target.set(-2 + t * 2, 2 - t * 1.2, -2.5 + t * 4);
      lookAt.set(0, 1.5, 0);
    }
    // POSITION 10: Final Hero Shot (0.9-1.0)
    else {
      const t = (scrollProgress - 0.9) / 0.1;
      target.set(0, 0.8 + t * 0.2, 1.5 + t * 0.5);
      lookAt.set(0, 1, 0);
    }

    // Smooth camera movement with lerp (0.08 = smooth, 0.15 = faster)
    camera.position.lerp(target, 0.08);

    // Smooth look-at transition
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);
    currentLookAt.lerp(lookAt, 0.08);
    camera.lookAt(currentLookAt);
  });

  return null;
}