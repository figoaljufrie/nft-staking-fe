"use client";
import { RefObject } from "react";

interface Props {
  revealRef: RefObject<HTMLDivElement | null>;
  pinnedRef: RefObject<HTMLDivElement | null>;
}

export default function ScrollRevealSection({ revealRef, pinnedRef }: Props) {
  return (
    <section
      ref={revealRef}
      className="max-w-6xl mx-auto px-6 py-24 space-y-20"
    >
      <div className="reveal-item bg-gradient-to-r from-stone-500 to-zinc-100 text-black p-16 rounded-2xl shadow-xl text-center text-2xl font-semibold">
        Step 1 - Learn. Build. Grow.
      </div>
      <div className="reveal-item bg-gradient-to-r from-stone-500 to-zinc-100 text-black p-16 rounded-2xl shadow-xl text-center text-2xl font-semibold">
        Step 2 - Experiment with purpose.
      </div>
      <div
        ref={pinnedRef}
        className="reveal-item bg-gradient-to-r from-stone-500 to-zinc-100 text-black p-16 rounded-2xl shadow-xl text-center text-2xl font-semibold"
      >
        Step 3- Reached the pinned section!
      </div>
    </section>
  );
}
