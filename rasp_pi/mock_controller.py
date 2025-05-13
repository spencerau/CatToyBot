import threading
import time
from queue import Queue, Empty
from dataclasses import dataclass
from typing import Callable

@dataclass
class MockTrigger:
    value: float = 0
    _on_change: Callable[[float], None] = None

    def on_change(self, callback):
        self._on_change = callback
        return self

    def set_value(self, value: float):
        self.value = value
        if self._on_change:
            self._on_change(value * 255)  # Scale to 0-255 range

@dataclass
class MockButton:
    pressed: bool = False
    _on_down: Callable[[], None] = None

    def on_down(self, callback):
        self._on_down = callback
        return self

    def press(self):
        self.pressed = True
        if self._on_down:
            self._on_down()

    def release(self):
        self.pressed = False

@dataclass
class MockStick:
    x: float = 128  # Center position
    _on_change: Callable[[float], None] = None

    def on_change(self, callback):
        self._on_change = callback
        return self

    def set_position(self, x: float):
        """Set position from -1 to 1, will be converted to 0-255 range"""
        self.x = (x + 1) * 128  # Convert -1 to 1 range to 0-255 range
        if self._on_change:
            self._on_change(self.x)

class MockDualSenseController:
    def __init__(self):
        self.right_trigger = MockTrigger()
        self.left_trigger = MockTrigger()
        self.left_stick_x = MockStick()
        self.btn_r1 = MockButton()
        self._active = False

    def activate(self):
        self._active = True

    def deactivate(self):
        self._active = False

class MockCatToyController:
    def __init__(self):
        self._cmd_queue = Queue()
        self._writer_thread = threading.Thread(target=self._writer_loop, daemon=True)
        self._writer_thread.start()
        
        # Mock DualSense setup
        self.ds = MockDualSenseController()
        self._register_callbacks()
        self.ds.activate()
        
        # Store commands for testing
        self.last_command = None
        self.command_history = []

    def _register_callbacks(self):
        self.ds.right_trigger.on_change(lambda v: self._enqueue(f"forward:{v/255:.2f}"))
        self.ds.left_trigger.on_change(lambda v: self._enqueue(f"backward:{v/255:.2f}"))
        self.ds.left_stick_x.on_change(lambda v: self._enqueue(f"turn:{(v-128)/128:.2f}"))
        self.ds.btn_r1.on_down(lambda: self._enqueue("stop"))

    def _enqueue(self, cmd: str):
        self._cmd_queue.put(cmd)
        self.last_command = cmd
        self.command_history.append(cmd)

    def _writer_loop(self):
        while True:
            try:
                cmd = self._cmd_queue.get(timeout=0.1)
                if cmd is None:
                    break
                print(f"Mock Controller Command: {cmd}")
            except Empty:
                continue

    def close(self):
        self._enqueue("stop")
        self._cmd_queue.put(None)
        self._writer_thread.join(timeout=1)
        self.ds.deactivate()

    # Test helper methods
    def simulate_forward(self, pressure: float):
        """Simulate pressing the right trigger (0-1 range)"""
        self.ds.right_trigger.set_value(pressure)

    def simulate_backward(self, pressure: float):
        """Simulate pressing the left trigger (0-1 range)"""
        self.ds.left_trigger.set_value(pressure)

    def simulate_turn(self, direction: float):
        """Simulate moving the left stick (-1 to 1 range, negative=left, positive=right)"""
        self.ds.left_stick_x.set_position(direction)

    def simulate_stop(self):
        """Simulate pressing the R1 button"""
        self.ds.btn_r1.press()
        self.ds.btn_r1.release()  # Auto-release after press 