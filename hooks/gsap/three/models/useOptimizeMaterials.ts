"use client";

import { useEffect } from "react";
import * as THREE from "three";

export function useOptimizeMaterials(scene: THREE.Scene | THREE.Group) {
  useEffect(() => {
    scene.traverse((child) => {
      //enable shadow
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        //optimize material
        if (child.material) {
          child.material.needsUpdate = true;

          //if material has texture, optimize it.

          if (child.material instanceof THREE.MeshStandardMaterial) {
            if (child.material.map) {
              child.material.map.anisotropy = 16; //better texture filtering.
            }
          }
        }
        // enablce furstum culling (skip off-screen render)
        child.frustumCulled = true;
      }
    });
  }, [scene]);
}
