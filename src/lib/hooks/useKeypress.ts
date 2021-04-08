import { Key } from 'ts-keycode-enum';
import * as React from 'react';
import { useGenericState } from './useGenericState';

const useKeypress = (keysToMonitor: number[]) => {
  const initialState = {
    keysPressed: [] as number[],
  };
  const [state, setState] = useGenericState(initialState);
  const { keysPressed } = state;

  const handleKeyDown = ({ which } : KeyboardEvent) => {
    setState({
      keysPressed: [...keysPressed, which]
    });
  }

  const handleKeyUp = ({ which }: KeyboardEvent) => {
    const idx = keysPressed.indexOf(which);
    keysPressed.splice(idx, 1);
    setState({
      keysPressed,
    })
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const areAllKeysPressed = () => {
    return keysToMonitor.every(val => keysPressed.includes(val))
  };

  return areAllKeysPressed();
};

export default useKeypress;
