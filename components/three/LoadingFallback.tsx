"use client";

import { Html, useProgress } from "@react-three/drei";

export default function LoadingFallback() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue rounded-full animate-spin">
          Loading 3D Scene...{progress.toFixed(0)}
        </div>
      </div>
    </Html>
  );
}
