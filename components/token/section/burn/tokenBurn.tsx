'use client';

import GlassCard from "@/components/ui/glassCard";
import { motion } from "framer-motion";
import { formatUnits } from "viem";

interface BurnSectionProps {
  burnAmount: string;
  setBurnAmount: (value: string) => void;
  isBurning: boolean;
  handleBurn: () => void;
  setMaxBurn: () => void;
  balance: bigint | undefined;
  decimals: number | undefined;
  symbol: string | undefined;
}

export default function BurnSection({
  burnAmount,
  setBurnAmount,
  isBurning,
  handleBurn,
  setMaxBurn,
  balance,
  decimals,
  symbol,
}: BurnSectionProps) {
  return (
    <GlassCard className="p-0 overflow-hidden mt-6" delay={0.5}>
      <div className="bg-white p-4 border-b border-rose-400/30">
        <span className="font-mono text-rose-600 font-bold text-sm tracking-wider">burn.exe</span>
      </div>
      
      <div className="p-6">
        <p className="text-green-600 mb-4 font-mono text-sm">PERMANENTLY_DESTROY_TOKENS</p>
        
        <div className="bg-rose-900/20 border border-rose-600/30 p-4 mb-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-rose-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-rose-400 font-mono">
              WARNING: BURNING_TOKENS_IS_PERMANENT_AND_CANNOT_BE_UNDONE
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-600 mb-2 font-mono tracking-wider">
              AMOUNT_TO_BURN
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-rose-600/30 focus:ring-2 focus:ring-rose-600 focus:border-transparent font-mono text-green-600 placeholder-green-400/50"
              />
              <button
                onClick={setMaxBurn}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rose-600 font-bold text-sm font-mono hover:text-rose-500 transition-colors"
              >
                MAX
              </button>
            </div>
            <p className="mt-2 text-sm text-green-600 font-mono">
              BALANCE: {balance && decimals ? formatUnits(balance, decimals) : '0'} {symbol || ''}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBurn}
            disabled={!burnAmount || isBurning}
            className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white font-bold py-3 px-6 hover:from-rose-700 hover:to-rose-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono tracking-wider flex items-center justify-center"
          >
            {isBurning ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                BURNING...
              </>
            ) : (
              'EXECUTE_BURN'
            )}
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );
}