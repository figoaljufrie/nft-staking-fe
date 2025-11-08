"use client";

export function Instructions() {
  return (
    <div className="fixed top-8 right-8 z-50 pointer-events-none max-w-xs">
      <div className="bg-black/60 backdrop-blur-xl p-4 rounded-lg border border-white/20">
        <h3 className="text-white text-sm font-bold mb-2">📸 Camera Journey</h3>
        <p className="text-gray-300 text-xs">
          Scroll to explore 10 different camera positions around the 3D scene.
          Objects stay still while the camera moves smoothly.
        </p>
      </div>
    </div>
  );
}