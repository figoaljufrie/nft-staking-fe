"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useApplyMaterials } from "@/hooks/gsap/three/useMaterial";
import { useSmoothModifier } from "@/hooks/gsap/three/useSmoothModifier";

interface ModelProps {
  scrollProgress?: number;
}

export default function Model({ scrollProgress = 0 }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, nodes, materials } = useGLTF("/blender/moistRetry2.gltf");

  useApplyMaterials(scene);
  useSmoothModifier(scene);

  useEffect(() => {
    console.log("Model loaded!");
    console.log("Scene: ", scene);
    console.log("Nodes: ", nodes);
    console.log("Materials: ", materials);
    scene.traverse((child) => {
      if (child.type === "Mesh" || child.type === "Group") {
        console.log(`${child.name}: (${child.type})`);
      }
    });
  }, [scene, nodes, materials]);

  //Optimize material for performance.
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        //enable shadow to appear:
        child.castShadow = true;
        child.receiveShadow = true;

        //optimze material
        if (child.material) {
          child.material.needsUpdate = true;

          //if material has texture, optimize.
          if (child.material instanceof THREE.MeshStandardMaterial) {
            if (child.material.map) {
              child.material.map.anisotropy = 16; //Better texture filtering
            }
          }
        }

        //enable frustum culling (not rendering off-screen);
        child.frustumCulled = true;
      }
    });
  }, [scene]);

  // components/three/models.tsx - More animations
useFrame(() => {
  if (!groupRef.current) return;

  // Continuous rotation (slower)
  groupRef.current.rotation.y = scrollProgress * Math.PI * 4; // 2 full rotations

  // Scale changes at different points
  let scale = 1;
  if (scrollProgress < 0.3) {
    // Grow in beginning
    scale = 1 + scrollProgress * 0.3;
  } else if (scrollProgress > 0.3 && scrollProgress < 0.6) {
    // Scale up in middle
    const t = (scrollProgress - 0.3) / 0.3;
    scale = 1.3 + t * 0.2;
  } else if (scrollProgress > 0.6 && scrollProgress < 0.8) {
    // Scale down
    const t = (scrollProgress - 0.6) / 0.2;
    scale = 1.5 - t * 0.3;
  } else {
    // Final size
    scale = 1.2;
  }
  groupRef.current.scale.setScalar(scale);

  // Floating animation (continuous)
  const float = Math.sin(scrollProgress * Math.PI * 6) * 0.1;
  groupRef.current.position.y = float;

  // Tilt effect in middle section
  if (scrollProgress > 0.4 && scrollProgress < 0.7) {
    const t = (scrollProgress - 0.4) / 0.3;
    groupRef.current.rotation.x = Math.sin(t * Math.PI) * 0.3;
  } else {
    groupRef.current.rotation.x = 0;
  }
});

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
