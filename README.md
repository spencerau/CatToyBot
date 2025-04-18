# CatToyBot

## Exmaple Repo Structure (need to switch this to something prettier and actually rendered)
CatToyBot/
├── README.md                 # Project overview and setup instructions
├── .gitignore                # Ignores for Python, C/C++, JS, etc.
├── LICENSE                   # AGPL license
├── requirements.txt          # Python dependencies (Flask, OpenCV, etc.)
├── package.json              # Node.js frontend dependencies (if using Next.js)
├── .env.example              # Sample environment variables

├── docs/                     # Architecture diagrams, setup notes, etc.

├── rasp-pi/                 # Code running on Raspberry Pi
│   ├── camera/               # PiCam3 video capture and CV logic

│   │   ├── video.py
│   │   └── file_2.py
│   ├── control/              # MQTT publisher to send commands to ESP32
│   │   └── mqtt.py
│   ├── server/               # Flask API server
│   │   ├── app.py
│   │   └── routes/
│   └── utils/                # Logging, config helpers

├── esp32/                    # ESP32 code (controls motors, receives MQTT)
│   ├── src/
│   │   ├── main.ino          # Main Arduino or PlatformIO file
│   │   └── motor_control.cpp/h
│   └── platformio.ini        # PlatformIO project config

├── web-ui/                   # Web frontend (Next.js or static HTML/JS)
│   ├── public/
│   ├── pages/                # Next.js routes
│   ├── components/           # Reusable UI components
│   └── utils/                # MQTT WebSocket, metrics parser, etc.

└── scripts/                  # Dev/test tools
    ├── deploy.sh             # deployment script
    └── test.py    