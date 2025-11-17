import { motion } from "framer-motion"
import Link from "next/link";
import GlassCard from "@/components/ui/glassCard";

export default function QuickActionsCard() {
  const actions = [
    {
      title: "EXILE",
      description: "Return to command center",
      href: "/",
    },
    {
      title: "MINT_NFT",
      description: "Create digital assets",
      href: "/mint",
    },
    {
      title: "EXPLORE_SYS", 
      description: "Realm of system's atomic cards",
      href: "/collection",
    },
    {
      title: "MY_ASSETS", 
      description: "View collection",
      href: "/assets",
    },
    {
      title: "STAKE_NFT",
      description: "Activate staking",
      href: "/staking",
    },
    {
      title: "MANAGE_TOKENS",
      description: "Reward system",
      href: "/tokens",
    }
  ];

  return (
    <GlassCard className="p-0 overflow-hidden" delay={0.2}>
      <div className="bg-white p-4 border-b border-cyan-400/30">
        <h2 className="font-mono text-green-600 font-bold text-sm tracking-wider">QUICK_COMMANDS.exe</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 gap-10">
          {actions.map((action, i) => (
            <Link key={i} href={action.href}>
              <motion.button
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full text-left group"
              >
                <div className="relative overflow-hidden bg-transparent hover:bg-gray-100 p-6 hover:border-transparent transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.4)]">
                  {/* Subtle hover background tint */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41] to-[#008F11] opacity-0 group-hover:opacity-10 transition-opacity" />
                  
                  {/* Pulsing glow effect (matching InfoRow exactly) */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00FF41] via-[#008F11] to-[#00FF41] opacity-15 group-hover:opacity-100 transition-opacity blur-sm animate-pulse" />
                  
                  <div className="relative z-10 flex items-center">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-black font-mono group-hover:text-white transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-black group-hover:text-gray-300 transition-colors font-mono">
                        {action.description}
                      </p>
                    </div>
                    
                    <div className="text-[#00FF41] opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            </Link>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}