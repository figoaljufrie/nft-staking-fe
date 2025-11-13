import { useEffect, useRef, useState } from "react";

interface CardPosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vr: number;
}

export default function useFloatingCardsAnimation(cards: any[]) {
  const [cardPositions, setCardPositions] = useState<CardPosition[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize positions
  useEffect(() => {
    const initialPositions = cards.map(() => ({
      x: Math.random() * (window.innerWidth - 350),
      y: Math.random() * (window.innerHeight - 490),
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 0.5,
    }));
    setCardPositions(initialPositions);
  }, []);

  // Animation loop
  useEffect(() => {
    if (cardPositions.length === 0) return;

    let isActive = true;

    const animate = () => {
      if (!isActive) return;

      setCardPositions((prevPositions) =>
        prevPositions.map((pos) => {
          let newX = pos.x + pos.vx;
          let newY = pos.y + pos.vy;
          let newVx = pos.vx;
          let newVy = pos.vy;
          let newRotation = pos.rotation + pos.vr;

          const cardWidth = 350;
          const cardHeight = 490;

          if (newX <= 0 || newX >= window.innerWidth - cardWidth) {
            newVx = -newVx;
            newX = Math.max(0, Math.min(window.innerWidth - cardWidth, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight - cardHeight) {
            newVy = -newVy;
            newY = Math.max(
              0,
              Math.min(window.innerHeight - cardHeight, newY)
            );
          }

          return {
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: newRotation % 360,
            vr: pos.vr,
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      isActive = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [cardPositions.length]);

  return { cardPositions };
}