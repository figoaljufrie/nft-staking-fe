"use client";

interface ProgressBarProps {
  scrollProgress: number;
}

export function ProgressBar({ scrollProgress }: ProgressBarProps) {
  return (
    <div className="fixed bottom-8 left-8 z-50 pointer-events-none">
      <div className="flex items-center gap-3">
        <div className="w-2 h-32 bg-white/20 rounded-full overflow-hidden">
          <div
            className="w-full bg-gradient-to-t from-teal-700 to blue-300 transition-all duration-100"
            style={{ height: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="text-white text-sm font-mono">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </div>
  );
}
