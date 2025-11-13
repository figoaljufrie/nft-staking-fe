import { motion } from "framer-motion";

interface Card {
  id: number;
  title: string;
  code: string;
  image: string;
  rarity: string;
  stake: string;
}

interface Props {
  cards: Card[];
  cardsContainerRef: React.RefObject<HTMLDivElement | null>;
  currentCardIndex: number;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function CTACards({
  cards,
  cardsContainerRef,
  currentCardIndex,
  setSelectedCard,
}: Props) {
  return (
    <div
      ref={cardsContainerRef}
      className="cards-wrapper absolute inset-0 flex items-center justify-center"
      style={{ perspective: "2000px", zIndex: 10, paddingTop: "80px" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {cards.map((card, index) => {
          const offset = index - currentCardIndex;
          const isActive = index === currentCardIndex;

          return (
            <motion.div
              key={card.id}
              className="card-item absolute cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
                width: "350px",
                height: "490px",
                left: "50%",
                top: "50%",
                marginLeft: "-175px",
                marginTop: "-205px",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                x: `${offset * 150}px`,
                y: `${Math.abs(offset) * 40}px`,
                scale: isActive ? 1 : 0.75 - Math.abs(offset) * 0.08,
                rotateY: `${offset * 25}deg`,
                opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.2,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{
                duration: 1.2,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              onClick={() => isActive && setSelectedCard(card.id)}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl shadow-black/30">
                <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                {isActive && (
                  <div className="absolute inset-0 ring-4 ring-white/60 rounded-xl pointer-events-none" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}