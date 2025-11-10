"use client";

import { useModelRefs } from "@/hooks/three/models/useModelRefs";
import { usePointerInteraction } from "@/hooks/three/models/usePointerInteraction";
import { useFloatingAnimation } from "@/hooks/three/models/useFloatingAnimation";
import { useModelScroll } from "@/hooks/three/models/useModelScroll";

interface ModelProps {
  scrollProgress: number;
}

export default function Model({ scrollProgress }: ModelProps) {
  const { spinRef, modelGroupRef, interactionRef, cylinder001, boundingBox } = useModelRefs();

  const baseScale = 2.5;
  const minScaleFactor = 0.6;

  const {
    isHovered,
    isDragging,
    handlePointerDown,
    handlePointerUp,
    handlePointerEnter,
    handlePointerLeave,
  } = usePointerInteraction({ interactionRef });

  useFloatingAnimation({ spinRef, interactionRef, isHovered, isDragging, scrollProgress, baseScale, minScaleFactor });
  useModelScroll({ scrollProgress, modelGroupRef });

  if (!cylinder001 || !boundingBox) return null;

  return (
    <group
      ref={modelGroupRef}
      position={[0, 4, -12]}
      rotation={[5, Math.PI / -5, -2]}
      scale={[baseScale, baseScale, baseScale]}
    >
      <group ref={interactionRef}>
        <group ref={spinRef}>
          <mesh
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            visible={false}
          >
            <boxGeometry args={[boundingBox.x, boundingBox.y, boundingBox.z]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
          <primitive object={cylinder001} />
        </group>
      </group>
    </group>
  );
}