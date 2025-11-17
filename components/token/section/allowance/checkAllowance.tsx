'use client';

import GlassCard from "@/components/ui/glassCard";
import { formatUnits, isAddress } from 'viem';
import {motion} from "framer-motion"

interface CheckAllowanceSectionProps {
  checkSpender: string;
  setCheckSpender: (value: string) => void;
  allowanceData: bigint | undefined;
  decimals: number | undefined;
  symbol: string | undefined;
  address: `0x${string}` | undefined;
}

export default function CheckAllowanceSection({
  checkSpender,
  setCheckSpender,
  allowanceData,
  decimals,
  symbol,
  address,
}: CheckAllowanceSectionProps) {
  return (
    <GlassCard className="p-0 overflow-hidden mt-6" delay={0.4}>
      <div className="bg-white p-4 border-b">
        <span className="font-mono text-green-600 font-bold text-sm tracking-wider">check_allowance.exe</span>
      </div>
      
      <div className="p-6">
        <p className="text-green-400 mb-4 font-mono text-sm">VIEW_SPENDER_ALLOWANCE</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-400 mb-2 font-mono tracking-wider">
              SPENDER_ADDRESS
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={checkSpender}
              onChange={(e) => setCheckSpender(e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-green-400/30 focus:ring-2 focus:ring-green-600 focus:border-transparent font-mono text-green-600 placeholder-green-400/50"
            />
            {checkSpender && !isAddress(checkSpender) && (
              <p className="mt-2 text-sm text-rose-600 font-mono">INVALID_ADDRESS_FORMAT</p>
            )}
          </div>

          {allowanceData !== undefined && decimals && isAddress(checkSpender) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-green-600/10 to-green-700/10 rounded-lg p-6 border border-green-600/20"
            >
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-mono tracking-wider">ALLOWANCE:</span>
                <span className="text-2xl font-bold text-green-600 font-mono">
                  {formatUnits(allowanceData, decimals)} {symbol}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}