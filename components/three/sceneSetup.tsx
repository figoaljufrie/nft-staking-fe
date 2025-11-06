"use client";

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Model from "./models";

export default function SceneSetup() {
  return (
    <>
      {/*
      Camera position
      */}
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />

      {/*
      Lighting setup
      */}

      {/*
      ambient: soft light
      */}
      <ambientLight intensity={0.4} />

      {/*
      Directional:like sunlight, casts shadows
      */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/*
      Spotlight:focused beam in certain ways
      */}
      <spotLight
        position={[-10, 10, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
      {/*
      HDR Environment:(makes metals / glasss looks realistic)
      */}
      <Environment preset="sunset" />

      {/*grid helper:to help us see where the 'ground' is, remove later if not needed.*/}
      <gridHelper args={[20, 20]} />
      <Model />
      {/*Temporary control; remove when scroll implemented*/}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
      />
    </>
  );
}

/*@note*/
//Positions are like x, y, x axis.
