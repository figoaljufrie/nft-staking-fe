import GlassCard from "@/components/ui/glassCard";
import { motion } from "framer-motion"

interface InfoSectionProps {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  nftSymbol: string;
  rewardSymbol: string;
}

export default function InfoSection({
  address,
  isConnected,
  nftSymbol,
  rewardSymbol,
}: InfoSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* How It Works - Terminal Style */}
      <GlassCard className="p-0 overflow-hidden" delay={0.3}>
        <div className="bg-white p-4 border-b border-fuchsia-400/30">
          <span className="font-mono text-green-600 font-bold text-sm tracking-wider">protocol_manual.txt</span>
        </div>
        <div className="p-8 font-mono">
          <div className="space-y-6">
            {[
              { cmd: "mint", desc: "Acquire NFTs from collection" },
              { cmd: "stake", desc: "Lock NFTs in contract" },
              { cmd: "earn", desc: "Generate rewards automatically" },
              { cmd: "claim", desc: "Withdraw rewards anytime" },
              { cmd: "unstake", desc: "Release NFTs from contract" }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <div>
                  <div className="text-green-600 font-bold group-hover:text-green-600 transition-colors">
                    ./{step.cmd}
                  </div>
                  <div className="text-white text-sm group-hover:text-green-500 transition-colors">
                    {step.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Wallet Info - System Status */}
      <GlassCard className="p-0 overflow-hidden" delay={0.4}>
        <div className="bg-white p-4 border-b border-emerald-400/30">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-rose-600'} animate-pulse`} />
            <span className={`font-mono font-bold text-sm tracking-wider ${isConnected ? 'text-emerald-400' : 'text-rose-600'}`}>
              {isConnected ? 'wallet_connected.sys' : 'wallet_disconnected.sys'}
            </span>
          </div>
        </div>
        
        <div className="p-8">
          <div className="space-y-10 font-mono">
            <InfoRow 
              label="ADDRESS" 
              value={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "NOT_CONNECTED"} 
            />
            <InfoRow label="STATUS" value={isConnected ? "CONNECTED" : "DISCONNECTED"} />
            <InfoRow label="NFT_COL" value={nftSymbol} />
            <InfoRow label="REWARD_TKN" value={rewardSymbol} />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="group relative overflow-hidden p-4 bg-transparent hover:bg-gray-100 transition-all hover:translate-x-2 hover:shadow-[0_0_20px_rgba(0,255,65,0.3)]">
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41] to-[#008F11] opacity-0 group-hover:opacity-10 transition-opacity" />
      
      {/* Animated pulse border */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41] via-[#008F11] to-[#00FF41] opacity-15 group-hover:opacity-100 transition-opacity blur-sm animate-pulse" />
      
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-xs text-black tracking-wider font-bold">{label}</span>
        <span className="text-sm font-bold text-black font-mono">
          {value}
        </span>
      </div>
    </div>
  );
}