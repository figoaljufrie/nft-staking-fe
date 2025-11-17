'use client';

import GlassCard from "@/components/ui/glassCard";
import { motion } from "framer-motion";
import { isAddress } from "viem";

interface ApprovalSectionProps {
  approvalSpender: string;
  setApprovalSpender: (value: string) => void;
  approvalAmount: string;
  setApprovalAmount: (value: string) => void;
  isApproving: boolean;
  handleApprove: () => void;
  symbol: string | undefined;
}

export default function ApprovalSection({
  approvalSpender,
  setApprovalSpender,
  approvalAmount,
  setApprovalAmount,
  isApproving,
  handleApprove,
  symbol,
}: ApprovalSectionProps) {
  return (
    <GlassCard className="p-0 overflow-hidden" delay={0.3}>
      <div className="bg-white p-4 border-b border-green-600/30">
        <span className="font-mono text-green-600 font-bold text-sm tracking-wider">approve.exe</span>
      </div>
      
      <div className="p-6">
        <p className="text-green-600 mb-4 font-mono text-sm">ALLOW_SPENDER_TO_USE_TOKENS</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-600 mb-2 font-mono tracking-wider">
              SPENDER_ADDRESS
            </label>
            <input
              type="text"
              placeholder="0x..."
              value={approvalSpender}
              onChange={(e) => setApprovalSpender(e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-white focus:ring-2 focus:ring-green-600 focus:border-transparent font-mono text-green-600 placeholder-green-600/50"
            />
            {approvalSpender && !isAddress(approvalSpender) && (
              <p className="mt-2 text-sm text-rose-600 font-mono">INVALID_ADDRESS_FORMAT</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-green-600 mb-2 font-mono tracking-wider">
              APPROVAL_AMOUNT
            </label>
            <input
              type="number"
              placeholder="0.0"
              value={approvalAmount}
              onChange={(e) => setApprovalAmount(e.target.value)}
              className="w-full px-4 py-3 bg-gray-950 border border-white focus:ring-2 focus:ring-green-600 focus:border-transparent font-mono text-green-600 placeholder-green-600/50"
            />
            <p className="mt-2 text-sm text-green-600 font-mono">SPENDER_CAN_USE_THIS_AMOUNT</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleApprove}
            disabled={!approvalSpender || !approvalAmount || !isAddress(approvalSpender) || isApproving}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono tracking-wider flex items-center justify-center"
          >
            {isApproving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3"></div>
                APPROVING...
              </>
            ) : (
              'EXECUTE_APPROVAL'
            )}
          </motion.button>
        </div>
      </div>
    </GlassCard>
  );
}