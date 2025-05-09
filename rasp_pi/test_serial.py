#!/usr/bin/env python3
import yaml
import serial
import time
import curses
import struct

# Load serial settings from config.yaml
with open("configs/config.yaml") as f:
    config = yaml.safe_load(f)

s = config["serial"]

ser = serial.Serial(
    s["port"], s["baudrate"],
    timeout=s.get("timeout", 0.1),
    write_timeout=s.get("write_timeout", 1),
    dsrdtr=s.get("dsrdtr", False),
    rtscts=s.get("rtscts", False),
)
ser.setDTR(False)
ser.setRTS(False)


def send_packet_and_wait(packet: bytes, timeout=None):
    ser.reset_input_buffer()
    ser.write(packet)
    ser.flush()

    # now wait for ACK
    deadline = time.time() + (timeout or s["trigger_timeout"])
    while time.time() < deadline:
        line = ser.readline().decode(errors="ignore").strip()
        if not line:
            continue
        print(f"<ESP32> {line}")
        if line == "ACK":
            return
    raise RuntimeError(f"Timeout waiting for ACK to packet {packet!r}")


# helper function to send speed and turn values after transforming them so they are in the range of –128 to 127 = 8 bits with a sign bit
def create_packet(cmd: str, speed: int, turn: int) -> bytes:
    """
    cmd   : single character, e.g. 'd', 's', 'r'
    speed : original range –255…255 → scaled to –128…127
    turn  : original range –255…255 → scaled to –128…127
    """
    # scale from –255…255 into –128…127
    s8 = int(max(-128, min(127, speed  // 2)))
    t8 = int(max(-128, min(127, turn   // 2)))
    # pack: c=char, b=int8, b=int8
    return struct.pack('<cbb', cmd.encode('ascii'), s8, t8)


def drive_with_arrows(stdscr):
    curses.curs_set(0)
    stdscr.nodelay(True)
    stdscr.keypad(True)
    stdscr.addstr(0, 0, "↑ forward  ↓ backward  ← left  → right  SPACE stop  (q to quit)")
    stdscr.refresh()

    # static speed/turn from config
    turn_cfg = config["turn"]
    speed_val = 255 - turn_cfg["speed"]
    turn_coef = turn_cfg["turn_coef"]
    dur = turn_cfg["duration"]

    try:
        while True:
            key = stdscr.getch()
            if key == curses.KEY_UP:
                stdscr.addstr(1, 0, "→ forward\n")
                stdscr.refresh()
                pkt = create_packet('d', speed_val, 0)
                send_packet_and_wait(pkt)
            elif key == curses.KEY_DOWN:
                stdscr.addstr(1, 0, "→ backward\n")
                stdscr.refresh()
                pkt = create_packet('r', speed_val, 0)
                send_packet_and_wait(pkt)
            elif key == curses.KEY_LEFT:
                stdscr.addstr(1, 0, "→ turn left    ")
                stdscr.refresh()
                pkt = create_packet('L', speed_val, -turn_coef)
                send_packet_and_wait(pkt)
            elif key == curses.KEY_RIGHT:
                stdscr.addstr(1, 0, "→ turn right   ")
                stdscr.refresh()
                pkt = create_packet('R', speed_val, turn_coef)
                send_packet_and_wait(pkt)
            elif key == ord(" "):
                stdscr.addstr(1, 0, "→ stop         ")
                stdscr.refresh()
                pkt = create_packet('s', 0, 0)
                send_packet_and_wait(pkt)
            elif key in (ord("q"), ord("Q")):
                break
            time.sleep(0.05)
    finally:
        send_packet_and_wait(create_packet('s', 0, 0))
        ser.close()

if __name__ == "__main__":
    curses.wrapper(drive_with_arrows)
    print("Exited. Motors stopped.")