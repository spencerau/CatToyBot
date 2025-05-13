'use client';

import { useEffect } from 'react';
import { useGamepad } from './useGamepad';
import { useKeyboard } from './useKeyboard';
import { mockRobot } from '@/lib/mock-robot';

export function useRobotController() {
  const { gamepadState, isConnected: isGamepadConnected } = useGamepad();
  const keyboardState = useKeyboard();

  useEffect(() => {
    let leftMotor = 0;
    let rightMotor = 0;

    // Handle gamepad input if connected
    if (isGamepadConnected) {
      const forward = gamepadState.rightTrigger;
      const backward = gamepadState.leftTrigger;
      const turn = gamepadState.leftStick.x;

      // Calculate motor values from gamepad
      const power = forward - backward;

      // Apply turn
      if (Math.abs(turn) > 0.1) {  // Apply deadzone
        if (turn > 0) {  // Turn right
          leftMotor = power;
          rightMotor = power * (1 - Math.abs(turn));
        } else {  // Turn left
          leftMotor = power * (1 - Math.abs(turn));
          rightMotor = power;
        }
      } else {
        leftMotor = power;
        rightMotor = power;
      }

      // Emergency stop
      if (gamepadState.buttons.r1) {
        leftMotor = 0;
        rightMotor = 0;
      }
    } else {
      // Handle keyboard input
      const power = 0.75; // 75% power for keyboard control

      // Set base motor values for forward/backward
      if (keyboardState.forward) {
        leftMotor = power;
        rightMotor = power;
      } else if (keyboardState.backward) {
        leftMotor = -power;
        rightMotor = -power;
      }

      // Apply turning by modifying the base values
      if (keyboardState.left) {
        leftMotor = -power * 0.5;
        rightMotor = power * 0.5;
      } else if (keyboardState.right) {
        leftMotor = power * 0.5;
        rightMotor = -power * 0.5;
      }

      // Emergency stop overrides everything
      if (keyboardState.stop) {
        leftMotor = 0;
        rightMotor = 0;
      }
    }

    // Update mock robot
    mockRobot.setMotors(leftMotor, rightMotor);
  }, [gamepadState, isGamepadConnected, keyboardState]);

  return {
    robotState: mockRobot.getState(),
    isControllerConnected: isGamepadConnected
  };
} 