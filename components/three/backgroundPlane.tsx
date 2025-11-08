"use client";

import { useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export default function BackgroundPlane() {
  const { scene } = useThree();
  const { nodes } = useGLTF("/blender/moistRetry2.gltf");

  useEffect(() => {
    const planeMesh = nodes.Plane as THREE.Mesh;

    if (!planeMesh || !planeMesh.material) {
      console.warn("Plane mesh or material not found in GLTF");
      return;
    }

    let backgroundTexture: THREE.Texture | null = null;

    if (Array.isArray(planeMesh.material)) {
      const mat = planeMesh.material[0] as THREE.MeshStandardMaterial;
      backgroundTexture = mat.map ?? null;
    } else if (planeMesh.material instanceof THREE.MeshStandardMaterial) {
      backgroundTexture = planeMesh.material.map ?? null;
    }

    if (!backgroundTexture) {
      console.warn("⚠️ Plane material has no texture map, using color instead");
      const color = (planeMesh.material as THREE.MeshStandardMaterial).color;
      scene.background = new THREE.Color(color);
      return;
    }

    // ✅ Force pixel-art look
    backgroundTexture.magFilter = THREE.NearestFilter;
    backgroundTexture.minFilter = THREE.NearestFilter;
    backgroundTexture.generateMipmaps = false;

    // Make sure the color space and mapping are appropriate
    backgroundTexture.colorSpace = THREE.SRGBColorSpace;
    backgroundTexture.mapping = THREE.EquirectangularReflectionMapping;

    backgroundTexture.needsUpdate = true;

    // Apply as background
    scene.background = backgroundTexture;

    console.log("🌄 Pixel-art background applied successfully");

    return () => {
      scene.background = null;
    };
  }, [nodes, scene]);

  return null;
}