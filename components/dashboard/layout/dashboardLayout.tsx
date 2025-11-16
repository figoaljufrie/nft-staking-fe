"use client";

import { motion, AnimatePresence } from "framer-motion";
import GrainTexture from "@/components/ui/grainTexture";
import Sidebar from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white overflow-hidden relative">
      {/* Animated matrix grid background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'matrixScroll 20s linear infinite'
        }}
      />
      
      {/* Holographic radial gradients */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-[0.05]" 
        style={{
          background: `radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.2) 0%, transparent 40%),
                       radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 40%)`
        }}
      />
      
      <GrainTexture />
      
      {/* Scan line overlay */}
      <div className="pointer-events-none absolute inset-0 z-10" 
        style={{
          background: 'linear-gradient(rgba(255,255,255,0) 50%, rgba(34, 211, 238, 0.03) 50%)',
          backgroundSize: '100% 4px',
          animation: 'scan 8s linear infinite'
        }}
      />
      
      <div className="relative z-20 flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto bg-gradient-to-br from-white via-transparent to-transparent relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      <style jsx>{`
        @keyframes matrixScroll {
          0% { background-position: 0 0; }
          100% { background-position: 50px 50px; }
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
      `}</style>
    </div>
  );
}