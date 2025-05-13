'use client';

import { useEffect, useRef } from 'react';
import { RobotState } from '@/lib/mock-robot';

interface RobotVisualizationProps {
  robotState: RobotState;
}

export function RobotVisualization({ robotState }: RobotVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#0A0A0F';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#2A2A3F';
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Transform to robot space
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(1, -1); // Flip Y axis to match mathematical coordinates

    // Draw robot
    ctx.save();
    ctx.translate(robotState.position.x, robotState.position.y);
    ctx.rotate(robotState.position.rotation * Math.PI / 180);

    // Robot body
    ctx.fillStyle = '#00F5FF';
    ctx.fillRect(-15, -20, 30, 40);

    // Wheels
    ctx.fillStyle = '#2A2A3F';
    ctx.fillRect(-20, -15, 5, 10); // Left wheel
    ctx.fillRect(15, -15, 5, 10);  // Right wheel

    // Direction indicator
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.lineTo(-10, 10);
    ctx.lineTo(10, 10);
    ctx.closePath();
    ctx.fillStyle = '#00A3FF';
    ctx.fill();

    ctx.restore();

    // Draw trail
    ctx.strokeStyle = '#00F5FF';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(robotState.position.x, robotState.position.y);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.restore();

  }, [robotState]);

  return (
    <div className="p-4 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F]">
      <div className="text-sm text-gray-400 mb-2">Robot Position</div>
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={300}
        className="w-full aspect-square rounded-lg"
      />
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="p-2 rounded bg-[#1A1A2E] text-gray-400">
          Position: ({robotState.position.x.toFixed(1)}, {robotState.position.y.toFixed(1)})
        </div>
        <div className="p-2 rounded bg-[#1A1A2E] text-gray-400">
          Rotation: {robotState.position.rotation.toFixed(1)}°
        </div>
        <div className="p-2 rounded bg-[#1A1A2E] text-gray-400">
          Left Motor: {(robotState.motors.left * 100).toFixed(0)}%
        </div>
        <div className="p-2 rounded bg-[#1A1A2E] text-gray-400">
          Right Motor: {(robotState.motors.right * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
} 