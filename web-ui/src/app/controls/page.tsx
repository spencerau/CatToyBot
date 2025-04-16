import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ControlsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] bg-clip-text text-transparent">
              Controls
            </h1>
            <p className="text-gray-400 mt-2">
              Control your SmartCat Rover manually or enable autonomous mode 🎮
            </p>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors">
                <span>🎮</span> Manual Control
              </CardTitle>
              <CardDescription className="text-gray-400">Use your PS5 controller or on-screen controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-square bg-[#0A0A0F] rounded-lg flex items-center justify-center border border-[#2A2A3F] group-hover:border-[#00F5FF]/20 relative">
                {/* Joystick visualization */}
                <div className="w-48 h-48 rounded-full border-2 border-[#2A2A3F] group-hover:border-[#00F5FF]/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#00F5FF] rounded-full shadow-[0_0_10px_rgba(0,245,255,0.3)]"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-32 h-32 rounded-full border border-[#00F5FF]"></div>
                  </div>
                </div>
                {/* Paw print decorations */}
                <div className="absolute top-4 left-4 text-[#2A2A3F] group-hover:text-[#00F5FF]/20 transition-colors">
                  🐾
                </div>
                <div className="absolute bottom-4 right-4 text-[#2A2A3F] group-hover:text-[#00F5FF]/20 transition-colors">
                  🐾
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors">
                <span>🤖</span> Autonomous Mode
              </CardTitle>
              <CardDescription className="text-gray-400">Let your rover explore autonomously</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#2A2A3F] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00F5FF]"></div>
                    <span className="ml-3 text-sm font-medium text-gray-300">Enable Autonomous Mode</span>
                  </label>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <span className="text-gray-300">AI Status</span>
                  <span className="text-gray-400">Inactive</span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] group-hover:border-[#00F5FF]/20">
                  <span className="text-gray-300">Last Activity</span>
                  <span className="text-gray-400">Never</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
} 