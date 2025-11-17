"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Sidebar() {
  const navItems = [
    { href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
    { href: "/mint", icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z", label: "Mint" },
    { href: "/staking", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", label: "Stake" },
    { href: "/tokens", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Tokens" }
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
      className="w-24 flex flex-col items-center py-8 bg-gradient-to-b from-gray-950 to-black border-r-2 border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)] relative"
    >
      {/* Animated glow border */}
      <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-cyan-400 animate-pulse" />
      
      {/* Logo - Holographic */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-14 h-14 mb-12 rounded-xl bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-pink-500 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.5)] relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 blur-xl group-hover:blur-2xl transition-all" />
        <svg className="w-8 h-8 text-white relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </motion.div>

      {/* Nav Items - Holographic buttons */}
      <nav className="flex-1 flex flex-col gap-6 relative z-10">
        {navItems.map((item, i) => (
          <Link key={i} href={item.href}>
            <motion.button
              whileHover={{ scale: 1.15, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="w-14 h-14 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity blur-md`} />
              <div className="absolute inset-0 bg-gray-900 group-hover:bg-transparent transition-colors" />
              <svg className="w-7 h-7 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              
              {/* Hover label */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute left-full ml-3 px-3 py-1 bg-gray-950 text-cyan-400 text-xs font-mono rounded border border-cyan-400 whitespace-nowrap pointer-events-none"
              >
                {item.label}
              </motion.div>
            </motion.button>
          </Link>
        ))}
      </nav>

      {/* Settings */}
      <motion.button
        whileHover={{ scale: 1.15, rotate: 90 }}
        className="w-14 h-14 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all relative overflow-hidden group"
      >
        <div className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity blur-md`} />
        <div className="absolute inset-0 bg-gray-900 group-hover:bg-transparent transition-colors" />
        <svg className="w-7 h-7 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </motion.button>
    </motion.aside>
  );
}