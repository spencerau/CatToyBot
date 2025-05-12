#include "../include/motor_control.h"
#include "../include/data_packet.h"

#include <string.h>
#include <math.h>

// 0 is fastest, 255 is slowest
int FL_speed = 255;
int FR_speed = 255;
int BL_speed = 255;
int BR_speed = 255;


void setupMotor(int dirPin, int pwmPin) {
  pinMode(dirPin, OUTPUT);
  pinMode(pwmPin, OUTPUT);
  digitalWrite(dirPin, LOW);
  analogWrite(pwmPin, 0);
}

// switch PWM and DIR pins on the input if you want to switch direction
void spinMotor(int in1Pin, int in2Pin, int speed) {
  analogWrite(in2Pin, 0);
  digitalWrite(in1Pin, LOW);
  // Reconfigure pins
  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
  // Set the new direction
  digitalWrite(in1Pin, HIGH);
  // set motor speed
  analogWrite(in2Pin, speed);
}

void testMotor(const char* motorLabel, bool forward, int speed, int time) {
  if (strcmp(motorLabel, "FL") == 0) {
    Serial.print("Testing: Front Left - ");
    
    if (forward) {
      Serial.println("Forward");
      spinMotor(FL_DIR, FL_PWM, speed);
      delay(time);
      setupMotor(FL_DIR, FL_PWM);
    } else {
      Serial.println("Backward");
      spinMotor(FL_PWM, FL_DIR, speed);
      delay(time);
      setupMotor(FL_PWM, FL_DIR);
    }
  } else if (strcmp(motorLabel, "FR") == 0) {
    Serial.print("Testing: Front Right - ");
    if (forward) {
      Serial.println("Forward");
      spinMotor(FR_DIR, FR_PWM, speed);
      delay(time);
      setupMotor(FR_DIR, FR_PWM);
    } else {
      Serial.println("Backward");
      spinMotor(FR_PWM, FR_DIR, speed);
      delay(time);
      setupMotor(FR_PWM, FR_DIR);
    }
  } else if (strcmp(motorLabel, "BL") == 0) {
    Serial.print("Testing: Back Left - ");
    if (forward) {
      Serial.println("Forward");
      spinMotor(BL_DIR, BL_PWM, speed);
      delay(time);
      setupMotor(BL_DIR, BL_PWM);
    } else {
      Serial.println("Backward");
      spinMotor(BL_PWM, BL_DIR, speed);
      delay(time);
      setupMotor(BL_PWM, BL_DIR);
    }
  } else if (strcmp(motorLabel, "BR") == 0) {
    Serial.print("Testing: Back Right - ");
    if (forward) {
      Serial.println("Forward");
      spinMotor(BR_DIR, BR_PWM, speed);
      delay(time);
      setupMotor(BR_DIR, BR_PWM);
    } else {
      Serial.println("Backward");
      spinMotor(BR_PWM, BR_DIR, speed);
      delay(time);
      setupMotor(BR_PWM, FR_DIR);
    }
  } else {
    Serial.print("Unknown motor label: ");
    Serial.println(motorLabel);
  }
}

void moveAllMotors(bool forward, int speed, int msRun) {
  // start all four motors
  if (forward) {
    spinMotor(FL_DIR, FL_PWM, speed);
    spinMotor(FR_DIR, FR_PWM, speed);
    spinMotor(BL_DIR, BL_PWM, speed);
    spinMotor(BR_DIR, BR_PWM, speed);
    FL_speed = FR_speed = BL_speed = BR_speed = speed;
  } else { // backward
    spinMotor(FL_PWM, FL_DIR, speed);
    spinMotor(FR_PWM, FR_DIR, speed);
    spinMotor(BL_PWM, BL_DIR, speed);
    spinMotor(BR_PWM, BR_DIR, speed);
    FL_speed = FR_speed = BL_speed = BR_speed = -1 * speed;
  }
  // if msRun > 0, let them run for that long then stop
  if (msRun > 0) {
    delay(msRun);
    setupMotor(FL_DIR, FL_PWM);
    setupMotor(FR_DIR, FR_PWM);
    setupMotor(BL_DIR, BL_PWM);
    setupMotor(BR_DIR, BR_PWM);
  }
}

void drive(int speed, int turn_offset) {
  int left_val = -1;
  int right_val = -1;
  
  if (turn_offset == 0) {
    if (speed > 0) {// go forward
      moveAllMotors(true, abs(speed), 0);
    } else { // go backwards
      moveAllMotors(false, abs(speed), 0);
    }
    FL_speed = FR_speed = BL_speed = BR_speed = speed;
  } else if (turn_offset > 0) { // pos value = turn right
    int turn_offset = powf(turn_offset, 2.0f);
    left_val = constrain(speed + turn_offset, 0, 255);
    right_val = constrain(speed - turn_offset, 0, 255);
  } else if (turn_offset < 0) { // neg value = turn left
    int turn_offset = powf(turn_offset, 2.0f);
    left_val = constrain(speed - turn_offset, 0, 255);
    right_val = constrain(speed + turn_offset, 0, 255);
  }
  spinMotor(FL_DIR, FL_PWM, abs(left_val));
  spinMotor(BL_DIR, BL_PWM, abs(left_val));
  spinMotor(FR_DIR, FR_PWM, abs(right_val));
  spinMotor(BR_DIR, BR_PWM, abs(right_val));

  FL_speed = left_val;
  FR_speed = left_val;
  BL_speed = right_val;
  BR_speed = right_val;

  Serial.printf("DRIVE L=%d R=%d\n", left_val, right_val);
}

void turn(char direction, int speed, int turn_offset) {
  if (direction == 'l') { // turn left
    // make right side faster
    spinMotor(FR_DIR, FR_PWM, constrain(speed-turn_offset, 0, 255));
    spinMotor(BR_DIR, BR_PWM, constrain(speed-turn_offset, 0, 255));
    // make left side slower
    spinMotor(FL_DIR, FL_PWM, constrain(speed+turn_offset, 0, 255));
    spinMotor(BL_DIR, BL_PWM, constrain(speed+turn_offset, 0, 255));
  } else if (direction == 'r') { // turn right
    // make right side slower
    spinMotor(FR_DIR, FR_PWM, constrain(speed+turn_offset, 0, 255));
    spinMotor(BR_DIR, BR_PWM, constrain(speed+turn_offset, 0, 255));
    // make left side faster
    spinMotor(FL_DIR, FL_PWM, constrain(speed-turn_offset, 0, 255));
    spinMotor(BL_DIR, BL_PWM, constrain(speed-turn_offset, 0, 255));
  } else { // invalid
    Serial.println("Invalid input");
  }
}

// Dispatch based on pkt.cmd
void handlePacket(const DataPacket &pkt) {
  switch (pkt.cmd) {
    // drive
    case 'd':
      // pkt.speed and pkt.turn are –128…+127 so map back to –255…+255 range
      //drive(pkt.speed*2, pkt.turn*2); 
      moveAllMotors(true, pkt.speed*2, 0);
      Serial.println("ACK");
      break;
    // reverse
    case 'r':
      moveAllMotors(false, pkt.speed*2, 0);
      Serial.println("ACK");
      break;
    // turn left
    case 'L':
      turn('l', pkt.speed*2, pkt.turn*-2);
      Serial.println("ACK");
      break;
    // turn right
    case 'R':
      turn('r', pkt.speed*2, pkt.turn*2);
      Serial.println("ACK");
      break;
    // stop
    case 's':
      setupMotor(FL_DIR, FL_PWM);
      setupMotor(FR_DIR, FR_PWM);
      setupMotor(BL_DIR, BL_PWM);
      setupMotor(BR_DIR, BR_PWM);
      Serial.println("ACK");
      break;

    default:
      Serial.printf("Unknown cmd: %c\n", pkt.cmd);
  }
}

void setup() {
  // USB-CDC
  Serial.begin(115200);
  Serial.println("USB-CDC port created");

  // Set all motor pins as OUTPUT and stop motors
  setupMotor(FL_DIR, FL_PWM);
  setupMotor(FR_DIR, FR_PWM);
  setupMotor(BL_DIR, BL_PWM);
  setupMotor(BR_DIR, BR_PWM);

  Serial.println("ESP32 motor controller ready.");
}

void loop() {
  // Wait until at least 3 bytes are available
  if (Serial.available() >= sizeof(DataPacket)) {
    DataPacket pkt;
    // read raw bytes into the struct
    Serial.readBytes((uint8_t*)&pkt, sizeof(pkt));
    // Now pkt.cmd, pkt.speed, pkt.turn are populated
    handlePacket(pkt);
  }
}
