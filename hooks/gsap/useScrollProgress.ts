"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress(selector = "#r3f-root") {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const scrollTrig = ScrollTrigger.create({
      trigger: selector,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => self.progress,
    });
    return () => scrollTrig.kill();
  }, [selector]);
  return progress;
}
