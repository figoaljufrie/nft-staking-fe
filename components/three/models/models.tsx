"use client";

import { useFloatAnimation } from "@/hooks/gsap/three/models/useFloatAnimation";
import { useOptimizeMaterials } from "@/hooks/gsap/three/models/useOptimizeMaterials";
import { useRemovePlane } from "@/hooks/gsap/three/models/useRemovePlane";
import { useApplyMaterials } from "@/hooks/gsap/three/models/useMaterial";
import { useSmoothModifier } from "@/hooks/gsap/three/models/useSmoothModifier";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface ModelProps {
  scrollProgress?: number;
}

export default function Model({ scrollProgress = 0 }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, nodes, materials } = useGLTF("/blender/moistRetry2.gltf");

  useApplyMaterials(scene);
  useSmoothModifier(scene);

  useRemovePlane(scene, nodes, materials);
  useOptimizeMaterials(scene);
  useFloatAnimation(groupRef, scrollProgress)
  
  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/blender/moistRetry2.gltf");