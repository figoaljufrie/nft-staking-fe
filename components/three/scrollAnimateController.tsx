"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  scrollProgress: number;
}

export default function ScrollAnimationController({ scrollProgress }: Props) {
  const { camera } = useThree();

  //Define camera positioning for different section scrolled.
  useFrame(() => {
  let target = new THREE.Vector3();
  let lookAt = new THREE.Vector3(0, 1, 0);

  if (scrollProgress <= 0.33) {
    const t = scrollProgress / 0.33;
    target.set(0, 2 + t * 1, 5 - t * 1);
  } else if (scrollProgress <= 0.66) {
    const t = (scrollProgress - 0.33) / 0.33;
    target.set(t * 3, 3, 4 - t * 2);
  } else {
    const t = (scrollProgress - 0.66) / 0.34;
    target.set(3, 3 - t * 0.5, 2);
  }

  camera.position.lerp(target, 0.05);
  camera.lookAt(lookAt);
});

  return null;
}
