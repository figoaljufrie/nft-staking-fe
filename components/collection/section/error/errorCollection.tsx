"use client";

import GlassCard from "@/components/ui/glassCard";

export default function CollectionError() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <GlassCard className="p-0 overflow-hidden max-w-md" delay={0.1}>
        <div className="bg-white p-4 border-b border-red-400/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
            <span className="font-mono text-red-600 font-bold text-sm tracking-wider">
              ERROR_DETECTED.sys
            </span>
          </div>
        </div>
        
        <div className="p-8 text-center">
          <svg className="w-20 h-20 mx-auto text-red-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-3 font-mono">COLLECTION_LOAD_FAILED</h2>
          <p className="text-green-600 font-mono">Failed to fetch NFT data. Please retry later.</p>
        </div>
      </GlassCard>
    </div>
  );
}