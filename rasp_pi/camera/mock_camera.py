import cv2
import numpy as np
import time

class MockCamera:
    def __init__(self):
        self.frame_count = 0
        self.width = 640
        self.height = 480
        
    def generate_test_frame(self):
        """Generate a test frame with moving text to simulate video."""
        frame = np.zeros((self.height, self.width, 3), dtype=np.uint8)
        
        # Add some moving elements
        text = f"Test Frame {self.frame_count}"
        x_pos = (self.frame_count * 2) % (self.width - 200)
        
        # Add text
        cv2.putText(frame, text, (x_pos, self.height//2),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
        
        # Add a moving circle
        circle_x = int(self.width/2 + np.sin(self.frame_count/10) * 100)
        circle_y = int(self.height/2 + np.cos(self.frame_count/10) * 100)
        cv2.circle(frame, (circle_x, circle_y), 20, (0, 255, 0), -1)
        
        self.frame_count += 1
        return frame

    def get_frame(self):
        """Get a frame encoded as JPEG."""
        frame = self.generate_test_frame()
        ret, buffer = cv2.imencode('.jpg', frame)
        return buffer.tobytes()

def create_mock_camera():
    return MockCamera() 