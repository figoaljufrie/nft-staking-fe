"use client";

import GlassCard from "@/components/ui/glassCard";

interface CollectionStatsProps {
  total: number;
  shown: number;
  currentPage: number;
}

export default function CollectionStats({ total, shown, currentPage }: CollectionStatsProps) {
  return (
    <GlassCard className="p-0 overflow-hidden mb-8" delay={0.1}>
      <div className="bg-white p-4 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
        </div>
        <span className="font-mono text-green-600 text-sm font-bold">collection_stats.exe</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-500 font-mono">LIVE</span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox label="TOTAL_MINTED" value={total.toString()} />
          <StatBox label="SHOWN_ON_PAGE" value={shown.toString()} />
          <StatBox label="CURRENT_PAGE" value={currentPage.toString()} />
        </div>
      </div>
    </GlassCard>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all text-center">
      <div className="font-mono font-bold text-xs text-green-600 mb-1 tracking-wider">{label}</div>
      <div className="font-mono text-3xl font-bold text-white hover:text-green-500 transition-colors">{value}</div>
    </div>
  );
}