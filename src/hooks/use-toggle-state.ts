import { useState } from 'react';

export const useToggleState = (initialState: boolean) => {
  const [state, setState] = useState(initialState);
  const toggleState = () => {
    setState(!state);
  };
  return [state, toggleState];
};
