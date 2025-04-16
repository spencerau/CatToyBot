import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors">
                <span>📹</span> Video Feed
              </CardTitle>
              <CardDescription className="text-gray-400">Live camera stream from your rover</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-[#0A0A0F] rounded-lg flex items-center justify-center overflow-hidden border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                <p className="text-gray-500 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Camera feed not connected
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors">
                <span>🎮</span> Controller Status
              </CardTitle>
              <CardDescription className="text-gray-400">PS5 controller connection status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <span className="text-gray-300">Status</span>
                  <span className="text-red-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Disconnected
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <span className="text-gray-300">Last Input</span>
                  <span className="text-gray-400">Never</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors">
                <span>⚡</span> System Status
              </CardTitle>
              <CardDescription className="text-gray-400">Rover telemetry data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <span className="text-gray-300">Battery</span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 bg-[#2A2A3F] rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[#00F5FF] rounded-full"></div>
                    </div>
                    <span className="text-[#00F5FF]">100%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <span className="text-gray-300">Connection</span>
                  <span className="text-red-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                    Offline
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <span className="text-gray-300">Motors</span>
                  <span className="text-gray-400">Inactive</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-6 right-6">
          <button className="bg-[#00F5FF] text-[#0A0A0F] rounded-lg px-6 py-3 font-medium shadow-lg hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all hover:scale-105 flex items-center gap-2 group">
            <span className="transition-transform group-hover:scale-110">🍪</span>
            <span className="relative">
              <span className="absolute -inset-1 bg-[#00F5FF] blur opacity-30 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative">Dispense Treat</span>
            </span>
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
