import subprocess

def start_camera():
    subprocess.run([
        "libcamera-hello",
        "--width", "1280",
        "--height", "720",
        "--rotation", "180",
        "-t", "0"  # run indefinitely
    ])