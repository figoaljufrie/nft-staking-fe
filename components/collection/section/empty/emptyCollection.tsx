"use client";

import Link from "next/link";
import GlassCard from "@/components/ui/glassCard";
import { motion } from "framer-motion";

export default function CollectionEmpty() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <GlassCard className="p-0 overflow-hidden max-w-2xl" delay={0.1}>
        <div className="bg-white p-4 border-b border-yellow-400/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
            <span className="font-mono text-yellow-600 font-bold text-sm tracking-wider">
              COLLECTION_EMPTY.sys
            </span>
          </div>
        </div>
        
        <div className="p-12 text-center">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="text-3xl font-bold text-white mb-3 font-mono">NO_NFTs_MINTED</h3>
          <p className="text-xl text-green-600 mb-8 font-mono">Be the first to mint from this collection!</p>
          
          <Link href="/mint">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gray-950 text-green-600 border-2 border-green-600 font-mono font-bold hover:bg-green-950 transition-all relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <span className="relative">MINT_FIRST_NFT</span>
            </motion.button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}