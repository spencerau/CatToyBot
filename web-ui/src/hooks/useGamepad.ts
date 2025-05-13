'use client';

import { useState, useEffect } from 'react';

interface GamepadState {
  leftStick: { x: number; y: number };
  rightStick: { x: number; y: number };
  leftTrigger: number;
  rightTrigger: number;
  buttons: {
    cross: boolean;
    circle: boolean;
    square: boolean;
    triangle: boolean;
    l1: boolean;
    r1: boolean;
    l2: boolean;
    r2: boolean;
    share: boolean;
    options: boolean;
    l3: boolean;
    r3: boolean;
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    ps: boolean;
    touchpad: boolean;
  };
}

const DEADZONE = 0.1; // Ignore small stick movements

export function useGamepad() {
  const [gamepadState, setGamepadState] = useState<GamepadState>({
    leftStick: { x: 0, y: 0 },
    rightStick: { x: 0, y: 0 },
    leftTrigger: 0,
    rightTrigger: 0,
    buttons: {
      cross: false,
      circle: false,
      square: false,
      triangle: false,
      l1: false,
      r1: false,
      l2: false,
      r2: false,
      share: false,
      options: false,
      l3: false,
      r3: false,
      up: false,
      down: false,
      left: false,
      right: false,
      ps: false,
      touchpad: false,
    },
  });

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleGamepadConnected = (e: GamepadEvent) => {
      console.log('Gamepad connected:', e.gamepad.id);
      setIsConnected(true);
    };

    const handleGamepadDisconnected = (e: GamepadEvent) => {
      console.log('Gamepad disconnected:', e.gamepad.id);
      setIsConnected(false);
    };

    const updateGamepadState = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0]; // Use first gamepad

      if (gamepad) {
        setGamepadState({
          leftStick: {
            x: Math.abs(gamepad.axes[0]) > DEADZONE ? gamepad.axes[0] : 0,
            y: Math.abs(gamepad.axes[1]) > DEADZONE ? gamepad.axes[1] : 0,
          },
          rightStick: {
            x: Math.abs(gamepad.axes[2]) > DEADZONE ? gamepad.axes[2] : 0,
            y: Math.abs(gamepad.axes[3]) > DEADZONE ? gamepad.axes[3] : 0,
          },
          leftTrigger: gamepad.buttons[6]?.value || 0,
          rightTrigger: gamepad.buttons[7]?.value || 0,
          buttons: {
            cross: gamepad.buttons[0]?.pressed || false,
            circle: gamepad.buttons[1]?.pressed || false,
            square: gamepad.buttons[2]?.pressed || false,
            triangle: gamepad.buttons[3]?.pressed || false,
            l1: gamepad.buttons[4]?.pressed || false,
            r1: gamepad.buttons[5]?.pressed || false,
            l2: gamepad.buttons[6]?.pressed || false,
            r2: gamepad.buttons[7]?.pressed || false,
            share: gamepad.buttons[8]?.pressed || false,
            options: gamepad.buttons[9]?.pressed || false,
            l3: gamepad.buttons[10]?.pressed || false,
            r3: gamepad.buttons[11]?.pressed || false,
            up: gamepad.buttons[12]?.pressed || false,
            down: gamepad.buttons[13]?.pressed || false,
            left: gamepad.buttons[14]?.pressed || false,
            right: gamepad.buttons[15]?.pressed || false,
            ps: gamepad.buttons[16]?.pressed || false,
            touchpad: gamepad.buttons[17]?.pressed || false,
          },
        });
      }

      animationFrameId = requestAnimationFrame(updateGamepadState);
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    // Start polling if a gamepad is already connected
    const gamepads = navigator.getGamepads();
    if (gamepads[0]) {
      setIsConnected(true);
      updateGamepadState();
    }

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return {
    gamepadState,
    isConnected,
  };
} 