"use client";

import { motion } from "framer-motion";

export default function CollectionLoading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-green-600/30 rounded-full" />
          <div className="absolute inset-0 border-4 border-transparent border-t-green-600 rounded-full animate-spin" />
        </div>
        <p className="text-xl text-white font-mono">LOADING_COLLECTION...</p>
        <p className="text-sm text-green-600 font-mono mt-2">FETCHING_NFT_DATA</p>
      </motion.div>
    </div>
  );
}