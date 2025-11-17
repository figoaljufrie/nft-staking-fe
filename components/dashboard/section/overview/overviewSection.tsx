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
    <GlassCard className="lg:col-span-2 p-0 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)]" delay={0.1}>
      {/* Header with terminal bar */}
      <div className="bg-white p-4 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
        </div>
        <span className="font-mono text-green-600 text-sm font-bold">platform_status.exe</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400 animate-pulse" />
          <span className="text-xs text-gray-500 font-mono">LIVE</span>
        </div>
      </div>
      
      <div className="p-8">
        <h2 className="sr-only">Platform Overview</h2>
        
        {/* NFT Collection */}
        <div className="mb-10 relative">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-green-600 font-mono">NFT_COLLECTION</h3>
            <p className="text-sm text-green-600 font-mono">{data.nft.name}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="SYMBOL" value={data.nft.symbol} />
            <StatBox label="MINTED" value={`${data.nft.minted}/${data.nft.maxSupply}`} />
            <StatBox label="MINT_PRICE" value={`${data.nft.mintPrice} ETH`} />
            <StatBox 
              label="PROGRESS" 
              value={`${((Number(data.nft.minted) / Number(data.nft.maxSupply)) * 100).toFixed(1)}%`} 
            />
          </div>
        </div>

        {/* Reward Token */}
        <div className="mb-10">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-green-600 font-mono">REWARD_TOKEN</h3>
            <p className="text-sm text-green-600 font-mono">{data.reward.name}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatBox label="SYMBOL" value={data.reward.symbol} />
            <StatBox label="TOTAL_SUPPLY" value={data.reward.totalSupply} />
            <StatBox label="MAX_SUPPLY" value={data.reward.maxSupply} />
          </div>
        </div>

        {/* Staking System */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-green-600 font-mono">STAKING_SYSTEM</h3>
            <p className="text-sm text-green-600 font-mono">v{data.staking.version}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <StatBox label="REWARD_RATE" value={`${data.staking.rewardRate}/day`} />
            <StatBox 
              label="TREASURY" 
              value={`${data.staking.treasuryBalance} ${data.staking.rewardSymbol}`} 
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 hover:translate-x-2 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
      <div className="font-mono font-bold text-xs text-green-600 mb-1 tracking-wider">{label}</div>
      <div className="font-mono text-lg font-bold text-white hover:text-green-500 transition-colors">{value}</div>
    </div>
  );
}