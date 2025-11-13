import { motion } from "framer-motion";

interface Props {
  selectedCard: number;
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function CTACardModal({ selectedCard, setSelectedCard }: Props) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedCard(null)}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-white/50 rounded-3xl p-8 z-[101] shadow-2xl shadow-black/30"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="font-mono font-bold text-3xl text-white">Card Details</h2>
          <button
            onClick={() => setSelectedCard(null)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-center py-16">
          <p className="font-mono text-gray-400">
            Card information will be displayed here
          </p>
        </div>
      </motion.div>
    </>
  );
}