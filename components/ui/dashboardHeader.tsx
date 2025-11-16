"use client";

import { motion } from "framer-motion";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface DashboardHeaderProps {
  address: `0x${string}` | undefined;
  isConnected: boolean;
  timeRange: string;
  setTimeRange: (range: string) => void;
}

export default function DashboardHeader({
  address,
  isConnected,
  timeRange,
  setTimeRange,
}: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
      className="mb-12 relative"
    >
      {/* Glitch effect container */}
      <div className="relative">
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight relative">
          <span className="absolute inset-0 text-cyan-400 blur-sm opacity-50 animate-pulse">
            STAKING_TERMINAL_v2.1
          </span>
          <span className="relative z-10 bg-gradient-to-r from-gray-900 via-cyan-600 to-fuchsia-600 bg-clip-text text-transparent">
            STAKING_TERMINAL_v2.1
          </span>
          <span className="absolute inset-0 text-fuchsia-400 blur-md opacity-30 animate-pulse delay-75">
            STAKING_TERMINAL_v2.1
          </span>
        </h1>

        {/* Status bar */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected
                  ? "bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  : "bg-gray-500"
              } animate-pulse`}
            />
            <span className="font-mono text-sm text-gray-700">
              {isConnected ? "SYSTEM_ONLINE" : "OFFLINE"}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300" />
          <span className="font-mono text-sm text-gray-700">
            CHAIN: ETHEREUM
          </span>
          <div className="w-px h-4 bg-gray-300" />
          <span className="font-mono text-sm text-gray-700">
            PROTOCOL: ACTIVE
          </span>
        </div>
      </div>

      <div className="absolute top-0 right-0 flex items-center gap-6">
        {/* Time Range Selector - Terminal style */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="px-6 py-3 rounded-lg bg-gray-950 text-cyan-400 border-2 border-cyan-400 font-mono text-sm hover:bg-cyan-950 transition-all relative overflow-hidden group">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              {timeRange === "7d" && "> LAST_7_DAYS"}
              {timeRange === "30d" && "> LAST_30_DAYS"}
              {timeRange === "90d" && "> LAST_90_DAYS"}
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="min-w-[180px] bg-gray-950 rounded-lg border-2 border-cyan-400 p-2 shadow-[0_0_30px_rgba(34,211,238,0.3)] z-50">
              {["7d", "30d", "90d"].map((range) => (
                <DropdownMenu.Item
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className="px-4 py-3 text-cyan-400 font-mono hover:bg-cyan-950 rounded cursor-pointer outline-none transition-colors"
                >
                  LAST_{range === "7d" ? "7" : range === "30d" ? "30" : "90"}
                  _DAYS
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* User Info - Holographic ID */}
        {isConnected && address && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="px-6 py-3 rounded-lg bg-gray-950 border-2 border-fuchsia-400 shadow-[0_0_20px_rgba(236,72,153,0.2)] font-mono text-sm text-fuchsia-400"
          >
            ID: {address.slice(0, 6)}...{address.slice(-4)}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
