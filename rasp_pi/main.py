import threading
import curses

import test_serial
import camera

def run_camera():
    camera.start_camera()

def run_controls(stdscr):
    test_serial.drive_with_arrows(stdscr)

if __name__ == "__main__":
    cam_thread = threading.Thread(target=run_camera)
    cam_thread.start()

    curses.wrapper(run_controls)