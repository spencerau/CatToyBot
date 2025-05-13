'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { VideoStream } from '@/components/ui/video-stream';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Monitor and control your SmartCat Rover 🐱
            </p>
          </div>
        </section>

        {/* Main content area with video feed and status cards */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video feed section - larger and more prominent */}
          <div className="lg:w-2/3">
            <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors">
                  <span>📹</span> Live Feed
                </CardTitle>
                <CardDescription className="text-gray-400">Real-time camera stream from your rover</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Replace placeholder with the VideoStream component */}
                <div className="aspect-video bg-[#0A0A0F] rounded-lg overflow-hidden border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <VideoStream />
                </div>
                {/* Video controls */}
                <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <div className="flex items-center gap-4">
                    <button className="text-gray-400 hover:text-[#00F5FF] transition-colors">
                      <span className="text-xl">⚡</span>
                    </button>
                    <button className="text-gray-400 hover:text-[#00F5FF] transition-colors">
                      <span className="text-xl">🔄</span>
                    </button>
                  </div>
                  <span className="text-gray-400">720p</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Status cards - moved to the side */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors text-lg">
                  <span>🎮</span> Controller Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                    <span className="text-gray-300 text-sm">Status</span>
                    <span className="text-red-400 flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                      Disconnected
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                    <span className="text-gray-300 text-sm">Last Input</span>
                    <span className="text-gray-400 text-sm">Never</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors text-lg">
                  <span>⚡</span> System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                    <span className="text-gray-300 text-sm">Battery</span>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 bg-[#2A2A3F] rounded-full overflow-hidden">
                        <div className="h-full w-full bg-[#00F5FF] rounded-full"></div>
                      </div>
                      <span className="text-[#00F5FF] text-sm">100%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                    <span className="text-gray-300 text-sm">Connection</span>
                    <span className="text-red-400 flex items-center gap-2 text-sm">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                      Offline
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                    <span className="text-gray-300 text-sm">Motors</span>
                    <span className="text-gray-400 text-sm">Inactive</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 