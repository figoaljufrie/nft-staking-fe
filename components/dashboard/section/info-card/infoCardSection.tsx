import GlassCard from "@/components/ui/glassCard";
import {motion} from "framer-motion"

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
        <div className="bg-gray-950 p-4 border-b border-fuchsia-400/30">
          <span className="font-mono text-fuchsia-400 text-sm tracking-wider">protocol_manual.txt</span>
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
                <span className="text-fuchsia-400 font-bold text-sm mt-1">$</span>
                <div>
                  <div className="text-gray-900 font-bold group-hover:text-fuchsia-600 transition-colors">
                    ./{step.cmd}
                  </div>
                  <div className="text-gray-500 text-sm group-hover:text-fuchsia-400 transition-colors">
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
        <div className="bg-gray-950 p-4 border-b border-emerald-400/30">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-400' : 'bg-gray-500'} animate-pulse`} />
            <span className="font-mono text-emerald-400 text-sm tracking-wider">
              {isConnected ? 'wallet_connected.sys' : 'wallet_disconnected.sys'}
            </span>
          </div>
        </div>
        
        <div className="p-8">
          <div className="space-y-5 font-mono">
            <InfoRow 
              label="ADDRESS" 
              value={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "NOT_CONNECTED"} 
              accent="cyan"
            />
            <InfoRow label="STATUS" value={isConnected ? "CONNECTED" : "DISCONNECTED"} accent="emerald" />
            <InfoRow label="NFT_COL" value={nftSymbol} accent="fuchsia" />
            <InfoRow label="REWARD_TKN" value={rewardSymbol} accent="orange" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function InfoRow({ label, value, accent }: { label: string; value: string; accent: 'cyan' | 'emerald' | 'fuchsia' | 'orange' }) {
  const accentMap = {
    cyan: 'border-cyan-400 text-cyan-600',
    emerald: 'border-emerald-400 text-emerald-600',
    fuchsia: 'border-fuchsia-400 text-fuchsia-600',
    orange: 'border-orange-400 text-orange-600'
  };
  
  return (
    <div className={`group flex items-center justify-between p-4 bg-gray-50 border-l-4 ${accentMap[accent]} hover:bg-gray-100 transition-all hover:translate-x-2 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]`}>
      <span className="text-xs text-gray-500 tracking-wider">{label}</span>
      <span className="text-sm font-bold text-gray-900 group-hover:text-current transition-colors">
        {value}
      </span>
    </div>
  );
}