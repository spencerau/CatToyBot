import os
import time
import cv2
import numpy as np

def gen_frames():
    """
    Capture frames from the specified camera device or default webcam and encode them as JPEG for streaming.
    Yields a multipart JPEG frame buffer.
    """
    device = os.environ.get("CAMERA_DEVICE", "0")
    # If device is a digit, use as index; else use as path
    if device.isdigit():
        device_arg = int(device)
    else:
        device_arg = device

    cap = cv2.VideoCapture(device_arg)  # pylint: disable=no-member

    if not cap.isOpened():
        print(f"WARNING: Could not open camera device {device_arg}. Streaming placeholder.")
        # Create a placeholder frame (e.g., black 640x480)
        placeholder_frame = np.zeros((480, 640, 3), dtype=np.uint8)
        # Add text to the placeholder
        font = cv2.FONT_HERSHEY_SIMPLEX # pylint: disable=no-member
        text = f"Camera {device_arg} not found"
        text_size = cv2.getTextSize(text, font, 1, 2)[0] # pylint: disable=no-member
        text_x = (placeholder_frame.shape[1] - text_size[0]) // 2
        text_y = (placeholder_frame.shape[0] + text_size[1]) // 2
        cv2.putText(placeholder_frame, text, (text_x, text_y), font, 1, (255, 255, 255), 2) # pylint: disable=no-member
        # Encode the placeholder frame as JPEG
        ret, buffer = cv2.imencode('.jpg', placeholder_frame) # pylint: disable=no-member
        if not ret:
            print("ERROR: Could not encode placeholder frame.")
            # Optionally, yield a minimal error frame or just return/break
            return # Or yield some error indicator if the generator must continue

        frame_bytes = buffer.tobytes()
        frame_multipart = (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n'
        )

        while True:
            yield frame_multipart
            time.sleep(1) # Prevent high CPU usage when yielding placeholder
    else:
        # Camera opened successfully, proceed with capturing frames
        try:
            while True:
                success, frame = cap.read()
                if not success:
                    print("WARNING: Failed to read frame from camera.")
                    continue # Skip this frame
                # encode frame as JPEG
                ret, buffer = cv2.imencode('.jpg', frame)  # pylint: disable=no-member
                if not ret:
                    print("WARNING: Failed to encode frame.")
                    continue # Skip this frame if encoding failed

                frame_bytes = buffer.tobytes()
                yield (
                    b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n'
                )
        finally:
            # Ensure the camera is released even if errors occur during frame reading/encoding
            print("Releasing camera.")
            cap.release()
