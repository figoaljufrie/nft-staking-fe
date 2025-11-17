"use client";

import GlassCard from "@/components/ui/glassCard";

interface CollectionPaginationProps {
  page: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function CollectionPagination({
  page,
  totalPages,
  startIndex,
  endIndex,
  total,
  onPrevious,
  onNext,
}: CollectionPaginationProps) {
  return (
    <GlassCard className="p-0 overflow-hidden" delay={0.3}>
      <div className="bg-white p-4 border-b border-cyan-400/30">
        <h2 className="font-mono text-green-600 font-bold text-sm tracking-wider">PAGINATION_CONTROL.exe</h2>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="font-mono text-sm text-white">
            SHOWING {startIndex}-{endIndex} OF {total} NFTs
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={onPrevious}
              disabled={page === 0}
              className="px-6 py-3 bg-gray-950 text-green-600 border-2 border-green-600 font-mono text-sm hover:bg-green-950 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-950"
            >
              &lt; PREVIOUS
            </button>
            
            <div className="flex items-center px-6 py-3 bg-gray-950 border-2 border-cyan-400">
              <span className="font-bold text-cyan-400 font-mono">{page + 1}</span>
              <span className="text-white mx-2 font-mono">/</span>
              <span className="text-white font-mono">{totalPages}</span>
            </div>
            
            <button
              onClick={onNext}
              disabled={page >= totalPages - 1}
              className="px-6 py-3 bg-gray-950 text-green-600 border-2 border-green-600 font-mono text-sm hover:bg-green-950 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-gray-950"
            >
              NEXT &gt;
            </button>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}