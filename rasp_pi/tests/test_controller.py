import time
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from mock_controller import MockCatToyController

def test_controller_simulation():
    # Create mock controller
    controller = MockCatToyController()
    
    try:
        # Test forward movement
        print("\nTesting forward movement...")
        controller.simulate_forward(0.5)  # Half pressure
        time.sleep(1)
        controller.simulate_forward(1.0)  # Full pressure
        time.sleep(1)
        
        # Test backward movement
        print("\nTesting backward movement...")
        controller.simulate_backward(0.5)  # Half pressure
        time.sleep(1)
        
        # Test turning
        print("\nTesting turning...")
        controller.simulate_turn(-0.5)  # Turn left
        time.sleep(1)
        controller.simulate_turn(0.5)   # Turn right
        time.sleep(1)
        
        # Test stop button
        print("\nTesting stop button...")
        controller.simulate_stop()
        time.sleep(1)
        
        # Print command history
        print("\nCommand History:")
        for cmd in controller.command_history:
            print(f"- {cmd}")
            
    finally:
        controller.close()

if __name__ == "__main__":
    test_controller_simulation() 