from controller import CatToyController
import time

def main():
    try:
        # Initialize controller without serial port (we'll just print commands)
        controller = CatToyController(
            serial_port=None,  # No actual serial port needed for testing
            baud=115200,
            timeout=1
        )
        
        print("Controller initialized!")
        print("Try these controls:")
        print("- Right trigger: Forward")
        print("- Left trigger: Backward")
        print("- Left stick: Turn left/right")
        print("- R1 button: Emergency stop")
        print("\nPress Ctrl+C to exit...")
        
        # Keep the script running
        while True:
            time.sleep(0.1)
            
    except KeyboardInterrupt:
        print("\nExiting...")
    except Exception as e:
        print(f"\nError: {e}")
    finally:
        if 'controller' in locals():
            controller.close()

if __name__ == "__main__":
    main() 