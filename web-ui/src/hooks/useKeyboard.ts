'use client';

import { useState, useEffect } from 'react';

interface KeyboardState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  stop: boolean;
}

export function useKeyboard() {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    stop: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setKeyboardState(prev => ({ ...prev, forward: true }));
          break;
        case 's':
        case 'arrowdown':
          setKeyboardState(prev => ({ ...prev, backward: true }));
          break;
        case 'a':
        case 'arrowleft':
          setKeyboardState(prev => ({ ...prev, left: true }));
          break;
        case 'd':
        case 'arrowright':
          setKeyboardState(prev => ({ ...prev, right: true }));
          break;
        case ' ':
          setKeyboardState(prev => ({ ...prev, stop: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          setKeyboardState(prev => ({ ...prev, forward: false }));
          break;
        case 's':
        case 'arrowdown':
          setKeyboardState(prev => ({ ...prev, backward: false }));
          break;
        case 'a':
        case 'arrowleft':
          setKeyboardState(prev => ({ ...prev, left: false }));
          break;
        case 'd':
        case 'arrowright':
          setKeyboardState(prev => ({ ...prev, right: false }));
          break;
        case ' ':
          setKeyboardState(prev => ({ ...prev, stop: false }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keyboardState;
} 