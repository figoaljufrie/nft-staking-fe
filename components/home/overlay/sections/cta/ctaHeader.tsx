import React from "react";

interface Props {
  mainTitleRef: React.RefObject<HTMLHeadingElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLHeadingElement | null>;
}

export default function CTAHeader({ mainTitleRef, titleRef, subtitleRef }: Props) {
  return (
    <div className="absolute top-0 left-0 right-0 z-[60] text-center pt-8">
      <h1
        ref={mainTitleRef}
        className="main-title font-mono font-extrabold text-[5rem] md:text-[7rem] text-black leading-none tracking-tighter mb-1"
        style={{ willChange: "transform, opacity, filter" }}
      >
        Collect. Stake. Earn.
      </h1>

      <h2
        ref={titleRef}
        className="text-title font-mono font-extrabold text-3xl md:text-4xl text-black leading-none tracking-tighter mb-1"
        style={{ willChange: "transform, opacity, filter" }}
      >
        FIRST COLLECTION
      </h2>

      <h3
        ref={subtitleRef}
        className="text-subtitle font-mono font-extrabold text-lg md:text-xl text-black/70 leading-none tracking-tighter"
        style={{ willChange: "transform, opacity, filter" }}
      >
        [CODE: <span className="text-black">MOIST</span>]
      </h3>
    </div>
  );
}