import os
import sys
import unittest
import cv2
import numpy as np

# Add parent directory to path to import camera modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from camera.mock_camera import create_mock_camera
from camera.video import get_camera, gen_frames

class TestCamera(unittest.TestCase):
    def setUp(self):
        os.environ['USE_MOCK_CAMERA'] = 'true'
        self.camera = get_camera()

    def test_frame_generation(self):
        """Test that frames are generated correctly."""
        frame = self.camera.get_frame()
        self.assertIsInstance(frame, bytes)
        
        # Convert frame back to image and check properties
        nparr = np.frombuffer(frame, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        self.assertEqual(img.shape[0], 480)  # height
        self.assertEqual(img.shape[1], 640)  # width
        self.assertEqual(img.shape[2], 3)    # channels

    def test_frame_stream(self):
        """Test that the frame generator works."""
        frames = gen_frames()
        # Get first 3 frames
        for _ in range(3):
            frame = next(frames)
            self.assertIsInstance(frame, bytes)
            self.assertIn(b'Content-Type: image/jpeg', frame)

if __name__ == '__main__':
    unittest.main() 