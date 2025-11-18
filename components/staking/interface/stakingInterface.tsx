"use client";

import GlassCard from "@/components/ui/glassCard";
import StakingNFTCard from "../card/stakingCard";

interface StakingInterfaceProps {
  unstakedTokens: readonly bigint[];
  stakedTokenIds: readonly bigint[];
  selectedUnstaked: Set<bigint>;
  selectedStaked: Set<bigint>;
  isApproving: boolean;
  isStaking: boolean;
  isWithdrawing: boolean;
  isEmergencyUnstaking: boolean;
  onSelectUnstaked: (tokenId: bigint) => void;
  onSelectStaked: (tokenId: bigint) => void;
  onSelectAllUnstaked: () => void;
  onClearUnstaked: () => void;
  onSelectAllStaked: () => void;
  onClearStaked: () => void;
  onApproveAndStake: () => void;
  onWithdraw: () => void;
  onEmergencyUnstake: () => void;
}

export default function StakingInterface({
  unstakedTokens,
  stakedTokenIds,
  selectedUnstaked,
  selectedStaked,
  isApproving,
  isStaking,
  isWithdrawing,
  isEmergencyUnstaking,
  onSelectUnstaked,
  onSelectStaked,
  onSelectAllUnstaked,
  onClearUnstaked,
  onSelectAllStaked,
  onClearStaked,
  onApproveAndStake,
  onWithdraw,
  onEmergencyUnstake,
}: StakingInterfaceProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Unstaked NFTs */}
      <GlassCard className="p-0 overflow-hidden" delay={0.4}>
        <div className="bg-white p-4 border-b border-cyan-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
                UNSTAKED_NFTS.db
              </span>
            </div>
            <div className="px-3 py-1 bg-gray-950 border border-green-400/50 font-mono text-sm text-green-600">
              COUNT: {unstakedTokens.length}
            </div>
          </div>
        </div>

        <div className="p-6">
          {unstakedTokens.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4 max-h-[500px] overflow-y-auto">
                {unstakedTokens.map((tokenId, index) => (
                  <StakingNFTCard
                    key={tokenId.toString()}
                    tokenId={tokenId}
                    index={index}
                    isSelected={selectedUnstaked.has(tokenId)}
                    onSelect={() => onSelectUnstaked(tokenId)}
                    isStaked={false}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={onSelectAllUnstaked}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 text-gray-400 font-mono text-xs hover:bg-gray-800 transition-colors"
                >
                  ./select_all
                </button>
                <button
                  onClick={onClearUnstaked}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 text-gray-400 font-mono text-xs hover:bg-gray-800 transition-colors"
                >
                  ./clear
                </button>
              </div>

              <button
                onClick={onApproveAndStake}
                disabled={selectedUnstaked.size === 0 || isApproving || isStaking}
                className="w-full px-6 py-3 bg-gray-950 border-2 border-cyan-400 text-cyan-400 font-mono hover:bg-cyan-400 hover:text-black transition-all disabled:opacity-50 disabled:border-gray-700 disabled:text-gray-600"
              >
                {isApproving
                  ? "APPROVING..."
                  : isStaking
                  ? "STAKING..."
                  : `./stake [${selectedUnstaked.size}]`}
              </button>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-gray-950 border-2 border-gray-800 rounded-lg mb-6">
                <svg
                  className="w-16 h-16 text-gray-600 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <p className="text-gray-400 font-mono text-sm">
                NO_UNSTAKED_NFTS
              </p>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Staked NFTs */}
      <GlassCard className="p-0 overflow-hidden" delay={0.5}>
        <div className="bg-white p-4 border-b border-green-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-green-600 font-bold text-sm tracking-wider">
                STAKED_NFTS.db
              </span>
            </div>
            <div className="px-3 py-1 bg-gray-950 border border-green-400/50 font-mono text-sm text-green-400">
              COUNT: {stakedTokenIds.length}
            </div>
          </div>
        </div>

        <div className="p-6">
          {stakedTokenIds && stakedTokenIds.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4 max-h-[500px] overflow-y-auto">
                {stakedTokenIds.map((tokenId, index) => (
                  <StakingNFTCard
                    key={tokenId.toString()}
                    tokenId={tokenId}
                    index={index}
                    isSelected={selectedStaked.has(tokenId)}
                    onSelect={() => onSelectStaked(tokenId)}
                    isStaked={true}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={onSelectAllStaked}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 text-gray-400 font-mono text-xs hover:bg-gray-800 transition-colors"
                >
                  ./select_all
                </button>
                <button
                  onClick={onClearStaked}
                  className="px-4 py-2 bg-gray-900 border border-gray-700 text-gray-400 font-mono text-xs hover:bg-gray-800 transition-colors"
                >
                  ./clear
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={onWithdraw}
                  disabled={selectedStaked.size === 0 || isWithdrawing}
                  className="col-span-2 px-6 py-3 bg-gray-950 border-2 border-emerald-400 text-emerald-400 font-mono hover:bg-emerald-400 hover:text-black transition-all disabled:opacity-50 disabled:border-gray-700 disabled:text-gray-600"
                >
                  {isWithdrawing
                    ? "WITHDRAWING..."
                    : `./withdraw [${selectedStaked.size}]`}
                </button>
                <button
                  onClick={onEmergencyUnstake}
                  disabled={selectedStaked.size === 0 || isEmergencyUnstaking}
                  className="px-4 py-3 bg-gray-950 border-2 border-red-400 text-red-400 font-mono text-xs hover:bg-red-400 hover:text-black transition-all disabled:opacity-50"
                  title="Emergency unstake (forfeit rewards)"
                >
                  ./emergency
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-6 bg-gray-950 border-2 border-gray-800 rounded-lg mb-6">
                <svg
                  className="w-16 h-16 text-gray-600 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <p className="text-gray-400 font-mono text-sm mb-2">
                NO_STAKED_NFTS
              </p>
              <p className="text-xs text-gray-500 font-mono">
                stake_nfts --start_earning
              </p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
}