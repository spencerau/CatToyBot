
// front left motor/wheel
#define FL_DIR 18 
#define FL_PWM 19
// front right motor/wheel
#define FR_DIR 7   
#define FR_PWM 6 
// bottom left motor/wheel - brown
#define BL_DIR 14
#define BL_PWM 15
// bottom right motor/wheel - orange
#define BR_DIR 23 
#define BR_PWM 17 


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

void testMotor(String motorLabel, bool forward, int speed) {
  if (motorLabel == "FL") {
    Serial.print("Testing: Front Left - ");
    if (forward) {
      Serial.println("Forward");
      spinMotor(FL_DIR, FL_PWM, speed);
    } else {
      Serial.println("Backward");
      spinMotor(FL_PWM, FL_DIR, speed);
    }
  } else if (motorLabel == "FR") {
    Serial.print("Testing: Front Right - ");
    if (forward) {
      Serial.println("Forward");
      spinMotor(FR_DIR, FR_PWM, speed);
    } else {
      Serial.println("Backward");
      spinMotor(FR_PWM, FR_DIR, speed);
    }
  } else if (motorLabel == "BL") {
    Serial.print("Testing: Back Left - ");
    if (forward) {
      Serial.println("Forward");
      spinMotor(BL_DIR, BL_PWM, speed);
    } else {
      Serial.println("Backward");
      spinMotor(BL_PWM, BL_DIR, speed);
    }
  } else if (motorLabel == "BR") {
    Serial.print("Testing: Back Left - ");
    if (forward) {
      Serial.println("Forward");
      spinMotor(BR_DIR, BR_PWM, speed);
    } else {
      Serial.println("Backward");
      spinMotor(BR_PWM, BR_DIR, speed);
    }
  } else {
    Serial.println("Unknown motor label: " + motorLabel);
  }
}

// Function to move all motors
void moveAllMotors(bool forward, int speed, int time) {
  if (forward) {
    spinMotor(FL_DIR, FL_PWM, speed);
    spinMotor(FR_DIR, FR_PWM, speed);
    spinMotor(BL_DIR, BL_PWM, speed);
    spinMotor(BR_DIR, BR_PWM, speed);
    delay(time);
    setupMotor(FL_DIR, FL_PWM);
    setupMotor(FR_DIR, FR_PWM);
    setupMotor(BL_DIR, BL_PWM);
    setupMotor(BR_DIR, BR_PWM);
    
  } else { // move backwards
    spinMotor(FL_PWM, FL_DIR, speed);
    spinMotor(FR_PWM, FR_DIR, speed);
    spinMotor(BL_PWM, BL_DIR, speed);
    spinMotor(BR_PWM, BR_DIR, speed);
    delay(time);
    setupMotor(FL_PWM, FL_DIR);
    setupMotor(FR_PWM, FR_DIR);
    setupMotor(BL_PWM, BL_DIR);
    setupMotor(BR_PWM, BR_DIR);
  }
}


void setup() {
  Serial.begin(115200);
  while (!Serial) delay(10);

  // Set all motor pins as OUTPUT
  pinMode(FL_DIR, OUTPUT);
  pinMode(FL_PWM, OUTPUT);
  pinMode(FR_DIR, OUTPUT);
  pinMode(FR_PWM, OUTPUT);
  pinMode(BL_DIR, OUTPUT);
  pinMode(BL_PWM, OUTPUT);
  pinMode(BR_DIR, OUTPUT);
  pinMode(BR_PWM, OUTPUT);

  // Initialize all pins to LOW
  digitalWrite(FL_DIR, LOW);
  digitalWrite(FL_PWM, LOW);
  digitalWrite(FR_DIR, LOW);
  digitalWrite(FR_PWM, LOW);
  digitalWrite(BL_DIR, LOW);
  digitalWrite(BL_PWM, LOW);
  digitalWrite(BR_DIR, LOW);
  digitalWrite(BR_PWM, LOW);

  delay(1000);

  // testMotor("FL", true, 15);
  // testMotor("FL", false, 15);

  // testMotor("FR", true, 15);
  // testMotor("FR", false, 15);

  // testMotor("BL", true, 15);
  // testMotor("BL", false, 15);

  // testMotor("BR", true, 15);
  // testMotor("BR", false, 15);

  moveAllMotors(true, 15, 1500);
  
  moveAllMotors(false, 15, 1500);

  Serial.println("Motor test complete.");
}

void loop() {
  // Nothing here for now
}