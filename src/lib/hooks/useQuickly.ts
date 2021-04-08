import * as React from 'react';
import { Model } from '../types';

export const quicklyContext = React.createContext(undefined as any);

const useQuickly = () => {
  const value = React.useContext(quicklyContext);
  return value as Model;
};

export default useQuickly;
