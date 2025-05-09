# rasb-pi/main.py

import yaml
import time
from controller import CatToyController


def load_config(path="configs/config.yaml"):
    with open(path, "r") as f:
        return yaml.safe_load(f)

def main():
    cfg = load_config()

    serial_cfg = cfg["serial"]
    controller = CatToyController(
        serial_port   = serial_cfg["port"],
        baud          = serial_cfg["baudrate"],
        trigger_timeout = serial_cfg.get("trigger_timeout", 5.0),
        dsrdtr        = serial_cfg.get("dsrdtr", False),
        rtscts        = serial_cfg.get("rtscts", False),
    )

    print("Running. Press PS button or Ctrl-C to exit.")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        pass
    finally:
        controller.close()
        print("Clean shutdown complete.")

if __name__ == "__main__":
    main()