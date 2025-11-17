'use client';

import GlassCard from "@/components/ui/glassCard";
import { motion } from "framer-motion";
import { formatUnits } from "viem";

interface TokenInfoCardProps {
  balance: bigint | undefined;
  decimals: number | undefined;
  symbol: string | undefined;
  tokenName: string | undefined;
  balanceLoading: boolean;
}

export default function TokenInfoCard({ 
  balance, 
  decimals, 
  symbol, 
  tokenName, 
  balanceLoading 
}: TokenInfoCardProps) {
  if (balanceLoading) {
    return (
      <GlassCard className="p-0 overflow-hidden mb-8">
        <div className="bg-white p-4 border-b border-cyan-400/30">
          <span className="font-mono text-green-600 font-bold text-sm tracking-wider">token_status.exe</span>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-0 overflow-hidden mb-8" delay={0.1}>
      <div className="bg-white p-4 border-b border-cyan-400/30">
        <span className="font-mono text-green-600 font-bold text-sm tracking-wider">token_status.exe</span>
      </div>
      
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-green-600 mb-2 font-mono tracking-wider">YOUR_BALANCE</div>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-6xl text-white font-mono"
            >
              {balance && decimals ? parseFloat(formatUnits(balance, decimals)).toFixed(4) : '0.0000'}
            </motion.div>
            <div className="text-xl text-green-600 font-mono tracking-wider">
              {symbol || 'TKN'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cyan-400/20">
          <InfoRow label="TOKEN" value={tokenName || 'N/A'} />
          <InfoRow label="SYMBOL" value={symbol || 'N/A'} />
          <InfoRow label="DECIMALS" value={decimals?.toString() || '0'} />
        </div>
      </div>
    </GlassCard>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative overflow-hidden p-4 bg-transparent hover:bg-gray-100 transition-all hover:translate-x-2">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41] to-[#008F11] opacity-0 group-hover:opacity-10 transition-opacity" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41] via-[#008F11] to-[#00FF41] opacity-15 group-hover:opacity-100 transition-opacity blur-sm animate-pulse" />
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs text-green-400 tracking-wider font-bold font-mono">{label}</span>
        <span className="text-sm font-bold text-white font-mono group-hover:text-green-500 transition-colors">
          {value}
        </span>
      </div>
    </div>
  );
}