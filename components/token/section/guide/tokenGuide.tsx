'use client';

import GlassCard from "@/components/ui/glassCard";

export default function TokenGuideSection() {
  return (
    <GlassCard className="p-0 overflow-hidden mt-6" delay={0.6}>
      <div className="bg-white p-4 border-b border-cyan-400/30">
        <span className="font-mono text-green-600 font-bold text-sm tracking-wider">operation_guide.txt</span>
      </div>
      
      <div className="p-6">
        <div className="flex">
          <svg className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-gray-300 font-mono space-y-2">
            <p className="font-bold text-green-600 mb-3">TOKEN_OPERATIONS_GUIDE:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-green-600">▸</span>
                <span><span className="text-green-600 font-bold">TRANSFER:</span> SEND_TOKENS_TO_ANOTHER_ADDRESS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">▸</span>
                <span><span className="text-green-600 font-bold">APPROVE:</span> ALLOW_CONTRACTS_TO_SPEND_TOKENS</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">▸</span>
                <span><span className="text-green-600 font-bold">CHECK_ALLOWANCE:</span> VIEW_SPENDER_APPROVED_AMOUNT</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">▸</span>
                <span><span className="text-green-600 font-bold">BURN:</span> PERMANENTLY_DESTROY_TOKENS</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}