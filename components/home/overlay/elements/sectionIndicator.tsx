"use client";

interface SectionIndicatorProps {
  scrollProgress: number;
}

export function SectionIndicator({ scrollProgress }: SectionIndicatorProps) {
  return (
    <div className="fixed top-8 left-8 z-50 pointer-events-none">
      <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-lg border border-white/20">
        <p className="text-white text-sm font-mono">
          Section {Math.ceil(scrollProgress * 10) || 1}/10
        </p>
      </div>
    </div>
  );
}