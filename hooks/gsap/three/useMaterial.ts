import { useEffect } from "react";
import * as THREE from "three";

export function useApplyMaterials(scene: THREE.Scene | THREE.Group) {
  useEffect(() => {
    if (!scene) return;

    console.log("🎨 Applying materials to model...");

    // --- Material Library ---
    const materialLibrary = {
      default: new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.3,
        roughness: 0.7,
      }),
      metal: new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.9,
        roughness: 0.1,
        envMapIntensity: 1,
      }),
      plastic: new THREE.MeshStandardMaterial({
        color: 0x3366ff,
        metalness: 0,
        roughness: 0.5,
      }),
      glass: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.5,
      }),
      colorful: new THREE.MeshStandardMaterial({
        color: 0xff6b6b,
        metalness: 0.2,
        roughness: 0.6,
      }),
    };

    // --- Traverse and Apply ---
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const currentMaterial = child.material as THREE.MeshStandardMaterial;

        // Fix white or missing materials
        if (
          !currentMaterial ||
          !currentMaterial.color ||
          (currentMaterial.color.r === 1 &&
            currentMaterial.color.g === 1 &&
            currentMaterial.color.b === 1)
        ) {
          console.log(`🧩 Fixing white material on: ${child.name}`);

          if (child.name.toLowerCase().includes("metal")) {
            child.material = materialLibrary.metal.clone();
          } else if (child.name.toLowerCase().includes("glass")) {
            child.material = materialLibrary.glass.clone();
          } else if (child.name.toLowerCase().includes("plane")) {
            child.material = materialLibrary.plastic.clone();
          } else {
            const randomColor = new THREE.Color(
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.5 + 0.5,
              Math.random() * 0.5 + 0.5
            );
            child.material = new THREE.MeshStandardMaterial({
              color: randomColor,
              metalness: 0.3,
              roughness: 0.7,
            });
          }
        } else {
          // Optimize existing material
          currentMaterial.needsUpdate = true;
          if (currentMaterial instanceof THREE.MeshStandardMaterial) {
            currentMaterial.envMapIntensity = 1;
            if (currentMaterial.map) {
              currentMaterial.map.anisotropy = 16;
            }
          }
        }

        child.frustumCulled = true;
      }
    });

    console.log("✅ Materials applied!");
  }, [scene]);
}
