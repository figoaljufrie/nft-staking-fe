"use client";

import { motion } from "framer-motion";

interface ModalLayoutProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function ModalLayout({
  title,
  children,
  onClose,
}: ModalLayoutProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-gray-950 border-2 border-gray-800 shadow-[0_0_50px_rgba(0,255,65,0.2)] max-w-lg w-full relative"
      >
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-600" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-600" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-600" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-600" />

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            </div>
            <h2 className="text-lg font-bold text-green-600 font-mono">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-400 transition-colors"
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

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Scan line effect */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "linear-gradient(rgba(0,255,65,0) 50%, rgba(0,255,65,0.05) 50%)",
            backgroundSize: "100% 4px",
            animation: "scan 8s linear infinite",
          }}
        />

        <style jsx>{`
          @keyframes scan {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(10px);
            }
          }
        `}</style>
      </motion.div>
    </div>
  );
}