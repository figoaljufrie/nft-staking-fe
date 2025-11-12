"use client";

import { RefObject, useEffect } from "react";

export default function useWordSplit(
  contentRef: RefObject<HTMLDivElement | null>,
  wordsSetupRef: React.RefObject<boolean>
) {
  useEffect(() => {
    if (!contentRef.current || wordsSetupRef.current) return;

    const slides = contentRef.current.querySelectorAll(".slide-content");
    slides.forEach((slide) => {
      const title = slide.querySelector(".slide-title");
      if (!title) return;
      const titleWords = (title.textContent || "").split(/\s+/);
      title.innerHTML = titleWords
        .map((word) => `<span class="word inline-block mr-2">${word}</span>`)
        .join("");
    });

    wordsSetupRef.current = true;
  }, [contentRef, wordsSetupRef]);
}