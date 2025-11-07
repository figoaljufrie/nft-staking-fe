"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Create a ScrollTrigger that tracks the entire page scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return progress;
}