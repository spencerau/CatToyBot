'use client';

import { useGamepad } from '@/hooks/useGamepad';

export function ControllerDisplay() {
  const { gamepadState, isConnected } = useGamepad();

  if (!isConnected) {
    return (
      <div className="p-4 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
          No controller connected
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Sticks */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F]">
          <div className="text-sm text-gray-400 mb-2">Left Stick</div>
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-2 border-[#2A2A3F] rounded-full"></div>
            <div 
              className="absolute w-4 h-4 bg-[#00F5FF] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-50"
              style={{ 
                left: `${(gamepadState.leftStick.x + 1) * 50}%`,
                top: `${(gamepadState.leftStick.y + 1) * 50}%`
              }}
            ></div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F]">
          <div className="text-sm text-gray-400 mb-2">Right Stick</div>
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 border-2 border-[#2A2A3F] rounded-full"></div>
            <div 
              className="absolute w-4 h-4 bg-[#00F5FF] rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-50"
              style={{ 
                left: `${(gamepadState.rightStick.x + 1) * 50}%`,
                top: `${(gamepadState.rightStick.y + 1) * 50}%`
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Triggers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F]">
          <div className="text-sm text-gray-400 mb-2">Left Trigger</div>
          <div className="h-4 bg-[#2A2A3F] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00F5FF] transition-all duration-50"
              style={{ width: `${gamepadState.leftTrigger * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F]">
          <div className="text-sm text-gray-400 mb-2">Right Trigger</div>
          <div className="h-4 bg-[#2A2A3F] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00F5FF] transition-all duration-50"
              style={{ width: `${gamepadState.rightTrigger * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-4 rounded-lg bg-[#0A0A0F] border border-[#2A2A3F]">
        <div className="text-sm text-gray-400 mb-2">Buttons</div>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(gamepadState.buttons).map(([button, pressed]) => (
            <div 
              key={button}
              className={`p-2 rounded text-center text-sm ${
                pressed 
                  ? 'bg-[#00F5FF] text-[#0A0A0F]' 
                  : 'bg-[#2A2A3F] text-gray-400'
              }`}
            >
              {button}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 