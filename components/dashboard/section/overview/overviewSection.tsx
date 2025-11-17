import GlassCard from "@/components/ui/glassCard";

interface OverviewData {
  nft: {
    name: string;
    symbol: string;
    minted: string;
    maxSupply: string;
    mintPrice: string;
  };
  reward: {
    name: string;
    symbol: string;
    totalSupply: string;
    maxSupply: string;
  };
  staking: {
    rewardRate: string;
    version: string;
    treasuryBalance: string;
    rewardSymbol: string;
  };
}

interface OverviewCardProps {
  data: OverviewData;
}

export default function OverviewCard({ data }: OverviewCardProps) {
  return (
    <GlassCard className="lg:col-span-2 p-0 overflow-hidden" delay={0.1}>
      {/* Header with terminal bar */}
      <div className="bg-gray-950 p-4 flex items-center gap-3 border-b border-cyan-400/30">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
        </div>
        <span className="font-mono text-cyan-400 text-sm">platform_status.exe</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 animate-pulse" />
          <span className="text-xs text-gray-500 font-mono">LIVE</span>
        </div>
      </div>
      
      <div className="p-8">
        <h2 className="sr-only">Platform Overview</h2>
        
        {/* NFT Collection */}
        <div className="mb-10 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-mono">NFT_COLLECTION</h3>
              <p className="text-sm text-gray-500 font-mono">{data.nft.name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pl-2 border-l-2 border-fuchsia-400/30 ml-2">
            <StatBox label="SYMBOL" value={data.nft.symbol} accent="fuchsia" />
            <StatBox label="MINTED" value={`${data.nft.minted}/${data.nft.maxSupply}`} accent="fuchsia" />
            <StatBox label="MINT_PRICE" value={`${data.nft.mintPrice} ETH`} accent="fuchsia" />
            <StatBox 
              label="PROGRESS" 
              value={`${((Number(data.nft.minted) / Number(data.nft.maxSupply)) * 100).toFixed(1)}%`} 
              accent="fuchsia"
            />
          </div>
        </div>

        {/* Reward Token */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-mono">REWARD_TOKEN</h3>
              <p className="text-sm text-gray-500 font-mono">{data.reward.name}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pl-2 border-l-2 border-emerald-400/30 ml-2">
            <StatBox label="SYMBOL" value={data.reward.symbol} accent="emerald" />
            <StatBox label="TOTAL_SUPPLY" value={data.reward.totalSupply} accent="emerald" />
            <StatBox label="MAX_SUPPLY" value={data.reward.maxSupply} accent="emerald" />
          </div>
        </div>

        {/* Staking System */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.3)]">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 font-mono">STAKING_SYSTEM</h3>
              <p className="text-sm text-gray-500 font-mono">v{data.staking.version}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pl-2 border-l-2 border-orange-400/30 ml-2">
            <StatBox label="REWARD_RATE" value={`${data.staking.rewardRate}/day`} accent="orange" />
            <StatBox 
              label="TREASURY" 
              value={`${data.staking.treasuryBalance} ${data.staking.rewardSymbol}`} 
              accent="orange"
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function StatBox({ label, value, accent }: { label: string; value: string; accent: 'fuchsia' | 'emerald' | 'orange' }) {
  const accentMap = {
    fuchsia: 'border-fuchsia-400 text-fuchsia-600',
    emerald: 'border-emerald-400 text-emerald-600',
    orange: 'border-orange-400 text-orange-600'
  };
  
  return (
    <div className={`p-4 bg-gray-50 border-l-4 ${accentMap[accent]} hover:bg-gray-100 transition-all hover:translate-x-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]`}>
      <div className="font-mono text-xs text-gray-500 mb-1 tracking-wider">{label}</div>
      <div className="font-mono text-lg font-bold text-gray-900 font-mono">{value}</div>
    </div>
  );
}