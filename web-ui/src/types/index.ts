export interface Telemetry {
  batteryLevel: number;
  connectionStatus: 'connected' | 'disconnected';
  motorStatus: {
    leftMotor: boolean;
    rightMotor: boolean;
  };
  lastTreatDispensed?: Date;
}

export interface ControllerState {
  connected: boolean;
  leftStick: {
    x: number;
    y: number;
  };
  rightStick: {
    x: number;
    y: number;
  };
  buttons: {
    treatDispense: boolean;
    autoMode: boolean;
  };
}

export interface VideoFeedState {
  connected: boolean;
  streaming: boolean;
  resolution: {
    width: number;
    height: number;
  };
} 