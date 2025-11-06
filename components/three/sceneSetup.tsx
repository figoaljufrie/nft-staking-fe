"use client";

import {
  Environment,
  PerspectiveCamera
} from "@react-three/drei";
import Model from "./models";
import ScrollAnimationController from "./scrollAnimateController";

interface SceneProps {
  scrollProgress: number;
}

export default function SceneSetup({ scrollProgress }: SceneProps) {
  return (
    <>
      {/*
      Camera position
      */}
      <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={75} />
      {/*Scroll logics controller */}
      <ScrollAnimationController scrollProgress={scrollProgress} />

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

      <Model scrollProgress={scrollProgress} />
    </>
  );
}

/*@note*/
//Positions are like x, y, x axis.
