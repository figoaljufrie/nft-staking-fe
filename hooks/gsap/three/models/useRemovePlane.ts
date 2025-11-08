"use client";

import { useEffect } from "react";
import * as THREE from "three";

export function useRemovePlane(scene: THREE.Scene | THREE.Group, nodes: any, materials: any) {
  useEffect(() => {
    console.log("Scene: ", scene);
    console.log("Nodes: ", nodes);
    console.log("Materials: ", materials);

    const planeNode = scene.getObjectByName("Plane");
    if (planeNode) {
      planeNode.parent?.remove(planeNode);
      console.log(
        "Plane removed from main scene (rendered as background instead)"
      );
    } else {
      console.log("nodes plane not found in the scene.");
    }

    scene.traverse((child) => {
      if (child.type === "Mesh" || child.type === "Group") {
        console.log(`${child.name}: (${child.type})`);
      }
    });
  }, [scene, nodes, materials]);
}
