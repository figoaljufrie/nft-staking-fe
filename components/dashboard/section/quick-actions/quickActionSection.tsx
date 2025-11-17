import {motion} from "framer-motion"
import Link from "next/link";
import GlassCard from "@/components/ui/glassCard";

export default function QuickActionsCard() {
  const actions = [
    {
      title: "MINT_NFT",
      description: "Create digital assets",
      href: "/mint",
      color: "from-cyan-400 to-fuchsia-500",
      icon: "M12 4v16m8-8H4"
    },
    {
      title: "MY_ASSETS", 
      description: "View collection",
      href: "/assets",
      color: "from-fuchsia-500 to-pink-500",
      icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
    {
      title: "STAKE_NFT",
      description: "Activate staking",
      href: "/staking",
      color: "from-emerald-400 to-cyan-500",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    },
    {
      title: "MANAGE_TOKENS",
      description: "Reward system",
      href: "/tokens",
      color: "from-orange-500 to-pink-500",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  return (
    <GlassCard className="p-0 overflow-hidden" delay={0.2}>
      <div className="bg-gray-950 p-4 border-b border-cyan-400/30">
        <h2 className="font-mono text-cyan-400 text-sm tracking-wider">QUICK_COMMANDS.exe</h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4">
          {actions.map((action, i) => (
            <Link key={i} href={action.href}>
              <motion.button
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full text-left group"
              >
                <div className="relative overflow-hidden bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-transparent transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Animated border */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-100 transition-opacity blur-sm animate-pulse`} />
                  
                  <div className="relative z-10 flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform`}>
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 font-mono group-hover:text-white transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors font-mono">
                        {action.description}
                      </p>
                    </div>
                    
                    <div className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
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