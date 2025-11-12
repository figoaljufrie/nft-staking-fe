"use client";

import gsap from "gsap";
import { useEffect } from "react";
import * as THREE from "three";

interface UseModelFadeProps {
  scrollProgress: number;
  modelGroupRef: React.RefObject<THREE.Group | null>;
  opacityRef: React.RefObject<{ value: number }>;
}

export function useModelFade({
  scrollProgress,
  modelGroupRef,
  opacityRef,
}: UseModelFadeProps) {
  useEffect(() => {
    if (!modelGroupRef.current) return;

    const firstFadeStart = 0.13;
    const firstFadeEnd = 0.15;
    const holdStart = 0.15;
    const holdEnd = 0.17;
    const secondFadeStart = 0.17;
    const secondFadeEnd = 0.19;

    let opacity = 1;

    if (scrollProgress < firstFadeStart) {
      opacity = 1;
    } else if (scrollProgress < firstFadeEnd) {
      // 1 → 0.5 fade
      opacity = gsap.utils.interpolate(
        1,
        0.5,
        (scrollProgress - firstFadeStart) / (firstFadeEnd - firstFadeStart)
      );
    } else if (scrollProgress >= holdStart && scrollProgress < holdEnd) {
      // Hold at 0.5
      opacity = 0.5;
    } else if (scrollProgress < secondFadeEnd) {
      // 0.5 → 0 fade
      opacity = gsap.utils.interpolate(
        0.5,
        0,
        (scrollProgress - secondFadeStart) / (secondFadeEnd - secondFadeStart)
      );
    } else {
      opacity = 0;
    }

    gsap.to(opacityRef.current, {
      value: opacity,
      duration: 0.4,
      ease: "power2.out",
      onUpdate: () => {
        if (modelGroupRef.current) {
          modelGroupRef.current.traverse((child: any) => {
            if (child.isMesh && child.material) {
              child.material.transparent = true;
              child.material.opacity = opacityRef.current.value;
            }
          });
        }
      },
    });
  }, [scrollProgress, modelGroupRef]);
}
