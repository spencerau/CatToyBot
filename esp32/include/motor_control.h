#ifndef MOTOR_CONTROL_H
#define MOTOR_CONTROL_H

//#include <Arduino.h>

// front left
#define FL_DIR 18 
#define FL_PWM 19
// front right
#define FR_DIR 6
#define FR_PWM 7
// back left
#define BL_DIR 14
#define BL_PWM 15
// back right
#define BR_DIR 23 
#define BR_PWM 3

#define MIN_PWM 255
#define MAX_PWM 0

// extern int FL_speed;
// extern int FR_speed;
// extern int BL_speed;
// extern int BR_speed;

enum class DriveDir : uint8_t {
    Stopped,
    Forward,
    Reverse
};

extern DriveDir lastDir;


void setupMotor(int dirPin, int pwmPin);
void spinMotor(int in1Pin, int in2Pin, int speed);
void moveAllMotors(bool forward, int speed, int time);
void turn(char direction, int speed, int turn_offset);


#endif