interface Props {
  currentCardIndex: number;
  totalCards: number;
}

export default function CTACardCounter({ currentCardIndex, totalCards }: Props) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[60] text-center pb-8">
      <div className="font-mono text-sm text-black/50 tracking-widest">
        {String(currentCardIndex + 1).padStart(2, "0")} /{" "}
        {String(totalCards).padStart(2, "0")}
      </div>
    </div>
  );
}