"use client";

export function LightingSetup() {
  return (
    <>
      {/* Ambient light - subtle base illumination */}
      <ambientLight intensity={0.3} />

      {/* Directional light - main lighting source */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Spot light - side accent */}
      <spotLight
        position={[-10, 10, -5]}
        angle={0.3}
        penumbra={1}
        intensity={0.4}
        castShadow
      />
    </>
  );
}
