'use client';

import GlassCard from "@/components/ui/glassCard";
import { motion } from "framer-motion";
import { isAddress, formatUnits } from "viem";

interface TransferSectionProps {
  transferTo: string;
  setTransferTo: (value: string) => void;
  transferAmount: string;
  setTransferAmount: (value: string) => void;
  isTransferring: boolean;
  handleTransfer: () => void;
  setMaxTransfer: () => void;
  balance: bigint | undefined;
  decimals: number | undefined;
  symbol: string | undefined;
}

export default function TransferSection({
  transferTo,
  setTransferTo,
  transferAmount,
  setTransferAmount,
  isTransferring,
  handleTransfer,
  setMaxTransfer,
  balance,
  decimals,
  symbol,
}: TransferSectionProps) {
  return (
    <GlassCard className="p-0 overflow-hidden" delay={0.2}>
      <div className="bg-white p-4 border-b border-white">
        <span className="font-mono text-green-600 font-bold text-sm tracking-wider">transfer.exe</span>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-600 mb-2 font-mono tracking-wider">
              RECIPIENT_ADDRESS
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-white focus:ring-2 focus:ring-green-600 focus:border-transparent font-mono text-green-600 placeholder-green-400/50"
            />
            {transferTo && !isAddress(transferTo) && (
              <p className="mt-2 text-sm text-rose-500 font-mono">INVALID_ADDRESS_FORMAT</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-green-600 mb-2 font-mono tracking-wider">
              AMOUNT
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="w-full px-4 py-3 bg-gray-950 border border-white focus:ring-2 focus:ring-green-600 focus:border-transparent font-mono text-green-600 placeholder-green-400/50"
              />
              <button
                onClick={setMaxTransfer}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 font-bold text-sm font-mono hover:text-green-500 transition-colors"
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
            onClick={handleTransfer}
            disabled={!transferTo || !transferAmount || !isAddress(transferTo) || isTransferring}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono tracking-wider flex items-center justify-center"
          >
            {isTransferring ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                TRANSFERRING...
              </>
            ) : (
              'EXECUTE_TRANSFER'
            )}
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );
}