'use client';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ControllerDisplay } from '@/components/ui/controller-display';
import { RobotVisualization } from '@/components/ui/robot-visualization';
import { useRobotController } from '@/hooks/useRobotController';

export default function ControlsPage() {
  const { robotState, isControllerConnected } = useRobotController();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <section className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-[#00F5FF] to-[#00A3FF] bg-clip-text text-transparent">
              Controls
            </h1>
            <p className="text-gray-400 mt-2">
              Control your SmartCat Rover 🎮
            </p>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors">
                <span>🎮</span> Controller Input
              </CardTitle>
              <CardDescription className="text-gray-400">Connect your PS5 controller via USB or Bluetooth</CardDescription>
            </CardHeader>
            <CardContent>
              <ControllerDisplay />
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A2E] border-[#2A2A3F] hover:border-[#00F5FF]/30 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.1)] group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white group-hover:text-[#00F5FF] transition-colors">
                <span>🤖</span> Robot Status
              </CardTitle>
              <CardDescription className="text-gray-400">Live visualization of robot movement</CardDescription>
            </CardHeader>
            <CardContent>
              <RobotVisualization robotState={robotState} />
            </CardContent>
          </Card>

        </div>
      </div>
    </DashboardLayout>
  );
} 