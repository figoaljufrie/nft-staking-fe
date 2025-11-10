import { useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";

interface ScrollParams {
  modelGroupRef: React.RefObject<THREE.Group | null>;
  scrollProgress: number;
}

export function useModelScroll({ modelGroupRef, scrollProgress }: ScrollParams) {
  useEffect(() => {
    if (!modelGroupRef.current) return;

    const start = 0;
    const end = 0.19;
    const clamped = THREE.MathUtils.clamp((scrollProgress - start) / (end - start), 0, 1);

    const targetX = THREE.MathUtils.lerp(0, -18, clamped);
    const targetY = 4;
    const targetZ = -15;

    gsap.to(modelGroupRef.current.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 0.5,
      ease: "power3.out",
      overwrite: true,
    });
  }, [scrollProgress, modelGroupRef]);
}