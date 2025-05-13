import time
import os
from .mock_camera import create_mock_camera

def get_camera():
    """
    Returns either a real camera or mock camera based on environment.
    """
    if os.getenv('USE_MOCK_CAMERA', 'true').lower() == 'true':
        return create_mock_camera()
    else:
        # TODO: Implement real camera integration
        raise NotImplementedError("Real camera not yet implemented")

def gen_frames():
    """
    Generator function that yields video frames.
    """
    camera = get_camera()
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        time.sleep(0.033)  # ~30 fps 