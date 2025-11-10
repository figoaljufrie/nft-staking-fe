import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingParams {
  spinRef: React.RefObject<THREE.Group | null>;
  interactionRef: React.RefObject<THREE.Group | null>;
  isHovered: boolean;
  isDragging: boolean;
  scrollProgress: number;
  baseScale: number;
  minScaleFactor: number;
}

export function useFloatingAnimation({
  spinRef,
  interactionRef,
  isHovered,
  isDragging,
  scrollProgress,
  baseScale,
  minScaleFactor,
}: FloatingParams) {
  const prevPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const baseRotation = useRef({ x: 0, y: 0 });
  const dragInertia = useRef({ x: 0, y: 0 });
  const floatOffset = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const targetFloatOffset = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    const { pointer } = state;

    if (spinRef.current && !isDragging) {
      spinRef.current.rotation.z += 0.6 * delta;
    }

    velocity.current.x = (isHovered || isDragging) ? pointer.x - prevPointer.current.x : 0;
    velocity.current.y = (isHovered || isDragging) ? pointer.y - prevPointer.current.y : 0;
    prevPointer.current.x = pointer.x;
    prevPointer.current.y = pointer.y;

    // --- Floating offset ---
    if (interactionRef.current && isHovered && !isDragging) {
      timeRef.current += delta;
      targetFloatOffset.current.x = Math.sin(timeRef.current * 0.5) * 0.8 + velocity.current.x * 2;
      targetFloatOffset.current.y = Math.cos(timeRef.current * 0.7) * 0.6 - velocity.current.y * 2;
      targetFloatOffset.current.rotX = Math.sin(timeRef.current * 0.3) * 0.12;
      targetFloatOffset.current.rotY = Math.cos(timeRef.current * 0.4) * 0.12;
    } else {
      targetFloatOffset.current.x = 0;
      targetFloatOffset.current.y = 0;
      targetFloatOffset.current.rotX = 0;
      targetFloatOffset.current.rotY = 0;
    }

    if (interactionRef.current) {
      const smoothSpeed = 0.05;
      floatOffset.current.x = THREE.MathUtils.lerp(floatOffset.current.x, targetFloatOffset.current.x, smoothSpeed);
      floatOffset.current.y = THREE.MathUtils.lerp(floatOffset.current.y, targetFloatOffset.current.y, smoothSpeed);
      floatOffset.current.rotX = THREE.MathUtils.lerp(floatOffset.current.rotX, targetFloatOffset.current.rotX, smoothSpeed);
      floatOffset.current.rotY = THREE.MathUtils.lerp(floatOffset.current.rotY, targetFloatOffset.current.rotY, smoothSpeed);

      interactionRef.current.position.x = floatOffset.current.x;
      interactionRef.current.position.y = floatOffset.current.y;
    }

    // --- Drag rotation ---
    if (interactionRef.current && isDragging) {
      const rotationSpeed = 2.5;
      baseRotation.current.x += velocity.current.y * rotationSpeed;
      baseRotation.current.y += velocity.current.x * rotationSpeed;
      dragInertia.current.x = velocity.current.y * rotationSpeed * 0.8;
      dragInertia.current.y = velocity.current.x * rotationSpeed * 0.8;
    } else if (interactionRef.current) {
      baseRotation.current.x += dragInertia.current.x;
      baseRotation.current.y += dragInertia.current.y;
      dragInertia.current.x *= 0.92;
      dragInertia.current.y *= 0.92;
    }

    if (interactionRef.current) {
      interactionRef.current.rotation.x = THREE.MathUtils.lerp(
        interactionRef.current.rotation.x,
        baseRotation.current.x + floatOffset.current.rotX,
        0.2
      );
      interactionRef.current.rotation.y = THREE.MathUtils.lerp(
        interactionRef.current.rotation.y,
        baseRotation.current.y + floatOffset.current.rotY,
        0.2
      );
    }

    // --- Scale based on scroll ---
    if (interactionRef.current?.parent) {
      const start = 0;
      const end = 0.19;
      const clamped = THREE.MathUtils.clamp((scrollProgress - start) / (end - start), 0, 1);
      const scaleFactor = THREE.MathUtils.lerp(1, minScaleFactor, clamped);
      interactionRef.current.parent.scale.set(baseScale * scaleFactor, baseScale * scaleFactor, baseScale * scaleFactor);
    }
  });
}