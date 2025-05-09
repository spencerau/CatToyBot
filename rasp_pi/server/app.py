import os, sys
# Ensure the parent directory is on sys.path so sibling packages can be found
dir_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if dir_path not in sys.path:
    sys.path.insert(0, dir_path)

from flask import Flask, Response
from flask_cors import CORS
from camera.video import gen_frames

app = Flask(__name__)
CORS(app)

@app.route('/video_feed')
def video_feed():
    """
    Video streaming route. Returns multipart JPEG data.
    """
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/')
def index():
    return 'Camera streaming server running.'

if __name__ == '__main__':
    # Listen on all interfaces, port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
