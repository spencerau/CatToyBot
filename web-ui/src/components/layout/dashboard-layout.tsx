import { ReactNode } from 'react';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white relative overflow-hidden">
      {/* Decorative paw prints */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-5 rotate-45">
          🐾
        </div>
        <div className="absolute bottom-40 right-20 opacity-5 -rotate-12 text-4xl">
          🐾
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5 rotate-90 text-2xl">
          🐾
        </div>
      </div>

      {/* Glow effect background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/50 to-transparent pointer-events-none" />

      <header className="sticky top-0 z-50 w-full border-b border-[#2A2A3F] bg-[#0A0A0F]/90 backdrop-blur-xl">
        <div className="container max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              className="flex items-center gap-3 transition-transform hover:scale-105" 
              href="/"
            >
              <span className="text-2xl">🐱</span>
              <span className="font-bold text-lg bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] bg-clip-text text-transparent">
                SmartCat Rover
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            <Link 
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#2A2A3F] hover:text-[#00F5FF] relative group"
              href="/status"
            >
              <span className="relative z-10">Status</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/10 to-[#00A3FF]/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
            </Link>
            <Link 
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#2A2A3F] hover:text-[#00F5FF] relative group"
              href="/controls"
            >
              <span className="relative z-10">Controls</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/10 to-[#00A3FF]/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
            </Link>
            <Link 
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#2A2A3F] hover:text-[#00F5FF] relative group"
              href="/settings"
            >
              <span className="relative z-10">Settings</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/10 to-[#00A3FF]/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
            </Link>
          </nav>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-6 py-8 relative">
        {children}
      </main>
    </div>
  );
} 