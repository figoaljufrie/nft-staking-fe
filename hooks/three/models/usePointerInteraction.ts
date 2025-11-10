import { useState, useEffect } from "react";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
interface PointerParams {
  interactionRef: React.RefObject<THREE.Group | null>;
}

export function usePointerInteraction({ interactionRef }: PointerParams) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsDragging(true);
    if (interactionRef.current) {
      // rotation reset handled in floating animation
    }
    document.body.style.cursor = "grabbing";
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    document.body.style.cursor = isHovered ? "grab" : "auto";
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    if (!isDragging) document.body.style.cursor = "grab";
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
    document.body.style.cursor = "auto";
  };

  // Global pointer release
  useEffect(() => {
    const handleGlobalPointerUp = () => {
      if (isDragging) {
        setIsDragging(false);
        document.body.style.cursor = "auto";
      }
    };
    window.addEventListener("pointerup", handleGlobalPointerUp);
    return () => window.removeEventListener("pointerup", handleGlobalPointerUp);
  }, [isDragging]);

  return {
    isHovered,
    isDragging,
    handlePointerDown,
    handlePointerUp,
    handlePointerEnter,
    handlePointerLeave,
  };
}
