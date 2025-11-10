import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

export function useModelRefs() {
  const spinRef = useRef<THREE.Group>(null);
  const modelGroupRef = useRef<THREE.Group>(null);
  const interactionRef = useRef<THREE.Group>(null);

  const { nodes } = useGLTF("/blender/moistRetry2.gltf");

  const cylinder001 = useMemo(() => {
    const clone = nodes.Cylinder001?.clone();
    if (!clone) return null;

    const bbox = new THREE.Box3().setFromObject(clone);
    const center = new THREE.Vector3();
    bbox.getCenter(center);
    clone.position.sub(center);

    return clone;
  }, [nodes]);

  const boundingBox = useMemo(() => {
    if (!cylinder001) return null;
    const bbox = new THREE.Box3().setFromObject(cylinder001);
    const size = new THREE.Vector3();
    bbox.getSize(size);
    return size;
  }, [cylinder001]);

  return {
    spinRef,
    modelGroupRef,
    interactionRef,
    cylinder001,
    boundingBox,
  };
}

useGLTF.preload("/blender/moistRetry2.gltf");