"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ModelProps {
  scrollProgress?: number;
}

export default function Model({ scrollProgress = 0 }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  const { scene, nodes, materials } = useGLTF("/blender/moistRetry2.gltf");

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

  useFrame(() => {
    if (!groupRef.current) return;

    //Rotate model as user scrolls:
    groupRef.current.rotation.y = scrollProgress * Math.PI * 2;

    if (scrollProgress > 0.33 && scrollProgress < 0.66) {
      const t = (scrollProgress - 0.33) / 0.33;
      const scale = 1 + t * 0.3; // Scale from 1 to 1.3
      groupRef.current.scale.setScalar(scale);
    } else {
      groupRef.current.scale.setScalar(1);
    }

    // Subtle bounce animation
    const bounce = Math.sin(scrollProgress * Math.PI * 4) * 0.05;
    groupRef.current.position.y = bounce;
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
