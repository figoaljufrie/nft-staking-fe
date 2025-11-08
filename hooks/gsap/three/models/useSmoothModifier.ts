import * as THREE from "three";
import { useEffect } from "react";

export function useSmoothModifier(scene: THREE.Scene | THREE.Group) {
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // FIX: Smooth out pixelated planes
        if (
          child.name.toLowerCase().includes("plane") ||
          child.geometry.type === "PlaneGeometry"
        ) {
          console.log(`Smoothing plane: ${child.name}`);

          // Method 1: Increase segments (if PlaneGeometry)
          if (child.geometry instanceof THREE.PlaneGeometry) {
            const { width, height } = child.geometry.parameters;
            child.geometry = new THREE.PlaneGeometry(width, height, 64, 64);
          }

          // Method 2: Enable smooth shading
          child.geometry.computeVertexNormals();
          child.material.flatShading = false;
          child.material.needsUpdate = true;

          // Method 3: Optional subdivision (commented)
          // const modifier = new THREE.SubdivisionModifier(1);
          // modifier.modify(child.geometry);
        }

        // General smoothing for all meshes
        if (!child.geometry.attributes.normal) {
          child.geometry.computeVertexNormals();
        }

        // Global smooth shading
        if (child.material) {
          child.material.flatShading = false;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);
}
