from flask import Flask, render_template, Response
from picamera2 import Picamera2, Preview
import paho.mqtt.client as mqtt
import cv2
import time
import sys
import os
import json

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
import rasp_pi.test_serial as test_serial


app = Flask(__name__)
picam2 = Picamera2()
picam2.configure(picam2.create_preview_configuration(
    #main={"size": (1280, 720)}
    main={"size": (480, 270)}
    ))
picam2.start()

# define MQTT variables
BROKER = "100.96.15.96"
PORT = 1883
TOPIC = "catbot/drive"
AUTH = None

def on_connect(client, userdata, flags, rc):
    print("MQTT connected:", rc)
    client.subscribe(TOPIC)

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        direction = payload.get("dir")
        speed     = 255 - test_serial.config["turn"]["speed"]
        turn_c    = test_serial.config["turn"]["turn_coef"]

        if   direction == "forward":
            pkt = test_serial.create_packet('d', speed, 0)
        elif direction == "backward":
            pkt = test_serial.create_packet('r', speed, 0)
        elif direction == "left":
            pkt = test_serial.create_packet('L', speed, -turn_c)
        elif direction == "right":
            pkt = test_serial.create_packet('R', speed,  turn_c)
        elif direction == "stop":
            pkt = test_serial.create_packet('s', 0, 0)
        else:
            print("Bad dir:", direction)
            return

        test_serial.send_packet_and_wait(pkt)

    except Exception as e:
        print("MQTT msg error:", e)


# start MQTT protocol
mqttc = mqtt.Client()
if AUTH: mqttc.username_pw_set(*AUTH)
mqttc.on_connect = on_connect
mqttc.on_message = on_message
mqttc.connect(BROKER, PORT, 60)
mqttc.loop_start() 

# @app.route('/drive', methods=['POST'])
# def drive():
#     direction = request.form.get('dir')

#     speed = 255 - test_serial.config["turn"]["speed"]
#     turn_coef = test_serial.config["turn"]["turn_coef"]

#     if direction == "forward":
#         pkt = test_serial.create_packet('d', speed, 0)
#     elif direction == "backward":
#         pkt = test_serial.create_packet('r', speed, 0)
#     elif direction == "left":
#         pkt = test_serial.create_packet('L', speed, -turn_coef)
#     elif direction == "right":
#         pkt = test_serial.create_packet('R', speed, turn_coef)
#     elif direction == "stop":
#         pkt = test_serial.create_packet('s', 0, 0)
#     else:
#         return "Invalid direction", 400

#     test_serial.send_packet_and_wait(pkt)
#     return "OK"

def gen_frames():
    while True:
        frame = picam2.capture_array()
        frame = cv2.rotate(frame, cv2.ROTATE_180)
        ret, buffer = cv2.imencode('.jpg', frame)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        time.sleep(0.075)  # ~15 FPS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/video')
def video():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
