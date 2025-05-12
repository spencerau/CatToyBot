# rasp‑pi/controller.py  (excerpt)

import threading
import time
from queue import Queue, Empty
from serial import Serial, SerialException
from dualsense_controller import DualSenseController

class CatToyController:
    def __init__(self, serial_port, baud, trigger_timeout=5.0, **serial_opts):
        # Serial port setup
        self.ser = Serial(serial_port, baud, **serial_opts)
        self.ser.setDTR(False)
        self.ser.setRTS(False)
        self.trigger_timeout = trigger_timeout

        # Command queue + writer thread
        self._cmd_queue = Queue()
        self._writer_thread = threading.Thread(target=self._writer_loop, daemon=True)
        self._writer_thread.start()

        # DualSense setup
        self.ds = DualSenseController()
        self._register_callbacks()
        self.ds.activate()

    def _register_callbacks(self):
        self.ds.right_trigger.on_change(lambda v: self._enqueue(f"forward:{v/255:.2f}"))
        self.ds.left_trigger.on_change(lambda v: self._enqueue(f"backward:{v/255:.2f}"))
        self.ds.left_stick_x.on_change(lambda v: self._enqueue(f"turn:{(v-128)/128:.2f}"))
        self.ds.btn_r1.on_down(lambda: self._enqueue("stop"))  # right bumper

    def _enqueue(self, cmd: str):
        """Called in PS5 event thread—never blocks."""
        self._cmd_queue.put(cmd)

    def _writer_loop(self):
        """Runs in background, sends each cmd + waits for ACK."""
        while True:
            try:
                cmd = self._cmd_queue.get(timeout=0.1)
            except Empty:
                continue
            if cmd is None:
                break
            self._do_send(cmd)

    def _do_send(self, cmd: str):
        """Blocking send + wait-for-ACK logic."""
        try:
            self.ser.reset_input_buffer()
            self.ser.write((cmd + "\n").encode())
            self.ser.flush()
            deadline = time.time() + self.trigger_timeout
            while time.time() < deadline:
                line = self.ser.readline().decode(errors="ignore").strip()
                if line == "ACK":
                    return
            print(f"ACK timeout for {cmd}")
        except SerialException:
            print(f"Serial error sending {cmd}")

    def close(self):
        self._enqueue("stop")
        # Stop writer thread
        self._cmd_queue.put(None)
        self._writer_thread.join(timeout=1)
        self.ds.deactivate()
        self.ser.close()