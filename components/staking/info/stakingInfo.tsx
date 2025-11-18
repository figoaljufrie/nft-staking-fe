"use client";

import GlassCard from "@/components/ui/glassCard";

export default function StakingInfo() {
  return (
    <GlassCard className="p-0 overflow-hidden" delay={0.6}>
      <div className="bg-white p-4 border-b border-yellow-400/30">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
            PROTOCOL_GUIDE.txt
          </span>
        </div>
      </div>

      <div className="p-8">
        <div className="space-y-6 font-mono">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white mb-2">
              STAKING_OPERATIONS:
            </h3>
            <p className="text-xs text-gray-400">
              Execute the following commands to interact with the protocol
            </p>
          </div>

          <div className="space-y-4">
            <InfoCommand
              command="./select_nfts"
              description="Choose NFTs from your unstaked collection"
            />
            <InfoCommand
              command="./approve_contract"
              description="Grant staking contract permission to lock NFTs"
            />
            <InfoCommand
              command="./stake"
              description="Lock NFTs in contract to begin earning rewards"
            />
            <InfoCommand
              command="./claim"
              description="Withdraw accumulated rewards without unstaking"
            />
            <InfoCommand
              command="./withdraw"
              description="Unlock NFTs and auto-claim pending rewards"
            />
            <InfoCommand
              command="./emergency"
              description="Force unlock NFTs (forfeits all pending rewards)"
              isWarning
            />
          </div>

          <div className="mt-8 p-4 bg-yellow-950/30 border border-yellow-600/30">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-yellow-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="text-sm text-yellow-400 font-bold mb-1">
                  ! SYSTEM_WARNING
                </p>
                <p className="text-xs text-yellow-500">
                  Emergency unstake bypasses normal protocol flow and results in
                  permanent loss of unclaimed rewards. Use only in critical
                  situations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function InfoCommand({
  command,
  description,
  isWarning = false,
}: {
  command: string;
  description: string;
  isWarning?: boolean;
}) {
  return (
    <div
      className={`p-4 bg-gray-950/50 border transition-all hover:translate-x-2 ${
        isWarning
          ? "border-red-600/30 hover:border-red-600/60 hover:bg-red-950/20"
          : "border-gray-800 hover:border-green-600/60 hover:bg-gray-900"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`text-sm font-bold font-mono ${
            isWarning ? "text-red-400" : "text-green-600"
          }`}
        >
          {command}
        </span>
        <span className="text-xs text-gray-400 font-mono flex-1">
          {description}
        </span>
      </div>
    </div>
  );
}