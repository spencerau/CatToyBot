import cv2


def gen_frames():
    """
    Capture frames from the default webcam and encode them as JPEG for streaming.
    Yields a multipart JPEG frame buffer.
    """
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise RuntimeError("Could not start camera.")
    try:
        while True:
            success, frame = cap.read()
            if not success:
                continue
            # encode frame as JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            if not ret:
                continue
            frame_bytes = buffer.tobytes()
            yield (
                b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n'
            )
    finally:
        cap.release()
