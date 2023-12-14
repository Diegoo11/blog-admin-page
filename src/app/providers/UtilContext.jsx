'use client';

import { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const context = createContext();

export const useUtils = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ctx = useContext(context);
  if (!ctx) throw new Error('contect not found');
  return ctx;
};

export function UtilsProvider({ children }) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <context.Provider value={{
      toast,
    }}
    >
      {children}
      <ToastContainer />
    </context.Provider>
  );
}
