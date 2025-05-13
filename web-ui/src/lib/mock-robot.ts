'use client';

export interface RobotState {
  position: { x: number; y: number; rotation: number };
  motors: {
    left: number;  // -1 to 1
    right: number; // -1 to 1
  };
  battery: number; // 0 to 100
  connected: boolean;
}

class MockRobot {
  private state: RobotState = {
    position: { x: 0, y: 0, rotation: 0 },
    motors: { left: 0, right: 0 },
    battery: 100,
    connected: true
  };

  private listeners: ((state: RobotState) => void)[] = [];

  // Update rate (60fps)
  private readonly updateInterval = 1000 / 60;
  private lastUpdate = Date.now();

  constructor() {
    this.startSimulation();
  }

  private startSimulation() {
    setInterval(() => {
      const now = Date.now();
      const delta = (now - this.lastUpdate) / 1000;
      this.lastUpdate = now;

      // Update position based on motor values
      const speed = 50; // units per second
      const turnSpeed = 90; // degrees per second

      // Calculate forward/backward movement
      const avgMotor = (this.state.motors.left + this.state.motors.right) / 2;
      const distance = avgMotor * speed * delta;

      // Calculate rotation
      const rotationDiff = (this.state.motors.right - this.state.motors.left) * turnSpeed * delta;

      // Update position
      const rotation = this.state.position.rotation + rotationDiff;
      const radians = rotation * Math.PI / 180;
      
      this.state = {
        ...this.state,
        position: {
          x: this.state.position.x + Math.cos(radians) * distance,
          y: this.state.position.y + Math.sin(radians) * distance,
          rotation
        },
        battery: Math.max(0, this.state.battery - Math.abs(avgMotor) * 0.001) // Slowly drain battery
      };

      // Notify listeners
      this.listeners.forEach(listener => listener(this.state));
    }, this.updateInterval);
  }

  // Control methods
  setMotors(left: number, right: number) {
    this.state.motors = {
      left: Math.max(-1, Math.min(1, left)),
      right: Math.max(-1, Math.min(1, right))
    };
  }

  // Subscribe to state updates
  subscribe(listener: (state: RobotState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Get current state
  getState(): RobotState {
    return this.state;
  }
}

// Export a singleton instance
export const mockRobot = new MockRobot(); 